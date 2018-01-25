// Create the menu state class
const menuState = function () { };

// Add the create/preload/update functions to the menu class
menuState.prototype = {
  preload : function () {
    
    // Load menu assets here

  },

  create: function () {

    // Add some text
    game.add.text(235, 250, "Press any key to begin", { fontSize: "32px", fill: "#fff" });

    // Start the game when a key is pressed
    document.addEventListener("keydown", function (e) {
      document.removeEventListener("keydown", function (e) { });
      game.state.start("game");
    });
  },

  update: function () { }
};
