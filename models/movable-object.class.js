class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 200;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
   
    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        
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

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
            // if (this.x + this.width < 0) { // Wolke wieder rechts erscheinen lassen
            //     this.x = 720;
            // }
        }, 100);
    }

    playAnimation(images) {
            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; => 0, Rest 0
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
    }


}