class Bottle extends DrawableObject {
    x = 200 + Math.random() * 1800;
    height = 80;
    width = 80;
    y = 345;
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/salsa_bottle.png',
    ];


    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        // this.throw()

        // this.speed = 0.15 + Math.random() * 0.4;
        // this.animate();


    }

    // animate() {
    //     this.moveLeft();

    //     setInterval(() => {
    //         this.playAnimation(this.IMAGES)
    //     }, 200);
    // };

}