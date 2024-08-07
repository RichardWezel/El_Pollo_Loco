class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    BorderColor;
    energyCharacter = 100;
    lastHitCharacter = 0;
    lastHitEndboss = 0;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
    groundPos = 350; 

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            if (this.y < this.groundPos) {
                this.speedY -= this.acceleration;
            } else {
                this.y = this.groundPos;
                this.world.character.resetIdleTimer();
            }
        }
        }, 1000 / 25);
    }

    isAboveGround() {
            return this.y < this.groundPos;
    }

     // Methode für den Todessturz
     fallBelowGround() {
        this.groundPos = 500; // Neue groundPos, die weiter unten liegt als das Sichtfeld
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

    isColliding(obj) {
        return this.x + this.width - this.offset.right >= obj.x  + obj.offset.left &&
               this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
               this.y + this.height  - this.offset.bottom >= obj.y + obj.offset.top &&
               this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom;
    }

    hitCharacter() {
        if(this.energyCharacter > 0) {
            this.energyCharacter -= 2.5;
            console.log('Energy of Pepe is ', this.energyCharacter, '%')
            this.lastHitCharacter = new Date().getTime();
        }
    }

    hitEndboss() {
        if(this.energyEndboss > 0) {
            this.lastHitEndboss = new Date().getTime();
            console.log('Energy of Endboss is ', this.energyEndboss, '%')
        }
    }

    collect(collectedObject) {
        if (collectedObject == 'bottle') {
            this.world.character.collectedBottles += 12;
        } 
        if (collectedObject == 'coin') {
            this.world.character.collectedCoins += 12;
        } 
    }

    /**
     * Marks the Tim
     * 
     * @returns 
     */
    isHurtCharacter() {
        let timepassed = new Date().getTime() - this.lastHitCharacter; // difference in ms
        timepassed = timepassed / 500; // diffence in s
        return timepassed < 1  ;
    }

    isHurtEndboss() {
        let timepassed = new Date().getTime() - this.lastHitEndboss; // difference in ms
        timepassed = timepassed / 500; // diffence in s
        return timepassed < 1  ;
    }

    isDead() {
        return this.energyCharacter == 0;
    }
}