/** 
 * Global variable to hold the level configuration.
 * @type {Level}
 */
let level1; 

/**
 * Initializes the level by creating a new `Level` instance with predefined enemies, clouds, background objects, collectable bottles, and coins.
 * 
 * The level includes:
 * - Multiple `Chicken`, `Chick`, and one `Endboss` enemy.
 * - Numerous `Cloud` objects for the background.
 * - Several `BackgroundObject` instances for various layers of the background.
 * - A collection of `CollectableObjects_bottle` for the player to collect.
 * - A set of `CollectableObjects_coin` for the player to gather.
 * 
 * The positions of the background objects, bottles, and coins are hardcoded to create a structured level.
 */
function initlevel() {
   level1 =  new Level(
    [
        new Endboss(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chick(),
        new Chick(),
        new Chick(),
        new Chick(),
        new Chick(),
        new Chick(),
        new Chick()
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],
    [
        new BackgroundObject('images/background/air.png', -719), 
        new BackgroundObject('images/background/3_third_layer/2.png', -719),
        new BackgroundObject('images/background/2_second_layer/2.png', -719), 
        new BackgroundObject('images/background/1_first_layer/2.png', -719), 
        new BackgroundObject('images/background/air.png', 0), 
        new BackgroundObject('images/background/3_third_layer/1.png', 0),
        new BackgroundObject('images/background/2_second_layer/1.png', 0), 
        new BackgroundObject('images/background/1_first_layer/1.png', 0), 
        new BackgroundObject('images/background/air.png', 719), 
        new BackgroundObject('images/background/3_third_layer/2.png', 719),
        new BackgroundObject('images/background/2_second_layer/2.png', 719), 
        new BackgroundObject('images/background/1_first_layer/2.png', 719), 
        new BackgroundObjectLargWidth('images/background/air.png', 719 * 2), 
        new BackgroundObjectLargWidth('images/background/3_third_layer/full.png', 719 * 2),
        new BackgroundObjectLargWidth('images/background/2_second_layer/full.png', 719 * 2), 
        new BackgroundObjectLargWidth('images/background/1_first_layer/full.png', 719 * 2), 
        new BackgroundObjectLargWidth('images/background/air.png', 719 * 4), 
        new BackgroundObjectLargWidth('images/background/3_third_layer/full.png', 719 * 4),
        new BackgroundObjectLargWidth('images/background/2_second_layer/full.png', 719 * 4), 
        new BackgroundObjectLargWidth('images/background/1_first_layer/full.png', 719 * 4), 
        new BackgroundObjectLargWidth('images/background/air.png', 719 * 6), 
        new BackgroundObjectLargWidth('images/background/3_third_layer/full.png', 719 * 6),
        new BackgroundObjectLargWidth('images/background/2_second_layer/full.png', 719 * 6), 
        new BackgroundObjectLargWidth('images/background/1_first_layer/full.png', 719 * 6), 
    ],
    [
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_right.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_right.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_right.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_right.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_right.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_right.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_right.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_right.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png'),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_right.png')
    ],
    [
        new CollectableObjects_coin(270, 60),
        new CollectableObjects_coin(370, 60),
        new CollectableObjects_coin(470, 60),
        new CollectableObjects_coin(700, 100),
        new CollectableObjects_coin(800, 100),
        new CollectableObjects_coin(900, 100),
        new CollectableObjects_coin(1200, 50),
        new CollectableObjects_coin(1300, 50),
        new CollectableObjects_coin(1400, 50),
        new CollectableObjects_coin(1800, 340),
        new CollectableObjects_coin(1900, 340),
        new CollectableObjects_coin(2000, 340),
        new CollectableObjects_coin(270 +  2000, 60),
        new CollectableObjects_coin(370 +  2000, 60),
        new CollectableObjects_coin(470 +  2000, 60),
        new CollectableObjects_coin(700 +  2000, 100),
        new CollectableObjects_coin(800 +  2000, 100),
        new CollectableObjects_coin(900 +  2000, 100),
        new CollectableObjects_coin(1200 + 2000, 50),
        new CollectableObjects_coin(1300 + 2000, 50),
        new CollectableObjects_coin(1400 + 2000, 50),
        new CollectableObjects_coin(1800 + 2000, 340),
        new CollectableObjects_coin(1900 + 2000, 340),
        new CollectableObjects_coin(2000 + 2000, 340),
    ]
);
}