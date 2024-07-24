class Statusbar_endboss extends Statusbar {
    STATUS_IMGAES = [
        'images/statusbar_endboss/100.png',
        'images/statusbar_endboss/80.png',
        'images/statusbar_endboss/60.png',
        'images/statusbar_endboss/40.png',
        'images/statusbar_endboss/20.png',
        'images/statusbar_endboss/0.png'
    ];
    world;

    constructor(y) { // wird über die Erstellung eines neuen BackgroundObjects in world übergeben
        super();
        this.loadImages(this.STATUS_IMGAES);
        this.y = y;
        this.setPercentage(100, 'decrease') // setzt initial die 100%, weitere Veränderungen über die world
        this.loadImage(this.STATUS_IMGAES[0]);
    }

    // Neue Methode zum Setzen der X-Position
    updateX() {
        if (this.world && this.world.level && this.world.level.enemies[0]) {
            this.x = this.world.level.enemies[0].x;
        }
    }
}