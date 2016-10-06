// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'App' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('App', ['ionic', 'ngCordova', 'ngAnimate'])

.run(['$ionicPlatform', 
			'$sqliteService',
      function($ionicPlatform, $sqliteService) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
		
    //Load the Pre-populated database, debug = true
    $sqliteService.preloadDataBase(true);
  });
}])
.config(['$stateProvider',
         '$urlRouterProvider',
         '$ionicConfigProvider',
         '$compileProvider',
         function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {

    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content|ms-appx|x-wmapp0):|data:image\/|img\//);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
    
    $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS());
    
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "templates/home.html",
            controller: 'HomeController'
        });
        
    $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get("$state");
        $state.go("home");
    });
}]);

/* global ionic */
(function (angular, ionic) {
	"use strict";

	ionic.Platform.isIE = function () {
		return ionic.Platform.ua.toLowerCase().indexOf('trident') > -1;
	}

	if (ionic.Platform.isIE()) {
		angular.module('ionic')
			.factory('$ionicNgClick', ['$parse', '$timeout', function ($parse, $timeout) {
				return function (scope, element, clickExpr) {
					var clickHandler = angular.isFunction(clickExpr) ? clickExpr : $parse(clickExpr);

					element.on('click', function (event) {
						scope.$apply(function () {
							if (scope.clicktimer) return; // Second call
							clickHandler(scope, { $event: (event) });
							scope.clicktimer = $timeout(function () { delete scope.clicktimer; }, 1, false);
						});
					});

					// Hack for iOS Safari's benefit. It goes searching for onclick handlers and is liable to click
					// something else nearby.
					element.onclick = function (event) { };
				};
			}]);
	}

	function SelectDirective() {
		'use strict';

		return {
			restrict: 'E',
			replace: false,
			link: function (scope, element) {
				if (ionic.Platform && (ionic.Platform.isWindowsPhone() || ionic.Platform.isIE() || ionic.Platform.platform() === "edge")) {
					element.attr('data-tap-disabled', 'true');
				}
			}
		};
	}

	angular.module('ionic')
    .directive('select', SelectDirective);

	/*angular.module('ionic-datepicker')
	.directive('select', SelectDirective);*/

})(angular, ionic);
window.queries = [
	//Drop tables
   "DROP TABLE IF EXISTS Users;",
	//Create tables
	"CREATE TABLE Users (IdUser integer primary key autoincrement, Name text not null);",
	//Insert Users
	"INSERT INTO 'Users' ('Name') VALUES ('Juan David Nicholls Cardona');",
	"INSERT INTO 'Users' ('Name') VALUES ('Valentina Morato');",
	"INSERT INTO 'Users' ('Name') VALUES ('Yuliana García Morales');",
	"INSERT INTO 'Users' ('Name') VALUES ('Hans Parra');",
	"INSERT INTO 'Users' ('Name') VALUES ('Edwin Restrepo');",
	"INSERT INTO 'Users' ('Name') VALUES ('Jose Ripoll');",
	"INSERT INTO 'Users' ('Name') VALUES ('Jorge Serrano');",
	"INSERT INTO 'Users' ('Name') VALUES ('Osman Hoyos');",
	"INSERT INTO 'Users' ('Name') VALUES ('Khriztian Moreno Zuluaga');",
	"INSERT INTO 'Users' ('Name') VALUES ('Cristian Rivas Buitrago');",
	"INSERT INTO 'Users' ('Name') VALUES ('Juan David Sánchez');",
	"INSERT INTO 'Users' ('Name') VALUES ('Nicolas Molina');",
	"INSERT INTO 'Users' ('Name') VALUES ('Miyamoto Musashi FIlander');",
	"INSERT INTO 'Users' ('Name') VALUES ('Didier Hernandez');",
	"INSERT INTO 'Users' ('Name') VALUES ('Luis Eduardo Oquendo Pérez');",
	"INSERT INTO 'Users' ('Name') VALUES ('Carlos Rojas');",
	"INSERT INTO 'Users' ('Name') VALUES ('Levano Castilla Carlos Miguel');"
];
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
(function (TweenLite, Draggable) {
    'use strict';

    angular
        .module('App')
        .directive('draggable', draggable);

    draggable.$inject = ['$ionicGesture'];
    function draggable($ionicGesture) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                var dragger;
                var animation;

                $ionicGesture.on('hold', function (e) {

                    animation = TweenLite.to(element, 0.3, {
                        boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
                        force3D: true,
                        scale: 1.1
                    });
                    dragger = new Draggable(element, {
                        type: "y",
                        bounds: element.parent()[0],
                        edgeResistance: 1,
                        onPress: sortablePress,
                        onRelease: sortableRelease,
                        onDragStart: sortableDragStart,
                        onDrag: sortableDrag,
                        liveSnap: sortableSnap,
                        onDragEnd: sortableDragEnd
                    });
                    TweenLite.set(element, { color: "#88CE02" });
                }, element, { hold_threshold: 20 });

                function sortablePress() {
                    var t = this.target,
                        i = 0,
                        child = t;
                    while (child = child.previousSibling)
                        if (child.nodeType === 1) i++;
                    t.currentIndex = i;
                    t.currentHeight = t.offsetHeight;
                    t.kids = [].slice.call(t.parentNode.children); // convert to array       
                }

                function sortableDragStart() {
                    this.update();
                }

                function sortableDrag() {
                    var t = this.target,
                        elements = t.kids.slice(), // clone
                        indexChange = Math.round(this.y / t.currentHeight),
                        bound1 = t.currentIndex,
                        bound2 = bound1 + indexChange;
                    if (bound1 < bound2) { // moved down
                        TweenLite.to(elements.splice(bound1 + 1, bound2 - bound1), 0.15, { yPercent: -100 });
                        TweenLite.to(elements, 0.15, { yPercent: 0 });
                    } else if (bound1 === bound2) {
                        elements.splice(bound1, 1);
                        TweenLite.to(elements, 0.15, { yPercent: 0 });
                    } else { // moved up
                        TweenLite.to(elements.splice(bound2, bound1 - bound2), 0.15, { yPercent: 100 });
                        TweenLite.to(elements, 0.15, { yPercent: 0 });
                    }
                }

                function sortableSnap(y) {
                    var h = this.target.currentHeight;
                    return Math.round(y / h) * h;
                }

                function sortableDragEnd() {
                    var t = this.target,
                        max = t.kids.length - 1,
                        newIndex = Math.round(this.y / t.currentHeight);
                    newIndex += (newIndex < 0 ? -1 : 0) + t.currentIndex;
                    if (newIndex === max) {
                        t.parentNode.appendChild(t);
                    } else {
                        t.parentNode.insertBefore(t, t.kids[newIndex + 1]);
                    }
                    TweenLite.set(t.kids, { yPercent: 0, overwrite: "all" });
                    TweenLite.set(t, { y: 0, color: "" });
                    animation.reverse();
                    dragger.kill();
                }

                function sortableRelease() {

                }
            }
        };
    }
})(TweenLite, Draggable);
(function () {
	'use strict';

	angular
		.module('App')
		.factory('Modals', Modals);

	Modals.$inject = ['$ionicModal'];
	function Modals($ionicModal) {

		var modals = [];

		var _openModal = function ($scope, templateUrl, animation) {
			return $ionicModal.fromTemplateUrl(templateUrl, {
				scope: $scope,
				animation: animation || 'slide-in-up',
				backdropClickToClose: false
			}).then(function (modal) {
				modals.push(modal);
				modal.show();
			});
		};

		var _closeModal = function () {
			var currentModal = modals.splice(-1, 1)[0];
			currentModal.remove();
		};

		var _closeAllModals = function () {
			modals.map(function (modal) {
				modal.remove();
			});
			modals = [];
		};

		return {
			openModal: _openModal,
			closeModal: _closeModal,
			closeAllModals: _closeAllModals
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.factory('Model', Model);

	Model.$inject = ['Users'];
	function Model(Users) {

		return {
			Users: Users
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.service('$sqliteService', $sqliteService);

	$sqliteService.$inject = ['$q', '$cordovaSQLite'];
	function $sqliteService($q, $cordovaSQLite) {

		var self = this;
		var _db;

		self.db = function () {
			if (!_db) {
				if (window.sqlitePlugin !== undefined) {
					_db = window.sqlitePlugin.openDatabase({ name: "pre.db", location: 2, createFromLocation: 1 });
				} else {
					// For debugging in the browser
					_db = window.openDatabase("pre.db", "1.0", "Database", 200000);
				}
			}
			return _db;
		};

		self.getFirstItem = function (query, parameters) {
			var deferred = $q.defer();
			self.executeSql(query, parameters).then(function (res) {

				if (res.rows.length > 0)
					return deferred.resolve(res.rows.item(0));
				else
					return deferred.reject("There aren't items matching");
			}, function (err) {
				return deferred.reject(err);
			});

			return deferred.promise;
		};

		self.getFirstOrDefaultItem = function (query, parameters) {
			var deferred = $q.defer();
			self.executeSql(query, parameters).then(function (res) {

				if (res.rows.length > 0)
					return deferred.resolve(res.rows.item(0));
				else
					return deferred.resolve(null);
			}, function (err) {
				return deferred.reject(err);
			});

			return deferred.promise;
		};

		self.getItems = function (query, parameters) {
			var deferred = $q.defer();
			self.executeSql(query, parameters).then(function (res) {
				var items = [];
				for (var i = 0; i < res.rows.length; i++) {
					items.push(res.rows.item(i));
				}
				return deferred.resolve(items);
			}, function (err) {
				return deferred.reject(err);
			});

			return deferred.promise;
		};

		self.preloadDataBase = function (enableLog) {
			var deferred = $q.defer();

			//window.open("data:text/plain;charset=utf-8," + JSON.stringify({ data: window.queries.join('').replace(/\\n/g, '\n') }));
			if (window.sqlitePlugin === undefined) {
				enableLog && console.log('%c ***************** Starting the creation of the database in the browser ***************** ', 'background: #222; color: #bada55');
				self.db().transaction(function (tx) {
					for (var i = 0; i < window.queries.length; i++) {
						var query = window.queries[i].replace(/\\n/g, '\n');

						enableLog && console.log(window.queries[i]);
						tx.executeSql(query);
					}
				}, function (error) {
					deferred.reject(error);
				}, function () {
					enableLog && console.log('%c ***************** Completing the creation of the database in the browser ***************** ', 'background: #222; color: #bada55');
					deferred.resolve("OK");
				});
			}
			else {
				deferred.resolve("OK");
			}

			return deferred.promise;
		};

		self.executeSql = function (query, parameters) {
			return $cordovaSQLite.execute(self.db(), query, parameters);
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.factory('Users', Users);

	Users.$inject = ['$q', '$sqliteService'];
	function Users($q, $sqliteService) {

		return {
			getAll: function () {
				var query = "Select * FROM Users";
				return $q.when($sqliteService.getItems(query));
			},
			add: function (user) {
				var query = "INSERT INTO Users (Name) VALUES (?)";
				return $q.when($sqliteService.executeSql(query, [user.Name]));
			}
		};
	}
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImlzc3Vlcy5qcyIsInF1ZXJpZXMuanMiLCJjb250cm9sbGVycy9ob21lLmpzIiwiZGlyZWN0aXZlcy9kcmFnZ2FibGUuanMiLCJzZXJ2aWNlcy9tb2RhbHMuanMiLCJzZXJ2aWNlcy9tb2RlbC5qcyIsInNlcnZpY2VzL3NxbGl0ZS5qcyIsInNlcnZpY2VzL3VzZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ0FwcCcgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcbmFuZ3VsYXIubW9kdWxlKCdBcHAnLCBbJ2lvbmljJywgJ25nQ29yZG92YScsICduZ0FuaW1hdGUnXSlcblxuLnJ1bihbJyRpb25pY1BsYXRmb3JtJywgXG5cdFx0XHQnJHNxbGl0ZVNlcnZpY2UnLFxuICAgICAgZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0sICRzcWxpdGVTZXJ2aWNlKSB7XG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIGlmKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAvLyBmcm9tIHNuYXBwaW5nIHdoZW4gdGV4dCBpbnB1dHMgYXJlIGZvY3VzZWQuIElvbmljIGhhbmRsZXMgdGhpcyBpbnRlcm5hbGx5IGZvclxuICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICB9XG4gICAgaWYod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgIH1cblx0XHRcbiAgICAvL0xvYWQgdGhlIFByZS1wb3B1bGF0ZWQgZGF0YWJhc2UsIGRlYnVnID0gdHJ1ZVxuICAgICRzcWxpdGVTZXJ2aWNlLnByZWxvYWREYXRhQmFzZSh0cnVlKTtcbiAgfSk7XG59XSlcbi5jb25maWcoWyckc3RhdGVQcm92aWRlcicsXG4gICAgICAgICAnJHVybFJvdXRlclByb3ZpZGVyJyxcbiAgICAgICAgICckaW9uaWNDb25maWdQcm92aWRlcicsXG4gICAgICAgICAnJGNvbXBpbGVQcm92aWRlcicsXG4gICAgICAgICBmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGlvbmljQ29uZmlnUHJvdmlkZXIsICRjb21waWxlUHJvdmlkZXIpIHtcblxuICAgICRjb21waWxlUHJvdmlkZXIuaW1nU3JjU2FuaXRpemF0aW9uV2hpdGVsaXN0KC9eXFxzKihodHRwcz98ZnRwfGZpbGV8YmxvYnxjb250ZW50fG1zLWFwcHh8eC13bWFwcDApOnxkYXRhOmltYWdlXFwvfGltZ1xcLy8pO1xuICAgICRjb21waWxlUHJvdmlkZXIuYUhyZWZTYW5pdGl6YXRpb25XaGl0ZWxpc3QoL15cXHMqKGh0dHBzP3xmdHB8bWFpbHRvfGZpbGV8Z2h0dHBzP3xtcy1hcHB4fHgtd21hcHAwKTovKTtcbiAgICBcbiAgICAkaW9uaWNDb25maWdQcm92aWRlci5zY3JvbGxpbmcuanNTY3JvbGxpbmcoaW9uaWMuUGxhdGZvcm0uaXNJT1MoKSk7XG4gICAgXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICAgICAgdXJsOiBcIi9ob21lXCIsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvaG9tZS5odG1sXCIsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXInXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKGZ1bmN0aW9uICgkaW5qZWN0b3IsICRsb2NhdGlvbikge1xuICAgICAgICB2YXIgJHN0YXRlID0gJGluamVjdG9yLmdldChcIiRzdGF0ZVwiKTtcbiAgICAgICAgJHN0YXRlLmdvKFwiaG9tZVwiKTtcbiAgICB9KTtcbn1dKTtcbiIsIi8qIGdsb2JhbCBpb25pYyAqL1xuKGZ1bmN0aW9uIChhbmd1bGFyLCBpb25pYykge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRpb25pYy5QbGF0Zm9ybS5pc0lFID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBpb25pYy5QbGF0Zm9ybS51YS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ3RyaWRlbnQnKSA+IC0xO1xuXHR9XG5cblx0aWYgKGlvbmljLlBsYXRmb3JtLmlzSUUoKSkge1xuXHRcdGFuZ3VsYXIubW9kdWxlKCdpb25pYycpXG5cdFx0XHQuZmFjdG9yeSgnJGlvbmljTmdDbGljaycsIFsnJHBhcnNlJywgJyR0aW1lb3V0JywgZnVuY3Rpb24gKCRwYXJzZSwgJHRpbWVvdXQpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgY2xpY2tFeHByKSB7XG5cdFx0XHRcdFx0dmFyIGNsaWNrSGFuZGxlciA9IGFuZ3VsYXIuaXNGdW5jdGlvbihjbGlja0V4cHIpID8gY2xpY2tFeHByIDogJHBhcnNlKGNsaWNrRXhwcik7XG5cblx0XHRcdFx0XHRlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdFx0c2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHNjb3BlLmNsaWNrdGltZXIpIHJldHVybjsgLy8gU2Vjb25kIGNhbGxcblx0XHRcdFx0XHRcdFx0Y2xpY2tIYW5kbGVyKHNjb3BlLCB7ICRldmVudDogKGV2ZW50KSB9KTtcblx0XHRcdFx0XHRcdFx0c2NvcGUuY2xpY2t0aW1lciA9ICR0aW1lb3V0KGZ1bmN0aW9uICgpIHsgZGVsZXRlIHNjb3BlLmNsaWNrdGltZXI7IH0sIDEsIGZhbHNlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0Ly8gSGFjayBmb3IgaU9TIFNhZmFyaSdzIGJlbmVmaXQuIEl0IGdvZXMgc2VhcmNoaW5nIGZvciBvbmNsaWNrIGhhbmRsZXJzIGFuZCBpcyBsaWFibGUgdG8gY2xpY2tcblx0XHRcdFx0XHQvLyBzb21ldGhpbmcgZWxzZSBuZWFyYnkuXG5cdFx0XHRcdFx0ZWxlbWVudC5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7IH07XG5cdFx0XHRcdH07XG5cdFx0XHR9XSk7XG5cdH1cblxuXHRmdW5jdGlvbiBTZWxlY3REaXJlY3RpdmUoKSB7XG5cdFx0J3VzZSBzdHJpY3QnO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0XHRyZXBsYWNlOiBmYWxzZSxcblx0XHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCkge1xuXHRcdFx0XHRpZiAoaW9uaWMuUGxhdGZvcm0gJiYgKGlvbmljLlBsYXRmb3JtLmlzV2luZG93c1Bob25lKCkgfHwgaW9uaWMuUGxhdGZvcm0uaXNJRSgpIHx8IGlvbmljLlBsYXRmb3JtLnBsYXRmb3JtKCkgPT09IFwiZWRnZVwiKSkge1xuXHRcdFx0XHRcdGVsZW1lbnQuYXR0cignZGF0YS10YXAtZGlzYWJsZWQnLCAndHJ1ZScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdGFuZ3VsYXIubW9kdWxlKCdpb25pYycpXG4gICAgLmRpcmVjdGl2ZSgnc2VsZWN0JywgU2VsZWN0RGlyZWN0aXZlKTtcblxuXHQvKmFuZ3VsYXIubW9kdWxlKCdpb25pYy1kYXRlcGlja2VyJylcblx0LmRpcmVjdGl2ZSgnc2VsZWN0JywgU2VsZWN0RGlyZWN0aXZlKTsqL1xuXG59KShhbmd1bGFyLCBpb25pYyk7Iiwid2luZG93LnF1ZXJpZXMgPSBbXG5cdC8vRHJvcCB0YWJsZXNcbiAgIFwiRFJPUCBUQUJMRSBJRiBFWElTVFMgVXNlcnM7XCIsXG5cdC8vQ3JlYXRlIHRhYmxlc1xuXHRcIkNSRUFURSBUQUJMRSBVc2VycyAoSWRVc2VyIGludGVnZXIgcHJpbWFyeSBrZXkgYXV0b2luY3JlbWVudCwgTmFtZSB0ZXh0IG5vdCBudWxsKTtcIixcblx0Ly9JbnNlcnQgVXNlcnNcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0p1YW4gRGF2aWQgTmljaG9sbHMgQ2FyZG9uYScpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnVmFsZW50aW5hIE1vcmF0bycpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnWXVsaWFuYSBHYXJjw61hIE1vcmFsZXMnKTtcIixcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0hhbnMgUGFycmEnKTtcIixcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0Vkd2luIFJlc3RyZXBvJyk7XCIsXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdKb3NlIFJpcG9sbCcpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnSm9yZ2UgU2VycmFubycpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnT3NtYW4gSG95b3MnKTtcIixcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0tocml6dGlhbiBNb3Jlbm8gWnVsdWFnYScpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnQ3Jpc3RpYW4gUml2YXMgQnVpdHJhZ28nKTtcIixcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0p1YW4gRGF2aWQgU8OhbmNoZXonKTtcIixcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ05pY29sYXMgTW9saW5hJyk7XCIsXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdNaXlhbW90byBNdXNhc2hpIEZJbGFuZGVyJyk7XCIsXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdEaWRpZXIgSGVybmFuZGV6Jyk7XCIsXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdMdWlzIEVkdWFyZG8gT3F1ZW5kbyBQw6lyZXonKTtcIixcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0NhcmxvcyBSb2phcycpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnTGV2YW5vIENhc3RpbGxhIENhcmxvcyBNaWd1ZWwnKTtcIlxuXTsiLCIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoJ0FwcCcpXG5cdFx0LmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgSG9tZUNvbnRyb2xsZXIpO1xuXG5cdEhvbWVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICdNb2RlbCddO1xuXHRmdW5jdGlvbiBIb21lQ29udHJvbGxlcigkc2NvcGUsIE1vZGVsKSB7XG5cblx0XHQkc2NvcGUudXNlcnMgPSBbXTtcblx0XHRcblx0XHQkc2NvcGUudHJpZ2dlckhvbGQgPSBmdW5jdGlvbigpe1xuXHRcdFx0Ly9UcmlnZ2VyIGhvbGQgZXZlbnQgZmlyc3QgaXRlbVxuXHRcdFx0aW9uaWMudHJpZ2dlcihcImhvbGRcIiwgeyB0YXJnZXQ6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpdGVtXCIpWzBdIH0pO1xuXHRcdH07XG5cblx0XHQkc2NvcGUuJG9uKCckaW9uaWNWaWV3LmJlZm9yZUVudGVyJywgZnVuY3Rpb24oKXtcblx0XHRcdE1vZGVsLlVzZXJzLmdldEFsbCgpLnRoZW4oZnVuY3Rpb24gKHVzZXJzKSB7XG5cdFx0XHRcdCRzY29wZS51c2VycyA9IGFuZ3VsYXIuY29weSh1c2Vycyk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxufSkoKTsiLCIoZnVuY3Rpb24gKFR3ZWVuTGl0ZSwgRHJhZ2dhYmxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ0FwcCcpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnZHJhZ2dhYmxlJywgZHJhZ2dhYmxlKTtcclxuXHJcbiAgICBkcmFnZ2FibGUuJGluamVjdCA9IFsnJGlvbmljR2VzdHVyZSddO1xyXG4gICAgZnVuY3Rpb24gZHJhZ2dhYmxlKCRpb25pY0dlc3R1cmUpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRyYWdnZXI7XHJcbiAgICAgICAgICAgICAgICB2YXIgYW5pbWF0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgICRpb25pY0dlc3R1cmUub24oJ2hvbGQnLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24gPSBUd2VlbkxpdGUudG8oZWxlbWVudCwgMC4zLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogXCJyZ2JhKDAsMCwwLDAuMikgMHB4IDE2cHggMzJweCAwcHhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yY2UzRDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGU6IDEuMVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdnZXIgPSBuZXcgRHJhZ2dhYmxlKGVsZW1lbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kczogZWxlbWVudC5wYXJlbnQoKVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRnZVJlc2lzdGFuY2U6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUHJlc3M6IHNvcnRhYmxlUHJlc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVsZWFzZTogc29ydGFibGVSZWxlYXNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdTdGFydDogc29ydGFibGVEcmFnU3RhcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRHJhZzogc29ydGFibGVEcmFnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXZlU25hcDogc29ydGFibGVTbmFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdFbmQ6IHNvcnRhYmxlRHJhZ0VuZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS5zZXQoZWxlbWVudCwgeyBjb2xvcjogXCIjODhDRTAyXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCBlbGVtZW50LCB7IGhvbGRfdGhyZXNob2xkOiAyMCB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzb3J0YWJsZVByZXNzKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGNoaWxkID0gY2hpbGQucHJldmlvdXNTaWJsaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IDEpIGkrKztcclxuICAgICAgICAgICAgICAgICAgICB0LmN1cnJlbnRJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5jdXJyZW50SGVpZ2h0ID0gdC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5raWRzID0gW10uc2xpY2UuY2FsbCh0LnBhcmVudE5vZGUuY2hpbGRyZW4pOyAvLyBjb252ZXJ0IHRvIGFycmF5ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNvcnRhYmxlRHJhZ1N0YXJ0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc29ydGFibGVEcmFnKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gdC5raWRzLnNsaWNlKCksIC8vIGNsb25lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4Q2hhbmdlID0gTWF0aC5yb3VuZCh0aGlzLnkgLyB0LmN1cnJlbnRIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZDEgPSB0LmN1cnJlbnRJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm91bmQyID0gYm91bmQxICsgaW5kZXhDaGFuZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvdW5kMSA8IGJvdW5kMikgeyAvLyBtb3ZlZCBkb3duXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhlbGVtZW50cy5zcGxpY2UoYm91bmQxICsgMSwgYm91bmQyIC0gYm91bmQxKSwgMC4xNSwgeyB5UGVyY2VudDogLTEwMCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVHdlZW5MaXRlLnRvKGVsZW1lbnRzLCAwLjE1LCB7IHlQZXJjZW50OiAwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm91bmQxID09PSBib3VuZDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMuc3BsaWNlKGJvdW5kMSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhlbGVtZW50cywgMC4xNSwgeyB5UGVyY2VudDogMCB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBtb3ZlZCB1cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUd2VlbkxpdGUudG8oZWxlbWVudHMuc3BsaWNlKGJvdW5kMiwgYm91bmQxIC0gYm91bmQyKSwgMC4xNSwgeyB5UGVyY2VudDogMTAwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUd2VlbkxpdGUudG8oZWxlbWVudHMsIDAuMTUsIHsgeVBlcmNlbnQ6IDAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNvcnRhYmxlU25hcCh5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGggPSB0aGlzLnRhcmdldC5jdXJyZW50SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHkgLyBoKSAqIGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc29ydGFibGVEcmFnRW5kKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heCA9IHQua2lkcy5sZW5ndGggLSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdJbmRleCA9IE1hdGgucm91bmQodGhpcy55IC8gdC5jdXJyZW50SGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdJbmRleCArPSAobmV3SW5kZXggPCAwID8gLTEgOiAwKSArIHQuY3VycmVudEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdJbmRleCA9PT0gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHQsIHQua2lkc1tuZXdJbmRleCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgVHdlZW5MaXRlLnNldCh0LmtpZHMsIHsgeVBlcmNlbnQ6IDAsIG92ZXJ3cml0ZTogXCJhbGxcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICBUd2VlbkxpdGUuc2V0KHQsIHsgeTogMCwgY29sb3I6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBkcmFnZ2VyLmtpbGwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzb3J0YWJsZVJlbGVhc2UoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSkoVHdlZW5MaXRlLCBEcmFnZ2FibGUpOyIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuZmFjdG9yeSgnTW9kYWxzJywgTW9kYWxzKTtcblxuXHRNb2RhbHMuJGluamVjdCA9IFsnJGlvbmljTW9kYWwnXTtcblx0ZnVuY3Rpb24gTW9kYWxzKCRpb25pY01vZGFsKSB7XG5cblx0XHR2YXIgbW9kYWxzID0gW107XG5cblx0XHR2YXIgX29wZW5Nb2RhbCA9IGZ1bmN0aW9uICgkc2NvcGUsIHRlbXBsYXRlVXJsLCBhbmltYXRpb24pIHtcblx0XHRcdHJldHVybiAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwodGVtcGxhdGVVcmwsIHtcblx0XHRcdFx0c2NvcGU6ICRzY29wZSxcblx0XHRcdFx0YW5pbWF0aW9uOiBhbmltYXRpb24gfHwgJ3NsaWRlLWluLXVwJyxcblx0XHRcdFx0YmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlXG5cdFx0XHR9KS50aGVuKGZ1bmN0aW9uIChtb2RhbCkge1xuXHRcdFx0XHRtb2RhbHMucHVzaChtb2RhbCk7XG5cdFx0XHRcdG1vZGFsLnNob3coKTtcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHR2YXIgX2Nsb3NlTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgY3VycmVudE1vZGFsID0gbW9kYWxzLnNwbGljZSgtMSwgMSlbMF07XG5cdFx0XHRjdXJyZW50TW9kYWwucmVtb3ZlKCk7XG5cdFx0fTtcblxuXHRcdHZhciBfY2xvc2VBbGxNb2RhbHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRtb2RhbHMubWFwKGZ1bmN0aW9uIChtb2RhbCkge1xuXHRcdFx0XHRtb2RhbC5yZW1vdmUoKTtcblx0XHRcdH0pO1xuXHRcdFx0bW9kYWxzID0gW107XG5cdFx0fTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRvcGVuTW9kYWw6IF9vcGVuTW9kYWwsXG5cdFx0XHRjbG9zZU1vZGFsOiBfY2xvc2VNb2RhbCxcblx0XHRcdGNsb3NlQWxsTW9kYWxzOiBfY2xvc2VBbGxNb2RhbHNcblx0XHR9O1xuXHR9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuZmFjdG9yeSgnTW9kZWwnLCBNb2RlbCk7XG5cblx0TW9kZWwuJGluamVjdCA9IFsnVXNlcnMnXTtcblx0ZnVuY3Rpb24gTW9kZWwoVXNlcnMpIHtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRVc2VyczogVXNlcnNcblx0XHR9O1xuXHR9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuc2VydmljZSgnJHNxbGl0ZVNlcnZpY2UnLCAkc3FsaXRlU2VydmljZSk7XG5cblx0JHNxbGl0ZVNlcnZpY2UuJGluamVjdCA9IFsnJHEnLCAnJGNvcmRvdmFTUUxpdGUnXTtcblx0ZnVuY3Rpb24gJHNxbGl0ZVNlcnZpY2UoJHEsICRjb3Jkb3ZhU1FMaXRlKSB7XG5cblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0dmFyIF9kYjtcblxuXHRcdHNlbGYuZGIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoIV9kYikge1xuXHRcdFx0XHRpZiAod2luZG93LnNxbGl0ZVBsdWdpbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0X2RiID0gd2luZG93LnNxbGl0ZVBsdWdpbi5vcGVuRGF0YWJhc2UoeyBuYW1lOiBcInByZS5kYlwiLCBsb2NhdGlvbjogMiwgY3JlYXRlRnJvbUxvY2F0aW9uOiAxIH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEZvciBkZWJ1Z2dpbmcgaW4gdGhlIGJyb3dzZXJcblx0XHRcdFx0XHRfZGIgPSB3aW5kb3cub3BlbkRhdGFiYXNlKFwicHJlLmRiXCIsIFwiMS4wXCIsIFwiRGF0YWJhc2VcIiwgMjAwMDAwKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIF9kYjtcblx0XHR9O1xuXG5cdFx0c2VsZi5nZXRGaXJzdEl0ZW0gPSBmdW5jdGlvbiAocXVlcnksIHBhcmFtZXRlcnMpIHtcblx0XHRcdHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cdFx0XHRzZWxmLmV4ZWN1dGVTcWwocXVlcnksIHBhcmFtZXRlcnMpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuXG5cdFx0XHRcdGlmIChyZXMucm93cy5sZW5ndGggPiAwKVxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZXNvbHZlKHJlcy5yb3dzLml0ZW0oMCkpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdChcIlRoZXJlIGFyZW4ndCBpdGVtcyBtYXRjaGluZ1wiKTtcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdChlcnIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXHRcdH07XG5cblx0XHRzZWxmLmdldEZpcnN0T3JEZWZhdWx0SXRlbSA9IGZ1bmN0aW9uIChxdWVyeSwgcGFyYW1ldGVycykge1xuXHRcdFx0dmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblx0XHRcdHNlbGYuZXhlY3V0ZVNxbChxdWVyeSwgcGFyYW1ldGVycykudGhlbihmdW5jdGlvbiAocmVzKSB7XG5cblx0XHRcdFx0aWYgKHJlcy5yb3dzLmxlbmd0aCA+IDApXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlc29sdmUocmVzLnJvd3MuaXRlbSgwKSk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVzb2x2ZShudWxsKTtcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdChlcnIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXHRcdH07XG5cblx0XHRzZWxmLmdldEl0ZW1zID0gZnVuY3Rpb24gKHF1ZXJ5LCBwYXJhbWV0ZXJzKSB7XG5cdFx0XHR2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXHRcdFx0c2VsZi5leGVjdXRlU3FsKHF1ZXJ5LCBwYXJhbWV0ZXJzKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcblx0XHRcdFx0dmFyIGl0ZW1zID0gW107XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcmVzLnJvd3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpdGVtcy5wdXNoKHJlcy5yb3dzLml0ZW0oaSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZXNvbHZlKGl0ZW1zKTtcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdChlcnIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXHRcdH07XG5cblx0XHRzZWxmLnByZWxvYWREYXRhQmFzZSA9IGZ1bmN0aW9uIChlbmFibGVMb2cpIHtcblx0XHRcdHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cblx0XHRcdC8vd2luZG93Lm9wZW4oXCJkYXRhOnRleHQvcGxhaW47Y2hhcnNldD11dGYtOCxcIiArIEpTT04uc3RyaW5naWZ5KHsgZGF0YTogd2luZG93LnF1ZXJpZXMuam9pbignJykucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpIH0pKTtcblx0XHRcdGlmICh3aW5kb3cuc3FsaXRlUGx1Z2luID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0ZW5hYmxlTG9nICYmIGNvbnNvbGUubG9nKCclYyAqKioqKioqKioqKioqKioqKiBTdGFydGluZyB0aGUgY3JlYXRpb24gb2YgdGhlIGRhdGFiYXNlIGluIHRoZSBicm93c2VyICoqKioqKioqKioqKioqKioqICcsICdiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NScpO1xuXHRcdFx0XHRzZWxmLmRiKCkudHJhbnNhY3Rpb24oZnVuY3Rpb24gKHR4KSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB3aW5kb3cucXVlcmllcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIHF1ZXJ5ID0gd2luZG93LnF1ZXJpZXNbaV0ucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpO1xuXG5cdFx0XHRcdFx0XHRlbmFibGVMb2cgJiYgY29uc29sZS5sb2cod2luZG93LnF1ZXJpZXNbaV0pO1xuXHRcdFx0XHRcdFx0dHguZXhlY3V0ZVNxbChxdWVyeSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCBmdW5jdGlvbiAoZXJyb3IpIHtcblx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyb3IpO1xuXHRcdFx0XHR9LCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0ZW5hYmxlTG9nICYmIGNvbnNvbGUubG9nKCclYyAqKioqKioqKioqKioqKioqKiBDb21wbGV0aW5nIHRoZSBjcmVhdGlvbiBvZiB0aGUgZGF0YWJhc2UgaW4gdGhlIGJyb3dzZXIgKioqKioqKioqKioqKioqKiogJywgJ2JhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1Jyk7XG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShcIk9LXCIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKFwiT0tcIik7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXHRcdH07XG5cblx0XHRzZWxmLmV4ZWN1dGVTcWwgPSBmdW5jdGlvbiAocXVlcnksIHBhcmFtZXRlcnMpIHtcblx0XHRcdHJldHVybiAkY29yZG92YVNRTGl0ZS5leGVjdXRlKHNlbGYuZGIoKSwgcXVlcnksIHBhcmFtZXRlcnMpO1xuXHRcdH07XG5cdH1cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5mYWN0b3J5KCdVc2VycycsIFVzZXJzKTtcblxuXHRVc2Vycy4kaW5qZWN0ID0gWyckcScsICckc3FsaXRlU2VydmljZSddO1xuXHRmdW5jdGlvbiBVc2VycygkcSwgJHNxbGl0ZVNlcnZpY2UpIHtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRnZXRBbGw6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIHF1ZXJ5ID0gXCJTZWxlY3QgKiBGUk9NIFVzZXJzXCI7XG5cdFx0XHRcdHJldHVybiAkcS53aGVuKCRzcWxpdGVTZXJ2aWNlLmdldEl0ZW1zKHF1ZXJ5KSk7XG5cdFx0XHR9LFxuXHRcdFx0YWRkOiBmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0XHR2YXIgcXVlcnkgPSBcIklOU0VSVCBJTlRPIFVzZXJzIChOYW1lKSBWQUxVRVMgKD8pXCI7XG5cdFx0XHRcdHJldHVybiAkcS53aGVuKCRzcWxpdGVTZXJ2aWNlLmV4ZWN1dGVTcWwocXVlcnksIFt1c2VyLk5hbWVdKSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
