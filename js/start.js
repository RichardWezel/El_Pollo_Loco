function init() {
    initStartScreen();
    handleScreenOrientation();
    window.addEventListener('resize', handleScreenOrientation);
    if (checkMobileDeviceSize()) {
        setMobileScreenCustomization();
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

function checkMobileDeviceSize() {
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    if (viewportWidth <= 720 || viewportHeight <= 640) {
        return true;
    } else {
        return false;
    }
}

function setMobileScreenCustomization() {
    let gameScreen = document.getElementById('gameScreen');
        let header = document.getElementById('header');
        header.style.display = 'none';
        gameScreen.style.width = '100dvw';
        gameScreen.style.height = '100dvh';
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