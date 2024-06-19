class Statusbar extends MovableObject {
    x;
    y;
    img;
    factor = 0.3;
    height = 158 * this.factor;
    width = this.height * 3.9666;

    constructor(imagePath, x, y) { // wird über die Erstellung eines neuen BackgroundObjects in world übergeben
        super().loadImage(imagePath);
        this.x = x; // this.x ist x des Objects // x ist die übergebene Variable
        this.y = y;
        this.height;
        this.y = 20;
    }
}