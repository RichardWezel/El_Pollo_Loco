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
    ];
    IMAGES_SLEEP = [
        'images/pepe/long_idle_animation_img/I-11.png',
        'images/pepe/long_idle_animation_img/I-12.png',
        'images/pepe/long_idle_animation_img/I-13.png',
        'images/pepe/long_idle_animation_img/I-14.png',
        'images/pepe/long_idle_animation_img/I-15.png',
        'images/pepe/long_idle_animation_img/I-16.png',
        'images/pepe/long_idle_animation_img/I-17.png',
        'images/pepe/long_idle_animation_img/I-18.png',
        'images/pepe/long_idle_animation_img/I-19.png',
        'images/pepe/long_idle_animation_img/I-20.png'
    ];
    world;
    speed = 15;
    walking_sound = new Audio('audio/walk_sound.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    jump_sound = new Audio('audio/jump_sound.mp3');
    death_sound = new Audio('audio/death _scream.mp3');
    snoring_sound = new Audio('audio/snoring.mp3');
    BorderColor = 'red';
    collidatingStatus = false;
    collectedBottles = 0;
    collectedCoins = 0;
    offset = {
        top: 120,
        right: 30,
        bottom: 0,
        left: 20
    }
    initialSleepTime = 14000; 
    sleepTimeout; 
    idle;
    sleep;
    GameOverInterval;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
    }

    animate() {
        this.runCharacterMoves();
        this.animateCharacterMoves();
        this.characterIdle();
    }

    runCharacterMoves() {
        setInterval(() => {
            this.walking_sound.pause();
            this.checkPressArrowRight();
            this.checkPressArrowLeft();
            this.checkPressSpace();
            this.camera_x_follows();
        }, 1000 / 60); 
    }

    checkPressArrowRight() {
        if(this.world.keyboard.RIGHT && this.x < 5130 && this.x < this.world.level.enemies[0].x) {
            this.moveRight();
            this.otherDirection = false;
            if(volumeStatus == true) {
                this.walking_sound.play();
            }
            this.resetIdleTimer(); 
        }
    }

    checkPressArrowLeft(){
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            if(volumeStatus == true) {
                this.walking_sound.play();
            }
            this.resetIdleTimer(); 
        }
    }

    checkPressSpace(){
        if(this.world.keyboard.SPACE && this.y == this.groundPos) {
            this.jump();
            if(volumeStatus == true) {
                this.jump_sound.play();
            }
            this.resetIdleTimer(); 
        }
    }

    camera_x_follows() {
        if(this.x > 0){
            this.world.camera_x = -this.x + 100;
        }
    }

    animateCharacterMoves() {
        this.characterAnimationInterval = setInterval(() => {
            if (this.isDead()) {
                this.characterDies();
            } else if (this.isHurtCharacter()) {
                this.characterHurtsHimself()
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } 
            if (this.x > 3870) {
                this.world.level.enemies[0].contactCharacter = true;
            }
        }, 100);
    }

    characterDies() {
        this.playDeathAnimation(); 
        this.jump(); 
        this.fallBelowGround(); 
        world.backgroundmusic.pause();
        if (volumeStatus === true) {
            this.death_sound.play();
        }
        clearInterval(this.characterAnimationInterval); 
        this.resetSounds();
    }

    resetSounds() {
        this.world.backgroundmusic.pause();
        this.snoring_sound.pause();
        clearInterval(this.idle);
        clearInterval(this.sleep); 
        clearTimeout(this.sleepTimeout); 
    }

    playDeathAnimation() {
        let deathIndex = 0; 
        let deathAnimationInterval = setInterval(() => {
            if (deathIndex < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[deathIndex]];
                deathIndex++;
            } else {
                clearInterval(deathAnimationInterval); 
                this.checkGameOver();
            }
        }, 100); 
    }

    checkGameOver() {
        this.GameOverInterval = setInterval(() => {
            if (this.y == 500) {
               this.initGameOver();
            }
        }, 100); 
    }
    initGameOver() {
        let gameOver = document.getElementById('gameOver');
        gameOver.style.display = 'flex';
        clearInterval(this.GameOverInterval);                
    }

    characterHurtsHimself() {
        this.playAnimation(this.IMAGES_HURT);
        if (volumeStatus === true) {
            this.hurt_sound.play();
        }
    }
    
    characterIdle() {
        this.startSleepTimer(); 
        clearInterval(this.idle);
        clearInterval(this.sleep);
        this.idle = setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE);
        }, 180); 
    }

    startSleepTimer() {
        this.sleepTimeout = setTimeout(() => {
            this.characterSleep();
            clearTimeout(this.idle);
        }, this.initialSleepTime);
    }

    characterSleep() {
        if(volumeStatus == true) {
            this.playSnoringSound();
        } 
        clearInterval(this.idle);
        clearInterval(this.sleep); 
        this.sleep = setInterval(() => {
            this.playAnimation(this.IMAGES_SLEEP);
        }, 180); 
    }

    playSnoringSound() {
        if(volumeStatus == true) {
            this.snoring_sound.play();
        }
        this.snoring_sound.addEventListener('ended', () => {
            this.snoring_sound.currentTime = 0;
            if(volumeStatus == true) {
                this.snoring_sound.play();
            }
        });
    }

    resetIdleTimer() {
        clearTimeout(this.sleepTimeout); 
        clearInterval(this.sleep); 
        this.characterIdle(); 
        this.snoring_sound.pause();
    }

    bounce() {
        this.speedY = 20; 
        this.y = this.groundPos - 20; 
    }
} 