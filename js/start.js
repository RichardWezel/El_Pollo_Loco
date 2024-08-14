function init() {
    initStartScreen();
    handleScreenOrientation();
    window.addEventListener('resize', configScreen());
}

function configScreen() {
    let navbar = document.getElementById('navbar');
    let gameCanvas = document.getElementById('gameCanvas');
    if (checkDeviceMode() == 'mobile') {
        if (gameCanvas) {
            gameCanvas.classList.add('fullscreen');
        }
        setMobileScreenCustomization();
    } else if (checkDeviceMode() == 'desctop' && gameCanvas) {
        if (gameCanvas) {
            gameCanvas.classList.remove('fullscreen');
        }
        setDesctopScreenCustomization();
    }
}

function initStartScreen() {
    let gameScreen = document.getElementById('gameScreen')
    gameScreen.innerHTML = renderStartBtns();
    gameScreen.style.backgroundImage = "url('images/intro_outro_screens/start/startscreen_1.png')";
}

function handleScreenOrientation() {
    let pleaseRotateScreenImage = document.getElementById('pleaseRotateScreenImage');
    if (checkPageOrientation() == 'portrait') {
        pleaseRotateScreenImage.style.display = 'flex'
    } else {
        pleaseRotateScreenImage.style.display = 'none'
    }
}

function checkPageOrientation() {
    if (typeof window.orientation !== 'undefined') {
        if (window.orientation === 0 || window.orientation === 180) {
            return 'portrait';
        } else {
            return 'landscape';
        }
    } else {
        if (screen.availHeight > screen.availWidth) {
            return 'portrait';
        } else {
            return 'landscape';
        }
    }
}

function checkDeviceMode() {
    if (window.matchMedia('(pointer: fine)').matches) {
        return 'desctop'
    } else if(window.matchMedia('(pointer: coarse)').matches){
        return 'mobile'
    }
}

function setMobileScreenCustomization() {
    let gameScreen = document.getElementById('gameScreen');
    let header = document.getElementById('header');
    if (header) {
        header.style.display = 'none';
    }
    gameScreen.style.width = '100dvw';
    gameScreen.style.height = '100dvh';
}

function setDesctopScreenCustomization() {
    let gameScreen = document.getElementById('gameScreen');
    let header = document.getElementById('header');
    header.style.display = 'flex';
    gameScreen.style.width = '720px';
    gameScreen.style.height = '480px';
}

function reloadGame() {
    window.location.reload();
}

function showInstruction() {
    setBackgroundInstructions();
    renderStory();
}

function setBackgroundInstructions() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.style.backgroundImage = `url('images/background/air.png')`;
}
function renderStory() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML = storyHTML();
}
function renderInstructions() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML = explenationHTML();
}
function hideIntroduction() {
    let container = document.getElementById('InstructionsContainer');
    container.style.display = 'none'
}

function showImpressum() {
    setBackgroundInstructions();
    renderInformations();
}

function renderInformations() {
    let gameScreen = document.getElementById('gameScreen');
        gameScreen.innerHTML = ImpressumHTML();
}

function renderDataSecurity() {
    let screenContainer = document.getElementById('gameScreen');
        screenContainer.innerHTML = DataSecurityHTML();
}