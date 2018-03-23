/**
 * main.js 
 *
 * This is where global variables live 
 * and the first state is started
 */

// Global variables
let text;
const width = 800;
const height = 600;

// Create the Phaser game object
const game = new Phaser.Game(width, height, Phaser.AUTO, "example");

// Add states to the game
game.state.add("menu", menuState);
game.state.add("game", gameState);

// Start the menu state
game.state.start("menu");
