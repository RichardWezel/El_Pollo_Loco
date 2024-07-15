class Start_screen extends MovableObject{
    x = 0;
    y = 0;
    height = 480;
    width = 740;
    IMAGE = 'images/intro_outro_screens/start/startscreen_1.png';

    constructor() {
        super().loadImage(this.IMAGE);
    }
}