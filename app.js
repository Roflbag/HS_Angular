


	var app = angular.module('HearthStone_wiki', ['ngRoute','ui.bootstrap']);





	function hsController($scope, $http) {
	    $http.get("hs_data.json")
	        .success(function(response) {
	            $scope.basic = response["Basic"];
	        });

	    $scope.showCard = function(card) {
	        if (card.collectible === true) {
	            return true;
	        }
	        return false;
	    }

	    $scope.filterBeast = function (){
	    	

	    	return "Beast";
	    };

	    function resetPage(){
	    	$route.reload();
	    }


	}
