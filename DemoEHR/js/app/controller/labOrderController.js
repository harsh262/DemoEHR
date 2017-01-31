//======================================Lab Order nikhil==============================================================
homePageApp.controller("labOrderController",['$scope','$rootScope','$cookies','commonCrudService','VitalReviewService',function($scope,$rootScope,$cookies,commonCrudService,VitalReviewService) {
	var orderItemsNew = new Array();
	$scope.orderId1;

	 $scope.today = function() {
	   	    $scope.orderItems.collectionDate = new Date();
	   	  };
	   	 
	   	  
	$scope.saveLabOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.lab.$valid){
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Lab Order",$rootScope.subCategoryValue).then(function(data){
				$scope.$broadcast('show-errors-reset');
				$scope.getOrderList();
				$scope.init();
			});
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
				"description"	:""
			});
		}
	 $scope.init();
	
	/*$scope.reset = function() {
		$scope.orderItems = angular.copy({});
		console.log($scope.lab);
	};*/
}]);

//==========================================Imaging Order==========================================================
homePageApp.controller("imagingOrderController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
	var orderItemsNew = new Array();
	$scope.orderId1;

	$scope.saveImagingOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.imagingOrderForm.$valid){
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Imaging Order", $rootScope.subCategoryValue).then(function(data){
				$scope.$broadcast('show-errors-reset');
				getImagingOrderList();
				$scope.init();
			});
		}
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
	
	$scope.init = function() {
		$scope.orderItems = angular.copy({
			"billingCode"            :"",
			"imagingType"            :"",
			"imagingProcedure"       :"",
			"modifier"               :"",
			"requestedDate"          :"",
			"urgency"                :"",
			"transport"              :"",
			"category"               :"",
			"submitTo"				 :"",
			"isolation"				 :"",
			"preOpScheduled"		 :"",
			"historyAndReasonForExam":"",
			"examOverLast7Days"      :""
		});
	};
	$scope.init();
}]);

//=====================================IP Pharmacy==========================================================================================
homePageApp.controller("ipPharmacyController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
	var orderItemsNew = new Array();
	$scope.orderId1;

	$scope.saveIpPharmacyOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.ipPharmacyForm.$valid){
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
			"priority"   :"",
			"comments"   :"",
			"warning"    :""
		});
	};
	$scope.init();
	
}]);

//==================================IV Pharmacy============================================================================================
homePageApp.controller("ivPharmacyController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
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
			"priority"         :"",
			"duration"         :"",
			"totalVolume"      :""
		});
	};
	$scope.init();
}]);

//=====================================Procedure Surgical=========================================================================================
homePageApp.controller("procedureSurgicalOrderController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
	var orderItemsNew = new Array();
	$scope.orderId1;

	$scope.saveProcedureSurgicalOrder = function(){
		
		$scope.$broadcast('show-errors-check-validity');
		if($scope.procedureSurgicalOrderForm.$valid){
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
	
	$scope.init = function() {
		$scope.orderItems = angular.copy({
			"billingCode"                  :"",
			"procedureName"                :"",
			"procedureName"                :"",
			"consultpatient"               :"",
			"urgency"                      :"",
			"attention"                    :"",
			"clinicalIndicateDate"         :"",
			"serviceToPerformThisProcedure":"",
			"reasonForRequest"             :"",
			"provisionalDiagnosis"         :""
		});
	};
	$scope.init();
}]);

//======================================General========================================================================================
homePageApp.controller("generalController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
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
	
	$scope.init = function() {
		$scope.orderItems = angular.copy({
			"billingCode":"",
			"order"      :"",
			"startDate"  :"",
			"stopDate"   :""
		});
	};
	$scope.init();
}]);

//=========================================Consult=====================================================================================
homePageApp.controller("consultController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
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
	
	$scope.consultForm = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.consultForm.$valid){
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
	$scope.init = function() {
		$scope.orderItems = angular.copy({
			"billingCode"         :"",
			"consultService"      :"",
			"consultpatient"      :"",
			"urgency"             :"",
			"attention"           :"",
			"placeToConsultation" :"",
			"clinicalIndicateDate":"",
			"provisionalDiagnosis":"",
			"reasonForRequest"    :""
		});
	};
	$scope.init();
	
}]);

//==========================================Vitals Order ====================================================================================
homePageApp.controller("vitalOrderController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
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
			"specialInstruction":""
		});
	};
	$scope.init();
}]);

//===============================================Nursing Order===============================================================================
homePageApp.controller("nursingOrderController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
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
			"stopDate"   :""
		});
	};
	$scope.init();
}]);

//===============================================Order Sets ===============================================================================
homePageApp.controller("orderSetsController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
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
homePageApp.controller("dietOrderController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
	$scope.subCategory = "Diet";
	var orderItemsNew = new Array();
	$scope.orderId1;
	
	//getDietOrderList();
	
	$scope.saveDietOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.dietForm.$valid){
			var orderItemsNew = new Array();
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
			"dietSpecialInstructions":""
		});
	};
	

	$scope.initDiet();

	
}]);
	
	/*===============Tube Feeding==============*/
	homePageApp.controller("dietTubeFeedingController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
		$scope.subCategory = "Tube Feeding";
		var orderItemsNew = new Array();
		$scope.orderId1;
		
		$scope.saveDietTubeFeeding = function(){
			$scope.$broadcast('show-errors-check-validity');
			if($scope.tubeFeedingForm.$valid){
				var orderItemsNew = new Array();
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
			"cancelFutureTRAYPOrder":""
		})
	};
	}]);
	/*============ Early/Late Tray ===============*/
	homePageApp.controller("dietEarlyLateController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
		$scope.subCategory = "Early/Late Tray";
		var orderItemsNew = new Array();
		$scope.orderId1;
		
		$scope.saveEarlylateTray = function(){
			$scope.$broadcast('show-errors-check-validity');
			if($scope.earkyLateTrayForm.$valid){
				var orderItemsNew = new Array();
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
			"Meal":"",
			"startDate":"",
			"endDate":"",
			"dayOfWeek":{"Monday":false,"Tuesday":false,"Wednesday":false,"Thursday":false,"Friday":false,"Saturday":false,"Sunday":false}
		})
	};
	}]);
	/*============ Diet Additional Orders ==============*/
	homePageApp.controller("dietDietAdditionalController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
		$scope.subCategory = "Additional Orders";
		var orderItemsNew = new Array();
		$scope.orderId1;
		
		$scope.saveDietAdditionalOrders = function(){
			$scope.$broadcast('show-errors-check-validity');
			if($scope.additionalOrdersForm.$valid){
				var orderItemsNew = new Array();
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
			"billingCode":"",
			"additionalOrder":""
		});
	};
}]);




/*==================== patient movement ===========*/
homePageApp.controller("patientMovementController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
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
	
	/*$scope.savePatientMovementAdmitOrder = function(){
		var orderItemsNew = new Array();
		orderItemsNew.push($scope.orderItems);
		console.log(orderItemsNew);
		commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Patient Movement",$scope.subCategory).then(function(data){
			getPatientMovementAdmitOrderList();
				$scope.initAdmit();
		});
	};
	*/
	$scope.savePatientMovementAdmitOrder = function(){
		var orderItemsNew = new Array();
		$scope.$broadcast('show-errors-check-validity');
		if($scope.patientMovementTabAdmitForm.$valid){
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Patient Movement",$rootScope.subCategoryValue).then(function(data){
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
	
	/*$scope.updatePatientMovementAdmitOrder = function(){
		orderItemsNew = new Array();
		orderItemsNew.push($scope.orderItems);
		commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Patient Movement",$scope.subCategory).then(function(data) {
			console.log("update");
			console.log($scope.orderItems);
			getPatientMovementAdmitOrderList();
				$scope.initAdmit();
		});
	}
	*/
	$scope.updatePatientMovementAdmitOrder = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.patientMovementTabAdmitForm.$valid){
			orderItemsNew = new Array();
			orderItemsNew.push($scope.orderItems);
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Patient Movement",$rootScope.subCategoryValue).then(function(data) {
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
	
	
	$scope.initAdmit = function() {
		$scope.orderItems = angular.copy({
			"billingCode"       :"",
			"wardName"          :"",
			"careProvider"      :"",
			"speciality"        :"",
			"startDate"         :"",
			"endDate"           :"",
			"admissionDiagnosis":"",
			"description"       :""
		});
	};
	
	$scope.initAdmit();
	
}]);

//=================== patient movement - Transfer ============================//
homePageApp.controller("patientMovementTranferController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
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
			orderItemsNew.push($scope.orderItems);
			//console.log(orderItemsNew);
			commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Patient Movement",$rootScope.subCategoryValue).then(function(data){
				$scope.$broadcast('show-errors-reset');
				getPatientMovementAdmitOrderList();
				$scope.initTranfer();
			});
		}
	};
	
	$scope.saveLabOrder = function(){
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
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Patient Movement",$rootScope.subCategoryValue).then(function(data) {
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
			"description" :""
		})
	};
	
	$scope.initTranfer();
	
}]);
//============================ Patient Movement - Discharge =================================//
homePageApp.controller("patientMovementDischargeController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
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
				orderItemsNew.push($scope.orderItems);
				//console.log(orderItemsNew);
				commonCrudService.saveOrder(orderItemsNew,$rootScope.patientInfo,"Patient Movement",$rootScope.subCategoryValue).then(function(data){
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
			commonCrudService.updateOrder($scope.orderId,orderItemsNew,$rootScope.patientInfo,"Patient Movement",$rootScope.subCategoryValue).then(function(data) {
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
			"description"       :""
		})
	};
	$scope.initDischarge();
	
}]);
//===============================================Blood Component===============================================================================
homePageApp.controller("bloodComponentController",['$scope','$rootScope','commonCrudService',function($scope,$rootScope,commonCrudService) {
   
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
	
	$scope.init = function() {
		$scope.orderItems = angular.copy({
			"billingCode"       :"",
			"component"         :"",
			"bloodComponent"    :"",
			"component1"        :"",
			"reasonForRequest"  :"",
			"quantity"          :"",
			"collectionTest"    :"",
			"dateTime"          :"",
			"urgency"           :"",
			"surgery"           :"",
			"collectionDateTime":"",
			"comment"           :""
		});
	};
	$scope.init();
}]);
/*============================ OP Pharmacy =========================*/
homePageApp.controller("opPharmacyController",['$scope','$rootScope','commonCrudService','$http',function($scope,$rootScope,commonCrudService,$http) {
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
	$scope.initDosage = function() {
		$scope.orderItems = angular.copy({
			"billingCode":"",
			"PRN"        :"",
			"drugName"   :"",
			"drugId"     :"",
			"dosage"     :"",
			"route"      :"",
			"pickUp"     :"",
			"schedule"   :"",
			"daysSupply" :"",
			"qty"        :"",
			"refils"     :"",
			"priority"   :"",
			"comment"    :""
		});
	};
	$scope.initDosage();
	
	$scope.searchDosage = function(value, searchBy){
		//if(value.length >= 2){
	    	var drugList = [];
	    	return $http.get('http://35.154.76.183:5100/drugSearch/'+value, {
	        }).then(function(response){
	          angular.forEach(response.data, function(generic){
	        	  var obj = {generic_id:'',generic_name:'', };
	            obj.generic_id = generic._id;
	            obj.generic_name = generic.Generic_name;
	            drugList.push(obj);
	          });
	          //console.log(drugList);
	          return drugList;
	        });
	   //   }
	}
	
	$scope.on_drug_selected = function($item, $model, $label){
		$scope.orderItems.drugId = $item.generic_id;
			return $http.get('http://35.154.76.183:5100/drugSearchById/'+$item.generic_id, {
	        }).then(function(response){
	        	var value = response.data[0].Strength_value;
	        	var unit = response.data[0].Unit_of_strength;
	        	$scope.orderItems.dosage = value + unit;
	          return '';
	        });
	}
}]);