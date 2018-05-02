"use strict";


// create the Phaser game object
const game = new Phaser.Game(500, 500, Phaser.AUTO, 'our-game');

// global constants
const gridSize = 32;
const numLevels = 5;
const lastLevel = 5;
const playerVelocity = 125;
let health = 1000
const enemyVelocity = playerVelocity / 2 | 0;
const enemyLocations = [
  [
    {x: 5, y: 10},
    {x: 3, y: 12},
    {x: 12, y: 6},
    {x: 15, y: 10},
    {x: 18, y: 7},
    {x: 18, y: 13},
    {x: 18, y: 13}
  ],
  [
    {x: 5, y: 10},
    {x: 5, y: 10},
    {x: 3, y: 12},
    {x: 12, y: 6},
    {x: 15, y: 10},
    {x: 18, y: 7},
    {x: 18, y: 13},
    {x: 18, y: 13}
  ], 
  [
    {x: 5, y: 10},
    {x: 5, y: 10},
    {x: 5, y: 10},
    {x: 3, y: 12},
    {x: 12, y: 6},
    {x: 15, y: 10},
    {x: 18, y: 7},
    {x: 18, y: 13},
    {x: 18, y: 13}
  ], 
  [
    {x: 5, y: 10},
    {x: 5, y: 10},
    {x: 5, y: 10},
    {x: 5, y: 10},
    {x: 3, y: 12},
    {x: 12, y: 6},
    {x: 15, y: 10},
    {x: 18, y: 7},
    {x: 18, y: 13},
    {x: 18, y: 13},
  ], 
  [
    {x: 5, y: 10},
    {x: 5, y: 10},
    {x: 5, y: 10},
    {x: 5, y: 10},
    {x: 5, y: 10},
    {x: 3, y: 12},
    {x: 12, y: 6},
    {x: 15, y: 10},
    {x: 18, y: 7},
    {x: 18, y: 13},
    {x: 18, y: 13}
  ], 
];
const exitdoorLocations = [
  {x: 19, y: 13}, 
  {x: 19, y: 13},
  {x: 19, y: 13},
  {x: 19, y: 13},
  {x: 19, y: 13},
];

// global variables
let levelNum = 0;
let player;
let enemies;
let exitdoor;
let map;

if (numLevels !== enemyLocations.length || 
    numLevels !== exitdoorLocations.length) {
  throw "Level problem!!!";
}

// add states to the game
game.state.add("gameState", gameState);

// start the menu state
game.state.start("gameState");
