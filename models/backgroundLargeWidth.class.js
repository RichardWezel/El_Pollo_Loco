class BackgroundObjectLargWidth extends MovableObject {
    
    width = 720 * 2;
    height = 480;

    constructor(imagePath, x) { // wird über die Erstellung eines neuen BackgroundObjects in world übergeben
        super().loadImage(imagePath);
        this.x = x; // this.x ist x des Objects // x ist die übergebene Variable
        this.height;
        this.y = 480 - this.height;
    }
}