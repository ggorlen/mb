/**
 * game.js 
 *
 * This state represents the in-game action
 */
const gameState = {

  /**
   * Loads game assets (images, sounds, tilemaps, etc)
   */
  preload: function () {
    game.load.image('button', 'assets/button.png');
  },

  /**
   * Initializes variables and instantiates objects
   */
  create: function () {

    // Add some text
    text = game.add.text(300, 80, '', { fontSize: '32px', fill: '#fff' });

    // Add the button image to the middle of the screen and enable input
    const button = game.add.sprite(game.world.centerX, game.world.centerY, 'button');
    button.anchor.set(0.5);
    button.inputEnabled = true;
    button.input.useHandCursor = true;  // Change cursor style on mouseover

    // Add a function to the button to be called when the button is clicked
    button.events.onInputDown.add(function () {
      game.state.start('menu');
    }, this);
  },

  /** 
   * Updates the screen each frame
   */
  update: function () {
      
    // Show mouse coordinates for debugging and placing objects
    text.setText(
      'x: ' + game.input.mousePointer.x + 
      '  y: ' + game.input.mousePointer.y
    );
  }
}; // end gameState
