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
     * Shared across every DrawableObject instance (path -> Image), so the same file is
     * only ever downloaded/decoded once no matter how many game objects use it. Before
     * this existed, every Chicken/Chick instance (8 + 7 of them) loaded its own separate
     * copy of the same handful of walking-animation images, wasting memory and adding
     * unnecessary garbage-collection pauses. Declared `static` so it belongs to the class
     * itself, not to individual instances.
     */
    static sharedImageCache = {};

    /**
     * Return the shared Image for the given path, creating and caching it in
     * DrawableObject.sharedImageCache on first use.
     *
     * @param {string} path - The image file path.
     * @returns {HTMLImageElement}
     */
    static getSharedImage(path) {
        if (!DrawableObject.sharedImageCache[path]) {
            const img = new Image();
            img.src = path;
            DrawableObject.sharedImageCache[path] = img;
        }
        return DrawableObject.sharedImageCache[path];
    }

    /**
    * Loads an image from the given path (via the shared cache) and uses it as the
    * current image.
    *
    * @param {string} path - The image file path.
    */
    loadImage(path) {
        this.img = DrawableObject.getSharedImage(path);
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
     * Loads multiple images (via the shared cache) and records them in this instance's
     * own imageCache lookup table (path -> shared Image), so playAnimation() etc. can
     * keep looking frames up by path exactly as before.
     *
     * @param {string[]} arr - An array of image file paths to load and cache.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            this.imageCache[path] = DrawableObject.getSharedImage(path);
        });
    }
}