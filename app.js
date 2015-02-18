var app = angular.module('HearthStone_wiki', ['ngRoute', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);

app.controller('OtherController', OtherController);

function hsController($scope, $http) {


    $scope.currentPage = 1;
    $scope.pageSize = 4;



    $http.get("hs_data.json")
        .success(function(response) {
            $scope.basic = response["Basic"];
        });

    //for ng-show, show collectible cards only
    $scope.showCard = function(card) {
        if (card.collectible === true) {
            return true;
        }
        return false;
    }

    //for ng-show, show attack even if the card has 0 attack. Don't show if its a spell
    $scope.showZeroAttack = function(card) {
        if ((card.attack >= 0) && (card.type != "Spell")) {
            return true;
        }
        return false;
    }

    //for ng-show, show cost even if the card has 0 cost. Show for spells
    $scope.showZeroCost = function(card) {
        if (card.cost >= 0) {
            return true;
        }
        return false;
    }

     $scope.test = function() {
        console.log('IM HERE');
    }
}

function OtherController($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
}
