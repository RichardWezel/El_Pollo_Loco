let language = "german";
let menuStatus = false;
let world;
let canvas;

function startGame() {
    document.getElementById('gameScreen').style.backgroundImage = 'none';
    if (checkMobileDeviceSize() == true) {
        setControlBtns();
        document.getElementById('header').style.display = 'none';
    } else {
        removeStartBtns();
    }
    setNavbar();
    addCanvasHTMLElement();
    initCanvas();
}

function removeStartBtns() {
    let btnContainer = document.getElementById('btnContainer');
    if (btnContainer) {
        btnContainer.remove();
    }
}

    function setControlBtns() {
        let screenContainer = document.getElementById('gameScreen');
        screenContainer.innerHTML += ControlSymbolsHTML();
        addTouchListeners();
    }

    function setNavbar() {
        let screenContainer = document.getElementById('gameScreen');
        let navbar = document.getElementById('navbar');
        screenContainer.innerHTML += navbarHTML();
        if (checkMobileDeviceSize == false) {
            navbar.innerHTML += fullscreenBtnHTML();
        }
    }

    function addCanvasHTMLElement() {
        let gameScreen = document.getElementById('gameScreen');
        gameScreen.innerHTML += canvasHTML_Element();
        let canvas = document.getElementById('gameCanvas');
    
    // Ensure the canvas goes fullscreen
    if (window.innerWidth <= 1024 && window.innerHeight <= 768) {
        canvas.classList.add('fullscreen');
    }
    }

    function initCanvas() {
        canvas = document.getElementById('gameCanvas');
        world = new World(canvas, keyboard);
        if (canvas) {
            if (window.innerWidth <= 1024 && window.innerHeight <= 768) {
                canvas.classList.add('fullscreen');
            } else {
                canvas.classList.remove('fullscreen');
            }
        }

    // Ensure the canvas goes fullscreen
    // if (window.innerWidth <= 1024 && window.innerHeight <= 768) {
    //     canvas.classList.add('fullscreen');
    // }
    }

    function renderWin() { // @class character: checkGameOver()
        let gameScreen = document.getElementById('gameScreen');
        gameScreen.innerHTML += winHTML();
    }