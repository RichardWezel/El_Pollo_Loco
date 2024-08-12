class Statusbar_health extends Statusbar {
    STATUS_IMGAES = [
        'images/statusbar_health/100.png',
        'images/statusbar_health/80.png',
        'images/statusbar_health/60.png',
        'images/statusbar_health/40.png',
        'images/statusbar_health/20.png',
        'images/statusbar_health/0.png'
    ];

    constructor(x, y) { 
        super();
        this.loadImages(this.STATUS_IMGAES);
        this.x = x; 
        this.y = y;
        this.setPercentage(100, 'decrease') 
    }
}