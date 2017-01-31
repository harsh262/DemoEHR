/**
 * 
 */
homePageApp.controller("patientFlagController",['$scope','$rootScope','$cookies','$http',function($scope,$rootScope,$cookies,$http){
	//----------------------- FLAG  DROP DOWN ------------------------// 

	$scope.flagDropModel = [];
	$scope.flagData = [
	        {id: "HIV", label: "HIV"},
	        {id: "HBS AG", label: "HBS AG"},
	        {id: "Mental Health", label: "Mental Health"}
	    ];
	    

	$scope.flagSettings = {
	    smartButtonMaxItems: 3,
	     enableSearch: true,
	    smartButtonTextConverter: function(itemText, originalItem) {
	        if (itemText === 'HIV') {
	        return 'HIV!';
	        }

	        return itemText;
	    }
	};
}]);