describe('Player Service Testing.', function() {
  'use strict';

  // Service instance
  var squareFactory;
  var pieceFacotry;
  var playerService;

  beforeEach(function() {
    module('Chess');
  });
  beforeEach(
      inject(function(Piece,Square,Player){
        squareFactory = Square;
        pieceFacotry = Piece;
        playerService = Player;
      }));


  describe('should be able to check move by a player.', function() {
    
    var player1;
    var player2;
    beforeEach(function(){
      // squareService.setInitialPos();
      player1 = playerService.createPlayers('test1','test2');
      playerService.startNewGame();
    });

    it('should check the move by player1', function() {
      var oldPos = {r : 2, c : 3};
      var newPos = {r : 3, c : 3};
      
      var outcome = playerService.makeMove(oldPos,newPos,'test1');
      expect(outcome.result).toBeTruthy();

    });

    it('should not allow the wrong move', function() {
      var oldPos = {r : 3, c : 3};
      var newPos = {r : 2, c : 3};
      var outcome = playerService.makeMove(oldPos,newPos);
      expect(outcome.result).toBeFalsy();
      expect(outcome.message).toBe('Nothing to move.');
    });

  });

});