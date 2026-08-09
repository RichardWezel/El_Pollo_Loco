/**
 * Simple container for level entities such as enemies, clouds,
 * background objects and collectible items. Instances are used to
 * configure a `World` with a specific set of objects for a level.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectableObjects_bottles;
    collectableObjects_coin;

    /**
     * @param {Array} enemies - Enemy objects for the level
     * @param {Array} clouds - Cloud objects
     * @param {Array} backgroundObjects - Background image objects
     * @param {Array} collectableObjects_bottles - Bottle collectibles
     * @param {Array} collectableObjects_coin - Coin collectibles
     */
    constructor(enemies, clouds, backgroundObjects, collectableObjects_bottles, collectableObjects_coin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects_bottles = collectableObjects_bottles;
        this.collectableObjects_coin = collectableObjects_coin;
    }
}