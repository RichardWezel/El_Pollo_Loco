class CollectableObjects extends MovableObject {
    
    y = 350;
    factor = 0.2;
    height = 400 * this.factor;
    width = this.height;
    BorderColor = 'yellow';

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x; // this.x ist x des Objects // x ist die übergebene Variable
        this.height;
        this.y;
    }

   
}