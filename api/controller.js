var financeController = angular.module('financeController', []);

financeController.controller('FinanceCtrl', ['$scope', '$http', function($scope, $http) {
	// $http.get('/').success(function(res) {
	// 	// $scope.users = res;
	// 	console.log(res)
	// })

	$scope.userLogin = function() {	
		$http.post('/profile', $scope.loginData).success(function(res) {
			$scope.user = res;
			console.log(res)
		});
	};

}])