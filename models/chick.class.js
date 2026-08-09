/**
 * Small chick enemy. Similar to `Chicken`, but with different visuals and offsets.
 */
class Chick extends MovableObject{
   
    y = 360;
    height = 60;
    width = this.height;
    IMAGES_WALKING = [
        'images/chick/1_w.png',
        'images/chick/2_w.png',
        'images/chick/3_w.png'
    ];
    IMAGE_DEAD = [
        'images/chick/dead.png'
    ];
    // Converted from the old tick-based range (60 ticks/sec) to pixels/second:
    // 0.25 * 60 = 15, 0.5 * 60 = 30
    speed = 120;
    BorderColor = 'blue';
    offset = {
        top: 0,
        right: 10,
        bottom: 0,
        left: 10
    }
    animationTimer = 0;
    deadStatus = false;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 600 + Math.random() * 5000;
        this.speed = 15 + Math.random() * 30;
    }

    /**
     * Called every frame by World.updateMovableObjects(). Moves the chick left and
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
     * Handle when the chick is hit: set deadStatus (checked in update(), stops movement
     * and animation from there on) and show the dead frame.
     */
    hitChick() {
        this.deadStatus = true;
        this.loadImage(this.IMAGE_DEAD);
    }
}