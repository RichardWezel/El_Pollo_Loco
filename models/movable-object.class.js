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
    speedY = 0;
    acceleration = 2.5;
    BorderColor;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 150;
    }

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

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
            let i = this.currentImage % images.length; // let i = 0 % 6; => 0, Rest 0
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
    }

    jump() {
        this.speedY = 30;
    }

    // Bessere Formel zur Kollisionsberechnung (Genauer)
    isColliding(obj) {
        return this.x + this.width >= obj.x &&
               this.x <= obj.x + obj.width &&
               this.y + this.height >= obj.y &&
               this.y <= obj.y + obj.height;
    }

    hit() {
        if(this.energy > 0) {
            this.energy -= 5;
            console.log('Energy of Pepe is ', this.energy, '%')
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // diffence in s
      
        return timepassed < 1  ;
    }

    isDead() {
        return this.energy == 0;
    }

}