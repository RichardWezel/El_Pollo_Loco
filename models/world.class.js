class World {

    // Variablen
    character = new Character();
    enemies = [
        new Chicken(), 
        new Chicken(), 
        new Chicken(), 
    ];  
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0, 480), // Himmel ; wir din den constructor reingegeben
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 480),// Berge
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 300), // Kakten
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 400) // bunt Kakten
    ];
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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        // this.moveClouds(); // Füge diese Zeile hinzu, um die Wolken zu bewegen

        this.addObjectsToMap(this.backgroundObjects); // mehrere Elemente
        this.addToMap(this.character);
        this.addObjectsToMap(this.clouds); // mehrere Elemente
        this.addObjectsToMap(this.enemies); // mehrere Elemente

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wir dimmer wieder aufgerufen
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

        // if (mo.img == '../img/5_background/layers/4_clouds/1.png') {
        //     // zeichnet Rahmen:
        //     this.ctx.strokeStyle = 'red'; // Farbe des Rahmens
        //     this.ctx.lineWidth = 2; // Breite des Rahmens
        //     this.ctx.strokeRect(mo.x, mo.y, mo.width, mo.height);
        // }
    }

    

}

