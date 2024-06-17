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
        this.addToMap(this.character);
        this.addObjectsToMap(this.clouds); // mehrere Elemente
        this.addObjectsToMap(this.enemies); // mehrere Elemente

        // 4. Verschiebung des Zeichenkontexts rückgängig machen
        this.ctx.translate(-this.camera_x, 0);

        // 5. Wiederholung der Zeichnung mit requestAnimationFrame
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });

    }

    // moveClouds() {
    //     this.clouds.forEach(cloud => {
    //         cloud.x -= 0.5; // Geschwindigkeit der Wolkenbewegung
    //         if (cloud.x + cloud.width < 0) {
    //             cloud.x = this.canvas.width; // Wolke wieder rechts erscheinen lassen
    //         }
    //     });
    // }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.ctx.save(); // speichert den aktuellen Status unseres ctx
            this.ctx.translate(mo.width, 0); // translate(x, y) verschiebt den Ursprung des Zeichenkontexts um (x, y) Pixel.
                                                // In diesem Fall wird der Ursprung des Zeichenkontexts um die Breite des Bildes (mo.img.width) nach rechts verschoben. Dadurch wird die (0, 0)-Position des Zeichenkontexts an den rechten Rand des Bildes verschoben.
            this.ctx.scale(-1, 1);  // scale(x, y) skaliert den Zeichenkontext in x- und y-Richtung. Ein negativer Skalierungsfaktor invertiert die Richtung.
            mo.x = mo.x * -1;       // scale(-1, 1) spiegelt den Zeichenkontext horizontal. Das bedeutet, dass alles, was danach gezeichnet wird, horizontal gespiegelt wird.
        }                           
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if(mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }

        if (mo.img == 'images/background/4_clouds/1.png') {
            // zeichnet Rahmen:
            this.ctx.strokeStyle = 'red'; // Farbe des Rahmens
            this.ctx.lineWidth = 2; // Breite des Rahmens
            this.ctx.strokeRect(mo.x, mo.y, mo.width, mo.height);
        }
    }

    

}

