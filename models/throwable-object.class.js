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
    flightStopped = false;
    flightTimer = 0;
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
     * Initiate throw behavior: set upward velocity and enable gravity.
     *
     * speedY converted from the old tick-based 30 to pixels/second: 30 * 25 = 750.
     */
    throw() {
        this.speedY = 750;
        this.applyGravity();
    }

    /**
     * Called every frame by World.updateMovableObjects(). Applies gravity first (via the
     * parent class) - this keeps running even after the flight loop below has stopped,
     * matching the original behavior where only the rotation interval was cleared on an
     * Endboss hit, not gravity. The flight loop itself (ground-check, rotation or splash)
     * is throttled to roughly every 50ms via `flightTimer`, matching the old interval
     * timing, and stops entirely once `stopFlight()` has been called (Endboss hit).
     *
     * @param {number} deltaTime - Time elapsed since the last frame, in seconds.
     */
    update(deltaTime) {
        super.update(deltaTime);
        if (this.flightStopped) {
            return;
        }
        this.flightTimer += deltaTime;
        if (this.flightTimer < 0.05) {
            return;
        }
        this.flightTimer = 0;
        if (this.checkHitTheGround()) {
            this.bottleSplash();
        } else {
            this.bottleRotation();
        }
    }

    /**
     * Freeze the bottle completely: stop the flight loop (ground-check/rotation/repeated
     * splash-advance) AND gravity. Used when the bottle hits the Endboss, whose own splash
     * animation (World.playSplashAnimation) then takes over updating the sprite directly -
     * this keeps the splash image fixed at the point of impact instead of continuing to
     * fall/drift downward while the splash frames play.
     */
    stopFlight() {
        this.flightStopped = true;
        this.gravityEnabled = false;
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
        if (volumeStatus == true) {
            this.splash_sound.currentTime = 0;
            this.splash_sound.playbackRate = 3;
            this.splash_sound.play();
        } else {
            this.splash_sound.pause();
            this.splash_sound.currentTime = 0;
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
     * Remove this bottle instance from the world's throwableObject array. Once removed,
     * World.updateMovableObjects() simply no longer calls update() on it, so movement and
     * gravity stop automatically - no interval to clear anymore.
     */
    deleteObject(){
        world.throwableObject.splice(0,1);
    }
}