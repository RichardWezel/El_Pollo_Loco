class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectableObjects_bottles;
    collectableObjects_coin;

    constructor(enemies, clouds, backgroundObjects, collectableObjects_bottles, collectableObjects_coin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects_bottles = collectableObjects_bottles;
        this.collectableObjects_coin = collectableObjects_coin;
    }
}