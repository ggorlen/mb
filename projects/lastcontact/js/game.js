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
    game.load.tilemap('level' + (levelNum + 1), './levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('gameTiles', 'assets/spritesheet2.png');
    game.load.image('background', 'assets/dirt.png');
    //todo
    //game.load.image('bullet', 'assets/key.jpg');
    game.load.image('key', 'assets/key.png');
  },

  create: function () {
    document.getElementById('levelName').innerText = 'Level ' + (levelNum + 1);
    // game.stage.backgroundColor = '#fff';
    game.add.tileSprite(0, 0, 640, 480, 'background')

    // add player sprite to game
    player = game.add.sprite(48, 48, 'player');
    player.anchor.setTo(.5,.5);

    exitdoor = game.add.sprite(exitdoorLocations[levelNum].x * gridSize, exitdoorLocations[levelNum].y * gridSize, 'exitdoor');

    enemies = game.add.group();
    enemies.enableBody = true;

    //bullets = game.add.group();
    //bullets.enableBody = true;
    //bullets.scale.setTo(0.1, 0.1);

    //bullets.createMultiple(50, 'bullet');

    key = game.add.sprite(keyLocations[levelNum].x * gridSize, keyLocations[levelNum].y * gridSize, 'key');
    key.scale.setTo(0.05, 0.05);
    hasKey = false;

    // make all the ledges and set them to be immovable
    enemyLocations[levelNum].forEach(e =>
      enemies.create(e.x * gridSize, e.y * gridSize, 'enemy')
    );

    // size of player sprite
    player.scale.setTo(0.65, 0.65);
    
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.enable(exitdoor, Phaser.Physics.ARCADE);
    game.physics.enable(key, Phaser.Physics.ARCADE);
    
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

    // show the phaser game in case it is hidden
    document.getElementsByTagName('canvas')[0].style.display = "block";

    // reset health and initialize the health element in the DOM
    health = 1000;
    healthElem.innerText = "health: " + health;
  },

  update: function() {
    
    game.physics.arcade.collide(game.blockedLayer, player);
    
    game.physics.arcade.collide(exitdoor, enemies);

    if(game.physics.arcade.collide(player, key)){
      hasKey = true;
      key.kill();
    }
          
     // collide the player and enemy
    if (game.physics.arcade.collide(enemies, player)) {
      health -= 20;
      healthElem.innerText = "health: " + health;
      //player.body.velocity.x *= -1000
      //player.body.velocity.y *= -1000
      //console.log('hit it')
      if(health <= 0){
        game.state.start('gameState');
      } 
    }

    if (game.physics.arcade.collide(exitdoor, player) && hasKey){

      // move to the next level
      levelNum++;

      // show win message if game over
      if (levelNum >= numLevels) {
          levelElem.innerText = 'You win!';
          document.getElementsByTagName('canvas')[0].style.display = "none";

          // return to the first level after a short pause
          setTimeout(function () { 
            levelNum = 0;
            game.state.start('gameState');
          }, 2500);
      }
      else {
        game.state.start('gameState');
      }
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
      player.scale.x = Math.abs(player.scale.x) * -1 
      player.body.velocity.x = -playerVelocity;
      
      //console.log(player.scale.x);
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ||
        game.input.keyboard.isDown(Phaser.Keyboard.D)) {
      player.scale.x = Math.abs(player.scale.x)  
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

    //if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
    //  document.getElementById('winmessage').style.opacity = 0;
    //  game.lockRender = false;
    //  levelNum = 0;
    //  game.state.restart();
    //}
    //if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
    //  //let bullet = bullets.getFirstDead();
    //  //console.log(bullet);
    //  bullet.reset(player.x, player.y);
    //  bullet.rotation = player.rotation;
    //  game.physics.arcade.velocityFromRotation(player.rotation, 400, bullet.body.velocity);
    //
    //}
  }
};
