function init() {
    initStartScreen();
    handleScreenOrientation();
    window.addEventListener('orientationchange', handleScreenOrientation);
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
    if (checkPageOrientation() == 'portrait') {
        setRotateScreenImage();
    } else {
        removeRotateScreenImage() 
    }
}

function checkPageOrientation() {
    if (screen.availHeight > screen.availWidth) {
        console.log('Hochformat');
        return 'portrait';
    } else {
        console.log('Querformat');
        return 'landscape';
    }
}

function setRotateScreenImage() {
    let rotateScreenMessage = document.getElementById('rotateScreenMessage');
    rotateScreenMessage.innerHTML = svgScreenRotation();
}

function removeRotateScreenImage() {
    let rotateScreenMessage = document.getElementById('rotateScreenMessage');
    rotateScreenMessage.innerHTML = '';
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