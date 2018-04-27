/**
 * File: gameState.js
 *
 * This is all level states
 */
"use strict";


const gameState = {
  preload: function () {
    // load game assets
    game.load.image('player', 'assets/player2.png');
    game.load.image('enemy', 'assets/enemy.png');
    game.load.image('exitdoor', 'assets/exitdoor.png');
    game.load.tilemap('level' + (levelNum + 1), './levels/level' + (levelNum + 1) + '.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('gameTiles', 'assets/spritesheet2.png');
  },

  create: function () {
    document.getElementById('levelName').innerHTML = 'Level ' + (levelNum + 1);
    game.stage.backgroundColor = '#fff';

    // add player sprite to game
    player = game.add.sprite(32, 32, 'player');

    exitdoor = game.add.sprite(exitdoorLocations[levelNum].x * gridSize, exitdoorLocations[levelNum].y * gridSize, 'exitdoor');

    enemies = game.add.group();
    enemies.enableBody = true;

    // make all the ledges and set them to be immovable
    enemyLocations[levelNum].forEach(e =>
      enemies.create(e.x * gridSize, e.y * gridSize, 'enemy')
    );

    // size of player sprite
    player.scale.setTo(0.7, 0.7);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.enable(exitdoor, Phaser.Physics.ARCADE);
    exitdoor.body.immovable = true;

    // add tilemap to game
    map = game.add.tilemap('level' + (levelNum + 1));

    // the first parameter is the tileset name as specified in
    // Tiled, the second is the key to the asset
    map.addTilesetImage('tileset1', 'gameTiles');

    // create layer
    game.blockedLayer = map.createLayer('blockedLayer');

    // collision on blockedLayer
    map.setCollisionBetween(0, 2000, true, game.blockedLayer);

    game.world.setBounds(0, 0, 2000, 2000);

    // have the camera follow the player
    game.camera.follow(player);
  },

  update: function() {
    
    game.physics.arcade.collide(game.blockedLayer, player);
    
    game.physics.arcade.collide(exitdoor, enemies)
          
     // collide the player and enemy
    if (game.physics.arcade.collide(enemies, player)) {
      game.state.start('gameState');
    }

    if (game.physics.arcade.collide(exitdoor, player)) {

      // move to the next level
      levelNum++;


      if (levelNum >= lastLevel) {
          document.getElementById('winmessage').style.opacity = 1;
          setTimeout(function () { 
            game.lockRender = true; 
          }, 1000);
          return;
      };
      game.state.start('gameState');
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

    if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
      document.getElementById('winmessage').style.opacity = 0;
      game.lockRender = false;
      levelNum = 0;
      game.state.restart();
    }
  }
};