(function () {
	'use strict';

	angular
		.module('App')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', 'Model'];
	function HomeController($scope, Model) {

		$scope.users = [];
		
		$scope.triggerHold = function(){
			//Trigger hold event first item
			ionic.trigger("hold", { target: document.getElementsByClassName("item")[0] });
		};

		$scope.$on('$ionicView.beforeEnter', function(){
			Model.Users.getAll().then(function (users) {
				$scope.users = angular.copy(users);
			});
		});
	}
})();