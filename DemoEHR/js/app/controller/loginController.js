/**
 * Angularjs login controller
 */
/*var loginApp = angular.module('loginApp',['ngCookies']);
loginApp.constant("urlConfig", {
	url : "http://54.84.170.46:5100/ehr/"
});*/
ehrApp.controller('loginController',['$scope','$window','$http','$rootScope', 'setGetService', 'Authorization',
                               function($scope,$window,$http,$rootScope,setGetService, Authorization) {
	$scope.accessCode = 'access_234';
	$scope.password = 'password_234';
	$scope.hospitalName = 'hospital_234';
	//$rootScope.loading=false;
		$scope.validate = function() {
			$scope.$broadcast('show-errors-check-validity');
			if($scope.loginForm.$valid){
				$rootScope.loading=true;
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
						
						//Without Authentication
						/*$scope.doctorId = response.data.result._id;
						var docDetails = {'doctorId':$scope.doctorId , 'doctorName' : response.data.result.firstName +' '+response.data.result.lastName};*/
						
						//Authentication
						$scope.doctorId = response.data.result.user._id;
						var docDetails = {'doctorId':$scope.doctorId , 'doctorName' : response.data.result.user.firstName +' '+response.data.result.user.lastName};
						$rootScope.token = response.data.result.token;
						
						setGetService.setValue(docDetails);
						$scope.$broadcast('show-errors-reset');
						Authorization.go('patientSearch');
					}else{
						$rootScope.showNotification(response.data._status_Code,response.data.result,response.data._error_message);
						//alert(response.data._error_message);
					}
					return response.data.status;
				});
			}
		}
}]);