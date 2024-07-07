let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

// Event Listener for Key down set true
window.addEventListener('keydown', (e) => {
    console.log(e)
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    } 
    
    if (e.code === 'ArrowLeft'){
        keyboard.LEFT = true;
    } 
    
    if (e.code === 'ArrowUp') {
        keyboard.UP = true;
    } 
    
    if (e.code === 'ArrowDown') {
        keyboard.DOWN = true;
    } 
    
    if (e.code === 'Space') {
        keyboard.SPACE = true;
    }

    if (e.code === 'KeyD') {
        keyboard.KeyD = true;
    }
});

// Event Listener for Key up set false
window.addEventListener('keyup', (e) => {
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    } 
    
    if (e.code === 'ArrowLeft'){
        keyboard.LEFT = false;
    } 
    
    if (e.code === 'ArrowUp') {
        keyboard.UP = false;
    } 
    
    if (e.code === 'ArrowDown') {
        keyboard.DOWN = false;
    } 
    
    if (e.code === 'Space') {
        keyboard.SPACE = false;
    }

    if (e.code === 'KeyD') {
        keyboard.KeyD = false;
    }
});


