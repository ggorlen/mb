let canvas = document.getElementById("grid");
let ctx = canvas.getContext("2d")

//28 by 12 
let levelOne = 
    ["    xxxxxxxxxxxxxxxxxxxxxxx",
     "    x                     x",
     "    x                     x   ", 
     "    x                     x   ", 
     "xxxxx                     xxxxx", 
     "x####                     ~~~~x", 
     "x####                     ~~~~x", 
     "xxxxx                     xxxxx", 
     "    x                     x   ", 
     "    x                     x",
     "    x                     x",
     "    xxxxxxxxxxxxxxxxxxxxxxx"];

let playerspd = .2;
const gridSize = 20;
//kbd obj values
let kbd = {
  u: false,
  d: false,
  l: false,
  r: false
};

let enemies = {
  doesReset: true
};

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
      player.y -= playerspd;
    }

    else if(direction === "d") {
      player.y += playerspd;
    }

    else if(direction === "l") {
      player.x -= playerspd
    }

    else if(direction === "r") {
      player.x += playerspd
      
   
    }
  },
  
  //draw function
  draw: function() {
    ctx.fillStyle = "#8CE8FF";
    ctx.fillRect(this.x*gridSize, this.y*gridSize, this.size, this.size);
 }
};

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

  
  update();
}

//updates  animation 
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(kbd.u) {
    player.move("u", levelOne);
  } 
  if(kbd.d)  {
    player.move("d");
  } 
  if(kbd.l) {
    player.move("l");
  }
  if(kbd.r) {
    player.move("r");
  }  

  
for (let i = 0; i < levelOne.length; i++) {
  for (let j = 0; j < levelOne[i].length; j++) {
    let y = i * gridSize;
    let x = j * gridSize;
    
    if (levelOne[i][j] === "#") {
      ctx.fillStyle = "blue";
    }
    
    else if (levelOne[i][j] === "x") {
      ctx.fillStyle = "#de0dd5";      
    }
    
    else if (levelOne[i][j] === " ") {
      ctx.fillStyle = "transparent";
    }
    else if (levelOne[i][j] === "~") {
      ctx.fillStyle = "green";
    }
    ctx.fillRect(x,y,gridSize,gridSize);
  } 
}
  player.draw();
  requestAnimationFrame(update);
}

init();
