class Cloud extends MovableObject {

    x = Math.random() * 700;
    height = 350;
    width = 380;
    y = 20;
    speed=0.1;
    

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');        

        this.moveLeft();
    }
}