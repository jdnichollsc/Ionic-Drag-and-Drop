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
                        autoScroll: 1,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImlzc3Vlcy5qcyIsInF1ZXJpZXMuanMiLCJzZXJ2aWNlcy9tb2RhbHMuanMiLCJzZXJ2aWNlcy9tb2RlbC5qcyIsInNlcnZpY2VzL3NxbGl0ZS5qcyIsInNlcnZpY2VzL3VzZXJzLmpzIiwiY29udHJvbGxlcnMvaG9tZS5qcyIsImRpcmVjdGl2ZXMvZHJhZ2dhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnQXBwJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuYW5ndWxhci5tb2R1bGUoJ0FwcCcsIFsnaW9uaWMnLCAnbmdDb3Jkb3ZhJywgJ25nQW5pbWF0ZSddKVxuXG4ucnVuKFsnJGlvbmljUGxhdGZvcm0nLCBcblx0XHRcdCckc3FsaXRlU2VydmljZScsXG4gICAgICBmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSwgJHNxbGl0ZVNlcnZpY2UpIHtcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgIH1cbiAgICBpZih3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgfVxuXHRcdFxuICAgIC8vTG9hZCB0aGUgUHJlLXBvcHVsYXRlZCBkYXRhYmFzZSwgZGVidWcgPSB0cnVlXG4gICAgJHNxbGl0ZVNlcnZpY2UucHJlbG9hZERhdGFCYXNlKHRydWUpO1xuICB9KTtcbn1dKVxuLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJyxcbiAgICAgICAgICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgICAgICAgJyRpb25pY0NvbmZpZ1Byb3ZpZGVyJyxcbiAgICAgICAgICckY29tcGlsZVByb3ZpZGVyJyxcbiAgICAgICAgIGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkaW9uaWNDb25maWdQcm92aWRlciwgJGNvbXBpbGVQcm92aWRlcikge1xuXG4gICAgJGNvbXBpbGVQcm92aWRlci5pbWdTcmNTYW5pdGl6YXRpb25XaGl0ZWxpc3QoL15cXHMqKGh0dHBzP3xmdHB8ZmlsZXxibG9ifGNvbnRlbnR8bXMtYXBweHx4LXdtYXBwMCk6fGRhdGE6aW1hZ2VcXC98aW1nXFwvLyk7XG4gICAgJGNvbXBpbGVQcm92aWRlci5hSHJlZlNhbml0aXphdGlvbldoaXRlbGlzdCgvXlxccyooaHR0cHM/fGZ0cHxtYWlsdG98ZmlsZXxnaHR0cHM/fG1zLWFwcHh8eC13bWFwcDApOi8pO1xuICAgIFxuICAgICRpb25pY0NvbmZpZ1Byb3ZpZGVyLnNjcm9sbGluZy5qc1Njcm9sbGluZyhpb25pYy5QbGF0Zm9ybS5pc0lPUygpKTtcbiAgICBcbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgICB1cmw6IFwiL2hvbWVcIixcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9ob21lLmh0bWxcIixcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlcidcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoZnVuY3Rpb24gKCRpbmplY3RvciwgJGxvY2F0aW9uKSB7XG4gICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuZ2V0KFwiJHN0YXRlXCIpO1xuICAgICAgICAkc3RhdGUuZ28oXCJob21lXCIpO1xuICAgIH0pO1xufV0pO1xuIiwiLyogZ2xvYmFsIGlvbmljICovXG4oZnVuY3Rpb24gKGFuZ3VsYXIsIGlvbmljKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGlvbmljLlBsYXRmb3JtLmlzSUUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIGlvbmljLlBsYXRmb3JtLnVhLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigndHJpZGVudCcpID4gLTE7XG5cdH1cblxuXHRpZiAoaW9uaWMuUGxhdGZvcm0uaXNJRSgpKSB7XG5cdFx0YW5ndWxhci5tb2R1bGUoJ2lvbmljJylcblx0XHRcdC5mYWN0b3J5KCckaW9uaWNOZ0NsaWNrJywgWyckcGFyc2UnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbiAoJHBhcnNlLCAkdGltZW91dCkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBjbGlja0V4cHIpIHtcblx0XHRcdFx0XHR2YXIgY2xpY2tIYW5kbGVyID0gYW5ndWxhci5pc0Z1bmN0aW9uKGNsaWNrRXhwcikgPyBjbGlja0V4cHIgOiAkcGFyc2UoY2xpY2tFeHByKTtcblxuXHRcdFx0XHRcdGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRpZiAoc2NvcGUuY2xpY2t0aW1lcikgcmV0dXJuOyAvLyBTZWNvbmQgY2FsbFxuXHRcdFx0XHRcdFx0XHRjbGlja0hhbmRsZXIoc2NvcGUsIHsgJGV2ZW50OiAoZXZlbnQpIH0pO1xuXHRcdFx0XHRcdFx0XHRzY29wZS5jbGlja3RpbWVyID0gJHRpbWVvdXQoZnVuY3Rpb24gKCkgeyBkZWxldGUgc2NvcGUuY2xpY2t0aW1lcjsgfSwgMSwgZmFsc2UpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvLyBIYWNrIGZvciBpT1MgU2FmYXJpJ3MgYmVuZWZpdC4gSXQgZ29lcyBzZWFyY2hpbmcgZm9yIG9uY2xpY2sgaGFuZGxlcnMgYW5kIGlzIGxpYWJsZSB0byBjbGlja1xuXHRcdFx0XHRcdC8vIHNvbWV0aGluZyBlbHNlIG5lYXJieS5cblx0XHRcdFx0XHRlbGVtZW50Lm9uY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHsgfTtcblx0XHRcdFx0fTtcblx0XHRcdH1dKTtcblx0fVxuXG5cdGZ1bmN0aW9uIFNlbGVjdERpcmVjdGl2ZSgpIHtcblx0XHQndXNlIHN0cmljdCc7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHRcdHJlcGxhY2U6IGZhbHNlLFxuXHRcdFx0bGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50KSB7XG5cdFx0XHRcdGlmIChpb25pYy5QbGF0Zm9ybSAmJiAoaW9uaWMuUGxhdGZvcm0uaXNXaW5kb3dzUGhvbmUoKSB8fCBpb25pYy5QbGF0Zm9ybS5pc0lFKCkgfHwgaW9uaWMuUGxhdGZvcm0ucGxhdGZvcm0oKSA9PT0gXCJlZGdlXCIpKSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5hdHRyKCdkYXRhLXRhcC1kaXNhYmxlZCcsICd0cnVlJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0YW5ndWxhci5tb2R1bGUoJ2lvbmljJylcbiAgICAuZGlyZWN0aXZlKCdzZWxlY3QnLCBTZWxlY3REaXJlY3RpdmUpO1xuXG5cdC8qYW5ndWxhci5tb2R1bGUoJ2lvbmljLWRhdGVwaWNrZXInKVxuXHQuZGlyZWN0aXZlKCdzZWxlY3QnLCBTZWxlY3REaXJlY3RpdmUpOyovXG5cbn0pKGFuZ3VsYXIsIGlvbmljKTsiLCJ3aW5kb3cucXVlcmllcyA9IFtcblx0Ly9Ecm9wIHRhYmxlc1xuICAgXCJEUk9QIFRBQkxFIElGIEVYSVNUUyBVc2VycztcIixcblx0Ly9DcmVhdGUgdGFibGVzXG5cdFwiQ1JFQVRFIFRBQkxFIFVzZXJzIChJZFVzZXIgaW50ZWdlciBwcmltYXJ5IGtleSBhdXRvaW5jcmVtZW50LCBOYW1lIHRleHQgbm90IG51bGwpO1wiLFxuXHQvL0luc2VydCBVc2Vyc1xuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnSnVhbiBEYXZpZCBOaWNob2xscyBDYXJkb25hJyk7XCIsXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdWYWxlbnRpbmEgTW9yYXRvJyk7XCIsXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdZdWxpYW5hIEdhcmPDrWEgTW9yYWxlcycpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnSGFucyBQYXJyYScpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnRWR3aW4gUmVzdHJlcG8nKTtcIixcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0pvc2UgUmlwb2xsJyk7XCIsXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdKb3JnZSBTZXJyYW5vJyk7XCIsXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdPc21hbiBIb3lvcycpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnS2hyaXp0aWFuIE1vcmVubyBadWx1YWdhJyk7XCIsXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdDcmlzdGlhbiBSaXZhcyBCdWl0cmFnbycpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnSnVhbiBEYXZpZCBTw6FuY2hleicpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnTmljb2xhcyBNb2xpbmEnKTtcIixcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ01peWFtb3RvIE11c2FzaGkgRklsYW5kZXInKTtcIixcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0RpZGllciBIZXJuYW5kZXonKTtcIixcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0x1aXMgRWR1YXJkbyBPcXVlbmRvIFDDqXJleicpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnQ2FybG9zIFJvamFzJyk7XCIsXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdMZXZhbm8gQ2FzdGlsbGEgQ2FybG9zIE1pZ3VlbCcpO1wiXG5dOyIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuZmFjdG9yeSgnTW9kYWxzJywgTW9kYWxzKTtcblxuXHRNb2RhbHMuJGluamVjdCA9IFsnJGlvbmljTW9kYWwnXTtcblx0ZnVuY3Rpb24gTW9kYWxzKCRpb25pY01vZGFsKSB7XG5cblx0XHR2YXIgbW9kYWxzID0gW107XG5cblx0XHR2YXIgX29wZW5Nb2RhbCA9IGZ1bmN0aW9uICgkc2NvcGUsIHRlbXBsYXRlVXJsLCBhbmltYXRpb24pIHtcblx0XHRcdHJldHVybiAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwodGVtcGxhdGVVcmwsIHtcblx0XHRcdFx0c2NvcGU6ICRzY29wZSxcblx0XHRcdFx0YW5pbWF0aW9uOiBhbmltYXRpb24gfHwgJ3NsaWRlLWluLXVwJyxcblx0XHRcdFx0YmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlXG5cdFx0XHR9KS50aGVuKGZ1bmN0aW9uIChtb2RhbCkge1xuXHRcdFx0XHRtb2RhbHMucHVzaChtb2RhbCk7XG5cdFx0XHRcdG1vZGFsLnNob3coKTtcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHR2YXIgX2Nsb3NlTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgY3VycmVudE1vZGFsID0gbW9kYWxzLnNwbGljZSgtMSwgMSlbMF07XG5cdFx0XHRjdXJyZW50TW9kYWwucmVtb3ZlKCk7XG5cdFx0fTtcblxuXHRcdHZhciBfY2xvc2VBbGxNb2RhbHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRtb2RhbHMubWFwKGZ1bmN0aW9uIChtb2RhbCkge1xuXHRcdFx0XHRtb2RhbC5yZW1vdmUoKTtcblx0XHRcdH0pO1xuXHRcdFx0bW9kYWxzID0gW107XG5cdFx0fTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRvcGVuTW9kYWw6IF9vcGVuTW9kYWwsXG5cdFx0XHRjbG9zZU1vZGFsOiBfY2xvc2VNb2RhbCxcblx0XHRcdGNsb3NlQWxsTW9kYWxzOiBfY2xvc2VBbGxNb2RhbHNcblx0XHR9O1xuXHR9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuZmFjdG9yeSgnTW9kZWwnLCBNb2RlbCk7XG5cblx0TW9kZWwuJGluamVjdCA9IFsnVXNlcnMnXTtcblx0ZnVuY3Rpb24gTW9kZWwoVXNlcnMpIHtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRVc2VyczogVXNlcnNcblx0XHR9O1xuXHR9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuc2VydmljZSgnJHNxbGl0ZVNlcnZpY2UnLCAkc3FsaXRlU2VydmljZSk7XG5cblx0JHNxbGl0ZVNlcnZpY2UuJGluamVjdCA9IFsnJHEnLCAnJGNvcmRvdmFTUUxpdGUnXTtcblx0ZnVuY3Rpb24gJHNxbGl0ZVNlcnZpY2UoJHEsICRjb3Jkb3ZhU1FMaXRlKSB7XG5cblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0dmFyIF9kYjtcblxuXHRcdHNlbGYuZGIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoIV9kYikge1xuXHRcdFx0XHRpZiAod2luZG93LnNxbGl0ZVBsdWdpbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0X2RiID0gd2luZG93LnNxbGl0ZVBsdWdpbi5vcGVuRGF0YWJhc2UoeyBuYW1lOiBcInByZS5kYlwiLCBsb2NhdGlvbjogMiwgY3JlYXRlRnJvbUxvY2F0aW9uOiAxIH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEZvciBkZWJ1Z2dpbmcgaW4gdGhlIGJyb3dzZXJcblx0XHRcdFx0XHRfZGIgPSB3aW5kb3cub3BlbkRhdGFiYXNlKFwicHJlLmRiXCIsIFwiMS4wXCIsIFwiRGF0YWJhc2VcIiwgMjAwMDAwKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIF9kYjtcblx0XHR9O1xuXG5cdFx0c2VsZi5nZXRGaXJzdEl0ZW0gPSBmdW5jdGlvbiAocXVlcnksIHBhcmFtZXRlcnMpIHtcblx0XHRcdHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cdFx0XHRzZWxmLmV4ZWN1dGVTcWwocXVlcnksIHBhcmFtZXRlcnMpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuXG5cdFx0XHRcdGlmIChyZXMucm93cy5sZW5ndGggPiAwKVxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZXNvbHZlKHJlcy5yb3dzLml0ZW0oMCkpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdChcIlRoZXJlIGFyZW4ndCBpdGVtcyBtYXRjaGluZ1wiKTtcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdChlcnIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXHRcdH07XG5cblx0XHRzZWxmLmdldEZpcnN0T3JEZWZhdWx0SXRlbSA9IGZ1bmN0aW9uIChxdWVyeSwgcGFyYW1ldGVycykge1xuXHRcdFx0dmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblx0XHRcdHNlbGYuZXhlY3V0ZVNxbChxdWVyeSwgcGFyYW1ldGVycykudGhlbihmdW5jdGlvbiAocmVzKSB7XG5cblx0XHRcdFx0aWYgKHJlcy5yb3dzLmxlbmd0aCA+IDApXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlc29sdmUocmVzLnJvd3MuaXRlbSgwKSk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVzb2x2ZShudWxsKTtcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdChlcnIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXHRcdH07XG5cblx0XHRzZWxmLmdldEl0ZW1zID0gZnVuY3Rpb24gKHF1ZXJ5LCBwYXJhbWV0ZXJzKSB7XG5cdFx0XHR2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXHRcdFx0c2VsZi5leGVjdXRlU3FsKHF1ZXJ5LCBwYXJhbWV0ZXJzKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcblx0XHRcdFx0dmFyIGl0ZW1zID0gW107XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcmVzLnJvd3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpdGVtcy5wdXNoKHJlcy5yb3dzLml0ZW0oaSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZXNvbHZlKGl0ZW1zKTtcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdChlcnIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXHRcdH07XG5cblx0XHRzZWxmLnByZWxvYWREYXRhQmFzZSA9IGZ1bmN0aW9uIChlbmFibGVMb2cpIHtcblx0XHRcdHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cblx0XHRcdC8vd2luZG93Lm9wZW4oXCJkYXRhOnRleHQvcGxhaW47Y2hhcnNldD11dGYtOCxcIiArIEpTT04uc3RyaW5naWZ5KHsgZGF0YTogd2luZG93LnF1ZXJpZXMuam9pbignJykucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpIH0pKTtcblx0XHRcdGlmICh3aW5kb3cuc3FsaXRlUGx1Z2luID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0ZW5hYmxlTG9nICYmIGNvbnNvbGUubG9nKCclYyAqKioqKioqKioqKioqKioqKiBTdGFydGluZyB0aGUgY3JlYXRpb24gb2YgdGhlIGRhdGFiYXNlIGluIHRoZSBicm93c2VyICoqKioqKioqKioqKioqKioqICcsICdiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NScpO1xuXHRcdFx0XHRzZWxmLmRiKCkudHJhbnNhY3Rpb24oZnVuY3Rpb24gKHR4KSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB3aW5kb3cucXVlcmllcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIHF1ZXJ5ID0gd2luZG93LnF1ZXJpZXNbaV0ucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpO1xuXG5cdFx0XHRcdFx0XHRlbmFibGVMb2cgJiYgY29uc29sZS5sb2cod2luZG93LnF1ZXJpZXNbaV0pO1xuXHRcdFx0XHRcdFx0dHguZXhlY3V0ZVNxbChxdWVyeSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCBmdW5jdGlvbiAoZXJyb3IpIHtcblx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyb3IpO1xuXHRcdFx0XHR9LCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0ZW5hYmxlTG9nICYmIGNvbnNvbGUubG9nKCclYyAqKioqKioqKioqKioqKioqKiBDb21wbGV0aW5nIHRoZSBjcmVhdGlvbiBvZiB0aGUgZGF0YWJhc2UgaW4gdGhlIGJyb3dzZXIgKioqKioqKioqKioqKioqKiogJywgJ2JhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1Jyk7XG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShcIk9LXCIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKFwiT0tcIik7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXHRcdH07XG5cblx0XHRzZWxmLmV4ZWN1dGVTcWwgPSBmdW5jdGlvbiAocXVlcnksIHBhcmFtZXRlcnMpIHtcblx0XHRcdHJldHVybiAkY29yZG92YVNRTGl0ZS5leGVjdXRlKHNlbGYuZGIoKSwgcXVlcnksIHBhcmFtZXRlcnMpO1xuXHRcdH07XG5cdH1cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5mYWN0b3J5KCdVc2VycycsIFVzZXJzKTtcblxuXHRVc2Vycy4kaW5qZWN0ID0gWyckcScsICckc3FsaXRlU2VydmljZSddO1xuXHRmdW5jdGlvbiBVc2VycygkcSwgJHNxbGl0ZVNlcnZpY2UpIHtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRnZXRBbGw6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIHF1ZXJ5ID0gXCJTZWxlY3QgKiBGUk9NIFVzZXJzXCI7XG5cdFx0XHRcdHJldHVybiAkcS53aGVuKCRzcWxpdGVTZXJ2aWNlLmdldEl0ZW1zKHF1ZXJ5KSk7XG5cdFx0XHR9LFxuXHRcdFx0YWRkOiBmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0XHR2YXIgcXVlcnkgPSBcIklOU0VSVCBJTlRPIFVzZXJzIChOYW1lKSBWQUxVRVMgKD8pXCI7XG5cdFx0XHRcdHJldHVybiAkcS53aGVuKCRzcWxpdGVTZXJ2aWNlLmV4ZWN1dGVTcWwocXVlcnksIFt1c2VyLk5hbWVdKSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoJ0FwcCcpXG5cdFx0LmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgSG9tZUNvbnRyb2xsZXIpO1xuXG5cdEhvbWVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICdNb2RlbCddO1xuXHRmdW5jdGlvbiBIb21lQ29udHJvbGxlcigkc2NvcGUsIE1vZGVsKSB7XG5cblx0XHQkc2NvcGUudXNlcnMgPSBbXTtcblx0XHRcblx0XHQkc2NvcGUudHJpZ2dlckhvbGQgPSBmdW5jdGlvbigpe1xuXHRcdFx0Ly9UcmlnZ2VyIGhvbGQgZXZlbnQgZmlyc3QgaXRlbVxuXHRcdFx0aW9uaWMudHJpZ2dlcihcImhvbGRcIiwgeyB0YXJnZXQ6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpdGVtXCIpWzBdIH0pO1xuXHRcdH07XG5cblx0XHQkc2NvcGUuJG9uKCckaW9uaWNWaWV3LmJlZm9yZUVudGVyJywgZnVuY3Rpb24oKXtcblx0XHRcdE1vZGVsLlVzZXJzLmdldEFsbCgpLnRoZW4oZnVuY3Rpb24gKHVzZXJzKSB7XG5cdFx0XHRcdCRzY29wZS51c2VycyA9IGFuZ3VsYXIuY29weSh1c2Vycyk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxufSkoKTsiLCIoZnVuY3Rpb24gKFR3ZWVuTGl0ZSwgRHJhZ2dhYmxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ0FwcCcpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnZHJhZ2dhYmxlJywgZHJhZ2dhYmxlKTtcclxuXHJcbiAgICBkcmFnZ2FibGUuJGluamVjdCA9IFsnJGlvbmljR2VzdHVyZSddO1xyXG4gICAgZnVuY3Rpb24gZHJhZ2dhYmxlKCRpb25pY0dlc3R1cmUpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRyYWdnZXI7XHJcbiAgICAgICAgICAgICAgICB2YXIgYW5pbWF0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgICRpb25pY0dlc3R1cmUub24oJ2hvbGQnLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24gPSBUd2VlbkxpdGUudG8oZWxlbWVudCwgMC4zLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogXCJyZ2JhKDAsMCwwLDAuMikgMHB4IDE2cHggMzJweCAwcHhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yY2UzRDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGU6IDEuMVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdnZXIgPSBuZXcgRHJhZ2dhYmxlKGVsZW1lbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kczogZWxlbWVudC5wYXJlbnQoKVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRnZVJlc2lzdGFuY2U6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUHJlc3M6IHNvcnRhYmxlUHJlc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVsZWFzZTogc29ydGFibGVSZWxlYXNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdTdGFydDogc29ydGFibGVEcmFnU3RhcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRHJhZzogc29ydGFibGVEcmFnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXZlU25hcDogc29ydGFibGVTbmFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdFbmQ6IHNvcnRhYmxlRHJhZ0VuZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS5zZXQoZWxlbWVudCwgeyBjb2xvcjogXCIjODhDRTAyXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCBlbGVtZW50LCB7IGhvbGRfdGhyZXNob2xkOiAyMCB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzb3J0YWJsZVByZXNzKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGNoaWxkID0gY2hpbGQucHJldmlvdXNTaWJsaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IDEpIGkrKztcclxuICAgICAgICAgICAgICAgICAgICB0LmN1cnJlbnRJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5jdXJyZW50SGVpZ2h0ID0gdC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5raWRzID0gW10uc2xpY2UuY2FsbCh0LnBhcmVudE5vZGUuY2hpbGRyZW4pOyAvLyBjb252ZXJ0IHRvIGFycmF5ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNvcnRhYmxlRHJhZ1N0YXJ0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc29ydGFibGVEcmFnKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gdC5raWRzLnNsaWNlKCksIC8vIGNsb25lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4Q2hhbmdlID0gTWF0aC5yb3VuZCh0aGlzLnkgLyB0LmN1cnJlbnRIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZDEgPSB0LmN1cnJlbnRJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm91bmQyID0gYm91bmQxICsgaW5kZXhDaGFuZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvdW5kMSA8IGJvdW5kMikgeyAvLyBtb3ZlZCBkb3duXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhlbGVtZW50cy5zcGxpY2UoYm91bmQxICsgMSwgYm91bmQyIC0gYm91bmQxKSwgMC4xNSwgeyB5UGVyY2VudDogLTEwMCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVHdlZW5MaXRlLnRvKGVsZW1lbnRzLCAwLjE1LCB7IHlQZXJjZW50OiAwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm91bmQxID09PSBib3VuZDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMuc3BsaWNlKGJvdW5kMSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhlbGVtZW50cywgMC4xNSwgeyB5UGVyY2VudDogMCB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBtb3ZlZCB1cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUd2VlbkxpdGUudG8oZWxlbWVudHMuc3BsaWNlKGJvdW5kMiwgYm91bmQxIC0gYm91bmQyKSwgMC4xNSwgeyB5UGVyY2VudDogMTAwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUd2VlbkxpdGUudG8oZWxlbWVudHMsIDAuMTUsIHsgeVBlcmNlbnQ6IDAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNvcnRhYmxlU25hcCh5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGggPSB0aGlzLnRhcmdldC5jdXJyZW50SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHkgLyBoKSAqIGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc29ydGFibGVEcmFnRW5kKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heCA9IHQua2lkcy5sZW5ndGggLSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdJbmRleCA9IE1hdGgucm91bmQodGhpcy55IC8gdC5jdXJyZW50SGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdJbmRleCArPSAobmV3SW5kZXggPCAwID8gLTEgOiAwKSArIHQuY3VycmVudEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdJbmRleCA9PT0gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHQsIHQua2lkc1tuZXdJbmRleCArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgVHdlZW5MaXRlLnNldCh0LmtpZHMsIHsgeVBlcmNlbnQ6IDAsIG92ZXJ3cml0ZTogXCJhbGxcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICBUd2VlbkxpdGUuc2V0KHQsIHsgeTogMCwgY29sb3I6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBkcmFnZ2VyLmtpbGwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzb3J0YWJsZVJlbGVhc2UoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSkoVHdlZW5MaXRlLCBEcmFnZ2FibGUpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
