/**
 * AngularJs Patient Controller
 */

/*var patientSearchApp = angular.module("patientApp",['ngCookies','ngSanitize','ngAnimate', 'ui.bootstrap']);*/

ehrApp.controller("patientSearchController", ['$scope','$cookies','patientSearchService','$rootScope','$http','$window','setGetService','Authorization','$location','socket','cfpLoadingBar',
                                                function($scope,$cookies,patientSearchService, $rootScope,$http,$window,setGetService,Authorization,$location, socket, cfpLoadingBar) {
	
	
	socket.emit('init', {userId: setGetService.getValue().doctorId});

	
	socket.on('refresh',function(list){
            $scope.notificationList = list;
            $scope.count = list.length;
          });
	
	$scope.count = function(){
			var itemsLength = Object.keys($scope.notificationList).length;
	}
	
	$scope.start = function() {
	      cfpLoadingBar.start();
	    };	
	    
	/*
		Patient Tab Details
	 */
	$scope.newTab 		= "New";
	$scope.followupTab  = "Follow Up";
	$scope.admittedTab  = "Admitted";
	$scope.otherTab 	= "Other";
	
	
	$scope.doctorName = setGetService.getValue().doctorName;
	$scope.newCount = 0;
	$scope.admitedCount = 0;
	$scope.followUpCount = 0;
	$scope.otherCount = 0;
	$scope.mrn;
	
	$scope.newlimit = 4;

	
	$scope.newDate = getNewDate(new Date());
	
	//$scope.patientId = $cookies.get('patientId');
	
	$scope.doctorId = setGetService.getValue().doctorId; //$cookies.get('doctorId');
	patientSearchService.fetchAllPatientList($scope.doctorId).then(function(data) {
		//$scope.patientList = data;
		$scope.sortPatientByVisitType(data);
		$rootScope.loading = false;
	});
	
	//**********************************DATEPICKER**********************************//*
   $scope.today = function() {
  	    $scope.dt = new Date();
  	  };
  	
  	  $scope.openPatientSearchDate = function() {
  		
  	    $scope.popupPatientSearchDate.opened = true;
  	  };

  	  $scope.popupPatientSearchDate = {
  			
  	    opened: false
  	  };
	
	$scope.getNewCount = function() {
	   return $scope.newCount++;
	}
	$scope.getAdmitedCount = function() {
		   return $scope.admitedCount++;
		}
	$scope.getfollowUpCount = function() {
		   return $scope.followUpCount++;
		}
	$scope.getOtherCount = function() {
		   return $scope.otherCount++;
		}
	
	$scope.parsejson = function (patient) {
		return patient;
	}
	
	$scope.setPatient = function(mrn,id,visitId, gender){
		$rootScope.loading = true;
		var patientVal = {'doctorId':$scope.doctorId, 'patientMRN':mrn, 'doctorName':setGetService.getValue().doctorName, 'patientId':id, 'visitId':visitId, 'gender':gender};
		setGetService.setValue(patientVal);
		Authorization.go('homePage');
		//$location.path("/homePage");
		
		/*$cookies.put("patientMrn",patient.mrn);
		$cookies.get('patientMrn');
		$cookies.put("patientId",patient._id);
		$window.location.href = './home_page.html';*/
	}
	
	$scope.Countries = [];
	//$scope.Countries = patientSearchService.getPatientByMRN();
    $scope.SelectedCountry = null;
    //After select country event
    $scope.afterSelectedName = function (selected) {
        if (selected) {
            $scope.SelectedCountry = selected.originalObject;
        }
    }
    
    //-------Patient Search By Keywords------//
    $scope.searchBy = function (keyword,value) {
    	$scope.resetCounter();
    	if(value != undefined && value != ''){
    		patientSearchService.searchBy($scope.doctorId,keyword,value).then(function(data) {
        		//$scope.patientList = data;
    			$scope.sortPatientByVisitType(data);
    		});
    	}else{
    	//if(value == undefined && value == ''){
    		$scope.resetCounter();
    		patientSearchService.fetchAllPatientList($scope.doctorId).then(function(data) {
    			//$scope.patientList = data;
    			$scope.sortPatientByVisitType(data);
    		})
    	//}
    	}
    }
    

    //MRN Autocomplete
    /*$scope.searchMRN = function(val, searchBy) {
    	if(val.length >= 2){
    	var patientList = [];
    	return $http.get(BASE_URL + ROOT_URL + DOCTORS +"/"+ $scope.doctorId +"/searchPatient?searchBy="+ searchBy +'&searchValue='+val, {
        }).then(function(res){
          angular.forEach(res.data.result, function(item){
        	  var obj = {name:'',mrn:'', ward:''};
            obj.name = item.name;
            obj.mrn = item.mrn;
            obj.ward = item.visitRecords[0].location;
            patientList.push(obj);
          });
          return patientList;
        },function() {
            $rootScope.showNotification(0,"",$rootScope.connectionError);
            //alert("error");
           });
      };
    }*/
    
    $scope.searchMRN = function(val, searchBy) {
    	if(val.length >= 2){
	    	var patientList = [];
	    	return patientSearchService.getPatientByMrn($scope.doctorId,searchBy,val).then(function(data) {
	    		//$scope.patientList = data;
	    		//console.log(data);
	    		angular.forEach(data, function(item){
	          	  var obj = {name:'',mrn:'', ward:''};
	              obj.name = item.name;
	              obj.mrn = item.mrn;
	              obj.ward = item.visitRecords[0].location;
	              patientList.push(obj);
	            });
	            return patientList;
			});
      };
    }
    // Reset Counter
    $scope.resetCounter = function(){
    	$scope.newCount = 0;
    	$scope.admitedCount = 0;
    	$scope.followUpCount = 0;
    	$scope.otherCount = 0;
    }
    
    $scope.resetSearchFields = function(keyword, value){
    	$scope.mrn = (('mrn' == keyword) ? value :"");
    	$scope.ward = (('ward' == keyword) ? value :"");
    	$scope.department = (('department' == keyword) ? value :"");
    	$scope.clinic =(('clinic' == keyword) ? value :"");
    	
    	//alert('keyword : '+keyword + " :: value : "+value);
    }
    
    $scope.on_item_selected = function($item, $model, $label,keyword){
    	    var value = "";
    	    
    		if(keyword == 'ward'){
    	     value = $item.wardDesc;
    	     $scope.mrn="";
    	     $scope.department ="";
    	     $scope.clinic = "";
    		}
    	    else if(keyword == 'mrn'){
    	    	var str = $item.mrn;
    	    	var arr = str.split(" - ");
    	    	value = arr[0];
    	    	
    	    	$scope.ward="";
       	     $scope.department ="";
       	     $scope.clinic = "";
    	    }
    	    else if(keyword == 'department'){
    	     value = $item.desc;
    	     $scope.ward="";
       	     $scope.mrn ="";
       	     $scope.clinic = "";
    	    }
    	    else if(keyword == 'clinic'){
    	     value = $item.desc
    	     $scope.ward="";
       	     $scope.mrn ="";
       	     $scope.department = "";
    	    }
    	      $scope.resetCounter();
    		//$scope.resetSearchFields(keyword, value);
    	   if(value != undefined && value != ''){
    	    patientSearchService.searchBy($scope.doctorId,keyword,value).then(function(data) {
    	        //$scope.patientList = data;
    	    	$scope.sortPatientByVisitType(data);
    	        //$scope.clearAllPatientSearchFeilds();
    	    });
    	   }else{
    	    /*$scope.resetCounter();
    	    patientSearchService.fetchAllPatientList($scope.doctorId).then(function(data) {
    	     $scope.patientList = data;
    	    })*/
    	   }
    	  }
  
  $scope.searchWard = function(value){
	    	var pwardList = [];
	    	return $http.get(BASE_URL2+'/wardSearch/'+value, {
	        }).then(function(res){
	        	if(res.data._status_Code === 200){
		          angular.forEach(res.data.result, function(item){
		        	  var obj = {id:'',wardCode:'', wardDesc:'', gender:''};
		            obj.id = item._id;
		            obj.wardCode = item.Ward_Code;
		            obj.wardDesc = item.Ward_Description;
		            obj.gender = item.Gender
		            pwardList.push(obj);
		          });
		          return pwardList;
	        	}
	        },function() {
	            $rootScope.showNotification(0,"",$rootScope.connectionError);
	            //alert("error");
	         });
  }
  
  
  $scope.searchDepartment = function(value){
	  var deptList = [];
	  return $http.get(BASE_URL2+'/departmentSearch/'+value, {
      }).then(function(res){
    	  if(res.data._status_Code === 200){
	        angular.forEach(res.data.result, function(item){
	      	  var obj = {deptId:'',ID_HIS:'', code:'', desc:'', isClinical:''};
	          obj.deptId = item._id;
	          obj.ID_HIS = item.ID_HIS;
	          obj.code = item.Code;
	          obj.desc = item.Description
	          obj.isClinical = item.IsClinical
	          deptList.push(obj);
	        });
	        return deptList;
    	  }
      },function() {
    	     $rootScope.showNotification(0,"",$rootScope.connectionError);
    	     //alert("error");
    	 });
  }
  
  $scope.searchClinic = function(value){
	  var clinicList = [];
	  return $http.get(BASE_URL2+'/clinicSearch/'+value, {
      }).then(function(res){
    	  if(res.data._status_Code === 200){
		        angular.forEach(res.data.result, function(item){
		      	  var obj = {deptId:'',ID_HIS:'', code:'', desc:'', isClinical:''};
		          obj.deptId = item._id;
		          obj.ID_HIS = item.ID_HIS;
		          obj.code = item.Code;
		          obj.desc = item.Description
		          obj.isClinical = item.IsClinical
		          clinicList.push(obj);
		        });
		        return clinicList;
    	  }
      },function() {
    	     $rootScope.showNotification(0,"",$rootScope.connectionError);
    	     //alert("error");
    });
  }
  
  $scope.vitalRangeCheck = function(val, minVal,maxVal) {
	    var intVal = parseFloat(val);
	    var intMinVal = parseFloat(minVal);
	    var intMaxVal = parseFloat(maxVal);
	    //alert(intVal+"_"+intMinVal+"_"+intMaxVal);
	    //alert(intVal >= intMinVal || intVal <= intMaxVal);
	    if(intVal >= intMinVal || intVal <= intMaxVal) {
	        return false;
	    } else {
	        return true;
	    }
	}
 
  //-------------- blur method --------------//
  $scope.getAllPatients = function(keyword){
	  if(keyword == ''){
		  $scope.resetCounter();
		  patientSearchService.fetchAllPatientList($scope.doctorId).then(function(data) {
			  //$scope.patientList = data;
			  $scope.sortPatientByVisitType(data);
		  });
	  }
  }
  
  $scope.newPatientList = [];
  $scope.followupPatientList = [];
  $scope.admittedPatientList = [];
  $scope.otherPatientList = [];
  
  $scope.sort1 = function(type,arg1,arg2) {
	  $scope.sort2($scope.newPatientList,type,arg1,arg2);
	  $scope.sort2($scope.followupPatientList,type,arg1,arg2);
	  $scope.sort2($scope.admittedPatientList,type,arg1,arg2);
	  $scope.sort2($scope.otherPatientList,type,arg1,arg2);
  }
  
  $scope.sort2 = function(patientList,type,arg1,arg2) {
	  patientList.sort(function(a, b) {
		  var nameA;
		  var nameB;
		  if(arg1 != ''){
			  nameA = angular.uppercase(a[arg1][0][arg2]);
			  nameB = angular.uppercase(b[arg1][0][arg2]);
		  }else{
			  nameA = angular.uppercase(a[arg2]);
			  nameB = angular.uppercase(b[arg2]);
		  }
		  
		  if(type === 'string'){
			  if (nameA < nameB) {
			    return -1;
			  }
			  if (nameA > nameB) {
			    return 1;
			  }
			  // names must be equal
			  return 0;
		  }else if(type === 'int'){
			  return parseInt(nameA) - parseInt(nameB);
		  }
	  });
  }
  
  $scope.sortPatientByVisitType = function(patientData) {
	  resetPatientListObj();
	  angular.forEach(patientData, function(patientObj){
		  switch (patientObj.visitRecords[0].visitType) {
		    case $scope.newTab:
		    	$scope.newPatientList.push(patientObj);
		    	$scope.getNewCount();
		        break;
		    case $scope.followupTab:
		    	$scope.followupPatientList.push(patientObj);
		    	$scope.getfollowUpCount();
		        break;
		    case $scope.admittedTab:
		    	$scope.admittedPatientList.push(patientObj);
		    	$scope.getAdmitedCount();
		        break;
		    case $scope.otherTab:
		    	$scope.otherPatientList.push(patientObj);
		    	$scope.getOtherCount();
		        break;
		    default :
		  }
      });
  }
  
  function resetPatientListObj(){
	  $scope.newPatientList = [];
	  $scope.followupPatientList = [];
	  $scope.admittedPatientList = [];
	  $scope.otherPatientList = [];
  }
  
  //--------------- get patient vital, lab , pharmacy details -------------//
  $scope.getPatientVitalLabPharmacy = function(patientId){
	  $scope.vitalLabPharmacyList = "";
	  patientSearchService.getPatientVitalLabPharmacy(patientId).then(function(data){
		  $scope.vitalLabPharmacyList = data;
	  })
  }
    
  $scope.getDate = function(dateStr){
		return convertJSONStringToDate(dateStr);
  }
  
  $scope.getAgeByDate = function(dateStr){
	   return getAge(dateStr);
  }
  
  $scope.clearAllPatientSearchFeilds = function(){
	  $scope.mrn        = "";
	  $scope.ward       = "";
	  $scope.department = "";
	  $scope.clinic     = "";
  }
  
  $scope.lowerLimit = 4;
  $scope.newLimit = $scope.followUpLimit = $scope.admitedLimit = $scope.otherLimit = $scope.lowerLimit;
  
  $scope.toggleLimit = function(type,limit,arrowId){
	  arrowToggle(arrowId);
	  switch (type) {
	    case $scope.newTab:
	    	if(limit > $scope.lowerLimit)
	    		$scope.newLimit = $scope.lowerLimit;
	    	else
	    		$scope.newLimit = $scope.newCount;
	        break;
	    case $scope.followupTab:
	    	if(limit > $scope.lowerLimit)
	    		$scope.followUpLimit = $scope.lowerLimit;
	    	else
	    		$scope.followUpLimit = $scope.followUpCount;
	        break;
	    case $scope.admittedTab:
	    	if(limit > $scope.lowerLimit)
	    		$scope.admitedLimit = $scope.lowerLimit;
	    	else
	    		$scope.admitedLimit = $scope.admitedCount;
	        break;
	    case $scope.otherTab:
	    	if(limit > $scope.lowerLimit)
	    		$scope.otherLimit = $scope.lowerLimit;
	    	else
	    		$scope.otherLimit = $scope.otherCount;
	        break;
	    default :
	  }
  }

  var arrowToggle = function(arrowId) {
	  angular.element(document.getElementById(arrowId)).toggleClass("fa-angle-up fa-angle-down");
  }
  
}]);
ehrApp.factory('socket', function ($rootScope) {
  var socket = io.connect(BASE_URL);
  return {
	  on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});;


