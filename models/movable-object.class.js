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
   
    async loadImage(path) {
        return new Promise((resolve, reject) => {
            this.img = new Image();
            this.img.src = path;
            this.img.onload = () => {
                console.log(`Image loaded: ${path}`);
                resolve();
            };
            this.img.onerror = () => {
                console.error(`Failed to load image: ${path}`);
                reject();
            };
        });
    }

    async loadImages(arr) {
        let promises = arr.map((path) => {
            return new Promise((resolve, reject) => {
                let img = new Image();
                img.src = path;
                img.onload = () => {
                    console.log(`Image loaded: ${path}`);
                    this.imageCache[path] = img;
                    resolve();
                };
                img.onerror = () => {
                    console.error(`Failed to load image: ${path}`);
                    reject();
                };
            });
        });
        await Promise.all(promises);
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