templateApp.service('templateService',['$http',function($http){
	var GET_CUSTOM_DOCTOR_TEMPLATE = "http://54.84.170.46:5100/ehr/doctor/7b6a2d7a-67c8-41db-94a2-98218dca024d/template/"; 
	//"http://54.84.170.46:5100/ehr/template/7b6a2d7a-67c8-41db-94a2-98218dca024d/";
	this.getDoctorCustomTemplate = function(templateId,patientId){
		var TEMP_URI = GET_CUSTOM_DOCTOR_TEMPLATE + templateId + "/patient/" + patientId;
		console.log(TEMP_URI);
		var promise = $http.get(TEMP_URI).then(function(response){
			console.log(response);
			if(response.status == 200){
				return response.data.result;
			}
		})
		return promise;
	}
}])