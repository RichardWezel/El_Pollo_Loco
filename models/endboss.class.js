/**
 * Endboss entity with multiple animation states (walk, alertness, attack, hurt, dead).
 * Controls its own movement, state transitions and reactions to being hit.
 */
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
    // Converted from the old tick-based value (0.15 per tick at 20 ticks/sec, since the
    // old walkingspeed interval fired every 50ms) to pixels/second: 0.15 * 20 = 3
    speed = 3;
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
    hasStartedWalking = false;
    isWalking = false;
    animationTimer = 0;
    animationStatus = 'normal';
    hurtStatus = false;
    world;
    deathAnimationInterval;
    hurtAnimationInterval;
    cocorido = new Sound('audio/cocorico.mp3');


    constructor() {
        super().loadImage(this.IMAGES_ALERTNESS[0]);
        this.loadImages(this.IMAGES_ALERTNESS);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.x = 4500;
        this.applyGravity();
    }

    /**
     * Called every frame by World.updateMovableObjects(). Applies gravity, then - once
     * the character has come close enough (contactCharacter, set from
     * Character.updateAnimationState()) - starts walking on first contact (playing the
     * cocorico sound once) and keeps moving/animating every frame while isWalking is true.
     * isWalking is temporarily set to false by stopWalking() during the hurt/death
     * animations, which pauses movement without losing the contactCharacter/
     * hasStartedWalking state.
     *
     * @param {number} deltaTime - Time elapsed since the last frame, in seconds.
     */
    update(deltaTime) {
        super.update(deltaTime);
        if (!this.contactCharacter) {
            return;
        }
        if (!this.hasStartedWalking) {
            this.hasStartedWalking = true;
            if (volumeStatus == true) {
                this.cocorido.play();
            }
            this.walkAnimation();
        }
        if (!this.isWalking) {
            return;
        }
        this.x -= this.speed * deltaTime;
        this.updateWalkAnimation(deltaTime);
    }

    /**
     * Advances the endboss's current animation (walking/alertness/attack, depending on
     * `animationStatus`) roughly every `animationSpeed` milliseconds, throttled via an
     * accumulator so it stays independent of the actual frame rate. `animationSpeed`
     * itself changes depending on the endboss's state (see World.statusAlertness() /
     * World.statusAttack()).
     *
     * @param {number} deltaTime - Time elapsed since the last frame, in seconds.
     */
    updateWalkAnimation(deltaTime) {
        this.animationTimer += deltaTime;
        if (this.animationTimer < this.animationSpeed / 1000) {
            return;
        }
        this.animationTimer = 0;
        if (this.animationStatus == 'normal') {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.animationStatus == 'alertness') {
            this.playAnimation(this.IMAGES_ALERTNESS);
        } else {
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    /**
     * Resume walking: movement and state-based animation run every frame from
     * update(deltaTime) for as long as isWalking stays true.
     */
    walkAnimation() {
        this.isWalking = true;
    }

    /**
     * Pause movement and walk-animation (e.g. while the hurt or death animation plays).
     */
    stopWalking() {
        this.isWalking = false;
    }

    /**
     * Trigger endboss death sequence: play sound, stop movement and run death animation.
     */
    endbossDies() {
        if(volumeStatus == true) {
                this.cocorido.play();
        }
        this.stopWalking();
        this.playDeathAnimationEndboss(); 
        world.backgroundmusic.pause();
        this.world.character.resetSounds();
    }

    /**
     * Play the endboss death animation frames in sequence.
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
     * Finalize death animation: after a short delay make the endboss jump
     * and fall off-screen, then schedule the win sequence.
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
     * After a short delay, trigger the world's win handling.
     */
    timeoutToWin() {
        setTimeout(() => {
            this.world.handleWin();
        }, 700);
    }

    /**
     * Let the endboss jump.
     *
     * speedY converted from the old tick-based 20 to pixels/second: 20 * 25 = 500.
     */
    jumpEndboss() {
        this.speedY = 500;
    }

    /**
     * Return true if the world's endboss energy has reached zero.
     * @returns {boolean}
     */
    isDeadEndboss() {
        return this.world.energyEndboss == 0;
    }

    /**
     * Stop walking and play the hurt animation for the endboss.
     */
    endbossHurtsHimself() {
        this.stopWalking();
        this.playHurtAnimationEndboss(); 
    }

    /**
     * Play the hurt animation frames; resume walking if the endboss still has energy.
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