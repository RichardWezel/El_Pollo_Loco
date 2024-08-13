class Statusbar_endboss extends Statusbar {
    STATUS_IMAGES = [
        'images/statusbar_endboss/100.png',
        'images/statusbar_endboss/80.png',
        'images/statusbar_endboss/60.png',
        'images/statusbar_endboss/40.png',
        'images/statusbar_endboss/20.png',
        'images/statusbar_endboss/0.png'
    ];
    world;

    constructor(y) { 
        super();
        this.loadImages(this.STATUS_IMAGES);
        this.y = y;
        this.setPercentage(100, 'decrease') 
        this.loadImage(this.STATUS_IMAGES[0]);
    }

    updateX() {
        if (this.world && this.world.level && this.world.level.enemies[0]) {
            this.x = this.world.level.enemies[0].x;
        }
    }
}