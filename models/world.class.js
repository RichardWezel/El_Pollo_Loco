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
    start = false;
    energyEndboss = 100;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); 
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.playBackgroundMusic();
        this.backgroundmusic.volume = 0.2; // Reduce the Volume by Half
        this.bottle_collecting_sound.playbackRate=0.1;
    }
    
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

    drawLevelBachgrounds() {
        this.addObjectsToMap(this.level.backgroundObjects); 
        this.addObjectsToMap(this.level.clouds); 
        this.addObjectsToMap(this.level.collectableObjects_bottles); 
        this.addObjectsToMap(this.level.collectableObjects_coin); 
    }

    drawStatusbars() {
        this.ctx.translate(-this.camera_x, 0); 
        this.addToMap(this.statusbar_health); 
        this.addToMap(this.statusbar_bottle); 
        this.addToMap(this.statusbar_coin); 
        this.ctx.translate(this.camera_x, 0);
    }

    drawMovableObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.statusbar_endboss); 
        this.addObjectsToMap(this.throwableObject);
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }              
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    setWorld() {
        this.character.world = this;
        this.statusbar_health.world = this;
        this.statusbar_endboss.world = this;
        this.statusbar_endboss.updateX();
    }

    playBackgroundMusic() {
        this.backgroundmusic.play();
        this.backgroundmusic.addEventListener('ended', () => {
            this.backgroundmusic.currentTime = 0;
            this.backgroundmusic.play();
        });
    }

    /**
     * Intervals of checking collisions with enemies or collectable objects and checking use of Key D to throw a bottle.
     */
    run() {
        setInterval(() => {
            this.checkCollisionsofCharacter();
            this.checkUseOf_KeyD();
            this.checkCollisionsOfBottles();
        }, 150);
    }

        /**
         * Is called by run() in constructor of World with innterval of 150 ms.
         */
        checkCollisionsofCharacter() {
            this.collisionsOfCharacterWithEnemies();
            this.collisionsOfCharacterWithBottles();
            this.collisionsOfCharacterWithCoins();
        }

            /**
             * The function checks for each enemy object whether it collides with the character 
             * and distinguishes between jumping up on the enemy and running into the enemy.
             ** Jumping up on the enemy triggers the handleJumpingOnEnemy() function.
             ** Running into the enemy triggers the handleRunningIntoEnemy() function.
             */
            collisionsOfCharacterWithEnemies() {
                this.level.enemies.forEach((enemy, index) => {
                    if (this.character.isColliding(enemy)) {
                        if (this.character.isAboveGround() && this.character.speedY < 0 && !enemy instanceof Endboss) {
                            this.handleJumpingOnEnemy(index, enemy);
                        } else {
                            this.handleRunningIntoEnemy();
                        }
                    }
                });
            }
                /**
                 * bounce() let the character jump up. 
                 * removeEnemy() deletes the enemy-object from the array 'enemies' in class Level.
                 * 
                 * @param {Number} index - Index of enemy in class Level array 'enemies'.
                 * @param {Object} enemy - Object colliding with the character.
                 */
                handleJumpingOnEnemy(index, enemy) {
                    this.character.bounce();
                    this.removeEnemy(index, enemy.constructor.name);
                    this.bounceChicken.play();
                }

                /**
                 * hit() reduces the energy of character and register the time of hit witch is saved in lastHit variable.
                 * setPercentage() is calld for the health statusbar and passed the character energy in the function with the mode 'decrease', witch caused a reduction of the statusbar.
                 */
                handleRunningIntoEnemy() {
                    this.character.hitCharacter();
                    this.statusbar_health.setPercentage(this.character.energyCharacter, 'decrease');
                }

                /**
                 * Let the character jump up and falling down to the start ground position.
                 */
                bounce() {
                    this.speedY = 20; // Bounce up
                    this.y = this.groundPos - 20; // Adjust the y position to be slightly above the ground position
                }

                

            collisionsOfCharacterWithBottles() {
                this.level.collectableObjects_bottles.forEach((object, index) => {
                    if (this.character.isColliding(object)) {
                        this.characterCollectBottle(index);
                    } 
                });
            }

                characterCollectBottle(index) {
                    this.character.collect('bottle');
                    this.statusbar_bottle.setPercentage(this.character.collectedBottles, 'decrease');
                    this.level.collectableObjects_bottles.splice(index, 1);
                    if(volumeStatus == true) {
                        this.bottle_collecting_sound.play();
                        this.bottle_collecting_sound.playbackRate=0.5;
                    } 
                }

            collisionsOfCharacterWithCoins() {
                this.level.collectableObjects_coin.forEach((object, index) => {
                    if (this.character.isColliding(object)) {
                       this.characterCollectCoin(index);
                    } 
                });
            }

                characterCollectCoin(index) {
                    this.character.collect('coin');
                    this.statusbar_coin.setPercentage(this.character.collectedCoins, 'decrease');
                    this.level.collectableObjects_coin.splice(index, 1);
                    if(volumeStatus == true) {
                        this.coin_collecting_sound.play();
                    } 
                }
        
        checkUseOf_KeyD() {
            if(this.keyboard.KeyD) {
                if (this.character.collectedBottles > 1) {
                   this.characterThrowBottle();
                }
            }
        }

            characterThrowBottle() {
                this.createBottleObject();
                this.reduceBottleSupply();
                this.character.resetIdleTimer(); 
            }
        
                createBottleObject() {
                    let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 100);
                    this.throwableObject.push(bottle);
                }
            
                reduceBottleSupply() {
                    this.character.collectedBottles -= 12;
                    this.statusbar_bottle.setPercentage(this.character.collectedBottles, 'decrease');
                }

        checkCollisionsOfBottles() {
            this.throwableObject.forEach((bottle, bottleIndex) => {
                this.level.enemies.forEach((enemy, enemyIndex) => {
                    if (bottle.isColliding(enemy)) {
                        if (enemy instanceof Endboss) {
                            this.endbossCollision(bottle, enemy, bottleIndex, enemyIndex);
                        } else if (enemy instanceof Chicken) {
                            this.removeEnemy(enemyIndex, 'Chicken');
                        } else if (enemy instanceof Chick) {
                            this.removeEnemy(enemyIndex, 'Chick');
                        }
                    }
                });
            });
        }

        endbossCollision(bottle, enemy, bottleIndex, enemyIndex) {
            this.energyEndboss -= 10;
            this.statusbar_endboss.setPercentage(this.energyEndboss, 'decrease');
            console.log(`Endboss energy decreased to: ${this.energyEndboss}`);
            this.handleBottleHitEndboss(bottle, enemy, bottleIndex, enemyIndex);
            bottle.hasDealtDamage = true; // Markiere die Flasche als bereits Schaden zugefügt
            if (this.energyEndboss == 0) {
                renderWin();
                this.win_sound.play();
            }
        }

        handleBottleHitEndboss(bottle, enemy, bottleIndex, enemyIndex) {
            if (this.character.isHurtEndboss()) {
                bottle.splash_sound.play();
                this.throwableObject.splice(bottleIndex, 1); // Entferne die Flasche nach dem Treffer
            }
            this.throwableObject.splice(bottleIndex, 1); 
        }

    removeEnemy(indexOfEnemy, enemyType) {
        this.level.enemies.splice(indexOfEnemy, 1);
        console.log(`Kollision mit `, enemyType);
    }

    flipImage(mo) {
        this.ctx.save(); 
            this.ctx.translate(mo.width, 0); 
            this.ctx.scale(-1, 1);  
            mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}