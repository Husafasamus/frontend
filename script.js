//const angular = require("angular");

var app = angular.module("blog-angular", []);
var controller = app.controller("baseController", ($scope, $http)=>{
    $scope.result = "empty";
    $scope.typeText = "";
    $scope.send = () => {
        $http.get("/api/").then( (response)=> {
            $scope.result = response.data;
            console.log($scope.result);

        });
    };

});