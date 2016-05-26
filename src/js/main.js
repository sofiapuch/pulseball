var pulseballApp = angular.module('pulseballApp', []);

pulseballApp.controller('pulseballAppCtrl', ['$scope', '$http', function( $scope, $http) {
	
	$scope.errorLoading = false;
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
		$scope.errorLoading = true;
	};


	//get new match from server
	$scope.addMatch = function () {
		$scope.errorLoading = false;
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
		$scope.errorLoading = true;
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

		$scope.calculatePointsAmount(actualPoints, difference);
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

	$scope.calculatePointsAmount = function (actualPoints, difference) {

		var amount = 0;

		//home wins
		if ($scope.outcome == 'A') {
			amount = (1 - (difference/10));
			actualPoints[0] += amount; //home points
			actualPoints[1] -= amount; //away points
		}

		//away wins
		if ($scope.outcome == 'B') {
			amount = (1 + (difference/10));
			actualPoints[0] -= amount;
			actualPoints[1] += amount;
		}

		//draw
		if ($scope.outcome == 'D') {
			amount = difference/10;
			for (i=0; i<actualPoints.length; i++) {
				actualPoints[i] += amount;
			}
		}

		for (var i=0; i<$scope.teamIds.length; i++) {
			$scope.setNewPoints($scope.teamIds[i], actualPoints[i]);
		}

		$scope.sortNewRanking();

	};

	$scope.setNewPoints = function (id, newPoints) {
		angular.forEach($scope.ranking, function(value, key) {
			if(value.team.id == id) {
				value.pts = parseFloat(newPoints.toFixed(2));
			}	
		});
	};

	$scope.sortNewRanking = function () {
		$scope.ranking.sort(function( a, b) {
			return b.pts - a.pts;
		});
	};


}]);

