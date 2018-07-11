var allEnemies = [];
var player;
var score = 0;

/*
* Instructions message for the game
*/
window.onload = function() {
    window.location.href = "#popUp";
}

// Helper class
var Helper = function(){}

// Random Value
Helper.returnRandomValue = function(possibleValues){
    var randomStartingPosition = Math.floor(Math.random() * possibleValues.length);
    return possibleValues[randomStartingPosition];
}

// Checking two elements which overlap or touch
Helper.overlap = function(fig1, player){
    return !(
        player.x + fig1.xoffset > (fig1.x + fig1.width)
        (player.x + player.width - fig1.xoffset) < fig1.x
        player.y + (player.height - fig1.yoffset) < (fig1.y)
        player.y > (fig1.y + (fig1.height - fig1.yoffset))
    )
}

// Checking if two elements are in the same block
Helper.sameBlock = function(fig1, player){
    var fig1Row = Helper.getRow(fig1);
    var fig1Col = Helper.getCol(fig1);
    var playerRow = Helper.getRow(player);
    var playerCol = Helper.getCol(player);
    if (fig1Row == playerRow && fig1Col == playerCol){
        return true;
    }
}

// Calculates Row Number
Helper.getRow = function(element){
    var row;
    if ((element.y + element.height/2) <= 85){
        row = 0;
    }
    if((element.y + element.height/2) > 85 && (element.y + element.height/2) <= 170){
        row = 1;
    }
    if((element.y + element.height/2) > 170 && (element.y + element.height/2) <= 255){
        row = 2;
    }
    if((element.y + element.height/2) > 255 && (element.y + element.height/2) <= 340){
        row = 3;
    }
    if((element.y + element.height/2) > 340 && (element.y + element.height/2) <= 425){
        row = 4;
    }
    if((element.y + element.height/2) > 425){
        row = 5;
    }
    return row;
}

// Calculates Column Number
Helper.getCol = function(element){
    var col;
    if(element.x < 100){
        col = 0;
    }
    if(element.x >= 100 && element.x < 200){
        col = 1;
    }
    if(element.x >= 200 && element.x < 300){
        col = 2;
    }
    if(element.x >= 300 && element.x < 400){
        col = 3;
    }
    if(element.x >= 400){
        col = 4;
    }
    return col;
}

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    if(score >= 100){
        this.y = Helper.returnRandomValue([60, 145, 230, 315]);
    } else {
        this.y = Helper.returnRandomValue([60, 145, 230]);
    }
    this.width = 171;
    this.height = 101;
    if(score >= 200){
        this.speed = Helper.returnRandomValue([250, 300, 350, 400, 500]);
    } else {
        this.speed = Helper.returnRandomValue([200, 250, 280, 300, 320, 350, 400]);
    }
    this.yoffset = 50;
    this.xoffset = 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (this.speed) * dt;

    // check for coliision
    allEnemies.forEach(function(enemy,index) {
        if(Helper.overlap(enemy, player)){
            player.y = 380;
        }
    })
};

// Generating Enemies
Enemy.generateEnemies = function(){
    allEnemies.push(new Enemy());
    Enemy.removeOffScreenEnemies();
    var delay;
    if(score >= 200){
        delay = Helper.returnRandomValue([0, 200, 500, 750]);
    } else {
        delay = Helper.returnRandomValue([0, 500, 750, 1000]);
    }
    setTimeout(Enemy.generateEnemies, delay);
}

Enemy.removeOffScreenEnemies = function(){
    allEnemies.forEach(function(enemy, index){
        if(enemy.x > 505){
            allEnemies.splice(index, 1);
        }
    });
}

// Player Object
var Player = function(){
    this.playerIcon = 'images/char-boy.png';
    this.x = Helper.returnRandomValue([0, 100, 200, 300, 400]);
    this.y = 380;
    this.width = 171;
    this.height = 101;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.playerIcon), this.x, this.y);
}

// Moving player
Player.prototype.handleInput = function(keyCode){
    if(keyCode === 'left'){
        if(this.x - 101 < 0){
            this.x = 0;
        } else {
            this.x -= 100;
        }
    } else if(keyCode == 'up'){
        if(this.y - 85 < 0){
            this.y = 380;
        } else {
            this.y -= 85;
        }
    } else if(keyCode == 'right'){
        if(this.x + 101 > 400){
            this.x = 400;
        } else {
            this.x += 100;
        }
    } else if(keyCode == 'down') {
        if(this.y + 85 > 380){
            this.y = 380;
        } else {
            this.y += 85;
        }
    }
}

// Initiate Game
Enemy.generateEnemies();
player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
