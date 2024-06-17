class Character extends MovableObject{

    height = 280;
    width = 120;
    y = 160;
    IMAGES_WALKING = [
        'images/pepe/W-21.png',
        'images/pepe/W-22.png',
        'images/pepe/W-23.png',
        'images/pepe/W-24.png',
        'images/pepe/W-25.png',
        'images/pepe/W-26.png'
    ];
    world;
    speed = 15;
    walking_sound = new Audio('audio/walk_sound.mp3');

    constructor() {
        super().loadImage('images/pepe/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {


        setInterval(() => {
            this.walking_sound.pause();
            if(this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60); 

        setInterval(() => {

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING)
            }
        }, 40);
        
    }

    jump() {

    }
}