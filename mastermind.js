"use strict";

var app = angular.module('MastermindApp', []);

app.controller('MastermindController', function($scope) {

	$scope.guesses = [];
    $scope.solution = [];
    $scope.hints = [];

    //
    // Resets and initializes a new Mastermind game
    //
    $scope.clickStartNewGame = function() {
    	
        $scope.guesses = [];
        $scope.guesses.push([1,1,1,1]);
    	//$scope.guesses = [{a1:1,a2:1,a3:1,a4:1}];
    	$scope.solution = [1,1,1,1].map(function() {
    		return Math.floor(Math.random() * 6) + 1;
    	});

    }

    $scope.clickGuess = function(row, index) {
        var value = $scope.guesses[row][index];
        value++;
        if (value > 6) { value = 1; }
        $scope.guesses[row][index] = value;
    }

    $scope.clickSubmitAnswer = function(index) {

        // Determine the results
        var results = calcuateResults($scope.solution.slice(0), $scope.guesses[index].slice(0));

        // Update the current guesses red/white indicators
        if (results['red'] != 4) {
            $scope.guesses.push($scope.guesses[index].slice(0));
        }

        $scope.hints.push({'red':results['red'], 'white':results['white']});

    }

    function calcuateResults(solution, guess) {

        var red = 0;
        var white = 0;
        var matched = [];

        // Filter out the reds
        guess.forEach(function(value, index) {
            if (guess[index] == solution[index]) {
                red++;
                matched.push(index);
            }
        });

        guess.forEach(function(value, outerIndex) {
            solution.forEach(function(value, innerIndex) {
                if (matched.indexOf(innerIndex) == -1) {
                    if (guess[outerIndex] == solution[innerIndex]) {
                        white++;
                        matched.push(innerIndex);
                    }
                }
            });
        });

        return {'red':red, 'white':white};

    }

});