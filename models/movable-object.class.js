class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
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
    * Applies gravity to an object, causing it to fall towards the ground.
    * 
    * This method uses `setInterval` to continuously decrease the object's vertical position (`y`) based on its current vertical speed (`speedY`) and the acceleration due to gravity. 
    * 
    * - If the object is above the ground or moving upwards (`speedY > 0`), its position (`y`) is updated.
    * - If the object reaches the ground level (`groundPos`), it stops falling and its position is reset to the ground position.
    * 
    * The interval runs at 25 frames per second (FPS).
    */
    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            if (this.y < this.groundPos) {
                this.speedY -= this.acceleration;
            } else {
                this.y = this.groundPos;
            }
        }
        }, 1000 / 25);
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
     * If the function is using by an interval, lets the object moving forwarts to the right direction to a additional position change of speed variable value.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * If the function is using by an interval, lets the object moving backwarts to the left direction to a decreased position change of speed variable value.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
    * Plays an animation by cycling through an array of image paths.
    * 
    * This method updates the current image being used for animation based on the provided array of image paths. It cycles through the images and updates the `img` property with the corresponding image from the cache.
    * 
    * @param {string[]} images - An array of image paths to be used for animation. Each path corresponds to an image that will be displayed in sequence.
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
    */
    jump() {
        this.speedY = 30;
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
    * Handles the character being hit by an enemy and reduces the character's energy.
    * 
    * This method checks if the character has been recently hurt. If not, it reduces the character's 
    * energy based on the type of enemy that hit the character. It also updates the last hit time and 
    * checks if the game is over.
    * 
    * @param {Object} enemy - The enemy object that collided with the character. This can be an instance 
    *                         of various enemy types, including `Endboss`.
    * @param {number} enemy.energy - The current energy of the enemy.
    * 
    * @returns {void}
    */
    hitCharacter(enemy) {
        if (!this.isHurtCharacter()) {
            if (enemy instanceof Endboss) {
                this.energyCharacter -= 10;
            } else {
                this.energyCharacter -= 3;
            }
            this.energyCharacter -= 3;
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