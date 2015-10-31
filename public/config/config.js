/** Setting the angular module **/

angular.module('Chess').config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('start', {
            url: '/start',
            templateUrl: 'views/start.html',
            controller: 'startCtrl'

        })

        .state('main', {
            url: '',
            templateUrl: 'views/main.html',
            abstract:true,
            controller: 'mainCtrl'
        })

        .state('main.chess', {
            url: '/chess',
            templateUrl: 'views/chess.html',
            controller: 'chessCtrl'

        })

		.state('main.chess.message', {
            url: '',
            templateUrl: 'views/message.html',
            controller: 'messageCtrl'
        })

        ;


});
