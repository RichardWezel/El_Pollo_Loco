let language = "german";
let menuStatus = false;
let world;
let canvas;

function startGame() {
    document.getElementById('gameScreen').style.backgroundImage = 'none';
    if (checkMobileDeviceSize()) {
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
        screenContainer.innerHTML = ControlSymbolsHTML();
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
        let screenContainer = document.getElementById('gameScreen');
        screenContainer.innerHTML += canvasHTML_Element();
        let canvas = document.getElementById('gameCanvas');
    
    // Ensure the canvas goes fullscreen
    if (window.innerWidth <= 1024 && window.innerHeight <= 768) {
        canvas.classList.add('fullscreen');
    }
    }

    function initCanvas() {
        canvas = document.getElementById('gameCanvas');
        world = new World(canvas, keyboard);


    // Ensure the canvas goes fullscreen
    if (window.innerWidth <= 1024 && window.innerHeight <= 768) {
        canvas.classList.add('fullscreen');
    }
    }

    window.addEventListener('resize', function() {
        let canvas = document.getElementById('gameCanvas');
        if (canvas) {
            if (window.innerWidth <= 1024 && window.innerHeight <= 768) {
                canvas.classList.add('fullscreen');
            } else {
                canvas.classList.remove('fullscreen');
            }
        }
    });

    function renderGameOver() { // @class character: checkGameOver()
        let screenContainer = document.getElementById('gameScreen');
        screenContainer.innerHTML += gameOverHTML();
    }

    function renderWin() { // @class character: checkGameOver()
        let screenContainer = document.getElementById('gameScreen');
        screenContainer.innerHTML += winHTML();
    }