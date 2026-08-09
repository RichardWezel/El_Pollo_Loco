/**
 * Initialize the start screen on page load.
 * Sets up the start UI, prompts for device rotation when needed,
 * and adapts the layout to the current device dimensions.
 */
function init() {
    initStartScreen();
    handleScreenOrientation();
    window.addEventListener('resize', configScreen());
}

/**
 * Adjust game layout and canvas size based on the detected device type.
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
 * Populate the start screen UI and set the background image.
 */
function initStartScreen() {
    let gameScreen = document.getElementById('gameScreen')
    gameScreen.innerHTML = StartBtnsHTML();
    gameScreen.style.backgroundImage = "url('images/intro_outro_screens/start/startscreen_1.png')";
}

/**
 * Show or hide the "please rotate your device" prompt depending on orientation.
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
 * Return the current page orientation.
 *
 * @returns {string} 'portrait' or 'landscape'
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
 * Detect device input type using matchMedia and return a device mode.
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
 * Configure the layout for mobile devices: hide the header and make the
 * game container fill the viewport.
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
 * Configure the layout for desktop devices: show the header and set a fixed
 * game container size.
 */
function setDesctopScreenCustomization() {
    let gameScreen = document.getElementById('gameScreen');
    let header = document.getElementById('header');
    header.style.display = 'flex';
    gameScreen.style.width = '720px';
    gameScreen.style.height = '480px';
}

/**
 * Reload the current page.
 */
function reloadGame() {
    window.location.reload();
}

/**
 * Show the game story screen.
 */
function showInstruction() {
    setBackgroundInstructions();
    renderStory();
}

/**
 * Apply the instruction screen background image.
 */
function setBackgroundInstructions() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.style.backgroundImage = `url('images/background/air.png')`;
}

/**
 * Render the game story content into the game screen.
 */
function renderStory() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML = storyHTML();
}

/**
 * Render the game instructions content into the game screen.
 */
function renderInstructions() {
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML = explenationHTML();
}

/**
 * Hide the instructions container.
 */
function hideIntroduction() {
    let container = document.getElementById('InstructionsContainer');
    container.style.display = 'none'
}

/**
 * Show the legal / information screen (impressum, data security).
 */
function showImpressum() {
    setBackgroundInstructions();
    renderInformations();
}

/**
 * Render the impressum (legal information) into the game screen.
 */
function renderInformations() {
    let gameScreen = document.getElementById('gameScreen');
        gameScreen.innerHTML = ImpressumHTML();
}

/**
 * Render the data security (privacy) content into the game screen.
 */
function renderDataSecurity() {
    let screenContainer = document.getElementById('gameScreen');
        screenContainer.innerHTML = DataSecurityHTML();
}