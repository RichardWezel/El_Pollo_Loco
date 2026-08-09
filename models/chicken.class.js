/**
 * Small chicken enemy. Walks left and provides a death frame when hit.
 */
class Chicken extends MovableObject{
   
    y = 340;
    height = 90;
    width = this.height;
    IMAGES_WALKING = [
        'images/chicken/1_w.png',
        'images/chicken/2_w.png',
        'images/chicken/3_w.png'
    ];
    IMAGE_DEAD = [
        'images/chicken/dead.png'
    ];
    // Converted from the old tick-based range (60 ticks/sec) to pixels/second:
    // 0.15 * 60 = 9, 0.5 * 60 = 30
    speed = 120;
    BorderColor = 'blue';
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
    animationTimer = 0;
    deadStatus = false;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGE_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 600 + Math.random() * 4500;
        this.speed = 9 + Math.random() * 30;
    }

    /**
     * Called every frame by World.updateMovableObjects(). Moves the chicken left and
     * advances its walking animation, unless it has already been defeated.
     *
     * @param {number} deltaTime - Time elapsed since the last frame, in seconds.
     */
    update(deltaTime) {
        super.update(deltaTime);
        if (this.deadStatus) {
            return;
        }
        this.x -= this.speed * deltaTime;
        this.updateWalkingAnimation(deltaTime);
    }

    /**
     * Advances the walking animation roughly every 200ms, throttled via an accumulator so
     * it stays independent of the actual frame rate (same pattern as
     * Character.updateAnimationState()).
     *
     * @param {number} deltaTime - Time elapsed since the last frame, in seconds.
     */
    updateWalkingAnimation(deltaTime) {
        this.animationTimer += deltaTime;
        if (this.animationTimer < 0.2) {
            return;
        }
        this.animationTimer = 0;
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Handle when the chicken is hit: set deadStatus (checked in update(), stops movement
     * and animation from there on) and show the dead frame.
     */
    hitChicken() {
        this.deadStatus = true;
        this.loadImage(this.IMAGE_DEAD);
    }
}