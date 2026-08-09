/**
 * A larger-width background tile variant used where double-width
 * backgrounds are required for seamless scrolling.
 */
class BackgroundObjectLargWidth extends MovableObject {
    
    width = 720 * 2;
    height = 480;

    /**
     * @param {string} imagePath - Image path for the background tile
     * @param {number} x - Horizontal position
     */
    constructor(imagePath, x) { 
        super().loadImage(imagePath);
        this.x = x; 
        this.height;
        this.y = 480 - this.height;
    }
}