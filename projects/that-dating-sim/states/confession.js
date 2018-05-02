/**
 * confession.js 
 *
 * This state represents the start of a relationship
 */
const confessionState = {

  /**
   * Loads game assets (images, sounds, tilemaps, etc)
   */
  preload: function () {
    game.load.image('conf', 'assets/confession_background.jpg');
    game.load.image('taiga', 'assets/Taiga.png'); 
  },

  /**
   * Initializes variables and instantiates objects
   */
  create: function () {
      var i = game.add.image(game.world.centerX, game.world.centerY, 'conf')
    i.anchor.set(0.5)
      
      const text_button = game.add.sprite(400, 45, 'text_button');
    text_button.anchor.set(0.5);
    /*button_1.inputEnabled = true;*/
    /*button_1.input.useHandCursor = true;  // Change cursor style on mouseover*/
    text_button.scale.setTo(1.4,1);
      
      const taiga = game.add.sprite(275, 298.5, 'taiga');
 
      game.add.text(
      100, 25,  // x, y position
      "The next day passed by and after school...a girl confessed to me", 
      { fontSize: "20px", fill: "#fff" }
            );
      
      const button_2 = game.add.sprite(210, 500, 'button_1');
    button_2.anchor.set(0.5);
    button_2.inputEnabled = true;
    button_2.input.useHandCursor = true;  // Change cursor style on mouseover
    button_2.scale.setTo(0.4,0.5);
      
      game.add.text(
      125,470,  // x, y position
      "I'm sorry but can\n we just be friends?", 
      { fontSize: "20px", fill: "#fff" }
            );
      
      const button_3 = game.add.sprite(540, 500, 'button_1');
    button_3.anchor.set(0.5);
    button_3.inputEnabled = true;
    button_3.input.useHandCursor = true;  // Change cursor style on mouseover
    button_3.scale.setTo(0.4,0.5);
      
      game.add.text(
      450,480,  // x, y position
      "I guess we can try?", 
      { fontSize: "20px", fill: "#fff" }
            );
      
     button_2.events.onInputDown.add(function () {
      game.state.start('justFriends');
    }, this);
      
       button_3.events.onInputDown.add(function () {
      game.state.start('firstDate');
    }, this);

    /*// Add some text
    text = game.add.text(300, 80, '', { fontSize: '32px', fill: '#fff' });

    // Add the button image to the middle of the screen and enable input
    const button = game.add.sprite(game.world.centerX, game.world.centerY, 'button');
    button.anchor.set(0.5);
    button.inputEnabled = true;
    button.input.useHandCursor = true; //  Set the scale of the sprite to the random value
    button.scale.setTo(0.8,0.8);
 // Change cursor style on mouseover

    // Add a function to the button to be called when the button is clicked
    button.events.onInputDown.add(function () {
      game.state.start('menu');
    }, this);*/
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
}; // end confessionState
