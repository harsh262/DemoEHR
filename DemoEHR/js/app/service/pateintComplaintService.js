ehrApp.service('pateintComplaintService',['$http','$rootScope',function($http,$rootScope){
	
	this.saveComplaint = function(patientComplaint,patientId,visitId){
		//console.log(patientComplaint);
		//var URI = urlConfig.url+"patients/"+patientId+"/addComplaints/"+visitId;
		var URI = BASE_URL + ROOT_URL + PATIENTS + "/"+patientId+"/addComplaints/"+visitId;
		var promise = $http.post(URI,JSON.stringify(patientComplaint)).then(function(response){
			$rootScope.showNotification(response.data._status_Code,response.data._status,response.data._error_message);
			//console.log(response);
			return response;
		},function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promise;
	}
	
	this.getPatientComplaintList = function(patientId){
		//var URI = urlConfig.url+"patients/"+patientId+"/getAllComplaints";
		var URI = BASE_URL + ROOT_URL + PATIENTS + "/"+patientId+"/getAllComplaints";
		var promise = $http.get(URI).then(function(response){
			if(response.data._status_Code === 200){
				return (response.data.result);
			}
		},function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		});
		return promise;
	}
	
	this.addComplaintToError = function(patientId,complaintId,param){
		//var URI = urlConfig.url+"patients/"+patientId+"/complaints/"+complaintId+"/addToError";
		var URI = BASE_URL + ROOT_URL + PATIENTS + "/"+patientId+"/complaints/"+complaintId+"/addToError";
		var promise = $http.put(URI,JSON.stringify(param)).then(function(response){
			$rootScope.showNotification(response.data._status_Code,response.data._status,response.data._error_message);
			//console.log(response);
			return response;
		},function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promise;
	}
	
	this.getPatientProblemList = function(){
		try{
			var URI = "";
			var promise = $http.get('json/ICD_Codes.json').then(function(response){
				//console.log(response);
				return response.data;
			},function(){
				$rootScope.showNotification(0,"",$rootScope.connectionError);
			})
			return promise;
		}catch(e){
			//console.log(e);
		}
	}
	
	this.getActiveComplaint = function(patientId){
		var URI = BASE_URL + ROOT_URL + PATIENTS + "/"+patientId+"/getAllComplaints/active";
		var promise = $http.get(URI).then(function(response){
			if(response.data._status_Code === 200){
				return (response.data.result);
			}
		},function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promise;
	}
}])