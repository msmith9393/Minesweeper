var GameUI = function($board, bombs) {
  this.$board = $board
  this.bombs = bombs || 30;
  this.newGame = new Game(10, 10, this.bombs);
  this.buildBoard();
  this.registerEvents();
};

GameUI.prototype.buildBoard = function() {
  var matrix = this.newGame.matrix;
  for (var i = 0; i < matrix.length; i++) {
    var rowDiv = $('<div>').addClass('row');
    this.$board.append(rowDiv);
    for (var j = 0; j < matrix[i].length; j++) {
      var colDiv = $('<span></span>').addClass('column').addClass('r-' + i + 'c-' + j);
      rowDiv.append(colDiv);
    }
  }
};

GameUI.prototype.leftClick = function(row, col) {
  var square = this.newGame.matrix[row][col];
  var bomb = square.bomb;
  console.log(square);

  // there is a bomb
    // reveal bombs
    // they lost
  // there is not a bomb
    // check if they won
      // if they did
        // alert them
      // otherwise
        // reveal square
};


GameUI.prototype.registerEvents = function() {
  var gameThis = this;
  $('.column').on('click', function() {
    var string = $(this).attr('class');
    var rowIndex = string.indexOf('r-') + 2;
    var colIndex = string.indexOf('c-') + 2;
    var row = parseInt(string[rowIndex]);
    var col = parseInt(string[colIndex]);

    gameThis.leftClick(row, col);
  });
};