class StatusBar extends DrawableObject {
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];
    IMAGES_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];


    x = 5;

    percentageHealth = 100;
    percentageBottle = 0;
    percentageCoin = 0;
    percentageEndboss = 100;

    constructor(type) {
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
        this.loadImages(this.IMAGES_HEALTH);
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_COIN);
        this.loadImages(this.IMAGES_ENDBOSS);

        if (type == 'health') { this.setPercentageHealth(100) }
        if (type == 'bottle') { this.setPercentageBottle(this.percentageBottle) }
        if (type == 'coin') { this.setPercentageCoins(this.percentageCoin) }
        if (type == 'endboss') { this.setPercentageEndboss(this.percentageEndboss) }
        this.height = 50;
        this.width = 200;
    }

    setPercentageHealth(percent) {
        this.percentageHealth = percent;
        this.y = 0;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex(this.percentageHealth)];
        this.img.src = this.imageCache[path];
    }

    setPercentageBottle(percent) {
        this.percentageBottle = percent;
        this.y = 40;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex(this.percentageBottle)];
        this.img.src = this.imageCache[path];
    }

    setPercentageCoins(percent) {
        this.percentageCoin = percent;
        this.y = 80;
        let path = this.IMAGES_COIN[this.resolveImageIndex(this.percentageCoin)];
        this.img.src = this.imageCache[path];
    }

    setPercentageEndboss(percent) {
        this.percentageEndboss = percent;
        this.x = 510;
        this.y = 5;
        let path = this.IMAGES_ENDBOSS[this.resolveImageIndex(this.percentageEndboss)];
        this.img.src = this.imageCache[path];
    }

    resolveImageIndex(percentage) {
        if (percentage == 100) {
            return 5;
        } else if (percentage >= 80) {
            return 4;
        } else if (percentage >= 60) {
            return 3;
        } else if (percentage >= 40) {
            return 2;
        } else if (percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
};