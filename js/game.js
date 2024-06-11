let canvas;
let world;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
}

document.addEventListener("click", function(){ 
    console.log('funktioniert!')
    world.character.x = world.character.x + 100;
 });
