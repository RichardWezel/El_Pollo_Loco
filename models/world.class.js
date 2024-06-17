class World {

    // Variablen
    character = new Character();
    enemies = level1.enemies;  
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx; 
    keyboard;
    camera_x = 0;

    // Funktionen
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // Rendering-Kontext
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        // 1. Canvas löschen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 2. Verschieben des Zeichenkontexts
        this.ctx.translate(this.camera_x, 0);

        // 3. Objekte zur Karte hinzufügen
        this.addObjectsToMap(this.backgroundObjects); // mehrere Elemente
        
        this.addObjectsToMap(this.clouds); // mehrere Elemente
        this.addObjectsToMap(this.enemies); // mehrere Elemente
        this.addToMap(this.character);

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

