/**
 * MovableObject extends DrawableObject with physics and movement helpers.
 * It provides gravity, basic left/right movement, jumping and collision
 * detection utilities used by characters and enemies.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    // Converted from the old tick-based value (2.5 per tick at 25 ticks/sec) to
    // pixels/second^2, so the exact same jump height and duration are preserved:
    // 2.5 / (1/25)^2 = 1562.5
    acceleration = 1562.5;
    gravityEnabled = false;
    BorderColor;
    energyCharacter = 100;
    lastHitCharacter = 0;
    lastHitEndboss = 0;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
    groundPos = 350;

    /**
    * Called every frame by the central render loop in World.draw(), right before the
    * object is drawn.
    *
    * This base implementation intentionally does nothing. Subclasses (Character, Chicken,
    * Chick, Endboss, Cloud, ThrowableObject) override it with their own movement and
    * animation logic. That keeps each class swappable without this base class needing to
    * know how a Chicken differs from an Endboss.
    *
    * @param {number} deltaTime - Time elapsed since the last frame, in seconds (e.g. 0.016
    * at 60 FPS). Movement should always be multiplied by deltaTime so speed stays
    * consistent regardless of the actual frame rate.
    */
    update(deltaTime) {
        if (this.gravityEnabled) {
            this.updateGravity(deltaTime);
        }
        // further overridden by subclasses, which should call super.update(deltaTime)
        // first so gravity keeps working, then add their own movement/animation logic.
    }

    /**
    * Enables gravity for this object. Instead of starting its own timer, this just flips
    * a flag - the actual physics runs inside update(deltaTime), which is already called
    * once per frame for every movable object by World.updateMovableObjects(). This way
    * gravity stays perfectly in sync with the rest of the game instead of ticking on its
    * own independent clock.
    */
    applyGravity() {
        this.gravityEnabled = true;
    }

    /**
    * Advances the falling/jumping physics for this object by one frame.
    *
    * - If the object is above the ground or still moving upwards (`speedY > 0`), its
    *   vertical position (`y`) is updated based on the current speed.
    * - If that puts it at or below the ground level (`groundPos`), it is snapped back to
    *   the ground and stops falling further.
    *
    * Both `speedY` (pixels/second) and `acceleration` (pixels/second^2) are expressed as
    * continuous rates and multiplied by `deltaTime`, so the same physics feel is produced
    * regardless of the actual frame rate.
    *
    * @param {number} deltaTime - Time elapsed since the last frame, in seconds.
    */
    updateGravity(deltaTime) {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY * deltaTime;
            if (this.y < this.groundPos) {
                this.speedY -= this.acceleration * deltaTime;
            } else {
                this.y = this.groundPos;
            }
        }
    }

    /**
    * Checks if the object is above the ground.
    * 
    * This method returns a boolean indicating whether the object's current vertical position (`y`) is above the ground level (`groundPos`).
    * 
    * @returns {boolean} - Returns `true` if the object's position is above the ground, otherwise `false`.
    */
    isAboveGround() {
            return this.y < this.groundPos;
    }

    /**
    * Simulates the object falling below the ground level.
    * 
    * This method sets the object's ground position (`groundPos`) to 500, simulating a scenario where the object falls below the standard ground level.
    */
    fallBelowGround() {
        this.groundPos = 500;
    }

    /**
     * Move the object to the right by its current speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Move the object to the left by its current speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

        /**
        * Cycle through an array of image paths to advance the animation frame.
        *
        * @param {string[]} images - Array of image paths used for animation.
        */
    playAnimation(images) {
            let i = this.currentImage % images.length; 
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
    }

    /**
    * Initiates a jump by setting the vertical speed.
    *
    * This method sets the `speedY` property to a positive value, causing the object to move upwards, simulating a jump. The gravity will later reduce this speed, bringing the object back down.
    *
    * Value converted from the old tick-based 30 (pixels/tick at 25 ticks/sec) to
    * pixels/second: 30 * 25 = 750.
    */
    jump() {
        this.speedY = 750;
    }

    /**
    * Checks if this object is colliding with another object.
    * 
    * This method determines if there is a collision between the current object and the specified object.
    * It checks if the bounding box of this object overlaps with the bounding box of the other object,
    * taking into account any defined offsets for more precise collision detection.
    * 
    * @param {Object} obj - The object to check for collision with. The object should have `x`, `y`, `width`, `height`, and `offset` properties.
    * @param {number} obj.x - The x-coordinate of the object.
    * @param {number} obj.y - The y-coordinate of the object.
    * @param {number} obj.width - The width of the object.
    * @param {number} obj.height - The height of the object.
    * @param {Object} obj.offset - The collision offset for the object.
    * @param {number} obj.offset.left - The left offset value.
    * @param {number} obj.offset.right - The right offset value.
    * @param {number} obj.offset.top - The top offset value.
    * @param {number} obj.offset.bottom - The bottom offset value.
    * 
    * @returns {boolean} `true` if the objects are colliding; otherwise `false`.
    */
    isColliding(obj) {
        return this.x + this.width - this.offset.right >= obj.x  + obj.offset.left &&
               this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
               this.y + this.height  - this.offset.bottom >= obj.y + obj.offset.top &&
               this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom;
    }

    /**
    * Apply damage to this character when hit by an enemy.
    * If the character is not currently in the hurt cooldown, reduce energy
    * according to the enemy type, record the hit timestamp and check for game over.
    *
    * @param {Object} enemy - The enemy object that collided with the character.
    */
    hitCharacter(enemy) {
        if (!this.isHurtCharacter()) {
            if (enemy instanceof Endboss) {
                this.energyCharacter -= 10;
            } else {
                this.energyCharacter -= 3;
            }
            this.lastHitCharacter = new Date().getTime();
            this.checkGameOver();
        }
    }

    /**
    * Registers a hit on the Endboss and updates the timestamp of the last hit.
    * 
    * This method checks if the Endboss still has energy. If so, it records the current 
    * time as the last time the Endboss was hit.
    * 
    * @returns {void}
    */
    hitEndboss() {
        if(this.energyEndboss > 0) {
            this.lastHitEndboss = new Date().getTime();
        }
    }

    /**
    * Handles the collection of in-game objects such as bottles and coins.
    * 
    * Depending on the type of object collected, this method updates the relevant 
    * properties in the character's state. For bottles, it increments the count of 
    * collected bottles. For coins, it increases the collected coins count by the value 
    * calculated by `calcCoinAddion`.
    * 
    * @param {string} collectedObject - The type of object collected ('bottle' or 'coin').
    * @returns {void}
    */
    collect(collectedObject) {
        if (collectedObject == 'bottle') {
            this.world.character.collectedBottles += 1;
        } 
        if (collectedObject == 'coin') {
            this.world.character.collectedCoins += this.calcCoinAddion();
        } 
    }

    /**
    * Calculates the value to be added to the character's collected coins count 
    * when a coin is collected.
    * 
    * The value is determined based on the total number of collectible coins in the level. 
    * It divides 100 by the total number of coins, ensuring that the sum of all collected 
    * coins equals 100.
    * 
    * @returns {number} The value to be added for each collected coin.
    */
    calcCoinAddion() {
        let amountToAdd = 100 / this.world.startCoinAmound;
        return amountToAdd;
    }

    /**
    * Calculates the value to be added to the character's collected bottles count 
    * when a bottle is collected.
    * 
    * The value is determined based on the initial number of bottles in the level. 
    * It divides 100 by the starting amount of bottles, ensuring that the sum of all collected 
    * bottles equals 100.
    * 
    * @returns {number} The value to be added for each collected bottle.
    */
    calcBottleAddion() {
        let amountToAdd  = 100 / this.world.startBottleAmound;
        return amountToAdd;
    }

    /**
    * Determines whether the character is currently in a "hurt" state.
    *
    * The character is considered "hurt" if less than 500 milliseconds have passed since the last hit.
    * This method calculates the time elapsed since the character was last hit and checks if it's 
    * within the threshold that defines the hurt state.
    *
    * @returns {boolean} `true` if the character is still hurt; otherwise, `false`.
    */
    isHurtCharacter() {
        let timepassed = new Date().getTime() - this.lastHitCharacter; 
        timepassed = timepassed / 500; 
        return timepassed < 1  ;
    }

    /**
    * Determines whether the Endboss is currently in a "hurt" state.
    *
    * The Endboss is considered "hurt" if less than 500 milliseconds have passed since the last hit.
    * This method calculates the time elapsed since the Endboss was last hit and checks if it's 
    * within the threshold that defines the hurt state.
    *
    * @returns {boolean} `true` if the Endboss is still hurt; otherwise, `false`.
    */
    isHurtEndboss() {
        let timepassed = new Date().getTime() - this.lastHitEndboss; 
        timepassed = timepassed / 500; 
        return timepassed < 1  ;
    }

    /**
    * Checks if the character is dead.
    *
    * The character is considered dead if their energy has dropped to zero or below.
    *
    * @returns {boolean} `true` if the character's energy is less than or equal to 0; otherwise, `false`.
    */
    isDead() {
        return this.energyCharacter <= 0;
    }
}