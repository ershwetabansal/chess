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
                $scope.chessArray = Square.getCurrentSituation();
                $scope.player1 = Player.getPlayers().white.name;
                $scope.player2 = Player.getPlayers().black.name;
                $scope.p1 = true;
                $scope.p2 = false;
                $scope.dropCallback = function(event, ui, square, col,row) {
                    col++; row++;
                    var oldCol = $scope.movedObj.col;
                    var oldRow = $scope.movedObj.row;
                    var outcome = Player.makeMove({r : oldRow, c : oldCol}, {r : row, c : col},$scope.movedObj.player);
                    if (outcome.gameOver === true) {
                        alert("Hurray !! game over");

                    }
                    // if (outcome.result === true) {
                        
                    // }
                    $scope.chessArray = Square.getCurrentSituation();
                        if (Player.getLastChancePlayer() ===$scope.player1) {
                            $scope.p2 = true;
                            $scope.p1 = false;
                        }
                        if (Player.getLastChancePlayer() ===$scope.player2) {
                            $scope.p2 = false;
                            $scope.p1 = true;
                        }
                    $("#square"+(row-1)+(col-1)).css('left','0');
                    $("#square"+(row-1)+(col-1)).css('top','0');
                    $("#square"+(oldRow-1)+(oldCol-1)).css('left','0');
                    $("#square"+(oldRow-1)+(oldCol-1)).css('top','0');
                    
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
