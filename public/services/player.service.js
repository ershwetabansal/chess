(function() {
  'use strict';
  angular.module('Chess').service('Player',playerService);
  
  function playerService(Square) {

      var vm = this;
      var players = {};
      var lastChance = "";
      vm.createPlayers = function(name1, name2){
        if(name1===name2) {
          name1 = name1 + '_1';
          name2 = name2 + '_2';
        }
        var player1 = { name : name1,
          dead : []
        };
        players.white = player1;
        var player2 = {name : name2, 
          dead : []
        };
        players.black= player2;
        lastChance = name2;
        return players;
      };
      vm.getPlayers = function() {
        return players;
      };
      vm.getLastChancePlayer = function() {
        return lastChance;
      };
      vm.makeMove = function(oldPos,newPos,color) {
        var name = players[color].name;
            if (lastChance === name) {
              return {result : false , message : 'Not your chance, '+name};
            }
            
            var outcome = Square.move(oldPos,newPos);
            if (outcome.killed === true) players[name].dead.push(outcome.killed);
            if (outcome.result === true) {
              lastChance = name;
            }
            return outcome;
            
      };
      vm.startNewGame = function() {
        Square.setInitialPos();
      };

  }

playerService.$inject = ['Square'];

})();