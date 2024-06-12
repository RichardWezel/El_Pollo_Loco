let canvas;
let world;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
}

addEventListener('keydown', (e) => {
    console.log(e.code );
    if (e.code === 'ArrowRight') {
        world.character.x = world.character.x + 50;
    } else if (e.code === 'ArrowLeft'){
        world.character.x = world.character.x - 50;
    }
    
});


// addEventListener("keyup", function(e) {
//     if (e.keyCode === 37) {
//       left()
//     }
//   })
  
//   addEventListener("keyup", function(e) {
//     if (e.keyCode === 38) {
//       jump()
//     }
//   })
  
//   addEventListener("keyup", function(e) {
//     if (e.keyCode === 39) {
//       right()
//     }
//   })