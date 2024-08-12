class Chicken extends MovableObject{
   
    y = 340;
    height = 80;
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
        left: 10
    }
    walkingInterval;
    animationInterval;
    deadStatus = false;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.x = 400 + Math.random() * 4500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        this.walkingInterval = setInterval(() => {
            this.moveLeft();
         }, 1000 / 60);
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    hitChicken() {
        clearInterval(this.walkingInterval);
        clearInterval(this.animationInterval);
        this.deadStatus = true;
        this.loadImage(this.IMAGE_DEAD);
    }
}