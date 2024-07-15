class Mute extends MovableObject {
    IMAGES = [
        'images/control/music.png',
        'images/control/mute.png'
    ];
    factor = 0.3;
    width = 96 * this.factor;
    height = this.width;
    x = 680;
    y = 10;
   

    constructor() { // wird über die Erstellung eines neuen BackgroundObjects in world übergeben
        super().loadImage(this.IMAGES[0]);
    }


}