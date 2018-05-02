// This is the menu state

var logo;
var text1;
var text2;

const menuState = {

  /**
   * Loads game assets (images, sounds, tilemaps, etc)
   */
  preload : function () {
      
      game.load.spritesheet('logo', 'img/MagicalCrystal.png', 500, 500, 28);
      
  },

  /**
   * Initializes variables and instantiates objects
   */
  create: function () {

    // Enable mouse
    game.input.mouse.capture = true;
      
    // Add logo
    logo = game.add.sprite(157, -28, 'logo');

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
      
    text1.setTextBounds(0, game.world.centerX + 40, 800, 100);
      
    text2.setTextBounds(0, game.world.centerX + 85, 800, 100);
      
    const logoFrames = [];
        
    for (let i = 1; i < 29; i++) {
        logoFrames.push(i);
    }
    
    logo.animations.add('play', logoFrames, 10, true);
      
  },

  /** 
   * Updates the screen each frame
   */
  update: function () {
      
    // Animate logo
        logo.animations.play('play');

    // Check for mouse click and switch state to the game state when
    if (game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
      game.state.start("game");
    }
  }
}; // end menuState