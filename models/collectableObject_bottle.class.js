class CollectableObjects_bottle extends MovableObject {
    
    y = 350;
    factor = 0.2;
    height = 400 * this.factor;
    width = this.height;
    BorderColor = 'yellow';
    offset = {
        top: 20,
        right: 20,
        bottom: 0,
        left: 30
    }

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 200 + Math.random() * 4000;
        this.height;
        this.y;
    }
}