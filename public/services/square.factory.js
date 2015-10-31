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

    for (var i = 1; i<=gridRow; i++) {
      var obj = {};
      for (var j=1; j <= gridCol ; j++) {
        if (i%2===1) {
          if (j%2==0) {
             obj[j] = {color : 'black'};
          } else {
            obj[j] = {color : 'white'};
          }
        } else {
          if (j%2==0) {
             obj[j] = {color : 'white'};
          } else {
            obj[j] = {color : 'black'};
          }
        }
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
      function isCheck(piece,pos) {
        var newPosPositions = Piece[piece].getPossiblePositions(pos);
        for (var i=0; i < newPosPositions.length; i++) {
          if (square[newPosPositions[i].r][newPosPositions[i].c].Piece === "king") {
            return true;
          }
        }
        return false;
      }
      function getPiecePosition(pos) {
        var obj = square[pos.r][pos.c];
            
        if (obj.player === "black") {
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
            square[1][i] = {Piece : 'rook', player : 'white'};
            square[8][i] = {Piece : 'rook', player : 'black'};
          }
          if (i===2 || i===7) {
            square[1][i] = {Piece : 'knight', player : 'white'};
            square[8][i] = {Piece : 'knight', player : 'black'};
          }
          if (i===3 || i===6) {
            square[1][i] = {Piece : 'bishop', player : 'white'};
            square[8][i] = {Piece : 'bishop', player : 'black'};
          }
          if (i===4) {
            square[1][i] = {Piece : 'queen', player : 'white'};
            square[8][i] = {Piece : 'queen', player : 'black'};
          }
          if (i===5) {
            square[1][i] = {Piece : 'king', player : 'white'};
            square[8][i] = {Piece : 'king', player : 'black'};
          }

        }

      }
      ,move : function(oldPos,newPos) {
        var oldObj = square[oldPos.r][oldPos.c];
        var newObj = square[newPos.r][newPos.c];
        
        var piece = oldObj.piece;
        if (typeof(piece) === "undefined" ) {
          return {result : false, message : "Nothing to move."};
        }
        var posPositions = Piece[piece].getPossiblePositions(getPiecePosition(oldPos));
        // console.log(JSON.stringify(posPositions) + ", new pos :"+JSON.stringify(newPos));
        if(containsObj(posPositions,getPiecePosition(newPos))) {
          var message = "Move successful. ";
          if (typeof(newObj.piece) != "undefined") {
            message = message + newObj.piece+ " is killed. "
            if (newObj.piece === "king") {
              message = message + "Checkmate.. hurray !!";
            }
          }
          square[newPos.r][newPos.c] = oldObj;
          delete square[oldPos.r][oldPos.c].piece;
          delete square[oldPos.r][oldPos.c].player;

          if (isCheck && newObj.piece != "king") {
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