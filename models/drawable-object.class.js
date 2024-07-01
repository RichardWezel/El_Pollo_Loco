class DrawableObject {
    img;
    imageCache = {};
    x = 120;
    y = 250;
    height = 200;
    width = 100;
    currentImage = 0;

    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
         ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = this.BorderColor;
            ctx.rect(this.x,this.y,this.width,this.height);
            ctx.stroke();
        }
        
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...] 
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