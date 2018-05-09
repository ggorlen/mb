/**
 * justFriends.js 
 *
 * This state represents if you don't choose the choice that gets you in a relationship
 */
const justFriendsState   = {

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
      console.log("justFriends")
      
      var i = game.add.image(game.world.centerX, game.world.centerY, 'walk')
    i.anchor.set(0.5)
      
      const text_button = game.add.sprite(400, 45, 'text_button');
    text_button.anchor.set(0.5);
   // Change cursor style on mouseover*/
    text_button.scale.setTo(1.4,1);
      
      game.add.text(
      125, 9.5,  // x, y position
      "I walked home by myself, but I hope we end up becoming\n friends a least. You friendzoned her.. GAME OVER!!!", 
      { fontSize: "20px", fill: "#fff" }
            );
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
    
  }
}; // end confessionState
