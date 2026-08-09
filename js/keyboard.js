/**
 * Keyboard input state object.
 */
let keyboard = new Keyboard();

/**
 * Global keydown handler: routes pressed keys to the corresponding actions.
 *
 * @param {KeyboardEvent} e - Keyboard event for a pressed key.
 */
window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowRight':
            keydownRight(e);
            break;
        case 'ArrowLeft':
            keydownLeft(e);
            break;
        case 'ArrowUp':
            keyboard.UP = true;
            break;
        case 'ArrowDown':
            keyboard.DOWN = true;
            break;
        case 'Space':
            keydownSpace(e);
            break;
        case 'KeyD':
            keydownD(e);
            break;
        case 'KeyM':
            keydownM(e);
            break;
        case 'KeyF':
            keydownF(e);
            break;
        case 'KeyH':
            keydownH(e);
            break;
        case 'KeyP':
            keydownP(e);
            break;
    }
});

/**
 * Global keyup handler: clear input flags and trigger release actions.
 *
 * @param {KeyboardEvent} e - Keyboard event for a released key.
 */
window.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'ArrowRight':
            keyUpRight(e);
            break;
        case 'ArrowLeft':
            keyUpLeft(e);
            break;
        case 'ArrowUp':
            keyboard.UP = false;
            break;
        case 'ArrowDown':
            keyboard.DOWN = false;
            break;
        case 'Space':
            keyUpSpace(e);
            break;
        case 'KeyD':
            keyUpD(e);
            break;
        case 'KeyM':
            keyUpM(e);
            break;
        case 'KeyF':
            keyUpF(e);
            break;
        case 'KeyH':
            keyUpH(e);
            break;
        case 'KeyP':
            keyUpP(e);
            break;
    }
});

/**
 * Handle pressing the right arrow: prevent default, set `keyboard.RIGHT`, and
 * highlight the on-screen control button.
 *
 * @param {KeyboardEvent} event - Keyboard event for the right arrow.
 */
function keydownRight(event) {
    if (event) event.preventDefault();
    keyboard.RIGHT = true;
    markUsedControlBtn('arrowRight');
}

/**
 * Handle releasing the right arrow: clear `keyboard.RIGHT` and remove highlight.
 *
 * @param {KeyboardEvent} event - Keyboard event for the right arrow release.
 */
function keyUpRight(event) {
    if (event) event.preventDefault();
    keyboard.RIGHT = false;
    demarcateUsedControlBtn('arrowRight');
}

/**
 * Handle pressing the left arrow: prevent default, set `keyboard.LEFT`, and
 * highlight the on-screen left button.
 *
 * @param {KeyboardEvent} event - Keyboard event for the left arrow.
 */
function keydownLeft(event) {
    if (event) event.preventDefault();
    keyboard.LEFT = true;
    markUsedControlBtn('arrowLeft');
}

/**
 * Handle releasing the left arrow: clear `keyboard.LEFT` and remove highlight.
 *
 * @param {KeyboardEvent} event - Keyboard event for the left arrow release.
 */
function keyUpLeft(event) {
    if (event) event.preventDefault();
    keyboard.LEFT = false;
    demarcateUsedControlBtn('arrowLeft');
}

/**
 * Handle pressing the spacebar (jump): prevent default, set `keyboard.SPACE`,
 * and highlight the up control button.
 *
 * @param {KeyboardEvent} event - Keyboard event for the spacebar.
 */
function keydownSpace(event) {
    if (event) event.preventDefault();
    keyboard.SPACE = true;
    markUsedControlBtn('arrowUp');
}

/**
 * Handle releasing the spacebar: clear `keyboard.SPACE` and remove highlight.
 *
 * @param {KeyboardEvent} event - Keyboard event for the spacebar release.
 */
function keyUpSpace(event) {
    if (event) event.preventDefault();
    keyboard.SPACE = false;
    demarcateUsedControlBtn('arrowUp');
}

/**
 * Handle pressing 'M' to toggle mute: prevent default, set `keyboard.KeyM`,
 * highlight the volume button and toggle the volume state.
 *
 * @param {KeyboardEvent} event - Keyboard event for the 'M' key.
 */
function keydownM(event) {
    if (event) event.preventDefault();
    keyboard.KeyM = true;
    markUsedControlBtn('volumeBtn');
    changeVolumeStatus();
}

/**
 * Handle releasing 'M': clear `keyboard.KeyM` and remove highlight from the volume button.
 *
 * @param {KeyboardEvent} event - Keyboard event for the 'M' key release.
 */
function keyUpM(event) {
    if (event) event.preventDefault();
    keyboard.KeyM = false;
    demarcateUsedControlBtn('volumeBtn');
}

/**
 * Handle pressing 'F' to toggle fullscreen on mobile: set `keyboard.KeyF`,
 * highlight the fullscreen button and request fullscreen mode.
 *
 * @param {KeyboardEvent} event - Keyboard event for the 'F' key.
 */
function keydownF(event) {
    if (checkMobileDeviceSize()) {
        if (event) event.preventDefault();
        keyboard.KeyF = true;
        markUsedControlBtn('fullscreen');
        fullscreen();
    }
}

/**
 * Handle releasing 'F' on mobile: clear `keyboard.KeyF` and remove fullscreen button highlight.
 *
 * @param {KeyboardEvent} event - Keyboard event for the 'F' key release.
 */
function keyUpF(event) {
    if (checkMobileDeviceSize()) {
        if (event) event.preventDefault();
        keyboard.KeyF = false;
        demarcateUsedControlBtn('fullscreen');
    }
}

/**
 * Handle pressing 'D' to throw: set `keyboard.KeyD` and highlight the throw button.
 *
 * @param {KeyboardEvent} event - Keyboard event for the 'D' key.
 */
function keydownD(event) {
    if (event) event.preventDefault();
    keyboard.KeyD = true;
    markUsedControlBtn('throwBtn');
}

/**
 * Handle releasing 'D': clear `keyboard.KeyD` and remove highlight from the throw button.
 *
 * @param {KeyboardEvent} event - Keyboard event for the 'D' key release.
 */
function keyUpD(event) {
    if (event) event.preventDefault();
    keyboard.KeyD = false;
    demarcateUsedControlBtn('throwBtn');
}

/**
 * Handle pressing 'H' (home): set `keyboard.KeyH` and highlight the home button.
 *
 * @param {KeyboardEvent} event - Keyboard event for the 'H' key.
 */
function keydownH(event) {
    if (event) event.preventDefault();
    keyboard.KeyH = true;
    markUsedControlBtn('home');
}

/**
 * Handle releasing 'H': clear `keyboard.KeyH`, remove highlight and reload the game.
 *
 * @param {KeyboardEvent} event - Keyboard event for the 'H' key release.
 */
function keyUpH(event) {
    if (event) event.preventDefault();
    keyboard.KeyH = false;
    demarcateUsedControlBtn('home');
    reloadGame();
}

/**
 * Handle pressing 'P' to toggle pause mode.
 *
 * @param {KeyboardEvent} event - Keyboard event for the 'P' key.
 */
function keydownP(event) {
    if (event && event.repeat) return;
    if (event) event.preventDefault();
    keyboard.KeyP = true;
    if (world) {
        world.togglePause();
        // Keep the pause button's icon (pause/play) in sync, since pause can be
        // triggered either from that button or from this key.
        syncPauseButtonIcon();
    }
}

/**
 * Handle releasing 'P': clear the key state.
 *
 * @param {KeyboardEvent} event - Keyboard event for the 'P' key release.
 */
function keyUpP(event) {
    if (event) event.preventDefault();
    keyboard.KeyP = false;
}

/**
 * Attach touch event listeners to on-screen control buttons (for mobile input).
 */
function addTouchListeners() {
    const arrowRight = document.getElementById('arrowRight');
    const arrowLeft = document.getElementById('arrowLeft');
    const arrowUp = document.getElementById('arrowUp');
    const throwBtn = document.getElementById('throwBtn');
    arrowRight.addEventListener('touchstart', keydownRight);
    arrowRight.addEventListener('touchend', keyUpRight);
    arrowRight.addEventListener('touchcancel', keyUpRight); 
    arrowLeft.addEventListener('touchstart', keydownLeft);
    arrowLeft.addEventListener('touchend', keyUpLeft);
    arrowLeft.addEventListener('touchcancel', keyUpLeft); 
    arrowUp.addEventListener('touchstart', keydownSpace);
    arrowUp.addEventListener('touchend', keyUpSpace);
    arrowUp.addEventListener('touchcancel', keyUpSpace); 
    throwBtn.addEventListener('touchstart', keydownD);
    throwBtn.addEventListener('touchend', keyUpD);
    throwBtn.addEventListener('touchcancel', keyUpD); 
}

/**
 * Prevent the default context menu on control buttons (long-press/right-click).
 *
 * @param {Event} event - The triggered event.
 */
function preventContextMenu(event) {
    event.preventDefault();
}

// Attach the context menu prevention and touch event listeners to all control buttons
document.querySelectorAll('.control_circle').forEach(element => {
    element.addEventListener('contextmenu', preventContextMenu);
    element.addEventListener('touchstart', preventContextMenu); 
    element.addEventListener('touchend', preventContextMenu);   
    element.addEventListener('touchcancel', preventContextMenu); 
});