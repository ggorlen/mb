/**
 * game.js 
 *
 * This state represents the in-game action
 */
const schoolState = {

  /**
   * Loads game assets (images, sounds, tilemaps, etc)
   */
  preload: function () {
    game.load.image('school_background','assets/school_background.jpg')
    game.load.image('button', 'assets/button.png');
    game.load.image('button_1', 'assets/button_1.png');
  },

  /**
   * Initializes variables and instantiates objects
   */
  create: function () {

    // Add some text
    text = game.add.text(300, 80, '', { fontSize: '32px', fill: '#fff' });
     
      const school_background = game.add.sprite(game.world.centerX, game.world.centerY, 'school_background');
    school_background.anchor.set(0.5);
    school_background.inputEnabled = true;
    school_background.input.useHandCursor = true; 
   
     /* // Add the button image to the middle of the screen and enable input
    const button = game.add.sprite(game.world.centerX, game.world.centerY, 'button');
    button.anchor.set(0.5);
    button.inputEnabled = true;
    button.input.useHandCursor = true;  // Change cursor style on mouseover

    // Add a function to the button to be called when the button is clicked
    button.events.onInputDown.add(function () {
      game.state.start('menu');
    }, this);*/
      
    const button_1 = game.add.sprite(400,45, 'button_1');
    button_1.anchor.set(0.5);
    button_1.inputEnabled = true;
    button_1.input.useHandCursor = true;  // Change cursor style on mouseover
    button_1.scale.setTo(1.2,0.5);
      
        game.add.text(
      125, 25,  // x, y position
      "Summer has ended and time for a new school year to begin", 
      { fontSize: "20px", fill: "#fff" }
            );

    school_background.events.onInputDown.add(function () {
      game.state.start('confession');
    }, this);
    
    button_1.events.onInputDown.add(function () {
      game.state.start('confession');   
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
