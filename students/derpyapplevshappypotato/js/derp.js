// Object creation

// Function for creating a new player
var Player = function (x, y, image, color, size, dir) {
    this.body = [{"x": x, "y": y}];
    this.image = image;
    this.color = color;
    this.size = size;
    this.dir = dir;
};

// Draw players
Player.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    for (let i = 0; i < this.body.length; i++) {
        //ctx.fillRect(this.body[i].x, this.body[i].y, this.size, this.size);  
        ctx.drawImage(this.image, this.body[i].x, this.body[i].y);     
    }
};



Player.prototype.move = function () {
    this.body.unshift({x: this.body[0].x, y: this.body[0].y});
    
    if (this.dir == "u") {
      this.body[0].y-=this.size;
    }
    else if (this.dir == "d") {
      this.body[0].y+=this.size;
    }
    else if (this.dir == "l") {
     this.body[0].x-=this.size;
    }
    else if (this.dir == "r") {
     this.body[0].x+=this.size;
    }
};

Player.prototype.changeDir = function (dir) {
    if (dir === "u" && this.dir !== "d" ||
        dir === "d" && this.dir !== "u" ||
        dir === "l" && this.dir !== "r" ||
        dir === "r" && this.dir !== "l") {
        this.dir = dir;
    }
};

Player.prototype.isAlive = function (canvas, snake) {
  //  console.log(this.collidesWith(snake));
  return this.isInBounds(canvas) && 
        !this.collidesWith(snake) && 
        !this.collidesWithSelf(); 
};

Player.prototype.isInBounds = function (canvas) {
    return this.body[0].x > 0 && this.body[0].y > 0 && this.body[0].x < canvas.width && this.body[0].y < canvas.height
};

Player.prototype.collidesWith = function (snake) {
    for (let i = 0; i < snake.body.length; i++){

        if (snake.body[i].x === this.body[0].x && 
            snake.body[i].y === this.body[0].y) {
            return true;
        }
    }   
    return false;
};

Player.prototype.collidesWithSelf = function () {
    for (let i = 1; i < this.body.length; i++){
        if (this.body[i].x === this.body[0].x && 
            this.body[i].y === this.body[0].y) {
            return true;
        }
    }   
    return false;
};
