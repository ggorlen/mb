/**
 * walking_home.js 
 *
 * This state represents if you don't choose the choice that gets you in a relationship
 */
const walkingHomeState   = {

  /**
   * Loads game assets (images, sounds, tilemaps, etc)
   */
  preload: function () {
    game.load.image('text_button', 'assets/text_button.jpeg');
    game.load.image('button_1','assets/button_1.png');
    game.load.image('walk', 'assets/walk_home.jpg');
 
  },

  /**
   * Initializes variables and instantiates objects
   */
  create: function () {
      console.log("walkingHome")
      
      var i = game.add.image(game.world.centerX, game.world.centerY, 'walk')
    i.anchor.set(0.5)
      
      const text_button = game.add.sprite(400, 45, 'text_button');
    text_button.anchor.set(0.5);
    text_button.scale.setTo(1.4,1);
      
      game.add.text(
      125, 9.5,  // x, y position
      "You and Taiga walk home and she walks up ahead and stops\n in front of you...?", 
      { fontSize: "20px", fill: "#fff" }
            );
      
      const taiga = game.add.sprite(275, 298.5, 'taiga');
       
      const hug_button = game.add.sprite(210, 500, 'button_1');
    hug_button.anchor.set(0.5);
    hug_button.inputEnabled = true;
    hug_button.input.useHandCursor = true;  // Change cursor style on mouseover*/
    hug_button.scale.setTo(0.4,0.5);
      
      const kiss_button = game.add.sprite(540, 500, 'button_1');
    kiss_button.anchor.set(0.5);
    kiss_button.inputEnabled = true;
    kiss_button.input.useHandCursor = true;  // Change cursor style on mouseover*/
    kiss_button.scale.setTo(0.4,0.5);
       
      game.add.text(
      170,490,  // x, y position
      "Hug her", 
      { fontSize: "20px", fill: "#fff" }
            );
      game.add.text(
      500,490,  // x, y position
      "Kiss her", 
      { fontSize: "20px", fill: "#fff" }
            );

    hug_button.events.onInputDown.add(function () {
      game.state.start('hug_1');
    }, this);
    
    kiss_button.events.onInputDown.add(function () {
      game.state.start('kiss_1');
    }, this);
  },

  /** 
   * Updates the screen each frame
   */
  update: function () {
      
    // Show mouse coordinates for debugging and placing objects
    
  }
}; // end confessionState
