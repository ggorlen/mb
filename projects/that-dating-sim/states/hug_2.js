/**
 * walking_home.js 
 *
 * This state represents if you don't choose the choice that gets you in a relationship
 */
const hug_2State   = {

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
      
      const walk = game.add.sprite('walk')
      
      const text_button = game.add.sprite(400, 45, 'text_button');
    text_button.anchor.set(0.5);
    text_button.scale.setTo(1.4,1);
      
      game.add.text(
      110, 9.5,  // x, y position
      "You've ended up kissing her but this wasn't what you\n wanted. You were forced to love her.. GAME OVER!!!", 
      { fontSize: "20px", fill: "#fff" }
            );
      
      const taiga = game.add.sprite(275, 298.5, 'taiga');
       
  },

  /** 
   * Updates the screen each frame
   */
  update: function () {
      
    // Show mouse coordinates for debugging and placing objects
    
  }
}; // end confessionState
