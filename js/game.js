let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);



    console.log('My Character is', world.character);

}



// document.addEventListener('keydown', (e) => {
//     console.log(e)
// });

window.addEventListener('keydown', (e) => {
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = true;
        console.log('keyboard.RIGHT = ', keyboard.RIGHT);
    
    } else if (e.code === 'ArrowLeft'){
        keyboard.LEFT = true;
        world.character.x = world.character.x - 50;
        console.log('keyboard.LEFT = ', keyboard.LEFT);
    } else if (e.code === 'ArrowUp') {
        keyboard.UP = true;
        console.log('keyboard.UP = ', keyboard.UP);
    } else if (e.code === 'Space') {
        keyboard.SPACE = true;
        console.log('keyboard.SPACE = ', keyboard.SPACE);
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = false;
        console.log('keyboard.RIGHT = ', keyboard.RIGHT);
    
    } else if (e.code === 'ArrowLeft'){
        keyboard.LEFT = false;
        console.log('keyboard.LEFT = ', keyboard.LEFT);
    } else if (e.code === 'ArrowUp') {
        keyboard.UP = false;
        console.log('keyboard.UP = ', keyboard.UP);
    } else if (e.code === 'Space') {
        keyboard.SPACE = false;
        console.log('keyboard.SPACE = ', keyboard.SPACE);
    }
});


