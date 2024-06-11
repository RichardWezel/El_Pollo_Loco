class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 0.15;

    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        
        this.x = Math.random() * 500;
        this.moveClouds();
    }

    moveClouds() {
        setInterval(() => {
            this.x -= this.speed;
            if (this.x + this.width < 0) { // Wolke wieder rechts erscheinen lassen
                this.x = 720;
            }
        }, 10);
    }
}