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
      "Welcome to the menu state. Click to begin!", 
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
