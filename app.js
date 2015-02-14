	


  var app = angular.module('HearthStone_wiki', ['ngRoute']);

  app.service("hsService", function($http, $q)
  {
    var deferred = $q.defer();
    $http.get('hs_data.json').then(function(data){
      deffered.resolve(data);
    });

    this.getPlayers = function(){
      return deffered.promise;
    }
  })

  .controller("hsController", function($scope, hsService){
    var promist=hsService.getPlayers();
    promose.then(function(data){
      $scope.team = data;
      console.log($scope.team);
    })})

