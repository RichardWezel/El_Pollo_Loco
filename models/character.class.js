class Character extends MovableObject{

    height = 280;
    width = 120;
    y = 150;
    groundPos = 150;
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
    IMAGES_IDLE = [
        'images/pepe/idle_animation_img/I-1.png',
        'images/pepe/idle_animation_img/I-2.png',
        'images/pepe/idle_animation_img/I-3.png',
        'images/pepe/idle_animation_img/I-4.png',
        'images/pepe/idle_animation_img/I-5.png',
        'images/pepe/idle_animation_img/I-8.png',
        'images/pepe/idle_animation_img/I-9.png',
        'images/pepe/idle_animation_img/I-10.png',
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
        right: 40,
        bottom: 0,
        left: 40
    }

    
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity();
        this.animate();
    }

    animate() {
        this.moveCharacterInterval();
        this.animateCharacterMoves();
        this.characterIdle();
    }

    moveCharacterInterval() {
        setInterval(() => {
            this.walking_sound.pause();
            this.checkPressArrowRight();
            this.checkPressArrowLeft();
            this.checkPressSpace();
            this.camera_x_follows();
        }, 1000 / 60); 
    }

    camera_x_follows() {
        if(this.x > 0){
            this.world.camera_x = -this.x + 100;
        }
    }

    checkPressArrowRight() {
        if(this.world.keyboard.RIGHT) {
            this.moveRight();
            this.otherDirection = false;
            if(volumeStatus == true) {
                this.walking_sound.play();
            }
        }
    }

    checkPressArrowLeft(){
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            if(volumeStatus == true) {
                this.walking_sound.play();
            }
        }
    }

    checkPressSpace(){
        if(this.world.keyboard.SPACE && this.y == this.groundPos) {
            this.jump();
            if(volumeStatus == true) {
                this.jump_sound.play();
            }
        }
    }

    animateCharacterMoves() {
        setInterval(() => {
            if(this.world.isDead) {
                this.playAnimation(this.IMAGES_DEAD)
            } 
            if(this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
                if(volumeStatus == true) {
                    this.hurt_sound.play();
                }
            } else if(this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING)
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING)
            } 
        }, 40);
    }

    characterIdle() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE);
        }, 180); 
    }

    bounce() {
        this.speedY = 20; // Bounce up
        this.y = this.groundPos - 20; // Adjust the y position to be slightly above the ground position
    }
} 