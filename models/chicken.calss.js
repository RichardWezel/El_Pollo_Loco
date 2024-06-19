class Chicken extends MovableObject{
   
    y = 350;
    height = 80;
    width = this.height;
    IMAGES_WALKING = [
        'images/chicken/1_w.png',
        'images/chicken/2_w.png',
        'images/chicken/3_w.png'
    ];
    speed = 2;
    BorderColor = 'blue';

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
         }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            
        }, 200);
    }
}

