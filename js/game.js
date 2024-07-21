let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let volumeStatus = true;

function changeVolumeStatus() {
    volumeStatus = !volumeStatus;
    changeImgVolume();
}

function changeImgVolume() {
    if (volumeStatus == true) {
        volumeOn();
    } else {
        volumeOff();
    }
}

function volumeOn() {
    let volumeImg = document.getElementById('volumeBtn');
    volumeImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/>
        </svg>`;
    world.playBackgroundMusic();
}

function volumeOff() {
    let volumeImg = document.getElementById('volumeBtn');
    volumeImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/>
    </svg>`;
    world.backgroundmusic.pause();
}

function init() {
    hideStartBtn();
    addCanvasHTMLElement();
    initCanvas();
    addControlBtns();
}

function hideStartBtn() {
    startBtn = document.getElementById('startBtn');
    startBtn.style.display = 'none';
}

function addCanvasHTMLElement() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML += canvasHTML_Element();
}

function canvasHTML_Element() {
    return `
        <canvas id="canvas" width="720" height="480">
        </canvas>
    `
}

function initCanvas() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function addControlBtns() {
    let controlElements = document.querySelectorAll('.control_element');

    // Durch die ausgewählten Elemente iterieren und 'display: flex' setzen
    controlElements.forEach(element => {
      element.style.display = 'flex';
    });
}

function markUsedControlBtn(controllBtnId) {
    let element = document.getElementById(controllBtnId);
    element.style.borderColor = '#FF9601';
    let svgElement = document.querySelector(`#${controllBtnId} svg path`);
    if (svgElement) {
        // Setzt die Farbe auf weiß (#ffffff)
        svgElement.style.fill = '#FF9601';
    }
}

function demarcateUsedControlBtn(controllBtnId) {
    let element = document.getElementById(controllBtnId);
    element.style.borderColor = 'black';
    let svgElement = document.querySelector(`#${controllBtnId} svg path`);
    if (svgElement) {
        // Setzt die Farbe auf schwarz (#000000)
        svgElement.style.fill = '#000000';
    }
}

window.addEventListener('keydown', (e) => {
    if (e.code == 'ArrowRight') {
        keydownRight();
    }
    
    if (e.code === 'ArrowLeft'){
        keydownLeft()
    }
    
    if (e.code === 'ArrowUp') {
        keyboard.UP = true;
    }
    
    if (e.code === 'ArrowDown') {
        keyboard.DOWN = true;
    }
    
    if (e.code === 'Space') {
        keydownSpace();
    }

    if (e.code === 'KeyD') {
        keydownD();
    }

    if (e.code === 'KeyM') {
        keydownM();
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code == 'ArrowRight') {
        keyUpRight();
    }
    
    if (e.code === 'ArrowLeft'){
        keyUpLeft()
    }
    
    if (e.code === 'ArrowUp') {
        keyboard.UP = false;
    }
    
    if (e.code === 'ArrowDown') {
        keyboard.DOWN = false;
    }
    
    if (e.code === 'Space') {
        keyUpSpace();
    }

    if (e.code === 'KeyD') {
        keyUpD();
    }

    if (e.code === 'KeyM') {
        keyUpM();
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

function keydownD() {
    keyboard.KeyD = true;
    markUsedControlBtn('throwBtn');
}

function keyUpD() {
    keyboard.KeyD = false;
    demarcateUsedControlBtn('throwBtn');
}
