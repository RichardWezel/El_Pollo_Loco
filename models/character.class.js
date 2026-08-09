/**
 * Player character class. Handles movement, animations, sounds and game-state
 * related to the player (idle, sleep, hurt, death, collectibles).
 */
class Character extends MovableObject{

    height = 280;
    width = 120;
    y = 150;
    groundPos = 150;
    IMAGES_WALKING = [
        'images/pepe/walk_animation_img/W-21.png',
        'images/pepe/walk_animation_img/W-22.png',
        'images/pepe/walk_animation_img/W-23.png',
        'images/pepe/walk_animation_img/W-24.png',
        'images/pepe/walk_animation_img/W-25.png',
        'images/pepe/walk_animation_img/W-26.png'
    ];
    IMAGES_JUMPING = [
        'images/pepe/jump_animation_img/J-31.png',
        'images/pepe/jump_animation_img/J-32.png',
        'images/pepe/jump_animation_img/J-33.png',
        'images/pepe/jump_animation_img/J-34.png',
        'images/pepe/jump_animation_img/J-35.png',
        'images/pepe/jump_animation_img/J-36.png',
        'images/pepe/jump_animation_img/J-37.png',
        'images/pepe/jump_animation_img/J-38.png',
        'images/pepe/jump_animation_img/J-39.png'
    ];
    IMAGES_HURT = [
        'images/pepe/hurt_animation_img/H-41.png',
        'images/pepe/hurt_animation_img/H-42.png',
        'images/pepe/hurt_animation_img/H-43.png'
    ];
    IMAGES_DEAD = [
        'images/pepe/dead_animation_img/D-51.png',
        'images/pepe/dead_animation_img/D-52.png',
        'images/pepe/dead_animation_img/D-53.png',
        'images/pepe/dead_animation_img/D-54.png',
        'images/pepe/dead_animation_img/D-55.png',
        'images/pepe/dead_animation_img/D-56.png',
        'images/pepe/dead_animation_img/D-57.png'
    ];
    IMAGES_IDLE = [
        'images/pepe/idle_animation_img/I-1.png',
        'images/pepe/idle_animation_img/I-2.png',
        'images/pepe/idle_animation_img/I-3.png',
        'images/pepe/idle_animation_img/I-4.png',
        'images/pepe/idle_animation_img/I-5.png',
        'images/pepe/idle_animation_img/I-8.png',
        'images/pepe/idle_animation_img/I-9.png',
        'images/pepe/idle_animation_img/I-10.png',
    ];
    IMAGES_SLEEP = [
        'images/pepe/long_idle_animation_img/I-11.png',
        'images/pepe/long_idle_animation_img/I-12.png',
        'images/pepe/long_idle_animation_img/I-13.png',
        'images/pepe/long_idle_animation_img/I-14.png',
        'images/pepe/long_idle_animation_img/I-15.png',
        'images/pepe/long_idle_animation_img/I-16.png',
        'images/pepe/long_idle_animation_img/I-17.png',
        'images/pepe/long_idle_animation_img/I-18.png',
        'images/pepe/long_idle_animation_img/I-19.png',
        'images/pepe/long_idle_animation_img/I-20.png'
    ];
    world;
    // Converted from the old tick-based value (15 per tick at 60 ticks/sec) to
    // pixels/second, so the exact same walking speed is preserved: 15 * 60 = 900
    speed = 900;
    animationTimer = 0;
    hasDied = false;
    isMoving = false;
    walking_sound = new Audio('audio/walk_sound.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    jump_sound = new Audio('audio/jump_sound.mp3');
    death_sound = new Audio('audio/death _scream.mp3');
    snoring_sound = new Audio('audio/snoring.mp3');
    BorderColor = 'red';
    collidatingStatus = false;
    collectedBottles = 0;
    collectedCoins = 0;
    offset = {
        top: 120,
        right: 30,
        bottom: 0,
        left: 20
    }
    initialSleepTime = 14000; 
    sleepTimeout; 
    idle;
    sleep;
    GameOverInterval;
    sleepTimerRemaining = null;
    sleepTimerStartedAt = null;
    animationState = 'idle';

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.characterIdle();
    }

    /**
     * Called every frame by World.updateMovableObjects(). Calls super.update() first so
     * gravity (handled by MovableObject) keeps working, then handles input-driven
     * movement, the camera follow position and the sprite-animation state machine.
     *
     * @param {number} deltaTime - Time elapsed since the last frame, in seconds.
     */
    update(deltaTime) {
        super.update(deltaTime);
        this.isMoving = false;
        this.checkPressArrowRight(deltaTime);
        this.checkPressArrowLeft(deltaTime);
        this.checkPressSpace();
        this.camera_x_follows();
        this.updateAnimationState(deltaTime);
        this.updateWalkingSound();
    }

    /**
     * If the right key is pressed and the character is before the endboss,
     * move right, set facing direction and reset idle timer.
     *
     * @param {number} deltaTime - Time elapsed since the last frame, in seconds.
     */
    checkPressArrowRight(deltaTime) {
        if(this.world.keyboard.RIGHT && this.x < this.world.level.enemies[0].x) {
            this.x += this.speed * deltaTime;
            this.otherDirection = false;
            this.isMoving = true;
            this.resetIdleTimer();
        }
    }

    /**
    * If the left key is pressed and the character is within canvas bounds,
    * move left, set facing direction and reset idle timer.
    *
    * @param {number} deltaTime - Time elapsed since the last frame, in seconds.
    */
    checkPressArrowLeft(deltaTime){
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.x -= this.speed * deltaTime;
            this.otherDirection = true;
            this.isMoving = true;
            this.resetIdleTimer();
        }
    }

    /**
     * Play or pause the walking sound based on whether the character actually moved this
     * frame (set via `isMoving` in checkPressArrowRight/Left).
     *
     * Previously walking_sound.pause() ran unconditionally every frame and .play() ran
     * again inside checkPressArrowRight/Left whenever a key was held - both firing every
     * single frame while walking (up to 120+ times/second on high-refresh-rate phones,
     * since update() now runs at display refresh rate instead of the old fixed 60Hz
     * interval). Calling play()/pause() repeatedly on an already-playing/-paused Audio
     * element is wasted work and can cause audio glitches or micro-stutters. Checking
     * `.paused` first means the actual play()/pause() call now only happens once, right
     * when movement starts or stops.
     */
    updateWalkingSound() {
        if (this.isMoving && volumeStatus == true) {
            if (this.walking_sound.paused) {
                this.walking_sound.play();
            }
        } else if (!this.walking_sound.paused) {
            this.walking_sound.pause();
        }
    }

    /**
     * If the jump key is pressed and the character is on the ground, perform a jump,
     * play jump sound and reset the idle timer.
     */
    checkPressSpace(){
        if(this.world.keyboard.SPACE && this.y == this.groundPos) {
            this.jump();
            if(volumeStatus == true) {
                this.jump_sound.play();
            }
            this.resetIdleTimer(); 
        }
    }

    /**
    * Update the world's camera_x so the camera follows the character horizontally.
    */
    camera_x_follows() {
        if(this.x > 0){
            this.world.camera_x = -this.x + 100;
        }
    }

    /**
     * Advance the character's sprite-animation state (dead, hurt, jumping, walking) and
     * trigger endboss contact once far enough right.
     *
     * update(deltaTime) runs every single frame, but this state machine should only step
     * roughly every 100ms like the old setInterval did - otherwise the animation would
     * flicker through frames way too fast on high-refresh-rate screens. `animationTimer`
     * accumulates deltaTime and only lets the code below run once enough time has passed.
     *
     * @param {number} deltaTime - Time elapsed since the last frame, in seconds.
     */
    updateAnimationState(deltaTime) {
        this.animationTimer += deltaTime;
        if (this.animationTimer < 0.1) {
            return;
        }
        this.animationTimer = 0;
        if (this.isDead()) {
            if (!this.hasDied) {
                this.hasDied = true;
                this.characterDies();
            }
        } else if (this.isHurtCharacter()) {
            this.characterHurtsHimself()
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
        if (this.x > 3870) {
            this.world.level.enemies[0].contactCharacter = true;
        }
    }

    /**
     * Handle character death: play death animation and sound, make the
     * character fall off-screen, stop background music and clear animation timers.
     *
     * Only ever called once per game, guarded by the `hasDied` flag in
     * updateAnimationState() - unlike the old setInterval-based version, update(deltaTime)
     * keeps running every frame, so without that guard this would fire repeatedly.
     */
    characterDies() {
        this.playDeathAnimation();
        this.jump();
        this.fallBelowGround();
        world.backgroundmusic.pause();
        if (volumeStatus === true) {
            this.death_sound.play();
        }
        this.resetSounds();
    }

    /**
     * Stop and clear sound intervals used by the character (background, snoring, idle, sleep).
     */
    resetSounds() {
        this.world.backgroundmusic.pause();
        this.snoring_sound.pause();
        clearInterval(this.idle);
        clearInterval(this.sleep); 
        clearTimeout(this.sleepTimeout); 
    }

    /**
    * Play the death animation frames in sequence and then check for game over.
    */
    playDeathAnimation() {
        let deathIndex = 0; 
        let deathAnimationInterval = setInterval(() => {
            if (deathIndex < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[deathIndex]];
                deathIndex++;
            } else {
                clearInterval(deathAnimationInterval); 
                this.checkGameOver();
            }
        }, 100); 
    }

    /**
     * Start checking for the game-over condition (character fallen below screen).
     */
    checkGameOver() {
        this.GameOverInterval = setInterval(() => {
            if (this.y == 500) {
               this.initGameOver();
            }
        }, 100); 
    }

    /**
     * Display the game-over screen and stop the game-over checker.
     */
    initGameOver() {
        let gameOver = document.getElementById('gameOver');
        gameOver.style.display = 'flex';
        clearInterval(this.GameOverInterval);                
    }

    /**
     * Play the hurt animation and sound when the character is damaged.
     */
    characterHurtsHimself() {
        this.playAnimation(this.IMAGES_HURT);
        if (volumeStatus === true) {
            this.hurt_sound.play();
        }
    }
    
    /**
    * Enter idle state and start the idle animation loop.
    */
    characterIdle() {
        this.animationState = 'idle';
        this.startSleepTimer(this.sleepTimerRemaining);
        clearInterval(this.idle);
        clearInterval(this.sleep);
        this.idle = setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE);
        }, 180); 
    }

    /**
    * Start a timeout which will transition the character to the sleep state
    * after `initialSleepTime` milliseconds.
    */
    startSleepTimer(delay = null) {
        if (this.sleepTimeout) {
            clearTimeout(this.sleepTimeout);
        }
        const timerDelay = delay ?? this.sleepTimerRemaining ?? this.initialSleepTime;
        this.sleepTimerRemaining = null;
        this.sleepTimerStartedAt = Date.now();
        this.sleepTimeout = setTimeout(() => {
            this.characterSleep();
            clearTimeout(this.idle);
        }, Math.max(timerDelay, 0));
    }

    /**
    * Enter the sleep animation state and optionally play snoring sound.
    */
    characterSleep() {
        this.animationState = 'sleep';
        if(volumeStatus == true) {
            this.playSnoringSound();
        } 
        clearInterval(this.idle);
        clearInterval(this.sleep); 
        this.sleep = setInterval(() => {
            this.playAnimation(this.IMAGES_SLEEP);
        }, 180); 
    }

    /**
    * Play snoring sound in a loop while the character sleeps (if volume enabled).
    */
    playSnoringSound() {
        if(volumeStatus == true) {
            this.snoring_sound.play();
        }
        this.snoring_sound.addEventListener('ended', () => {
            this.snoring_sound.currentTime = 0;
            if(volumeStatus == true) {
                this.snoring_sound.play();
            }
        });
    }

    /**
    * Reset sleeping/idle timers and ensure the character returns to idle animation.
    */
    resetIdleTimer() {
        clearTimeout(this.sleepTimeout); 
        clearInterval(this.sleep); 
        this.sleepTimerRemaining = null;
        this.characterIdle(); 
        this.snoring_sound.pause();
    }

    /**
     * Pause the character's idle/sleep timers so they do not continue while the game is paused.
     */
    pauseAnimationTimers() {
        if (this.sleepTimeout) {
            clearTimeout(this.sleepTimeout);
            if (this.sleepTimerStartedAt !== null) {
                const elapsed = Date.now() - this.sleepTimerStartedAt;
                this.sleepTimerRemaining = Math.max(this.initialSleepTime - elapsed, 0);
                this.sleepTimerStartedAt = null;
            }
        }
        clearInterval(this.idle);
        clearInterval(this.sleep);
    }

    /**
     * Resume the character's idle/sleep timers after the game is unpaused.
     */
    resumeAnimationTimers() {
        if (this.animationState === 'sleep') {
            this.characterSleep();
        } else {
            if (this.sleepTimerRemaining === 0) {
                this.characterSleep();
            } else {
                this.characterIdle();
            }
        }
    }

    /**
    * Apply a small bounce upwards, used for knockback or stomp effects.
    *
    * speedY converted from the old tick-based 20 to pixels/second: 20 * 25 = 500.
    * The 20px y-offset is a static pixel value, unrelated to the speed unit change.
    */
    bounce() {
        this.speedY = 500;
        this.y = this.groundPos - 20;
    }
} 