let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let volumeStatus = true;

window.addEventListener('resize', scanViewport);

function reloadGame() {
    window.location.reload();
}

function scanViewport() {
    if (screen.availHeight > screen.availWidth) {
        setRotateScreenImage();
    } else {
        removeRotateScreenImage();
    }
}

function setRotateScreenImage() {
    let rotateScreenImage = document.getElementById('pleaseRotateScreenImage');
    let screenElement = document.getElementById('gameScreen');
    if (!rotateScreenImage) {
        screenElement.innerHTML += svgScreenRotation();
        screenElement.classList.add('background-opacity');
    }
}

function removeRotateScreenImage() {
    let rotateScreenImage = document.getElementById('pleaseRotateScreenImage');
    if (rotateScreenImage) {
        rotateScreenImage.remove();
    }
}

function svgScreenRotation() {
    return `
        <svg id='pleaseRotateScreenImage' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M496-182 182-496q-23-23-23-54t23-54l174-174q23-23 54-23t54 23l314 314q23 23 23 54t-23 54L604-182q-23 23-54 23t-54-23Zm54-58 170-170-310-310-170 170 310 310ZM480 0q-99 0-186.5-37.5t-153-103Q75-206 37.5-293.5T0-480h80q0 71 24 136t66.5 117Q213-175 272-138.5T401-87L296-192l56-56L588-12q-26 6-53.5 9T480 0Zm400-480q0-71-24-136t-66.5-117Q747-785 688-821.5T559-873l105 105-56 56-236-236q26-6 53.5-9t54.5-3q99 0 186.5 37.5t153 103q65.5 65.5 103 153T960-480h-80Zm-400 0Z"/>
        </svg>
    `
}

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

function fullscreen() {
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) { // Firefox
        canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari and Opera
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { // IE/Edge
        canvas.msRequestFullscreen();
    }
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
