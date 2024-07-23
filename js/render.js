let language = "german";

function initStartScreen() {
    let screenContainer = document.getElementById('gameScreen')
    screenContainer.innerHTML = renderBtns();
    document.getElementById('gameScreen').style.backgroundImage = "url('images/intro_outro_screens/start/startscreen_1.png')";
}

function startGame() {
    document.getElementById('gameScreen').style.backgroundImage = 'none';
    setControlBtns();
    addCanvasHTMLElement();
    initCanvas();
}

    function setControlBtns() {
        let screenContainer = document.getElementById('gameScreen');
        screenContainer.innerHTML = ControlSymbolsHTML();
    }

    function addCanvasHTMLElement() {
        let screenContainer = document.getElementById('gameScreen');
        screenContainer.innerHTML += canvasHTML_Element();
    }

    function initCanvas() {
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard);
    }

function showInstruction() {
    setBackgroundInstructions();
    renderInstructions();
}

function showSettings() {

}



function setBackgroundInstructions() {
    let screenContainer = document.getElementById('gameScreen');
    screenContainer.style.backgroundImage = `url('images/background/air.png')`;
    screenContainer.style.justifyContent = 'start';
    screenContainer.style.flexDirection = 'column';
}



function renderInstructions() {
    let screenContainer = document.getElementById('gameScreen');
    screenContainer.innerHTML = explenationHTML();
}





function hideIntroduction() {
    let container = document.getElementById('InstructionsContainer');
    container.style.display = 'none'
}





