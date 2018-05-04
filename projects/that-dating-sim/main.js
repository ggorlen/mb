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
game.state.add("school", schoolState);
game.state.add("confession", confessionState);
game.state.add("justFriends", justFriendsState);
game.state.add("firstDate", firstDateState);
game.state.add("iceCream", iceCreamState);
game.state.add("movie", movieState);
game.state.add("walkingHome", walkingHomeState);

// Start the menu state
game.state.start("menu");

