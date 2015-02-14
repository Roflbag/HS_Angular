	


var app = angular.module('HearthStone_wiki', ['ngRoute']);

function hsController($scope,$http) {
    $http.get("test.json")
    .success(function(response) {$scope.names = response;});
}
