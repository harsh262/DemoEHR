/**
 * Angularjs login controller
 */
var loginApp = angular.module('loginApp',['ngCookies']);
loginApp.constant("urlConfig", {
	url : "http://54.84.170.46:5100/ehr/"
});
loginApp.controller('loginController',['$scope','$window','$http','$rootScope','$location','$cookies', function($scope,$window,$http,$rootScope,$location,$cookies) {
	$scope.hospitalName = 'hospital_234';
		$scope.validate = function() {
			$scope.$broadcast('show-errors-check-validity');
			if($scope.loginForm.$valid){
				var user ={
						accessCode : $scope.accessCode,
						password : $scope.password,
						hospitalName : $scope.hospitalName
				}
				//var REST_SERVICE_URI = urlConfig.url + 'login';
				var REST_SERVICE_URI = BASE_URL + ROOT_URL + "/login";
				var promise = $http.post(REST_SERVICE_URI, JSON.stringify(user)).then(function(response) {
					//console.log(response.data);
					if(response.data._status_Code == '200'){
						$scope.doctorId = response.data.result._id;
						//console.log($scope.doctorId);
						$cookies.put("doctorId",$scope.doctorId);
						$cookies.put("doctorName",response.data.result.firstName +' '+response.data.result.lastName);
						$scope.$broadcast('show-errors-reset');
						$window.location.href = './patient_search.html';
					}else{
						alert(response.data._error_message);
					}
					return response.data.status;
				});
			}
		}
}]);