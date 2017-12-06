let canvas = document.getElementById("grid");
let ctx = canvas.getContext("2d")

//28 by 12 
let levelOne = 
    ["@@@@xxxxxxxxxxxxxxxxxxxxxxx",
     "@@@@x                     x",
     "@@@@x                     x", 
     "@@@@x                     x", 
     "xxxxx                     xxxxx", 
     "x####                     ~~~~x", 
     "x####                     ~~~~x", 
     "xxxxx                     xxxxx", 
     "@@@@x                     x", 
     "@@@@x                     x",
     "@@@@x                     x",
     "@@@@xxxxxxxxxxxxxxxxxxxxxxx"];


let playerspd = .1;
const gridSize = 20;
const enemySize = 15;

//kbd obj values
let kbd = {
  u: false,
  d: false,
  l: false,
  r: false
};

let enemyData = [
  {
    x: 5.1,
    y: 1
  },
  {
    x: 7.5, 
    y: 4.5
  },
  {
    x: 10,
    y: 9
  },
  {
    x: 12.5,
    y: 4.5
  },
  {
    x: 15,
    y: 1
  },
  {
    x: 17.5,
    y: 4.5
  },
  {
    x: 20,
    y: 9
  },
  {
    x: 22.5,
    y: 4.5
  },
  {
    x: 25,
    y: 1
  }
];

const enemies = [];

let theEnd = false;

//player obj
let player = {
 isAlive: true,
 x: 2,
 y: 5.5,
 size: 20,
  move: function(direction, map) {
    const s = this.size / gridSize;
    if(direction === "u" 
       && map[this.y-playerspd|0][this.x|0] !== "x" 
       && map[this.y-playerspd|0][this.x+s|0] !== "x") {
       this.y -= playerspd;
    }
    else if(direction === "d"
       && map[this.y+playerspd+s|0][this.x|0] !== "x" 
       && map[this.y+playerspd+s|0][this.x+s|0] !== "x") {    
       this.y += playerspd;
    }
    else if(direction === "l"
      && map[this.y|0][this.x-playerspd|0] !== "x" 
      && map[this.y+s|0][this.x-playerspd|0] !== "x") {
      this.x -= playerspd
    }

    else if(direction === "r"
      && map[this.y|0][this.x+playerspd+s|0] !== "x" 
      && map[this.y+s|0][this.x+playerspd+s|0] !== "x") {     
      this.x += playerspd
    }
  },
  
  //draw function
  draw: function() {
    ctx.fillStyle = "#ff0000";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.fillRect(this.x*gridSize, this.y*gridSize, this.size, this.size);
    ctx.strokeRect(this.x*gridSize, this.y*gridSize, this.size, this.size);
 }
};


const Enemy = function (x, y, color, size, speed) {
  this.x = x; 
  this.y = y;
  this.dir = 1;
  this.color = color;
  this.size = size;
  this.speed = speed;;
};

Enemy.prototype.draw = function (ctx) {
  ctx.fillRect(this.x, this.y, this.size, this.size);
};

  
  
Enemy.prototype.move = function () { 
  this.y += this.dir * this.speed;

  if (this.y > 10 || this.y < 1) {
    this.dir *= -1;
  }
};

function finishLevel(map){
  if (map[player.y|0][player.x|0] == "~") {
    theEnd = true;
    ctx.font = "50px Georgia";
    ctx.fillStyle = "black";
    ctx.fillText("You win!", 220, 110);
    setTimeout(function () { location.reload(); }, 5000);
  }
};

  //draw enemies function
function drawEnemies() {
    for(let i = 0; i < enemies.length; i++){ 
      ctx.fillStyle = "#0000ff";
      ctx.strokeStyle = "000000"
      ctx.lineWidth = 3;
        ctx.fillRect(enemies[i].x*gridSize, enemies[i].y*gridSize, enemySize, enemySize);
      ctx.strokeRect(enemies[i].x*gridSize, enemies[i].y*gridSize, enemySize, enemySize);
    }
 }

//initializes default values for keypresses
function init() {
  document.addEventListener('keydown', function(e) {
  //left move    
    if(e.keyCode === 37) {
          kbd.l = true;
          e.preventDefault();
      }

    //right move
      else if(e.keyCode === 39) {       
        kbd.r = true;
        e.preventDefault();
      }

    //up move
      else if(e.keyCode === 38) {
        kbd.u = true;
        e.preventDefault();
      }

    //down move
    else if(e.keyCode === 40) {
      kbd.d = true;
      e.preventDefault();
    }
  });

  document.addEventListener('keyup', function(e) {
//left move    
  if(e.keyCode === 37) {
        kbd.l = false;
        e.preventDefault();
    }
  
  //right move
    else if(e.keyCode === 39) {       
      kbd.r = false;
      e.preventDefault();
    }
  
  //up move
    else if(e.keyCode === 38) {
      kbd.u = false;
      e.preventDefault();
    }

    //down move
    else if(e.keyCode === 40) {
      kbd.d = false;
      e.preventDefault();
    }
  });

  
  for (i = 0; i < enemyData.length; i++) {
    enemies.push(new Enemy(enemyData[i].x, enemyData[i].y, "blue", 15,.13));
  }
 
  update();
}

function collides(a, b, gridSize) {
  return a.x * gridSize < b.x * gridSize + enemySize &&
         a.y * gridSize < b.y * gridSize + enemySize &&
         b.x * gridSize < a.x * gridSize + a.size &&
         b.y * gridSize < a.y * gridSize + a.size;
}
  
//updates  animation 
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(kbd.u) {
    player.move("u", levelOne);
  } 
  if(kbd.d)  {
    player.move("d", levelOne);
  } 
  if(kbd.l) {
    player.move("l", levelOne);
  }
  if(kbd.r) {
    player.move("r", levelOne);
  }  

  
for (let i = 0; i < levelOne.length; i++) {
  for (let j = 0; j < levelOne[i].length; j++) {
    let y = i * gridSize;
    let x = j * gridSize;
    
    if (levelOne[i][j] === "#") {
      ctx.fillStyle = "#99ff99";
    }
    
    else if (levelOne[i][j] === "x") {
      ctx.fillStyle = "#000000";
    }
    
    else if (levelOne[i][j] === " " && ((i + j) & 1)) {
      ctx.fillStyle = "#99ccff";
    }
    else if (levelOne[i][j] === " ") {
      ctx.fillStyle = "white";
    }
    else if (levelOne[i][j] === "~") {
      ctx.fillStyle = "#99ff99";
    }
        else {
      ctx.fillStyle = "transparent";
    }

    ctx.fillRect(x,y,gridSize,gridSize);
  } 
}
  player.draw();
  drawEnemies();
  finishLevel(levelOne);
  
  // check for collisions between player and enemies
  for (let i = 0; i < enemies.length; i++) {
    if (!theEnd) {
      enemies[i].move()
    }
    if (collides(player, enemies[i], gridSize)) {
       player.x = 2;
       player.y = 5.5;
    }
  }
  requestAnimationFrame(update);
}

init();
