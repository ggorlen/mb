/**
 * walking_home.js 
 *
 * This state represents if you don't choose the choice that gets you in a relationship
 */
const kiss_1State   = {

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
      "You guys kiss and live on your cute romantic lives.\n And you see her smile again. You have beat the game.", 
      { fontSize: "20px", fill: "#fff" }
            );
      
      const taiga = game.add.sprite(275, 298.5, 'taiga');
      
      const justFriendsBtn = game.add.sprite(397,320, 'button_1');
    justFriendsBtn.anchor.set(0.5);
    justFriendsBtn.inputEnabled = true;
    justFriendsBtn.input.useHandCursor = true;  // Change cursor style on mouseover*/
    justFriendsBtn.scale.setTo(0.4,0.5);
       
      game.add.text(
      325,300,  // x, y position
      "Return to Menu", 
      { fontSize: "20px", fill: "#fff" }
            );
      justFriendsBtn.events.onInputDown.add(function () {
      game.state.start('menu');
    }, this);
       
   
  },

  /** 
   * Updates the screen each frame
   */
  update: function () {
      
    // Show mouse coordinates for debugging and placing objects
    
  }
}; // end confessionState
