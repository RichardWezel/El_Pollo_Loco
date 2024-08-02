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
        right: 20,
        bottom: 0,
        left: 40
    }
    idleTime = 10000; // Zeit in Millisekunden, nach der der Charakter schlafen soll
    idleTimeout; // Referenz zum Timeout
    idle;
    sleep;

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
            if(this.world.keyboard.RIGHT && this.x < 5130) {
                this.moveRight();
                this.otherDirection = false;
                if(volumeStatus == true) {
                    this.walking_sound.play();
                }
                this.resetIdleTimer(); // Beendet den Idle-Timer, wenn sich der Charakter bewegt
            }
        }

        checkPressArrowLeft(){
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                if(volumeStatus == true) {
                    this.walking_sound.play();
                }
                this.resetIdleTimer(); // Beendet den Idle-Timer, wenn sich der Charakter bewegt
            }
        }
    
        checkPressSpace(){
            if(this.world.keyboard.SPACE && this.y == this.groundPos) {
                this.jump();
                if(volumeStatus == true) {
                    this.jump_sound.play();
                }
                this.resetIdleTimer(); // Beendet den Idle-Timer, wenn sich der Charakter bewegt
            }
        }

        camera_x_follows() {
            if(this.x > 0){
                this.world.camera_x = -this.x + 100;
            }
        }

    animateCharacterMoves() {
        this.characterAnimationInterval = setInterval(() => {
            if (this.isDead(this.characterAnimationInterval)) {
                this.characterDies();
            } else if (this.isHurtCharacter()) {
                this.characterHurtsHimself()
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } 
        }, 40);
    }

        characterDies() {
            this.playDeathAnimation(); // Startet eine separate Animation für den Tod
            this.jump(); // Startet den Sprung
            this.fallBelowGround(); // Setzt die groundPos nach unten
            world.backgroundmusic.pause();
            if (volumeStatus === true) {
                this.death_sound.play();
            }
            clearInterval(this.characterAnimationInterval); // Beendet das allgemeine Animationsintervall
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
                    let GameOverInterval = setInterval(() => {
                        if (this.y == 500) {
                            // renderGameOver();
                            document.getElementById('idGameOver').style.display = 'block';
                            document.getElementById('reloadGameBtn').style.display = 'block';
                            clearInterval(GameOverInterval)
                        }
                    }, 100); // Anpassung des Intervalls je nach Geschwindigkeit der Animation
                }

        characterHurtsHimself() {
            this.playAnimation(this.IMAGES_HURT);
            if (volumeStatus === true) {
                this.hurt_sound.play();
            }
        }
    
    characterIdle() {
        this.startIdleTimer(); // Startet den Idle-Timer
        clearInterval(this.idle);
        clearInterval(this.sleep);
        this.idle = setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE);
        }, 180); 
    }

    startIdleTimer() {
        this.idleTimeout = setTimeout(() => {
            this.characterSleep();
            clearTimeout(this.idle);
        }, this.idleTime);
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
        this.snoring_sound.play();
        this.snoring_sound.addEventListener('ended', () => {
            this.snoring_sound.currentTime = 0;
            this.snoring_sound.play();
        });
    }

    resetIdleTimer() {
        clearTimeout(this.idleTimeout); 
        clearInterval(this.idle);
        clearInterval(this.sleep); 
        this.characterIdle();
        this.startIdleTimer(); 
        console.log('resetIdleTimer()')
    }
} 