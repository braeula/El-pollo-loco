class Endboss extends MovableObject {

    width = 350;
    height = 400;
    y = 55;
    energy = 100;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
        // 'img/4_enemie_boss_chicken/2_alert/G9.png',
        // 'img/4_enemie_boss_chicken/2_alert/G10.png',
        // 'img/4_enemie_boss_chicken/2_alert/G11.png',
        // 'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.speed = 0.3;
        this.x = 719 * 3;
        this.animate();


    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 400);
    };


}