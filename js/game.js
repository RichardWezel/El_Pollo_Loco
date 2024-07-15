
        let canvas;
        let ctx;
        let world;
        let keyboard = new Keyboard();
        let button = { x: 300, y: 50, width: 120, height: 40, radius: 10, text: "Start Game" };
        muteStatus = false;
       

        function init() {
            canvas = document.getElementById('canvas');
            ctx = canvas.getContext('2d');
            drawButton();
            canvas.addEventListener('click', onclickStartBtn);
        }

        

        function drawButton() {
            ctx.fillStyle = "#FF9601";
            drawRoundedRect(button.x, button.y, button.width, button.height, button.radius);
            ctx.fill();
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "24px boogaloo-regular";
            ctx.fillText(button.text, button.x + 10, button.y + 26);
        }

        function drawRoundedRect(x, y, width, height, radius) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
        }

        function getBounding(e) {
            let rect = canvas.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            return { x, y };
        }

        function onclickStartBtn(e) {
            let { x, y } = getBounding(e);
            if (x > button.x && x < button.x + button.width && y > button.y && y < button.y + button.height) {
                world = new World(canvas, keyboard);
                callEventListener();
            }
        }

       function callEventListener() {
            canvas.addEventListener('click', onclickMuteBtn);
            canvas.addEventListener('click', function(e) { onclickArrow(e, 0); });
            canvas.addEventListener('click', function(e) { onclickArrow(e, 1); });
            canvas.addEventListener('click', function(e) { onclickArrow(e, 2); });
            canvas.addEventListener('click', function(e) { onclickArrow(e, 3); });
        }

        function onclickMuteBtn(e) {
            let { x, y } = getBounding(e);
            if (x > world.mute.x && x < world.mute.x + world.mute.width && y > world.mute.y && y < world.mute.y + world.mute.height) {
                if (muteStatus == false) {
                    world.mute.loadImage('images/control/mute.png');
                    muteStatus = true;
                    world.backgroundmusic.pause();
                } else if (muteStatus == true) {
                    world.mute.loadImage('images/control/music.png');
                    muteStatus = false;
                    world.backgroundmusic.play();
                }
            }
        }

        function onclickArrow(e, index) {
            let { x, y } = getBounding(e);
            if (x > world.controlBtn[index].x && x < world.controlBtn[index].x + world.controlBtn[index].width && y > world.controlBtn[index].y && y < world.controlBtn[index].y + world.controlBtn[index].height) {
                walking(index);
                jumping(index);
            }
        }

        function jumping(index) {
            let character = world.character;
            if (index == 2 && character.y == 150) {
                character.jump();
                if(muteStatus == false) {
                character.jump_sound.play();
                }
            }
        }

        function throwing(index) {
            let character = world.character;
            if (index == 2 && character.y == 150) {
                character.jump();
                if(muteStatus == false) {
                character.jump_sound.play();
                }
            }
        }

        function walking(index) {
            let character = world.character;
            if (index == 0) {
                character.moveLeft();
                character.otherDirection = true;
            } else if (index == 1) {
                character.moveRight();
                character.otherDirection = false;
            }
            if(muteStatus == false) {
                character.walking_sound.play();
            }
        }

        // Event Listener for Key down set true
        window.addEventListener('keydown', (e) => {
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
                console.log('Key D is down')
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
