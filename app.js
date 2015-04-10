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

/*Disabling ngAnimate for carousel*/
app.directive('disableNgAnimate', ['$animate', function($animate) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            $animate.enabled(false, element);
        }
    };
}]);

app.controller('aboutController', function($scope) {

    $scope.myInterval = 5000;

    $scope.slides = [{
            image: 'http://3rd-strike.com/wp-content/uploads/2014/12/hearthstone-e1418840537516-588x250.jpg'
        },

        {
            image: 'http://3rd-strike.com/wp-content/uploads/2014/04/7IL9MFZERRW51397077736991-588x250.jpg'
        },

        {
            image: 'http://3rd-strike.com/wp-content/uploads/2014/11/goblins-vs-gnomes-588x250.jpg'
        }
    ];
});

app.controller('OtherController', OtherController);

function hsController($scope, $http) {


    $scope.currentPage = 1;
    $scope.pageSize = 4;
    $scope.filterCollectible = true;
    $scope.filterGold = false;




    $http.get("AllSets.json")
        .success(function(response) {
            $scope.basic = response["Basic"];
            $scope.basic.push.apply($scope.basic, response["Classic"]);
            $scope.basic.push.apply($scope.basic, response["Curse of Naxxramas"]);
            $scope.basic.push.apply($scope.basic, response["Goblins vs Gnomes"]);
            $scope.basic.push.apply($scope.basic, response["Reward"]);
            $scope.basic.push.apply($scope.basic, response["Promotion"]);
            $scope.basic.push.apply($scope.basic, response["Blackrock Mountain"]);
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
    
     $scope.nameBrmIcon = function(card) {
        if (card.id.indexOf("BRM") >= 0) {
            return true;
        } else {
            return false;
        }
    }

    $scope.getClass = function(card) {
        return card.playerClass;
    }

    $scope.swapCollectible = function(filterCollectible) {
        if (filterCollectible === true) {
            return undefined;
        } else {
            return true;
        }
    }

    $scope.enableButton = function(filterCollectible) {
        if (filterCollectible === true) {
            return true;
        }
    }

    $scope.disableCollectible = function(filterCollectible) {
        if (filterCollectible === undefined) {
            return true;
        }
    }

    $scope.collectibleBtnName = function(filterCollectible) {
        if (filterCollectible === true) {
            return "View Secret Cards!";
        } else if (filterCollectible === undefined) {
            return "Collectible Cards Only!"
        }
    }

    //Check if 'rarity' field is in card object
    $scope.cardHasRarityField = function(card) {
        if ('rarity' in card) {
            return true;
        } else {
            return false;
        }
    }

    $scope.goldenDisplay1 = function(filterGold) {

        if (filterGold === false) {
            return "original";
        } else if (filterGold === true) {
            return "animated";
        }
    }

    $scope.goldenDisplay2 = function(filterGold) {

        if (filterGold === false) {
            return ".png";
        } else if (filterGold === true) {
            return "_premium.gif";
        }
    }

    $scope.swapGold = function(filterGold) {
        if (filterGold === true) {
            return false;
        } else {
            return true;
        }
    }

    $scope.disableGold = function(filterGold) {
        if (filterGold === false) {
            return true;
        }
    }

    //Custom filter for type Enchantment and Hero Power
    $scope.filterEnchantmentAndHP = function(card) {
        if ($scope.filterGold === false) {
            return (card.type !== 'Enchantment');
        } else if ($scope.filterGold === true) {
            return ((card.type !== 'Enchantment') && (card.type !== 'Hero Power'));
        }
    }

    $scope.goldBtnName = function(filterGold) {
        if (filterGold === false) {
            return "Gold Cards";
        } else if (filterGold === true) {
            return "Normal Cards"
        }
    }

    $scope.collectibleText = function(card) {
        if (card.collectible === true) {
            return "Collectible";
        } else {
            return "Not Collectible"
        }
    }





}

function OtherController($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
}
