/**
 * school.js 
 *
 * This state represents the start of the game and where the love story began
 */
const schoolState = {

  /**
   * Loads game assets (images, sounds, tilemaps, etc)
   */
  preload: function () {
      
    game.load.image('text_button', 'assets/text_button.jpeg');
    game.load.image('button_1','assets/button_1.png');
    game.load.image('school_background','assets/school_background.jpg');   
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
      
    const text_button = game.add.sprite(400,45, 'text_button');
    text_button.anchor.set(0.5);
    text_button.inputEnabled = true;
    text_button.input.useHandCursor = true;  // Change cursor style on mouseover
    text_button.scale.setTo(1.4,1);
      
        game.add.text(
      125, 25,  // x, y position
      "Summer has ended and time for a new school year to begin", 
      { fontSize: "20px", fill: "#fff" }
            );

    school_background.events.onInputDown.add(function () {
      game.state.start('confession');
    }, this);
    
    text_button.events.onInputDown.add(function () {
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
