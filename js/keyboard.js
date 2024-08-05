let keyboard = new Keyboard();

window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowRight':
            keydownRight();
            break;
        case 'ArrowLeft':
            keydownLeft();
            break;
        case 'ArrowUp':
            keyboard.UP = true;
            break;
        case 'ArrowDown':
            keyboard.DOWN = true;
            break;
        case 'Space':
            keydownSpace();
            break;
        case 'KeyD':
            keydownD();
            break;
        case 'KeyM':
            keydownM();
            break;
        case 'KeyF':
            keydownF();
            break;
        case 'KeyH':
            keydownH();
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'ArrowRight':
            keyUpRight();
            break;
        case 'ArrowLeft':
            keyUpLeft();
            break;
        case 'ArrowUp':
            keyboard.UP = false;
            break;
        case 'ArrowDown':
            keyboard.DOWN = false;
            break;
        case 'Space':
            keyUpSpace();
            break;
        case 'KeyD':
            keyUpD();
            break;
        case 'KeyM':
            keyUpM();
            break;
        case 'KeyF':
            keyUpF();
            break;
        case 'KeyH':
            keyUpH();
            break;
    }
});

function keydownRight() {
    keyboard.RIGHT = true;
    markUsedControlBtn('arrowRight');
}

function keyUpRight() {
    keyboard.RIGHT = false;
    demarcateUsedControlBtn('arrowRight');
}

function keydownLeft() {
    keyboard.LEFT = true;
    markUsedControlBtn('arrowLeft');
}

function keyUpLeft() {
    keyboard.LEFT = false;
    demarcateUsedControlBtn('arrowLeft');
}

function keydownSpace() {
    keyboard.SPACE = true;
    markUsedControlBtn('arrowUp');
}

function keyUpSpace() {
    keyboard.SPACE = false;
    demarcateUsedControlBtn('arrowUp');
}

function keydownM() {
    keyboard.KeyM = true;
    markUsedControlBtn('volumeBtn');
    changeVolumeStatus();
}

function keyUpM() {
    keyboard.KeyM = false;
    demarcateUsedControlBtn('volumeBtn');
}

function keydownF() {
    keyboard.KeyF = true;
    markUsedControlBtn('fullscreen');
    fullscreen();
}

function keyUpF() {
    keyboard.KeyF = false;
    demarcateUsedControlBtn('fullscreen');
}

function keydownD() {
    keyboard.KeyD = true;
    markUsedControlBtn('throwBtn');
}

function keyUpD() {
    keyboard.KeyD = false;
    demarcateUsedControlBtn('throwBtn');
}

function keydownH() {
    keyboard.KeyH = true;
    markUsedControlBtn('home');

}

function keyUpH() {
    keyboard.KeyH = false;
    demarcateUsedControlBtn('home');
    initStartScreen();
}

function addTouchListeners() {
    const arrowRight = document.getElementById('arrowRight');
    const arrowLeft = document.getElementById('arrowLeft');
    const arrowUp = document.getElementById('arrowUp');
    const throwBtn = document.getElementById('throwBtn');

    arrowRight.addEventListener('touchstart', keydownRight);
    arrowRight.addEventListener('touchend', keyUpRight);
    arrowLeft.addEventListener('touchstart', keydownLeft);
    arrowLeft.addEventListener('touchend', keyUpLeft);
    arrowUp.addEventListener('touchstart', keydownSpace);
    arrowUp.addEventListener('touchend', keyUpSpace);
    throwBtn.addEventListener('touchstart', keydownD);
    throwBtn.addEventListener('touchend', keyUpD);
}

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

// Fügen Sie preventDefault zu den anderen Event-Handlern hinzu, wo nötig