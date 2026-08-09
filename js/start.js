/**
 * Initialize the start screen on page load.
 * Sets up the start UI, prompts for device rotation when needed,
 * and adapts the layout to the current device dimensions.
 */
function init() {
    initStartScreen();
    handleScreenOrientation();
    configScreen();
    window.addEventListener('resize', handleWindowResize);
}

/**
 * Re-check orientation (show/hide the rotate prompt) and re-adjust the layout whenever
 * the window is resized - which is also what fires when a mobile device is rotated.
 *
 * Note: this used to be `window.addEventListener('resize', configScreen())` - the
 * trailing `()` called configScreen() immediately instead of passing it as a callback,
 * so resize/rotation was never actually handled after the initial page load, and
 * handleScreenOrientation() was never wired to any event at all.
 */
function handleWindowResize() {
    handleScreenOrientation();
    configScreen();
}

/**
 * Adjust game layout and canvas size based on the detected device type.
 */
function configScreen() {
    let gameCanvas = document.getElementById('gameCanvas');
    if (checkDeviceMode() == 'mobile') {
        if (gameCanvas) {
            gameCanvas.classList.add('fullscreen');
        }
        setMobileScreenCustomization();
    } else if (checkDeviceMode() == 'desctop' && gameCanvas) {
        if (gameCanvas) {
            gameCanvas.classList.remove('fullscreen');
        }
        setDesctopScreenCustomization();
    }
}

/**
 * Populate the start screen UI and set the background image.
 */
function initStartScreen() {
    let gameScreen = document.getElementById('gameScreen')
    gameScreen.innerHTML = StartBtnsHTML();
    gameScreen.style.backgroundImage = "url('images/intro_outro_screens/start/startscreen_1.png')";
}

/**
 * Show or hide the "please rotate your device" prompt depending on orientation.
 */
function handleScreenOrientation() {
    let pleaseRotateScreenImage = document.getElementById('pleaseRotateScreenImage');
    if (checkPageOrientation() == 'portrait') {
        pleaseRotateScreenImage.style.display = 'flex'
    } else {
        pleaseRotateScreenImage.style.display = 'none'
    }
}

/**
 * Return the current page orientation.
 *
 * Uses matchMedia's "orientation" feature (the same mechanism CSS
 * `@media (orientation: portrait)` relies on) instead of the deprecated
 * `window.orientation` / `screen.availWidth`/`availHeight`, which behave
 * unreliably (undefined, frozen, or not updated on rotation) on several
 * modern mobile browsers.
 *
 * @returns {string} 'portrait' or 'landscape'
 */
function checkPageOrientation() {
    if (window.matchMedia('(orientation: portrait)').matches) {
        return 'portrait';
    } else {
        return 'landscape';
    }
}

/**
 * Detect device input type using matchMedia and return a device mode.
 *
 * @returns {string} 'desctop' or 'mobile'
 */
function checkDeviceMode() {
    if (window.matchMedia('(pointer: fine)').matches) {
        return 'desctop'
    } else if(window.matchMedia('(pointer: coarse)').matches){
        return 'mobile'
    }
}

/**
 * Configure the layout for mobile devices: hide the header and make the
 * game container fill the viewport.
 */
function setMobileScreenCustomization() {
    let gameScreen = document.getElementById('gameScreen');
    let header = document.getElementById('header');
    if (header) {
        header.style.display = 'none';
    }
    gameScreen.style.width = '100dvw';
    gameScreen.style.height = '100dvh';
}

/**
 * Configure the layout for desktop devices: show the header and set a fixed
 * game container size.
 */
function setDesctopScreenCustomization() {
    let gameScreen = document.getElementById('gameScreen');
    let header = document.getElementById('header');
    header.style.display = 'flex';
    gameScreen.style.width = '720px';
    gameScreen.style.height = '480px';
}

/**
 * Reload the current page. Used for actions that are meant to fully restart the game
 * (Home button, Taste H, "Noch einmal" after game over/win) - NOT for closing the
 * info/instructions overlay, which should resume the paused game instead (see
 * closeOverlay()).
 */
function reloadGame() {
    window.location.reload();
}

/**
 * Returns true if a game is currently in progress (a World instance exists).
 */
function isGameRunning() {
    return typeof world !== 'undefined' && world != null;
}

/**
 * Tracks whether showInstruction()/showImpressum() were the ones that paused the game,
 * so closeOverlay() only resumes it if it wasn't already paused for another reason (e.g.
 * the player pressed "P" first and then opened the info screen - closing it shouldn't
 * un-pause a game the player deliberately paused themselves).
 */
let overlayPausedGame = false;

/**
 * Pauses the running game (if any) before showing an info/instructions overlay, unless
 * it's already paused - in which case we leave it alone and remember not to auto-resume
 * it later in closeOverlay().
 */
function pauseGameForOverlay() {
    if (isGameRunning() && !world.isPaused) {
        world.togglePause();
        overlayPausedGame = true;
    }
}

/**
 * Show the game story screen. If a game is currently running, pause it and show the
 * story as an overlay on top instead of replacing the canvas - see renderOverlay().
 */
function showInstruction() {
    pauseGameForOverlay();
    if (!isGameRunning()) {
        setBackgroundInstructions();
    }
    renderOverlay(storyHTML());
}

/**
 * Apply the instruction screen background image. Only used when there is no game
 * running yet (e.g. from the start screen) - while a game is paused behind the overlay,
 * gameScreen's own background stays black (see addCanvasHTMLElement()) since the overlay
 * itself is fully opaque and covers it anyway.
 */
function setBackgroundInstructions() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.style.backgroundImage = `url('images/background/air.png')`;
}

/**
 * Show the given overlay HTML (story/instructions/impressum/data security). If an
 * overlay is already showing (e.g. navigating from story to instructions via the arrow
 * buttons), it's swapped out in place; otherwise it's appended on top of whatever is
 * currently in gameScreen (the running, now-paused game, or the start screen) without
 * touching/removing that content.
 *
 * @param {string} html - HTML markup for the overlay screen to show.
 */
function renderOverlay(html) {
    let existingOverlay = document.getElementById('InstructionsContainer') || document.getElementById('ImpressumContainer');
    if (existingOverlay) {
        // Replacing just this element (not gameScreen) only touches its own subtree, so
        // the canvas and other siblings are unaffected - safe.
        existingOverlay.outerHTML = html;
    } else {
        // gameScreen.innerHTML += html would be wrong here: += re-serializes ALL of
        // gameScreen's existing content (including the running game's canvas) to a
        // string and reparses it into brand new DOM nodes. The freshly parsed canvas is
        // blank, but World.ctx still points at the old, now-detached canvas - so the
        // game keeps drawing onto an element nobody sees, and the visible (new) canvas
        // just shows its plain black background. insertAdjacentHTML only inserts the new
        // markup as additional nodes and leaves every existing element - including the
        // canvas - completely untouched.
        let gameScreen = document.getElementById('gameScreen');
        gameScreen.insertAdjacentHTML('beforeend', html);
    }
}

/**
 * Render the game story content into the game screen.
 */
function renderStory() {
    renderOverlay(storyHTML());
}

/**
 * Render the game instructions content into the game screen.
 */
function renderInstructions() {
    renderOverlay(explenationHTML());
}

/**
 * Close whichever info/instructions overlay is currently showing and, if it was the one
 * that paused a running game (see pauseGameForOverlay()), resume that game exactly where
 * it was left - instead of the previous behaviour of reloading the whole page, which
 * discarded all progress and returned to the start screen.
 */
function closeOverlay() {
    let overlay = document.getElementById('InstructionsContainer') || document.getElementById('ImpressumContainer');
    if (overlay) {
        overlay.remove();
    }
    if (overlayPausedGame && isGameRunning()) {
        world.togglePause();
    }
    overlayPausedGame = false;
}

/**
 * Show the legal / information screen (impressum, data security). If a game is
 * currently running, pause it and show this as an overlay on top instead of replacing
 * the canvas - see renderOverlay().
 */
function showImpressum() {
    pauseGameForOverlay();
    if (!isGameRunning()) {
        setBackgroundInstructions();
    }
    renderOverlay(ImpressumHTML());
}

/**
 * Render the impressum (legal information) into the game screen.
 */
function renderInformations() {
    renderOverlay(ImpressumHTML());
}

/**
 * Render the data security (privacy) content into the game screen.
 */
function renderDataSecurity() {
    renderOverlay(DataSecurityHTML());
}