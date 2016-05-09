angular.module('financeController', ['ngRoute']).

controller('ProfileCtrl', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {

	$scope.userLogin = function() {	
		$http.post('/login', $scope.loginData).success(function(res) {
			$rootScope.user = res;
			if(res.success !== false) {
				$location.path('/profile')
			}
		});
	};

	$scope.editDetails = function() {
		$location.path('/profile/edit')
	}	

	$scope.userLogout = function() {
		$rootScope.user = {}
		$location.path('/login')
	}

	$scope.updateProfile = function() {
		$http.post('/profile/update', $scope.user).success(function(res) {
			$rootScope.user = res;
			if(res.success !== false) {
				$location.path('/profile')
			}
		})
	}
}]);

