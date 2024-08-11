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


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); 
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkUseOf_KeyD();
        this.playBackgroundMusic();
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
        this.level.enemies[0].world = this;
    }

    playBackgroundMusic() {
        this.backgroundmusic.play();
        this.backgroundmusic.volume = 0.2;
        this.backgroundmusic.addEventListener('ended', () => {
            this.backgroundmusic.currentTime = 0;
            this.backgroundmusic.play();
        });
    }

    run() {
        setInterval(() => {
            this.checkCollisionsofCharacter();
            // this.checkUseOf_KeyD();
            this.checkCollisionsOfBottles();
        }, 150);
    }

    checkCollisionsofCharacter() {
        this.collisionsOfCharacterWithEnemies();
        this.collisionsOfCharacterWithBottles();
        this.collisionsOfCharacterWithCoins();
    }

    collisionsOfCharacterWithEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    if (!enemy instanceof Endboss) {
                        this.handleJumpingOnEnemy(index, enemy);
                    }
                } else {
                    this.handleRunningIntoEnemy(enemy);
                }
            }
        });
    }
                
    handleJumpingOnEnemy(index, enemy) {
        this.character.bounce();
        this.removeEnemy(index, enemy.constructor.name);
        this.bounceChicken.play();
        console.log('handleJumpingOnEnemy')
    }
                
    handleRunningIntoEnemy(enemy) {
        if (enemy.deadStatus == false && this.character.energyCharacter > 0) {
            this.character.hitCharacter();
            this.statusbar_health.setPercentage(this.character.energyCharacter, 'decrease');
        }
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
        this.statusbar_bottle.setPercentage(this.character.collectedBottles, 'increase');
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
        setInterval(() => {
            let hasBottle = this.throwableObject.some(bottle => bottle instanceof ThrowableObject && !bottle.hasCollided);
            if(this.keyboard.KeyD && this.character.collectedBottles > 1 && !hasBottle) {
                this.characterThrowBottle();
            }
        }, 150);
    }
    
d
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
            if (bottle.hasCollided) {
                return; // Überspringe dieses Objekt, wenn es bereits kollidiert ist
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

    handleChickenCollison(bottle, enemy, enemyIndex) {
        console.log(enemyIndex);
        enemy.hitChicken();
        setTimeout(() => {
            this.removeEnemy(enemyIndex);
        }, 3000);
        bottle.bottleSplash();
    }

    handleChickCollison(bottle, enemy, bottleIndex, enemyIndex) {
        enemy.hitChick();
        setTimeout(() => {
            this.removeEnemy(enemyIndex);
        }, 3000);
        bottle.bottleSplash();
    }

    handleEndbossCollison(bottle, enemy, bottleIndex, enemyIndex) {
        if (bottle.hasCollided == false) {
            this.reduceEndbossEnergy()
            this.handleBottleHitEndboss(bottle, bottleIndex);
            this.level.enemies[0].endbossHurtsHimself();
        }
    }

    reduceEndbossEnergy() {
        this.energyEndboss -= 10;
        this.statusbar_endboss.setPercentage(this.energyEndboss, 'decrease');
        console.log(`Endboss energy decreased to: ${this.energyEndboss}`);
        if (this.energyEndboss == 0) {
            this.level.enemies[0].endbossDies();
        }
    }

    handleBottleHitEndboss(bottle, bottleIndex) {
        clearInterval(bottle.intervalRotation);
        this.endbossHurtSound.play();
        this.playSplashAnimation(bottle, bottleIndex)
        bottle.hasCollided = true;
    }

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

    handleWin() {
        renderWin();
        this.win_sound.play();
        this.backgroundmusic.pause();
        this.character.snoring_sound.pause();
        clearInterval(this.character.idle);
        clearInterval(this.character.sleep); 
        clearTimeout(this.sleepTimeout); 
    }

    removeEnemy(enemyIndex) {
        this.level.enemies.splice(enemyIndex, 1)
        console.log('The index ' + enemyIndex  + ' is deleted from enemies');
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