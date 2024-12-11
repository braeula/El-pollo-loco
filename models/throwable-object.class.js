class ThrowableObject extends MovableObject {
    speedX = 20;

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/salsa_bottle.png',
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        // this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;        
        this.throw()
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            this.x += this.speedX;
        }, 50);
    }

};