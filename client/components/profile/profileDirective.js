angular.module('financeApp.profile', [])
.directive('profileDirective', [function(){
  return {
    templateUrl: "components/profile/profileView.html"
  }
}]);