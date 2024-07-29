class World {

    // Variablen
    character = new Character();
    level = level1; // const variable of level1.js
    canvas;
    ctx; 
    keyboard;
    camera_x = 0;
    statusbar_health = new Statusbar_health(20, 10);
    statusbar_bottle = new Statusbar_bottle(20, 50);
    statusbar_coin = new Statusbar_coin(20, 90);
    statusbar_endboss = new Statusbar_endboss(50);
    throwableObject = [];
    coin_collectinhg_sound = new Audio('audio/coin_sound.mp3');
    backgroundmusic = new Audio('audio/backgroundmusic.mp3');
    start = false;
    energyEndboss = 100;

    // Funktionen
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // Rendering-Kontext
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.playBackgroundMusic();
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clearRect(x, y, width, height)
        this.ctx.translate(this.camera_x, 0); // translate(x, y) x= 0 siehe camera_x oben als Variable
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
        this.ctx.translate(-this.camera_x, 0); // Back
        this.addToMap(this.statusbar_health); 
        this.addToMap(this.statusbar_bottle); 
        this.addToMap(this.statusbar_coin); 
        this.ctx.translate(this.camera_x, 0);// Forwards
    }

    drawMovableObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies); // mehrere Elemente
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
        this.statusbar_endboss.updateX(); // Aktualisiert die x-Position der Statusbar
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
             * and triggers the hit() and setPercentage() functions.
             * hit() reduces the energy of character and register the time of hit witch is saved in lastHit variable.
             * setPercentage() is calld for the health statusbar and passed the character energy in the function with the mode 'decrease', witch caused a reduction of the statusbar.
             */
            collisionsOfCharacterWithEnemies() {
                this.level.enemies.forEach((enemy, index) => {
                    if (this.character.isColliding(enemy)) {
                        if (this.character.isAboveGround() && this.character.speedY < 0 && !enemy instanceof Endboss) {
                            // Charakter ist in der Luft und fällt
                            this.character.bounce();
                            this.removeEnemy(index);
                        } else {
                            // Charakter kollidiert seitlich oder von unten
                            this.character.hitCharacter();
                            this.statusbar_health.setPercentage(this.character.energyCharacter, 'decrease');
                        }
                    }
                });
            }

                removeEnemy(index) {
                    this.level.enemies.splice(index, 1);
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
                        this.coin_collectinhg_sound.play();
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
                        console.log('Kollision festgestellt:', enemy);
                        console.log('Enemy ist vom Typ:', enemy.constructor.name);
                        if (enemy instanceof Endboss) {
                            console.log('Kollision mit Endboss!');
                            this.energyEndboss -= 5;
                            this.statusbar_endboss.setPercentage(this.energyEndboss, 'decrease');
                            console.log(`Endboss energy decreased to: ${this.energyEndboss}`);
                            this.handleBottleHitEndboss(bottle, enemy, bottleIndex, enemyIndex);
                            bottle.hasDealtDamage = true; // Markiere die Flasche als bereits Schaden zugefügt
                        } else if (enemy instanceof Chicken) {
                            console.log('Kollision mit Chicken!');
                            this.removeEnemy(enemyIndex);
                        } else if (enemy instanceof Chick) {
                            console.log('Kollision mit Chick!');
                            this.removeEnemy(enemyIndex);
                        }
                    }
                });
            });
        }

        handleBottleHitEndboss(bottle, enemy, bottleIndex, enemyIndex) {
            console.log(`Handling bottle hit on Endboss. Current energy: ${this.energyEndboss}`);
            if (this.character.isHurtEndboss()) {
                bottle.splash_sound.play();
                this.throwableObject.splice(bottleIndex, 1); // Entferne die Flasche nach dem Treffer
            }
            this.throwableObject.splice(bottleIndex, 1); 
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