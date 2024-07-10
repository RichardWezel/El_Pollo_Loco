const level1 = new Level(
    [
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
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_right.png', 470),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_left.png', 970),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_left.png', 1170),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_left.png', 1370),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_left.png', 1570),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_left.png', 1870),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_right.png', 2070),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_left.png', 2570),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_right.png', 3070),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_left.png', 3570),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_left.png', 4070),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_right.png', 4570),
    ],
    [
        new CollectableObjects('images/coin/coin_1.png', 470 + 200),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_left.png', 970 + 200),
        new CollectableObjects('images/coin/coin_1.png', 1170 + 200),
        new CollectableObjects('images/coin/coin_1.png', 1370 + 200),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_left.png', 1570 + 200),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_left.png', 1870 + 200),
        new CollectableObjects('images/coin/coin_1.png', 2070 + 200),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_left.png', 2570 + 200),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_right.png', 3070 + 200),
        new CollectableObjects('images/coin/coin_1.png', 3570 + 200),
        new CollectableObjects('images/coin/coin_1.png', 4070 + 200),
        new CollectableObjects('images/bottle/solo/salsa_bottle_stuck_right.png', 4570 + 200),
    ]
);