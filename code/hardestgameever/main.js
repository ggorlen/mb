/*
 * Hardest Game Ever example sketch for Kanin/Jamal/Nikolaj
 * Note: not the best possible version, just one approach.
 */

"use strict";


// create and initialize the canvas
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = 480;
canvas.height = 350;
const ctx = canvas.getContext("2d");

// declare game constants
const gridSize = 20;
const playerColor = "#e22";
const playerSize = gridSize / 1.25;
const playerSpeed = 0.1;
const obstacleColor = "#08e";
const obstacleSize = playerSize / 1.7;
const obstacleSpeed = playerSpeed;

// keyboard object to keep track of keypresses
const kbd = { u: false, d: false, l: false, r: false };

// variables to keep track of the current level and its obstacles
let currLvl = 0;
let obstacles = [];

// array of behaviors associated with obstacles for each level
const behavior = [

  // moves obstacles up and down for level 0
  function () { 
    this.y += this.dir * this.speed;

    if (this.y > 12.3 || this.y < 4) {
      this.dir *= -1;
    }
  }, 

  // moves obstacles in a circle for level 1
  function () { 
    this.x = this.centerX + 4 * Math.cos(this.angle * Math.PI / 180);
    this.y = this.centerY + 4 * Math.sin(this.angle * Math.PI / 180);
    this.angle += 2;
  }
]; // end behavior

// levels is an array, each index is a level.
// each level is an object containing a map 
// array and player and obstacle object properties
const levels = [
  { // level 0
    map: [
      "************************",
      "************************",
      "************************",
      "*****##############*****",
      "*****#            #*****",
      "######            ######",
      "#..                  xx#",
      "#..                  xx#",
      "#..                  xx#",
      "#..                  xx#",
      "#..                  xx#",
      "######            ######",
      "*****#            #*****",
      "*****##############*****",
      "************************",
      "************************",
      "************************"
    ],
    player: {
      x: 1,
      y: 8.3
    }, 
    obstacles: [
      {
        x: 7, 
        y: 4,
        move: behavior[0],
        dir: 1
      },
      {
        x: 8.5, 
        y: 6,
        move: behavior[0],
        dir: 1
      },
      {
        x: 10, 
        y: 8,
        move: behavior[0],
        dir: 1
      },
      {
        x: 11.5, 
        y: 10,
        move: behavior[0],
        dir: 1
      },
      {
        x: 13, 
        y: 4,
        move: behavior[0],
        dir: 1
      },
      {
        x: 14.5, 
        y: 6,
        move: behavior[0],
        dir: 1
      },
      {
        x: 16, 
        y: 8,
        move: behavior[0],
        dir: 1
      }
    ]
  },
  { // level 1
    map: [
      "************************",
      "************************",
      "######******************",
      "#....##############*****",
      "#....#            #*****",
      "#    #            #*****",
      "#                 #*****",
      "######            #*****",
      "*****#            #*****",
      "*****#            ######",
      "*****#                 #",
      "*****#                 #",
      "*****#                 #",
      "*****###############xxx#",
      "*******************#xxx#",
      "*******************#####",
      "************************"
    ],
    player: {
      x: 1,
      y: 3.3
    }, 
    obstacles: [
      {
        centerX: 12,
        centerY: 8,
        move: behavior[1],
        angle: 0
      },
      {
        centerX: 12,
        centerY: 8,
        move: behavior[1],
        angle: 60
      },
      {
        centerX: 12,
        centerY: 8,
        move: behavior[1],
        angle: 120
      },
      {
        centerX: 12,
        centerY: 8,
        move: behavior[1],
        angle: 180
      },
      {
        centerX: 12,
        centerY: 8,
        move: behavior[1],
        angle: 240
      },
      {
        centerX: 12,
        centerY: 8,
        move: behavior[1],
        angle: 300
      }
    ]
  } 

  // you get the idea...

]; // end levels


// draws a map on a canvas context
function drawLevel(ctx, map, gridSize) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === " ") {
        ctx.fillStyle = "#fff";
      }

      if (map[i][j] === " " && (i + j & 1)) {
        ctx.fillStyle = "#f5f5f5";
      }
      else if (map[i][j] === "#") {
        ctx.fillStyle = "#000";
      }
      else if ([".", "x"].indexOf(map[i][j]) >= 0) {
        ctx.fillStyle = "#aaa";
      }
      else {
        ctx.fillStyle = "transparent";
      }
  
      ctx.fillRect(j * gridSize, i * gridSize, gridSize, gridSize);
    }
  }
} // end drawLevel


// constructor for making obstacles
// props should contain x, y, color, gridSize, size, speed, move
const Obstacle = function (props) {
  for (const prop in props) {
    this[prop] = props[prop];
  }
}; // end Obstacle

// draws an obstacle
Obstacle.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(
    this.x * this.gridSize, 
    this.y * this.gridSize, 
    this.size, this.size
  );
}; // end draw


// represents a player
const player = {

  // sets up the player properties
  init: function (x, y, color, gridSize, size, speed) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.gridSize = gridSize;
    this.speed = speed;
  },

  // moves the player on a map
  move: function (dir, map) { 

    /* 
     * collision detection with walls:
     *
     * 1. determine which direction player is heading.
     * 2. add the player's speed to the direction to determine 
     *    where the player will be if the move is successful.
     * 3. index into the level array to check for a wall
     *    at the proposed new location.
     * 4. if there is a wall at the new location, don't move, 
     *    else if the path is clear, move.
     *
     * note: this is not the only way or best way to do
     * this, just the first way that came to mind 
     */
    const s = this.size / this.gridSize;

    if (dir === "u" && 
      map[this.y-this.speed|0][this.x|0] !== "#" &&
      map[this.y-this.speed|0][this.x+s|0] !== "#") {
      this.y -= this.speed;
      return true;
    }
    else if (dir === "d" && 
      map[this.y+this.speed+s|0][this.x|0] !== "#" &&
      map[this.y+this.speed+s|0][this.x+s|0] !== "#") {
      this.y += this.speed;
      return true;
    }
    else if (dir === "l" && 
      map[this.y|0][this.x-this.speed|0] !== "#" && 
      map[this.y+s|0][this.x-this.speed|0] !== "#") {
      this.x -= this.speed;
      return true;
    }
    else if (dir === "r" && 
      map[this.y|0][this.x+this.speed+s|0] !== "#" &&
      map[this.y+s|0][this.x+this.speed+s|0] !== "#") {
      this.x += this.speed;
      return true;
    }

    return false;
  },

  // renders the player on a canvas at current position
  draw: function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x * this.gridSize, 
      this.y * this.gridSize, 
      this.size, this.size
    );
  }
}; // end player


// updates the gamestate and draws a frame
function update() {

  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // move the player based on keypresses--
  // use "if" only to enable diagonal moves
  if (kbd.u) { player.move("u", levels[currLvl].map); }
  if (kbd.d) { player.move("d", levels[currLvl].map); }
  if (kbd.l) { player.move("l", levels[currLvl].map); }
  if (kbd.r) { player.move("r", levels[currLvl].map); }

  // check if the player exited the level
  const s = player.size / gridSize;

  if (levels[currLvl].map[player.y|0][player.x|0] === "x" ||
    levels[currLvl].map[player.y+s|0][player.x+s|0] === "x") {

    // increment to the next level and load it
    currLvl = ++currLvl % levels.length;
    loadLevel(levels[currLvl])
  }

  // move the obstacles
  obstacles.forEach(function (e) { e.move() });

  // check for collisions between player and obstacles
  for (let i = 0; i < obstacles.length; i++) {
    if (collides(player, obstacles[i], gridSize)) {
      loadLevel(levels[currLvl]);
    }
  }
  
  // render this frame
  drawLevel(ctx, levels[currLvl].map, gridSize);
  obstacles.forEach(function (e) { e.draw(ctx); });
  player.draw(ctx);

  // ask the browser to render the next frame
  requestAnimationFrame(update);
} // end update


// returns true if two squares are colliding, false otherwise
function collides(a, b, gridSize) {
  return a.x * gridSize < b.x * gridSize + b.size &&
         a.y * gridSize < b.y * gridSize + b.size &&
         b.x * gridSize < a.x * gridSize + a.size &&
         b.y * gridSize < a.y * gridSize + a.size;
}; // end collides


// initializes the game
function init() {

  // add keyboard event listeners
  document.addEventListener("keydown", function (e) {
    if      (e.keyCode === 37) { kbd.l = true; }
    else if (e.keyCode === 38) { kbd.u = true; }
    else if (e.keyCode === 39) { kbd.r = true; }
    else if (e.keyCode === 40) { kbd.d = true; }
  });
  
  document.addEventListener("keyup", function (e) {
    if      (e.keyCode === 37) { kbd.l = false; }
    else if (e.keyCode === 38) { kbd.u = false; }
    else if (e.keyCode === 39) { kbd.r = false; }
    else if (e.keyCode === 40) { kbd.d = false; }
  });

  // load first level
  loadLevel(levels[currLvl]);
  
  // start the animation
  update();
} // end init


// initializes a new level
function loadLevel(level) {

  // initialize the player object
  player.init(
    level.player.x,         // the player's start x position
    level.player.y,         // the player's start y position
    playerColor, gridSize,  // various player and game constants
    playerSize, playerSpeed
  );

  // populate obstacles array
  obstacles = level.obstacles.reduce(function (a, e) {
    e.color = obstacleColor; 
    e.size = obstacleSize;   
    e.gridSize = gridSize;
    e.speed = obstacleSpeed;
    a.push(new Obstacle(e));
    return a;
  }, []);
} // end loadLevel


// go!
init();
