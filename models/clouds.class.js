/**
 * Visual cloud element used for background parallax. Moves slowly
 * leftward to create depth in the scene.
 */
class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    // Converted from the old tick-based range (60 ticks/sec) to pixels/second:
    // 0.2 * 60 = 12, 0.4 * 60 = 24
    speed = 12;

    constructor() {
        super().loadImage('images/background/4_clouds/1.png');
        this.x = Math.random() * 6000;
        this.speed = 12 + Math.random() * 24;
    }

    /**
     * Called every frame by World.updateMovableObjects(). Moves the cloud left to create
     * a slow parallax background effect.
     *
     * @param {number} deltaTime - Time elapsed since the last frame, in seconds.
     */
    update(deltaTime) {
        super.update(deltaTime);
        this.x -= this.speed * deltaTime;
    }
}