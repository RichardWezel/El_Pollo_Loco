const level1 = new Level(
    [
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
    ]
);