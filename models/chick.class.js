class Chick extends MovableObject{
   
    y = 340;
    height = 80;
    width = this.height;
    IMAGES_WALKING = [
        'images/chick/1_w.png',
        'images/chick/2_w.png',
        'images/chick/3_w.png'
    ];
    IMAGE_DEAD = [
        'images/chick/dead.png'
    ];
    speed = 2;
    BorderColor = 'blue';
    offset = {
        top: 0,
        right: 10,
        bottom: 0,
        left: 10
    }
    walkingInterval;
    animationInterval;
    deadStatus = false;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 5000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Move the chickens left and animate the Move.
     */
    animate() {
        this.walkingInterval = setInterval(() => {
            this.moveLeft();
         }, 1000 / 60);
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    hitChick() {
        clearInterval(this.walkingInterval);
        clearInterval(this.animationInterval);
        this.deadStatus = true;
        this.loadImage(this.IMAGE_DEAD);
    }
}