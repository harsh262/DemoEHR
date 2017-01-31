homePageApp.service('VitalReviewService',['$http', function($http) {

	
	this.getVitalReview = function(patientInfo){
		var URI = BASE_URL + ROOT_URL + PATIENTS +'/'+patientInfo._id+'/getvitals';
		var promis = $http.get(URI)
		.then(function(response){
			if(response.data._status_Code === 200){
				return (response.data.result);
			}else{
				alert(response.data._error_message);
			}
		},
		function() {
			alert("error");
		})
		return promis;
	}
	
	
	this.saveVitals = function(vitalObj, doctorId,patientId){
		var URI = BASE_URL + ROOT_URL + DOCTOR +'/'+ doctorId + PATIENT +'/'+ patientId +'/addvitals';
		var promise = $http.post(URI, JSON.stringify(vitalObj)).then(function(response) {
			if(response.data._status_Code != 200)
				alert(response.data._error_message);
			console.log(response);
			return response;
		});
		return promise;
	}
	
	this.getVitalReviewDateRange = function(patientId, upperDate, lowerDate){
		console.log("upperdate",upperDate);
		console.log("lowerdate",lowerDate);
		console.log("patientId",patientId);
		var URI = BASE_URL + ROOT_URL + PATIENT +'/'+ patientId +'/getvitals/dateRange?upper='+ upperDate +'&lower='+lowerDate;
		
		console.log("url", URI);
		var promise = $http.get(URI).then(function(response) {
			console.log("date wise data", response);
			return (response.data.result);
		},
		function(){
			alert("error");
		});
		return promise;
	}
	
	this.getPatientByFilter = function(doctorId,searchBy,searchValue){
	//	var URI = urlConfig.url+'doctors/'+doctorId+'/searchPatient?searchBy='+searchBy+'&searchValue='+searchValue;
		var URI = BASE_URL + ROOT_URL + DOCTORS + '/' + doctorId + '/searchPatient?searchBy='+searchBy+'&searchValue='+searchValue;
		//console.log(URI);
		var promis = $http.get(URI)
		.then(function(response){
			//console.log(response.data.result[0]);
			if(response.data._status_Code === 200){
				//console.log("success");
				return (response.data.result[0]);
			}
		},
		function() {
			alert("error");
		})
		return promis;
	};
	
	
}]);


//-------------- Allergy Service -------------------//
homePageApp.service('allergyService',['$http', function($http) {
	this.saveAllergy = function(allery,patientId){
		//var URI = urlConfig.url+'patient/'+patientId+'/allergies';
		var URI = BASE_URL + ROOT_URL + PATIENT +'/'+patientId+'/allergies';
		//console.log(URI);
		var promise = $http.post(URI, JSON.stringify(allery)).then(function(response) {
			//console.log(response.data.result[0]);
			//console.log(response);
			return response;
		},
		function() {
			alert("error");
		})
		return promise;
	};
	
	
	this.getAllergyList = function(patientId){
//		var URI = urlConfig.url+"patient/"+patientId+"/allergies";
		var URI = BASE_URL + ROOT_URL + PATIENT + '/'+ patientId+"/allergies";
		var promise = $http.get(URI)
		.then(function(response){
			//console.log(response.data.result);
			if(response.data._status_Code === 200){
				return (response.data.result);
			}
		},
		function() {
			alert("error");
		})
		return promise;
	}
	
	this.allergyMarkAsError = function(allergyId, patientId, param){
		//var URI = urlConfig.url+"patient/"+allergy.patientId+"/allergies/"+allergy._id;
		//var URI = BASE_URL + ROOT_URL + PATIENT + '/'+patientId+"/allergies/"+ allergyId +"/addToError";
		var URI = BASE_URL + ROOT_URL + PATIENT + '/'+patientId+"/allergies/allergyUpdate";
		var promise = $http.put(URI,JSON.stringify(param))
		.then(function(response){
			//console.log(response);
			if(response.data._status_Code === 200){
				return (response.data.result);
			}
		},
		function() {
			alert("error");
		})
		return promise;
		
	}
}]);

//-------------- Lab Result Service -----------------//
homePageApp.service('labResultService',['$http',function($http){
	this.getLabResult = function(patientId, patientMrn){
		var URI = BASE_URL + ROOT_URL + LAB_RESULTS + '/'+ patientId +'/'+ patientMrn;
		var promise = $http.get(URI)
		.then(function(response){
			if(response.data._status_Code === 200){
				return (response.data.result);
			}
		},
		function() {
			alert("error");
		})
		return promise;
	}
	
	this.getLabResultDateRange = function(patientId, patientMrn, upperDate, lowerDate){
		var URI = BASE_URL + ROOT_URL + LAB_RESULTS + '/'+ patientId +'/'+ patientMrn +'/dateRange?upper='+ upperDate +'&lower='+lowerDate;
		var promise = $http.get(URI)
		.then(function(response){
			//if(response.data._status_code === 200){
			//console.log(response.data.result);
				return (response.data.result);
			//}
		},
		function(){
			alert("error");
		});
		return promise;
	}
}]);

//--------------- Posting Service-----------------//
homePageApp.service('postingService',['$http',function($http){
	this.savePosting = function(postingObj){
		//console.log(postingObj);
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + postingObj.patientId + '/postings';
		var promise = $http.post(URI, JSON.stringify(postingObj)).then(function(response) {
			console.log(response);
			return response;
		},
		function() {
			alert("error");
		})
		return promise;
	}
	
	
	this.getPostingList = function(patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/'+ patientId+"/postings";
		var promise = $http.get(URI)
		.then(function(response){
			//console.log(response);
			if(response.data._status_Code === 200){
				return (response.data.result);
			}
		},
		function() {
			alert("error");
		})
		return promise;
	}
	
	this.getLastPostingsList = function(patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/'+ patientId+"/lastPostings";
		var promise = $http.get(URI)
		.then(function(response){
			if(response.data._status_Code === 200){
				return (response.data.result);
			}
		},function(){
			alert("error");
		})
		return promise;
	}
}]);


//---------------Intake Output Module----------------//
homePageApp.service('intakeOutputService',['$http', function($http){
	
	this.saveIntake = function(intakeObj){
		//console.log(intakeObj);
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + intakeObj.patientId + '/intakeOutput';
		var promise = $http.post(URI, JSON.stringify(intakeObj)).then(function(response){
			console.log(response);
			return response;
		},function(){
			alert("error");
		})
		return promise;
	}
	
	this.getIntakeOutputList = function(patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/intakeOutput';
		var promise = $http.get(URI)
		.then(function(response){
			//console.log(response);
			if(response.data._status_Code === 200){
				return (response.data.result);
			}
		},
		function(){
			alert("error");
		})
		return promise;
	}
}]);

//---------------------- POC -------------------------//
homePageApp.service('POCService',['$http', function($http){
	this.getPOCMasterList = function(){
		var URI = '';
		var promise = $http.get('json/POC.json')
		.then(function(response){
			//console.log(response);
			return response.data;
		},
		function(){
			alert("error");
		})
		return promise;
	}
	
	this.savePOC = function(pocObj,patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/POC';
		var promise = $http.post(URI,JSON.stringify(pocObj)).then(function(response){
			//console.log(response);
			return response;
		},
		function(){
			alert("error");
		});
		return promise;
	}
	
	this.getPOCList = function(patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/POC';
		var promise = $http.get(URI)
		.then(function(response){
			//console.log(response);
			if(response.data._status_Code === 200){
				//console.log(response.data.result);
				return (response.data.result);
				
			}
			//console.log(response);
		},
		function(){
			alert("error");
		});
		return promise;
	}
	
	this.pocMarkError = function(patientId,pocObj){
		//var PUCIdForMarkError = {"POCId":POCId };
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/POC/markError/';
		var promise = $http.put(URI,pocObj)
		.then(function(response){
			return response;
		},
		function(){
			alert("error");
		});
		return promise;
	}
}]);



/*------------- Flag Module ----------------*/
homePageApp.service('FlagService',['$http',function($http){
	this.saveFlag = function(flagObj, patientId){
		//console.log(flagObj);
		//console.log(patientId);
		var URI =  BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/flag';
		var promise = $http.post(URI, JSON.stringify(flagObj))
		.then(function(response){
			return response;
		},
		function(){
			alert("error");
		});
		return promise;
	}
	
	this.getFlagList = function(patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/flag';
		var promise = $http.get(URI)
		.then(function(response){
			if(response.data._status_Code === 200){
				//console.log(response.data.result);
				return response.data.result;
			}
		},
		function(){
			alert("error")
		});
		return promise;
	}
	
	this.flagEnteredInError = function(flagId, patientId,param){
		//console.log(flagId +' '+patientId +''+param);
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/flag/'+ flagId +'/markError';
		var promise = $http.put(URI, param)
		.then(function(response){
			if(response.data._status_Code === 200){
				//console.log(response.data.result);
				return response.data.result;
			}
		},
		function(){
			alert("error");
		});
		return promise;
	}

	this.updateFlag = function(patientId, flagObj){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/flag/'+ flagObj.flagId +'/';
		var promise = $http.put(URI, flagObj)
		.then(function(response){
			//console.log(response);
			if(response.data._status_Code === 200){
				//console.log(response.data.result);
				return response.data.result;
			}
		},
		function(){
			alert("error");
		});
		return promise;
	}
}]);

/*---------------- Medication -------------------*/
homePageApp.service('MedicationService',['$http',function($http){
	this.getMedicationList = function(patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/medications';
		var promise = $http.get(URI)
		.then(function(response){
			//console.log(response);
			if(response.data._status_Code === 200){
				//console.log(response.data.result);
				return response.data.result;
			}
		},
		function(){
			alert("error");
		});
		return promise;
	}
	
	this.getActiveMedicationsList = function(patientId){
		var URI =  BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/medications/active';
		var promise = $http.get(URI)
		.then(function(response){
			if(response.data._status_Code === 200){
				//console.log(response.data.result);
				return response.data.result;
			}
		},function(){
			alert("error");
		});
		return promise;
	}
}]);


/*------------- Patient Info ---------------*/
homePageApp.service('PatientInfoService',['$http',function($http){
	this.getPatientInfo = function(patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId;
		var promise = $http.get(URI)
		.then(function(response){
			//console.log(response);
			if(response.data._status_Code === 200){
				//console.log(response.data.result);
				return response.data.result;
			}
		},
		function(){
			alert("error");
		});
		return promise;
	}
}]);

/*------------- File Upload ----------------*/
homePageApp.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);

homePageApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file,patientId){
       var fd = new FormData();
       fd.append('file', file);
    
       var promise = $http.post(BASE_URL + '/file/' + patientId +'/upload', fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })
       .success(function(response){
    	   return response;
    	   //console.log(response);
       })
    
       .error(function(){
       });
       return promise;
    }
 }]);
