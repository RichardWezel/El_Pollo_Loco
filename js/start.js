/**
 * Initializes onload of index.html the functions for set the start screen, asks the user to rotate the screen if necessary and adapts the dimensions of the program to those of the user device.
 */
function init() {
    initStartScreen();
    handleScreenOrientation();
    window.addEventListener('resize', configScreen());
}

/**
 * Adapts the dimensions of the program to those of the user device.
 */
function configScreen() {
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

/**
 * Initializes onload of index.html the start screen with buttons and backgroundimage.
 */
function initStartScreen() {
    let gameScreen = document.getElementById('gameScreen')
    gameScreen.innerHTML = StartBtnsHTML();
    gameScreen.style.backgroundImage = "url('images/intro_outro_screens/start/startscreen_1.png')";
}

/**
 * Handels the logig for the please of screen rotation.
 */
function handleScreenOrientation() {
    let pleaseRotateScreenImage = document.getElementById('pleaseRotateScreenImage');
    if (checkPageOrientation() == 'portrait') {
        pleaseRotateScreenImage.style.display = 'flex'
    } else {
        pleaseRotateScreenImage.style.display = 'none'
    }
}

/**
 * Checks the page orientation and returns the current condition.
 * 
 * @returns {string} - "portrait" or "landscape"
 */
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

/**
 * Checks the mode of device (mobile or desctop) by using matchMedia pointer and returns the current condition.
 * 
 * @returns {string} 'desctop' or 'mobile'
 */
function checkDeviceMode() {
    if (window.matchMedia('(pointer: fine)').matches) {
        return 'desctop'
    } else if(window.matchMedia('(pointer: coarse)').matches){
        return 'mobile'
    }
}

/**
 * Adapts the dimensions of the game screen to those of a mobile device. The entire screen is filled.
 */
function setMobileScreenCustomization() {
    let gameScreen = document.getElementById('gameScreen');
    let header = document.getElementById('header');
    if (header) {
        header.style.display = 'none';
    }
    gameScreen.style.width = '100dvw';
    gameScreen.style.height = '100dvh';
}

/**
 * Adapts the dimensions of the game screen to those of a desctop device. 
 */
function setDesctopScreenCustomization() {
    let gameScreen = document.getElementById('gameScreen');
    let header = document.getElementById('header');
    header.style.display = 'flex';
    gameScreen.style.width = '720px';
    gameScreen.style.height = '480px';
}

/**
 * reload the webpage.
 */
function reloadGame() {
    window.location.reload();
}

/**
 * Fils the game screen with the game story.
 */
function showInstruction() {
    setBackgroundInstructions();
    renderStory();
}

/**
 * Set the background style of game instructions.
 */
function setBackgroundInstructions() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.style.backgroundImage = `url('images/background/air.png')`;
}

/**
 * Set the content of game story.
 */
function renderStory() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML = storyHTML();
}

/**
 * Sets the content of game instructions.
 */
function renderInstructions() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML = explenationHTML();
}

/**
 * Removes the elements of instruction.
 */
function hideIntroduction() {
    let container = document.getElementById('InstructionsContainer');
    container.style.display = 'none'
}

/**
 * Sets the content of game informations like impressum and data security.
 */
function showImpressum() {
    setBackgroundInstructions();
    renderInformations();
}

/**
 * Sets the content of game impressum.
 */
function renderInformations() {
    let gameScreen = document.getElementById('gameScreen');
        gameScreen.innerHTML = ImpressumHTML();
}

/**
 * Sets the content of game data security.
 */
function renderDataSecurity() {
    let screenContainer = document.getElementById('gameScreen');
        screenContainer.innerHTML = DataSecurityHTML();
}