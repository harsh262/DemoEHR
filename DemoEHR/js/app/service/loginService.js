
/**
 * Angular Login Service
 */
/*loginApp.factory('loginService',['$http','$window', function($http, $window) {
	return{
		
		validateLogin:function(User){
			alert("wait");
			console.log(User);
			var response ={};
			var URI = 'http://54.84.170.46:5100/ehr/login';
			var promis = $http.post(URI, JSON.stringify(User));
			promis.then(function(data) {
					console.log("==>"+data);
					response= data;
					return response;
				});
			return response;
			
			return $http.post(URI)
			.then(function(result) {
                //resolve the promise as the data
				console.log(result);
                return result;
            });
		
	}
	}
	}
]);*/

/*app.service('loginService',['$http','$window', function($http, $window) {
	this.validateLogin =  function(user)
		{
			var REST_SERVICE_URI = 'http://54.84.170.46:5100/ehr/login';
			
			var promise = $http.post(REST_SERVICE_URI, JSON.stringify(user))
			.then(function(response)
			{
				
				console.log(response.data.status);
				if(response.data.status === 'login Successfull'){
					$window.location.href = '/EHR/patient_search.html';
				}else{
					alert('invalid login');
				}
				return response.data.status;
			},
			function(response)
			{
				alert('error');
			});
			return promise;
		}
}]);*/