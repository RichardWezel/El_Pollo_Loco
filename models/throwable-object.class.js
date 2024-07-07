class ThrowableObject extends MovableObject {
    factor = 0.2;
    height = 400 * this.factor;
    width = 400 * this.factor;
    speedX = 20;
    BOTTLE_IMAGES = {
        rotation: [
            'images/bottle/rotation/1_bottle_rotation.png',
            'images/bottle/rotation/2_bottle_rotation.png',
            'images/bottle/rotation/3_bottle_rotation.png',
            'images/bottle/rotation/4_bottle_rotation.png'
        ],
        splash: [
            'images/bottle/splash/1_bottle_splash.png',
            'images/bottle/splash/2_bottle_splash.png',
            'images/bottle/splash/3_bottle_splash.png',
            'images/bottle/splash/4_bottle_splash.png',
            'images/bottle/splash/5_bottle_splash.png',
            'images/bottle/splash/6_bottle_splash.png'
        ]
    }

    constructor(x, y) {
        super().loadImage('images/bottle/solo/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.throw();
    }
dd
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        },25)
        this.animate();
    }

    animate() {

        setInterval(() => {

            this.playAnimation(this.BOTTLE_IMAGES.rotation)

            
        }, 60);
        
    }
}