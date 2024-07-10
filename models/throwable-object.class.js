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
        this.rotation();
    }

    rotation() {
        this.intervalRotation = setInterval(() => {
            if(this.checkHitTheGround() == false) {
                this.x += 20;
                this.playAnimation(this.IMAGES_ROTATION);
            } else if (this.checkHitTheGround() == true || isColliding(world.level.enemies[3])) {
                this.playAnimationSplash(this.IMAGES_SPLASH)
            }
        }, 50);
    }

    checkHitTheGround() {
        if (this.y == 370) {
            return true
        } else {
            return false
        }
    }

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