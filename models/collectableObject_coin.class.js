class CollectableObjects_coin extends MovableObject {
    
    y = 350;
    factor = 0.2;
    height = 400 * this.factor;
    width = this.height;
    BorderColor = 'yellow';
    offset = {
        top: 30,
        right: 30,
        bottom: 20,
        left: 30
    }
    IMAGE_COIN = [
        'images/coin/coin_1.png',
        'images/coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGE_COIN[0]);
        this.loadImages(this.IMAGE_COIN);
        this.x = x; 
        this.height;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGE_COIN)  
        }, 300);
    }
}