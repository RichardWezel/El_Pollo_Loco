class MovableObject extends DrawableObject {
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
            if (this.y < 370) {
                this.speedY -= this.acceleration;
            } else {
                this.y = 370;
            }
        }
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) { // Throwable Objects should alsways fall
            return true;
        } else {
            return this.y < 150;
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
            this.energy -= 2.5;
            console.log('Energy of Pepe is ', this.energy, '%')
            this.lastHit = new Date().getTime();
        }
    }

    collect(collectedObject) {
        if (collectedObject == 'bottle') {
            this.world.character.collectedBottles += 12;
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