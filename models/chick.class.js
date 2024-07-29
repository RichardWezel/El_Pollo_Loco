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
        setInterval(() => {
            this.moveLeft();
         }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}