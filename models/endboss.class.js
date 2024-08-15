class Endboss extends MovableObject {
    
    y = 100;
    groundPos = 100; 
    height = 350;
    width = this.height;
    IMAGES_ALERTNESS = [
        'images/endboss/walk/endboss_walk_1.png',
        'images/endboss/walk/endboss_walk_2.png',
        'images/endboss/walk/endboss_walk_3.png',
        'images/endboss/walk/endboss_walk_4.png',
        'images/endboss/alertness/endboss_alertness_1.png',
        'images/endboss/alertness/endboss_alertness_2.png',
        'images/endboss/alertness/endboss_alertness_3.png',
        'images/endboss/alertness/endboss_alertness_4.png',
        'images/endboss/walk/endboss_walk_1.png',
        'images/endboss/walk/endboss_walk_2.png',
        'images/endboss/walk/endboss_walk_3.png',
        'images/endboss/walk/endboss_walk_4.png',
        'images/endboss/alertness/endboss_alertness_5.png',
        'images/endboss/alertness/endboss_alertness_6.png',
        'images/endboss/alertness/endboss_alertness_7.png',
        'images/endboss/alertness/endboss_alertness_8.png'
    ];
    IMAGES_WALKING = [
        'images/endboss/walk/endboss_walk_1.png',
        'images/endboss/walk/endboss_walk_2.png',
        'images/endboss/walk/endboss_walk_3.png',
        'images/endboss/walk/endboss_walk_4.png'
    ];
    IMAGES_HURT = [
        'images/endboss/hurt/endboss_hurt_1.png',
        'images/endboss/hurt/endboss_hurt_2.png',
        'images/endboss/hurt/endboss_hurt_3.png'
    ];
    IMAGES_DEAD = [
        'images/endboss/dead/endboss_dead_1.png',
        'images/endboss/dead/endboss_dead_2.png',
        'images/endboss/dead/endboss_dead_3.png',
        'images/endboss/dead/endboss_dead_4.png',
        'images/endboss/dead/endboss_dead_5.png',
        'images/endboss/dead/endboss_dead_6.png',
        'images/endboss/dead/endboss_dead_7.png',
        'images/endboss/dead/endboss_dead_8.png',
        'images/endboss/dead/endboss_dead_9.png',
        'images/endboss/dead/endboss_dead_10.png',
        'images/endboss/dead/endboss_dead_11.png',
        'images/endboss/dead/endboss_dead_12.png',
        'images/endboss/dead/endboss_dead_13.png',
        'images/endboss/dead/endboss_dead_14.png',
        'images/endboss/dead/endboss_dead_15.png',
        'images/endboss/dead/endboss_dead_16.png'
    ];
    IMAGES_ATTACK = [
        'images/endboss/walk/endboss_walk_1.png',
        'images/endboss/walk/endboss_walk_2.png',
        'images/endboss/walk/endboss_walk_3.png',
        'images/endboss/walk/endboss_walk_4.png',
        'images/endboss/attack/endboss_attack_1.png',
        'images/endboss/attack/endboss_attack_2.png',
        'images/endboss/attack/endboss_attack_3.png',
        'images/endboss/attack/endboss_attack_4.png',
        'images/endboss/walk/endboss_walk_1.png',
        'images/endboss/walk/endboss_walk_2.png',
        'images/endboss/walk/endboss_walk_3.png',
        'images/endboss/walk/endboss_walk_4.png',
        'images/endboss/attack/endboss_attack_5.png',
        'images/endboss/attack/endboss_attack_6.png',
        'images/endboss/attack/endboss_attack_7.png',
        'images/endboss/attack/endboss_attack_8.png'
    ];
    speed = 0.15;
    walkingspeed = 50;
    animationSpeed = 400;
    BorderColor = 'yellow';
    offset = {
        top: 100,
        right: 150,
        bottom: 150,
        left: 40
    }
    deadStatus = false;
    contactCharacter = false;
    animationStatus = 'normal';
    walkInterval;
    walkAnimationInterval;
    hurtStatus = false;
    world;
    deathAnimationInterval;
    hurtAnimationInterval;
    cocorido = new Audio('audio/cocorico.mp3');
    
    
    constructor() {
        super().loadImage(this.IMAGES_ALERTNESS[0]);
        this.loadImages(this.IMAGES_ALERTNESS);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.x = 4500;
        this.checkContactWithCharacter();
        this.applyGravity();
    }

    /**
     * Starts the interval checking if the character is in the near of the endboss. If its true, lets the endboss walk.
     */
    checkContactWithCharacter() {
        let check = setInterval(() => {
            if (this.contactCharacter == true) {
                this.walkAnimation();
                if(volumeStatus == true) {
                    this.cocorido.play();
                }
                clearInterval(check); 
            }
         }, 50);
    }

    /**
    * Starts the walking animation and movement of the object.
    *
    * This method sets up two intervals:
    * - One for handling the movement of the object in the left direction.
    * - Another for cycling through the walking, alertness, or attack animations based on the current animation status.
    */
    walkAnimation() {
        this.walkInterval = setInterval(() => {
                this.moveLeft();
         }, this.walkingspeed);
        this.walkAnimationInterval = setInterval(() => {
            if (this.animationStatus == 'normal') {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.animationStatus == 'alertness') {
                this.playAnimation(this.IMAGES_ALERTNESS);
            } else {
                this.playAnimation(this.IMAGES_ATTACK);
            }
               
        }, this.animationSpeed);
    }

    /**
     * Stops intervals of walking (stosp changing position and walk animation)
     */
    stopWalking() {
        clearInterval(this.walkInterval); 
        clearInterval(this.walkAnimationInterval); 
    }

    /**
     * Starts the functions for the dying endbosss.
     * 
     * Let play the dath sound of endboss,  stop walking functions and animate the death of endboss.
     */
    endbossDies() {
        this.cocorido.play();
        this.stopWalking();
        this.playDeathAnimationEndboss(); 
        world.backgroundmusic.pause();
        this.world.character.resetSounds();
    }

    /**
     * Animate the death of endboss.
     */
    playDeathAnimationEndboss() {
        let deathIndex = 0; 
        this.deathAnimationInterval = setInterval(() => {
            if (deathIndex < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[deathIndex]];
                deathIndex++;
            } else {
                this.endOfDeathAnimation();
            }
        }, 100); 
    }

    /**
     * After 100 ms stops the death animation and let the death endboss jump and fall under the gamescreen. After an time sets the win screen.
     */
    endOfDeathAnimation() {
        setTimeout(() => {
            clearInterval(this.deathAnimationInterval); 
            this.timeoutToWin();
            this.jumpEndboss(); 
            this.fallBelowGround(); 
        }, 100);
    }

    /**
     * After 700 ms sets the win html and logics.
     */
    timeoutToWin() {
        setTimeout(() => {
            this.world.handleWin();
        }, 700);
    }

    /**
     * Let the endboss jump.
     */
    jumpEndboss() {
        this.speedY = 20;
    }

    /**
     * Checks the endboss energy if ist 0.
     * 
     * @returns true, if the energy of endboss is 0.
     */
    isDeadEndboss() {
        return this.world.energyEndboss == 0;
    }

    /**
     * Stops the walking animation and let playing hurt animation.
     */
    endbossHurtsHimself() {
        this.stopWalking();
        this.playHurtAnimationEndboss(); 
    }

    /**
     * Starts the hurt animations of endboss.
     */
    playHurtAnimationEndboss() {
        let hurtIndex = 0; 
        this.hurtAnimationInterval = setInterval(() => {
            if (hurtIndex < this.IMAGES_HURT.length) {
                this.img = this.imageCache[this.IMAGES_HURT[hurtIndex]];
                hurtIndex++;
            } else {
                if (this.world.energyEndboss > 0){
                    this.walkAnimation();
                }
                clearInterval(this.hurtAnimationInterval); 
            }
        }, 80); 
    }
}