// Create the Phaser game object
const game = new Phaser.Game(800, 600, Phaser.AUTO, "example");

// Add game states
game.state.add("menu", menuState);
game.state.add("game", gameState);

// Start the menu state
game.state.start("menu");
