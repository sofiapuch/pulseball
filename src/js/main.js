var pulseballApp = angular.module('pulseballApp', []);

pulseballApp.controller('pulseballAppCtrl', ['$scope', '$http', function( $scope, $http) {
	
	$scope.ranking = [];

	$scope.outcome = '';
	$scope.teamIds = [];

	//method to read jsons coming from server
	$scope.getJsonFromUrl = function (url, successCallback, errorCallback) {
		$http.get(url).success(successCallback).error(errorCallback);
	};

	//Pulseball init
	$scope.pulseballInit = function (rankingsJson) {
		$scope.getJsonFromUrl( rankingsJson,  $scope.pulseballInitSuccess, $scope.pulseballInitError);

	};

	$scope.pulseballInitSuccess = function (response) {
		$scope.ranking = response;
	};

	$scope.pulseballInitError = function (response) {
		console.log("error loading init");
	};


	//get new match from server
	$scope.addMatch = function () {
		$scope.getJsonFromUrl( $scope.newMatch,  $scope.addMatchSuccess, $scope.addMatchError);
	};


	$scope.addMatchSuccess = function (response) {

		console.log(response);

		$scope.outcome = response.outcome;

		if($scope.outcome != 'N') {

			angular.forEach(response.teams, function(value, key) {
			  	this.push(value.id);
			}, $scope.teamIds);

			$scope.calculateRatingDifference();
		}

	};

	$scope.addMatchError = function (response) {
		console.log("error loading match");
	};

	$scope.calculateRatingDifference = function () {

		var actualPoints = [];
		for (var i=0; i<$scope.teamIds.length; i++) {
			actualPoints[i] = $scope.getActualPoints($scope.teamIds[i]);
		}

		var difference = (actualPoints[0] + 3) - actualPoints[1];
		//round to two decimals
		difference = difference.toFixed(2);

		if (difference > 10) difference = 10;
		if (difference < -10) difference = -10;

		console.log(difference);

		
		


	};

	$scope.getActualPoints = function(id) {

		var points = 0;

		angular.forEach($scope.ranking, function(value, key) {
			if(value.team.id == id) {
				points = value.pts;
			}	
		});
		return points;
	};








		/*

		//home wins
		if (outcome == 'A') {

		}

		//away wins
		if (outcome == 'B') {

		}

		//draw
		if (outcome == 'D') {

		}

		*/




}]);

