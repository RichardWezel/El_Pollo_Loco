const level1 = new Level(
    [
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        new Endboss(),
    ],
    [
        new Cloud()
    ],
    [
        new BackgroundObject('images/background/air.png', -719), // Himmel ; wir din den constructor reingegeben
        new BackgroundObject('images/background/3_third_layer/2.png', -719),// Berge
        new BackgroundObject('images/background/2_second_layer/2.png', -719), // Kakten
        new BackgroundObject('images/background/1_first_layer/2.png', -719), // bunt Kakten
        new BackgroundObject('images/background/air.png', 0), // Himmel ; wir din den constructor reingegeben
        new BackgroundObject('images/background/3_third_layer/1.png', 0),// Berge
        new BackgroundObject('images/background/2_second_layer/1.png', 0), // Kakten
        new BackgroundObject('images/background/1_first_layer/1.png', 0), // bunt Kakten
        new BackgroundObject('images/background/air.png', 719), // Himmel ; wir din den constructor reingegeben
        new BackgroundObject('images/background/3_third_layer/2.png', 719),// Berge
        new BackgroundObject('images/background/2_second_layer/2.png', 719), // Kakten
        new BackgroundObject('images/background/1_first_layer/2.png', 719), // bunt Kakten
        new BackgroundObjectLargWidth('images/background/air.png', 719 * 2), // Himmel ; wir din den constructor reingegeben
        new BackgroundObjectLargWidth('images/background/3_third_layer/full.png', 719 * 2),// Berge
        new BackgroundObjectLargWidth('images/background/2_second_layer/full.png', 719 * 2), // Kakten
        new BackgroundObjectLargWidth('images/background/1_first_layer/full.png', 719 * 2), // bunt Kakten
        new BackgroundObjectLargWidth('images/background/air.png', 719 * 4), // Himmel ; wir din den constructor reingegeben
        new BackgroundObjectLargWidth('images/background/3_third_layer/full.png', 719 * 4),// Berge
        new BackgroundObjectLargWidth('images/background/2_second_layer/full.png', 719 * 4), // Kakten
        new BackgroundObjectLargWidth('images/background/1_first_layer/full.png', 719 * 4), // bunt Kakten
        new BackgroundObjectLargWidth('images/background/air.png', 719 * 6), // Himmel ; wir din den constructor reingegeben
        new BackgroundObjectLargWidth('images/background/3_third_layer/full.png', 719 * 6),// Berge
        new BackgroundObjectLargWidth('images/background/2_second_layer/full.png', 719 * 6), // Kakten
        new BackgroundObjectLargWidth('images/background/1_first_layer/full.png', 719 * 6), // bunt Kakten
    ],
    [
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_right.png', 470),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png', 970),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png', 1170),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png', 1370),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png', 1570),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png', 1870),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_right.png', 2070),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png', 2570),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_right.png', 3070),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png', 3570),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_left.png', 4070),
        new CollectableObjects_bottle('images/bottle/solo/salsa_bottle_stuck_right.png', 4570),
    ],
    [
        new CollectableObjects_coin(270, 50),
        new CollectableObjects_coin(370, 50),
        new CollectableObjects_coin(470, 50),
        new CollectableObjects_coin(700, 100),
        new CollectableObjects_coin(800, 100),
        new CollectableObjects_coin(900, 100),
        new CollectableObjects_coin(1200, 20),
        new CollectableObjects_coin(1300, 20),
        new CollectableObjects_coin(1400, 20),
        new CollectableObjects_coin(1800, 350),
        new CollectableObjects_coin(1900, 350),
        new CollectableObjects_coin(2000, 350),
        new CollectableObjects_coin(270 +  2000, 50),
        new CollectableObjects_coin(370 +  2000, 50),
        new CollectableObjects_coin(470 +  2000, 50),
        new CollectableObjects_coin(700 +  2000, 100),
        new CollectableObjects_coin(800 +  2000, 100),
        new CollectableObjects_coin(900 +  2000, 100),
        new CollectableObjects_coin(1200 + 2000, 20),
        new CollectableObjects_coin(1300 + 2000, 20),
        new CollectableObjects_coin(1400 + 2000, 20),
        new CollectableObjects_coin(1800 + 2000, 350),
        new CollectableObjects_coin(1900 + 2000, 350),
        new CollectableObjects_coin(2000 + 2000, 350),
    ]
);