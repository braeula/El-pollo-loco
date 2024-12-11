class World {
    character = new Character();
    level = level1;
    ctx;
    keyboard;
    camera_x = 0;
    background_sound_1 = new Audio('audio/background.mp3');
    background_sound_2 = new Audio('audio/background_1.mp3');
    statusbar_health = new StatusBar('health');
    statusbar_bottle = new StatusBar('bottle');
    statusbar_coin = new StatusBar('coin');
    statusbar_endboss = new StatusBar('endboss');
    throwableObject = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        // this.playAudioLoop();
        this.run();
    };

    run() {
        setInterval(() => {

            this.checkCollisions()
            this.checkThrowObjects()

        }, 200);
    };

    checkThrowObjects() {
        if (this.keyboard.SPACE) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObject.push(bottle)

        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbar_health.setPercentageHealth(this.character.energy);
            };
        });
    }

    playAudioLoop() {
        // Starte das erste Audio
        this.background_sound_1.play();

        // Wenn das erste Audio endet, starte das zweite
        this.background_sound_1.addEventListener('ended', () => {
            this.background_sound_2.play();
        });

        // Wenn das zweite Audio endet, starte wieder das erste
        this.background_sound_2.addEventListener('ended', () => {
            this.background_sound_1.play();
        });
    }

    setWorld() {
        this.character.world = this;
    };

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles)
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);


        this.ctx.translate(-this.camera_x, 0);
        // ------ space for fixed objects ------
        this.addToMap(this.statusbar_health);
        this.addToMap(this.statusbar_bottle);
        this.addToMap(this.statusbar_coin);
        this.addToMap(this.statusbar_endboss);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };

    addToMap(ob) {

        if (ob.otherDirection) {
            this.ctx.save();
            this.ctx.translate(ob.width, 0);
            this.ctx.scale(-1, 1);
            ob.x = ob.x * -1;
        };
        this.ctx.drawImage(ob.img, ob.x, ob.y, ob.width, ob.height);
        if (ob.otherDirection) {
            this.ctx.restore();
            ob.x = ob.x * -1;
        };
    };

    addObjectsToMap(objects) {
        objects.forEach(ob => {
            this.addToMap(ob);
        });
    };
};