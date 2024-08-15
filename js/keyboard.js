/**
 * Variable containing the Keyboard object.
 */
let keyboard = new Keyboard();

/**
 * Event listener for keydown events.
 * Handles various keyboard inputs and triggers corresponding functions or updates.
 *
 * @param {KeyboardEvent} e - The keyboard event triggered by pressing a key.
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
    }
});

/**
 * Event listener for keyup events.
 * Handles various keyboard inputs when keys are released and triggers corresponding functions or updates.
 *
 * @param {KeyboardEvent} e - The keyboard event triggered by releasing a key.
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
    }
});

/**
 * Handles the 'keydown' event for the right arrow key.
 * Prevents the default behavior, sets the keyboard's RIGHT state to true, and marks the right arrow control button as used.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by pressing the right arrow key.
 */
function keydownRight(event) {
    if (event) event.preventDefault();
    keyboard.RIGHT = true;
    markUsedControlBtn('arrowRight');
}

/**
 * Handles the 'keyup' event for the right arrow key.
 * Prevents the default behavior, sets the keyboard's RIGHT state to false, and demarcates the right arrow control button.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by releasing the right arrow key.
 */
function keyUpRight(event) {
    if (event) event.preventDefault();
    keyboard.RIGHT = false;
    demarcateUsedControlBtn('arrowRight');
}

/**
 * Handles the 'keydown' event for the left arrow key.
 * Prevents the default behavior, sets the keyboard's LEFT state to true, and marks the left arrow control button as used.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by pressing the left arrow key.
 */
function keydownLeft(event) {
    if (event) event.preventDefault();
    keyboard.LEFT = true;
    markUsedControlBtn('arrowLeft');
}

/**
 * Handles the 'keyup' event for the left arrow key.
 * Prevents the default behavior, sets the keyboard's LEFT state to false, and demarcates the left arrow control button.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by releasing the left arrow key.
 */
function keyUpLeft(event) {
    if (event) event.preventDefault();
    keyboard.LEFT = false;
    demarcateUsedControlBtn('arrowLeft');
}

/**
 * Handles the 'keydown' event for the spacebar.
 * Prevents the default behavior, sets the keyboard's SPACE state to true, and marks the up arrow control button as used.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by pressing the spacebar.
 */
function keydownSpace(event) {
    if (event) event.preventDefault();
    keyboard.SPACE = true;
    markUsedControlBtn('arrowUp');
}

/**
 * Handles the 'keyup' event for the spacebar.
 * Prevents the default behavior, sets the keyboard's SPACE state to false, and demarcates the up arrow control button.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by releasing the spacebar.
 */
function keyUpSpace(event) {
    if (event) event.preventDefault();
    keyboard.SPACE = false;
    demarcateUsedControlBtn('arrowUp');
}

/**
 * Handles the 'keydown' event for the 'M' key.
 * Prevents the default behavior, sets the keyboard's KeyM state to true, marks the volume control button as used, and changes the volume status.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by pressing the 'M' key.
 */
function keydownM(event) {
    if (event) event.preventDefault();
    keyboard.KeyM = true;
    markUsedControlBtn('volumeBtn');
    changeVolumeStatus();
}

/**
 * Handles the 'keyup' event for the 'M' key.
 * Prevents the default behavior, sets the keyboard's KeyM state to false, and demarcates the volume control button.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by releasing the 'M' key.
 */
function keyUpM(event) {
    if (event) event.preventDefault();
    keyboard.KeyM = false;
    demarcateUsedControlBtn('volumeBtn');
}

/**
 * Handles the 'keydown' event for the 'F' key.
 * Prevents the default behavior on mobile devices, sets the keyboard's KeyF state to true, marks the fullscreen control button as used, and toggles fullscreen mode.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by pressing the 'F' key.
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
 * Handles the 'keyup' event for the 'F' key.
 * Prevents the default behavior on mobile devices, sets the keyboard's KeyF state to false, and demarcates the fullscreen control button.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by releasing the 'F' key.
 */
function keyUpF(event) {
    if (checkMobileDeviceSize()) {
        if (event) event.preventDefault();
        keyboard.KeyF = false;
        demarcateUsedControlBtn('fullscreen');
    }
}

/**
 * Handles the 'keydown' event for the 'D' key.
 * Prevents the default behavior, sets the keyboard's KeyD state to true, and marks the throw button control as used.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by pressing the 'D' key.
 */
function keydownD(event) {
    if (event) event.preventDefault();
    keyboard.KeyD = true;
    markUsedControlBtn('throwBtn');
}

/**
 * Handles the 'keyup' event for the 'D' key.
 * Prevents the default behavior, sets the keyboard's KeyD state to false, and demarcates the throw button control.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by releasing the 'D' key.
 */
function keyUpD(event) {
    if (event) event.preventDefault();
    keyboard.KeyD = false;
    demarcateUsedControlBtn('throwBtn');
}

/**
 * Handles the 'keydown' event for the 'H' key.
 * Prevents the default behavior, sets the keyboard's KeyH state to true, and marks the home button control as used.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by pressing the 'H' key.
 */
function keydownH(event) {
    if (event) event.preventDefault();
    keyboard.KeyH = true;
    markUsedControlBtn('home');
}

/**
 * Handles the 'keyup' event for the 'H' key.
 * Prevents the default behavior, sets the keyboard's KeyH state to false, demarcates the home button control, and reloads the game.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by releasing the 'H' key.
 */
function keyUpH(event) {
    if (event) event.preventDefault();
    keyboard.KeyH = false;
    demarcateUsedControlBtn('home');
    reloadGame();
}

/**
 * Adds touch event listeners to the control buttons.
 * Handles touchstart, touchend, and touchcancel events for right arrow, left arrow, up arrow, and throw button controls.
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
 * Prevents the default context menu from appearing on control buttons.
 *
 * @param {Event} event - The event triggered by right-clicking or long-touching a control button.
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