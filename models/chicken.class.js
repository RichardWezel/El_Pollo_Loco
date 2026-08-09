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
    speed = 2;
    BorderColor = 'blue';
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
    walkingInterval;
    animationInterval;
    deadStatus = false;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGE_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 600 + Math.random() * 4500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Start movement and animation loops for the chicken.
     */
    animate() {
        this.walkingInterval = setInterval(() => {
            this.moveLeft();
         }, 1000 / 60);
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    /**
     * Handle when the chicken is hit: stop movement/animation and show dead frame.
     */
    hitChicken() {
        clearInterval(this.walkingInterval);
        clearInterval(this.animationInterval);
        this.deadStatus = true;
        this.loadImage(this.IMAGE_DEAD);
    }
}