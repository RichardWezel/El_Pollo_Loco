class Statusbar extends MovableObject {
    factor = 0.3;
    height = 158 * this.factor;
    width = this.height * 3.9666;
    STATUS_IMGAES = [];
    world;
   
    percentage = 100;
   

    constructor(x, y) { // wird über die Erstellung eines neuen BackgroundObjects in world übergeben
        super();
        this.loadImages(this.STATUS_IMGAES);
        this.x = x; // this.x ist x des Objects // x ist die übergebene Variable
        this.height;
        this.y = y;
        this.setPercentage(this.percentage) // setzt initial die 100%, weitere Veränderungen über die world
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let imagePath = this.STATUS_IMGAES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }
    
    resolveImageIndex() {
        if(this.percentage == 100) {
            return 0
        } else if (this.percentage > 80) {
            return 1
        } else if (this.percentage > 60) {
            return 2
        } else if (this.percentage > 40) {
            return 3
        } else if (this.percentage > 20) {
            return 4
        } else {
            return 5
        }
    }
       
}

