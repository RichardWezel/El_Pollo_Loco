/**
 * Represents a drawable object that can be rendered on a canvas.
 */
class DrawableObject {
    img;
    imageCache = {};
    x = 120;
    y = 250;
    height = 200;
    width = 100;
    currentImage = 0;

    /**
    * Loads an image from the given path and uses it as the current image.
    *
    * @param {string} path - The image file path.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * Draws the current image onto the given canvas context if it is loaded.
    *
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
    */
    draw(ctx) {
         if (!this.img || !this.img.complete) return;
         ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images from the specified paths and caches them.
     * Images are horizontally flipped (mirrored).
     *
     * @param {string[]} arr - An array of image file paths to load and cache.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            img.style.transform = 'scaleX(-1)';
            this.imageCache[path] = img;
        });
    }
}