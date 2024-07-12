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
    ];
    IMAGES_HURT = [
        'images/pepe/hurt_animation_img/H-41.png',
        'images/pepe/hurt_animation_img/H-42.png',
        'images/pepe/hurt_animation_img/H-43.png'
    ];
    IMAGES_DEAD = [
        'images/pepe/dead_animation_img/D-51.png',
        'images/pepe/dead_animation_img/D-52.png',
        'images/pepe/dead_animation_img/D-53.png',
        'images/pepe/dead_animation_img/D-54.png',
        'images/pepe/dead_animation_img/D-55.png',
        'images/pepe/dead_animation_img/D-56.png',
        'images/pepe/dead_animation_img/D-57.png'
    ];
    IMAGES_SLEEPING = [
        
    ]
    world;
    speed = 15;
    walking_sound = new Audio('audio/walk_sound.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    jump_sound = new Audio('audio/jump_sound.mp3');
    BorderColor = 'red';
    collidatingStatus = false;
    collectedBottles = 0;
    collectedCoins = 0;
    offset = {
        top: 120,
        right: 30,
        bottom: 30,
        left: 40
    }

    
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {


        setInterval(() => {
            // Stop sound
            this.walking_sound.pause();

            // Key right is pushed
            if(this.world.keyboard.RIGHT) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            // Key left is pushed
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            // Key up is pushed
            if(this.world.keyboard.SPACE && this.y == 150) {
                this.jump();
                this.jump_sound.play();
            }

            if(this.x > 0){
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60); 

        setInterval(() => {

            // if(this.isDead) {
            //     this.playAnimation(this.IMAGES_DEAD)
            // } 
            if(this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
                this.hurt_sound.play();
            } else if(this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING)
            } else {
                let path = 'images/pepe/walk_animation_img/W-21.png';
                this.img = this.imageCache[path];
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING)
                }
            }
        }, 60);
        
    }

   
} 