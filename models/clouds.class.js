class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 1;

    constructor() {
        super().loadImage('images/background/4_clouds/1.png');
        
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }


    
}