let language = "german";
let menuStatus = false;
let world;
let canvas;

function startGame() {
    setControlBtns();
    removeStartBtns();
    setNavbar();
    addCanvasHTMLElement();
    initlevel();
    initCanvas();
    configScreen();
}

function removeStartBtns() {
    let btnContainer = document.getElementById('btnContainer');
    if (btnContainer) {
        btnContainer.remove();
    }
}

function setControlBtns() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML += ControlSymbolsHTML();
    addTouchListeners();
}
function setNavbar() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML += navbarHTML();
    gameScreen.innerHTML += winHTML();
    gameScreen.innerHTML += gameOverHTML();
}
function setFullscreenBtn() {
    if (checkDeviceMode() == 'desctop') {
        navbar.innerHTML += fullscreenBtnHTML();
    }
}
function addCanvasHTMLElement() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML += canvasHTML_Element();
    let canvas = document.getElementById('gameCanvas');
    if (checkDeviceMode() == 'mobile') {
        canvas.classList.add('fullscreen');
    } else if (checkDeviceMode() == 'desctop' && canvas) {
        canvas.classList.remove('fullscreen');
    }
}
function initCanvas() {
    canvas = document.getElementById('gameCanvas');
    world = new World(canvas, keyboard);
}

function renderWin() { 
    let gameWin = document.getElementById('gameWin');
    gameWin.style.display = 'block';
}
function renderGameOver() { 
    let gameOver = document.getElementById('gameOver');
    gameOver.style.display = 'block';
}