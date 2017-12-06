const word = "let it be";
let hiddenWord = word.replace(/./g, ".").split("");
let guesses = 6;

while (guesses && word !== hiddenWord.join("")) {
  const guess = prompt("guess a letter: ");
  if (!guess) { break; }
  let valid = false;
  
  for (let i = 0; i < hiddenWord.length; i++) {
    if (guess === word[i]) {
      valid = true;
      hiddenWord[i] = guess;
    }
  }
  
  if (!valid) { guesses--; }
  
  alert(hiddenWord.join(""));
}

if (guesses && word === hiddenWord.join("")) {
  alert("You guessed " + word + "!");
}
else {
  alert("You weren't able to guess " + word + " in time!");
}


var letter = userInput;
var userInput = prompt("What letter would you like to guess?", userInput);
var numberGuesses = 10;
var word = "bread";
var hiddenWord = word.length;
hiddenWord = word.replace(/./g, ".");
console.log(hiddenWord);
console.log(userInput);

function makeGuess (guess) {
  let correct = false;
}
// for (let i = 0; i < word.length; i++) {
//   if (word[i] === guess) {
//     correct = true;
//     hiddenWord[i] = guess;
//     }
//   }
// }


word = word[Math.floor(Math.random() * word.length)];
//console.log(word);


while (remainingLetters > 0) {
  // Game code goes here
  // Show the player their progress
  // Take input from the player
  userInput === correct;
  // Update answerArray and remainingLetters for every correct guess
  
}



//notes
const maxGuesses = 10;

//store in golbal varaiales
let hidden = [];
let missed = [];
let numGuesses = 0;

if (userInput === correct) {
  console.log("wrong");
  
//Pick a random word
//While the word has not been guessed {
//  Show the player their current progress
//  Get a guess from the player
//  If the player wants to quit the game {
//    Quit the game
//  }
//  Else If the guess is not a single letter {
//    Tell the player to pick a single letter
//  }
//  Else {
//    If the guess is in the word {
//      Update the player's progress with the guess
//    }
//  }
//}
//Congratulate the player on guessing the word


 var guess = prompt("Guess a letter, or click Cancel to stop playing.");
if (guess === null) {
  break;
} else if (guess.length !== 1) {
    alert("Please enter a single letter.");
} else {
 // Update the game state with the guess
} 
