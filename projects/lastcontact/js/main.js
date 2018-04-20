"use strict";
      

function globalPreload() {

  // load game assets
  game.load.image('player', 'assets/player.png');
  game.load.image('enemy', 'assets/enemy.png');
  game.load.tilemap('level' + levelNum, './levels/level' + levelNum + '.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('gameTiles', 'assets/spritesheet2.png');
}

function globalCreate() {
  game.stage.backgroundColor = '#fff';
    
  // add player sprite to game
  player = game.add.sprite(32, 32, 'player');


  enemies = game.add.group();
  enemies.enableBody = true;


  // make all the ledges and set them to be immovable
  enemyLocations.forEach(e => 
    enemies.create(e.x * gridSize, e.y * gridSize, 'enemy')
  );
    
  // size of player sprite 
  player.scale.setTo(0.08, 0.08);
  game.physics.enable(player, Phaser.Physics.ARCADE);
    
  // add tilemap to game 
  map = game.add.tilemap('level' + levelNum);
    
  // the first parameter is the tileset name as specified in 
  // Tiled, the second is the key to the asset
  map.addTilesetImage('tileset1', 'gameTiles');
    
  // create layer
  // game.backgroundlayer = this.map.createLayer('backgroundLayer');
  game.blockedLayer = map.createLayer('blockedLayer');

  // collision on blockedLayer
  map.setCollisionBetween(0, 2000, true, game.blockedLayer);

  game.world.setBounds(0, 0, 2000, 2000);

  // have the camera follow the player
  game.camera.follow(player);
}

function globalUpdate() {
    game.physics.arcade.collide(game.blockedLayer, player);

     // collide the player and enemy
    if (game.physics.arcade.collide(enemies, player)) {
      game.state.start('level1');
      // TODO "you died" 
    }

    // move enemies
    game.physics.arcade.collide(game.blockedLayer, enemies);
    enemies.forEach(e => {
      if (Math.random() > 0.99) {
        if (Math.random() > 0.5){
          e.body.velocity.x = enemyVelocity;
        } else {
          e.body.velocity.x = -enemyVelocity;
        }
      }

      if (Math.random() > 0.99) {
        if (Math.random() > 0.5){
          e.body.velocity.y = enemyVelocity;
        } else {
          e.body.velocity.y = -enemyVelocity;
        }
      }

    });


    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    // movement with velocity when keys are pressed
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || 
        game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      player.body.velocity.x = -playerVelocity;
    }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || 
        game.input.keyboard.isDown(Phaser.Keyboard.D)) {
      player.body.velocity.x = playerVelocity;
    }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) || 
        game.input.keyboard.isDown(Phaser.Keyboard.W)) {
      player.body.velocity.y = -playerVelocity;
    }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || 
        game.input.keyboard.isDown(Phaser.Keyboard.S)) {
      player.body.velocity.y = playerVelocity;
    }
  }


// create the Phaser game object
const game = new Phaser.Game(500, 500, Phaser.AUTO, 'our-game');

// global constants
const gridSize = 32;
const numLevels = 5;
const playerVelocity = 125;
const enemyVelocity = playerVelocity / 2 | 0;
const enemyLocations = [
  {x: 5, y: 10},
  {x: 3, y: 2},
  {x: 12, y: 6},
  {x: 15, y: 10},
  {x: 18, y: 7},
  {x: 7, y: 13}

];

// global variables
let levelNum = 1;
let player; 
let enemies;
let map;

// add states to the game
game.state.add("level1", level1);
game.state.add("level2", level2);

// start the menu state
game.state.start("level1");