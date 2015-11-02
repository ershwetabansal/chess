(function() {
  'use strict';
  angular.module('Chess').factory('Rules',ruleService);
  var gridCol = 8;
    var gridRow = 8;
  function ruleService(Piece) {
    
    return {
      canNotKillOwnArmyRule : function(grid,newObj,oldObj,newPos,oldPos) {
        if (typeof(newObj.player) !== "undefined") {
          if (oldObj.player === newObj.player) {
            return {result : false, message : "Can not kill your own army."}
          }
        }
        return true;
      }
      , shouldExistToMoveRule : function(grid,newObj,oldObj,newPos,oldPos){
        if (typeof(oldObj.piece) === "undefined" || oldObj.piece === "") {
          return {result : false, message : "Nothing to move."};
        }
        return true;
      }
      , positionRule : function(grid,newObj,oldObj,newPos,oldPos) {
        var posPositions = Piece[oldObj.piece].getPossiblePositions(getPiecePosition(oldPos,oldObj.player));
        if(!containsObj(posPositions,getPiecePosition(newPos,oldObj.player))) {
          return {result : false,message : 'Not a possible move.'};
        } 
        return true;
      }
      , pawnRule : function(grid,newObj,oldObj,newPos,oldPos) {
        if (oldObj.piece === 'pawn'){
          if (newPos.c != oldPos.c) { 
            if (typeof(newObj.piece) === "undefined") {
              return { result : false, message : 'Not a possible move.'};
            }
          } else {
            if (typeof(newObj.piece) !== "undefined") {
              return { result : false, message : 'Not a possible move.'};
            }
          }

        }
        return true;
      }
      , canNotLeapRule : function(grid,newObj,oldObj,newPos,oldPos) {
        if (Piece[oldObj.piece].canLeap() === false) {
          if (newPos.r != oldPos.r && newPos.c != oldPos.c) {
            if (Math.abs(newPos.r - oldPos.r) === Math.abs(newPos.c - oldPos.c)) {
              var start = Math.min(newPos.r,oldPos.r);
              var end = Math.max(newPos.r,oldPos.r);
              var col = oldPos.c;
              var col_end = newPos.c;
              if (start=== newPos.r) {
                  col = newPos.c;
                  col_end = oldPos.c;
              }
              for (var i=start+1 ; i<=end-1;i++) {
                if (col_end > col) col++;
                else col--;
                if (typeof(grid[i-1][col-1].piece) !== "undefined") {

                  return {result : false, message : oldObj.piece+ ' can not leap.'};
                }
                
              }
            }

          } else if (newPos.c !== oldPos.c) {
            var start = Math.min(newPos.c,oldPos.c);
            var end = Math.max(newPos.c,oldPos.c);
            for (var i=start+1 ; i<=end-1;i++) {
                if (typeof(grid[newPos.r-1][i-1].piece) !== "undefined") {
                  return {result : false, message : oldObj.piece+ ' can not leap.'};
                }
              }
          } else if (newPos.r !== oldPos.r) {
            var start = Math.min(newPos.r,oldPos.r);
            var end = Math.max(newPos.r,oldPos.r);
            for (var i=start+1 ; i<=end-1;i++) {
                if (typeof(grid[i-1][newPos.c-1].piece) !== "undefined") {
                  return {result : false, message : oldObj.piece+ ' can not leap.'};
                }
              }
          }
        } 
        return true;
      }
      , hasItKilledRule : function(grid,newObj,oldObj,newPos,oldPos) {
        if (typeof(newObj.piece) != "undefined" && newObj.player != oldObj.player) {
          return {result : true, message : newObj.player+' '+newObj.piece + " got killed." }
        }
        return true;
      }
      , isGameOverRule : function(grid,newObj,oldObj,newPos,oldPos) {
        if (newObj.piece === "king") {
          return {result : true, message : ' Game Over.', gameOver : true};
        }
        return true;
      }
      , isCheckRule : function(grid,newObj,oldObj,newPos,oldPos){
        //TODO
      }
    }
  }
  
        function containsObj(array,obj) {
        for (var i=0; i < array.length; i++) {
          if (array[i].r == obj.r && array[i].c == obj.c) {
            return true;
          }
        }
        return false;
      }
      
      function getPiecePosition(pos,color) {
            
        if (color === "black") {
          return {r : gridRow -pos.r+1 , c : gridCol - pos.c + 1};
        }
        return pos;
      }

ruleService.$inject = ['Piece'];

})();