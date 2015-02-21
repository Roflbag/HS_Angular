var app = angular.module('HearthStone_wiki', ['ngRoute', 'ui.bootstrap', 'angularUtils.directives.dirPagination', 'ngAnimate']);



app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'aboutController',
            templateUrl: 'index.html'
        })
        .when('/gallery', {
            controller: 'hsController',
            templateUrl: 'gallery.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});


app.controller('aboutController', function($scope) {

});

app.controller('OtherController', OtherController);

function hsController($scope, $http) {


    $scope.currentPage = 1;
    $scope.pageSize = 4;


    $http.get("hs_data.json")
        .success(function(response) {
            $scope.basic = response["Basic"];
            $scope.basic.push.apply($scope.basic, response["Classic"]);
            $scope.basic.push.apply($scope.basic, response["Curse of Naxxramas"]);
            $scope.basic.push.apply($scope.basic, response["Goblins vs Gnomes"]);
            console.log($scope.basic);
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

    //Changes the Rarity text color based on card.rarity field; ng-style's parameter
    $scope.rarityColor = function(card) {
        if (card.rarity === "Free") {
            return "";
        } else if (card.rarity === "Common") {
            return "green";
        } else if (card.rarity === "Rare") {
            return "blue";
        } else if (card.rarity === "Epic") {
            return "purple";
        } else if (card.rarity === "Legendary") {
            return "orange";
        }
    }

    //true if the card is from GvG pack by checking if "GVG" is a substring in card.id
    $scope.nameGvgIcon = function(card) {
        if (card.id.indexOf("GVG") >= 0) {
            return true;
        } else {
            return false;
        }
    }

    //true if the card is from Naxx pack by checking if "GVG" is a substring in card.id
    $scope.nameNaxxIcon = function(card) {
        if (card.id.indexOf("FP") >= 0) {
            return true;
        } else {
            return false;
        }
    }

    $scope.getClass = function(card) {

        return card.playerClass;
    }
}

function OtherController($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
}
