class World {

    // Variablen
    character = new Character();
    level = level1; // const variable of level1.js
    canvas;
    ctx; 
    keyboard;
    camera_x = 0;
    statusbar_health = new Statusbar_health(20, 10);
    statusbar_bottle = new Statusbar_bottle(20, 50);
    statusbar_coin = new Statusbar_coin(20, 90);
    mute = new Mute();
    throwableObject = [];
    coin_collectinhg_sound = new Audio('audio/coin_sound.mp3')
    backgroundmusic = new Audio('audio/backgroundmusic.mp3')
    start_screen = new Start_screen();
    start = false;
    controlBtn = [
        new ControllSymbol(610, 430, 96, 96, 0.5, 'images/control/keyboard_arrow_left.png', 'walkLeft'),
        new ControllSymbol(670, 430, 96, 96, 0.5, 'images/control/keyboard_arrow_right.png', 'walkLeft'),
        new ControllSymbol(10, 360, 96, 96, 0.5, 'images/control/keyboard_arrow_up.png', 'jump'),
        new ControllSymbol(10, 420, 96, 96, 0.5, 'images/control/swords.png', 'throw'),
    ]

    // Funktionen
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // Rendering-Kontext
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.playBackgroundMusik();
    }

    playBackgroundMusik() {
        this.backgroundmusic.play();
        this.backgroundmusic.addEventListener('ended', () => {
            this.backgroundmusic.currentTime = 0;
            this.backgroundmusic.play();
        });
    }
    

    /**
     * Draws the canvas.
     * First delet the latest Draw and define the Frame of View on the Canvas (1./2.)
     * Adds an object to the Canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clearRect(x, y, width, height)
        this.ctx.translate(this.camera_x, 0); // translate(x, y) x= 0 siehe camera_x oben als Variable
        this.addToMap(this.start_screen); 
        
        // backgrounds
        this.addObjectsToMap(this.level.backgroundObjects); // mehrere Elemente
        this.addObjectsToMap(this.level.clouds); // mehrere Elemente
        
        this.addObjectsToMap(this.level.collectableObjects_bottles); // mehrere Elemente
        this.addObjectsToMap(this.level.collectableObjects_coin); // mehrere Elemente

        //statusbars
        this.ctx.translate(-this.camera_x, 0); // Back
        // space for fixed objects
        this.addToMap(this.statusbar_health); 
        this.addToMap(this.statusbar_bottle); 
        this.addToMap(this.statusbar_coin); 
        this.addToMap(this.mute); 
        this.addObjectsToMap(this.controlBtn);
        this.ctx.translate(this.camera_x, 0);// Forwards

        //Character
        this.addToMap(this.character);
        
        // others objects
        this.addObjectsToMap(this.level.enemies); // mehrere Elemente
        this.addObjectsToMap(this.throwableObject);
        
        
        // 4. Verschiebung des Zeichenkontexts rückgängig machen
        this.ctx.translate(-this.camera_x, 0);

        // 5. Wiederholung der Zeichnung mit requestAnimationFrame
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }              

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Connects the Variables with this world.
     */
    setWorld() {
        this.character.world = this;
        this.statusbar_health.world = this;
    }

    /**
     * Intervals of checking collisions with enemies or collectable objects and checking use of Key D to throw a bottle.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 150);
    }

    /**
     * Is called by run() in constructor of World with innterval of 150 ms.
     */
    checkCollisions() {
        this.collisionsWithEnemies();
        this.collisionsWithBottles();
        this.collisionsWithCoins();
    }

        /**
         * The function checks for each enemy object whether it collides with the character 
         * and triggers the hit() and setPercentage() functions.
         * hit() reduces the energy of character and register the time of hit witch is saved in lastHit variable.
         * setPercentage() is calld for the health statusbar and passed the character energy in the function with the mode 'decrease', witch caused a reduction of the statusbar.
         */
        collisionsWithEnemies() {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusbar_health.setPercentage(this.character.energy, 'decrease');
                } 
            });
        }

        collisionsWithBottles() {
            this.level.collectableObjects_bottles.forEach((object, index) => {
                if (this.character.isColliding(object)) {
                    this.character.collect('bottle');
                    this.statusbar_bottle.setPercentage(this.character.collectedBottles, 'decrease');
                    this.level.collectableObjects_bottles.splice(index, 1);
                } 
                if (this.level.enemies[0].isColliding(object)) {
                   
                }
            });
        }

        collisionsWithCoins() {
            this.level.collectableObjects_coin.forEach((object, index) => {
                if (this.character.isColliding(object)) {
                    this.character.collect('coin');
                    if(muteStatus == false) {
                        this.coin_collectinhg_sound.play();
                    } 
                    this.statusbar_coin.setPercentage(this.character.collectedCoins, 'decrease');
                    this.level.collectableObjects_coin.splice(index, 1);
                } 
            });
        }

    checkThrowObjects() {
        if(this.keyboard.KeyD) {
            if (this.character.collectedBottles > 11) {
                let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 100);
                this.throwableObject.push(bottle);
                this.character.collectedBottles -= 12;
                this.statusbar_bottle.setPercentage(this.character.collectedBottles, 'decrease');
            }
        }
    }

    flipImage(mo) {
        this.ctx.save(); // speichert den aktuellen Status unseres ctx
            this.ctx.translate(mo.width, 0); // translate(x, y) verschiebt den Ursprung des Zeichenkontexts um (x, y) Pixel.
                                                // In diesem Fall wird der Ursprung des Zeichenkontexts um die Breite des Bildes (mo.img.width) nach rechts verschoben. Dadurch wird die (0, 0)-Position des Zeichenkontexts an den rechten Rand des Bildes verschoben.
            this.ctx.scale(-1, 1);  // scale(x, y) skaliert den Zeichenkontext in x- und y-Richtung. Ein negativer Skalierungsfaktor invertiert die Richtung.
            mo.x = mo.x * -1;       // scale(-1, 1) spiegelt den Zeichenkontext horizontal. Das bedeutet, dass alles, was danach gezeichnet wird, horizontal gespiegelt wird.
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}

