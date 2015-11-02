(function() {
  'use strict';
  angular.module('Chess').service('Rules',ruleService);
  //Assumption : White pieces always start from bottom and black pieces will always start from top.
  function ruleService(Piece) {
    
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

    return {
      canNotKillOwnArmyRule : function(square,newObj,oldObj) {
        if (typeof(newObj.player) !== "undefined") {
          if (oldObj.player === newObj.player) {
            return {result : false, message : "Not a possible move."}
          }
        }
        return true;
      }
      , shouldExistToMoveRule : function(square,newObj,oldObj){
        if (typeof(oldObj.piece) === "undefined" || oldObj.piece === "") {
          return {result : false, message : "Nothing to move."};
        }
        return true;
      }
      , positionRule : function(square,newObj,oldObj) {
        var posPositions = Piece[oldObj.piece].getPossiblePositions(getPiecePosition(oldPos,oldObj.player));
        if(containsObj(posPositions,getPiecePosition(newPos,oldObj.player))) {
          return {result : false,message : 'Not a possible move.'};
        } 
        return true;
      }
      , canNotJumpRule : function(square,newObj,oldObj) {
         
        return true;
      }
      , isCheckRule : function(square,newObj,oldObj){

      }
      , isCheckMateRule : function(square,newObj,oldObj) {

      }
    }
  }
  
squareService.$inject = ['Piece'];

})();