class Statusbar_health extends Statusbar {
    STATUS_IMGAES = [
        'images/statusbar_health/100.png',
        'images/statusbar_health/80.png',
        'images/statusbar_health/60.png',
        'images/statusbar_health/40.png',
        'images/statusbar_health/20.png',
        'images/statusbar_health/0.png'
    ];

    constructor(x, y) { // wird über die Erstellung eines neuen BackgroundObjects in world übergeben
        super();
        this.loadImages(this.STATUS_IMGAES);
        this.x = x; // this.x ist x des Objects // x ist die übergebene Variable
        this.height;
        this.y = y;
        this.setPercentage(this.percentage) // setzt initial die 100%, weitere Veränderungen über die world
    }
}