class BackgroundObject extends MovableObject {
    
    width = 720;

    constructor(imagePath, x, hight) { // wird über die Erstellung eines neuen BackgroundObjects in world übergeben
        super().loadImage(imagePath);
        this.x = x; // this.x ist x des Objects // x ist die übergebene Variable
        this.height = hight
        this.y = 480 - this.height;
    }
}