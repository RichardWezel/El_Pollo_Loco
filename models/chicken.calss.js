class Chicken extends MovableObject{
   
    y = 370;
    height = 80;
    width = this.height;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    currentImage = 0;

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = Math.random() * 500;

        this.animate();
    }

    animate() {

        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; => 0, Rest 0
            // i = 0, 1, 2, 3, 4, 5, 6, 0
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
        
    }

}