(function() {
  'use strict';
  angular.module('Chess').service('Square',squareService);
  function squareService(Piece,Rules) {
    var grid = [];
    var gridCol = 8;
    var gridRow = 8;
    //form the empty square object.
    for (var i = 1; i<=gridRow; i++) {
      var row = [];
      for (var j=1; j <= gridCol ; j++) {
        var square = {};
        square.class = 'white';
        if (i%2===1) {
          if (j%2==0) square.class ='black';
        } else {
          if (j%2!=0) square.class = 'black';
        }
        row.push(square);
      }
      grid.push(row);
    }
    var vm = this;

    // return {
      //Fix the initial position of different pieces
      vm.setInitialPos = function() {
        for (var p in Piece) {
          var pos = Piece[p].getInitialPositions();
          for (var i=0; i < pos.length; i++) {
            grid[pos[i].r-1][pos[i].c-1].piece = p;
            grid[pos[i].r-1][pos[i].c-1].player = 'white';
            grid[pos[i].r-1][pos[i].c-1].image = p + "_white.png";

            grid[8-pos[i].r][pos[i].c-1].piece = p;
            grid[8-pos[i].r][pos[i].c-1].player = 'black';
            grid[8-pos[i].r][pos[i].c-1].image = p + "_black.png";

          }
        }
      };
      vm.move = function(oldPos,newPos) {
        var oldObj = grid[oldPos.r-1][oldPos.c-1];
        var newObj = grid[newPos.r-1][newPos.c-1];
        
        var message = "Move successful. ";
        for (var rule in Rules) {
          var outcome = Rules[rule](grid,newObj,oldObj,newPos,oldPos);
          if (typeof(outcome) !=="undefined" && outcome !== true) {
            if (outcome.result === false) return outcome;
            else if (outcome.result === true && typeof(outcome.message) !== "undefined") {
              message = message + outcome.message;
            }
            if (typeof(outcome.gameOver)) {
              return outcome;
              //TODO show a popup that game is over. Do you want to start a new game?
            }
          }
        }
          grid[newPos.r-1][newPos.c-1].piece = grid[oldPos.r-1][oldPos.c-1].piece;
          grid[newPos.r-1][newPos.c-1].player = grid[oldPos.r-1][oldPos.c-1].player;
          grid[newPos.r-1][newPos.c-1].image = grid[oldPos.r-1][oldPos.c-1].image;

          delete grid[oldPos.r-1][oldPos.c-1].piece ;
          delete grid[oldPos.r-1][oldPos.c-1].player ;
          delete grid[oldPos.r-1][oldPos.c-1].image ;
          return {result : true,message : message};
        
      };
      vm.getCurrentSituation = function() {
        return grid;
      };
    // }
  }
  
squareService.$inject = ['Piece','Rules'];

})();