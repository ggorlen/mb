/** 
 * A very simple note script
 */

"use strict";

// Get objects from the HTML document
let inputBox = document.getElementById("input-box");
let outputBox = document.getElementById("output-box");


// Define a function which clears the output box
function clearOutput() {
  outputBox.innerHTML = "";
}


// Attach a keydown event listener to the input box--the 
// parameter function is called each time a key is pressed.
inputBox.addEventListener("keydown", function (e) {
  
  // Check to see if the enter key (#13) was pressed
  if (e.keyCode === 13) {
  
    // Append the value of the input box to the output box
    outputBox.innerHTML += "<br>" + inputBox.value;

    // Clear the input box
    inputBox.value = "";
    
    // Don't do a carriage return, which is the default action
    e.preventDefault();
  }
});
