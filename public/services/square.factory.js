(function() {
  'use strict';
  angular.module('Chess').service('Square',squareService);
  //Assumption : White pieces always start from bottom and black pieces will always start from top.
  function squareService(Piece) {
    // var square = {1 : {1: {}, 2: {}, 3: {}, 4: {}, 5 : {} , 6: {} , 7: {} , 8: {} }, 
    //               2 : {1: {}, 2: {}, 3: {}, 4: {}, 5 : {} , 6: {} , 7: {} , 8: {} },
    //             3 : {1: {}, 2: {}, 3: {}, 4: {}, 5 : {} , 6: {} , 7: {} , 8: {} },
    //           4 : {1: {}, 2: {}, 3: {}, 4: {}, 5 : {} , 6: {} , 7: {} , 8: {} },
    //         5 : {1: {}, 2: {}, 3: {}, 4: {}, 5 : {} , 6: {} , 7: {} , 8: {} },
    //       6 : {1: {}, 2: {}, 3: {}, 4: {}, 5 : {} , 6: {} , 7: {} , 8: {} },
    //     7 : {1: {}, 2: {}, 3: {}, 4: {}, 5 : {} , 6: {} , 7: {} , 8: {} },
    //   8 : {1: {}, 2: {}, 3: {}, 4: {}, 5 : {} , 6: {} , 7: {} , 8: {} }};
    var square = {};
    var gridCol = 8;
    var gridRow = 8;
    //form the empty square object.
    for (var i = 1; i<=gridRow; i++) {
      var obj = {};
      for (var j=1; j <= gridCol ; j++) {
        obj[j] = {};
      }
      square[i] = obj;
    }

    function containsObj(array,obj) {
        for (var i=0; i < array.length; i++) {
          if (array[i].r == obj.r && array[i].c == obj.c) {
            return true;
          }
        }
        return false;
      }
      function isCheck() {
        return false;
      }
      function getPiecePosition(pos,color) {
            
        if (color === "black") {
          return {r : gridRow -pos.r+1 , c : gridCol - pos.c + 1};
        }
        return pos;
      }

    return {
      //Fix the initial position of different pieces
      setInitialPos : function() {
        for (var i=1; i<=8;i++) {
          square[2][i] = {piece : 'pawn', player : 'white'};
          square[7][i] = {piece : 'pawn', player : 'black'};
          if (i===1 || i===8) {
            square[1][i] = {piece : 'rook', player : 'white'};
            square[8][i] = {piece : 'rook', player : 'black'};
          }
          if (i===2 || i===7) {
            square[1][i] = {piece : 'knight', player : 'white'};
            square[8][i] = {piece : 'knight', player : 'black'};
          }
          if (i===3 || i===6) {
            square[1][i] = {piece : 'bishop', player : 'white'};
            square[8][i] = {piece : 'bishop', player : 'black'};
          }
          if (i===4) {
            square[1][i] = {piece : 'queen', player : 'white'};
            square[8][i] = {piece : 'queen', player : 'black'};
          }
          if (i===5) {
            square[1][i] = {piece : 'king', player : 'white'};
            square[8][i] = {piece : 'king', player : 'black'};
          }

        }

      }
      ,move : function(oldPos,newPos) {
        var oldObj = square[oldPos.r][oldPos.c];
        var newObj = square[newPos.r][newPos.c];
        
        if (typeof(newObj.player) !== "undefined") {
          if (oldObj.player === newObj.player) {
            return {result : false, message : "Not a possible move."}
          }
        }
        var piece = oldObj.piece;
        if (typeof(piece) === "undefined" || piece === "") {
          return {result : false, message : "Nothing to move."};
        }
        var posPositions = Piece[piece].getPossiblePositions(getPiecePosition(oldPos,oldObj.player));

        newPos.player = oldObj.player;
        if(containsObj(posPositions,getPiecePosition(newPos,oldObj.player))) {
          var message = "Move successful. ";
          if (typeof(newObj.piece) != "undefined") {

            message = message + newObj.piece+ " is killed. "
            if (newObj.piece === "king") {
              message = message + "Checkmate.. hurray !!";
            }
          }
          square[newPos.r][newPos.c] = JSON.parse(JSON.stringify(oldObj));
          square[oldPos.r][oldPos.c] = {};

          if (isCheck() && newObj.piece != "king") {
            message = message + "Check to the opponent. ";
          }
          return {result : true,message : message};
        } else {
          return {result : false,message : 'Not a possible move.'};
        }
      }
      ,getCurrentSituation : function() {
        return square;
      }
    }
  }
  
squareService.$inject = ['Piece'];

})();