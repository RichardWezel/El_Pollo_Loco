let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let muteStatus = false;

function init() {
    start_Screen = document.getElementById('startScreen');
    start_Screen.innerHTML = canvasHTML_Element();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    callEventListener();
}

function canvasHTML_Element() {
    return `
        <canvas id="canvas" width="720" height="480">
        </canvas>
    `
}

function callEventListener() {
    canvas.addEventListener('mousedown', onControlBtnPress);
    canvas.addEventListener('mouseup', onControlBtnRelease);
    canvas.addEventListener('touchstart', onControlBtnPress, { passive: false });
    canvas.addEventListener('touchend', onControlBtnRelease, { passive: false });
    canvas.addEventListener('touchmove', onControlBtnMove, { passive: false });
}

function getBounding(e) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return { x, y };
}

function onControlBtnPress(e) {
    e.preventDefault(); 
    let { x, y } = e.type === 'touchstart' ? getTouchBounding(e.touches[0]) : getBounding(e);
    world.controlBtn.forEach((btn, index) => {
        if (x > btn.x && x < btn.x + btn.width && y > btn.y && y < btn.y + btn.height) {
            updateKeyboardState(index, true);
        }
    });
}

function getTouchBounding(touch) {
    let rect = canvas.getBoundingClientRect();
    let x = touch.clientX - rect.left;
    let y = touch.clientY - rect.top;
    return { x, y };
}

function onControlBtnRelease(e) {
    e.preventDefault(); 
    let { x, y } = e.type === 'touchend' ? getTouchBounding(e.changedTouches[0]) : getBounding(e);
    world.controlBtn.forEach((btn, index) => {
        if (x > btn.x && x < btn.x + btn.width && y > btn.y && y < btn.y + btn.height) {
            updateKeyboardState(index, false);
        }
    });
}

function onControlBtnMove(e) {
    e.preventDefault(); 
    let { x, y } = getTouchBounding(e.touches[0]);
    world.controlBtn.forEach((btn, index) => {
        if (x > btn.x && x < btn.x + btn.width && y > btn.y && y < btn.y + btn.height) {
                updateKeyboardState(index, true);
        } else {
                updateKeyboardState(index, false);
        }
    });
}

function updateKeyboardState(index, isPressed) {
    if (index === 0) {
        keyboard.LEFT = isPressed;
    } else if (index === 1) {
        keyboard.RIGHT = isPressed;
    } else if (index === 2) {
        keyboard.SPACE = isPressed;
    } else if (index === 3) {
        keyboard.KeyD = isPressed;
    } else if (index === 4) {
        keyboard.KeyM = isPressed;
    }
}

window.addEventListener('keydown', (e) => {
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    
    if (e.code === 'ArrowLeft'){
        keyboard.LEFT = true;
    }
    
    if (e.code === 'ArrowUp') {
        keyboard.UP = true;
    }
    
    if (e.code === 'ArrowDown') {
        keyboard.DOWN = true;
    }
    
    if (e.code === 'Space') {
        keyboard.SPACE = true;
    }

    if (e.code === 'KeyD') {
        keyboard.KeyD = true;
    }

    if (e.code === 'KeyM') {
        keyboard.KeyM = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    
    if (e.code === 'ArrowLeft'){
        keyboard.LEFT = false;
    }
    
    if (e.code === 'ArrowUp') {
        keyboard.UP = false;
    }
    
    if (e.code === 'ArrowDown') {
        keyboard.DOWN = false;
    }
    
    if (e.code === 'Space') {
        keyboard.SPACE = false;
    }

    if (e.code === 'KeyD') {
        keyboard.KeyD = false;
    }

    if (e.code === 'KeyM') {
        keyboard.KeyM = false;
    }
});