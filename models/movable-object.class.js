class MovableObject extends DrawableObject {
    speed = 1;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.8;
    energy = 100;
    lastHit = 0;

    isHurt() {
        let timepassed = (new Date().getTime() - this.lastHit) / 1000; //Difference in s
        // console.log(timepassed);

        return timepassed < 1.5;
    }

    isDead() {
        return this.energy == 0;
    };

    hit() {
        if (this.energy > 0) {
            this.energy -= 5;
            this.lastHit = new Date().getTime();
        }
    }

    // character.isColliding(chicken)
    isColliding(mO) {
        return this.x + this.width - 30 > mO.x + 10 &&
            this.y + this.height > mO.y &&
            this.x < mO.x &&
            this.y < mO.y + mO.height
    };

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    };

    isAboveGround() {
        return this.y < 135;
    };

    moveRight() {
        setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60);
    };

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    };

    playAnimation(images) {
        let i = this.currentImage % images.length; //modulo
        let path = images[i];
        this.img.src = this.imageCache[path];
        this.currentImage++;
    }


};