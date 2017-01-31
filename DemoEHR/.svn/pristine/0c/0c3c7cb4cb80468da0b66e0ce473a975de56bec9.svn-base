/**
 * 
 */
var vitalApp = angular.module('ehrApp',[]);

vitalApp.controller('indexController',['$scope','$window','vitalService', function($scope,$window,vitalService) {
	$scope.vitalList = [];
	
	/* 
	 * Add Row in vital table 
	 */
	$scope.AddData = function(){
		var vital ={
				vitalName: $scope.vitalName,
				value: $scope.value,
				unit: $scope.unit,
				range: $scope.range,
		}
		$scope.vitalList.push(vital);
		cleatVitals();
		//console.log($scope.vitalList);
	};
	
	/*
	 * Remoce Row in vital table
	 */
	$scope.removeData = function(index) {
		if( $window.confirm('Are you absolutely sure you want to delete?')){
			$scope.vitalList.splice(index, 1);
		}
		
	};
	
	$scope.setVital = function(vitalName, min, max, unit, range) {
		$scope.vitalName = vitalName;
		$scope.min = min;
		$scope.max = max;
		$scope.unit = unit;
		$scope.range = range;
	}
	
	/*$scope.vitalList = function () {
		vitalService.getVitalList().then(function(data) {
			alert();
			return data;
		})
	}
	*/
		
	
		/*vitalService.getVitalList(function(data) {
			console.log(data);*/
	var json = {
			 "vitalList":
	          {
	              "vitalName" :"TEMPERATURE nikhil",
	              "min":"20",
	              "max":50,
	              "unit":"pune"
	          }
};
	
		//	$scope.vitalList= json;
	
	 var cleatVitals = function () {
		$scope.min = '';
		$scope.max ='';
		$scope.unit = '';
		$scope.value = '';
	}
}])