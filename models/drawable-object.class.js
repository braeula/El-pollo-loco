class DrawableObject {
    height = 300;
    width = 150;
    x = 20;
    y = 135
    img;
    imageCache = {};
    currentImage = 0;
    


    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); //this.img = document.getElementById('image') <img id="image" src="">
        this.img.src = path;
    };

    // draw(ctx) {
    //     ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    // }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = path;
        });
    };
};
