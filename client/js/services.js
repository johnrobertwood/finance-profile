var financeServices = angular.module('financeServices', []);

financeServices.factory('userService', ['$http', function () {

    var data = {
      email: '',
      password: ''
    }

    return {
      getUser: function () {
        return data;
      },
      setUser: function (email, password) {
        data.email = email;
        data.password = password;
      }
    };
}]);