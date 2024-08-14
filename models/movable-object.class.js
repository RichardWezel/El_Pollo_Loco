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
            }
        }
        }, 1000 / 25);
    }

    isAboveGround() {
            return this.y < this.groundPos;
    }

    fallBelowGround() {
        this.groundPos = 500;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
            let i = this.currentImage % images.length; 
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

    hitCharacter(enemy) {
        if (!this.isHurtCharacter()) {
            if (enemy instanceof Endboss) {
                this.energyCharacter -= 10;
            } else {
                this.energyCharacter -= 3;
            }
            this.energyCharacter -= 3;
            console.log('Energy of Pepe is ', this.energyCharacter, '%');
            this.lastHitCharacter = new Date().getTime();
            this.checkGameOver();
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
            this.world.character.collectedBottles += 1;
        } 
        if (collectedObject == 'coin') {
            this.world.character.collectedCoins += this.calcCoinAddion();
        } 
    }

    calcCoinAddion() {
        let amoundOfCoins = this.world.level.collectableObjects_coin.length;
        let number = 100 / amoundOfCoins;
        return number;
    }

    calcBottleAddion() {
        let amoundOfBottles = this.world.level.collectableObjects_bottles.length;
        let number = 100 / amoundOfBottles;
        return number;
    }

    isHurtCharacter() {
        let timepassed = new Date().getTime() - this.lastHitCharacter; 
        timepassed = timepassed / 500; 
        return timepassed < 1  ;
    }

    isHurtEndboss() {
        let timepassed = new Date().getTime() - this.lastHitEndboss; 
        timepassed = timepassed / 500; 
        return timepassed < 1  ;
    }

    isDead() {
        return this.energyCharacter <= 0;
    }
}