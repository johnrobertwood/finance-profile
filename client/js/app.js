var financeApp = angular.module('financeApp', [
  'ngRoute',
	'financeControllers',
  'financeServices'
]);

financeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/loginView.html',
        controller: 'LoginCtrl'
      })
      .when('/profile', {
        templateUrl: 'partials/profileView.html',
        controller: 'ProfileCtrl'
      })
      .when('/profile/edit', {
        templateUrl: 'partials/editView.html',
        controller: 'EditCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);