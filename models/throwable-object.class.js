class ThrowableObject extends MovableObject {
    factor = 0.2;
    height = 400 * this.factor;
    width = 400 * this.factor;
    speedX = 20;
    IMAGES_ROTATION = [
        'images/bottle/rotation/1_bottle_rotation.png',
        'images/bottle/rotation/2_bottle_rotation.png',
        'images/bottle/rotation/3_bottle_rotation.png',
        'images/bottle/rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        'images/bottle/splash/1_bottle_splash.png',
        'images/bottle/splash/2_bottle_splash.png',
        'images/bottle/splash/3_bottle_splash.png',
        'images/bottle/splash/4_bottle_splash.png',
        'images/bottle/splash/5_bottle_splash.png',
        'images/bottle/splash/6_bottle_splash.png'
    ];
    intervalRotation;
    splash_sound = new Audio('audio/bottle_break.mp3');
    hasCollided = false;
   
    constructor(x, y) {
        super().loadImage('images/bottle/solo/salsa_bottle_standing.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw() {
        this.speedY = 30; // Geschwindigkeit des Falls
        this.applyGravity(); // senkt speedY
        this.bottleFly();
    }

    bottleFly() {
        this.intervalRotation = setInterval(() => {
            if (this.checkHitTheGround()) {
                this.bottleSplash();
            } else {
                this.bottleRotation();
            }
        }, 50);
    }

    bottleRotation() {
        if (!this.checkHitTheGround()) {
            this.x += 20;
            this.playAnimation(this.IMAGES_ROTATION);
        }
        
    }

    bottleSplash() {
        this.playAnimationSplash(this.IMAGES_SPLASH);
        this.hasCollided = true; // Flasche markiert als zerschellt
        this.splash_sound.playbackRate = 3;
        if (volumeStatus == false) {
            this.splash_sound.play();
        }
    }
    

    checkHitTheGround() {
        if (this.y == 350) {
            return true
        } else {
            return false
        }
    }

    // checkCollisionWithEnemies() {
    //     world.level.enemies.forEach((enemy) => {
    //         if (enemy instanceof Endboss && this.isColliding(enemy)) {
    //             enemy.hitEndboss();
    //             this.bottleSplash();
    //         }
    //     });
    // }

    playAnimationSplash(images) {
        let i = 100;
        i = this.currentImage % images.length; // let i = 0 % 6; => 0, Rest 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        if(i == 0) {
            this.deleteObject()
        }
    }

    deleteObject(){
        world.throwableObject.splice(0,1);
        clearInterval(this.intervalRotation);
    }
    
   
}