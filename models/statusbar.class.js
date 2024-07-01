class Statusbar extends MovableObject {
    x;
    y;
    img;
    factor = 0.3;
    height = 158 * this.factor;
    width = this.height * 3.9666;
    LIFE_STATUS_IMGAES = [
        'images/statusbar_health/100.png',
        'images/statusbar_health/80.png',
        'images/statusbar_health/60.png',
        'images/statusbar_health/40.png',
        'images/statusbar_health/20.png',
        'images/statusbar_health/0.png'
    ];
   

    constructor(x, y) { // wird über die Erstellung eines neuen BackgroundObjects in world übergeben
        super().loadImage(this.LIFE_STATUS_IMGAES[0]);
        this.x = x; // this.x ist x des Objects // x ist die übergebene Variable
        this.y = y;
        this.height;
        this.y = 20;
        this.updateLifePoints();
    }

    updateLifePoints() {
        setInterval(() =>{
          console.log('energy is ', this.energy)
        }, 200)
    }
}