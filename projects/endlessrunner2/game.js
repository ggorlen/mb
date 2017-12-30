"use strict";

const playerImg = new Image();

playerImg.src = "pac.png";


let canvas = document.getElementById("paper");
let ctx = canvas.getContext("2d");

let box;
let obstacles;
let scoreContainer = document.getElementById("score-container");
let score;
const GRAVITY = 0.3;
const kbd = {
  u: false, 
  l: false,
  r: false
};


let Box = function (x, y, size, color) {
  this.x = x;
  this.y = y;
  this.vy = 8;
  this.vx = 12; 
  this.size = size;
  this.color = color;
  this.landed = true;
};

Box.prototype.jump = function () {
  if (this.landed) {
    this.landed = false;
    this.vy = -13;
  }
};

Box.prototype.right = function(){
   this.vx++;
};
Box.prototype.left = function(){
  this.vx--;
};

Box.prototype.move = function () {
  this.vy += GRAVITY;
  this.y += this.vy;
  this.vx *=0.9
   this.x += this.vx;
   
  if (this.x + this.size > canvas.width) {
    this.x = canvas.width - this.size;  
  }
   else if (this.x < 0) {
     this.x = 0;
    };
    
  
  
  if (this.y + this.size > canvas.height) {
    this.landed = true;
    this.y = canvas.height - this.size;
  }
};

let Obstacle = function (x, y, vx, size, color) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.size = size;
  this.color = color;
  
  
};

Obstacle.prototype.move = function () {
  this.x += this.vx;
};

function makeObstacle() {
  let size = randInt(20, 80);
  let x = randInt(canvas.width, canvas.width + 100);
  let y = canvas.height - size;
  let color = ["red", "pink", "blue", "orange"][Math.random() * 4 | 0];
  let vx = randInt(-4, -2);
  obstacles.push(new Obstacle(x, y, vx, size, color));
}

function randInt(lo, hi) {
  return Math.random() * (hi - lo) + lo | 0;
}

function update() {
  
  if (kbd.u) {
      box.jump('u');
  }
  if (kbd.r) {
      box.right('r');
  }
  if (kbd.l) {
      box.left('l');
  }
  
  // Generate a new obstacle every so often
  if (Math.random() > 0.987) {
    makeObstacle();
  }
  
  // Update the position of the box
  box.move();
    
  // Clear the screen for this frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw the box
  ctx.fillStyle = box.color;
 // ctx.fillRect(box.x, box.y, box.size, box.size);
  
  ctx.drawImage(playerImg, box.x, box.y);
  
  // Update and draw the obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let o = obstacles[i];
    
    // Update this obstacle's position
    o.move();
          
    // Draw the obstacle
    ctx.fillStyle = o.color;
    ctx.fillRect(o.x, o.y, o.size, o.size);
   
    // Remove this obstacle from the obstacles array if off screen 
    if (o.x + o.size < 0) {
      obstacles.splice(i, 1);
    console.log(score);
    
    score++;
        scoreContainer.innerHTML = "score: " + score}
    // Check for a collision between the player and this obstacle.
    // Reinitialize the game if there was a collision.
    else if (collides(box, o)) {
      init();
      break;
    }
  }
  
  
  // Tell the browser to render the next frame
  requestAnimationFrame(update);
}

// Returns true if a and b rectangles 
// are colliding, false otherwise




function collides(a, b) {
  return a.x <= b.x + b.size &&
         b.x <= a.x + a.size &&
         a.y <= b.y + b.size &&
         b.y <= a.y + b.size;
}

// Initializes the game
function init() {
  score = 0;
  scoreContainer.innerHTML = "score: " + score;
  
  // Make a new box
  box = new Box(0, 180, 50, "red");
  
  // Make an array of obstacles and add the first obstacle
  obstacles = [];
  makeObstacle();
  
  // get key to press
  document.addEventListener("keydown", function (e) {
      e.preventDefault();
    if (e.keyCode === 38) {
      kbd.u = true;
      
    }
    else if (e.keyCode === 39) {
      kbd.r = true;
      
   }
   else if(e.keyCode === 37){
      kbd.l = true;
      
    }
     //
  });
  
    document.addEventListener("keyup", function (e) {
      e.preventDefault();
    if (e.keyCode === 38) {
      kbd.u = false;
      
    }
    else if (e.keyCode === 39) {
      kbd.r = false;
      
   }
   else if(e.keyCode === 37){
      kbd.l = false;
      
    }
     //
} 
  );

}



init();
update();

canvas.style.backgroundImage = "url('f2KTKjr.png')";
ctx.fillStyle = "#ffhjkl";
ctx.fillRect(0, 469, 30, 30);
