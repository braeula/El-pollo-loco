class Level {
    bottles;
    enemies;
    clouds;
    backgroundObjects;
    
    level_end_x = 719 * 3;

    constructor(bottles, enemies, clouds, backgroundObjects) {
        this.bottles = bottles;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        
    }
}