var GameUI = function($board, bombs) {
  bombs = bombs || 10;
  var newGame = new Game(10, 10, bombs);
  this.buildBoard($board, newGame);
};

GameUI.prototype.buildBoard = function($board, newGame) {
  console.log('NEWGAME', newGame);
  var matrix = newGame.matrix;
  for (var i = 0; i < matrix.length; i++) {
    var row = matrix[i];
    $board.append($())
  }
};