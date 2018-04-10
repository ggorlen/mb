"use strict";


/******* Global variables *******/

const height = 400;
const width = 400;
const worldHeight = 400;
const worldWidth = 800;
const platformHeight = 15;
const platformWidth = 50;
const platformLocations = [ // Alternately, use a 2d array of level data, .e.g:
  { x: 50, y: 200 },        // [["#############"],
  { x: 200, y: 300 },       //  ["#      ##   #"],
  { x: 130, y: 100 },       //  ["# ##        #"],
  { x: 290, y: 150 },       //  ["#      ##   #"],
  { x: 590, y: 200 },       //  ["# @       ###"],
  { x: 420, y: 350 },       //  ["#############"]]
  { x: 360, y: 300 },
  { x: 690, y: 250 },
  { x: 500, y: 180 },
];
const playerProps = {
  vx: 200, // "v" for velocity
  vy: 450,
  gravity: 800,
  height: 30,
  width: 30,
};
const imageFiles = [
  { name: "player", path: "assets/box.png" },
  { name: "floor", path: "assets/floor.png" },
  { name: "platform", path: "assets/platform.png" },
];

let kbd;
let player;
let platforms;

// Create the Phaser game
const game = new Phaser.Game(
  width, height, Phaser.AUTO, "example", 
  { preload: preload, create: create, update: update }
);

/********************************/

// Phaser function to load assets and set up the game
function preload() {
  imageFiles.forEach(e => game.load.image(e.name, e.path));
  kbd = game.input.keyboard.createCursorKeys();
}

/********************************/

// Phaser function to set up the initial gamestate
function create() { 

  // Gentlefolk, start your physics engines
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.world.setBounds(0, 0, worldWidth, worldHeight);

  // Make the platforms group array
  platforms = game.add.group();
  platforms.enableBody = true;
  const floor = platforms.create(
    0, game.world.height - 1, "floor"
  );
  floor.body.immovable = true;
  floor.scale.setTo(2, 0);

  // Make all the ledges and set them to be immovable
  platformLocations.forEach(e => 
    platforms.create(e.x, e.y, "platform").body.immovable = true
  );

  // Create the player object
  player = game.add.sprite(
    30, height - playerProps.height, "player"
  );
  player.anchor.set(0.5);

  // Initialize the player's physics properties
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.gravity.y = playerProps.gravity;
  player.body.collideWorldBounds = true;

  // Have the camera follow the player
  game.camera.follow(player);
}

/********************************/

// Phaser function to update and render the game each frame
function update() {

  // Collide the player and platforms
  game.physics.arcade.collide(player, platforms);

  // Handle player jumps
  if (kbd.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -playerProps.vy;
    player.angle = 270;
  }

  // Handle player horizontal movement
  if (kbd.left.isDown) {
    player.body.velocity.x = -playerProps.vx;
    player.angle = 180;
  }
  else if (kbd.right.isDown) {
    player.body.velocity.x = playerProps.vx;
    player.angle = 0;
  }
  else {
    player.body.velocity.x = 0;
  }
}
