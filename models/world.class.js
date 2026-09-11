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
    // Short effects use Sound (Web Audio) instead of new Audio() - see
    // models/sound.class.js for why. The background music stays an HTMLAudioElement:
    // it's a 94 s track, which streams fine as a media element but would occupy ~30 MB
    // decoded in memory as a Web Audio buffer.
    coin_collecting_sound = new Sound('audio/coin_sound.mp3');
    bottle_collecting_sound = new Sound('audio/new.m4a');
    bounceChicken = new Sound('audio/hitChicken.m4a');
    backgroundmusic = new Audio('audio/backgroundmusic.mp3');
    win_sound = new Sound('audio/win.mp3');
    endbossHurtSound = new Sound('audio/endbossHurt.m4a');
    start = false;
    energyEndboss = 100;
    startBottleAmound = 0;
    startCoinAmound = 0;
    lastFrameTime = null;
    isPaused = false;
    collisionCharacterInterval = null;
    collisionBottleInterval = null;
    throwCheckInterval = null;
    animationFrameId = null;

    /**
    * Create a new World instance and start rendering and collision checks.
    *
    * @param {HTMLCanvasElement} canvas - Canvas element for rendering.
    * @param {Object} keyboard - Keyboard input handler instance.
    */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        // setWorld() (and everything else below) must run before draw(), because draw()
        // now synchronously calls update(deltaTime) on the character, which needs
        // this.character.world to already be set (checkPressArrowRight/Left read
        // this.world.keyboard). draw() itself schedules all further frames via
        // requestAnimationFrame, so it belongs last.
        this.setWorld();
        this.intervalCollCharacter();
        this.intervalCollBottle();
        this.checkUseOf_KeyD();
        this.backgroundmusic.load();
        if(volumeStatus == true) {
            this.playBackgroundMusic();
        }
        this.setCollectableObjectAmounds()
        this.draw();
    }

    setCollectableObjectAmounds() {
        this.startBottleAmound = this.level.collectableObjects_bottles.length;
        this.startCoinAmound = this.level.collectableObjects_coin.length;
    }
    
    /**
     * Main render loop: computes deltaTime, updates the position of all movable objects,
     * then draws the level, status bars and movable objects, and finally requests the
     * next frame.
     *
     * @param {number} [timestamp] - Timestamp passed in by requestAnimationFrame (ms since
     * page load). Not yet available on the very first call from the constructor, hence the
     * fallback in calcDeltaTime().
     */
    draw(timestamp) {
        if (this.isPaused) {
            this.lastFrameTime = null;
            return;
        }
        let deltaTime = this.calcDeltaTime(timestamp);
        this.updateMovableObjects(deltaTime);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawLevelBachgrounds();
        this.drawStatusbars();
        this.drawMovableObjects();
        this.statusbar_endboss.updateX();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        this.animationFrameId = requestAnimationFrame(function(ts) {
            self.draw(ts);
        });
    }

    /**
     * Computes the time elapsed since the last frame, in seconds.
     *
     * Prefers the timestamp supplied by requestAnimationFrame (precise and in sync with
     * rendering). Falls back to performance.now() on the very first call, since draw() is
     * invoked synchronously from the constructor without a timestamp yet.
     *
     * @param {number} [timestamp] - Timestamp from requestAnimationFrame.
     * @returns {number} Time elapsed since the last frame, in seconds.
     */
    calcDeltaTime(timestamp) {
        if (!timestamp) {
            timestamp = performance.now();
        }
        if (this.lastFrameTime === null) {
            this.lastFrameTime = timestamp;
        }
        let deltaTime = (timestamp - this.lastFrameTime) / 1000;
        this.lastFrameTime = timestamp;
        return deltaTime;
    }

    /**
     * Calls update(deltaTime) on all movable objects in the world: the character, all
     * enemies, clouds and thrown bottles. Runs once per frame, before drawing.
     *
     * @param {number} deltaTime - Time elapsed since the last frame, in seconds.
     */
    updateMovableObjects(deltaTime) {
        this.character.update(deltaTime);
        this.level.enemies.forEach(enemy => enemy.update(deltaTime));
        this.level.clouds.forEach(cloud => cloud.update(deltaTime));
        this.throwableObject.forEach(bottle => bottle.update(deltaTime));
    }

    /**
     * Draw level backgrounds, clouds and collectable objects.
     */
    drawLevelBachgrounds() {
        this.addObjectsToMap(this.level.backgroundObjects); 
        this.addObjectsToMap(this.level.clouds); 
        this.addObjectsToMap(this.level.collectableObjects_bottles); 
        this.addObjectsToMap(this.level.collectableObjects_coin); 
    }

    /**
     * Render status bars (health, bottles, coins, endboss) in screen space.
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
     * Associate world reference with objects that need it (character, statusbars, enemies).
     */
    setWorld() {
        this.character.world = this;
        this.statusbar_health.world = this;
        this.statusbar_endboss.world = this;
        this.statusbar_endboss.updateX();
        this.level.enemies[0].world = this;
    }

    /**
     * Play and loop background music (respecting the global `volumeStatus`).
     *
     * Looping is done via the element's own `loop` flag. Previously an 'ended' listener
     * rewound and restarted the track - and since this method runs on every unmute and
     * every resume from pause, that listener stacked up, so the end of the track fired
     * several play() calls at once.
     */
    playBackgroundMusic() {
        this.backgroundmusic.loop = true;
        this.backgroundmusic.volume = 0.2;
        if(volumeStatus == true) {
            this.tryPlayBackgroundMusic();
        }
    }

    /**
     * Attempt to play the background music, with a fallback for browsers that block it.
     *
     * Browsers refuse to autoplay audio with sound unless it's triggered by a direct user
     * gesture (click/tap/keypress). That's normally fine here since play() is called from
     * inside the "Start" button's click handler - but restartGame() ("Noch einmal!") jumps
     * straight into a new game via a full page reload (see start.js), so this first play()
     * call happens during page load, not inside a click handler, and gets silently
     * rejected. If that happens, fall back to starting the music on the player's first
     * touch/click/key press - which happens anyway within a second or two of the game
     * starting, since that's how you control the character.
     */
    tryPlayBackgroundMusic() {
        let playPromise = this.backgroundmusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                let resumeOnInteraction = () => {
                    if (volumeStatus == true) {
                        this.backgroundmusic.play();
                    }
                    document.removeEventListener('touchstart', resumeOnInteraction);
                    document.removeEventListener('keydown', resumeOnInteraction);
                    document.removeEventListener('mousedown', resumeOnInteraction);
                };
                document.addEventListener('touchstart', resumeOnInteraction, { once: true });
                document.addEventListener('keydown', resumeOnInteraction, { once: true });
                document.addEventListener('mousedown', resumeOnInteraction, { once: true });
            });
        }
    }

    /**
     * Periodically check collisions involving the main character.
     */
    intervalCollCharacter() {
        this.collisionCharacterInterval = setInterval(() => {
            if (!this.isPaused) {
                this.checkCollisionsofCharacter();
            }
        }, 50);
    }

    /**
     * Periodically check collisions for thrown bottles against enemies.
     */
    intervalCollBottle() {
        this.collisionBottleInterval = setInterval(() => {
            if (!this.isPaused) {
                this.checkCollisionsOfBottles();
            }
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
     * Handle collision when the character runs into an enemy: apply damage
     * and update the health status bar.
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
        this.throwCheckInterval = setInterval(() => {
            if (this.isPaused) {
                return;
            }
            let hasBottle = this.throwableObject.some(bottle => bottle instanceof ThrowableObject && !bottle.hasCollided);
            if(this.keyboard.KeyD && this.character.collectedBottles > 0 && !hasBottle && this.character.otherDirection == false) {
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
     *
     * endboss.speed converted from the old tick-based 1 (at 20 ticks/sec) to
     * pixels/second: 1 * 20 = 20.
     */
    statusAlertness() {
        let endboss = this.level.enemies[0];
        endboss.stopWalking();
        endboss.animationStatus = 'alertness';
        endboss.speed = 20
        endboss.animationSpeed = 200;
        endboss.walkAnimation();
    }

    /**
     * Initializes the functions and sets the values ​​for the animation mode "attack".
     *
     * endboss.speed converted from the old tick-based 3 (at 20 ticks/sec) to
     * pixels/second: 3 * 20 = 60.
     */
    statusAttack() {
        let endboss = this.level.enemies[0];
        endboss.stopWalking();
        endboss.animationStatus = 'attack';
        endboss.speed = 60
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
        bottle.stopFlight();
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
     * Toggle the pause state of the game.
     */
    togglePause() {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.pauseGame();
        } else {
            this.resumeGame();
        }
    }

    /**
     * Pause the game loop and active world timers.
     */
    pauseGame() {
        this.lastFrameTime = null;
        if (this.collisionCharacterInterval) {
            clearInterval(this.collisionCharacterInterval);
        }
        if (this.collisionBottleInterval) {
            clearInterval(this.collisionBottleInterval);
        }
        if (this.throwCheckInterval) {
            clearInterval(this.throwCheckInterval);
        }
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.backgroundmusic.pause();
        this.character.pauseAnimationTimers();
        this.character.walking_sound.pause();
        this.character.hurt_sound.pause();
        this.character.jump_sound.pause();
        this.character.death_sound.pause();
        this.character.snoring_sound.pause();
        this.throwableObject.forEach((bottle) => {
            if (bottle && bottle.splash_sound) {
                bottle.splash_sound.pause();
                bottle.splash_sound.currentTime = 0;
            }
        });
    }

    /**
     * Resume the game loop and restart world timers.
     */
    resumeGame() {
        this.intervalCollCharacter();
        this.intervalCollBottle();
        this.checkUseOf_KeyD();
        this.character.resumeAnimationTimers();
        if (volumeStatus == true) {
            this.playBackgroundMusic();
        }
        this.draw();
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