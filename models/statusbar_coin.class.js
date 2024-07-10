class Statusbar_coin extends Statusbar {
    STATUS_IMGAES = [
        'images/statusbar_coin/100.png',
        'images/statusbar_coin/80.png',
        'images/statusbar_coin/60.png',
        'images/statusbar_coin/40.png',
        'images/statusbar_coin/20.png',
        'images/statusbar_coin/0.png'
    ];

    constructor(x, y) { // wird über die Erstellung eines neuen BackgroundObjects in world übergeben
        super();
        this.loadImages(this.STATUS_IMGAES);
        this.x = x; // this.x ist x des Objects // x ist die übergebene Variable
        this.height;
        this.y = y;
        this.setPercentage(0, 'decrease') // setzt initial die 100%, weitere Veränderungen über die world
    }
}