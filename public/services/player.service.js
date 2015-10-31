(function() {
  'use strict';
  angular.module('Chess').service('Player',playerService);
  
  function playerService(Square) {

      var vm = this;
      var players = [];
      var lastChance = "";
      vm.createPlayers = function(name1, name2){
        players = [];
        var player1 = {color : 'white', 
          name : name1
        };
        players.push(player1);
        var player2 = {color : 'black', 
          name : name2
        };
        players.push(player2);
        return players;
      };
      vm.makeMove = function(oldPos,newPos,name) {
            if (lastChance === name) {
              return {result : false , message : 'Not your chance, Sir'};
            }
            lastChance = name;
            return Square.move(oldPos,newPos);
            
      };
      vm.startNewGame = function() {
        Square.setInitialPos();
      };

  }

playerService.$inject = ['Square'];

})();