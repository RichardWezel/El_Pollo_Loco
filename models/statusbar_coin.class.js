class Statusbar_coin extends Statusbar {
    STATUS_IMGAES = [
        'images/statusbar_coin/100.png',
        'images/statusbar_coin/80.png',
        'images/statusbar_coin/60.png',
        'images/statusbar_coin/40.png',
        'images/statusbar_coin/20.png',
        'images/statusbar_coin/0.png'
    ];

    constructor(x, y) { 
        super();
        this.loadImages(this.STATUS_IMGAES);
        this.x = x; 
        this.height;
        this.y = y;
        this.setPercentage(0, 'decrease') 
    }
}