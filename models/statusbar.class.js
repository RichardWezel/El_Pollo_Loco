class Statusbar extends MovableObject {
    factor = 0.3;
    height = 158 * this.factor;
    width = this.height * 3.9666;
    STATUS_IMAGES = [];
    world;
    percentage = 0;

    /**
    * Sets the percentage value and updates the image based on the given mode.
    *
    * @param {number} percentage - The new percentage value to set. This value typically represents a status or progress in a range from 0 to 100.
    * @param {string} mode - The mode used to determine which image to use. This should correspond to a key in the `STATUS_IMAGES` object.
    */
    setPercentage(percentage, mode) {
        this.percentage = percentage;
        let imagePath = this.STATUS_IMAGES[this.resolveImageIndex(mode)];
        this.img = this.imageCache[imagePath];
    }
    
    /**
    * Resolves the index of the image based on the provided mode.
    *
    * @param {string} mode - The mode that determines the sequence of images to use. This should be either 'increase' or 'decrease'.
    * @returns {number} The index of the image in the sequence, based on the mode.
    */
    resolveImageIndex(mode) {
        if(mode == 'increase') {
            return this.increaseSequence();
        } else if (mode == 'decrease') {
            return this.decreaseSequence();
        }
    }

    /**
    * Determines the image index for the 'increase' mode based on the current percentage.
    *
    * @returns {number} The index of the image corresponding to the current percentage.
    *
    * The returned index is used to select an image from a predefined sequence, providing visual feedback based on the percentage value.
    */
    increaseSequence() {
        if(this.percentage >= 100) {
            return 0
        } else if (this.percentage > 79) {
            return 1
        } else if (this.percentage > 59) {
            return 2
        } else if (this.percentage > 39) {
            return 3
        } else if (this.percentage > 19) {
            return 4
        } else  {
            return 5
        }
    }

    /**
    * Determines the image index for the 'decrease' mode based on the current percentage.
    *
    * @returns {number} The index of the image corresponding to the current percentage.
    *
    * The returned index is used to select an image from a predefined sequence, providing visual feedback based on the percentage value in decreasing order.
    */
    decreaseSequence() {
        if(this.percentage >= 100) {
            return 5
        } else if (this.percentage > 79) {
            return 4
        } else if (this.percentage > 59) {
            return 3
        } else if (this.percentage > 39) {
            return 2
        } else if (this.percentage > 19) {
            return 1
        } else {
            return 0
        }
    }  
}