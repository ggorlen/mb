"use strict";

var Conway = function (initialGrid) {
  this.grid = initialGrid || [
    "00000000000000000000000000000000000000",
    "00000000000000000000000001000000000000",
    "00000000000000000000000101000000000000",
    "00000000000001100000011000000000000110",
    "00000000000010001000011000000000000110",
    "01100000000100000100011000000000000000",
    "01100000000100010110000101000000000000",
    "00000000000100000100000001000000000000",
    "00000000000010001000000000000000000000",
    "00000000000001100000000000000000000000",
    "00000000000000000000000000000000000000",
    "00000000000000000000000000000000000000",
    "00000000000000000000000000000000000000",
    "00000000000000000000000000000000000000",
    "00000000000000000000000000000000000000",
    "00000000000000000000000000000000000000",
    "00000000000000000000000000000000000000",
    "00000000000000000000000000000000000000",
    "00000000000000000000000000000000000000",
  ].reduce(function (a, e) {
    a.push(e.split("").map(function (e) { return parseInt(e); }));
    return a;
  }, []);
  this.height = this.grid.length;
  this.width = this.grid[0].length;
};

Conway.directions = [
  { x: -1, y: -1 },
  { x: -1, y: 0  },
  { x: -1, y: 1  },
  { x: 0,  y: -1 },
  { x: 0,  y: 1  },
  { x: 1,  y: -1 },
  { x: 1,  y: 0  },
  { x: 1,  y: 1  }
];

Conway.prototype = {
  nextGeneration: function () {
    var nextGrid = this.grid.map(function (e) { return e.slice(); });

    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        var aliveNeighborCount = this.countAliveNeighbors(i, j);

        if (this.grid[i][j]) {
          if (aliveNeighborCount < 2 || aliveNeighborCount > 3) {
            nextGrid[i][j] = 0;
          }
          else {
            nextGrid[i][j] = 1;
          }
        }
        else if (aliveNeighborCount === 3) {
          nextGrid[i][j] = 1;
        }
      }
    }

    this.grid = nextGrid;
    return this.grid;
  },

  countAliveNeighbors: function (row, col) {
    return Conway.directions.reduce(function (a, e) {
      var x = e.x + col;
      var y = e.y + row;

      if (this.grid[y] && this.grid[y][x]) {
        a += this.grid[y][x];
      }

      return a;
    }.bind(this), 0);
  }
};
