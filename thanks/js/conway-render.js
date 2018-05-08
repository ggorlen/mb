"use strict";

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var speed = 100;
var gridSize = 10;
var conway = new Conway();
canvas.height = gridSize * (conway.height - 2);
canvas.width = gridSize * conway.width;
document.getElementById("conway-container").appendChild(canvas);

var interval = setInterval(function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var nextGen = conway.nextGeneration();

  for (var i = 0; i < nextGen.length; i++) {
    for (var j = 0; j < nextGen[i].length; j++) {
      if (nextGen[i][j]) {
        ctx.fillRect(j * gridSize, i * gridSize, gridSize, gridSize);
      }
    }
  }
}, speed);
