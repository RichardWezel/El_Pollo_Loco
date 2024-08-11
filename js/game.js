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
    changeVolumeStatus();
}

// function setWinHTML() {
//     let gameScreen = document.getElementById('gameScreen');
//     gameScreen.innerHTML += winHTML();
// }

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
        let navbar = document.getElementById('navbar');
        gameScreen.innerHTML += navbarHTML();
        gameScreen.innerHTML += winHTML();
        gameScreen.innerHTML += gameOverHTML();
        if (checkMobileDeviceSize == false) {
            navbar.innerHTML += fullscreenBtnHTML();
        }
    }

    function addCanvasHTMLElement() {
        let gameScreen = document.getElementById('gameScreen');
        gameScreen.innerHTML += canvasHTML_Element();
        let canvas = document.getElementById('gameCanvas');
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
    }

    function renderWin() { 
        let gameWin = document.getElementById('gameWin');
        gameWin.style.display = 'block';
    }

    function renderGameOver() { 
        let gameOver = document.getElementById('gameOver');
        gameOver.style.display = 'block';
    }