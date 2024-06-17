class Endboss extends MovableObject {
    
    y = 100;
    height = 350;
    width = this.height;
    IMAGES_WALKING = [
            'images/endboss/G5.png',
            'images/endboss/G6.png',
            'images/endboss/G7.png',
            'images/endboss/G8.png',
            'images/endboss/G9.png',
            'images/endboss/G10.png',
            'images/endboss/G11.png',
            'images/endboss/G12.png',
        ];
        speed = 0.5;
    
        constructor() {
            super().loadImage(this.IMAGES_WALKING[0]);
            this.loadImages(this.IMAGES_WALKING);
            this.x = 2000 + Math.random() * 500;
            this.animate();
        }
    
        animate() {
            setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
    
            }, 200);
            
        }
    
}