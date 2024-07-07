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
    throwableObject = [];

    // Funktionen
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // Rendering-Kontext
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Draws the canvas.
     * First delet the latest Draw and define the Frame of View on the Canvas (1./2.)
     * Adds an object to the Canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clearRect(x, y, width, height)
        this.ctx.translate(this.camera_x, 0); // translate(x, y) x= 0 siehe camera_x oben als Variable
        
        // backgrounds
        this.addObjectsToMap(this.level.backgroundObjects); // mehrere Elemente
        this.addObjectsToMap(this.level.clouds); // mehrere Elemente

        //statusbars
        this.ctx.translate(-this.camera_x, 0); // Back
        // space for fixed objects
        this.addToMap(this.statusbar_health); 
        this.addToMap(this.statusbar_bottle); 
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

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 500);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbar_health.setPercentage(this.character.energy);
            } 
        });
    }

    checkThrowObjects() {
        if(this.keyboard.KeyD) {
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 100);
            this.throwableObject.push(bottle);
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

