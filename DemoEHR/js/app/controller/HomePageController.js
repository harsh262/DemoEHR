/**
 * Angular Homepage Controller
 */
var homePageApp = angular.module(
		'homePageApp',
		[ 'ngCookies', 'ngAnimate', 'ngSanitize', 'ui.bootstrap','angularjs-dropdown-multiselect', 'ngMaterial', 'ngScrollbars','rzModule', 'nvd3' ])
		.run(['$rootScope','VitalReviewService','$cookies','pateintComplaintService','$timeout',
				   function($rootScope, VitalReviewService, $cookies, pateintComplaintService, $timeout) {
					   $rootScope.patientInfoMethod = VitalReviewService
					   .getPatientByFilter($cookies.get('doctorId'),
							   'mrn', $cookies.get('patientMrn')).then(
									   function(data) {
										   $rootScope.patientInfo = data;
										   // console.log($rootScope.patientInfo);
									   });
					   $rootScope.subCategoryValue = "none";

					   $rootScope.multiselectToArray = function(objectArray) {
						   var stringArray = [];
						   angular.forEach(objectArray, function(value, key) {
							   stringArray.push(value.id);
						   });
						   return stringArray;
					   }

					   $rootScope.resetFormValidation = function() {
						   $rootScope.$broadcast('show-errors-reset');
					   }
				   } ]);

homePageApp.config(function(ScrollBarsProvider) {
	// scrollbar defaults
	ScrollBarsProvider.defaults = {
			autoHideScrollbar : false,
			scrollInertia : 0,
			axis : 'yx',
			advanced : {
				updateOnContentResize : true
			},
			scrollButtons : {
				scrollAmount : 'auto', // scroll amount when button pressed
				enable : true
				// enable scrolling buttons by default
			}
	};
});

homePageApp.controller("HomePageController",['$scope',
		 '$rootScope',
		 'VitalReviewService',
		 '$window',
		 'CommonDateUtils',
		 '$cookies',
		 'pateintComplaintService',
		 'commonCrudService',
		 'allergyService',
		 'labResultService',
		 'postingService',
		 'intakeOutputService',
		 'POCService',
		 'fileUpload',
		 'FlagService',
		 '$mdSidenav',
		 '$mdUtil',
		 '$http',
		 'MedicationService',
		 'PatientInfoService',
		 'pateintComplaintService',
		 function($scope, $rootScope, VitalReviewService,
				 $window, CommonDateUtils, $cookies,
				 pateintComplaintService, commonCrudService,
				 allergyService, labResultService,
				 postingService, intakeOutputService,
				 POCService, fileUpload, FlagService,
				 $mdSidenav, $mdUtil, $http, MedicationService,
				 PatientInfoService, pateintComplaintService) {

			 $scope.leftHeaderList = [];
			 $scope.vitalList = [];
			 $scope.vitalObj = [];
			 $scope.patientId = $cookies.get("patientId");
			 $scope.patientMrn = $cookies.get("patientMrn");
			 $scope.doctorId = $cookies.get("doctorId");
			 $scope.doctorName = $cookies.get("doctorName");

			 // Cover Sheet Complaint List
			 pateintComplaintService.getPatientComplaintList(
					 $scope.patientId).then(function(data) {
						 $scope.getPatientComplaintList = data;
					 });

			 // Cover Page Lab Result List
			 labResultService.getLabResult($scope.patientId,
					 $scope.patientMrn).then(function(data) {
						 $scope.getLabResultList = data;
					 });

			 // Cover Sheet Medication List
			 getActiveMedicationsList();

			 // Cover Sheet posting list
			 getLastPostingsList();

			 // Cover Sheet Complaints
			 getActiveComplaint();

			 // Get Patient Information
			 getPatientInformation();

			 $scope.getLabResults = function() {
				 labResultService.getLabResult($scope.patientId,
						 $scope.patientMrn).then(function(data) {
							 $scope.getLabResultList = data;
						 });
			 }

			 $scope.decodeFunction = function(patient) {
				 return decodeURIComponent(patient);
			 }
			 // console.log($rootScope.patientInfo);
			 // $scope.patientInfo = $rootScope.patientInfo;// =
			 // VitalReviewService.getPatientByFilter('mrn',$cookies.get('patientMrn'));//JSON.parse(getCookie("patientInfo"));

			 /*
			  * get vital review list
			  */
			 $scope.getVitalList = function() {
				 VitalReviewService.getVitalReview($rootScope.patientInfo).then(
								 function(data) {
									 console.log("review whole data", data);
									 $scope.vitalReviewList = data;
									 generateVitalReviewTable();
									 $scope.getVitalGraph();
								 })
			 }

			 /*
			  * get vital review list by date range
			  */
			 
			 $scope.getVitalReviewDateRange = function(vitalDateRange) {
				 var values = vitalDateRange.split(" - ");
				 var lowerArr = values[0].split("-");
				 var lowerDate = lowerArr[1] + '-' + lowerArr[0] + '-' + lowerArr[2];

				 var upperArr = values[1].split("-");
				 var upperDate = upperArr[1] + '-' + upperArr[0] + '-' + upperArr[2];

				 var upperFinalDate = new Date(upperArr[2],
						 (parseInt(upperArr[1]) - 1),
						 upperArr[0], 23, 59, 59);

				 VitalReviewService.getVitalReviewDateRange($scope.patientId, upperFinalDate.getTime(), new Date(lowerDate).getTime()).then(
								 function(data) {
									 console.log("review whole data in range", data);
									 $scope.vitalReviewList = data;
									 generateVitalReviewTable();
									 $scope.getVitalGraph();
								 });
			 }

			 /*
			  * get todays vital review list
			  */

			 $scope.getTodaysVitalReview = function() {
				 var currentDate = new Date();
				 alert(currentDate.getTime());
				 var yesterday = new Date();
				 yesterday.setDate(yesterday.getDate() - 1);
				 alert(yesterday.getTime());
				 
				 VitalReviewService.getVitalReviewDateRange($scope.patientId, currentDate.getTime(), yesterday.getTime()).then(function(data) {
					 console.log("data based on range", data);
							 $scope.vitalReviewList = data;
							 generateVitalReviewTable();
							 $scope.getVitalGraph();
						 });
			 }

			 /*
			  * get Last 7 days vital review list
			  */
			 
			 $scope.getLastSevenDaysVitalReview = function() {
				 var currentDate = new Date();
				 alert(currentDate);
				 var pastSevenDay = new Date();
				 pastSevenDay.setDate(pastSevenDay.getDate() - 7);
				 alert(pastSevenDay);
				 
				 VitalReviewService.getVitalReviewDateRange($scope.patientId, pastSevenDay.getTime(), currentDate.getTime()).then(
								 function(data) {
									 $scope.vitalReviewList = data;
									 console.log("date wise data", data);
									 generateVitalReviewTable();
									 $scope.getVitalGraph();
								 });
			 }

			 /*
			  * $scope.getVitalGraph
			  */
			 $scope.getVitalGraph = function() {
				 $scope.options = {
						 chart : {
							 type : 'lineChart',
							 height : 400,
							 margin : {
								 top : 20,
								 right : 20,
								 bottom : 40,
								 left : 55
							 },
							 x : function(d) {
								 return d.x;
							 },
							 y : function(d) {
								 return d.y;
							 },
							 useInteractiveGuideline : true,
							 dispatch : {
								 stateChange : function(e) {
									 console.log("stateChange");
								 },
								 changeState : function(e) {
									 console.log("changeState");
								 },
								 tooltipShow : function(e) {
									 console.log("tooltipShow");
								 },
								 tooltipHide : function(e) {
									 console.log("tooltipHide");
								 }
							 },
							 xAxis : {
								 axisLabel : 'Date & Time',
								 tickFormat : function(d) {
									 return getDateTime(d);
								 },
								 rotateLabels : 0
							 },
							 yAxis : {
								 axisLabel : 'Value',
								 tickFormat : function(d) {
									 return d3.format(',.1f')(d);
								 },
								 axisLabelDistance : -10
							 },
							 callback : function(chart) {
							 }
						 },
						 title : {
							 enable : true,
							 text : 'Vital Graph'
						 },
						 subtitle : {
							 enable : true,
							 text : ' ',
							 css : {
								 'text-align' : 'center',
								 'margin' : '10px 13px 0px 7px'
							 }
						 },
						 caption : {
							 enable : true,
							 html : ' ',
							 css : {
								 'text-align' : 'justify',
								 'margin' : '10px 13px 0px 7px'
							 }
						 }
				 };

				 function getRandomColor() {
					 var letters = '0123456789ABCDEF';
					 var color = '#';
					 for (var i = 0; i < 6; i++) {
						 color += letters[Math.floor(Math.random() * 16)];
					 }
					 return color;
				 }

				 function getDateTime(dateInt) {
					 var time = DisplayCurrentTime(dateInt);
					 var date = new Date(dateInt);
					 return date.getDate() + "-"+ parseInt(date.getMonth() + 1)+ "-" + date.getFullYear() + " "+ time;
				 }

				 function DisplayCurrentTime(dateInt) {
					 var date = new Date(dateInt);
					 var hours = date.getHours() > 12 ? date
							 .getHours() - 12 : date.getHours();
							 var am_pm = date.getHours() >= 12 ? "PM"
									 : "AM";
							 hours = hours < 10 ? "0" + hours : hours;
							 var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date .getMinutes();
									 var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
											 time = hours + ":" + minutes + ":"
											 + seconds + " " + am_pm;
											 return hours + ":" + minutes + " " + am_pm;
				 };

				 $scope.data = generateGraph();
				 function generateGraph() {
					 var parentArr = new Array();
					 angular.forEach($scope.leftHeaderList,
							 function(header, key) {
						 /*
						  * var dataObj = angular.copy({
						  * [header] : [] })
						  */
						 var tempArray = new Array();
						 tempArray.push(header);
						 parentArr.push(tempArray);
						 // $scope.data.push(dataObj);
					 });
					 angular.forEach($scope.vitalReviewList,
							 function(value, key) {angular.forEach(value.vitals,
										 function(value1, key1) {
											 var index = $scope.leftHeaderList.indexOf(value1.key);
											 var obj = {
													 x : '',
													 y : ''
											 };
											 obj.x = value.date;
											 obj.y = parseInt(value1.value);
											 // alert(index);
											 parentArr[index]
											 .push(obj);
										 })
							 });

					 
					 var colorArr = [ "#ff7f0e", "#2ca02c" ];
					 var objArr = new Array();
					 angular.forEach(parentArr, function(value,
							 key) {
						 var title = parentArr[key][0];
						 parentArr[key].shift();
						 var temp = {
								 values : parentArr[key], // values
								 // -
								 // represents
								 // the
								 // array
								 // of
								 // {x,y}
								 // data
								 // points
								 key : title, // key - the name of
								 // the series.
								 color : getRandomColor()
								 // color - optional: choose your own
								 // line color.
								 // strokeWidth: 2
								 // classed: 'dashed'
						 }
						 objArr.push(temp);
					 });
					 return objArr;

				 }
			 }
			 // ------------- End of Graph---------------//

			 /*
			  * Add Row in vital table
			  */
			 $scope.AddData = function() {
				 $scope.$broadcast('show-errors-check-validity');
				 if ($scope.vitalform.$valid) {
					 $scope.$broadcast('show-errors-reset');
					 $scope.vitalList.push($scope.vitalObj);
					 $scope.initVitals();
				 }
			 };

			 /*
			  * Remove Row in vital table
			  */
			 $scope.removeData = function(index) {
				 if ($window
						 .confirm('Are you absolutely sure you want to delete?')) {
					 $scope.vitalList.splice(index, 1);
				 }

			 };
			 /*
			  * function to set text boxes.
			  */
			 $scope.setVital = function(vitalName, min, max,
					 unit, range, key) {
				 $scope.vitalObj.vitalName = vitalName;
				 $scope.vitalObj.min = min;
				 $scope.vitalObj.max = max;
				 $scope.vitalObj.unit = unit;
				 $scope.vitalObj.range = range;
				 $scope.vitalObj.key = key;
			 }
			 $scope.initVitals = function() {
				 $scope.vitalObj = angular.copy({
					 "vitalName" : "",
					 "min" : "",
					 "max" : "",
					 "unit" : "",
					 "range" : "",
					 "key" : ""
				 });
			 }
			 $scope.initVitals();

			 // save vitals
			 $scope.saveVitlas = function() {
				 $scope.$broadcast('show-errors-check-validity');

				 if ($scope.vitalList != '') {
					 var currDt = new Date();
					 var datetext = currDt.toTimeString();
					 var vitalObj = {
							 "date" : currDt.getTime(),
							 "timeStamp" : CommonDateUtils.getTime(),
							 "visitId" : $rootScope.patientInfo.visitRecords[0]._id,
							 "doctorId" : $scope.doctorId,
							 "vitals" : $scope.vitalList
					 }
					 VitalReviewService
					 .saveVitals(vitalObj,
							 $cookies.get('doctorId'),
							 $rootScope.patientInfo._id)
							 .then(
									 function(data) {
										 $scope.vitalList = [];
										 $scope
										 .$broadcast('show-errors-reset');
									 });

				 }

			 }

			 $scope.decodeFunction = function(patient) {
				 return decodeURIComponent(patient);
			 }

			 function getParamValuesFromUrl() {
				 // This function is anonymous, is executed
				 // immediately and
				 // the return value is assigned to QueryString!
				 var query_string = {};
				 var query = window.location.search.substring(1);
				 var vars = query.split("&");
				 for (var i = 0; i < vars.length; i++) {
					 var pair = vars[i].split("=");
					 // If first entry with this name
					 if (typeof query_string[pair[0]] === "undefined") {
						 query_string[pair[0]] = decodeURIComponent(pair[1]);
						 // If second entry with this name
					 } else if (typeof query_string[pair[0]] === "string") {
						 var arr = [ query_string[pair[0]],
						             decodeURIComponent(pair[1]) ];
						 query_string[pair[0]] = arr;
						 // If third or later entry with this
						 // name
					 } else {
						 query_string[pair[0]]
						 .push(decodeURIComponent(pair[1]));
					 }
				 }
				 // alert(location.href.replace(query, ""));
				 // location.href=location.href.replace(query,
				 // "");
				 // $rootScope.patientInfo =
				 // return
				 // JSON.parse($scope.decodeFunction(query_string.pData));
				 return JSON.parse(query_string.pData);
				 // return query_string.pData;
			 }

			 /*
			  * Generate vital review table
			  */
			 function generateVitalReviewTable() {
				 var tb = angular.element(document.querySelector('#myTable'));
				 tb.empty();
				 var max = 0;
				 var index = 0;
				 var vital = {
						 vitalName : $scope.vitalName,
						 value : $scope.value,
						 unit : $scope.unit,
						 range : $scope.range,
				 }

				 angular.forEach($scope.vitalReviewList,
						 function(value, key) {
							 angular.forEach(value.vitals,
									 function(value,key) {
										 if ($scope.leftHeaderList.indexOf(value.key) == -1) {
											 $scope.leftHeaderList.push(value.key);
										 }
									 });

						 });

				 var tableStr = "";
				 var i = 0;
				 tableStr += "<thead>"
					 + "<tr class=\"border-bottom\"><th style = \"background-color: #f5fffd;color: #39ab94; padding-right:15px;padding-top: 5px;padding-bottom: 5px;\">&nbsp;<br><br></td>";
				 angular.forEach($scope.leftHeaderList,
						 function(topHeading, key) {
							 tableStr += "<th style=\"background-color: #f5fffd; color: #39ab94; padding:4px;\">"
								 + topHeading
								 + "</th>";

						 });
				 tableStr += "</tr></thead>";

				 /*
				  * headingTable += "<tr class=\"border-bottom\"><th style = \"background-color: #f5fffd;width:60px;color: #39ab94;padding-top: 5px;padding-bottom: 5px;\">&nbsp;<br><br></td>";
				  * angular.forEach($scope.leftHeaderList,
				  * function(topHeading, key) { headingTable += "<th style=\"background-color: #f5fffd; color: #39ab94; padding:4px;width:80px;\">"+topHeading+"</th>";
				  * 
				  * }); headingTable += "</tr>";
				  * 
				  * var eleHeading = angular.element(
				  * document.querySelector( '#heading-table' ) );
				  * eleHeading.append(headingTable);
				  */
				 // --------
				 tableStr += "<tbody>"
					 angular.forEach(
							 $scope.vitalReviewList,
							 function(value, key) {
								 // if(key <= 9){
								 var jsondate = "/Date("
									 + value.date + ")/";
								 var jsDate = new Date(
										 parseInt(jsondate.substr(6)));
								 var vitalDate = getNewDate(jsDate);
								 tableStr += "<tr class=\"border-bottom\" >"
									 + "<td style = \"padding-right:15px;padding-top: 5px;padding-bottom: 5px;\"> <div>"
									 + vitalDate
									 + "</div><div>"
									 + value.timeStamp
									 + "</div></td>"
									 angular.forEach(
											 $scope.leftHeaderList,
											 function(header,key) {
												 angular.forEach(value.vitals,
														 function(value1,key) {
															 if (header == value1.key) {
																 if ($scope.vitalRangeCheck(value1.value,value1.min,value1.max))
																	 tableStr += "<td style=\"padding:4px;\" class=\"red-font-color\">"
																	 + value1.value
																	 + " "
																	 + value1.unit
																	 + "</td>";
																 else
																	 tableStr += "<td style=\"padding:4px;\">"
																		 + value1.value
																		 + " "
																		 + value1.unit
																		 + "</td>";
																 i = 1;
																 return;
															 }
														 });
												 if (i == 0)
													 tableStr += "<td>-</td>";
												 else
													 i = 0;
											 });

								 tableStr += "</tr>";
								 // }
							 });
				 tableStr += "</tbody>";
				 var tableWidth = $scope.vitalReviewList.length * 110 + 121;
				 var myEl = angular.element(document.querySelector('#myTable'));
				 /*
				  * $scope.myStyle= { 'width': tableWidth+'px',
				  * "overflow":"hidden" }
				  */

				 myEl.append(tableStr);
			 }

			 $scope.vitalRangeCheck = function(val, minVal,
					 maxVal) {
				 var intVal = parseFloat(val);
				 var intMinVal = parseFloat(minVal);
				 var intMaxVal = parseFloat(maxVal);
				 // alert(intVal+"_"+intMinVal+"_"+intMaxVal);
				 // alert(intVal >= intMinVal || intVal <=
				 // intMaxVal);
				 if (intVal >= intMinVal || intVal <= intMaxVal) {
					 return false;
				 } else {
					 return true;
				 }
			 }

			 $scope.getLabOrders = function() {
				 commonCrudService.getOrderByCategory(
						 $rootScope.patientInfo._id,
						 "Lab Order",
						 $rootScope.subCategoryValue).then(
								 function(data) {
									 $scope.getLabOrderList = data;
								 });
			 }

			 $scope.getImagingOrders = function() {
				 commonCrudService.getOrderByCategory(
						 $rootScope.patientInfo._id,
						 "Imaging Order",
						 $rootScope.subCategoryValue).then(
								 function(data) {
									 $scope.getImagingOrderList = data;
								 });
			 }

			 $scope.getIpPharmacyOrders = function() {
				 commonCrudService
				 .getOrderByCategory(
						 $rootScope.patientInfo._id,
						 "IP Pharmacy",
						 $rootScope.subCategoryValue)
						 .then(
								 function(data) {
									 $scope.getIpPharmacyOrderList = data;
								 });
			 }

			 $scope.getIvPharmacyOrders = function() {
				 commonCrudService
				 .getOrderByCategory(
						 $rootScope.patientInfo._id,
						 "IV Pharmacy",
						 $rootScope.subCategoryValue)
						 .then(
								 function(data) {
									 $scope.getIvPharmacyOrderList = data;
								 });
			 }

			 $scope.getProcedureSurgicalOrders = function() {
				 commonCrudService
				 .getOrderByCategory(
						 $rootScope.patientInfo._id,
						 "Procedure/Surgical",
						 $rootScope.subCategoryValue)
						 .then(
								 function(data) {
									 $scope.getProcedureSurgicalOrderList = data;
								 });
			 }

			 $scope.getGeneralOrders = function() {
				 commonCrudService.getOrderByCategory(
						 $rootScope.patientInfo._id, "General",
						 $rootScope.subCategoryValue).then(
								 function(data) {
									 $scope.getGeneralOrderList = data;
								 });
			 }

			 $scope.getConsultOrders = function() {
				 commonCrudService.getOrderByCategory(
						 $rootScope.patientInfo._id, "Consult",
						 $rootScope.subCategoryValue).then(
								 function(data) {
									 $scope.getConsultOrderList = data;
								 });
			 }
			 $scope.getVitalOrders = function() {
				 commonCrudService.getOrderByCategory(
						 $rootScope.patientInfo._id, "Vital",
						 $rootScope.subCategoryValue).then(
								 function(data) {
									 $scope.getVitalOrderList = data;
								 });
			 }

			 $scope.getNursingOrders = function() {
				 commonCrudService.getOrderByCategory(
						 $rootScope.patientInfo._id, "Nursing",
						 $rootScope.subCategoryValue).then(
								 function(data) {
									 $scope.getNursingOrderList = data;
								 });
			 }

			 $scope.getOrderSetsOrders = function() {
				 commonCrudService
				 .getOrderByCategory(
						 $rootScope.patientInfo._id,
						 "OrderSets",
						 $rootScope.subCategoryValue)
						 .then(
								 function(data) {
									 $scope.getOrderSetsOrderList = data;
								 });
			 }

			 $scope.getPatientMovementOrders = function() {
				 commonCrudService
				 .getOrderByCategory(
						 $rootScope.patientInfo._id,
						 "Patient Movement", "Admit")
						 .then(
								 function(data) {
									 $scope.getPatientMovementOrderList = data;
								 });
			 }
			 $scope.getBloodComponentOrders = function() {
				 commonCrudService
				 .getOrderByCategory(
						 $rootScope.patientInfo._id,
						 "BloodComponent",
						 $rootScope.subCategoryValue)
						 .then(
								 function(data) {
									 $scope.getBloodComponentOrderList = data;
								 });
			 }

			 $scope.getDietOrders = function() {
				 commonCrudService.getOrderByCategory(
						 $rootScope.patientInfo._id, "Diet",
				 "Diet").then(function(data) {
					 $scope.getDietOrderList = data;
				 });
			 }

			 $scope.getPatientComplaints = function() {
				 pateintComplaintService
				 .getPatientComplaintList(
						 $rootScope.patientInfo._id)
						 .then(
								 function(data) {
									 $scope.getPatientComplaintList = data;
								 });
			 }

			 /*
			  * $scope.getPatientProblemList = function(){
			  * pateintComplaintService.getPatientProblemList().then(function(data){
			  * console.log(data); $scope.getPatientProblemList =
			  * data; }); }
			  */

			 $scope.getOpPharmacyOrders = function() {
				 commonCrudService
				 .getOrderByCategory(
						 $rootScope.patientInfo._id,
						 "Op Pharmacy", "Dosage")
						 .then(
								 function(data) {
									 $scope.getOpPharmacyOrderList = data;
								 });
			 }

			 // ======= Diet =========//
			 $scope.diet = function() {
				 commonCrudService.getOrderByCategory(
						 $rootScope.patientInfo._id, "Diet",
				 "Diet").then(function(data) {
					 $scope.orderItems = angular.copy({
						 "billingCode" : "",
						 "isolation" : "",
						 "dietComponent" : "",
						 "dietEffectiveDate" : "",
						 "dietExirationDate" : "",
						 "dietDelivery" : "",
						 "dietPrecaution" : "",
						 "dietSpecialInstructions" : ""
					 });
					 $scope.getDietOrderList = data;
				 });
			 }
			 $scope.tubeFeeding = function() {
				 $scope.subCategory = "Tube Feeding";
				 commonCrudService.getOrderByCategory(
						 $rootScope.patientInfo._id, "Diet",
				 "Tube Feeding").then(function(data) {
					 $scope.orderItems = angular.copy({
						 "billingCode" : "",
						 "tubeFeedingProduct" : "",
						 "strength" : "",
						 "quantity" : "",
						 "amount" : "",
						 "specialInstructions" : "",
						 "cancelFutureTRAYPOrder" : ""
					 })
					 $scope.getDietOrderList = data;
				 });
			 }

			 $scope.earlyLateTray = function() {
				 $scope.subCategory = "Early/Late Tray";
				 commonCrudService.getOrderByCategory(
						 $rootScope.patientInfo._id, "Diet",
				 "Early/Late Tray").then(function(data) {
					 $scope.orderItems = angular.copy({
						 "billingCode" : "",
						 "Meal" : "",
						 "startDate" : "",
						 "endDate" : "",
						 "dayOfWeek" : {
							 "Monday" : false,
							 "Tuesday" : false,
							 "Wednesday" : false,
							 "Thursday" : false,
							 "Friday" : false,
							 "Saturday" : false,
							 "Sunday" : false
						 }
					 })
					 $scope.getDietOrderList = data;
				 });
			 }

			 $scope.addtionalOrders = function() {
				 $scope.subCategory = "Additional Orders";
				 commonCrudService.getOrderByCategory(
						 $rootScope.patientInfo._id, "Diet",
				 "Additional Orders").then(
						 function(data) {
							 $scope.orderItems = angular.copy({
								 "billingCode" : "",
								 "additionalOrder" : ""
							 });
							 $scope.getDietOrderList = data;
						 });
			 }

			 // ========Patient Movement ===========//
			 $scope.admit = function() {
				 $scope.subCategory = "Admit";
				 commonCrudService
				 .getOrderByCategory(
						 $rootScope.patientInfo._id,
						 "Patient Movement", "Admit")
						 .then(
								 function(data) {
									 $scope.orderItems = angular
									 .copy({
										 "billingCode" : "",
										 "wardName" : "",
										 "careProvider" : "",
										 "speciality" : "",
										 "startDate" : "",
										 "endDate" : "",
										 "admissionDiagnosis" : "",
										 "description" : ""
									 });
									 $scope.getPatientMovementOrderList = data;
								 });
			 }

			 $scope.transfer = function() {
				 $scope.subCategory = "Transfer";
				 commonCrudService
				 .getOrderByCategory(
						 $rootScope.patientInfo._id,
						 "Patient Movement", "Transfer")
						 .then(
								 function(data) {
									 $scope.orderItems = angular
									 .copy({
										 "billingCode" : "",
										 "wardName" : "",
										 "careProvider" : "",
										 "speciality" : "",
										 "startDate" : "",
										 "endDate" : "",
										 "description" : ""
									 });
									 $scope.getPatientMovementOrderList = data;
								 });
			 }

			 $scope.discharge = function() {
				 $scope.subCategory = "Discharge";
				 commonCrudService
				 .getOrderByCategory(
						 $rootScope.patientInfo._id,
						 "Patient Movement", "Discharge")
						 .then(
								 function(data) {
									 $scope.orderItems = angular
									 .copy({
										 "billingCode" : "",
										 "Type" : "",
										 "dischargeDiagnosis" : "",
										 "description" : ""
									 });
									 $scope.getPatientMovementOrderList = data;
								 });
			 }

			 // ----------------------- allergy module
			 // ------------------------//
			 // $scope.allergyObj = [];
			 $scope.alleryOriginatorModel = [ {
				 id : 1
			 } ];
			 $scope.alleryOriginatorData = [ {
				 id : 1,
				 label : "Dr. Smith"
			 }, {
				 id : 2,
				 label : "Dr Dinesh Raddy"
			 }, {
				 id : 3,
				 label : "Dr. fb"
			 }, {
				 id : 4,
				 label : "Dr gbf Raddy"
			 } ];

			 $scope.alleryOriginatorSettings = {
					 smartButtonMaxItems : 3,
					 enableSearch : true,
					 smartButtonTextConverter : function(itemText,
							 originalItem) {
						 if (itemText === 'Dr. Smith') {
							 return 'Dr. Smith!';
						 }

						 return itemText;
					 }
			 };

			 // -----Date can select todays and previous only
			 $scope.dateOptions = {
					 maxDate : new Date(),
					 startingDay : 1
			 };

			 $scope.today = function() {
				 $scope.allergyObj.date = new Date();
			 };

			 $scope.allergyOpen = function() {
				 $scope.allergyPopup.opened = true;
			 };

			 $scope.allergyPopup = {
					 opened : false
			 };

			 $scope.setAllergiesVital = function(allergyName) {
				 $scope.allergyObj.allergyName = allergyName;
			 }

			 $scope.saveAllergy = function() {
				 $scope.$broadcast('show-errors-check-validity');
				 if ($scope.allergyForm.$valid) {
					 // console.log($scope.allergyObj);
					 $scope.allergyObj.originationDate = new Date(
							 $scope.allergyObj.originationDate)
					 .getTime();
					 $scope.allergyObj.doctorId = $scope.doctorId;
					 $scope.allergyObj.visitId = $rootScope.patientInfo.visitRecords[0]._id;
					 console.log("visitId",
							 $scope.allergyObj.visitId);
					 allergyService
					 .saveAllergy($scope.allergyObj,
							 $rootScope.patientInfo._id)
							 .then(
									 function(data) {
										 $scope
										 .$broadcast('show-errors-reset');
										 // console.log(data);
										 $scope.reset();
										 getAllergyList();
										 getPatientInformation();
									 });
					 $scope.allergyName = "";
				 }

			 }

			 $scope.allergyMarkAsError = function(allergyId,
					 state) {
				 // console.log(allergyId);
				 var param = {
						 "doctorId" : $cookies.get("doctorId"),
						 "state" : state,
						 "allergyId" : allergyId
				 }
				 allergyService.allergyMarkAsError(allergyId,
						 $scope.patientId, param).then(
								 function(data) {
									 getAllergyList();
									 getPatientInformation();
								 });

			 }

			 $scope.getAllergy = function() {
				 $scope.reset();
				 allergyService.getAllergyList(
						 $rootScope.patientInfo._id).then(
								 function(data) {
									 $scope.getAllergyList = data;
									 $scope.reset();
									 // console.log($scope.getAllergyList);
								 });
			 }

			 function getAllergyList() {
				 $scope.reset();
				 allergyService.getAllergyList(
						 $rootScope.patientInfo._id).then(
								 function(data) {
									 $scope.getAllergyList = data;
								 });
			 }

			 $scope.reset = function() {
				 // $scope.allergyObj = angular.copy({});
				 $scope.allergyObj = {
						 "allergyName" : "",
						 "date" : new Date().getTime(),
						 "nature" : "Allergy",
						 "observedHistory" : "Historical",
						 "severity" : "Moderate",
						 "originators" : "Self",
						 "comments" : "",
						 "markNKA" : true,
						 "symptoms" : [],
						 "originationDate" : new Date(),
						 "type" : "Confirmed",
						 "doctorId" : $cookies.get('doctorId'),
						 "visitId" : $rootScope.patientInfo.visitRecords[0]._id,
						 "state" : "active"

				 };
				 $scope.allergyObj.type = "Confirmed";
			 };

			 $scope.getDate = function(dateStr) {
				 return CommonDateUtils.convertJSONStringToDate(dateStr);
			 }

			 // $scope.reset();

			 $scope.searchAllergies = function(value) {
				 var allergyList = [];
				 return $http
				 .get(
						 'http://35.154.76.183:5100/allergySearch/'
						 + value, {})
						 .then(
								 function(res) {
									 angular
									 .forEach(
											 res.data,
											 function(
													 item) {
												 var obj = {
														 allergyId : '',
														 allergyName : '',
														 potentialReaction : '',
														 remarks : '',
														 type : ''
												 };
												 obj.allergyId = item._id;
												 obj.allergyName = item.Allergy_Name;
												 obj.potentialReaction = item.Potential_reaction;
												 obj.remarks = item.Remarks
												 obj.type = item.Type
												 allergyList
												 .push(obj);
											 });
									 // console.log(allergyList);
									 return allergyList;
								 });
			 }

			 $scope.on_allergy_selected = function($item,
					 $model, $label) {
				 $scope.allergyObj.allergyName = $item.allergyName;
			 }

			 // ----------------- Posting
			 // -----------------------//
			 $scope.postingObj = [];

			 // save Ed
			 $scope.saveEdPosting = function() {
				 $scope.$broadcast('show-errors-check-validity');
				 if ($scope.postingEdForm.$valid) {
					 $scope.$broadcast('show-errors-reset');

					 $scope.postingObj.patientId = $scope.patientId;
					 $scope.postingObj.doctorId = $scope.doctorId;
					 $scope.postingObj.visitId = $rootScope.patientInfo.visitRecords[0]._id;
					 postingService.savePosting(
							 $scope.postingObj).then(
									 function(data) {
										 getPostings();
										 getLastPostingsList();
										 $scope.resetPosting();
										 $scope.resetFormValidation();
									 });
				 }
			 }

			 // save Non-ED
			 $scope.saveNonEdPosting = function() {
				 $scope.$broadcast('show-errors-check-validity');
				 if ($scope.postingNonEdForm.$valid) {
					 $scope.$broadcast('show-errors-reset');
					 /*----- file upload start----*/
					 var file = $scope.myFile;
					 console.dir(file);
					 if (file != '' || file != undefined) {
						 var uploadUrl = "/fileUpload";
						 fileUpload.uploadFileToUrl(file,
								 $scope.patientId).then(
										 function(data) {
											 // console.log(data)
										 });
					 }
					 /*----- file upload end----*/
					 $scope.postingObj.patientId = $scope.patientId;
					 $scope.postingObj.doctorId = $scope.doctorId;
					 $scope.postingObj.visitId = $rootScope.patientInfo.visitRecords[0]._id;
					 postingService.savePosting(
							 $scope.postingObj).then(
									 function(data) {
										 getPostings();
										 getLastPostingsList();
										 $scope.resetPosting();
										 $scope.resetFormValidation();
									 });
				 }
			 }
			 function getPostings() {
				 postingService.getPostingList($scope.patientId)
				 .then(function(data) {
					 $scope.getPostingList = data;
				 });
			 }
			 $scope.getPostings = function() {
				 postingService.getPostingList($scope.patientId)
				 .then(function(data) {
					 $scope.getPostingList = data;
				 });
			 }

			 $scope.resetPosting = function() {
				 $scope.postingObj = {
						 "patientId" : "",
						 "sliderValue" : "",
						 "postingType" : $scope.postingType,
						 "date" : new Date().getTime(),
						 "title" : "",
						 "status" : "Pending",
						 "comment" : ""
				 }
			 }
			 $scope.resetPosting();
			 $scope.postingObj.postingType = "ER";
			 $scope.postingType = $scope.postingObj.postingType;

			 $scope.ER = function() {
				 $scope.postingObj.postingType = "ER";
				 $scope.postingType = $scope.postingObj.postingType;
			 }
			 $scope.NOE = function() {
				 $scope.postingObj.postingType = "NOE";
				 $scope.postingType = $scope.postingObj.postingType;
			 }

			 function getLastPostingsList() {
				 postingService.getLastPostingsList(
						 $scope.patientId).then(function(data) {
							 $scope.lastPostingsList = data;
						 });
			 }
			 /* ----------------End of Posting ------------------ */
			 $scope.labRangeCheck = function(val, minVal, maxVal) {
				 var intVal = parseFloat(val);
				 var intMinVal = parseFloat(minVal);
				 var intMaxVal = parseFloat(maxVal);
				 // alert(intVal+"_"+intMinVal+"_"+intMaxVal);
				 // alert(intVal >= intMinVal || intVal <=
				 // intMaxVal);
				 if (intVal >= intMinVal || intVal <= intMaxVal) {
					 return false;
				 } else {
					 return true;
				 }
			 }

			 /*------------------- Intake Output Module ------------------- */

			 $scope.saveIntake = function(intakeOutputType) {
				 // console.log($scope.intakeObj);
				 var parameter = '';
				 if ($scope.intakeObj.parameter == 'Other')
					 parameter = $scope.intakeOtherParameter;
				 else
					 parameter = $scope.intakeObj.parameter;

				 $scope.intakeOutputObj = angular
				 .copy({
					 "patientId" : $scope.patientId,
					 "intakeOutputType" : intakeOutputType,
					 "value" : $scope.intakeObj.value,
					 "qualifiers" : $scope.intakeObj.qualifiers,
					 "timeStamp" : new Date().getTime(),
					 "parameter" : parameter,
					 "POPFlag" : true,
					 "doctorId" : $scope.doctorId,
					 "visitId" : $rootScope.patientInfo.visitRecords[0]._id,
				 });
				 intakeOutputService.saveIntake(
						 $scope.intakeOutputObj).then(
								 function(data) {
									 getIntakeOutputList();
								 });
				 resetIntake();
			 }

			 $scope.saveOutput = function(intakeOutputType) {
				 // console.log($scope.outputObj);
				 var parameter = '';
				 if ($scope.outputObj.parameter == 'Other')
					 parameter = $scope.outputOtherParameter;
				 else
					 parameter = $scope.outputObj.parameter;
				 $scope.intakeOutputObj = angular.copy({
					 "patientId" : $scope.patientId,
					 "intakeOutputType" : intakeOutputType,
					 "value" : $scope.outputObj.value,
					 "qualifiers" : $scope.outputObj.qualifiers,
					 "timeStamp" : new Date().getTime(),
					 "parameter" : parameter,
					 "POPFlag" : true
				 });
				 intakeOutputService.saveIntake(
						 $scope.intakeOutputObj).then(
								 function(data) {
									 // alert("success");
									 getIntakeOutputList();
								 });
				 resetOutput();
			 }
			 $scope.getIntakeOutputList = function() {
				 intakeOutputService.getIntakeOutputList(
						 $scope.patientId).then(function(data) {
							 // console.log(data);
							 $scope.getIntakeOutputList = data;
						 });
			 }

			 function getIntakeOutputList() {
				 intakeOutputService.getIntakeOutputList(
						 $scope.patientId).then(function(data) {
							 // console.log(data);
							 $scope.getIntakeOutputList = data;
						 });
			 }
			 $scope.resetIntakeOutput = function() {
				 $scope.intakeOutputObj = angular.copy({
					 "patientId" : "",
					 "intakeOutputType" : "",
					 "value" : "",
					 "qualifiers" : "",
					 "timeStamp" : "",
					 "parameter" : "",
					 "POPFlag" : true
				 });
			 };

			 function resetIntake() {
				 $scope.intakeObj.parameter = "",
				 $scope.intakeObj.value = "",
				 $scope.intakeObj.qualifiers = "",
				 $scope.intakeOtherParameter = ""
			 }
			 function resetOutput() {
				 $scope.outputObj.parameter = "",
				 $scope.outputObj.value = "",
				 $scope.outputObj.qualifiers = "",
				 $scope.outputObjOtherParameter = ""
			 }

			 $scope.getTimeByDate = function(jsonDate) {
				 return CommonDateUtils.getTimeByDate(jsonDate);
			 }

			 /*---------------------- POC -------------------*/

			 function getPOCList() {
				 POCService
				 .getPOCList($scope.patientId)
				 .then(
						 function(data) {
							 $scope.getPOCList = data;
							 $scope.pocArray = [];
							 angular
							 .forEach(
									 $scope.getPOCList,
									 function(
											 pocMstList,
											 key) {
										 angular
										 .forEach(
												 pocMstList.POCtestList,
												 function(
														 pocDtlList,
														 key1) {
													 pocDtlList['_id'] = pocMstList._id;
													 pocDtlList['markError'] = pocMstList.markError;
													 $scope.pocArray
													 .push(pocDtlList);
												 });
									 });
							 // console.log($scope.getPOCList);
						 });
			 }
			 $scope.getPOCMasters = function() {
				 getPOCList();
				 $scope.gender = $rootScope.patientInfo.gender;
				 POCService.getPOCMasterList().then(
						 function(data) {
							 $scope.getPOCMasterList = data;
						 });
			 }

			 $scope.getPOCById = function(pocId) {
				 $scope.POCTestList = getTests(pocId);
			 }

			 $scope.setAtleastOnePOC = function() {
				 var ele = angular.element(document
						 .getElementsByClassName("poctest"));
				 var flag = false;
				 for (var i = 0; i < $scope.POCTestList.length; i++) {
					 if ($scope.POCTestList[i].default_Value != '') {
						 flag = true;
					 }
				 }
				 // console.log(flag);
				 if (flag) {
					 ele.removeClass('ng-show').addClass(
					 'ng-hide');
				 } else {
					 ele.removeClass('ng-hide').addClass(
					 'ng-show');
				 }
			 }

			 $scope.savePOC = function() {
				 var pocListObj = []
				 var min;
				 var max;
				 var flag = false;
				 var ele = angular.element(document
						 .getElementsByClassName("poctest"));
				 list = $scope.POCTestList;
				 if (list != undefined) {
					 for (var i = 0; i < list.length; i++) {
						 if (list[i].default_Value != '') {
							 if (list[i].range.length == 2) {
								 for (var j = 0; j < list[i].range.length; j++) {
									 if ($scope.gender == "Male"
										 && list[i].range[j].key == "men") {
										 min = list[i].range[j].min;
										 max = list[i].range[j].max;
									 } else if ($scope.gender == "Female"
										 && list[i].range[j].key == "women") {
										 min = list[i].range[j].min;
										 max = list[i].range[j].max;
									 }
								 }

							 } else {
								 min = list[i].range[0].min;
								 max = list[i].range[0].max;
							 }

							 var tests = {
									 "test" : list[i].parameter_name,
									 "unit" : list[i].unit,
									 "minRange" : min,
									 "maxRange" : max,
									 "testValue" : list[i].default_Value
							 }
							 pocListObj.push(tests);
							 flag = true;

							 // console.log(tests);
						 }
						 // $scope.POCTestList =
						 // angular.copy({});
					 }
				 }
				 // console.log(pocListObj);
				 if (flag) {
					 var resultantPOC = {
							 "doctorId" : $scope.doctorId,
							 "visitId" : $rootScope.patientInfo.visitRecords[0]._id,
							 "POCTestName" : $scope.pocTestName,
							 "POCdate" : new Date().getTime(),
							 "listItems" : pocListObj
					 };
					 // console.log(resultantPOC);

					 POCService.savePOC(resultantPOC,
							 $scope.patientId).then(
									 function(data) {
										 console.log(data);
										 getPOCList();
										 $scope.resetPOCForm();
									 });
					 ele.removeClass('ng-show').addClass(
					 'ng-hide');
				 } else {
					 ele.removeClass('ng-hide').addClass(
					 'ng-show');
				 }
			 }
			 $scope.resetPOCForm = function() {
				 var ele = angular.element(document
						 .getElementsByClassName("poctest"));
				 if ($scope.POCTestList != undefined) {
					 for (var i = 0; i < $scope.POCTestList.length; i++) {
						 $scope.POCTestList[i].default_Value = '';
					 }
				 }
				 ele.removeClass('ng-show').addClass('ng-hide');
			 }

			 $scope.pocMarkError = function(POCId) {
				 var pocObj = {
						 "POCId" : POCId,
						 "doctorId" : $scope.doctorId
				 };
				 POCService.pocMarkError($scope.patientId,
						 pocObj).then(function(data) {
							 getPOCList();
						 });
			 }

			 function getTests(pocId) {
				 list = $scope.getPOCMasterList;
				 // console.log(list);
				 for (var d = 0, len = list.length; d < len; d += 1) {
					 if (list[d]._id === pocId) {
						 $scope.pocTestName = list[d].test_name;
						 return list[d].Parameter;
					 }
				 }
			 }

			 /*------------------- File Upload ----------------*/
			 $scope.uploadFile = function() {
				 /*
				  * var file = $scope.myFile;
				  * 
				  * console.log('file is ' ); console.dir(file);
				  * 
				  * var uploadUrl = "/fileUpload";
				  * fileUpload.uploadFileToUrl(file,
				  * $scope.patientId).then(function(data){
				  * console.log(data) });
				  */
			 };

			 /*---------------------- Flag -------------------*/
			 $scope.saveFlag = function(flagList, flagvalue) {
				 if (flagList != '' && flagvalue != '') {
					 var flagListItems = [];
					 var obj = {
							 flagName : "",
							 flagValue : ""
					 };
					 // console.log(flagList);
					 for (var i = 0; i < flagList.length; i++) {
						 var flag = flagList[i];
						 obj.flagName = flagList[i].id;
						 obj.flagValue = flagvalue;
						 flagListItems.push(obj);
					 }
					 var flagObj = {
							 "doctorId" : $scope.doctorId,
							 "visitId" : $rootScope.patientInfo.visitRecords[0]._id,
							 "flagList" : flagListItems
					 }
					 FlagService.saveFlag(flagObj,
							 $scope.patientId).then(
									 function(data) {
										 // console.log(data);
										 getFlagList();
										 resetFlag();
										 getPatientInformation();
									 });
				 }

			 }

			 function getFlagList() {
				 FlagService.getFlagList($scope.patientId).then(
						 function(data) {
							 $scope.getFlagList = data;
						 });
			 }

			 $scope.getFlags = function() {
				 resetFlag();
				 FlagService.getFlagList($scope.patientId).then(
						 function(data) {
							 $scope.getFlagList = data;
							 // console.log($scope.getFlagList);
						 });
			 }

			 $scope.flagEnteredInError = function(flagId) {
				 var param = {
						 "doctorId" : $scope.doctorId
				 }
				 FlagService.flagEnteredInError(flagId,
						 $scope.patientId, param).then(
								 function(data) {
									 // console.log(data);
									 getFlagList();
								 });
			 }

			 $scope.updateFlag = function(flagId, flagValue) {
				 // console.log(flagId + "/" +flagValue)
				 var param = {
						 "flagId" : flagId,
						 "flagValue" : flagValue,
						 "doctorId" : $scope.doctorId
				 }
				 FlagService.updateFlag($scope.patientId, param)
				 .then(function(data) {
					 getFlagList();
					 getPatientInformation();
				 });

			 }

			 function resetFlag() {
				 $scope.flagValue = "";
				 $scope.flagDropModel = [];
			 }

			 // ------------------ Medication------------------//
			 $scope.getMedications = function() {
				 MedicationService.getMedicationList(
						 $scope.patientId).then(function(data) {
							 $scope.getMedicationList = data;
						 });
			 }

			 function getMedicationList() {
				 MedicationService.getMedicationList(
						 $scope.patientId).then(function(data) {
							 $scope.getMedicationList = data;
						 });
			 }

			 function getActiveMedicationsList() {
				 MedicationService.getActiveMedicationsList(
						 $scope.patientId).then(function(data) {
							 $scope.activeMedicationList = data;
						 });
			 }
			 // ------------------ Medication
			 // End------------------//

			 // ------------------ Lab
			 // --------------------------//

			 // Get Lab result by date range
			 $scope.getLabResultByDateRange = function(
					 labDateRange) {
				 var values = labDateRange.split(" - ");
				 // console.log(values);
				 var lowerArr = values[0].split("-");
				 var lowerDate = lowerArr[1] + '-' + lowerArr[0]
				 + '-' + lowerArr[2];

				 var upperArr = values[1].split("-");
				 var upperDate = upperArr[1] + '-' + upperArr[0]
				 + '-' + upperArr[2];

				 var upperFinalDate = new Date(upperArr[2],
						 (parseInt(upperArr[1]) - 1),
						 upperArr[0], 23, 59, 59);

				 labResultService.getLabResultDateRange(
						 $scope.patientId, $scope.patientMrn,
						 upperFinalDate.getTime(),
						 new Date(lowerDate).getTime()).then(
								 function(data) {
									 // console.log(data);
									 if (data == "none") {
										 $scope.getLabResultList = "";
									 } else {
										 $scope.getLabResultList = data;
									 }
								 });
			 }
			 // ------------------ Lab End
			 // -----------------------//
			 /*-------------- Patient Information (to get patient information and recent allergy and flag) -------------*/
			 function getPatientInformation() {
				 PatientInfoService.getPatientInfo(
						 $scope.patientId).then(function(data) {
							 $scope.patientInformation = data;
							 getFirstActiveFlag();
							 getFirstActiveAllergy();
						 });
			 }
			 /*---------get first active patient flag ------------*/
			 function getFirstActiveFlag() {
				 $scope.patientCoverPageFlag = "";
				 // console.log($scope.patientInformation.flagResult);
				 angular
				 .forEach(
						 $scope.patientInformation.flagResult,
						 function(flag, key) {
							 if (flag.markError == false
									 && flag.flagValue == true) {
								 $scope.patientCoverPageFlag = flag.flagName;
								 // console.log(flag.flagName);
								 return false;
							 }
						 });
			 }
			 /*---------get first active allergy -------------*/
			 function getFirstActiveAllergy() {
				 $scope.patientCoverPageAllergy = "";
				 // console.log($scope.patientInformation.Allergies);
				 angular
				 .forEach(
						 $scope.patientInformation.Allergies,
						 function(allergy, key) {
							 if (allergy.state == 'active') {
								 $scope.patientCoverPageAllergy = allergy.allergyName;
								 // console.log(allergy.allergyName);
								 return false;
							 }
						 });
			 }

			 $scope.dynamicPopover = {
					 content : 'Hello, World! faryfyu fdtugi fi guu gj fcjgg vuh vu gvkh guhi Hello, World! faryfyu fdtugi fi guu gj fcjgg vuh vu gvkh guhi Hello, World! faryfyu fdtugi fi guu gj fcjgg vuh vu gvkh guhi Hello, World! faryfyu fdtugi fi guu gj fcjgg vuh vu gvkh guhi',
			 };
			 $scope.scrollbarConfig = {
					 theme : 'dark',
					 scrollInertia : 500
			 }

			 /*
			  * ===================== Complaint/Problems
			  * =======================
			  */

			 $scope.doctorId = $cookies.get("doctorId");
			 resetProblem();
			 $scope.patientComplaint = {};

			 function resetProblem() {
				 $scope.patientComplaint = angular.copy({
					 "doctorId" : $scope.doctorId,
					 "doctorName" : $scope.doctorName,
					 "duration" : "day",
					 "severity" : "Unknown",
					 "status" : "active",
					 "type" : "",
					 "description" : "",
					 "icdCode" : "",
					 "date" : new Date(),
					 "comments" : "",
					 "visitId" : "",
				 });
			 }
			 ;

			 /*
			  * $scope.patientComplaint.duration = "day";
			  * $scope.patientComplaint.severity = "Chronic";
			  * $scope.patientComplaint.status = "active";
			  * $scope.patientComplaint.type = "primary";
			  */

			 $scope.example13model = [];
			 $scope.example13data = [ {
				 id : 1,
				 label : "David"
			 }, {
				 id : 2,
				 label : "Jhon"
			 }, {
				 id : 3,
				 label : "Lisa"
			 }, {
				 id : 4,
				 label : "Nicole"
			 }, {
				 id : 5,
				 label : "Danny"
			 } ];

			 $scope.example13settings = {
					 smartButtonMaxItems : 3,
					 enableSearch : true,
					 smartButtonTextConverter : function(itemText,
							 originalItem) {
						 if (itemText === 'Jhon') {
							 return 'Jhonny!';
						 }

						 return itemText;
					 }
			 };

			 // **********************************ALERT**********************************//*
			 $scope.addAlert = function() {
				 alert();
				 $scope.alerts.push({
					 msg : 'Another alert!'
				 });
			 };

			 $scope.closeAlert = function(index) {
				 $scope.alerts.splice(index, 1);
			 };

			 // **********************************DATEPICKER**********************************//*
			 $scope.today = function() {
				 $scope.dt = new Date();
			 };

			 $scope.open1 = function() {
				 $scope.popup1.opened = true;
			 };

			 $scope.popup1 = {
					 opened : false
			 };

			 // -----Date can select todays and previous only
			 $scope.dateOptions = {
					 maxDate : new Date(),
					 startingDay : 1
			 };

			 $scope.patientComplaint = angular.copy({
				 "doctorId" : $scope.doctorId,
				 "duration" : "day",
				 "severity" : "Unknown",
				 "status" : "active",
				 "type" : "",
				 "description" : "",
				 "icdCode" : "",
				 "date" : new Date(),
				 "doctorName" : $scope.doctorName,
				 "comments" : "",
				 "visitId" : "",
			 });
			 $scope.resetCompaint = function() {
				 $scope.patientComplaint = angular
				 .copy({
					 "doctorId" : $scope.doctorId,
					 "duration" : "day",
					 "severity" : "Unknown",
					 "status" : "active",
					 "type" : "",
					 "description" : "",
					 "icdCode" : "",
					 "date" : new Date(),
					 "doctorName" : $scope.doctorName,
					 "comments" : "",
					 "visitId" : $rootScope.patientInfo.visitRecords[0]._id,
				 });
				 $scope.dt = new Date();
				 // $scope.comments = "";
			 }

			 $scope.setComplaint = function(icdCode, description) {
				 // console.log(icdCode +"/"+description);
				 $scope.icdCode = icdCode;
				 $scope.patientComplaint.description = description;
				 $scope.patientComplaint.icdCode = icdCode;
				 // $scope.patientComplaint.date = new
				 // Date().getTime();
				 $scope.patientComplaint.doctorName = $rootScope.patientInfo.visitRecords[0].careProvider;
				 // getPatientComplaintList();
			 }

			 $scope.removeDay = function() {
				 var datepicker = Date.parse($scope.dt);
				 if (!isNaN(datepicker))
					 $scope.patientComplaint.duration = "";
				 else
					 $scope.patientComplaint.duration = "day";
			 }

			 $scope.saveComplaint = function() {
				 $scope.$broadcast('show-errors-check-validity');
				 // ngModel.$setValidity('valid', true);
				 // $scope.problemListForm.dt.$setValidity("ng-valid-date",
				 // true);
				 // console.log("saveComplaint"+$scope.problemListForm.$valid);
				 // console.log("duaration="+$scope.patientComplaint.duration);
				 if ($scope.problemListForm.$valid) {
					 var complaintDate = angular
					 .element(document
							 .getElementById("problemDate"));
					 var datepicker = Date.parse($scope.dt);

					 var txtDate = complaintDate.val();
					 // console.log("txtDate ==>" + txtDate);
					 if (isNaN(datepicker)) {
						 // console.log('This is not date');
						 var duration = $scope.patientComplaint.duration;
						 if (duration == 'day') {
							 var newDate = new Date();
							 newDate.setDate(newDate.getDate()
									 - txtDate);
							 $scope.patientComplaint.date = newDate
							 .getTime();
							 // console.log("day="+
							 // $scope.patientComplaint.date);
							 // console.log(newDate);
						 } else if (duration == 'week') {
							 var daysOfWeek = txtDate * 7;
							 var newDate = new Date();
							 newDate.setDate(newDate.getDate()
									 - daysOfWeek);
							 $scope.patientComplaint.date = newDate
							 .getTime();
							 // console.log("week="+
							 // $scope.patientComplaint.date);
							 // console.log(newDate);
						 } else if (duration == 'month') {
							 var newDate = new Date();
							 newDate.setMonth(newDate.getMonth()
									 - txtDate);
							 $scope.patientComplaint.date = newDate
							 .getTime();
							 // console.log("month="+
							 // $scope.patientComplaint.date);
							 // console.log(newDate);
						 } else if (duration == "year") {
							 var newDate = new Date();
							 newDate.setFullYear(newDate
									 .getFullYear()
									 - txtDate);
							 $scope.patientComplaint.date = newDate
							 .getTime();
							 // console.log("year="+
							 // $scope.patientComplaint.date);
							 // console.log(newDate);
						 }
					 } else {
						 // console.log('This is date object');
						 var d = new Date($scope.dt);
						 // console.log(d);
						 // console.log(d.getTime());
						 $scope.patientComplaint.date = d
						 .getTime();
					 }
					 // console.log("finnaly="+
					 // $scope.patientComplaint.date);

					 // $scope.patientComplaint.duration =
					 // $scope.dt != undefined ? $scope.dt :
					 // $scope.patientComplaint.duration;
					 // console.log($scope.patientComplaint);
					 var visitId = $rootScope.patientInfo.visitRecords[0]._id;
					 var patientId = $rootScope.patientInfo._id;
					 $scope.patientComplaint.doctorName = $rootScope.patientInfo.visitRecords[0].careProvider;
					 $scope.patientComplaint.visitId = $rootScope.patientInfo.visitRecords[0]._id;
					 // console.log("icd="+ $scope.icdCode);
					 // $scope.patientComplaint.icdCode =
					 // $scope.icdCode;
					 // console.log($scope.patientComplaint);
					 pateintComplaintService
					 .saveComplaint(
							 $scope.patientComplaint,
							 patientId, visitId)
							 .then(
									 function(data) {
										 $scope
										 .$broadcast('show-errors-reset');
										 getPatientComplaintList();
										 if ($scope.patientComplaint.status == 'active') {
											 getActiveComplaint();
										 }
										 resetProblem();
									 });
					 $scope.searchProblem = "";
				 }
			 }

			 /*
			  * Get Problem List
			  */
			 function getPatientProblemList() {
				 pateintComplaintService
				 .getPatientProblemList()
				 .then(
						 function(data) {
							 $scope.getPatientProblemList = data;
						 });
			 }

			 // get active complaint
			 /*
			  * $scope.getActiveComplaint = function(){
			  * pateintComplaintService.getActiveComplaint($scope.patientId).then(function(data){
			  * $scope.activeComplaintList = data; }); }
			  */

			 function getActiveComplaint() {
				 pateintComplaintService.getActiveComplaint(
						 $scope.patientId).then(function(data) {
							 $scope.activeComplaintList = data;
						 });
			 }

			 $scope.addComplaintToError = function(complaintId,
					 status) {
				 var param = {
						 "doctorId" : $scope.doctorId,
						 "status" : status
				 }
				 var patientId = $rootScope.patientInfo._id;
				 pateintComplaintService.addComplaintToError(
						 patientId, complaintId, param).then(
								 function(data) {
									 getPatientComplaintList();
									 getActiveComplaint();
								 });
			 }

			 $scope.changeStatus = function() {
				 if ($scope.status) {
					 $scope.patientComplaint.status = "active";
				 } else {
					 $scope.patientComplaint.status = "inactive";
				 }
			 }

			 $scope.searchPreferredProblemList = function(val) {
				 // if(val.length >= 2){
				 var problemList = [];
				 return $http.get(
						 'http://35.154.76.183:5100/icdCodeSearch/'
						 + val, {}).then(function(res) {
							 angular.forEach(res.data, function(item) {
								 var obj = {
										 id : '',
										 code : '',
										 desc : ''
								 };
								 obj.id = item._id;
								 obj.code = item.CODE;
								 obj.desc = item.SHORT_Discription;
								 problemList.push(obj);
							 });
							 // console.log(problemList);
							 return problemList;
						 });
				 // };
			 }

			 /*
			  * autocompkte on selected
			  */
			 $scope.on_problem_selected = function($item,
					 $model, $label) {
				 $scope.patientComplaint.description = $item.desc;
				 $scope.patientComplaint.icdCode = $item.code;
				 $scope.patientComplaint.date = new Date()
				 .getTime();
				 $scope.patientComplaint.doctorName = $rootScope.patientInfo.visitRecords[0].careProvider;
			 }
			 function getPatientComplaintList() {
				 var patientId = $rootScope.patientInfo._id;
				 $scope.patientComplaint.date = new Date()
				 .getTime();
				 $scope.patientComplaint.doctorName = $scope.doctorName;
				 pateintComplaintService
				 .getPatientComplaintList(patientId)
				 .then(
						 function(data) {
							 $scope.getPatientComplaintList = data;
						 });
			 }

			 /**
			  * ************************************* EXPAND
			  * COLLAPSE PROBLEM LIST **********************
			  */
			 $scope.oneAtATime = true;

			 $scope.status = {
					 isCustomHeaderOpen : false,
					 isFirstOpen : true,
					 isFirstDisabled : false
			 };

			 /*
			  * self.toggleActivation = function() {
			  * 
			  * if ( !self.activated ) self.modes = [ ]; if (
			  * self.activated ) j = counter = 0; };
			  */

			 /*
			  * $scope.data = { switch6: true };
			  */
			 $scope.message = 'Active';
			 $scope.status = true;
			 $scope.onChange = function(state) {
				 if ($scope.status) {
					 $scope.message = 'Active';
					 $scope.patientComplaint.status = "active";
				 } else {
					 $scope.message = 'Inactive';
					 $scope.patientComplaint.status = "inactive";
				 }

			 };

			 $scope.scrollbarConfig = {
					 theme : 'dark',
					 scrollInertia : 500
			 }

			 /*
			  * ***********************************************
			  * DATE TIME PICKER
			  * *************************************
			  */
			 $scope.dateTimeNow = function() {
				 $scope.date = new Date();
			 };
			 $scope.dateTimeNow();

			 $scope.toggleMinDate = function() {
				 var minDate = new Date();
				 var maxDate = new Date();
				 // set to yesterday
				 minDate.setDate(minDate.getDate() - 1);
				 maxDate.setDate(maxDate.getDate() + 3);
				 $scope.dateOptions.minDate = $scope.dateOptions.minDate ? null
						 : minDate;
				 // $scope.dateOptions.maxDate =
				 // $scope.dateOptions.maxDate ? null : maxDate;
			 };

			 $scope.dateOptions = {
					 showWeeks : false,
					 startingDay : 0
			 };

			 $scope.toggleMinDate();

			 // Disable weekend selection
			 $scope.disabled = function(calendarDate, mode) {
				 return mode === 'day'
					 && (calendarDate.getDay() === 0 || calendarDate
							 .getDay() === 6);
			 };

			 $scope.open = function($event, opened) {
				 $event.preventDefault();
				 $event.stopPropagation();
				 $scope.dateOpened = true;
			 };

			 $scope.dateOpened = false;
			 $scope.hourStep = 1;
			 $scope.format = "dd-MMM-yyyy";
			 $scope.minuteStep = 15;
			 // add min-time="minTime" to datetimepicker to use
			 // this value
			 $scope.minTime = new Date(0, 0, 0, Math.max(1,
					 $scope.date.getHours() - 2), 0, 0, 0);

			 $scope.timeOptions = {
					 hourStep : [ 1, 2, 3 ],
					 minuteStep : [ 1, 5, 10, 15, 25, 30 ]
			 };

			 $scope.showMeridian = true;
			 $scope.timeToggleMode = function() {
				 $scope.showMeridian = !$scope.showMeridian;
			 };

			 $scope.$watch("date", function(date) {
				 // read date value
			 }, true);

			 $scope.resetHours = function() {
				 $scope.date.setHours(1);
			 };

		 } ]);
/* ===================== End Complaint/Problems ======================= */

homePageApp.directive('popoverClose', function($timeout) {
	return {
		scope : {
			excludeClass : '@'
		},
		link : function(scope, element, attrs) {
			var trigger = document.getElementsByClassName('trigger');

			function closeTrigger(i) {
				$timeout(function() {
					angular.element(trigger[0]).triggerHandler('click')
					.removeClass('trigger');
				});
			}

			element.on('click', function(event) {
				var etarget = angular.element(event.target);
				var tlength = trigger.length;
				if (!etarget.hasClass('trigger')
						&& !etarget.hasClass(scope.excludeClass)) {
					for (var i = 0; i < tlength; i++) {
						closeTrigger(i)
					}
				}
			});
		}
	};
});
homePageApp.directive('popoverElem', function() {
	return {
		link : function(scope, element, attrs) {
			element.on('click', function() {
				element.addClass('trigger');
			});
		}
	};
});
