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
        left: 70
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

    checkContactWithCharacter() {
        let check = setInterval(() => {
            if (this.contactCharacter == true) {
                this.walkAnimation();
                this.cocorido.play();
                clearInterval(check); 
            }
         }, 50);
    }

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

    stopWalking() {
        clearInterval(this.walkInterval); 
        clearInterval(this.walkAnimationInterval); 
    }

    endbossDies() {
        this.cocorido.play();
        this.stopWalking();
        this.playDeathAnimationEndboss(); 
        world.backgroundmusic.pause();
        this.world.character.resetSounds();
    }

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

    endOfDeathAnimation() {
        setTimeout(() => {
            clearInterval(this.deathAnimationInterval); 
            this.test();
            this.jumpEndboss(); 
            this.fallBelowGround(); 
        }, 100);
    }

    test() {
        setTimeout(() => {
            this.world.handleWin();
        }, 700);
    }

    jumpEndboss() {
        this.speedY = 20;
    }

    isDeadEndboss() {
        return this.world.energyEndboss == 0;
    }

    endbossHurtsHimself() {
        this.stopWalking();
        this.playHurtAnimationEndboss(); 
    }

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