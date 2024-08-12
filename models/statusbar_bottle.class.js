class Statusbar_bottle extends Statusbar {
    STATUS_IMGAES = [
        'images/statusbar_bottle/100.png',
        'images/statusbar_bottle/80.png',
        'images/statusbar_bottle/60.png',
        'images/statusbar_bottle/40.png',
        'images/statusbar_bottle/20.png',
        'images/statusbar_bottle/0.png'
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