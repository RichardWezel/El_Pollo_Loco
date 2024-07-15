class ControllSymbol extends MovableObject {
    imgPath;
    task;
    factor;
    offset = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    }
    BorderColor = 'black';
    
    /**
     * 
     * @param {Number} x - x position on canvas
     * @param {Number} y - y position on canvas
     * @param {Number} factor - factor of 
     * @param {String} imgPath - imgae path
     * @param {String} task - Marks the task of this symbol to decide witch fuction is used to be.
     */
    constructor(x, y, height, width, factor, imgPath, task) {
        super().loadImage(imgPath);
        this.x = x;
        this.y = y;
        this.factor = factor;
        this.task = task;
        this.height = height;
        this.width = width;
        this.width = 96 * this.factor;
        this.height = this.width;
    }



}