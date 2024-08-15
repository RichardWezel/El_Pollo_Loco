class DrawableObject {
    img;
    imageCache = {};
    x = 120;
    y = 250;
    height = 200;
    width = 100;
    currentImage = 0;

    /**
    * Loads an image from the specified path and sets it as the current image.
    *
    * @param {string} path - The path to the image file.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * Draws the current image onto the given canvas context.
    *
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
    */
    draw(ctx) {
         ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
    * Loads multiple images from the specified paths and caches them.
    *
    * @param {string[]} arr - An array of image file paths.
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        })
    }
}