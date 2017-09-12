/* 
 * This script generates groups
 */

"use strict";


// A function to generate groups of a particular size
function makeGroups(arr, groupSize) {

  // Make an array to hold the final groups
  let groups = [];

  // Copy the source array
  let copy = arr.slice();

  // Find out how many groups there will be 
  let numGroups = copy.length / groupSize | 0;

  // Make an array for each group
  for (let i = 0; i < numGroups; i++) {
    groups[i] = [];
  }
  
  // Splice random indexes out of the source array, distributing
  // them evenly throughout the groups arrays until there are 
  // no more source items to choose from.
  while (copy.length) {
    for (let i = 0; i < numGroups && copy.length; i++) {
      groups[i].push(copy.splice(Math.random() * copy.length | 0, 1));
    }
  }
  
  return groups;
}

let students = [ 
  "Dovran",
  "Eric R.",
  "Aaron",
  "Perry",
  "Bin",
  "Emi",
  "Faisal",
  "Mary",
  "Marshawn",
  "Nathan",
  "Ada",
  "Liana",
  "Johan",
  "Christian",
  "Eric D.",
  "Vlad"
];

let groups = makeGroups(students, 4);

for (let i = 0; i < groups.length; i++) {
  let group = "Group " + (i + 1) + " : ";

  for (let j = 0; j < groups[i].length; j++) {
    group += groups[i][j] + ", ";
  }

  document.getElementById("output").innerHTML += group.substr(0, group.length - 2) + "<br>";
}
