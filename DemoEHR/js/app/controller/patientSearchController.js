/**
 * AngularJs Patient Controller
 */

var patientSearchApp = angular.module("patientApp",['ngCookies','ngSanitize','ngAnimate', 'ui.bootstrap']);




patientSearchApp.controller("patientSearchController", ['$scope','$cookies','patientSearchService','$rootScope','$http','$window',function($scope,$cookies,patientSearchService, $rootScope,$http,$window) {
	$scope.doctorName = $cookies.get("doctorName");
	$scope.newCount = 0;
	$scope.admitedCount = 0;
	$scope.followUpCount = 0;
	$scope.otherCount = 0;
	$scope.mrn;
	
	$scope.newDate = getNewDate(new Date());
	
	//$scope.patientId = $cookies.get('patientId');
	
	$scope.doctorId = $cookies.get('doctorId');
	patientSearchService.fetchAllPatientList($scope.doctorId).then(function(data) {
		$scope.patientList = data;
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
	
	$scope.setPatient = function(patient){
		$cookies.put("patientMrn",patient.mrn);
		$cookies.get('patientMrn');
		$cookies.put("patientId",patient._id);
		$window.location.href = './home_page.html';
	}
	
	$scope.Countries = [];
	//$scope.Countries = patientSearchService.getPatientByMRN();
    $scope.SelectedCountry = null;
    //After select country event
    $scope.afterSelectedName = function (selected) {
        if (selected) {
			//console.log("===>"+selected);
			//console.log(selected);
            $scope.SelectedCountry = selected.originalObject;
        }
    }
    
    //-------Patient Search By Keywords------//
    $scope.searchBy = function (keyword,value) {
    	$scope.resetCounter();
    	//console.log(value);
    	if(value != undefined && value != ''){
    		patientSearchService.searchBy($scope.doctorId,keyword,value).then(function(data) {
        		//console.log(data);
        		$scope.patientList = data;
    		});
    	}else{
    	//if(value == undefined && value == ''){
    		$scope.resetCounter();
    		patientSearchService.fetchAllPatientList($scope.doctorId).then(function(data) {
    			$scope.patientList = data;
    		})
    	//}
    	}
    }
    

    //MRN Autocomplete
    $scope.searchMRN = function(val, searchBy) {
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
          //console.log(patientList);
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
    
  $scope.on_mrn_selected= function($item, $model, $label,keyword)
    {
	  	//console.log($item);
	  	//console.log($model);
	  	//console.log($label);
	  	//console.log(keyword);
	  	//var value = keyword == 'ward'? $item.ward : keyword == 'mrn' ? $item.mrn :'';
	  	if(keyword == 'ward')
	  		value = $item.ward;
	  	else if(keyword == 'mrn')
	  		value = $item.mrn;
        //var value = $item.ward;
	  	//console.log(value);
       // var keyword = "ward";
        $scope.resetCounter();
    	//console.log(value);
    	if(value != undefined && value != ''){
    		patientSearchService.searchBy($scope.doctorId,keyword,value).then(function(data) {
        		//console.log(data);
        		$scope.patientList = data;
    		});
    	}else{
    		$scope.resetCounter();
    		patientSearchService.fetchAllPatientList($scope.doctorId).then(function(data) {
    			$scope.patientList = data;
    		})
    	}
    }
  
  $scope.searchWard = function(value){
	    	var pwardList = [];
	    	return $http.get('http://35.154.76.183:5100/wardSearch/'+value, {
	        }).then(function(res){
	          angular.forEach(res.data, function(item){
	        	  var obj = {id:'',wardCode:'', wardDesc:'', gender:''};
	            obj.id = item._id;
	            obj.wardCode = item.Ward_Code;
	            obj.wardDesc = item.Ward_Description;
	            obj.gender = item.Gender
	            pwardList.push(obj);
	          });
	          //console.log(pwardList);
	          return pwardList;
	        });
  }
  
  
  $scope.searchDepartment = function(value){
	  var deptList = [];
	  return $http.get('http://35.154.76.183:5100/departmentSearch/'+value, {
      }).then(function(res){
        angular.forEach(res.data, function(item){
      	  var obj = {deptId:'',ID_HIS:'', code:'', desc:'', isClinical:''};
          obj.deptId = item._id;
          obj.ID_HIS = item.ID_HIS;
          obj.code = item.Code;
          obj.desc = item.Description
          obj.isClinical = item.IsClinical
          deptList.push(obj);
        });
        //console.log(deptList);
        return deptList;
      });
  }
  
  $scope.searchClinic = function(value){
	  var clinicList = [];
	  return $http.get('http://35.154.76.183:5100/clinicSearch/'+value, {
      }).then(function(res){
        angular.forEach(res.data, function(item){
      	  var obj = {deptId:'',ID_HIS:'', code:'', desc:'', isClinical:''};
          obj.deptId = item._id;
          obj.ID_HIS = item.ID_HIS;
          obj.code = item.Code;
          obj.desc = item.Description
          obj.isClinical = item.IsClinical
          clinicList.push(obj);
        });
        //console.log(clinicList);
        return clinicList;
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
  
  //--------------- get patient vital, lab , pharmacy details -------------//
  $scope.getPatientVitalLabPharmacy = function(patientId){
	  $scope.vitalLabPharmacyList = "";
	  patientSearchService.getPatientVitalLabPharmacy(patientId).then(function(data){
		  //console.log(data);
		  $scope.vitalLabPharmacyList = data;
	  })
  }
    
  $scope.getDate = function(dateStr){
		return convertJSONStringToDate(dateStr);
	}
}]);