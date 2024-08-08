function init() {
    initStartScreen();
    handleScreenOrientation();
    window.addEventListener('resize', handleScreenOrientation);
    checkMobileDeviceSize();
}

function initStartScreen() {
    let screenContainer = document.getElementById('gameScreen')
    screenContainer.innerHTML = renderStartBtns();
    screenContainer.style.backgroundImage = "url('images/intro_outro_screens/start/startscreen_1.png')";
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


function checkMobileDeviceSize() {
    let gameScreen = document.getElementById('gameScreen');
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    
    if (viewportWidth <= 720 || viewportHeight <= 640) {
        document.getElementById('header').style.display = 'none';
        gameScreen.style.width = '100dvw';
        gameScreen.style.height = '100dvh';
    } else {
       
        return false;
    }
}





function reloadGame() {
    window.location.reload();
}

function showInstruction() {
    setBackgroundInstructions();
    renderStory();
}

    function setBackgroundInstructions() {
        let screenContainer = document.getElementById('gameScreen');
        screenContainer.style.backgroundImage = `url('images/background/air.png')`;
    }

    function renderStory() {
        let screenContainer = document.getElementById('gameScreen');
        screenContainer.innerHTML = storyHTML();
    }

    function renderInstructions() {
        let screenContainer = document.getElementById('gameScreen');
        screenContainer.innerHTML = explenationHTML();
    }

    function hideIntroduction() {
        let container = document.getElementById('InstructionsContainer');
        container.style.display = 'none'
    }

function showInformations() {
    setBackgroundInstructions();
    renderInformations();
}

function renderInformations() {
    let screenContainer = document.getElementById('gameScreen');
        screenContainer.innerHTML = ImpressumHTML();
}


function renderDataSecurity() {
    let screenContainer = document.getElementById('gameScreen');
        screenContainer.innerHTML = DataSecurityHTML();
}