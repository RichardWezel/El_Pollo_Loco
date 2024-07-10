class Statusbar extends MovableObject {
    factor = 0.3;
    height = 158 * this.factor;
    width = this.height * 3.9666;
    STATUS_IMGAES = [];
    world;
    percentage = 100;

    /**
     * Used in the world, sets the variable "percentage".
     * Changes the Image of statusbar depending on resolveImageIndex() return.
     * 
     * @param {Number} percentage Value from 0 to 100.
     * @param {String} mode 'increase' or 'decrease'
     */
    setPercentage(percentage, mode) {
        this.percentage = percentage;
        let imagePath = this.STATUS_IMGAES[this.resolveImageIndex(mode)];
        this.img = this.imageCache[imagePath];
    }
    
    /**
     * Calls decreaseSequence() or increaseSequence() to return the Index of statusbar-image depending on mode.
     * 
     * @param {String} mode 'increase' or 'decrease'
     * @returns {Number} - Index of image
     */
    resolveImageIndex(mode) {
        if(mode == 'increase') {
            return this.increaseSequence();
        } else if (mode == 'decrease') {
            return this.decreaseSequence();
        }
    }

    /**
     * Returns the Index of statusbar-image
     * 
     * @returns {Number}
     */
    increaseSequence() {
        if(this.percentage == 100) {
            return 5
        } else if (this.percentage > 80) {
            return 4
        } else if (this.percentage > 60) {
            return 3
        } else if (this.percentage > 40) {
            return 2
        } else if (this.percentage > 20) {
            return 1
        } else {
            return 0
        }
    }

    decreaseSequence() {
        if(this.percentage == 100) {
            return 0
        } else if (this.percentage > 80) {
            return 1
        } else if (this.percentage > 60) {
            return 2
        } else if (this.percentage > 40) {
            return 3
        } else if (this.percentage > 20) {
            return 4
        } else {
            return 5
        }
    }

    
       
}

