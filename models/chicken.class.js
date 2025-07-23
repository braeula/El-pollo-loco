class Chicken extends MovableObject {
    x = 400 + Math.random() * 2000;
    height = 50;
    width = 50;
    y = 375;
    killed = false;
    
    CHICKEN_NORMAL_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    CHICKEN_NORMAL_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
    CHICKEN_SMALL_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    CHICKEN_SMALL_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    constructor(type) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.CHICKEN_NORMAL_WALKING);
        this.loadImages(this.CHICKEN_SMALL_WALKING);
        this.loadImages(this.CHICKEN_NORMAL_DEAD);
        this.loadImages(this.CHICKEN_SMALL_DEAD);
        this.speed = 0.15 + Math.random() * 0.4;
        this.animate(type);
    }

    animate(type) {
        this.moveLeft();

        setInterval(() => {
            if (this.killed) {
                this.speed = 0;
                if (type === 'normal') {
                    this.playAnimation(this.CHICKEN_NORMAL_DEAD);
                } else if (type === 'small') {
                    this.playAnimation(this.CHICKEN_SMALL_DEAD);
                }
            } else {
                if (type === 'normal') {
                    this.playAnimation(this.CHICKEN_NORMAL_WALKING);
                } else if (type === 'small') {
                    this.playAnimation(this.CHICKEN_SMALL_WALKING);
                }
            }
        }, 400);

        // if (type == 'normal') {
        //     setInterval(() => {
        //         this.playAnimation(this.CHICKEN_NORMAL_WALKING)
        //     }, 200);
        //     if (this.killed) {
        //         setInterval(() => {
        //             this.playAnimation(this.CHICKEN_NORMAL_DEAD)
        //         }, 200);
        //     }
        // }

        // if (type == 'small') {
        //     setInterval(() => {
        //         this.playAnimation(this.CHICKEN_SMALL_WALKING)
        //     }, 200);

        // }
        // if (type == 'small' && this.killed) {
        //     setInterval(() => {
        //         this.playAnimation(this.CHICKEN_SMALL_DEAD)
        //     }, 200);
        // }

    };
}