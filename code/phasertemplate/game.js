// Create the main game state class
const gameState = function () { };

// Add the create/preload/update functions to the game class
gameState.prototype = {

  // Phaser function to load assets (images, sounds, etc)
  preload: function () {

    /*** Load assets here ***/
  
  },

  // Phaser function to initialize variables and instantiate objects
  create: function () {

    // Add some text
    text = game.add.text(300, 280, '', { fontSize: '32px', fill: '#fff' });
  },

  // Phaser main game function to update the screen
  update: function () {
      
    // Show mouse coordinates for debugging and placing objects
    text.setText("X: " + game.input.mousePointer.x + "  Y: " + game.input.mousePointer.y);
  }
};

// Global variables
let text;
