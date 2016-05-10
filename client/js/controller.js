angular.module('financeController', []).

controller('ProfileCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  
  $scope.showLogin = true;
  $scope.showProfile = false;
  $scope.showEdit = false;

  $scope.userLogin = function() { 
    $http.post('/login', $scope.loginData).success(function(res) {
      $scope.user = res;
      if(res.success !== false) {
        $scope.showLogin = false
        $scope.showProfile = true
        $location.path('/login')
      }
    });
  };

  $scope.updateProfile = function() {
    $http.post('/profile/update', $scope.user).success(function(res) {
      $scope.user = res;
      if(res.success !== false) {
        $scope.showEdit = false;
        $scope.showProfile = true;
        $location.path('/profile/update')
      }
    })
  }

  $scope.editDetails = function() {
    $http.post('/profile/edit', $scope.user).success(function(res) {
      $scope.user = res;
      if(res.success !== false) {
        $scope.showProfile = false
        $scope.showEdit = true
        $location.path('/profile/edit')
      }
    })
  }

  $scope.userLogout = function() {
    $scope.user = {}
    $scope.showProfile = false
    $scope.showLogin = true;
  }

}]);

