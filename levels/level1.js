const level1 = new Level(
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
        new Chicken(),
        new Chicken(),
        new Chick(),
        new Chick(),
        new Chick(),
        new Chick(),
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
        new CollectableObjects_coin(1800, 350),
        new CollectableObjects_coin(1900, 350),
        new CollectableObjects_coin(2000, 350),
        new CollectableObjects_coin(270 +  2000, 60),
        new CollectableObjects_coin(370 +  2000, 60),
        new CollectableObjects_coin(470 +  2000, 60),
        new CollectableObjects_coin(700 +  2000, 100),
        new CollectableObjects_coin(800 +  2000, 100),
        new CollectableObjects_coin(900 +  2000, 100),
        new CollectableObjects_coin(1200 + 2000, 50),
        new CollectableObjects_coin(1300 + 2000, 50),
        new CollectableObjects_coin(1400 + 2000, 50),
        new CollectableObjects_coin(1800 + 2000, 350),
        new CollectableObjects_coin(1900 + 2000, 350),
        new CollectableObjects_coin(2000 + 2000, 350),
    ]
);