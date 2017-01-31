homePageApp.service('commonCrudService',['$http',function($http){
	this.saveOrder = function(orderItems,patientInfo,category,subCategory){
		var commonObj = {"doctorId": getCookie("doctorId"),
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
					return response;
				},
				function() {
					alert("error");
				})
				return promise;
	}
	
	this.updateOrder = function(orderId,orderItems,patientInfo,category,subcategory){
		var commonObj = {"doctorId": getCookie("doctorId"),
				  "patientId": patientInfo._id,
				  "visitId":  patientInfo.visitRecords[0]._id,
				  "orderSubCategory": "BioChemestry",
				  "encounterType": "OPD","orderCategory": category,"orderSubCategory": subcategory,"orderItems":orderItems,"orderDate": "17-11-2016",
				  "isFavorite": true,"frequencyMaster": []};
		
		//var URI = urlConfig.url+"cpoe/"+orderId+"/updateOrder";
		var URI = BASE_URL + ROOT_URL + CPOE + '/' + orderId+'/updateOrder';
		//console.log(commonObj.toString());
		var promise = $http.put(URI, JSON.stringify(commonObj)).then(function(response) {
					//console.log(response);
					return response;
				},
				function() {
					alert("error");
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
			alert("error");
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
			alert("error");
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
			alert("error");
		})
		return promise;
	}
}]);