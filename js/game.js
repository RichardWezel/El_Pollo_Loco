/**
 * Variable for current using language of the user in the game.
 */
let language = "german";

/**
 * Variable of the menu button status. False means onlx the menu button is to be seen without other the setting buttons. True means the setting buttons can be seen.
 */
let menuStatus = false;

/**
 * Variable for setting the world object.
 */
let world;

/**
 * Variable for setting the canvas html element. 
 */
let canvas;

/**
 * Initializes the functions for running the game.
 */
function startGame() {
    setControlBtns();
    removeStartBtns();
    setNavbar();
    setGameOutcome();
    addCanvasHTMLElement();
    initlevel();
    initCanvas();
    configScreen();
}

/**
 * Removes the buttons of start screen.
 */
function removeStartBtns() {
    let btnContainer = document.getElementById('btnContainer');
    if (btnContainer) {
        btnContainer.remove();
    }
}

/**
 * Sets the controll buttons für mobile device using.
 */
function setControlBtns() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML += ControlSymbolsHTML();
    addTouchListeners();
}

/**
 * Sets the elements of the navigation buttons
 */
function setNavbar() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML += navbarHTML();
}

/**
 * Sets the outcome screens for win or loos.
 */
function setGameOutcome() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML += winHTML();
    gameScreen.innerHTML += gameOverHTML();
}

/**
 * Sets the button for activating the fullscreen mode.
 */
function setFullscreenBtn() {
    if (checkDeviceMode() == 'desctop') {
        navbar.innerHTML += fullscreenBtnHTML();
    }
}

/**
 * Sets the canvs element.
 */
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

/**
 * Sets the world of canvas.
 */
function initCanvas() {
    canvas = document.getElementById('gameCanvas');
    world = new World(canvas, keyboard);
}

/**
 * Sets the style for appearing win screen.
 */
function renderWin() { 
    let gameWin = document.getElementById('gameWin');
    gameWin.style.display = 'block';
}

/**
 * Sets the style for appearing game over screen.
 */
function renderGameOver() { 
    let gameOver = document.getElementById('gameOver');
    gameOver.style.display = 'block';
}