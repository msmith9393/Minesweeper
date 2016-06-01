var Game = function(width, height, bombs) {
  this.width = width;
  this.height = height;
  this.bombs = bombs;
  this.matrix = this.setUpMatrix(width, height);
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
