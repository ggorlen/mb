// This is the menu state

var logo;
var text1;
var text2;

const menuState = {

  /**
   * Loads game assets (images, sounds, tilemaps, etc)
   */
  preload : function () {
      game.load.spritesheet('logo', 'img/MagicalCrystal2.png', 585.15, 585, 27);
      
  },

  /**
   * Initializes variables and instantiates objects
   */
  create: function () {

    // Enable mouse
    game.input.mouse.capture = true;

    var style = { font: "bold 26px Courier", fill: "#fff", boundsAlignH: "center", boundAlignV: "middle" };
      
    // Add some text
    text1 = game.add.text(
      0, 0,  // x, y position
      "Welcome to the Magickal Kingdom of Flosina!", style
    );
      
    text2 = game.add.text(
      0, 0,  // x, y position
      "Press Space to Enter", style
    );
      
    text1.setTextBounds(0, game.world.centerY + 220, 800, 100);

    text2.setTextBounds(0, game.world.centerY + 260, 800, 100);
      
    // Add logo
    logo = game.add.sprite(125, -60, 'logo');
      
    const logoFrames = [];
        
    for (let i = 1; i < 29; i++) {
        logoFrames.push(i);
    }
    
    logo.animations.add('play', logoFrames, 10, true);
    logo.animations.play('play');
  },

  /** 
   * Updates the screen each frame
   */
  update: function () {

    // Check for mouse click and switch state to the game state when
    if (game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
      game.state.start("game");
    }
  }
}; // end menuState
