//======================================Lab Order==============================================================
ehrApp.controller("labOrderController",['$scope','$rootScope','commonCrudService','VitalReviewService',function($scope,$rootScope,commonCrudService,VitalReviewService) {
	var orderItemsNew = new Array();
	$scope.orderId1;
	 $scope.today = function() {
	   	    $scope.orderItems.collectionDate = new Date();
	   	  };
	   	 
	   	  
	$scope.saveLabOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.lab.$valid){
			$scope.orderItems.orderName = $scope.orderItems.labTest;
			//console.log($scope.orderItems);
			orderItemsNew.push($scope.orderItems);
			
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Lab Order",$rootScope.subCategoryValue).then(function(data){
				$scope.$broadcast('show-errors-reset');
				$scope.getOrderList();
				$scope.init();
			});
		}
	};
	
	
	//**********************************DATEPICKER**********************************//*
    $scope.today = function() {
        $scope.dt = new Date();
      };
    
      $scope.openLabCollectionDate = function() {
     
        $scope.popupLabCollectionDate.opened = true;
      };

      $scope.popupLabCollectionDate = {
      
        opened: false
      };
	
    /*********************  COMPLEX ACTIVE INACTIVE ***************************/
      $scope.message = 'Active';
      $scope.status = true;
      $scope.onChange = function(state) {
          if($scope.status)
       	   {
       	   $scope.message = 'Active';
       	   $scope.complexActiveInactive.status = "active";
       	   }
          else
       	   {
       	   $scope.message = 'Inactive';
       	   $scope.complexActiveInactive.status = "inactive";
       	   }
         
      };
      
      
      
      $scope.message = 'Active';
      $scope.status1 = true;
      $scope.onChange1 = function(state) {
          if($scope.status)
       	   {
       	   $scope.message = 'Active';
       	   $scope.complexActiveInactive1.status1 = "active";
       	   }
          else
       	   {
       	   $scope.message = 'Inactive';
       	   $scope.complexActiveInactive1.status1 = "inactive";
       	   }
         
      };
	//getOrderList();

	$scope.cancelOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			$scope.getOrderList();
		});
	}
		
	
	
	$scope.getOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	$scope.updateLabOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.lab.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Lab Order",$rootScope.subCategoryValue).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				//console.log("update");
				//console.log($scope.orderItems);
				$scope.getOrderList();
				$scope.init();
			});
		}
	}
	
	 $scope.getOrderList = function(){
		//console.log($rootScope.patientInfo);
		commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"Lab Order",$rootScope.subCategoryValue).then(function(data) {
			$scope.getLabOrderList = data;
		});
	}
	 $scope.orderItems = {};
	 
	 $scope.init = function(){
			$scope.orderItems = angular.copy({
				"category"		:"",
				"labTest"		:"",
				"collectSample"	:"",
				"specimen"		:"",
				"billingCode"	:"",
				"urgency"		:"",
				"collectionType":"",
				"collectionDate":"",
				"howOften"		:"",
				"howLong"		:"",
				"description"	:"",
				"orderName"     :"",
				"category"		:"biochemistry",
				"urgency"		:"regular",
				"collectionType":"labCollect",
				"offen"			:"once"
			});
		}
	 $scope.init();
	
	/*$scope.reset = function() {
		$scope.orderItems = angular.copy({});
		console.log($scope.lab);
	};*/
}]);

//==========================================Imaging Order==========================================================
ehrApp.controller("imagingOrderController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
	var orderItemsNew = new Array();
	$scope.orderId1;

	$scope.saveImagingOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.imagingOrderForm.$valid){
			$scope.orderItems.orderName = $scope.orderItems.imagingProcedure;
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Imaging Order", $rootScope.subCategoryValue).then(function(data){
				$scope.$broadcast('show-errors-reset');
				getImagingOrderList();
				$scope.init();
			});
		}
	};
	

	 //**********************************DATEPICKER FOR Requested date**********************************//*
	      $scope.today = function() {
	          $scope.dt = new Date();
	        };
	      
	        $scope.openImagingRequestedDate = function() {
	       
	          $scope.popupImagingRequestedDate.opened = true;
	        };

	        $scope.popupImagingRequestedDate = {
	        
	          opened: false
	        };
	
	
	//getImagingOrderList();

	$scope.cancelImagingOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getImagingOrderList();
		});
	}
		
	$scope.getImagingOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	$scope.updateImagingOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.imagingOrderForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Imaging Order",$rootScope.subCategoryValue).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				//console.log("update");
				//console.log($scope.orderItems);
				getImagingOrderList();
				$scope.init();
			});
		}
	}
	
	function getImagingOrderList(){
	commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"Imaging Order",$rootScope.subCategoryValue).then(function(data) {
		$scope.getImagingOrderList = data;
		});
	}
	
	$scope.orderItems = {};
	$scope.init = function() {
		$scope.orderItems = angular.copy({
			"billingCode"            :"",
			"imagingType"            :"radiology",
			"imagingProcedure"       :"",
			"modifier"               :"",
			"requestedDate"          :"",
			"urgency"                :"",
			"transport"              :"wheelChair",
			"category"               :"op",
			"submitTo"				 :"",
			"isolation"				 :"",
			"preOpScheduled"		 :"",
			"historyAndReasonForExam":"",
			"examOverLast7Days"      :"",
			"orderName"              :"",
			"urgency"				 :"regular",
		});
	};
	$scope.init();
}]);

//=====================================IP Pharmacy==========================================================================================
ehrApp.controller("ipPharmacyController",['$scope','$rootScope','commonCrudService','$http',function($scope,$rootScope,commonCrudService,$http) {
	var orderItemsNew = new Array();
	$scope.orderId1;

	$scope.saveIpPharmacyOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.ipPharmacyForm.$valid){
			$scope.orderItems.orderName = $scope.orderItems.drugName;
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"IP Pharmacy",$rootScope.subCategoryValue).then(function(data){
				$scope.$broadcast('show-errors-reset');
				getIpPharmacyOrderList();
				$scope.init();
			});
		}
	};
	
	//getIpPharmacyOrderList();

	$scope.cancelIpPharmacyOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getIpPharmacyOrderList();
		});
	}
		
	$scope.getIpPharmacyOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	$scope.updateIpPharmacyOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
			if($scope.ipPharmacyForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"IP Pharmacy",$rootScope.subCategoryValue).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				//console.log("update");
				//console.log($scope.orderItems);
				getIpPharmacyOrderList();
				$scope.init();
			});
		}
	}
	
	function getIpPharmacyOrderList(){
	commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"IP Pharmacy",$rootScope.subCategoryValue).then(function(data) {
		$scope.getIpPharmacyOrderList = data;
		});
	}
	$scope.init = function() {
		$scope.orderItems = angular.copy({
			"billingCode":"",
			"drugName"   :"",
			"route"      :"",
			"schedule"   :"",
			"priority"   :"regular",
			"comments"   :"",
			"warning"    :"",
			"orderName"  :""
		});
	};
	$scope.init();
	
	
	 //**********************************DATEPICKER FOR Requested date**********************************//*
    $scope.today = function() {
        $scope.dt = new Date();
      };
    
      $scope.openIVDate = function() {
     
        $scope.popupIVDate.opened = true;
      };

      $scope.popupIVDate = {
      
        opened: false
      };
	
      
      /*--------------------- Autocomplete --------------------*/
      $scope.searchDosage = function(value, searchBy){
    		//if(value.length >= 2){
    	    	var drugList = [];
    	    	return $http.get(BASE_URL2+'/drugSearch/'+value, {
    	        }).then(function(response){
    	        	if(response.data._status_Code === 200){
		    	          angular.forEach(response.data.result, function(generic){
		    	        	  var obj = {generic_id:'',generic_name:'', };
		    	            obj.generic_id = generic._id;
		    	            obj.generic_name = generic.Generic_name;
		    	            drugList.push(obj);
		    	          });
		    	          //console.log(drugList);
		    	          return drugList;
    	        	}
    	        },function() {
    	            $rootScope.showNotification(0,"",$rootScope.connectionError);
    	            //alert("error");
    	           });
    	   //   }
    	}
     
    	$scope.on_drug_selected = function($item, $model, $label){
    		$scope.orderItems.drugId = $item.generic_id;
    			return $http.get(BASE_URL2+'/drugSearchById/'+$item.generic_id, {
    	        }).then(function(response){
    	        	if(response.data._status_Code === 200){
	    	        	var value = response.data.result[0].Strength_value;
	    	        	var unit = response.data.result[0].Unit_of_strength;
	    	        	$scope.orderItems.dosage = value + unit;
	    	        	return '';
    	        	}
    	        },function() {
    	            $rootScope.showNotification(0,"",$rootScope.connectionError);
    	            //alert("error");
    	           });
    	}
}]);

//==================================IV Pharmacy============================================================================================
ehrApp.controller("ivPharmacyController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
	var orderItemsNew = new Array();
	$scope.orderId1;
	
	/*- created demo code-*/
	 $scope.example13model = [];
     $scope.example13data = [
         {id: 1, label: "David"},
         {id: 2, label: "Jhon"},
         {id: 3, label: "Lisa"},
         {id: 4, label: "Nicole"},
         {id: 5, label: "Danny"}];
     
     
     
     
     $scope.example13settings = {
         smartButtonMaxItems: 3,
          enableSearch: true,
         smartButtonTextConverter: function(itemText, originalItem) {
             if (itemText === 'Jhon') {
             return 'Jhonny!';
             }
     
             return itemText;
         }
     };
     /*- created demo code end -*/
	
	/*- jyoti demo code-*/
	//$scope.orderItems.medication = [];
	$scope.medicationOption = [
	                        {id: 1, label: "NormalSaline - 0.9%"},
	                        {id: 2, label: "Dextrose NS"},
	                        {id: 3, label: "Laxtated Ringers"}
	                        ];
	
	   
    $scope.example13settings = {
        smartButtonMaxItems: 3,
         enableSearch: true,
        smartButtonTextConverter: function(itemText, originalItem) {
            if (itemText === 'NormalSaline - 0.9%') {
            return 'NormalSaline - 0.9%';
            }
    
            return itemText;
        }
    };
    
    /*--*/
	$scope.saveIvPharmacyOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.ivPharmacyForm.$valid){
			$scope.orderItems.orderName = "";
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"IV Pharmacy",$rootScope.subCategoryValue).then(function(data){
				$scope.$broadcast('show-errors-reset');
				getIvPharmacyOrderList();
				$scope.init();
			});
		}
	};
	
	//getIvPharmacyOrderList();

	$scope.cancelIvPharmacyOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getIvPharmacyOrderList();
		});
	}
		
	$scope.getIvPharmacyOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	$scope.updateIvPharmacyOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.ivPharmacyForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"IV Pharmacy",$rootScope.subCategoryValue).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				//console.log("update");
				//console.log($scope.orderItems);
				getIvPharmacyOrderList();
				$scope.init();
			});
		}
	}
	
	function getIvPharmacyOrderList(){
	commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"IV Pharmacy",$rootScope.subCategoryValue).then(function(data) {
		$scope.getIvPharmacyOrderList = data;
		});
	}
	$scope.orderItems = {};
	$scope.init = function() {
		$scope.orderItems = angular.copy({
			"billingCode"      :"",
			"solutions"        :"",
			"medication"       :"",
			"volume"           :"",
			"additiveFrequency":"",
			"route"            :"",
			"type"             :"",
			"prn"              :"",
			"schedule"         :"",
			"infusionRate"     :"",
			"priority"         :"regular",
			"duration"         :"",
			"totalVolume"      :"",
			"orderName"        :""
		});
	};
	$scope.init();
	
	
	 //**********************************DATEPICKER FOR Requested date**********************************//*
    $scope.today = function() {
        $scope.dt = new Date();
      };
    
      $scope.openImagingRequestedDate = function() {
     
        $scope.popupImagingRequestedDate.opened = true;
      };

      $scope.popupImagingRequestedDate = {
      
        opened: false
      };
}]);

//=====================================Procedure Surgical=========================================================================================
ehrApp.controller("procedureSurgicalOrderController",['$scope','$rootScope','commonCrudService','$http',function($scope,$rootScope,commonCrudService,$http) {
	var orderItemsNew = new Array();
	$scope.orderId1;

	$scope.saveProcedureSurgicalOrder = function(){
		
		$scope.$broadcast('show-errors-check-validity');
		if($scope.procedureSurgicalOrderForm.$valid){
			$scope.orderItems.orderName = $scope.orderItems.procedureName;
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Procedure/Surgical",$rootScope.subCategoryValue).then(function(data){
				$scope.$broadcast('show-errors-reset');
				getProcedureSurgicalOrderList();
				$scope.init();
			});
		}
	};
	
	//getProcedureSurgicalOrderList();

	$scope.cancelProcedureSurgicalOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getProcedureSurgicalOrderList();
		});
	}
		
	$scope.getProcedureSurgicalOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	$scope.updateProcedureSurgicalOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.procedureSurgicalOrderForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Procedure/Surgical",$rootScope.subCategoryValue).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				//console.log("update");
				//console.log($scope.orderItems);
				getProcedureSurgicalOrderList();
				$scope.init();
			});
		}
	}
	
	function getProcedureSurgicalOrderList(){
	commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"Procedure/Surgical",$rootScope.subCategoryValue).then(function(data) {
		$scope.getProcedureSurgicalOrderList = data;
		});
	}
	$scope.orderItems ={};
	$scope.init = function() {
		$scope.orderItems = angular.copy({
			"billingCode"                  :"",
			"patientWillSeen"              :"inpatient",
			"procedureName"                :"",
			"consultpatient"               :"",
			"urgency"                      :"regular",
			"attention"                    :"",
			"clinicalIndicateDate"         :"",
			"serviceToPerformThisProcedure":"",
			"reasonForRequest"             :"",
			"provisionalDiagnosis"         :"",
			"orderName"                    :""
		});
	};
	$scope.init();
	
	/* ================ Procedure/Surgical Order Autocomplete ================= */
	/* $scope.searchProcedureName = function(keyword){
		 var procedureNameList = [];
		 commonCrudService.searchProcedureName(keyword).then(function(result){
			 console.log(result.data);
			 angular.forEach(result.data, function(item){
	       	  var obj = {id:'',procedureId:'', procedureName:'', serviceId: ''};
	           obj.id = item._id;
	           obj.procedureId = item.Procedure_Id;
	           obj.procedureName = item.Procedure_Name;
	           obj.serviceId = item.Service_Id;
	           procedureNameList.push(obj);
	         });
			 console.log(procedureNameList);
			 return procedureNameList;
		 });
	 }*/
	 
	  $scope.searchProcedureName = function(keyword) {
	    	//if(val.length >= 2){
		  var procedureNameList = [];
	    	return $http.get(BASE_URL2+"/procedureSearch/"+keyword, {
	        }).then(function(res){
	        	if(res.data._status_Code === 200){
			          angular.forEach(res.data.result, function(item){
			        	  var obj = {id:'',procedureId:'', procedureName:'', serviceId: ''};
				           obj.id = item._id;
				           obj.procedureId = item.Procedure_Id;
				           obj.procedureName = item.Procedure_Name;
				           obj.serviceId = item.Service_Id;
				           procedureNameList.push(obj);
			          });
			          //console.log(patientList);
			          return procedureNameList;
	        	}
	        },function() {
	            $rootScope.showNotification(0,"",$rootScope.connectionError);
	            //alert("error");
	           });
	      };
	      
	      //-----ICD code ---//
	  	$scope.searchPreferredProblemList = function(val){
			//if(val.length >= 2){
		    	var problemList = [];
		    	return $http.get(BASE_URL2+'/icdCodeSearch/'+val, {
		        }).then(function(res){
		        	if(res.data._status_Code === 200){
				          angular.forEach(res.data.result, function(item){
				        	  var obj = {id:'',code:'', desc:''};
				            obj.id = item._id;
				            obj.code = item.CODE;
				            obj.desc = item.SHORT_Discription;
				            problemList.push(obj);
				          });
				          return problemList;
		        	}
		        },function() {
		            $rootScope.showNotification(0,"",$rootScope.connectionError);
		            //alert("error");
		           });
		    //  };
		}
	      
	    //**********************************DATEPICKER FOR Requested date**********************************//*
	      $scope.today = function() {
	          $scope.dt = new Date();
	        };
	      
	        $scope.openProcedureClinicDate = function() {
	       
	          $scope.popupProcedureClinicDate.opened = true;
	        };

	        $scope.popupProcedureClinicDate = {
	        
	          opened: false
	        };
	      
	    
}]);

//======================================General========================================================================================
ehrApp.controller("generalController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
	var orderItemsNew = new Array();
	$scope.orderId1;

	/*$scope.saveGeneralOrder = function(){
		orderItemsNew.push($scope.orderItems);
		console.log(orderItemsNew);
		commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"General",$rootScope.subCategoryValue).then(function(data){
			getGeneralOrderList();
			$scope.init();
		});
	};*/
	$scope.saveGeneralOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.generalForm.$valid){
			$scope.orderItems.orderName = $scope.orderItems.order;
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"General",$rootScope.subCategoryValue).then(function(data){
				$scope.$broadcast('show-errors-reset');
				getGeneralOrderList();
				$scope.init();
			});
		}
	};
	
	//getGeneralOrderList();

	$scope.cancelGeneralOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getGeneralOrderList();
		});
	}
		
	$scope.getGeneralOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	/*$scope.updateGeneralOrder = function(){
		orderItemsNew = new Array();
		orderItemsNew.push($scope.orderItems);
		commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"General",$rootScope.subCategoryValue).then(function(data) {
			console.log("update");
			console.log($scope.orderItems);
			getGeneralOrderList();
			$scope.init();
		});
	}*/
	$scope.updateGeneralOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.generalForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"General",$rootScope.subCategoryValue).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				//console.log("update");
				//console.log($scope.orderItems);
				getGeneralOrderList();
				$scope.init();
			});
		}
	}
	
	function getGeneralOrderList(){
	commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"General",$rootScope.subCategoryValue).then(function(data) {
		$scope.getGeneralOrderList = data;
		});
	}
	$scope.orderItems = {};
	$scope.init = function() {
		$scope.orderItems = angular.copy({
			"billingCode":"",
			"order"      :"",
			"startDate"  :"",
			"stopDate"   :"",
			"orderName"  :"",
			"urgency"	 :"regular"
		});
	};
	$scope.init();
	
	 //**********************************DATEPICKER FOR Requested date**********************************//*
    $scope.today = function() {
        $scope.dt = new Date();
      };
    
      $scope.openGeneralOrderStartDate = function() {
     
        $scope.popupGeneralOrderStartDate.opened = true;
      };

      $scope.popupGeneralOrderStartDate = {
      
        opened: false
      };
      
      
        $scope.openGeneralOrderEndDate = function() {
       
          $scope.popupGeneralOrderEndDate.opened = true;
        };

        $scope.popupGeneralOrderEndDate = {
        
          opened: false
        };
}]);

//=========================================Consult=====================================================================================
ehrApp.controller("consultController",['$scope','$rootScope','commonCrudService','$http',function($scope,$rootScope,commonCrudService,$http) {
	var orderItemsNew = new Array();
	$scope.orderId1;

	/*$scope.saveConsultOrder = function(){
		orderItemsNew.push($scope.orderItems);
		console.log(orderItemsNew);
		commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Consult",$rootScope.subCategoryValue).then(function(data){
			getConsultOrderList();
			$scope.init();
		});
	};*/
	
	$scope.saveConsultOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.consultForm.$valid){
			$scope.orderItems.orderName = $scope.orderItems.consultService;
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Consult",$rootScope.subCategoryValue).then(function(data){
				$scope.$broadcast('show-errors-reset');
				getConsultOrderList();
				$scope.init();
			});
		}
	};
	
	//getConsultOrderList();

	$scope.cancelConsultOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getConsultOrderList();
		});
	}
		
	$scope.getConsultOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	/*$scope.updateConsultOrder = function(){
		orderItemsNew = new Array();
		orderItemsNew.push($scope.orderItems);
		commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Consult",$rootScope.subCategoryValue).then(function(data) {
			console.log("update");
			console.log($scope.orderItems);
			getConsultOrderList();
			$scope.init();
		});
	}*/
	
	$scope.updateConsultOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.consultForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Consult",$rootScope.subCategoryValue).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				//console.log("update");
				//console.log($scope.orderItems);
				getConsultOrderList();
				$scope.init();
			});
		}
	}
	
	function getConsultOrderList(){
	commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"Consult",$rootScope.subCategoryValue).then(function(data) {
		$scope.getConsultOrderList = data;
		});
	}
	$scope.orderItems = {};
	
	$scope.init = function() {
		$scope.orderItems = angular.copy({
			"billingCode"         :"",
			"consultService"      :"",
			"consultpatient"      :"clinic",
			"urgency"             :"regular",
			"attention"           :"",
			"placeToConsultation" :"",
			"clinicalIndicateDate":"",
			"provisionalDiagnosis":"",
			"reasonForRequest"    :"",
			"orderName"           :"",
			"patientWillSeen" 	:"Inpatient"
		});
	};
	$scope.init();
	 //**********************************DATEPICKER FOR Requested date**********************************//*
    $scope.today = function() {
        $scope.dt = new Date();
      };
    
      $scope.openConsultDate = function() {
     
        $scope.popupConsultDate.opened = true;
      };

      $scope.popupConsultDate = {
      
        opened: false
      };
	
      //-----ICD code ---//
	  	$scope.searchPreferredProblemList = function(val){
			//if(val.length >= 2){
		    	var problemList = [];
		    	return $http.get(BASE_URL2+'/icdCodeSearch/'+val, {
		        }).then(function(res){
		        	if(res.data._status_Code === 200){
				          angular.forEach(res.data.result, function(item){
				        	  var obj = {id:'',code:'', desc:''};
				            obj.id = item._id;
				            obj.code = item.CODE;
				            obj.desc = item.SHORT_Discription;
				            problemList.push(obj);
				          });
				          return problemList;
		        	}
		        },function() {
		            $rootScope.showNotification(0,"",$rootScope.connectionError);
		            //alert("error");
		           });
		    //  };
		}
}]);

//==========================================Vitals Order ====================================================================================
ehrApp.controller("vitalOrderController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
	var orderItemsNew = new Array();
	$scope.orderId1;

	$scope.saveVitalOrder = function(){
		/*orderItemsNew.push($scope.orderItems);
		console.log(orderItemsNew);
		commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Vital",$rootScope.subCategoryValue).then(function(data){
			getVitalOrderList();
			$scope.init();
		});*/
		
		$scope.$broadcast('show-errors-check-validity');
		if($scope.vitalsForm.$valid){
			$scope.orderItems.orderName = $scope.orderItems.vitalSign;
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Vital",$rootScope.subCategoryValue).then(function(data){
				$scope.$broadcast('show-errors-reset');
				getVitalOrderList();
				$scope.init();
			});
		}
	};
	
	//getVitalOrderList();

	$scope.cancelVitalOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getVitalOrderList();
		});
	}
		
	$scope.getVitalOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	/*$scope.updateVitalOrder = function(){
		orderItemsNew = new Array();
		orderItemsNew.push($scope.orderItems);
		commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Vital",$rootScope.subCategoryValue).then(function(data) {
			console.log("update");
			console.log($scope.orderItems);
			getVitalOrderList();
			$scope.init();
		});
	}*/
	
	$scope.updateVitalOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.vitalsForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Vital",$rootScope.subCategoryValue).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				//console.log("update");
				//console.log($scope.orderItems);
				getVitalOrderList();
				$scope.init();
			});
		}
	}
	
	function getVitalOrderList(){
	commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"Vital",$rootScope.subCategoryValue).then(function(data) {
		$scope.getVitalOrderList = data;
		});
	}
	
	$scope.init = function() {
		$scope.orderItems = angular.copy({
			"billingCode"       :"",
			"vitalSign"         :"",
			"startDateTime"     :"",
			"stopDateTime"      :"",
			"schedule"          :"",
			"specialInstruction":"",
			"orderName"         :""
		});
	};
	$scope.init();
	
	 //**********************************DATEPICKER FOR Requested date**********************************//*
    $scope.today = function() {
        $scope.dt = new Date();
      };
    
      $scope.openVitalsOrderDate = function() {
     
        $scope.popupVitalsOrderDate.opened = true;
      };

      $scope.popupVitalsOrderDate = {
      
        opened: false
      };
      
      $scope.openVitalsOrderEndDate = function() {
    	     
          $scope.popupVitalsOrderEndDate.opened = true;
        };

        $scope.popupVitalsOrderEndDate = {
        
          opened: false
        };
}]);

//===============================================Nursing Order===============================================================================
ehrApp.controller("nursingOrderController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
	var orderItemsNew = new Array();
	$scope.orderId1;

/*	$scope.saveNursingOrder = function(){
		orderItemsNew.push($scope.orderItems);
		console.log(orderItemsNew);
		commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Nursing",$rootScope.subCategoryValue).then(function(data){
			getNursingOrderList();
			$scope.init();
		});
	};*/

	$scope.saveNursingOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.nurshingOrderForm.$valid){
			$scope.orderItems.orderName = $scope.orderItems.order;
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Nursing",$rootScope.subCategoryValue).then(function(data){
				$scope.$broadcast('show-errors-reset');
				getNursingOrderList();
				$scope.init();
			});
		}
	};
	
	//getNursingOrderList();

	$scope.cancelNursingOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getNursingOrderList();
		});
	}
		
	$scope.getNursingOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	/*$scope.updateNursingOrder = function(){
		orderItemsNew = new Array();
		orderItemsNew.push($scope.orderItems);
		commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Nursing",$rootScope.subCategoryValue).then(function(data) {
			console.log("update");
			console.log($scope.orderItems);
			getNursingOrderList();
			$scope.init();
		});
	}*/
	
	$scope.updateNursingOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.nurshingOrderForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Nursing",$rootScope.subCategoryValue).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				//console.log("update");
				//console.log($scope.orderItems);
				getNursingOrderList();
				$scope.init();
			});
		}
	}
	
	function getNursingOrderList(){
	commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"Nursing",$rootScope.subCategoryValue).then(function(data) {
		$scope.getNursingOrderList = data;
		});
	}
	
	$scope.init = function() {
		$scope.orderItems = angular.copy({
			"billingCode":"",
			"order"      :"",
			"startDate"  :"",
			"stopDate"   :"",
			"orderName"  :"",
			"urgency"	 :"regular"
		});
	};
	$scope.init();
	
	 //**********************************DATEPICKER FOR Requested date**********************************//*
    $scope.today = function() {
        $scope.dt = new Date();
      };
    
      $scope.openNursingOrderStartDate = function() {
     
        $scope.popupNursingOrderStartDate.opened = true;
      };

      $scope.popupNursingOrderStartDate = {
      
        opened: false
      };
      
      $scope.openNursingOrderEndDate = function() {
    	     
          $scope.popupNursingOrderEndDate.opened = true;
        };

        $scope.popupNursingOrderEndDate = {
        
          opened: false
        };
}]);

//===============================================Order Sets ===============================================================================
ehrApp.controller("orderSetsController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
	var orderItemsNew = new Array();
	$scope.orderId1;

	$scope.saveOrderSetsOrder = function(){
		orderItemsNew.push($scope.orderItems);
		//console.log(orderItemsNew);
		commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"OrderSets",$rootScope.subCategoryValue).then(function(data){
			getOrderSetsOrderList();
			$scope.init();
		});
	};
	
	//getOrderSetsOrderList();

	$scope.cancelOrderSetsOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getOrderSetsOrderList();
		});
	}
		
	$scope.getOrderSetsOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	$scope.updateOrderSetsOrder = function(){
		orderItemsNew = new Array();
		orderItemsNew.push($scope.orderItems);
		commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"OrderSets",$rootScope.subCategoryValue).then(function(data) {
			//console.log("update");
			//console.log($scope.orderItems);
			getOrderSetsOrderList();
			$scope.init();
		});
	}
	
	function getOrderSetsOrderList(){
	commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"OrderSets",$rootScope.subCategoryValue).then(function(data) {
		$scope.getOrderSetsOrderList = data;
		});
	}
	
	$scope.init = function() {
		$scope.orderItems = angular.copy({
			"billingCode":"",
			"bySpeciality":"",
			"byProvider":"",
			"byDiagnosis":""
		});
	};
	$scope.init();
}]);

//===============================================Diet===============================================================================
ehrApp.controller("dietOrderController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
	$scope.subCategory = "Diet";
	var orderItemsNew = new Array();
	$scope.orderId1;
	
	//getDietOrderList();
	
	$scope.saveDietOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.dietForm.$valid){
			var orderItemsNew = new Array();
			$scope.orderItems.orderName = $scope.orderItems.dietComponent;
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Diet",$scope.subCategory ).then(function(data){
				$scope.$broadcast('show-errors-reset');
				getDietOrderList();
				$scope.initDiet();
			});
		}
	};
	
	$scope.cancelDietOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getDietOrderList();
		});
	}
		
	$scope.getDietOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	$scope.updateDeitOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.dietForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Diet",$scope.subCategory).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				//console.log("update");
				//console.log($scope.orderItems);
				getDietOrderList();
				$scope.initDiet();
			});
		}
	}
	
	function getDietOrderList(){
	commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"Diet",$scope.subCategory).then(function(data) {
		$scope.getDietOrderList = data;
		});
	}
	
	
	$scope.initDiet = function() {
		$scope.orderItems = angular.copy({
			"billingCode"            :"",
			"isolation"              :"",
			"dietComponent"          :"",
			"dietEffectiveDate"      :"",
			"dietExirationDate"      :"",
			"dietDelivery"           :"",
			"dietPrecaution"         :"",
			"dietSpecialInstructions":"",
			"orderName"              :""
		});
	};
	

	$scope.initDiet();

	
}]);
	
	/*===============Tube Feeding==============*/
ehrApp.controller("dietTubeFeedingController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
		$scope.subCategory = "Tube Feeding";
		var orderItemsNew = new Array();
		$scope.orderId1;
		
		$scope.saveDietTubeFeeding = function(){
			$scope.$broadcast('show-errors-check-validity');
			if($scope.tubeFeedingForm.$valid){
				var orderItemsNew = new Array();
				$scope.orderItems.orderName = $scope.orderItems.tubeFeedingProduct;
				orderItemsNew.push($scope.orderItems);
				//console.log(orderItemsNew);
				commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Diet", $scope.subCategory).then(function(data){
					$scope.$broadcast('show-errors-reset');
					$scope.initTubeFeeding();
					getTubeFeedingList();
				});
			}
	}
	
	$scope.updateDietTubeFeeding = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.tubeFeedingForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Diet", $scope.subCategory).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				$scope.initTubeFeeding();
				//console.log("update");
				//console.log($scope.orderItems);
				getTubeFeedingList();
			});
		}
	}
	
	$scope.cancelDietTubeFeeding = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getTubeFeedingList();
		});
	}
	
	$scope.getDietTubeFeedingById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	function getTubeFeedingList (){
			commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"Diet","Tube Feeding").then(function(data) {
			$scope.getDietOrderList = data;
			});
		}
	$scope.initTubeFeeding = function(){
		$scope.orderItems = angular.copy({
			"billingCode"           :"",
			"tubeFeedingProduct"    :"",
			"strength"              :"",
			"quantity"              :"",
			"amount"                :"",
			"specialInstructions"   :"",
			"cancelFutureTRAYPOrder":"",
			"orderName"              :""
		})
	};
	}]);
	/*============ Early/Late Tray ===============*/
ehrApp.controller("dietEarlyLateController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
		$scope.subCategory = "Early/Late Tray";
		var orderItemsNew = new Array();
		$scope.orderId1;
		
		$scope.saveEarlylateTray = function(){
			$scope.$broadcast('show-errors-check-validity');
			if($scope.earkyLateTrayForm.$valid){
				var orderItemsNew = new Array();
				$scope.orderItems.orderName = "";
				orderItemsNew.push($scope.orderItems);
				//console.log(orderItemsNew);
				commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Diet", $scope.subCategory).then(function(data){
					$scope.$broadcast('show-errors-reset');
					$scope.initEarlyLateTray();
					getEarlyLateTrayList();
				});
			}
	}
	
	$scope.updateEarlylateTray = function(){
		
		$scope.$broadcast('show-errors-check-validity');
		if($scope.earkyLateTrayForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Diet", $scope.subCategory).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				$scope.initEarlyLateTray();
				//console.log("update");
				//console.log($scope.orderItems);
				getEarlyLateTrayList();
			});
		}
	}
	
	$scope.getEarlylateTrayById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	$scope.cancelEarlylateTray = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getEarlyLateTrayList();
		});
	}
	
	function getEarlyLateTrayList(){
		commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"Diet","Early/Late Tray").then(function(data) {
		$scope.getDietOrderList = data;
		});
	}
	$scope.initEarlyLateTray = function(){
		$scope.orderItems = angular.copy({
			"billingCode":"",
			"Meal"       :"",
			"startDate"  :"",
			"endDate"    :"",
			"dayOfWeek"  :{"Monday":false,"Tuesday":false,"Wednesday":false,"Thursday":false,"Friday":false,"Saturday":false,"Sunday":false},
			"orderName"  :""
		})
	};
	}]);
	/*============ Diet Additional Orders ==============*/
ehrApp.controller("dietDietAdditionalController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
		$scope.subCategory = "Additional Orders";
		var orderItemsNew = new Array();
		$scope.orderId1;
		
		$scope.saveDietAdditionalOrders = function(){
			$scope.$broadcast('show-errors-check-validity');
			if($scope.additionalOrdersForm.$valid){
				var orderItemsNew = new Array();
				$scope.orderItems.orderName = "";
				orderItemsNew.push($scope.orderItems);
				//console.log(orderItemsNew);
				commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Diet", $scope.subCategory).then(function(data){
					$scope.$broadcast('show-errors-reset');
					getAddtionalOrdersList();
					$scope.initAdditionalOrders();
				});
			}
	}
	
	$scope.updateDietAdditionalOrders = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.additionalOrdersForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Diet", $scope.subCategory).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				
				//console.log("update");
				//console.log($scope.orderItems);
				getAddtionalOrdersList();
				$scope.initAdditionalOrders();
			});
		}
	}
	
	$scope.getDietAdditionalOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	$scope.cancelDietAdditionalOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getAddtionalOrdersList();
		});
	}
	
	 function getAddtionalOrdersList(){
		commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"Diet","Additional Orders").then(function(data) {
		$scope.getDietOrderList = data;
		});
	}
	$scope.initAdditionalOrders = function(){
		$scope.orderItems = angular.copy({
			"billingCode"    :"",
			"additionalOrder":"",
			"orderName"      :""
		});
	};
}]);




/*==================== patient movement ===========*/
ehrApp.controller("patientMovementController",['$scope','$rootScope','commonCrudService','$http',function($scope,$rootScope,commonCrudService,$http) {
	var orderItemsNew = new Array();
	$scope.orderId1;
	$scope.subCategory = 'Admit';
	$scope.setAdmitCategory = function(){
		$scope.subCategory = "Admit";
		$scope.initAdmit();
		getPatientMovementAdmitOrderList();
	}
	
	$scope.setTransferCategory = function(){
		$scope.subCategory = "Transfer";
		$scope.initTranfer();
		getPatientMovementAdmitOrderList();
	}
	
	$scope.setDischargeCategory = function(){
		$scope.subCategory = "Discharge";
		$scope.initDischarge();
		getPatientMovementAdmitOrderList();
	} 
	
	$scope.savePatientMovementAdmitOrder = function(){
		var orderItemsNew = new Array();
		$scope.$broadcast('show-errors-check-validity');
		if($scope.patientMovementTabAdmitForm.$valid){
			$scope.orderItems.orderName = $scope.orderItems.wardName;
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Patient Movement",$scope.subCategory ).then(function(data){
				$scope.$broadcast('show-errors-reset');
				getPatientMovementAdmitOrderList();
				$scope.initAdmit();
			});
		}
	};
	
	//getPatientMovementAdmitOrderList();

	$scope.cancelPatientMovementAdmitOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getPatientMovementAdmitOrderList();
		});
	}
		
	$scope.getPatientMovementAdmitOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	
	$scope.updatePatientMovementAdmitOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.patientMovementTabAdmitForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Patient Movement",$scope.subCategory ).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				//console.log("update");
				//console.log($scope.orderItems);
				getPatientMovementAdmitOrderList();
				$scope.initAdmit();
			});
		}
	}
	
	function getPatientMovementAdmitOrderList(){
	commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"Patient Movement",$scope.subCategory).then(function(data) {
		$scope.getPatientMovementOrderList = data;
		});
	}
	
	$scope.orderItems = {};
	$scope.initAdmit = function() {
		$scope.orderItems = angular.copy({
			"billingCode"       :"",
			"wardName"          :"",
			"careProvider"      :"",
			"speciality"        :"",
			"startDate"         :"",
			"endDate"           :"",
			"admissionDiagnosis":"",
			"description"       :"",
			"orderName"         :"",
			"category"			:"admission"
		});
	};
	
	$scope.initAdmit();
	
	 //**********************************DATEPICKER FOR Requested date**********************************//*
    $scope.today = function() {
        $scope.dt = new Date();
      };
    
      $scope.openPaitentDischargeDate = function() {
     
        $scope.popupPaitentDischargeDate.opened = true;
      };

      $scope.popupPaitentDischargeDate = {
      
        opened: false
      };
	
      $scope.searchWard = function(value){
	    	var pwardList = [];
	    	return $http.get(BASE_URL2+'/wardSearch/'+value, {
	        }).then(function(res){
	        	console.log(res);
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
      
      $scope.searchPreferredProblemList = function(val){
			//if(val.length >= 2){
		    	var problemList = [];
		    	return $http.get(BASE_URL2+'/icdCodeSearch/'+val, {
		        }).then(function(res){
		        	 if(res.data._status_Code === 200){
				          angular.forEach(res.data.result, function(item){
				        	  var obj = {id:'',code:'', desc:''};
				            obj.id = item._id;
				            obj.code = item.CODE;
				            obj.desc = item.SHORT_Discription;
				            problemList.push(obj);
				          });
				          return problemList;
		        	 }
		        },function() {
		            $rootScope.showNotification(0,"",$rootScope.connectionError);
		            //alert("error");
		           });
		    //  };
		}
		
		/*
		 * autocompkte on selected 
		 */
		 $scope.on_problem_selected = function($item, $model, $label){
			 $scope.orderItems.icd = $item.code;
		 }
}]);

//=================== patient movement - Transfer ============================//
ehrApp.controller("patientMovementTranferController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
	var orderItemsNew = new Array();
	$scope.orderId1;
	$scope.subCategory = 'Transfer';
	
	
	/*$scope.savePatientMovementTransferOrder = function(){
		var orderItemsNew = new Array();
		orderItemsNew.push($scope.orderItems);
		console.log(orderItemsNew);
		commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Patient Movement",$scope.subCategory).then(function(data){
			getPatientMovementAdmitOrderList();
				$scope.initTranfer();
		
		});
	};*/
	$scope.savePatientMovementTransferOrder = function(){
		var orderItemsNew = new Array();
		$scope.$broadcast('show-errors-check-validity');
		if($scope.patientMovementTabTransferForm.$valid){
			$scope.orderItems.orderName = $scope.orderItems.wardName;
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Patient Movement",$scope.subCategory ).then(function(data){
				$scope.$broadcast('show-errors-reset');
				getPatientMovementAdmitOrderList();
				$scope.initTranfer();
			});
		}
	};
	
/*	$scope.saveLabOrder = function(){
		var orderItemsNew = new Array();
		$scope.$broadcast('show-errors-check-validity');
		if($scope.patientMovementTabAdmitForm.$valid){
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Patient Movement",$rootScope.subCategoryValue).then(function(data){
				$scope.$broadcast('show-errors-reset');
				$scope.getPatientMovementAdmitOrderList();
				$scope.initAdmit();
			});
		}
	};*/
	
	//getPatientMovementAdmitOrderList();

	$scope.cancelPatientMovementAdmitOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getPatientMovementAdmitOrderList();
		});
	}
		
	$scope.getPatientMovementAdmitOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	/*$scope.updatePatientMovementTransferOrder = function(){
		orderItemsNew = new Array();
		orderItemsNew.push($scope.orderItems);
		commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Patient Movement",$scope.subCategory).then(function(data) {
			console.log("update");
			console.log($scope.orderItems);
			getPatientMovementAdmitOrderList();
				$scope.initTranfer();
		});
	}*/
	$scope.updatePatientMovementTransferOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.patientMovementTabTransferForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Patient Movement",$scope.subCategory).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				//console.log("update");
				//console.log($scope.orderItems);
				getPatientMovementAdmitOrderList();
				$scope.initTranfer();
			});
		}
	}
	
	function getPatientMovementAdmitOrderList(){
	commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"Patient Movement",$scope.subCategory).then(function(data) {
		$scope.getPatientMovementOrderList = data;
		});
	}
	
	$scope.initTranfer = function(){
		$scope.orderItems = angular.copy({
			"billingCode" :"",
			"wardName"    :"",
			"careProvider":"",
			"speciality"  :"",
			"startDate"   :"",
			"endDate"     :"",
			"description" :"",
			"orderName"   :"",
			"category"	  :"admission"
		})
	};
	
	$scope.initTranfer();
	
}]);
//============================ Patient Movement - Discharge =================================//
ehrApp.controller("patientMovementDischargeController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
	var orderItemsNew = new Array();
	$scope.orderId1;

		$scope.subCategory = "Discharge";

	/*$scope.savePatientMovementDischargeOrder = function(){
		var orderItemsNew = new Array();
		orderItemsNew.push($scope.orderItems);
		console.log(orderItemsNew);
		commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Patient Movement",$scope.subCategory).then(function(data){
			getPatientMovementAdmitOrderList();
				$scope.initDischarge();
		});
	};*/
		$scope.savePatientMovementDischargeOrder = function(){
			var orderItemsNew = new Array();
			$scope.$broadcast('show-errors-check-validity');
			if($scope.patientMovementTabDischargeForm.$valid){
				$scope.orderItems.orderName = $scope.orderItems.Type;
				orderItemsNew.push($scope.orderItems);
				//console.log(orderItemsNew);
				commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Patient Movement",$scope.subCategory).then(function(data){
					$scope.$broadcast('show-errors-reset');
					getPatientMovementAdmitOrderList();
					$scope.initDischarge();
				});
			}
		};
	
	//getPatientMovementAdmitOrderList();

	$scope.cancelPatientMovementAdmitOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getPatientMovementAdmitOrderList();
		});
	}
		
	$scope.getPatientMovementAdmitOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	/*$scope.updatePatientMovementDischargeOrder = function(){
		orderItemsNew = new Array();
		orderItemsNew.push($scope.orderItems);
		commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Patient Movement",$scope.subCategory).then(function(data) {
			console.log("update");
			console.log($scope.orderItems);
			getPatientMovementAdmitOrderList();
				$scope.initDischarge();
		});
	}*/
	$scope.updatePatientMovementTransferOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.patientMovementTabDischargeForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Patient Movement",$scope.subCategory).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				//console.log("update");
				//console.log($scope.orderItems);
				getPatientMovementAdmitOrderList();
				$scope.initDischarge();
			});
		}
	}
	
	function getPatientMovementAdmitOrderList(){
	commonCrudService.getOrderByCategory($rootScope.patientInfo._id,"Patient Movement",$scope.subCategory).then(function(data) {
		$scope.getPatientMovementOrderList = data;
		});
	}
	
	$scope.initDischarge = function(){
		$scope.orderItems = angular.copy({
			"billingCode"       :"",
			"Type"              :"",
			"dischargeDiagnosis":"",
			"description"       :"",
			"orderName"         :""
		})
	};
	$scope.initDischarge();
	
}]);
//===============================================Blood Component===============================================================================
ehrApp.controller("bloodComponentController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
   
	var orderItemsNew = new Array();
	$scope.orderId1;
	
	$scope.saveBloodComponentOrder = function(){
		var orderItemsNew = new Array();
		orderItemsNew.push($scope.orderItems);
		//console.log(orderItemsNew);
		commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"BloodComponent",$rootScope.subCategoryValue).then(function(data){
			getBloodComponentOrderList();
			$scope.init();
		});
	};
	
	//getBloodComponentOrderList();

	$scope.cancelBloodComponentOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getBloodComponentOrderList();
		});
	}
	
	//**********************************DATEPICKER**********************************//*
    $scope.today = function() {
        $scope.dt = new Date();
      };
    
      $scope.openBloodComponentDate = function() {
     
        $scope.popupBloodCompDate.opened = true;
      };

      $scope.popupBloodCompDate = {
      
        opened: false
      };
      
      
    //**********************************DATEPICKER FOR Collection date and time**********************************//*
      $scope.today = function() {
          $scope.dt = new Date();
        };
      
        $scope.openBloodComponentCollectionDate = function() {
       
          $scope.popupBloodCompCollectionDate.opened = true;
        };

        $scope.popupBloodCompCollectionDate = {
        
          opened: false
        };
	
	$scope.getBloodComponentOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	$scope.updateBloodComponentOrder = function(){
		orderItemsNew = new Array();
		orderItemsNew.push($scope.orderItems);
		commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"BloodComponent",$rootScope.subCategoryValue).then(function(data) {
			//console.log("update");
			//console.log($scope.orderItems);
			getBloodComponentOrderList();
			$scope.init();
		});
	}
	
	function getBloodComponentOrderList(){
	commonCrudService.getOrderByCategory($rootScope.patientInfo._id, "BloodComponent",$rootScope.subCategoryValue).then(function(data) {
		$scope.getBloodComponentOrderList = data;
		});
	}
	
	 $scope.orderItems = {};
	
	$scope.init = function() {
		$scope.orderItems = angular.copy({
			"billingCode"       :"",
			"component"         :"wholeBlood",
			"bloodComponent"    :"",
			"component1"        :"",
			"reasonForRequest"  :"",
			"quantity"          :"",
			"collectionTest"    :"",
			"dateTime"          :"",
			"urgency"           :"regularBloodComp",
			"surgery"           :"",
			"collectionDateTime":"",
			"comment"           :""
				
				
		});
	};
	$scope.init();
}]);
/*============================ OP Pharmacy =========================*/
ehrApp.controller("opPharmacyController",['$scope','$rootScope','commonCrudService','$http',function($scope,$rootScope,commonCrudService,$http) {
	var orderItemsNew = new Array();
	$scope.orderId1;
	$scope.subCategory = "Dosage";
	
	$scope.saveOpPharmacyOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.opPharmacyDosageForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Op Pharmacy",$scope.subCategory).then(function(data){
				$scope.$broadcast('show-errors-reset');
				getOpPharmacyOrderList();
				$scope.initDosage();
			});
		}
	};
	
	//getOpPharmacyOrderList();

	$scope.cancelOpPharmacyOrder = function(orderId){
		commonCrudService.cancelOrder(orderId).then(function(data) {
			getOpPharmacyOrderList();
		});
	}
		
	$scope.getOpPharmacyOrderById = function(orderId){
		commonCrudService.getOrderById(orderId).then(function(data){
			$scope.orderItems = angular.copy(data.orderItems[0]);
		});
		$scope.orderId = orderId;
	}
	
	$scope.updateOpPharmacyOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.opPharmacyDosageForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Op Pharmacy",$scope.subCategory).then(function(data) {
				$scope.$broadcast('show-errors-reset');
				//console.log("update");
				//console.log($scope.orderItems);
				getOpPharmacyOrderList();
				$scope.initDosage();
			});
		}
	}
	
	function getOpPharmacyOrderList(){
	commonCrudService.getOrderByCategory($rootScope.patientInfo._id, "Op Pharmacy",$scope.subCategory).then(function(data) {
		$scope.getOpPharmacyOrderList = data;
		});
	}
	
	$scope.dosage = function(){
		$scope.subCategory = "Dosage";
		$scope.initDosage();
		getOpPharmacyOrderList();
	}
	
	$scope.complex = function(){
		$scope.subCategory = "Complex";
		getOpPharmacyOrderList();
	}
	$scope.orderItems = {};
	$scope.initDosage = function() {
		$scope.orderItems = angular.copy({
			"billingCode":"",
			"PRN"        :"",
			"drugName"   :"",
			"drugId"     :"",
			"dosage"     :"",
			"route"      :"",
			"pickUp"     :"'Clinic'",
			"schedule"   :"",
			"daysSupply" :"",
			"qty"        :"",
			"refils"     :"",
			"priority"   :"regular",
			"comment"    :""
		});
	};
	$scope.initDosage();
	//**********************************DATEPICKER FOR Collection date and time**********************************//*
    $scope.today = function() {
        $scope.dt = new Date();
      };
    
      $scope.openOPDate = function() {
     
        $scope.popupOPDate.opened = true;
      };

      $scope.popupOPDate = {
      
        opened: false
      };
	
      $scope.searchDosage = function(value, searchBy){
  		//if(value.length >= 2){
  	    	var drugList = [];
  	    	return $http.get(BASE_URL2+'/drugSearch/'+value, {
  	        }).then(function(response){
  	        	if(response.data._status_Code === 200){
	  	          angular.forEach(response.data.result, function(generic){
	  	        	  var obj = {generic_id:'',generic_name:'', };
	  	            obj.generic_id = generic._id;
	  	            obj.generic_name = generic.Generic_name;
	  	            drugList.push(obj);
	  	          });
	  	          //console.log(drugList);
	  	          return drugList;
  	        }
  	        },function() {
  	            $rootScope.showNotification(0,"",$rootScope.connectionError);
  	            //alert("error");
  	           });
  	   //   }
  	}
   
  	$scope.on_drug_selected = function($item, $model, $label){
  		$scope.orderItems.drugId = $item.generic_id;
  			return $http.get(BASE_URL2+'/drugSearchById/'+$item.generic_id, {
  	        }).then(function(response){
  	        	console.log(response);
  	        	if(response.data._status_Code === 200){
	  	        	var value = response.data.result[0].Strength_value;
	  	        	var unit = response.data.result[0].Unit_of_strength;
	  	        	$scope.orderItems.dosage = value + unit;
	  	        	return '';
  	        	}
  	        },function() {
  	            $rootScope.showNotification(0,"",$rootScope.connectionError);
  	            //alert("error");
  	           });
  	}
}]);