/**
 * Lightweight sound-effect player built on the Web Audio API.
 *
 * Why not `new Audio(...)`? Every HTMLAudioElement is a full media pipeline, and calling
 * play()/pause() on one is comparatively expensive - especially on mobile browsers,
 * where each call can stall the main thread for a few milliseconds. The game does this
 * constantly (walking sound on every press/release of the arrow button, jump/coin/bottle
 * sounds mid-movement), which showed up as visible stutter that disappeared as soon as
 * the sound was muted. With Web Audio, each clip is decoded ONCE into an AudioBuffer and
 * then played straight from memory via an AudioBufferSourceNode - starting/stopping that
 * is essentially free and never blocks rendering.
 *
 * The class deliberately mirrors the small subset of the HTMLAudioElement API this game
 * uses (play, pause, paused, currentTime, playbackRate, volume, muted, loop, load), so
 * swapping `new Audio('...')` for `new Sound('...')` needs no other code changes.
 *
 * Only meant for short clips: the whole clip lives decoded in memory (~350 KB per second
 * of stereo audio). Long tracks like the background music should stay an
 * HTMLAudioElement, which streams and decodes off the main thread anyway.
 *
 * If Web Audio is unavailable or the clip can't be fetched/decoded (e.g. when index.html
 * is opened via file:// where fetch() is blocked), it silently falls back to a plain
 * HTMLAudioElement so the game still has sound.
 */
class Sound {

    /**
     * Shared AudioContext for all sounds. Created lazily by Sound.getContext().
     * @type {AudioContext|null}
     */
    static context = null;

    /**
     * Decoded buffers, cached by source path so every clip is fetched and decoded only
     * once even though e.g. every thrown bottle creates its own Sound instance.
     * @type {Object.<string, Promise<AudioBuffer>>}
     */
    static bufferCache = {};

    src;
    buffer = null;
    source = null;
    gainNode = null;
    fallback = null;
    paused = true;
    loop = false;
    _volume = 1;
    _muted = false;
    _playbackRate = 1;
    _playbackStartedAt = 0;

    /**
     * @param {string} src - Path of the audio file, e.g. 'audio/jump_sound.mp3'.
     */
    constructor(src) {
        this.src = src;
        let context = Sound.getContext();
        if (!context) {
            this.useFallback();
            return;
        }
        this.gainNode = context.createGain();
        this.gainNode.connect(context.destination);
        Sound.loadBuffer(src)
            .then(buffer => { this.buffer = buffer; })
            .catch(() => this.useFallback());
    }

    /**
     * Returns the shared AudioContext, creating it on first use. Returns null if the
     * browser has no Web Audio support at all.
     *
     * @returns {AudioContext|null}
     */
    static getContext() {
        if (Sound.context) {
            return Sound.context;
        }
        let AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) {
            return null;
        }
        try {
            Sound.context = new AudioContextClass();
        } catch (e) {
            return null;
        }
        return Sound.context;
    }

    /**
     * Fetch and decode a clip, cached per path.
     *
     * @param {string} src - Path of the audio file.
     * @returns {Promise<AudioBuffer>}
     */
    static loadBuffer(src) {
        if (!Sound.bufferCache[src]) {
            Sound.bufferCache[src] = fetch(src)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Could not load sound ${src}: ${response.status}`);
                    }
                    return response.arrayBuffer();
                })
                .then(data => Sound.getContext().decodeAudioData(data));
        }
        return Sound.bufferCache[src];
    }

    /**
     * Start fetching and decoding the given clips now, so they are ready in memory the
     * moment the game starts instead of being decoded on their first play() mid-game.
     * Failures are ignored here - the individual Sound instances fall back to
     * HTMLAudioElements on their own if a clip can't be loaded.
     *
     * @param {string[]} sources - Paths of the audio files to preload.
     */
    static preload(sources) {
        if (!Sound.getContext()) {
            return;
        }
        sources.forEach(src => Sound.loadBuffer(src).catch(() => {}));
    }

    /**
     * Browsers keep an AudioContext created outside of a user gesture in the 'suspended'
     * state until it's resumed from inside one (click/tap/key press). Call this from a
     * gesture handler (the "Spiel start" button). If we're NOT inside a gesture right now
     * (e.g. the game auto-restarted after "Noch einmal!" via a page reload), resume on the
     * player's very next interaction instead - which happens within a second or two of
     * the game starting anyway, since that's how you move the character.
     */
    static unlock() {
        let context = Sound.getContext();
        if (!context) {
            return;
        }
        let tryResume = () => {
            if (context.state === 'suspended') {
                context.resume().catch(() => {});
            }
        };
        tryResume();
        ['touchstart', 'keydown', 'mousedown'].forEach(type => {
            document.addEventListener(type, tryResume, { once: true, passive: true });
        });
    }

    /**
     * Switch this instance over to a plain HTMLAudioElement. All the property setters
     * below forward to it, so callers don't notice the difference.
     */
    useFallback() {
        if (this.fallback) {
            return;
        }
        this.fallback = new Audio(this.src);
        this.fallback.preload = 'auto';
        this.fallback.loop = this.loop;
        this.fallback.volume = this._volume;
        this.fallback.muted = this._muted;
        this.fallback.playbackRate = this._playbackRate;
        // Hand the (now static) state over to the fallback element via getters.
        Object.defineProperty(this, 'paused', { get: () => this.fallback.paused });
        Object.defineProperty(this, 'loop', {
            get: () => this.fallback.loop,
            set: (value) => { this.fallback.loop = value; }
        });
    }

    /**
     * Start playback. Like HTMLAudioElement.play(), this is a no-op while the clip is
     * already playing, and restarts from the beginning once it has ended or was paused.
     * A paused clip does NOT resume mid-way - all clips in this game are short effects
     * where restarting from the start is what's wanted anyway (and what happens with
     * the `currentTime = 0` resets sprinkled through the existing code).
     *
     * @returns {Promise<void>} Resolved promise, so `play().catch(...)` keeps working.
     */
    play() {
        if (this.fallback) {
            let promise = this.fallback.play();
            return promise !== undefined ? promise : Promise.resolve();
        }
        if (!this.paused) {
            return Promise.resolve();
        }
        if (!this.buffer) {
            // Still decoding (only possible in the first moments after page load, since
            // everything is preloaded in init()) - just skip this one playback.
            return Promise.resolve();
        }
        let context = Sound.getContext();
        if (context.state !== 'running') {
            // 'suspended' (never unlocked) or - iOS only - 'interrupted' (e.g. after the
            // system or a paused media element took the audio session away). Try to get
            // it going again and start the clip once that succeeded; this is silent if
            // the browser insists on a user gesture first.
            this.paused = false;
            context.resume().then(() => {
                if (!this.paused && !this.source) {
                    this.startSource();
                }
            }).catch(() => {
                this.paused = true;
            });
            return Promise.resolve();
        }
        this.startSource();
        return Promise.resolve();
    }

    /**
     * Create and start a fresh AudioBufferSourceNode for the decoded buffer. Source nodes
     * are single-use by design, so one is created per playback - that's cheap.
     */
    startSource() {
        let context = Sound.getContext();
        let source = context.createBufferSource();
        source.buffer = this.buffer;
        source.loop = this.loop;
        source.playbackRate.value = this._playbackRate;
        source.connect(this.gainNode);
        source.onended = () => {
            if (this.source === source) {
                this.source = null;
                this.paused = true;
            }
        };
        this.source = source;
        this.paused = false;
        this._playbackStartedAt = context.currentTime;
        source.start(0);
    }

    /**
     * Stop playback.
     */
    pause() {
        if (this.fallback) {
            this.fallback.pause();
            return;
        }
        if (this.source) {
            let source = this.source;
            this.source = null;
            source.onended = null;
            try {
                source.stop();
            } catch (e) {
                // Already stopped - nothing to do.
            }
        }
        this.paused = true;
    }

    /**
     * Force the clip to start over from the beginning. Called (as `load()`) by the
     * HTMLAudioElement-based code paths; harmless here.
     */
    load() {
        if (this.fallback) {
            this.fallback.load();
        }
    }

    /**
     * Seconds since this playback started (or 0 while paused).
     * @returns {number}
     */
    get currentTime() {
        if (this.fallback) {
            return this.fallback.currentTime;
        }
        if (this.paused) {
            return 0;
        }
        return Sound.getContext().currentTime - this._playbackStartedAt;
    }

    /**
     * Only `currentTime = 0` is used in this game - rewinding while playing restarts the
     * clip from the beginning, just like on an HTMLAudioElement; while paused, the next
     * play() starts from 0 anyway.
     * @param {number} value
     */
    set currentTime(value) {
        if (this.fallback) {
            this.fallback.currentTime = value;
            return;
        }
        if (!this.paused) {
            this.pause();
            this.play();
        }
    }

    get playbackRate() {
        return this.fallback ? this.fallback.playbackRate : this._playbackRate;
    }

    /**
     * Applies to the current playback immediately as well as all future ones.
     * @param {number} value
     */
    set playbackRate(value) {
        this._playbackRate = value;
        if (this.fallback) {
            this.fallback.playbackRate = value;
        } else if (this.source) {
            this.source.playbackRate.value = value;
        }
    }

    get volume() {
        return this.fallback ? this.fallback.volume : this._volume;
    }

    /**
     * @param {number} value - 0..1
     */
    set volume(value) {
        this._volume = value;
        if (this.fallback) {
            this.fallback.volume = value;
        } else {
            this.applyGain();
        }
    }

    get muted() {
        return this.fallback ? this.fallback.muted : this._muted;
    }

    /**
     * @param {boolean} value
     */
    set muted(value) {
        this._muted = value;
        if (this.fallback) {
            this.fallback.muted = value;
        } else {
            this.applyGain();
        }
    }

    /**
     * Push the current volume/muted state into the gain node.
     */
    applyGain() {
        if (this.gainNode) {
            this.gainNode.gain.value = this._muted ? 0 : this._volume;
        }
    }
}
