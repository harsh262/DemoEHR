/**
 * 
 */
ehrApp.service('VitalReviewService',['$http','$rootScope', function($http,$rootScope) {

	
	this.getVitalReview = function(patientId){
		var URI = BASE_URL + ROOT_URL + PATIENTS +'/'+patientId+'/getvitals';
		var promis = $http.get(URI)
		.then(function(response){
			if(response.data._status_Code === 200){
				return (response.data.result);
			}
		},
		function() {
			$rootScope.showNotification(0,"",$rootScope.connectionError);
			//alert("error");
		})
		return promis;
	}
	
	
	this.saveVitals = function(vitalObj, doctorId,patientId){
		var URI = BASE_URL + ROOT_URL + DOCTOR +'/'+ doctorId + PATIENT +'/'+ patientId +'/addvitals';
		var promise = $http.post(URI, JSON.stringify(vitalObj)).then(function(response) {
			$rootScope.showNotification(response.data._status_Code,response.data.result,response.data._error_message);
			return response;
		});
		return promise;
	}
	
	this.getVitalReviewDateRange = function(patientId, upperDate, lowerDate){
		var URI = BASE_URL + ROOT_URL + PATIENT +'/'+ patientId +'/getvitals/dateRange?upper='+ upperDate +'&lower='+lowerDate;
		var promise = $http.get(URI).then(function(response) {
			if(response.data._status_Code == 200)
				return (response.data.result);
		},
		function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		});
		return promise;
	}
	
	this.getPatientByFilter = function(doctorId,searchBy,searchValue){
	//	var URI = urlConfig.url+'doctors/'+doctorId+'/searchPatient?searchBy='+searchBy+'&searchValue='+searchValue;
		var URI = BASE_URL + ROOT_URL + DOCTORS + '/' + doctorId + '/searchPatient?searchBy='+searchBy+'&searchValue='+searchValue;
		var promis = $http.get(URI)
		.then(function(response){
			if(response.data._status_Code === 200){
				return (response.data.result[0]);
			}
		},
		function() {
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promis;
	};
	
	this.getCoversheetVitalList = function(patientId,visitId){
		  var URI = BASE_URL + ROOT_URL + PATIENTS +'/'+ patientId + '/getCoversheetVitals?visitId='+visitId;
		  var promise = $http.get(URI)
		  .then(function(response){
		   if(response.data._status_Code === 200){
		    return (response.data.result);
		   }
		  },
		  function(){
		   $rootScope.showNotification(0,"",$rootScope.connectionError);
		  });
		  return promise;
		 }
	
}]);


//-------------- Allergy Service -------------------//
ehrApp.service('allergyService',['$http','$rootScope', function($http,$rootScope) {
	this.saveAllergy = function(allery,patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT +'/'+patientId+'/allergies';
		var promise = $http.post(URI, JSON.stringify(allery)).then(function(response) {
			$rootScope.showNotification(response.data._status_Code,response.data.result,response.data._error_message);
			return response;
		},
		function() {
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promise;
	};
	
	
	this.getAllergyList = function(patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/'+ patientId+"/allergies";
		var promise = $http.get(URI)
		.then(function(response){
			if(response.data._status_Code === 200){
				return (response.data.result);
			}else{
				$rootScope.showNotification(response.data._status_Code,response.data._status,response.data._error_message);
			}
		},
		function() {
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promise;
	}
	
	this.allergyMarkAsError = function(allergyId, patientId, param){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/'+patientId+"/allergies/allergyUpdate";
		var promise = $http.put(URI,JSON.stringify(param))
		.then(function(response){
				$rootScope.showNotification(response.data._status_Code,response.data.result,response.data._error_message);
				return (response.data.result);
		},
		function() {
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promise;
		
	}
	
	this.getOriginatorList = function(){
		var URI = BASE_URL + ROOT_URL + DOCTORS;
		var promise = $http.get(URI)
		.then(function(response){
				return (response.data.result);
		},
		function() {
			$rootScope.showNotification(0,"",$rootScope.connectionError);
			//alert("error");
		})
		return promise;
	}
}]);

//-------------- Lab Result Service -----------------//
ehrApp.service('labResultService',['$http',function($http){
	this.getLabResult = function(patientId, patientMrn){
		var URI = BASE_URL + ROOT_URL + LAB_RESULTS + '/'+ patientId +'/'+ patientMrn;
		var promise = $http.get(URI)
		.then(function(response){
			if(response.data._status_Code === 200){
				return (response.data.result);
			}
		},
		function() {
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promise;
	}
	
	this.getLabResultDateRange = function(patientId, patientMrn, upperDate, lowerDate){
		var URI = BASE_URL + ROOT_URL + LAB_RESULTS + '/'+ patientId +'/'+ patientMrn +'/dateRange?upper='+ upperDate +'&lower='+lowerDate;
		var promise = $http.get(URI)
		.then(function(response){
				return (response.data.result);
		},
		function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		});
		return promise;
	}
}]);

//--------------- Posting Service-----------------//
ehrApp.service('postingService',['$http','$rootScope',function($http,$rootScope){
	this.saveEdPosting = function(postingObj){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + postingObj.patientId + '/postings/ED';
		var promise = $http.post(URI, JSON.stringify(postingObj)).then(function(response) {
			$rootScope.showNotification(response.data._status_Code,response.data.result,response.data._error_message);
			return response;
		},
		function() {
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promise;
	}
	
	this.saveNonEdPosting = function(postingObj){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + postingObj.patientId + '/postings/nonED';
		var promise = $http.post(URI, JSON.stringify(postingObj)).then(function(response) {
			$rootScope.showNotification(response.data._status_Code,response.data.result,response.data._error_message);
			return response;
		},
		function() {
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promise;
	}
	
	this.getPostingList = function(patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/'+ patientId+"/postings";
		var promise = $http.get(URI)
		.then(function(response){
			if(response.data._status_Code === 200){
				return (response.data.result);
			}
		},
		function() {
			$rootScope.showNotification(0,"",$rootScope.connectionError);
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
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promise;
	}
}]);


//---------------Intake Output Module----------------//
ehrApp.service('intakeOutputService',['$http', function($http){
	
	this.saveIntake = function(intakeObj){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + intakeObj.patientId + '/intakeOutput';
		var promise = $http.post(URI, JSON.stringify(intakeObj)).then(function(response){
			return response;
		},function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promise;
	}
	
	this.getIntakeOutputList = function(patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/intakeOutput';
		var promise = $http.get(URI)
		.then(function(response){
			if(response.data._status_Code === 200){
				return (response.data.result);
			}
		},
		function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promise;
	}
}]);

//---------------------- POC -------------------------//
ehrApp.service('POCService',['$http','$rootScope', function($http,$rootScope){
	this.getPOCMasterList = function(){
		var URI = '';
		var promise = $http.get('json/POC.json')
		.then(function(response){
			if(response.status === 200){
				return response.data;
			}else{
				//response is different as compared to others
				$rootScope.showNotification(response.status,response.statusText,"");
			}
		},
		function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promise;
	}
	
	this.savePOC = function(pocObj,patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/POC';
		var promise = $http.post(URI,JSON.stringify(pocObj)).then(function(response){
			$rootScope.showNotification(response.data._status_Code,response.data.result,response.data._error_message);
			return response;
		},
		function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		});
		return promise;
	}
	
	this.getPOCList = function(patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/POC';
		var promise = $http.get(URI)
		.then(function(response){
			if(response.data._status_Code === 200){
				return (response.data.result);
				
			}
		},
		function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		});
		return promise;
	}
	
	this.pocMarkError = function(patientId,pocObj){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/POC/markError/';
		var promise = $http.put(URI,pocObj)
		.then(function(response){
			$rootScope.showNotification(response.data._status_Code,response.data.result,response.data._error_message);
			return response;
		},
		function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		});
		return promise;
	}
}]);



/*------------- Flag Module ----------------*/
ehrApp.service('FlagService',['$http','$rootScope',function($http,$rootScope){
	this.saveFlag = function(flagObj, patientId){
		var URI =  BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/flag';
		var promise = $http.post(URI, JSON.stringify(flagObj))
		.then(function(response){
			$rootScope.showNotification(response.data._status_Code,response.data.result,response.data._error_message);
			return response;
		},
		function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		});
		return promise;
	}
	
	this.getFlagList = function(patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/flag';
		var promise = $http.get(URI)
		.then(function(response){
			if(response.data._status_Code === 200){
				return response.data.result;
			}else{
				$rootScope.showNotification(response.data._status_Code,response.data._status,response.data._error_message);
			}
		},
		function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
			//alert("error")
		});
		return promise;
	}
	
	this.flagEnteredInError = function(flagId, patientId,param){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/flag/'+ flagId +'/markError';
		var promise = $http.put(URI, param)
		.then(function(response){
			$rootScope.showNotification(response.data._status_Code,response.data.result,response.data._error_message);
			if(response.data._status_Code === 200){
				return response.data.result;
			}
		},
		function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		});
		return promise;
	}

	this.updateFlag = function(patientId, flagObj){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/flag/'+ flagObj.flagId +'/';
		var promise = $http.put(URI, flagObj)
		.then(function(response){
			if(response.data._status_Code === 200){
				return response.data.result;
			}
		},
		function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		});
		return promise;
	}
	
	this.getFlagMasterList = function(){
		var URI = BASE_URL2 + '/flagList';
		var promise = $http.get(URI)
		.then(function(response){
			if(response.data._status_Code === 200){
				return response.data.result;
			}
			//return response.data;
		},
		function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
			//alert("error")
		});
		return promise;
	}
}]);

/*---------------- Medication -------------------*/
ehrApp.service('MedicationService',['$http','$rootScope',function($http,$rootScope){
	this.getMedicationList = function(patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/medications';
		var promise = $http.get(URI).then(function(response){
			if(response.data._status_Code === 200){
				return response.data.result;
			}
		},
		function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		});
		return promise;
	}
	
	this.getActiveMedicationsList = function(patientId){
		var URI =  BASE_URL + ROOT_URL + PATIENT + '/' + patientId + '/medications/active';
		var promise = $http.get(URI)
		.then(function(response){
			if(response.data._status_Code === 200){
				return response.data.result;
			}
		},function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		});
		return promise;
	}
}]);


/*------------- Patient Info ---------------*/
ehrApp.service('PatientInfoService',['$http',function($http){
	this.getPatientInfo = function(patientId){
		var URI = BASE_URL + ROOT_URL + PATIENT + '/' + patientId;
		var promise = $http.get(URI)
		.then(function(response){
			if(response.data._status_Code === 200){
				return response.data.result;
			}
		},
		function(){
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		});
		return promise;
	}
}]);

/*--------------- Order Service --------------*/
ehrApp.service('OrderService',['$http',function($http){
 this.getOrderReview = function(doctorId){
  var URI = BASE_URL + ROOT_URL + CPOE + '/' + doctorId +'/getOrdersReview';
  var promise = $http.get(URI)
  .then(function(response){
   if(response.data._status_Code === 200){
    return response.data.result;
   }
  },
  function(){
   $rootScope.showNotification(0,"",$rootScope.connectionError);
  });
  return promise;
 }
 
 this.fetchAllPatientList = function(doctorId){
  //var URI = urlConfig.url + 'doctors/'+doctorId+'/patients';
  var URI = BASE_URL + ROOT_URL + DOCTORS +"/"+doctorId+"/patients";
  var promis = $http.get(URI).then(function(response){
   if(response.data._status_Code === 200){
    return (response.data.result.patients);
   }
  },
  function() {
   $rootScope.showNotification(0,"",$rootScope.connectionError);
  })
  return promis;
 };
 
 this.getUnSignedOrderByPatientId = function(doctorId, patientId){
  var URI = BASE_URL + ROOT_URL + CPOE +"/"+doctorId + PATIENT + "/" + patientId +"/getUnsignedOrders";
  var promise =$http.get(URI).then(function(response){
   if(response.data._status_Code === 200){
    return (response.data.result);
   }
  },
  function(){
   $rootScope.showNotification(0,"",$rootScope.connectionError);
  })
  return promise;
 }
 
 this.updateUnSignedOrder = function(orderObj, doctorId){
  var URI = BASE_URL + ROOT_URL + CPOE +"/"+doctorId + "/signOrders";
  var promise =$http.put(URI, orderObj).then(function(response){
   if(response.data._status_Code === 200){
    return (response.data.result);
   }
  },
  function(){
   $rootScope.showNotification(0,"",$rootScope.connectionError);
  })
  return promise;
 }
 
 this.getOrdersByDate = function(doctorId, date){
  var URI = BASE_URL + ROOT_URL + CPOE +"/"+doctorId + "/getOrdersReview/Date?date="+date;
  var promise =$http.get(URI).then(function(response){
   if(response.data._status_Code === 200){
    return (response.data.result);
   }
  },
  function(){
   $rootScope.showNotification(0,"",$rootScope.connectionError);
  })
  return promise;
 }
 
 this.getFavoriteOrders = function(doctorId){
  var URI = BASE_URL + ROOT_URL + CPOE +"/getfavorites?userId="+doctorId;
  var promise = $http.get(URI).then(function(response){
   if(response.data._status_Code === 200){
    return response.data.result;
   }
  },
  function(){
   $rootScope.showNotification(0,"",$rootScope.connectionError);
  })
  return promise; 
 }
 
}]);

/*------------- File Upload ----------------*/
ehrApp.directive('fileModel', ['$parse', function ($parse) {
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

ehrApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file,patientId){
       var fd = new FormData();
       fd.append('file', file);
    
       var promise = $http.post(BASE_URL + '/file/' + patientId +'/upload', fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })
       .success(function(response){
    	   return response;
       })
    
       .error(function(){
       });
       return promise;
    }
 }]);

//------------- Template Services -----------------------//
ehrApp.service('templateService',['$http', function($http) {
 var GET_TEMPLATE_LIST_BY_DOCTOR_URI = "http://54.84.170.46:5100/ehr/template/7b6a2d7a-67c8-41db-94a2-98218dca024d";
 var URL = "http://35.154.76.183:3300/ehr/template/7b6a2d7a-67c8-41db-94a2-98218dca024d/";
 this.getTemplateListByDoctor = function(category){
  var promise = $http.get(URL+category).then(function(response){
   if(response.status == 200){
	   console.log(response.data.result)
    return response.data.result;
   }
  })
  return promise;
 } 
 
 var GET_CUSTOM_DOCTOR_TEMPLATE = "http://54.84.170.46:5100/ehr/doctor/7b6a2d7a-67c8-41db-94a2-98218dca024d/template/"; 
	//"http://54.84.170.46:5100/ehr/template/7b6a2d7a-67c8-41db-94a2-98218dca024d/";
	this.getDoctorCustomTemplate = function(templateId,patientId){
		var TEMP_URI = GET_CUSTOM_DOCTOR_TEMPLATE + templateId + "/patient/" + patientId;
		var promise = $http.get(TEMP_URI).then(function(response){
			if(response.status == 200){
				return response.data.result;
			}
		})
		return promise;
	}
}]);
