class Statusbar extends MovableObject {
    factor = 0.3;
    height = 158 * this.factor;
    width = this.height * 3.9666;
    STATUS_IMGAES = [];
    world;
    percentage = 100;

    setPercentage(percentage, mode) {
        this.percentage = percentage; // => 0 ... 5
        let imagePath = this.STATUS_IMGAES[this.resolveImageIndex(mode)];
        this.img = this.imageCache[imagePath];
    }
    
    resolveImageIndex(mode) {
        if(mode == 'decrease') {
            return this.decreaseSequence();
        } else if (mode == 'increase') {
            return this.increaseSequence();
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
       
}

