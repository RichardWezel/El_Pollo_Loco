class Character extends MovableObject{

    height = 280;
    width = 120;
    y = 150;
    IMAGES_WALKING = [
        'images/pepe/walk_animation_img/W-21.png',
        'images/pepe/walk_animation_img/W-22.png',
        'images/pepe/walk_animation_img/W-23.png',
        'images/pepe/walk_animation_img/W-24.png',
        'images/pepe/walk_animation_img/W-25.png',
        'images/pepe/walk_animation_img/W-26.png'
    ];
    IMAGES_JUMPING = [
        'images/pepe/jump_animation_img/J-31.png',
        'images/pepe/jump_animation_img/J-32.png',
        'images/pepe/jump_animation_img/J-33.png',
        'images/pepe/jump_animation_img/J-34.png',
        'images/pepe/jump_animation_img/J-35.png',
        'images/pepe/jump_animation_img/J-36.png',
        'images/pepe/jump_animation_img/J-37.png',
        'images/pepe/jump_animation_img/J-38.png',
        'images/pepe/jump_animation_img/J-39.png'
    ]
    world;
    speed = 15;
    walking_sound = new Audio('audio/walk_sound.mp3');
    groundTouch = true;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animate();
    }

    animate() {


        setInterval(() => {
            // Stop sound
            this.walking_sound.pause();

            // Key right is pushed
            if(this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            }

            // Key left is pushed
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                console.log(this.x)
            }

            // Key up is pushed
            if(this.world.keyboard.UP && this.y == 150) {
                this.speedY = 40;
                this.groundTouch = false;
            }

            if(this.x > 0){
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60); 

        setInterval(() => {

            if(this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING)
            } else {let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; => 0, Rest 0
                let path = 'images/pepe/walk_animation_img/W-21.png';
                this.img = this.imageCache[path];
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING)
                }
            }

            
        }, 60);
        
    }

   
} 