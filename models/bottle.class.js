class Bottle extends DrawableObject {
    x = 200 + Math.random() * 1800;
    y = 345;
    height = 80;
    width = 80;
    IMAGES_BOTTLE_ON_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/salsa_bottle.png',
    ];
    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    constructor(position) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE_ON_GROUND);
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        if (position == "air") {
            this.y = 50 + Math.random() * 200;
            this.animate(this.IMAGES_BOTTLE_ROTATION);
        } else {
            this.animate(this.IMAGES_BOTTLE_ON_GROUND);
        }
    }

    animate(Image) {
        setInterval(() => {
            this.playAnimation(Image)
        }, 200);
    };

}