let canvas;
let world;
let keyboard = new Keyboard();

let img = new Image();
img.src = 'img/9_intro_outro_screens/start/startscreen_1.png';
// Warten, bis das Bild vollständig geladen ist
img.onload = function () {
    // Zeichne das Bild auf das Canvas, sobald es geladen ist
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, ((img.width / img.height * 480)-720)/-2 +10, 0, img.width / img.height * 450 , 480);
};

// let endscreen = new Image()
// endscreen.src = 'img/9_intro_outro_screens/win/won_2.png';

// if (world.character.isDead()) {
//     // world.gameOver = true;
//     // world.endscreen.src = 'img/9_intro_outro_screens/game_over/oh no you lost!.png';

// } 


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    // if (world.level.endboss[0].energy == 0) {
    //     // world.gameOver = true;

    //     // world.endscreen.src = 'img/9_intro_outro_screens/game_over/oh no you lost!.png';
    //     endscreen.onload = function () {
    //         // Zeichne das Bild auf das Canvas, sobald es geladen ist
    //         let canvas = document.getElementById('canvas');
    //         let ctx = canvas.getContext('2d');
    //         ctx.drawImage(endscreen, 0, 0, 720, 480);
    //     }
    // }
}

window.addEventListener("keydown", (e) => {
    // console.log(e.keyCode);
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    // if (e.keyCode == 40) {
    //     keyboard.DOWN = true;
    // }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    // if (e.keyCode == 68) {
    //     keyboard.D = true;
    // }

})

window.addEventListener("keyup", (e) => {

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    // if (e.keyCode == 40) {
    //     keyboard.DOWN = false;
    // }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    // if (e.keyCode == 68) {
    //     keyboard.D = false;
    // }

})