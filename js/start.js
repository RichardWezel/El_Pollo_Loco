function init() {
    initStartScreen();
    if (screen.availHeight < 640) {
        fullscreen();
    }
    checkMobileDeviceSize();
    showScreenRotationPromt();
}

function showScreenRotationPromt() {
   
    if (screen.availHeight > screen.availWidth) {
        setRotateScreenImage();
    } else {
        removeRotateScreenImage();
    }
}

    function setRotateScreenImage() {
        console.log('add rotation');
        document.getElementById('gameScreen').innerHTML += svgScreenRotation();
    }

    function removeRotateScreenImage() {
        let rotateScreenImage = document.getElementById('pleaseRotateScreenImage');
        if (rotateScreenImage) {
            rotateScreenImage.remove();
        }
    }

function initStartScreen() {
    let screenContainer = document.getElementById('gameScreen')
    screenContainer.innerHTML = renderStartBtns();
    screenContainer.style.backgroundImage = "url('images/intro_outro_screens/start/startscreen_1.png')";
}

function checkMobileDeviceSize() {
    let gameScreen = document.getElementById('gameScreen');
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    
    if (viewportWidth <= 1024 && viewportHeight <= 768) {
        gameScreen.classList.add('fullscreen');
        document.getElementById('header').style.display = 'none';
    } else {
        gameScreen.classList.remove('fullscreen');
    }
}

window.addEventListener('resize', checkMobileDeviceSize);

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