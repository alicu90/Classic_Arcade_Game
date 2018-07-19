/*
* Instructions message for the game
*/
window.onload = function() {
    window.location.href = "#popUp";
};

// Random Numbers
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

// Enemies
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = getRandomInt(1, 5);
    this.width = 50;
    this.height = 85;
    this.image = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    if(this.x > 600) {
        this.x = -100;
    } else {
        this.x += 100 * this.speed * dt;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
};

// Player
var Player = function(x, y) {
    this.image = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 85;
};

Player.prototype.update = function(dt) {
    return this.y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    switch(keyCode) {
        case "up":
            if(this.y > -35) {
                this.y -= 85;
            }
        break;
        case "down":
            if(this.y < 390) {
                this.y += 85;
            }
        break;
        case "right":
            if(this.x < 400 ) {
                this.x += 100;
            }
        break;
        case "left":
            if(this.x > 0) {
                this.x -= 100;
            }
        break;
    }
};


// Instantiate objects
var enemy_lineOne_1   = new Enemy(0, 50);
var enemy_lineOne_2   = new Enemy(-100, 50);
var enemy_lineTwo_1   = new Enemy(-150, 135);
var enemy_lineThree_1 = new Enemy(-300, 220);
var enemy_lineThree_2 = new Enemy(-400, 220);
const allEnemies = [enemy_lineOne_1, enemy_lineOne_2, enemy_lineTwo_1, enemy_lineThree_1, enemy_lineThree_2];
const player = new Player(200, 390);


// Keys to play the game
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
