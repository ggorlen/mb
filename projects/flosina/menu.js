// This is the menu state

var logo;

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

    // Add some text
    game.add.text(
      80, 260,  // x, y position
      "Welcome to the Magickal Kingdom of Flosina!\nPress space to enter.", 
      { fontSize: "32px", fill: "#fff" }
    );
      
    // Add logo
    logo = game.add.sprite(200, 200, 'logo');
      
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