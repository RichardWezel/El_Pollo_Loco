/**
 * Current language used in the game (e.g. 'german', 'english').
 */
let language = "german";

/**
 * Flag for the settings menu state.
 * false: only the menu icon is visible
 * true: settings buttons are visible
 */
let menuStatus = false;

/**
 * Global variable to hold the World object.
 */
let world;

/**
 * Reference to the game canvas HTML element.
 */
let canvas;

/**
 * Start the game: set up UI, initialize level and canvas, and configure layout.
 *
 * @param {boolean} [showTutorial=true] - Whether to show the interactive in-game tutorial
 * (see js/tutorial.js). It's shown when starting from the start screen, but skipped for
 * "Noch einmal!" restarts (see init() in start.js), since the player has already played.
 */
function startGame(showTutorial = true) {
    setControlBtns();
    removeStartBtns();
    setNavbar();
    setGameOutcome();
    addCanvasHTMLElement();
    initlevel();
    initCanvas();
    configScreen();
    if (showTutorial) {
        startTutorial();
    }
}

/**
 * Remove the start screen button container.
 */
function removeStartBtns() {
    let btnContainer = document.getElementById('btnContainer');
    if (btnContainer) {
        btnContainer.remove();
    }
}

/**
 * Add on-screen control buttons for mobile devices and attach listeners.
 */
function setControlBtns() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML += ControlSymbolsHTML();
    addTouchListeners();
}

/**
 * Append the navigation bar HTML to the game screen.
 */
function setNavbar() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML += navbarHTML();
}

/**
 * Append win and game-over screens to the DOM (hidden by default).
 */
function setGameOutcome() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML += winHTML();
    gameScreen.innerHTML += gameOverHTML();
}

/**
 * Add a fullscreen toggle button to the navbar on desktop devices.
 */
function setFullscreenBtn() {
    if (checkDeviceMode() == 'desctop') {
        navbar.innerHTML += fullscreenBtnHTML();
    }
}

/**
 * Insert the canvas element into the DOM and apply device-specific classes.
 */
function addCanvasHTMLElement() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML += canvasHTML_Element();
    // Once the actual game starts, swap the start-screen backdrop image for solid black.
    // On mobile, the canvas is now sized to preserve its 3:2 ratio (see canvas.fullscreen
    // in style.css) instead of stretching to fill the screen, which can leave letterbox
    // gaps beside/above the game - those gaps show gameScreen's own background, so this
    // keeps them a clean black instead of the leftover start-screen image peeking through.
    gameScreen.style.backgroundImage = 'none';
    gameScreen.style.backgroundColor = 'black';
    let canvas = document.getElementById('gameCanvas');
    if (checkDeviceMode() == 'mobile') {
        canvas.classList.add('fullscreen');
    } else if (checkDeviceMode() == 'desctop' && canvas) {
        canvas.classList.remove('fullscreen');
    }
}

/**
 * Create the `World` instance using the game canvas and keyboard input.
 */
function initCanvas() {
    canvas = document.getElementById('gameCanvas');
    world = new World(canvas, keyboard);
}

/**
 * Show the win screen.
 */
function renderWin() { 
    let gameWin = document.getElementById('gameWin');
    gameWin.style.display = 'block';
}

/**
 * Show the game over screen.
 */
function renderGameOver() { 
    let gameOver = document.getElementById('gameOver');
    gameOver.style.display = 'block';
}