ehrApp.service('commonCrudService',['$http','$rootScope','setGetService',function($http,$rootScope,setGetService){
	this.saveOrder = function(orderItems,patientInfo,category,subCategory){
		var setGetObj = setGetService.getValue();
		var commonObj = {"doctorId": setGetObj.doctorId,
				  "patientId": patientInfo._id,
				  "visitId":  patientInfo.visitRecords[0]._id,
				  "orderSubCategory": "BioChemestry",
				  "encounterType": "OPD","orderCategory": category,"orderSubCategory": subCategory,"orderItems":orderItems};
		
		//var URI = urlConfig.url+"cpoe/createOrder";
		var URI = BASE_URL + ROOT_URL + CPOE + '/createOrder'; 
		//console.log(commonObj.toString());
		var promise = $http.post(URI, JSON.stringify(commonObj)).then(function(response) {
			//console.log(commonObj);
					//console.log(response);
			//change in response
			$rootScope.showNotification(response.data._status_Code,response.data._status,response.data._error_message);
					return response;
				},
				function() {
					$rootScope.showNotification(0,"",$rootScope.connectionError);
				})
				return promise;
	}
	
	this.updateOrder = function(orderId,orderItems,patientInfo,category,subcategory){
		var setGetObj = setGetService.getValue();
		var commonObj = {"doctorId": setGetObj.doctorId,
				  "patientId": patientInfo._id,
				  "visitId":  patientInfo.visitRecords[0]._id,
				  "orderSubCategory": "BioChemestry",
				  "encounterType": "OPD","orderCategory": category,"orderSubCategory": subcategory,"orderItems":orderItems,"orderDate": new Date().getTime(),
				  "isFavorite": true,"frequencyMaster": []};
		
		//var URI = urlConfig.url+"cpoe/"+orderId+"/updateOrder";
		var URI = BASE_URL + ROOT_URL + CPOE + '/' + orderId+'/updateOrder';
		//console.log(JSON.stringify(commonObj));
		var promise = $http.put(URI, JSON.stringify(commonObj)).then(function(response) {
					console.log(response);
			//change in response
			$rootScope.showNotification(response.data._status_Code,response.data._status,response.data._error_message);
					return response;
				},
				function() {
					$rootScope.showNotification(0,"",$rootScope.connectionError);
				})
				return promise;
	}
	
	this.cancelOrder = function(orderId){
		//var URI = urlConfig.url+"cpoe/"+orderId+"/cancelOrder";
		var URI = BASE_URL + ROOT_URL + CPOE + '/'+orderId+'/cancelOrder';
		var promise = $http.get(URI)
		.then(function(response){
			//console.log(response.data.result);
			if(response.data._status_Code === 200){
				return (response.data.result);
			}
		},
		function() {
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promise;
	}
	
	this.getOrderById = function(orderId){
		//var URI = urlConfig.url+"cpoe/"+orderId+"/getDetails";
		var URI = BASE_URL + ROOT_URL + CPOE + '/'+orderId+'/getDetails';
		var promise = $http.get(URI)
		.then(function(response){
			//console.log(response.data.result);
			if(response.data._status_Code === 200){
				return (response.data.result);
			}
		},
		function() {
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promise;
	}
	
	this.getOrderByCategory = function(patientId,category,subCategory){
		//var URI = urlConfig.url+"cpoe/"+patientId+"/getOrder/category?category="+category+"&subcategory="+subCategory ;
		var URI = BASE_URL + ROOT_URL + CPOE +"/"+patientId+"/getOrder/category?category="+category+"&subcategory="+subCategory ;
		var promise = $http.get(URI)
		.then(function(response){
			//console.log(response.data.result);
			if(response.data._status_Code === 200){
				return (response.data.result);
			}
		},
		function() {
			$rootScope.showNotification(0,"",$rootScope.connectionError);
		})
		return promise;
	}
	
	 this.searchProcedureName = function(keyword){
		 var URI = "http://35.154.76.183:5100/procedureSearch/"+ keyword;
		  var promise = $http.get(URI).then(function(response){
		   /*if(response.data._status_Code === 200){
		    return response.data.result;
		   }*/
			  return response;
		  },
		  function(){
		   $rootScope.showNotification(0,"",$rootScope.connectionError);
		  })
		  return promise; 
	 }
}]);