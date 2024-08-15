/**
 * Represents the game world, including the character, enemies, and background elements.
 * Manages interactions between objects, rendering, and game logic.
 */
class World {

    character = new Character();
    level = level1;
    canvas;
    ctx; 
    keyboard;
    camera_x = 0;
    statusbar_health = new Statusbar_health(20, 10);
    statusbar_bottle = new Statusbar_bottle(20, 50);
    statusbar_coin = new Statusbar_coin(20, 90);
    statusbar_endboss = new Statusbar_endboss(50);
    throwableObject = [];
    coin_collecting_sound = new Audio('audio/coin_sound.mp3');
    bottle_collecting_sound = new Audio('audio/new.m4a');
    bounceChicken = new Audio('audio/hitChicken.m4a');
    backgroundmusic = new Audio('audio/backgroundmusic.mp3');
    win_sound = new Audio('audio/win.mp3');
    endbossHurtSound = new Audio('audio/endbossHurt.m4a');
    start = false;
    energyEndboss = 100;
    startBottleAmound = 0;
    startCoinAmound = 0;

     /**
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
     * @param {Object} keyboard - An instance of the keyboard class for detecting user input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); 
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.intervalCollCharacter();
        this.intervalCollBottle();
        this.checkUseOf_KeyD();
        this.backgroundmusic.load();
        if(volumeStatus == true) {
            this.playBackgroundMusic();
        }
        this.setCollectableObjectAmounds()
        
    }

    setCollectableObjectAmounds() {
        this.startBottleAmound = this.level.collectableObjects_bottles.length;
        this.startCoinAmound = this.level.collectableObjects_coin.length;
    }
    
     /**
     * Continuously redraws the game elements on the canvas.
     * Uses requestAnimationFrame for smooth animation.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0); 
        this.drawLevelBachgrounds();
        this.drawStatusbars();
        this.drawMovableObjects();
        this.statusbar_endboss.updateX();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * Draws the backgrounds and other static elements of the level.
     */
    drawLevelBachgrounds() {
        this.addObjectsToMap(this.level.backgroundObjects); 
        this.addObjectsToMap(this.level.clouds); 
        this.addObjectsToMap(this.level.collectableObjects_bottles); 
        this.addObjectsToMap(this.level.collectableObjects_coin); 
    }

    /**
     * Draws the status bars for health, bottle count, coin count, and endboss health.
     */
    drawStatusbars() {
        this.ctx.translate(-this.camera_x, 0); 
        this.addToMap(this.statusbar_health); 
        this.addToMap(this.statusbar_bottle); 
        this.addToMap(this.statusbar_coin); 
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draws movable objects like the character, enemies, and throwable objects.
     */
    drawMovableObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.statusbar_endboss); 
        this.addObjectsToMap(this.throwableObject);
    }

    /**
     * Adds multiple objects to the game map.
     * @param {Array} objects - An array of objects to be drawn.
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the game map.
     * @param {Object} mo - The object to be drawn.
     */
    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }              
        mo.draw(this.ctx);
        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

     /**
     * Links various objects in the world to this instance of the World class.
     */
    setWorld() {
        this.character.world = this;
        this.statusbar_health.world = this;
        this.statusbar_endboss.world = this;
        this.statusbar_endboss.updateX();
        this.level.enemies[0].world = this;
    }

    /**
     * Plays the background music in a loop.
     */
    playBackgroundMusic() {
        if(volumeStatus == true) {
            this.backgroundmusic.play();
        }
        this.backgroundmusic.volume = 0.2;
        this.backgroundmusic.addEventListener('ended', () => {
            this.backgroundmusic.currentTime = 0;
            if(volumeStatus == true) {
                this.backgroundmusic.play();
            }
        });
    }

    /**
     * Periodically checks for collisions between the character and other objects.
     */
    intervalCollCharacter() {
        setInterval(() => {
            this.checkCollisionsofCharacter();  
        }, 50);
    }

    /**
     * Periodically checks for collisions between bottles and other objects.
     */
    intervalCollBottle() {
        setInterval(() => {
            this.checkCollisionsOfBottles();
        }, 20);
    }

     /**
     * Checks for collisions between the character and enemies, bottles, or coins.
     */
    checkCollisionsofCharacter() {
        this.collisionsOfCharacterWithEnemies();
        this.collisionsOfCharacterWithBottles();
        this.collisionsOfCharacterWithCoins();
    }

    /**
     * Handles the collision logic when the character collides with enemies.
     */
    collisionsOfCharacterWithEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    if (!(enemy instanceof Endboss)) {
                        this.handleJumpingOnEnemy(index, enemy);
                    }
                } else {
                    this.handleRunningIntoEnemy(enemy);
                }
            }
        });
    }
    
    /**
     * Handles the logic when the character jumps on an enemy.
     * @param {number} index - The index of the enemy in the enemies array.
     * @param {Object} enemy - The enemy object.
     */
    handleJumpingOnEnemy(index, enemy) {
        this.character.bounce();
        this.removeEnemy(index, enemy.constructor.name);
        if(volumeStatus == true) {
            this.bounceChicken.play();
        }
    }
    
    /**
     * Handles the logic when the character runs into an enemy.
     * @param {Object} enemy - The enemy object.
     */
    handleRunningIntoEnemy(enemy) {
        if (enemy.deadStatus == false && this.character.energyCharacter > 0) {
            this.character.hitCharacter(enemy);
            this.statusbar_health.setPercentage(this.character.energyCharacter, 'decrease');
        }
    }

    /**
     * Handles the collision logic when the character collects bottles.
     */
    collisionsOfCharacterWithBottles() {
        this.level.collectableObjects_bottles.forEach((object, index) => {
            if (this.character.isColliding(object)) {
                this.characterCollectBottle(index);
            } 
        });
    }

    /**
     * Handles the logic when the character collects a bottle.
     * @param {number} index - The index of the bottle in the collectableObjects array.
     */
    characterCollectBottle(index) {
        this.character.collect('bottle');
        this.updateStatusbarBottle();
        this.level.collectableObjects_bottles.splice(index, 1);
        if(volumeStatus == true) {
            this.bottle_collecting_sound.play();
            this.bottle_collecting_sound.playbackRate=0.5;
        } 
    }

    /**
     * Updates the bottle status bar when bottles are collected.
     */
    updateStatusbarBottle() {
        let bottleStorage = this.character.collectedBottles;
        let percentage = (bottleStorage / this.startBottleAmound) * 100;
        this.statusbar_bottle.setPercentage(percentage, 'increase');
    }

    /**
     * Handles the collision logic when the character collects coins.
     */
    collisionsOfCharacterWithCoins() {
        this.level.collectableObjects_coin.forEach((object, index) => {
            if (this.character.isColliding(object)) {
               this.characterCollectCoin(index);
            } 
        });
    }

    /**
     * Handles the logic when the character collects a coin.
     * @param {number} index - The index of the coin in the collectableObjects array.
     */
    characterCollectCoin(index) {
        this.character.collect('coin');
        this.statusbar_coin.setPercentage(this.character.collectedCoins, 'increase');
        this.level.collectableObjects_coin.splice(index, 1);
        if(volumeStatus == true) {
            this.coin_collecting_sound.play();
        } 
    }
        
    /**
     * Checks if the "D" key is pressed to throw a bottle.
     */
    checkUseOf_KeyD() {
        setInterval(() => {
            let hasBottle = this.throwableObject.some(bottle => bottle instanceof ThrowableObject && !bottle.hasCollided);
            if(this.keyboard.KeyD && this.character.collectedBottles > 1 && !hasBottle && this.character.otherDirection == false) {
                this.characterThrowBottle();
            }
        }, 150);
    }
    
    /**
     * Throws a bottle when the "D" key is pressed.
     */
    characterThrowBottle() {
        this.createBottleObject();
        this.reduceBottleSupply();
        this.character.resetIdleTimer(); 
    }
        
    /**
     * Creates a new throwable bottle object.
     */
    createBottleObject() {
        let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 100);
        this.throwableObject.push(bottle);
    }

    /**
     * Reduces the number of bottles in the character's inventory.
     */
    reduceBottleSupply() {
        this.character.collectedBottles -= 1;
        this.updateStatusbarBottle();
    }

    /**
     * Checks for collisions between thrown bottles and enemies.
     */
    checkCollisionsOfBottles() {
        this.throwableObject.forEach((bottle, bottleIndex) => {
            if (bottle.hasCollided) {
                return; 
            }
            for (let i = this.level.enemies.length - 1; i >= 0; i--) {
                let enemy = this.level.enemies[i];
                if (bottle.isColliding(enemy) && !enemy.deadStatus) {
                    if          (enemy instanceof Chicken) {
                        this.handleChickenCollison(bottle, bottleIndex, enemy, i);
                    } else if   (enemy instanceof Chick) {
                        this.handleChickCollison(bottle, enemy, bottleIndex, i);
                    } else if   (enemy instanceof Endboss) {
                        this.handleEndbossCollison(bottle, enemy, bottleIndex, i);
                    }
                }
            }
        });
    }

    /**
     * Handles the collision logic when a bottle collides with an object of Chicken.
     * 
     * @param {Object} bottle - The bottle object.
     * @param {number} bottleIndex - The index of the bottle in the throwableObject array.
     * @param {Object} enemy - The enemy object.
     * @param {number} enemyIndex - The index of the enemy in the enemies array.
     */
    handleChickenCollison(bottle, bottleIndex, enemy, enemyIndex) {
        enemy.hitChicken();
        setTimeout(() => {
            this.removeEnemy(enemyIndex);
        }, 3000);
        bottle.bottleSplash();
    }

   /**
    * Handles the collision logic when the bottle collides with an object of Chick.
    * 
    * @param {Object} bottle - The bottle object.
    * @param {number} bottleIndex - The index of the bottle in the throwableObject array.
    * @param {Object} enemy - The enemy object.
    * @param {number} enemyIndex - The index of the enemy in the enemies array.
    */
    handleChickCollison(bottle, enemy, bottleIndex, enemyIndex) {
        enemy.hitChick();
        setTimeout(() => {
            this.removeEnemy(enemyIndex);
        }, 3000);
        bottle.bottleSplash();
    }

    /**
     * Handles the collision logic when the bottle collides with the object Endboss.
     * 
     * @param {Object} bottle - The bottle object.
     * @param {number} bottleIndex - The index of the bottle in the throwableObject array.
     * @param {Object} enemy - The enemy object.
     * @param {number} enemyIndex - The index of the enemy in the enemies array.
     */
    handleEndbossCollison(bottle, enemy, bottleIndex, enemyIndex) {
        if (bottle.hasCollided == false) {
            this.reduceEndbossEnergy()
            this.handleBottleHitEndboss(bottle, bottleIndex);
            this.level.enemies[0].endbossHurtsHimself();
        }
    }

    /**
     * Reduces the energy of Endboss, sets the animationstatus of the Endboss and updates zhe statusbar of Endbos energy. If the Energy is 0, the Die aniamtion would be initialize.
     */
    reduceEndbossEnergy() {
        this.energyEndboss -= 10;
        this.setAnimationStatus();
        this.statusbar_endboss.setPercentage(this.energyEndboss, 'increase');
        if (this.energyEndboss == 0) {
            this.level.enemies[0].endbossDies();
        }
    }

    /**
     * Sets the status of animation in dependance of energy of endboss.
     */
    setAnimationStatus() {
        let endboss = this.level.enemies[0];
        if (this.energyEndboss > 91) {
            endboss.animationStatus = 'normal';
        } else if (this.energyEndboss > 60) {  
            this.statusAlertness();
        } else {  
            this.statusAttack();
        }
    }

    /**
     * Initializes the functions and sets the values ​​for the animation mode "alertness".
     */
    statusAlertness() {
        let endboss = this.level.enemies[0];
        endboss.stopWalking();
        endboss.animationStatus = 'alertness';
        endboss.speed = 1
        endboss.animationSpeed = 200;
        endboss.walkAnimation();
    }

    /**
     * Initializes the functions and sets the values ​​for the animation mode "attack".
     */
    statusAttack() {
        let endboss = this.level.enemies[0];
        endboss.stopWalking();
        endboss.animationStatus = 'attack';
        endboss.speed = 3
        endboss.animationSpeed = 100;
        endboss.walkAnimation();
    }

    /**
     * Handles the effects when a bottle collides with the endboss.
     * 
     * @param {Object} bottle - The bottle object.
     * @param {number} bottleIndex - The index of the bottle in the throwableObject array.
     */
    handleBottleHitEndboss(bottle, bottleIndex) {
        clearInterval(bottle.intervalRotation);
        if(volumeStatus == true) {
            this.endbossHurtSound.play();
        }
        this.playSplashAnimation(bottle, bottleIndex)
        bottle.hasCollided = true;
    }

    /**
     * Plays a animation-loop of splashing bottle once and deletes the bottle object from throwableObject array.
     * 
     * @param {Object} bottle - The bottle object.
     * @param {number} bottleIndex - The index of the bottle in the throwableObject array.
     */
    playSplashAnimation(bottle, bottleIndex) {
        let splashIndex = 0; 
        let splashAnimationInterval = setInterval(() => {
            if (splashIndex < bottle.IMAGES_SPLASH.length) {
                bottle.img = bottle.imageCache[bottle.IMAGES_SPLASH[splashIndex]];
                splashIndex++;
            } else {
                clearInterval(splashAnimationInterval); 
                this.throwableObject.splice(bottleIndex, 1);
            }
        }, 100); 
    }

    /**
     * Handles the win logic and clear all running animation and sound-intervals.
     */
    handleWin() {
        renderWin();
        if(volumeStatus == true) {
            this.win_sound.play();
        }
        this.backgroundmusic.pause();
        this.character.snoring_sound.muted = true;
        clearInterval(this.character.idle);
        clearInterval(this.character.sleep); 
        clearTimeout(this.sleepTimeout); 
    }


    /**
     * Removes the enemy from enemies array.
     * 
     * @param {number} enemyIndex 
     */
    removeEnemy(enemyIndex) {
        this.level.enemies.splice(enemyIndex, 1)
    }

    /**
     * Flips the image of an object horizontally.
     * @param {Object} mo - The object whose image is to be flipped.
     */
    flipImage(mo) {
        this.ctx.save(); 
            this.ctx.translate(mo.width, 0); 
            this.ctx.scale(-1, 1);  
            mo.x = mo.x * -1;
    }

    /**
     * Restores the image orientation of a previously flipped object.
     * @param {Object} mo - The object whose image orientation is to be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}