class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 0.2;

    constructor() {
        super().loadImage('images/background/4_clouds/1.png');
        this.x = Math.random() * 6000;
        this.speed = 0.2 + Math.random() * 0.4;
        this.animateClouds();
    }

    animateClouds() {
        setInterval(() => {
            this.moveLeft() 
        }, 1000 / 60); 
    }
}