"use strict";


/******* Global variables *******/

const height = 400;
const width = 400;
const playerXVelocity = 200;
const playerYVelocity = 450;
const playerGravity = 800;
const platformHeight = 15;
const platformWidth = 50;
const platformLocations = [
  { x: 200, y: 300},
  { x: 50,  y: 200},
  { x: 130, y: 100},
  { x: 290, y: 150},
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
  game.load.image("player", "assets/box.png");
  game.load.image("platform", "assets/platform.png");
  game.load.image("floor", "assets/floor.png");
  kbd = game.input.keyboard.createCursorKeys();
}

/********************************/

// Phaser function to set up the initial gamestate
function create() { 

  // Gentlefolk, start your physics engines
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Make the platforms group array
  platforms = game.add.group();
  platforms.enableBody = true;
  platforms.create(0, game.world.height - platformHeight, "floor").body.immovable = true;

  // Make all the ledges and set them to be immovable
  platformLocations.forEach(e => 
    platforms.create(e.x, e.y, "platform").body.immovable = true
  );

  // Create the player object
  player = game.add.sprite(width / 2, height / 2, "player");
  player.anchor.set(0.5);

  // Initialize the player's physics properties
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.gravity.y = playerGravity;
  player.body.collideWorldBounds = true;
}

/********************************/

// Phaser function to update and render the game each frame
function update() {
  var hitPlatform = game.physics.arcade.collide(player, platforms);

  // Handle player horizontal movement
  if (kbd.left.isDown) {
    player.body.velocity.x = -playerXVelocity;
    player.angle = 180;
  }
  else if (kbd.right.isDown) {
    player.body.velocity.x = playerXVelocity;
    player.angle = 0;
  }
  else {
    player.body.velocity.x = 0;
  }

  // Handle player jumps
  if (kbd.up.isDown && player.body.touching.down && hitPlatform) {
    player.body.velocity.y = -playerYVelocity;
    player.angle = 270;
  }
}
