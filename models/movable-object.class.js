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
        if (this.energy > 0 && !this.isHurt()) {
            this.energy -= 20;
            this.lastHit = new Date().getTime();
        }
    }

    isColliding(mO) {
        return this.x + this.width - 30 > mO.x + 10 &&
            this.x + 30 < mO.x + mO.width - 10 &&
            this.y + this.height > mO.y &&
            this.y + 120 < mO.y + mO.height;

        // return this.x < mO.x + mO.width &&
        //     this.x + this.width > mO.x &&
        //     this.y < mO.y + mO.height &&
        //     this.y + this.height > mO.y;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    };

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable Object should always fall
            return true;
        } else {
            return this.y < 135;
        };
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

    moveDown() {
        setInterval(() => {
            this.y += this.speedY;
        }, 1000 / 60);
    };
};