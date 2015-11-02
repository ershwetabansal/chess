describe('Chess Piece factory Testing.', function() {
  'use strict';

  // Service instance
 
  var pieceFactory;

  beforeEach(function() {
    module('Chess');
  });
  beforeEach(
      inject(function(Piece){
        pieceFactory = Piece;
      }));

   describe('should return the allowed moves for a king.', function() {
    
    
    beforeEach(function(){
    });

    it('should verify move of a king', function() {
      var king = pieceFactory.king;

      var array = king.getPossiblePositions({r: 5,c : 6});
      expect(array).toBeDefined();
      expect(array.length).toBe(8);
      expect(array).toContain({r : 4, c : 5});
      expect(array).toContain({r : 4, c : 6});
      expect(array).toContain({r : 4, c : 7});
      expect(array).toContain({r : 5, c : 5});
      expect(array).toContain({r : 5, c : 7});
      expect(array).toContain({r : 6, c : 5});
      expect(array).toContain({r : 6, c : 6});
      expect(array).toContain({r : 6, c : 7});
      
    });
 });

   describe('should return the allowed moves for a rook.', function() {
    
    
    beforeEach(function(){
    });

    it('should verify move of a rook', function() {
      var rook = pieceFactory.rook;

      var array = rook.getPossiblePositions({r: 5,c : 4});
      expect(array).toBeDefined();
      expect(array.length).toBe(14);
      expect(array).toContain({r : 5, c : 1});
      expect(array).toContain({r : 5, c : 2});
      expect(array).toContain({r : 5, c : 3});
      expect(array).toContain({r : 5, c : 5});
      expect(array).toContain({r : 5, c : 6});
      expect(array).toContain({r : 5, c : 7});
      expect(array).toContain({r : 5, c : 8});
      expect(array).toContain({r : 1, c : 4});
      expect(array).toContain({r : 2, c : 4});
      expect(array).toContain({r : 3, c : 4});
      expect(array).toContain({r : 6, c : 4});
      expect(array).toContain({r : 7, c : 4});
      expect(array).toContain({r : 8, c : 4});

    });
 });

  describe('should return the allowed moves for a bishop.', function() {
    
    
    beforeEach(function(){
    });

    it('should verify move of a bishop', function() {
      var bishop = pieceFactory.bishop;

      var array = bishop.getPossiblePositions({r: 5,c : 4});
      expect(array).toBeDefined();
      expect(array.length).toBe(13);
      expect(array).toContain({r : 2, c : 1});
      expect(array).toContain({r : 3, c : 2});
      expect(array).toContain({r : 4, c : 3});
      expect(array).toContain({r : 6, c : 5});
      expect(array).toContain({r : 7, c : 6});
      expect(array).toContain({r : 8, c : 7});
      expect(array).toContain({r : 8, c : 1});
      expect(array).toContain({r : 7, c : 2});
      expect(array).toContain({r : 6, c : 3});
      expect(array).toContain({r : 4, c : 5});
      expect(array).toContain({r : 3, c : 6});
      expect(array).toContain({r : 2, c : 7});
      expect(array).toContain({r : 1, c : 8});

    });
 });


  describe('should return the allowed moves for a queen.', function() {
    
    
    beforeEach(function(){
    });

    it('should verify move of a queen', function() {
      var queen = pieceFactory.queen;

      var array = queen.getPossiblePositions({r: 4,c : 4});
      expect(array).toBeDefined();
      expect(array.length).toBe(27);
    });
 });

  describe('should return the allowed moves for a knight.', function() {
    
    
    beforeEach(function(){
    });

    it('should verify move of a knight', function() {
      var knight = pieceFactory.knight;

      var array = knight.getPossiblePositions({r: 4,c : 4});
      expect(array).toBeDefined();
      expect(array.length).toBe(8);
      expect(array).toContain({r : 6, c : 3});
      expect(array).toContain({r : 6, c : 5});
      expect(array).toContain({r : 5, c : 2});
      expect(array).toContain({r : 5, c : 6});
      expect(array).toContain({r : 3, c : 2});
      expect(array).toContain({r : 3, c : 6});
      expect(array).toContain({r : 2, c : 3});
      expect(array).toContain({r : 2, c : 5});
    });
 });


  describe('should return the allowed moves for a pawn.', function() {
    
    
    beforeEach(function(){
    });

    it('should verify move of a pawn when it is the first move.', function() {
      var pawn = pieceFactory['pawn'];

      var array = pawn.getPossiblePositions({r: 2,c : 2},true);
      expect(array).toBeDefined();
      expect(array.length).toBe(4);
      expect(array).toContain({r : 3, c : 2});
      expect(array).toContain({r : 4, c : 2});
      expect(array).toContain({r : 3, c : 1});
      expect(array).toContain({r : 3, c : 3});

    });

    xit('should verify move of a pawn when it is not the first move.', function() {
      var pawn = pieceFactory.pawn;

      var array = pawn.getPossiblePositions({r: 3,c : 2},false);
      expect(array).toBeDefined();
      expect(array.length).toBe(3);
      expect(array).toContain({r : 4, c : 2});
      expect(array).toContain({r : 4, c : 1});
      expect(array).toContain({r : 4, c : 3});

    });

    xit('should verify move of a pawn when it is on the corner.', function() {
      var pawn = pieceFactory.pawn;

      var array = pawn.getPossiblePositions({r: 4,c : 1},false);
      expect(array).toBeDefined();
      expect(array.length).toBe(2);
      expect(array).toContain({r : 5, c : 1});
      expect(array).toContain({r : 5, c : 2});
      
    });

  });

});