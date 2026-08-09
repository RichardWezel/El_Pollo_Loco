/**
 * BackgroundObject represents a single tiled background image.
 * It extends `MovableObject` so it can be shifted for parallax scrolling.
 */
class BackgroundObject extends MovableObject {
    
    width = 720;
    height = 480;

    /**
     * @param {string} imagePath - Path to the background image
     * @param {number} x - Horizontal position for this background tile
     */
    constructor(imagePath, x) { 
        super().loadImage(imagePath);
        this.x = x; 
        this.height;
        this.y = 480 - this.height;
    }
}