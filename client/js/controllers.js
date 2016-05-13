angular.module('financeControllers', [])

.controller('LoginCtrl', ['$scope', '$http', 'userService', function($scope, $http, userService) {
  
  $scope.userLogin = function() { 
    $http.post('/login', $scope.loginData).success(function(res) {
      userService.setUser(res.email, res.password);
      window.location.href = '#/profile';
    });
  };
}])

.controller('ProfileCtrl', ['$scope', '$http', 'userService', function($scope, $http, userService) {
  var userLogin = userService.getUser();

  $http.post('/login', userLogin).success(function(res) {
    $scope.user = res;
  });

  $scope.editDetails = function() {
    userService.setUser($scope.user.email, $scope.user.password);
    window.location.href = '#/profile/edit';
  };

  $scope.userLogout = function() {
    window.location.href = '#/login';
  };
}])

.controller('EditCtrl', ['$scope', '$http', 'userService', function($scope, $http, userService) {
  var userEdit = userService.getUser();

  $http.post('/login', userEdit).success(function(res) {
    $scope.user = res;
  });

  $scope.updateProfile = function() {
    $http.post('/profile/update', $scope.user).success(function(res) {  
      userService.setUser(res.email, res.password);
      window.location.href = '#/profile';
    });
  };
}]);  


