class Endboss extends MovableObject {
    
    y = 100;
    height = 350;
    width = this.height;
    IMAGES_ALERTNESS = [
        'images/endboss/alertness/endboss_alertness_1.png',
        'images/endboss/alertness/endboss_alertness_2.png',
        'images/endboss/alertness/endboss_alertness_3.png',
        'images/endboss/alertness/endboss_alertness_4.png',
        'images/endboss/alertness/endboss_alertness_5.png',
        'images/endboss/alertness/endboss_alertness_6.png',
        'images/endboss/alertness/endboss_alertness_7.png',
        'images/endboss/alertness/endboss_alertness_8.png',
    ];
    IMAGE_WALKING = [
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
        'images/endboss/attack/endboss_attack_1.png',
        'images/endboss/attack/endboss_attack_2.png',
        'images/endboss/attack/endboss_attack_3.png',
        'images/endboss/attack/endboss_attack_4.png',
        'images/endboss/attack/endboss_attack_5.png',
        'images/endboss/attack/endboss_attack_6.png',
        'images/endboss/attack/endboss_attack_7.png',
        'images/endboss/attack/endboss_attack_8.png',
    ];
    speed = 0.5;
    BorderColor = 'yellow';
    offset = {
        top: 100,
        right: 150,
        bottom: 150,
        left: 100
    }
    
    constructor() {
        super().loadImage(this.IMAGES_ALERTNESS[0]);
        this.loadImages(this.IMAGES_ALERTNESS);
        this.loadImages(this.IMAGE_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.x = 5300;
        // this.animateEndbossMoves();
    }

    animateEndbossMoves() {
        this.endbossAnimationInterval = setInterval(() => {
             if (this.isHurtEndboss()) {
                this.playAnimation(this.IMAGES_HURT)
            } else {
                this.playAnimation(this.IMAGES_ALERTNESS)
            };

        }, 40);
        
    }
    
}