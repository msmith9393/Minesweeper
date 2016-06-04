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

GameUI.prototype.lost = function() {
  console.log('YOU LOST');
  // reveal bombs
  var matrix = this.newGame.matrix;
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j].bomb === true) {
        console.log(matrix[i][j])
        $('.r-' + i + 'c-' + j).addClass('BOMB');
      }
    }
  }
}

GameUI.prototype.checkClick = function(square) {
  if (square.surroundingBombs === 0) {
    // recursively show numbers
  } else {
    // reveal number
    var i = square.coordinates[0]
    var j = square.coordinates[1]
    var surroundingBombs = square.surroundingBombs;
    if (surroundingBombs === 1) {
      $('.r-' + i + 'c-' + j).text(surroundingBombs + '').addClass('oneBomb');
    } else if (surroundingBombs === 2) {
      $('.r-' + i + 'c-' + j).text(surroundingBombs + '').addClass('twoBombs');
    } else {
      $('.r-' + i + 'c-' + j).text(surroundingBombs + '').addClass('lotsBombs');
    }
  }
};

GameUI.prototype.leftClick = function(row, col) {
  var square = this.newGame.matrix[row][col];
  if (!square.clicked) {
    var bomb = square.bomb;
    square.clicked = true;
    console.log(square);
    if (square.bomb) {
      this.lost();
    } else {
      this.checkClick(square);
    }
  }

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