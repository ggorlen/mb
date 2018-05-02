/**
 * menu.js 
 *
 * This is the menu state
 */
const menuState = {

  /**
   * Loads game assets (images, sounds, tilemaps, etc)
   */
  preload : function () {
    game.load.image('text_button', 'assets/text_button.jpeg');
    game.load.image('button_1','assets/button_1.png');
    game.load.image('intro_background', 'assets/game_background.jpg');
 

  },

  /**
   * Initializes variables and instantiates objects
   */
  create: function () {
    // Enable mouse
    game.input.mouse.capture = true;
      
    var i = game.add.image(game.world.centerX, game.world.centerY, 'intro_background')
    i.anchor.set(0.5)
    
      const button_1 = game.add.sprite(392,320, 'button_1');
    button_1.anchor.set(0.5);
    button_1.inputEnabled = true;
    button_1.input.useHandCursor = true;  // Change cursor style on mouseover
    button_1.scale.setTo(0.5,0.5);

    button_1.events.onInputDown.add(function () {
      game.state.start('school');
    }, this);
      
      // Add some text
    game.add.text(
      180, 25,  // x, y position
      "Mr. Ambiguous's Love Story", 
      { fontSize: "32px", fill: "#fff" }
    );

    game.add.text(
      320, 300,  // x, y position
      "Play Game", 
      { fontSize: "32px", fill: "#fff" }
    );
  },

  /** 
   * Updates the screen each frame
   */
  update: function () {

    // Check for mouse click and switch state to the game state when
    if (game.input.activePointer.leftButton.isDown) {
      game.state.start("school");
    }
  }
}; // end menuState
