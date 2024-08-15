class CollectableObjects_coin extends MovableObject {
    
    y = 350;
    factor = 0.2;
    height = 600 * this.factor;
    width = this.height;
    BorderColor = 'yellow';
    offset = {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
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

    /**
     * Starts the animation of coins.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGE_COIN)  
        }, 300);
    }
}