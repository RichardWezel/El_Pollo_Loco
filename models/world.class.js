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
    ]
    canvas;
    ctx; 

    // Funktionen
    constructor(canvas) {
        this.ctx = canvas.getContext('2d'); // Rendering-Kontext
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // this.moveClouds(); // Füge diese Zeile hinzu, um die Wolken zu bewegen

        this.addObjectsToMap(this.backgroundObjects); // mehrere Elemente
        this.addToMap(this.character);
        this.addObjectsToMap(this.clouds); // mehrere Elemente
        this.addObjectsToMap(this.enemies); // mehrere Elemente

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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        // if (mo.img == '../img/5_background/layers/4_clouds/1.png') {
        //     // zeichnet Rahmen:
        //     this.ctx.strokeStyle = 'red'; // Farbe des Rahmens
        //     this.ctx.lineWidth = 2; // Breite des Rahmens
        //     this.ctx.strokeRect(mo.x, mo.y, mo.width, mo.height);
        // }
    }

    

}

