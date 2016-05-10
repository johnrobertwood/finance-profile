angular.module('financeApp.login', [])
.directive('loginDirective', [function(){
  return {
    templateUrl: "components/login/loginView.html"
  }
}]);