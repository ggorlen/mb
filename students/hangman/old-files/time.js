var c = document.getElementById("myCanvas");

var output = document.getElementById("output");

var guessBox = document.getElementById("guessbox");

var hiddenBox = document.getElementById("hidden-word");

var loser = document.getElementById("loser");

var winner = document.getElementById("winner");

var guessedLetters = document.getElementById("guessedLetters")

var wordList = ["bread", "bean", "honey", "fries", "pizza", "sushi", "salad", "curry", "steak", "bacon", "pasta", "apple", "melon", "lemon", "mango", "peach", "onion", "olive", "grape", "chili", "jelly", "prune", "fish", "rice", "corn"];

c.width=170;

c.height=220;

var ctx = c.getContext("2d");

ctx.lineWidth = 3;

//guessed letters bank

// var guessedLetters = [];

// guessedLetters.innerHTML = guessedLetters;

// function myFunction() {
  
//   guessedLetters.push(userInput);
    
//   document.getElementById("demo").innerHTML = guessedLetters;

// }

var word;

var hiddenWord;

var mistakes;



function init() {

   word = wordList[Math.floor(Math.random()*wordList.length)];

  hiddenWord  = word.replace(/./g, ".");

  mistakes = 0;

  hiddenBox.innerText = hiddenWord;

  drawPerson(mistakes);

}

init();

function guess(letter) {

  let correct = false;

  

  for (let i = 0; i < word.length; i++) {

    if (word[i] === letter) {

      var arr = hiddenWord.split("");

      arr[i] = letter;

      hiddenWord = arr.join("");

      correct = true;

    }

  }

  

  return correct;

}



document.addEventListener("keydown", function (e) {

  if (e.keyCode === 13) {



    if (!guess(e.target.value)) {

      mistakes++;

      drawPerson(mistakes);
      
      //guessedLetters.push(letter);

    }

    

    if (word === hiddenWord) {

      init();

     output.innerText="YOU WIN!!";

    } else if (mistakes > 9) {

      init();

      output.innerText="Sorry, you weren't able to guess the word " + word + "!";

    }

    

    e.target.value = "";

    //output.innerHTML = e.key;

    hiddenBox.innerText = hiddenWord;

  }



});



function drawPerson(amount) { 

  ctx.clearRect(0,0,c.width,c.height);

  //the line that connects the head to hang 

  if (amount >= 1){

    ctx.beginPath();

    ctx.moveTo(8,10);

    ctx.lineTo(100,10);

    ctx.stroke();

  }

  //the other line that connects the head  

  if (amount >= 2){

    ctx.beginPath();

    ctx.moveTo(100,8);

    ctx.lineTo(100,40);

    ctx.stroke();

  }

  //the head

   if (amount >= 3){

    ctx.beginPath();

    ctx.arc(99,60,20,0,2*Math.PI);

    ctx.stroke(); 

  }

 

  // the stomach/the line that connects with the arm and legs

  if (amount >= 4){

    ctx.beginPath();

    ctx.moveTo(100,80);

    ctx.lineTo(100,150);

    ctx.stroke();

  }

  //left arm

  if (amount >= 5){

    ctx.beginPath();

    ctx.moveTo(45,100);

    ctx.lineTo(100,90);

    ctx.stroke();

  }



  //right arm

  if (amount >= 6){

    ctx.beginPath();

    ctx.moveTo(155,100);

    ctx.lineTo(100,90);

    ctx.stroke();  

  }

  

  //left leg

  if (amount >= 7){

    ctx.beginPath();

    ctx.moveTo(100,150);

    ctx.lineTo(70,190);

    ctx.stroke();  

  }


  //right leg

  if(amount >= 8){

    ctx.beginPath();

    ctx.moveTo(130,190);

    ctx.lineTo(100,150);

    ctx.stroke();  

  }
