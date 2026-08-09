/**
 * ThrowableObject represents a bottle the player can throw.
 * It handles flight, rotation, collision and splash animation.
 */
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

    /**
     * Initiate throw behavior: set upward velocity, enable gravity and start flight.
     */
    throw() {
        this.speedY = 30; 
        this.applyGravity(); 
        this.bottleFly();
    }

    /**
     * Start the flight loop: while airborne rotate the bottle, otherwise splash.
     */
    bottleFly() {
        this.intervalRotation = setInterval(() => {
            if (this.checkHitTheGround()) {
                this.bottleSplash();
            } else {
                this.bottleRotation();
            }
        }, 50);
    }

    /**
     * Advance the bottle horizontally and play rotation animation while airborne.
     */
    bottleRotation() {
        if (!this.checkHitTheGround()) {
            this.x += 20;
            this.playAnimation(this.IMAGES_ROTATION);
        }
    }

    /**
     * Play the splash animation, mark the bottle as collided and play splash sound.
     */
    bottleSplash() {
        this.playAnimationSplash(this.IMAGES_SPLASH);
        this.hasCollided = true; 
        this.splash_sound.playbackRate = 3;
        if (volumeStatus == false) {
            this.splash_sound.play();
        }
    }
    
    /**
    * Return true if the bottle has reached the ground level (y == 350).
    * @returns {boolean}
    */
    checkHitTheGround() {
        return this.y == 350;
    }

    /**
     * Advance the splash animation and remove the object when the cycle completes.
     * @param {string[]} images - splash frame image paths
     */
    playAnimationSplash(images) {
        let i = this.currentImage % images.length; 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        if(i == 0) {
            this.deleteObject()
        }
    }

    /**
     * Remove this bottle instance from the world's throwableObject array and stop its interval.
     */
    deleteObject(){
        world.throwableObject.splice(0,1);
        clearInterval(this.intervalRotation);
    }
}