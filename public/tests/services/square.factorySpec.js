describe('Square factory Testing.', function() {
  'use strict';

  // Service instance
  var squareFactory;
  var pieceFacotry;

  beforeEach(function() {
    module('Chess');
  });
  beforeEach(
      inject(function(Piece,Square){
        squareFactory = Square;
        pieceFacotry = Piece;
      }));


  describe('should be able to check for a new piece.', function() {
    
    beforeEach(function(){
      squareFactory.setInitialPos();
    });

    it('should run first move by whites', function() {
      var player = {color :'white', name :'hehe'};
      var oldPos = {r : 2, c : 3};
      var newPos = {r : 3, c : 3};
      var square = squareFactory.getCurrentSituation();
      expect(square[2][3]).toEqual({piece : 'pawn', player : 'white'});
      expect(square[3][3]).toEqual({});

      var outcome = squareFactory.move(oldPos,newPos,player);
      expect(outcome.result).toBeTruthy();

      square = squareFactory.getCurrentSituation();
      expect(square[2][3]).toEqual({});
      expect(square[3][3]).toEqual({piece : 'pawn', player : 'white'});

      var player = {color :'white', name :'hehe'};
      var oldPos = {r : 3, c : 3};
      var newPos = {r : 2, c : 3};
      var outcome = squareFactory.move(oldPos,newPos,player);
      expect(outcome.result).toBeFalsy();
      expect(outcome.message).toBe('Not a possible move.');
    });

  });

});