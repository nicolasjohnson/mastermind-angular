"use strict";

var app = angular.module('MastermindApp', []);

app.controller('MastermindController', function($scope) {

	//$scope.guesses = [[1,1,1,1]];
	$scope.guesses = [{'a1': '1', 'a2': '1', 'a3':'1', 'a4':'1'}]

    $scope.answer = [];

    //
    // Resets and initializes a new Mastermind game
    //
    $scope.clickStartNewGame = function() {
    	
    	$scope.guesses = [{a1:1,a2:1,a3:1,a4:1}];
    	$scope.answer = [1,1,1,1].map(function() {
    		return Math.floor(Math.random() * 6) + 1;
    	});

    }

    $scope.clickGuess = function(guess, index) {
    	guess[index]++;
    	if (guess[index] > 6) {
    		guess[index] = 1;
    	}
    }

});