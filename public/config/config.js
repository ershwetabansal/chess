/** Setting the angular module **/

angular.module('Chess').config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('start', {
            url: '/',
            templateUrl: 'views/start.html',
            controller: function($scope,$state,Player) {
                $scope.startGame = function() {
                    Player.createPlayers($scope.player1,$scope.player2);
                    Player.startNewGame();
                    $state.transitionTo('main');
                }
            }

        })

        .state('main', {
            url: '/chess',
            templateUrl: 'views/chess.html',
            controller: function($scope,Player,Square,Piece) {
                var board = Square.getCurrentSituation();
                $scope.player1 = Player.getPlayers().white.name;
                $scope.player2 = Player.getPlayers().black.name;
                $scope.p1 = true;
                $scope.p2 = false;
                $scope.chessArray = [];
                for (var row in board) {
                    var chessRow = [];
                    for (var square in board[row]) {
                        var obj = board[row][square];
                        obj.drop = true;
                        obj.image = "";
                        obj.fill = false;
                        if (obj.piece) {
                            obj.image = obj.piece + "_" + obj.player + ".png";
                            obj.fill = true;
                        }
                        obj.class = 'white';
                        if (row%2===1) {
                            if (square%2==0) obj.class ='black';
                        } else {
                            if (square%2!=0) obj.class = 'black';
                        }
                            
                        chessRow.push(obj);
                    }
                    $scope.chessArray.push(chessRow);
                }
                
                $scope.dropCallback = function(event, ui, square, col,row) {
                    col++; row++;
                    var oldCol = $scope.movedObj.col;
                    var oldRow = $scope.movedObj.row;
                    var outcome = Player.makeMove({r : oldRow, c : oldCol}, {r : row, c : col},$scope.movedObj.player);
                    if (outcome.result === true) {
                        $scope.chessArray[row-1][col-1].piece = $scope.movedObj.piece;
                        $scope.chessArray[row-1][col-1].player = $scope.movedObj.player;
                        $scope.chessArray[row-1][col-1].image = $scope.movedObj.image;
                        $scope.chessArray[row-1][col-1].fill = true;
                        $("#square"+(row-1)+(col-1)).css('left','0');
                        $("#square"+(row-1)+(col-1)).css('top','0');

                        $scope.chessArray[oldRow-1][oldCol - 1].piece = '';
                        $scope.chessArray[oldRow-1][oldCol - 1].player = '';
                        $scope.chessArray[oldRow-1][oldCol - 1].image = '';
                        $scope.chessArray[oldRow-1][oldCol - 1].fill = false;
                        if (Player.getLastChancePlayer() ===$scope.player1) {
                            $scope.p2 = true;
                            $scope.p1 = false;
                        }
                        if (Player.getLastChancePlayer() ===$scope.player2) {
                            $scope.p2 = false;
                            $scope.p1 = true;
                        }
                    } else {
                        $("#square"+(oldRow-1)+(oldCol-1)).css('left','0');
                        $("#square"+(oldRow-1)+(oldCol-1)).css('top','0');
                    }
                    $scope.message = outcome.message;
                };
                $scope.dragCallback = function(event, ui, square, col,row) {
                    col++; row++;
                    square.row = row;
                    square.col = col;
                    $scope.movedObj = square; 
                };
                
            }
        })

		
        ;


});
