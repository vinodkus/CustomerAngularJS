(function () {
    //create module
    //will use ['ngRouter'] when we will implement router
    angular.module('MyApp', [])

       //Create Controller
       //here, $scope is used for same data between view and controller
       .controller('HomeController', function ($scope) {
           $scope.Message = "Welcome Angular JS Application";
       })
    
})();



