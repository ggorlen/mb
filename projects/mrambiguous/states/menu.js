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

    // Enable mouse
    game.input.mouse.capture = true;
  },

  /**
   * Initializes variables and instantiates objects
   */
  create: function () {

    // Add some text
    game.add.text(
      180, 260,  // x, y position
      "Mr. Ambiguous's Love Story", 
      { fontSize: "32px", fill: "#fff" }
    );

    game.add.text(
      280, 300,  // x, y position
      "Click to begin!", 
      { fontSize: "32px", fill: "#fff" }
    );
  },

  /** 
   * Updates the screen each frame
   */
  update: function () {

    // Check for mouse click and switch state to the game state when
    if (game.input.activePointer.leftButton.isDown) {
      game.state.start("game");
    }
  }
}; // end menuState
