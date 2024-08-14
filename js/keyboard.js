let keyboard = new Keyboard();
let timer;
let delay = 600; // 500ms lange Berührung

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

function keydownRight(event) {
    if (event) event.preventDefault();
    keyboard.RIGHT = true;
    markUsedControlBtn('arrowRight');
}

function keyUpRight(event) {
    if (event) event.preventDefault();
    keyboard.RIGHT = false;
    demarcateUsedControlBtn('arrowRight');
}

function keydownLeft(event) {
    if (event) event.preventDefault();
    keyboard.LEFT = true;
    markUsedControlBtn('arrowLeft');
}

function keyUpLeft(event) {
    if (event) event.preventDefault();
    keyboard.LEFT = false;
    demarcateUsedControlBtn('arrowLeft');
}

function keydownSpace(event) {
    if (event) event.preventDefault();
    keyboard.SPACE = true;
    markUsedControlBtn('arrowUp');
}

function keyUpSpace(event) {
    if (event) event.preventDefault();
    keyboard.SPACE = false;
    demarcateUsedControlBtn('arrowUp');
}

function keydownM(event) {
    if (event) event.preventDefault();
    keyboard.KeyM = true;
    markUsedControlBtn('volumeBtn');
    changeVolumeStatus();
}

function keyUpM(event) {
    if (event) event.preventDefault();
    keyboard.KeyM = false;
    demarcateUsedControlBtn('volumeBtn');
}

function keydownF(event) {
    if (checkMobileDeviceSize()) {
        if (event) event.preventDefault();
        keyboard.KeyF = true;
        markUsedControlBtn('fullscreen');
        fullscreen();
    }
}

function keyUpF(event) {
    if (checkMobileDeviceSize()) {
        if (event) event.preventDefault();
        keyboard.KeyF = false;
        demarcateUsedControlBtn('fullscreen');
    }
}

function keydownD(event) {
    if (event) event.preventDefault();
    keyboard.KeyD = true;
    markUsedControlBtn('throwBtn');
}

function keyUpD(event) {
    if (event) event.preventDefault();
    keyboard.KeyD = false;
    demarcateUsedControlBtn('throwBtn');
}

function keydownH(event) {
    if (event) event.preventDefault();
    keyboard.KeyH = true;
    markUsedControlBtn('home');
}

function keyUpH(event) {
    if (event) event.preventDefault();
    keyboard.KeyH = false;
    demarcateUsedControlBtn('home');
    reloadGame();
}

function addTouchListeners() {
    const arrowRight = document.getElementById('arrowRight');
    const arrowLeft = document.getElementById('arrowLeft');
    const arrowUp = document.getElementById('arrowUp');
    const throwBtn = document.getElementById('throwBtn');

   
    arrowRight.addEventListener('touchstart', keydownRight);
    arrowRight.addEventListener('touchend', keyUpRight);
    arrowRight.addEventListener('touchcancel', keyUpRight); // Add this line
    arrowLeft.addEventListener('touchstart', keydownLeft);
    arrowLeft.addEventListener('touchend', keyUpLeft);
    arrowLeft.addEventListener('touchcancel', keyUpLeft); // Add this line
    arrowUp.addEventListener('touchstart', keydownSpace);
    arrowUp.addEventListener('touchend', keyUpSpace);
    arrowUp.addEventListener('touchcancel', keyUpSpace); // Add this line
    throwBtn.addEventListener('touchstart', keydownD);
    throwBtn.addEventListener('touchend', keyUpD);
    throwBtn.addEventListener('touchcancel', keyUpD); // Add this line
}

function preventContextMenu(event) {
    event.preventDefault();
}

document.querySelectorAll('.control_circle').forEach(element => {
    element.addEventListener('contextmenu', preventContextMenu);
    element.addEventListener('touchstart', preventContextMenu); // Add this line
    element.addEventListener('touchend', preventContextMenu);   // Add this line
    element.addEventListener('touchcancel', preventContextMenu); // Add this line
});