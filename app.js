	


var app = angular.module('HearthStone_wiki', ['ngRoute']);

function hsController($scope, $http) {
    $http.get("hs_data.json")
    .success(function(response) {$scope.names = response;});
  }

