class Level {
    bottles;
    coins;
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    
    level_end_x = 719 * 3;

    constructor(bottles, coins, enemies, endboss, clouds, backgroundObjects) {
        this.bottles = bottles;
        this.coins = coins;
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        
    }
}