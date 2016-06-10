var GameUI = function($board, bombs) {
  this.$board = $board
  this.bombs = bombs || 15;
  this.newGame = new Game(10, 10, this.bombs);
  this.flagCount = this.newGame.bombs;
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
        $('.r-' + i + 'c-' + j).addClass('BOMB');
      }
    }
  }
}

GameUI.prototype.showEmptyArea = function(square) {
  var max = this.newGame.matrix.length - 1;
  if (square.surroundingBombs > 0) {
    this.revealNumber(square);
    square.clicked = true;
    return;
  } else if (square.clicked) {
    return;
  } else if (square.surroundingBombs == 0) {
    this.revealNumber(square);
    var i = square.coordinates[0];
    var j = square.coordinates[1];

    if (j < max) { this.showEmptyArea(this.newGame.matrix[i][j + 1])}
    if (j > 0) { this.showEmptyArea(this.newGame.matrix[i][j - 1])}
    if (i < max) { this.showEmptyArea(this.newGame.matrix[i + 1][j])}
    if (i > 0) { this.showEmptyArea(this.newGame.matrix[i - 1][j])}

    if (i > 0 && j > 0) { this.showEmptyArea(this.newGame.matrix[i - 1][j - 1])}
    if (i < max && j < max) { this.showEmptyArea(this.newGame.matrix[i + 1][j + 1])}
    if (i > 0 && j < max) { this.showEmptyArea(this.newGame.matrix[i - 1][j + 1])}
    if (i < max && j > 0) { this.showEmptyArea(this.newGame.matrix[i + 1][j - 1])}

  }
};

GameUI.prototype.revealNumber = function(square) {
  var i = square.coordinates[0];
  var j = square.coordinates[1];
  var surroundingBombs = square.surroundingBombs;
  square.clicked = true;
  if (surroundingBombs === 0) {
    $('.r-' + i + 'c-' + j).addClass('noBombs');
  } else if (surroundingBombs === 1) {
    $('.r-' + i + 'c-' + j).text(surroundingBombs + '').addClass('oneBomb');
  } else if (surroundingBombs === 2) {
    $('.r-' + i + 'c-' + j).text(surroundingBombs + '').addClass('twoBombs');
  } else {
    $('.r-' + i + 'c-' + j).text(surroundingBombs + '').addClass('lotsBombs');
  }
};

GameUI.prototype.checkClick = function(square) {
  if (square.surroundingBombs === 0) {
    // recursively show numbers
    this.showEmptyArea(square);
  } else {
    // reveal number
    this.revealNumber(square);
  }
};

GameUI.prototype.leftClick = function(row, col) {
  var square = this.newGame.matrix[row][col];
  if (!square.clicked) {
    var bomb = square.bomb;
    if (square.bomb) {
      square.clicked = true;
      this.lost();
    } else {
      this.checkClick(square);
    }
  }
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

  $('.column').on('contextmenu', function(e) {
    e.preventDefault();
    var string = $(this).attr('class');
    var rowIndex = string.indexOf('r-') + 2;
    var colIndex = string.indexOf('c-') + 2;

    var row = parseInt(string[rowIndex]);
    var col = parseInt(string[colIndex]);
    $('.r-' + row + 'c-' + col).text('F').addClass('markedFlag');
    var square = gameThis.newGame.matrix[row][col];
    square.markedFlag = true;
    gameThis.flagCount ++;
    var flags = $('.flags').text();
    var newFlagNum = parseInt(flags) - 1;
    $('.flags').text(newFlagNum);
    if (newFlagNum === 0) {
      console.log('YOU need to check for win!')
    }
    // mark as flag
    // decrement flag count
    // once flag count gets to zero
    // check for win if all the marked flags are bombs then they win otherwise they made a mistake
  });
};