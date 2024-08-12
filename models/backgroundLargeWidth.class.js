class BackgroundObjectLargWidth extends MovableObject {
    
    width = 720 * 2;
    height = 480;

    constructor(imagePath, x) { 
        super().loadImage(imagePath);
        this.x = x; 
        this.height;
        this.y = 480 - this.height;
    }
}