var Square = function(coordinates) {
  this.coordinates = coordinates; // [i, j]
  this.bomb = false;
  this.surroundingBombs = 0;
  this.clicked = false;
};