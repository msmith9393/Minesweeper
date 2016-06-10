var Game = function(width, height, bombs) {
  this.width = width;
  this.height = height;
  this.bombs = bombs;
  this.matrix = this.setUpMatrix(width, height);
  this.countSurroundingBombs();
};

Game.prototype.setUpMatrix = function(w, h) {
  var matrix = [];
  for (var i = 0; i < w; i++) {
    matrix.push([]);
    for (var j = 0; j < h; j++) {
      matrix[i].push(new Square([i, j]));
    }
  }

  // place bombs in random squares
  var needToPlaceBombs = this.bombs;
  while (needToPlaceBombs > 0) {
    var randomWidth = Math.floor(Math.random() * w);
    var randomHeight = Math.floor(Math.random() * h);

    if (!matrix[randomWidth][randomHeight].bomb) {
      matrix[randomWidth][randomHeight].bomb = true;
      needToPlaceBombs--;
    }
  }

  return matrix;
};

Game.prototype.countSurroundingBombs = function() {
  var max = this.matrix.length - 1;
  for (var i = 0; i < this.matrix.length; i++) {
    for (var j = 0; j < this.matrix[i].length; j++) {
      if (i > 0 && this.matrix[i-1][j].bomb) { this.matrix[i][j].surroundingBombs ++}
      if (i < max && this.matrix[i+1][j].bomb) { this.matrix[i][j].surroundingBombs ++}
      if (j > 0 && this.matrix[i][j-1].bomb) { this.matrix[i][j].surroundingBombs ++}
      if (j < max && this.matrix[i][j+1].bomb) { this.matrix[i][j].surroundingBombs ++}

      if (i < max && j < max && this.matrix[i+1][j+1].bomb) { this.matrix[i][j].surroundingBombs ++}
      if (i > 0 && j > 0 && this.matrix[i-1][j-1].bomb) { this.matrix[i][j].surroundingBombs ++}
      if (i < max && j > 0 && this.matrix[i+1][j-1].bomb) { this.matrix[i][j].surroundingBombs ++}
      if (i > 0 && j < max && this.matrix[i-1][j+1].bomb) { this.matrix[i][j].surroundingBombs ++}
    }
  }
};