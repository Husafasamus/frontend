//const angular = require("angular");

var app = angular.module("blog-angular", []);
var controller = app.controller("baseController", ($scope, $http)=>{
    $scope.result = "empty";
    $scope.blogs = [
        [
            {
                title: "Vystup na Polom",
                text: "askjdfhasdfklasjdfh"
            },
            {
                title: "Vystua Polom1",
                text: "askjdfhasdfklasjdfh"
            },
            {
                title: "Vystua Polom2",
                text: "askjdfhasdfklasjdfh"
            }
        ],
        [
            {
                title: "Vystup na Polom",
                text: "askjdfhasdfklasjdfh"
            },
            {
                title: "Vystua Polom1",
                text: "askjdfhasdfklasjdfh"
            },
            {
                title: "Vystua Polom2",
                text: "askjdfhasdfklasjdfh"
            }
        ],
        [
            {
                title: "Vystup na Polom",
                text: "askjdfhasdfklasjdfh"
            },
            {
                title: "Vystua Polom1",
                text: "askjdfhasdfklasjdfh"
            },
            {
                title: "Vystua Polom2",
                text: "askjdfhasdfklasjdfh"
            }
        ]
      
    ]; 
    
    $scope.send = () => {
        $http.get("/api/").then( (response)=> {
            $scope.result = response.data;
            console.log($scope.result);

        });
    };

});