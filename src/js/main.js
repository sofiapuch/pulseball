var pulseballApp = angular.module('pulseballApp', []);

pulseballApp.controller('pulseballAppCtrl', ['$scope', '$http', function( $scope, $http) {
	

	//Pulseball init
	$scope.pulseballInit = function (rankingsJson) {

		console.log(rankingsJson);

		var successCallback = $scope.pulseballInitSuccess;
		var errorCallback = $scope.pulseballInitError;

		$http.get(rankingsJson).success(successCallback).error(errorCallback);

	};

	$scope.pulseballInitSuccess = function (response) {
		console.log("data: ", response);
		$scope.ranking = response;
	};

	$scope.pulseballInitError = function (response) {
		console.log("error loading ", rankingsJson);
	};












}]);

