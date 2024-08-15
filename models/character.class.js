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

    /**
     * Initializes the character moves and animations.
     * 
     * Starts the Interval break the walksound, checks wheter ther is a key let character walk rigght, left or jump and let the view of camera follow.
     * 
     * Starts the Interval checks and starts several animation loops of the character.
     * 
     * Starts the character idle animation loop.
     */
    animate() {
        this.runCharacterMoves();
        this.animateCharacterMoves();
        this.characterIdle();
    }

    /**
     * Starts an interval stops walking sound of character, checks wheter ther is a key for walking or jump press and let the camera follow.
     */
    runCharacterMoves() {
        setInterval(() => {
            this.walking_sound.pause();
            this.checkPressArrowRight();
            this.checkPressArrowLeft();
            this.checkPressSpace();
            this.camera_x_follows();
        }, 1000 / 60); 
    }

    /**
     * Checks if there is pressed the key fpr walking right and the characters position isn't higher than endboss one. 
     * 
     * In case of true let the character moving in the right direction, set the direction status to false and let play the walking sound. 
     * 
     * resets the idle timer to start sleeping of character after 14 seconds.
     */
    checkPressArrowRight() {
        if(this.world.keyboard.RIGHT && this.x < this.world.level.enemies[0].x) {
            this.moveRight();
            this.otherDirection = false;
            if(volumeStatus == true) {
                this.walking_sound.play();
            }
            this.resetIdleTimer(); 
        }
    }

     /**
     * Checks if there is pressed the key for walking left and the characters position isn't let than the beginning of canvas koordinates. 
     * 
     * In case of true let the character moving in the left direction, set the direction status to true and let play the walking sound. 
     * 
     * resets the idle timer to start sleeping of character after 14 seconds.
     */
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

    /**
     * Checks if there is pressed the key for jump and if the character starts from teh ground position.
     * 
     * In case of true let jump the character, plays the jump sound and resets the idle timer to start sleeping of character after 14 seconds.
     */
    checkPressSpace(){
        if(this.world.keyboard.SPACE && this.y == this.groundPos) {
            this.jump();
            if(volumeStatus == true) {
                this.jump_sound.play();
            }
            this.resetIdleTimer(); 
        }
    }

    /**
    * Adjusts the camera's horizontal position to follow the character.
    *
    * This method updates the camera's horizontal position based on the character's
    * current x-coordinate. The camera follows the character by setting its x-position
    * relative to the character's x-position, ensuring the character remains in view
    * as they move. The camera's x-position is adjusted to keep the character 100 pixels
    * from the left edge of the viewport.
    *
    * The camera's x-position is only updated if the character's x-coordinate is greater
    * than 0.
    */
    camera_x_follows() {
        if(this.x > 0){
            this.world.camera_x = -this.x + 100;
        }
    }

    /**
     * Starts the interval to check the konditions for several animation szenarios and let play those.
     * 
     * Starts the moving of the endboss if the character exceeds 3870 pixel of x position.
     */
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

    /**
     * Starts the functions of characters dying. 
     * 
     * Let playing the death animation of character, let the character jumping, set the end of characters falling under the screen ground, stops the backgroundmusic, plays the teath sound of character and resets other animations and sounds.
     */
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

    /**
     * Resets the intervals of several playing sounds.
     */
    resetSounds() {
        this.world.backgroundmusic.pause();
        this.snoring_sound.pause();
        clearInterval(this.idle);
        clearInterval(this.sleep); 
        clearTimeout(this.sleepTimeout); 
    }

    /**
    * Plays the death animation for the character.
    *
    * This method iterates through an array of image paths representing the death
    * animation frames. Each frame is displayed in sequence to create the appearance
    * of a death animation. The animation is played at a regular interval, updating
    * the character's image to the next frame until all frames have been shown.
    *
    * After the animation completes, the interval is cleared, and the `checkGameOver`
    * method is called to handle any game-over logic.
    *
    * The death animation frames are defined in the `IMAGES_DEAD` array and are
    * cached in `this.imageCache`.
    */
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

    /**
     * Checks whether there is the character y position out of the screen and starts the game over logic.
     */
    checkGameOver() {
        this.GameOverInterval = setInterval(() => {
            if (this.y == 500) {
               this.initGameOver();
            }
        }, 100); 
    }

    /**
     * Set the Game over html elements and stops the interval of checking characters y position.
     */
    initGameOver() {
        let gameOver = document.getElementById('gameOver');
        gameOver.style.display = 'flex';
        clearInterval(this.GameOverInterval);                
    }

    /**
     * Starts the animation of charcter hurt and play the hurt sound.
     */
    characterHurtsHimself() {
        this.playAnimation(this.IMAGES_HURT);
        if (volumeStatus === true) {
            this.hurt_sound.play();
        }
    }
    
    /**
    * Starts the idle animation for the character.
    *
    * This method initiates the idle state of the character by:
    * 1. Starting a sleep timer using `startSleepTimer`.
    * 2. Clearing any existing intervals associated with idle and sleep states.
    * 3. Setting up a new interval to repeatedly play the idle animation frames.
    *
    * The idle animation frames are defined in the `IMAGES_IDLE` array and are
    * played at a regular interval of 180 milliseconds.
    */
    characterIdle() {
        this.startSleepTimer(); 
        clearInterval(this.idle);
        clearInterval(this.sleep);
        this.idle = setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE);
        }, 180); 
    }

    /**
    * Starts a sleep timer for the character.
    *
    * This method sets up a timer that triggers the character to enter the sleep state
    * after a specified duration. It initializes a timeout using `setTimeout` with the
    * duration defined by `initialSleepTime`. When the timeout expires:
    * 1. The `characterSleep` method is called to handle the sleep logic.
    * 2. The previously set idle timeout is cleared using `clearTimeout` to stop any
    * ongoing idle animations.
    */
    startSleepTimer() {
        this.sleepTimeout = setTimeout(() => {
            this.characterSleep();
            clearTimeout(this.idle);
        }, this.initialSleepTime);
    }

    /**
    * Transitions the character into a sleep state.
    */
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

    /**
    * Plays the snoring sound if the volume is enabled.
    */
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

    /**
    * Resets the idle timer and transitions the character to an idle state.
    */
    resetIdleTimer() {
        clearTimeout(this.sleepTimeout); 
        clearInterval(this.sleep); 
        this.characterIdle(); 
        this.snoring_sound.pause();
    }

    /**
    * Applies a bounce effect to the character by altering its vertical speed and position.
    */
    bounce() {
        this.speedY = 20; 
        this.y = this.groundPos - 20; 
    }
} 