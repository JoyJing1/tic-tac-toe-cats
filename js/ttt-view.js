const Game = require('./game.js');

var View = function (game, $el) {
  this.game = game;
  this.element = $el;

  this.setupBoard();
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  $(".grid").on("click", "li", event =>  {
    const $square = $(event.currentTarget);

    if ($square.hasClass("clicked")) {
      alert("Spot already taken!");
    } else {
      this.makeMove($square);
      if (this.game.board.isOver()) {
        console.log(this.game.winner());
        if (this.game.winner()) {
          alert(`${this.game.currentPlayer.toUpperCase()} Wins!!`);
        } else {
          alert('Game Over! Nobody won... =(');
        }
      }
    }

  });
};

View.prototype.makeMove = function ($square) {
  let pos = $square.data("pos");
  pos = pos.split(",").map(el => parseInt(el));
  this.game.playMove(pos);

  const mark = this.game.currentPlayer;
  $square.addClass(`clicked ${mark}`);
  // $square.text(`${mark.toUpperCase()}`);
};

View.prototype.setupBoard = function () {
  const $grid = $("<ul class='grid'></ul>");

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const $square = $("<li>").addClass("square").attr("data-pos", [i , j]);
      $grid.append($square);
    }
  }
  this.element.append($grid);
};

module.exports = View;
