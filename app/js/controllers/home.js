(function () {
	'use strict';

	angular
		.module('App')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', 'Model', '$ionicPlatform'];
	function HomeController($scope, Model, $ionicPlatform) {

		$scope.users = [];
		
		$scope.triggerHold = function(){
			//Trigger hold event first item
			ionic.trigger("hold", { target: document.getElementsByClassName("item")[0] });
		};

		$scope.$on('$ionicView.beforeEnter', function(){
			$ionicPlatform.ready(function () {
				Model.Users.getAll().then(function (users) {
					$scope.users = angular.copy(users);
				});
			});
		});
	}
})();