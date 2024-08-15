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
     * Set the logic to let the object flying.
     */
    throw() {
        this.speedY = 30; 
        this.applyGravity(); 
        this.bottleFly();
    }

    /**
     * Starts the fly interval for flying animations. If the object is above the ground, the bottle rotate, else it splashs.
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
     * Represents the logic of bottle rotation with upadate x position and playing animation loop.
     */
    bottleRotation() {
        if (!this.checkHitTheGround()) {
            this.x += 20;
            this.playAnimation(this.IMAGES_ROTATION);
        }
    }

    /**
     * Let play the animations loop, set the collition status og the object to true, plays the splashing sound.
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
    * Checks if the object has hit the ground based on its current vertical position.
    *
    * @returns {boolean} `true` if the object's vertical position (`y`) is exactly 350, indicating it has hit the ground; `false` otherwise.
    */
    checkHitTheGround() {
        if (this.y == 350) {
            return true
        } else {
            return false
        }
    }

    /**
     * Lets playing the animation of botlle splashing.
     * 
     * @param {path} images 
     */
    playAnimationSplash(images) {
        let i = 100;
        i = this.currentImage % images.length; 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        if(i == 0) {
            this.deleteObject()
        }
    }

    /**
     * Deletes the object from the world. 
     */
    deleteObject(){
        world.throwableObject.splice(0,1);
        clearInterval(this.intervalRotation);
    }
}