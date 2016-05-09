var financeApp = angular.module('financeApp', [
	'ngRoute', 
	'financeController'
]);

financeApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/login', {
		templateUrl: 'view-login/login.html',
		controller: 'ProfileCtrl'
	})
	.when('/profile', {
		templateUrl: 'view-profile/profile.html',
		controller: 'ProfileCtrl'
	})
	.when('/profile/edit', {
		templateUrl: 'view-edit/edit.html',
		controller: 'ProfileCtrl'
	})
	.otherwise({redirectTo: '/login'});
}]);