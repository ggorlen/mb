var c = document.getElementById("myCanvas");
var output = document.getElementById("output");
var guessBox = document.getElementById("guessbox");
var hiddenBox = document.getElementById("hidden-word");
var loser = document.getElementById("loser");
var winner = document.getElementById("winner");
c.width=170;
c.height=220;
var ctx = c.getContext("2d");
ctx.lineWidth = 3;


var word;
var hiddenWord;
var mistakes;

function init() {
  word = "ilikewordstotalkandjustyoueverything";
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
    }
    
    if (word === hiddenWord) {
      init();
     output.innerText="YOU WIN!!";
    } else if (mistakes > 9) {
      init();
      output.innerText="Sorry, you weren't able to guess the" + word + " !";
      console.log("Sorry, you weren't able to guess the" + word + " !")
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
  
  //the stand next to the line on top
  if (amount >= 9){
    ctx.beginPath();
    ctx.moveTo(10,10);
    ctx.lineTo(10,199);
    ctx.stroke();    
  }
  
  //the bottom of the stand
  if (amount >= 10){
    ctx.beginPath();
    ctx.moveTo(0,200);
    ctx.lineTo(20,200);
    ctx.stroke();
  }
}
