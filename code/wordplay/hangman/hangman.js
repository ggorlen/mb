/** 
 * A simple hangman game
 * 
 * Illustrates functions, arrays, 
 * strings, loops, and conditionals.
 *
 * Ways to improve the game:
 *  - add images for the hangman and improve interface
 *  - re-design the game in object-oriented style
 *  - make missed letters array a set (i.e. no duplicates)
 */
 
"use strict";
 
 
// Variables to hold the target word and the hidden word
let word;
let hidden;

// The number of guesses the user has made and is allowed
const allowedGuesses = 6;
let numGuesses;

// Array to store missed guesses
let missed;


// Sets up a new game of hangman based on an array of words
function initialize(words) {
  
  // Initialize global variables
  hidden = [];
  missed = [];
  numGuesses = 0;
  
  // Find a random word from the possible words, 
  // make it lowercase and trim off whitespace
  word = "";

  while (!word.length) {
    word = words[Math.random()*words.length|0].toLowerCase().trim();
  }

  // Load the hidden array with dots up to the length of the word
  for (let i = 0; i < word.length; i++) {
    hidden.push(".");
  }
  
  // Return the hidden word
  return hidden.join("");
} // end initialize


// Handles user's guess. Returns the updated hidden word
function guess(letter) {

  // Make sure there is a valid word and letter before proceeding
  if (word && letter) {
    
    // Create a flag to keep track of whether 
    // the player's guess was correct
    let correct = false;

    // Check every letter in the word against the guess
    for (let i = 0; i < word.length; i++) {
    
      // If we find a match for this character in the word,
      // put it in the hidden word at that index
      if (word.charAt(i) === letter) {
        correct = true;
        hidden[i] = letter;
      }
    }

    if (!correct) {

      // If the player's guess was incorrect, add it to the missed letters array
      missed.push(letter);

      // Increment the number of guesses missed
      numGuesses++;
    }
    
    return hidden.join("");
  }
} // end guess
