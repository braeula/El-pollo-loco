class World {
    character = new Character();
    level = level1;
    ctx;
    keyboard;
    camera_x = 0;
    background_sound_1 = new Audio('audio/background.mp3');
    background_sound_2 = new Audio('audio/background_1.mp3');
    winner_sound = new Audio('audio/win.mp3');
    gameOver_sound = new Audio('audio/dead.mp3');
    chicken_sound = new Audio('audio/chicken-sound.mp3')
    statusbar_health = new StatusBar('health');
    statusbar_bottle = new StatusBar('bottle');
    statusbar_coin = new StatusBar('coin');
    statusbar_endboss = new StatusBar('endboss');
    throwableObject = [];
    lastThrowTime = 0;
    gameOver = false;
    endscreen;
    soundPlayed = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        // this.playAudioLoop();
        this.run();
    };

    stopBackgroundSound() {
        this.background_sound_1.pause();
        this.background_sound_2.pause();
    }

    endGame() {
        if (this.character.isDead()) {
            if (!this.soundPlayed) {
                this.gameOver_sound.play();
                this.stopBackgroundSound();
                this.soundPlayed = true;
            }
            setTimeout(() => {
                this.gameOver = true;
                this.endscreen = new Image(720, 480)
                this.endscreen.src = 'img/9_intro_outro_screens/game_over/oh no you lost!.png';
            }, 2000)
            this.drawEndScreen();
        } else if (this.level.endboss[0].isDead()) {
            if (!this.soundPlayed) {
                this.winner_sound.play();
                this.stopBackgroundSound();
                this.soundPlayed = true;
            }
            setTimeout(() => {
                this.gameOver = true;
                this.endscreen = new Image(720, 480)
                this.endscreen.src = 'img/9_intro_outro_screens/win/won_2.png';
            }, 2000)
            this.drawEndScreen();
        }
    }

    drawEndScreen() {
        if (this.endscreen) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.clouds);
            this.ctx.drawImage(this.endscreen, 0, 0, this.endscreen.width, this.endscreen.height);
        }
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.endGame();
        }, 1000 / 60);
    };

    characterAttacksChicken() {
        return (this.character.isAboveGround() && this.character.speedY < 0);
    }

    checkThrowObjects() {
        const now = Date.now();
        const cooldown = 500; // in ms

        if (this.keyboard.SPACE &&
            this.statusbar_bottle.percentageBottle > 0 &&
            now - this.lastThrowTime > cooldown) {

            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 50);
            this.throwableObject.push(bottle);
            this.lastThrowTime = now;

            this.statusbar_bottle.percentageBottle -= 20;
            this.statusbar_bottle.setPercentageBottle(this.statusbar_bottle.percentageBottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.characterAttacksChicken() && !enemy.killed) {
                this.character.hit();
                this.character.isHurt();
                this.statusbar_health.setPercentageHealth(this.character.energy);
            }
        });

        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            if (!this.level.enemies[i].killed && this.character.isColliding(this.level.enemies[i]) && this.characterAttacksChicken()) {
                this.level.enemies[i].killed = true;
                this.character.speedY = 10;
                const enemy = this.level.enemies[i]; // im Loop speichern
                setTimeout(() => {
                    const index = this.level.enemies.indexOf(enemy); //ergibt -1, wenn das Obj nicht mehr existiert
                    if (index > -1) {
                        this.level.enemies.splice(index, 1);
                    }
                }, 2000);
            }
        }

        this.level.endboss.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.character.isHurt();
                this.statusbar_health.setPercentageHealth(this.character.energy);
            };
        });

        for (let i = this.throwableObject.length - 1; i >= 0; i--) {
            const bottle = this.throwableObject[i];
            let endboss = this.level.endboss[0];
            if (endboss.isColliding(bottle)) {
                endboss.hit();
                this.chicken_sound.play();
                this.statusbar_endboss.setPercentageEndboss(endboss.energy);
                this.throwableObject.splice(i, 1); // Flasche entfernen nach Treffer
            }
        }

        for (let i = this.level.bottles.length - 1; i >= 0; i--) {
            const bottle = this.level.bottles[i];
            if (this.character.isColliding(bottle) && this.statusbar_bottle.percentageBottle < 100) {
                this.level.bottles.splice(i, 1); // entfernt
                this.statusbar_bottle.percentageBottle += 20;
                this.statusbar_bottle.setPercentageBottle(this.statusbar_bottle.percentageBottle);
            }
        }
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            const coin = this.level.coins[i];
            if (this.character.isColliding(coin) && this.statusbar_coin.percentageCoin < 100) {
                this.level.coins.splice(i, 1); // entfernt
                this.statusbar_coin.percentageCoin += 20;
                this.statusbar_coin.setPercentageCoins(this.statusbar_coin.percentageCoin);
            }
        }
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
        this.throwableObject.world = this;
        this.throwableObject.endboss = this.level.endboss;
    };

    draw() {
        if (!this.gameOver) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.translate(this.camera_x, 0);

            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.bottles);
            this.addObjectsToMap(this.level.coins);

            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.endboss);
            this.addObjectsToMap(this.throwableObject);
            this.addToMap(this.character);


            this.ctx.translate(-this.camera_x, 0);
            // ------ Platz für fixierte Objekte ------
            this.addToMap(this.statusbar_health);
            this.addToMap(this.statusbar_bottle);
            this.addToMap(this.statusbar_coin);
            this.addToMap(this.statusbar_endboss);
            this.ctx.translate(this.camera_x, 0);

            this.ctx.translate(-this.camera_x, 0);

            // this.addToMap(this.endscreen)

            // draw() wird immer wieder aufgerufen
            let self = this;
            requestAnimationFrame(function () {
                self.draw();
            });
        }
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