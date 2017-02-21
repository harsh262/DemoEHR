/**
 * 
 */
var ehrApp = angular.module('ehrApp',['ngCookies','ngSanitize','ngAnimate', 'ui.bootstrap','ngRoute','angularjs-dropdown-multiselect','ngMaterial','ngScrollbars','rzModule','ui.router','nvd3','ui-notification', 'chieffancypants.loadingBar', 'ngAnimate'])

.run(['$rootScope','$timeout','$state','Authorization','Notification','setGetService', function ($rootScope,$timeout,$state,Authorization,Notification,setGetService) {
	$rootScope.subCategoryValue = "none"; 
	$rootScope.loading = false;
	$rootScope.multiselectToArray = function(objectArray) {
		var stringArray = [];
		angular.forEach(objectArray, function(value, key) {
			stringArray.push(value.id);
		});
		return stringArray;
	};
	
	$rootScope.resetFormValidation = function() {
		$rootScope.$broadcast('show-errors-reset');
	};
	
	$rootScope.connectionError = "Network or Server error"; 
	$rootScope.showNotification = function(code,result,msg){
		if(code == 200){
			Notification.success({message: result, delay: 2500});
		}else{
			if(typeof msg == "object"){
				var customMsg = "";
				for(var key in msg.errors){
					var obj = msg.errors[key];
					customMsg = customMsg + obj.path + " " + obj.type + "\n";
				}
				Notification.error({message: customMsg, delay: 2500,title: "Error's"});
			}else if(typeof msg == "string"){
				Notification.error({message: msg, delay: 2500});
			}else{
				Notification.error({message: "error", delay: 2500});
			}
			
		}
	}
	
	$rootScope.logout = function() {
		setGetService.setValue("");
		Authorization.go("/");
		
	}
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
	    if (!Authorization.authorized) {
	      if (Authorization.memorizedState && (!_.has(fromState, 'data.redirectTo') || toState.name !== fromState.data.redirectTo)) {
	        Authorization.clear();
	      }
	      if (_.has(toState, 'data.authorization') && _.has(toState, 'data.redirectTo')) {
	        if (_.has(toState, 'data.memory')) {
	          Authorization.memorizedState = toState.name;
	        }
	        $state.go(toState.data.redirectTo);
	      }
	    }

	  });

	  $rootScope.onLogout = function() {
	    Authorization.clear();
	    $state.go('/');
	  };
}]);

ehrApp.directive('getSiblings', function () {
    return {
        scope: true,
        link: function (scope, element, attrs) {
        	/*var documentResult = document.getElementsByClassName("picwidth");
            console.log('document.getElementsByClassName: ', documentResult);*/
            
        	element.parent().find('tbody').addClass('ng-hide');
            scope.clicked = function (tabDesc,limit,arrowId) {
            	var tBody = element.parent().find('tbody');
        		if(tBody.hasClass('ng-hide')){
        			tBody.removeClass('ng-hide').addClass('ng-show');
        			/*tBody.find('tr:gt(7)').hide();
        			tBody.find('tr:last').show();
        			tBody.removeClass('trAll').addClass('tr4');*/
        		}else{
        			tBody.removeClass('ng-show').addClass('ng-hide');
        			if(limit > 4)
        				scope.toggleLimit(tabDesc,limit,arrowId);
        		}
            }
        }
    };
});

/*ehrApp.directive('tabShow', function () {
    return {
        scope: true,
        link: function (scope, element, attrs) {
        	element.parent().find('tbody').addClass('ng-hide');
            scope.showTabs = function () {
            	console.log("element ",element);
            }
        }
    };
});*/

ehrApp.config(function($stateProvider,$urlRouterProvider,cfpLoadingBarProvider) {
	
	 cfpLoadingBarProvider.includeSpinner = false;
	
	$urlRouterProvider.otherwise('/');

	  $stateProvider.state("/", {
	    url: "/",
	    templateUrl: 'loginDIV.html',
	    controller: "loginController"
	  })
	  
	  .state('patientSearch', {
	    url: '/patientSearch',
	    templateUrl: 'patientSearchDIV.html',
	    controller : "patientSearchController",
	    data: {
	      authorization: true,
	      redirectTo: '/'
	    }
	  })
	  
	  .state('homePage', {
	    url: '/homePage',
	    templateUrl: 'homePageDIV.html',
	    controller  : 'HomePageController',
	    data: {
	      authorization: true,
	      redirectTo: '/'
	    }
	  })
	  .state('templateInfo', {
		    url: '/templateInfo',
		    templateUrl: 'template-info.html',
		    controller  : 'templateController',
		    data: {
		      authorization: true,
		      redirectTo: '/'
		    }
		  });
	
	/*$stateProvider.state('/', {
	    templateUrl : 'loginDIV.html',
	    controller  : 'loginController'
	  })

	  .state('/patientSearch', {
	    templateUrl : 'patientSearchDIV.html',
	    controller  : 'patientSearchController',
	    data: {
	        authorization: true,
	        redirectTo: '/'
	    }
	  })

	  .state('/homePage', {
	    templateUrl : 'homePageDIV.html',
	    controller  : 'HomePageController',
	    resolve: {
	    	patientData : ["VitalReviewService","setGetService","$rootScope", function(VitalReviewService,setGetService,$rootScope){
	    		var patientDetails = setGetService.getValue();
	    		console.log("resolve",patientDetails);
	            VitalReviewService.getPatientByFilter(patientDetails.doctorId,'mrn',patientDetails.patientMRN).then(function(data) {
	            	console.log(data);
	            	$rootScope.patientInfo = data;
	            });
	        }]
	    },
	    data: {
	        authorization: true,
	        redirectTo: '/'
	    }
	  })

	  .otherwise({redirectTo: '/'});*/
	});

ehrApp.constant("urlConfig", {
	url : "http://35.154.76.183:3300/ehr/"
});

ehrApp.factory('setGetService', function() {
	var myjsonObj = null;// the object to hold our data
	return {
		getValue : function() {
			return myjsonObj;
		},
		setValue : function(value) {
			myjsonObj = value;
		}
	}
});
