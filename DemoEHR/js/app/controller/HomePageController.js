/**
 * Angular Homepage Controller
 */
/*var homePageApp = angular.module('homePageApp',['ngCookies','ngAnimate', 'ngSanitize', 'ui.bootstrap','angularjs-dropdown-multiselect','ngMaterial','ngScrollbars','rzModule', 'nvd3']).run(['$rootScope','VitalReviewService','$cookies','pateintComplaintService','$timeout', function ($rootScope,VitalReviewService,$cookies,pateintComplaintService,$timeout) {
	$rootScope.patientInfoMethod = VitalReviewService.getPatientByFilter($cookies.get('doctorId'),'mrn',$cookies.get('patientMrn')).then(function(data) {
		$rootScope.patientInfo = data;
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
	
}]);
*/
ehrApp.config(function (ScrollBarsProvider) {
    // scrollbar defaults
	ScrollBarsProvider.defaults = {
			autoHideScrollbar: false,
			scrollInertia: 0,
			axis: 'yx',
			advanced: {
				updateOnContentResize: true
			},
			scrollButtons: {
				scrollAmount: 'auto', // scroll amount when button pressed
				enable: true // enable scrolling buttons by default
			}
		};
});

ehrApp.factory('sessionInjector', ['$rootScope',function($rootScope) {  
    var sessionInjector = {
        request: function(config) {
          	
        	if(config.url != BASE_URL + ROOT_URL + "/login"){
        		config.headers['x-access-token'] = $rootScope.token;
        	}
            return config;
        }
    };
    return sessionInjector;
}]);

ehrApp.config(['$httpProvider', function($httpProvider) { 
    $httpProvider.interceptors.push('sessionInjector');
}]);

ehrApp.controller("HomePageController",['$scope','$rootScope','VitalReviewService','$window','CommonDateUtils','$cookies','pateintComplaintService',
                                             'commonCrudService','allergyService','labResultService','postingService','intakeOutputService','POCService','fileUpload',
                                             'FlagService','$mdSidenav', '$mdUtil','$http','MedicationService','PatientInfoService','pateintComplaintService',
                                             'OrderService','setGetService','templateService','$sce','$compile','Authorization',
                                    function($scope,$rootScope,VitalReviewService,$window,CommonDateUtils,$cookies,pateintComplaintService,commonCrudService,
                                    		allergyService,labResultService,postingService,intakeOutputService,POCService,fileUpload,FlagService,$mdSidenav, 
                                    		$mdUtil,$http,MedicationService,PatientInfoService,pateintComplaintService,OrderService,setGetService,templateService,$sce,$compile,Authorization)
                                    		{
	
	//var patientDetails = setGetService.getValue();
	/*$rootScope.patientInfoMethod = VitalReviewService.getPatientByFilter(patientDetails.doctorId,'mrn',patientDetails.patientMRN).then(function(data) {
		$rootScope.patientInfo = data;
	});*/
	$scope.setLoader = function(value){
		$rootScope.loading = value;
	}
	$scope.complaintLoading = true; 	
	$scope.postingLoading = true;
	$scope.vitalLoading = true;
	$scope.labLoading = true;
	$scope.medicationLoading = true;
		
	$scope.leftHeaderList = [];
	$scope.vitalList = [];
	$scope.vitalObj = [];
	$scope.patientDetails = setGetService.getValue();
	$scope.patientId = $scope.patientDetails.patientId;
	$scope.patientMrn = $scope.patientDetails.patientMRN;
	$scope.doctorId =  $scope.patientDetails.doctorId;
	$scope.doctorName = $scope.patientDetails.doctorName;
	$scope.visitId = $scope.patientDetails.visitId;
	$scope.gender = $scope.patientDetails.gender;
	
	//Cover Sheet Complaint List
	/*pateintComplaintService.getPatientComplaintList($scope.patientId).then(function(data){
		$scope.getPatientComplaintList = data;
	});*/
	
	//Cover Page Lab Result List
	labResultService.getLabResult($scope.patientId, $scope.patientMrn).then(function(data){
		$scope.getCoverSheetLabResultList = data;
		$scope.labLoading = false;
	});
	
	//Cover Sheet Medication List
	getActiveMedicationsList();
	
	//Cover Sheet posting list
	getLastPostingsList();
	
	//Cover Sheet Complaints
	getActiveComplaint();
	
	//Get Patient Information
	getPatientInformation();
	
	//Cover Sheet Vitlas
	 getCoversheetVitalList();
	
	$scope.getLabResults = function(){
		$scope.labReviewLoading = true;
		angular.element(document.getElementById("lab_tab_row")).show();
		angular.element(document.getElementById("lab_tab")).removeClass('active').addClass('active');
		angular.element(document.getElementById("lab_graph")).removeClass('active');
		angular.element(document.getElementById("lab_graph_row")).hide();
		labResultService.getLabResult($scope.patientId, $scope.patientMrn).then(function(data){
			$scope.getLabResultList = data;
			$scope.labReviewLoading = false;
		});
	}
	
	 $scope.decodeFunction = function(patient){
		 return decodeURIComponent(patient);
	 }
	 
	/* 
	* get vital review list 
	*/
		$scope.getVitalList = function(){
			$scope.vitalReviewLoader = true;
			angular.element(document.getElementById("vital_tab_row")).show();
			angular.element(document.getElementById("vital_tab")).removeClass('active').addClass('active');
			angular.element(document.getElementById("vital_graph")).removeClass('active');
			angular.element(document.getElementById("chart_div")).hide();
			
			VitalReviewService.getVitalReview($scope.patientId).then(function(data) {
				console.log("vitals list");
				$scope.vitalReviewList = data;
				generateVitalReviewTable();
				google.charts.load('current', {packages: ['corechart', 'line']});
				google.charts.setOnLoadCallback(drawTrendlines);
				
				//$scope.getVitalGraph();
				$scope.vitalReviewLoader = false;
			})
		};
		
		$('#vital_graph').click(function(){
        	angular.element(document.getElementById("vital_tab_row")).show();
  			angular.element(document.getElementById("vital_tab")).removeClass('active');
  			angular.element(document.getElementById("vital_graph")).removeClass('active').addClass('active');
  			angular.element(document.getElementById("vital_tab_row")).hide();
  			angular.element(document.getElementById("chart_div")).show();
  			angular.element(document.getElementById("searchBox")).hide();
  			
  			VitalReviewService.getVitalReview($scope.patientId).then(function(data){
				$scope.vitalReviewList = data;
				console.log("list of vitals", data);
				//generateVitalReviewTable();
				google.charts.load('current', {packages: ['corechart', 'line']});
				google.charts.setOnLoadCallback(drawTrendlines);
				
				//$scope.getVitalGraph();
				//$scope.vitalReviewLoader = false;
			})
         })
         
         function ListCheck(vitalReviewList){
			var checkList = [];
			
			
		}
         
	
         function graphVitalList(){
       	 var array = $scope.vitalReviewList;
       	 console.log("array", array);
       	 var graphList = [[{label: 'date', type: 'date'},
//       	                      {label: 'Pulse Oximeter', type: 'date'},
//       	                      {label: 'Temperature', type: 'date'},
//       	                      {label: 'Respiration', type: 'date'},
//       	                      {label: 'Height', type: 'date'},
//       	                      {label: 'Diastolic Blood Pressure', type: 'date'},
//       	                      {label: 'Weight', type: 'date'}
       	                   ]
       	                   ];
       	 for(var i = 0; i < array.length; i++){
       		 graphList.push([
             		array[i].date
             	])
             }
       	 console.log("date list ", graphList);
       	 return graphList;
        }
         
		function drawTrendlines() {
			var graphData = graphVitalList();
		      var data = new google.visualization.DataTable();
		      data.addColumn('date', 'X');
//		      data.addColumn('number', 'Pulse Oximeter');
//		      data.addColumn('number', 'Temperature');
//		      data.addColumn('number', 'Respiration');
//		      data.addColumn('number', 'Height');
//		      data.addColumn('number', 'Diastolic Blood Pressure');
//		      data.addColumn('number', 'Weight');

		      data.addRows([
		                    graphData
//		        [new Date(1484480961000), 40 , 35, 33, 70, 30], 
//		        [new Date(1484475028000), 23 , 40, 24, 56, 45], 
//		        [new Date(1484734228000), 0 , 0, 40, 36, 62]
		      ]);

		      var options = {
		        hAxis: {
		          title: 'Time',
		          format:'MMM d, y'
		        },
		        vAxis: {
		          title: 'Value'
		        },
		        
		        colors: ['#AB0D06', '#E859E5', '#23776F', '#CAE859', '#598AE8'],
		        trendlines: {
		          0: {type: 'exponential', color: '#333', opacity: 1},
		          1: {type: 'linear', color: '#111', opacity: .3}
		        }
		      };

		      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
		      chart.draw(data, options);
		    }
		
		
	/*
	 * get vital review list by date range
	 */
		 $scope.getVitalReviewDateRange = function(vitalDateRange){
			 	$scope.vitalReviewLoader = true;
        	  	var values = vitalDateRange.split(" - ");
        	    var lowerArr =values[0].split("-");
        	    var lowerDate = lowerArr[1] + '-' + lowerArr[0] + '-' + lowerArr[2];
        	    
        	    var upperArr = values[1].split("-");
        	    var upperDate = upperArr[1] + '-' + upperArr[0] + '-' + upperArr[2];
        	    
        	    var upperFinalDate = new Date(upperArr[2], (parseInt(upperArr[1]) - 1), upperArr[0],23,59,59);
        	    
        	    VitalReviewService.getVitalReviewDateRange($scope.patientId, upperFinalDate.getTime(), new Date(lowerDate).getTime()).then(function(data){
        	    		$scope.vitalReviewList = data;
        	    		generateVitalReviewTable();

        	    		$scope.getVitalGraph();
        	    		$scope.vitalReviewLoader = false;
        	    	//}
        	    });  
          }
		
	/*
	 * get  todays vital review list
	 */
	
		 $scope.getTodaysVitalReview = function(){
			 $scope.vitalReviewLoader = true;
			 var currentDate = new Date();  
			 var date = currentDate.getDate();
			 var month = currentDate.getMonth();
			 var year = currentDate.getFullYear();
			 var curDate = new Date(year,month,date);
     	     VitalReviewService.getVitalReviewDateRange($scope.patientId, new Date().getTime(), curDate.getTime()).then(function(data){
     	    		$scope.vitalReviewList = data;
     	    		generateVitalReviewTable();

     	    		$scope.getVitalGraph();
     	    		$scope.vitalReviewLoader = false;
     	    	//}
     	    });
       }
		 
		 
	/*
	 * get Last 7 days vital review list
	 */	

		 $scope.getLastSevenDaysVitalReview = function(){
			 $scope.vitalReviewLoader = true;
			 var currentDate = new Date();  
			 var date = currentDate.getDate();
			 var month = currentDate.getMonth();
			 var year = currentDate.getFullYear();
			 var pastSevenDay = new Date(year,month,date);
			 pastSevenDay.setDate(pastSevenDay.getDate()- 7);
     	    VitalReviewService.getVitalReviewDateRange($scope.patientId,  currentDate.getTime() ,pastSevenDay.getTime()).then(function(data){
     	    		$scope.vitalReviewList = data;
     	    		generateVitalReviewTable();
     	    		$scope.getVitalGraph();

     	    		$scope.vitalReviewLoader = false;
     	    });
       }
		 
    /*
     *  $scope.getVitalGraph
     */
		 
	 $scope.getVitalGraph = function(){
		  $scope.options = {
		            chart: {
		                type: 'lineChart',
		                height: 400,
		                margin : {
		                    top: 20,
		                    right: 20,
		                    bottom: 40,
		                    left: 55
		                },
		                x: function(d){
		                	return d.x;
		                	},
		                y: function(d){
		                	return d.y;
		                	},
		                useInteractiveGuideline: true,
		                dispatch: {
		                    stateChange: function(e){ },
		                    changeState: function(e){ },
		                    tooltipShow: function(e){ },
		                    tooltipHide: function(e){ }
		                },
		                xAxis: {
		                    axisLabel: 'Time',
		                    tickFormat: function(d){
		                    	return getDateTime(d);
		                    },
		                    rotateLabels: 0
		                },
		                yAxis: {
		                    axisLabel: 'Value',
		                    tickFormat: function(d){
		                        return d3.format(',.1f')(d);
		                    },
		                    axisLabelDistance: -10
		                },
		                callback: function(chart){
		                }
		            },
		            title: {
		                enable: true,
		                text: 'Vital Graph'
		            },
		            subtitle: {
		                enable: true,
		                text: ' ',
		                css: {
		                    'text-align': 'center',
		                    'margin': '10px 13px 0px 7px'
		                }
		            },
		            caption: {
		                enable: true,
		                html: ' ',
		                css: {
		                    'text-align': 'justify',
		                    'margin': '10px 13px 0px 7px'
		                }
		            }
		        };

		  function getRandomColor() {
			    var letters = '0123456789ABCDEF';
			    var color = '#';
			    for (var i = 0; i < 6; i++ ) {
			        color += letters[Math.floor(Math.random() * 16)];
			    }
			    return color;
			}
		  
		  function getDateTime(dateInt){
			  var time = DisplayCurrentTime(dateInt);
			  var date = new Date(dateInt);
			  return date.getDate()+"-"+parseInt(date.getMonth() + 1)+"-"+ date.getFullYear()+" "+time;
		  }
		  
		  function DisplayCurrentTime(dateInt) {
		        var date = new Date(dateInt);
		        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
		        var am_pm = date.getHours() >= 12 ? "PM" : "AM";
		        hours = hours < 10 ? "0" + hours : hours;
		        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		        time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
		        return hours + ":" + minutes + " " + am_pm;
		    };
		   
		 $scope.data = generateGraph();
		 function generateGraph(){
		 		var parentArr = new Array();
		 		angular.forEach($scope.leftHeaderList, function(header, key) {
		 			var tempArray = new Array();
		 			tempArray.push(header);
		 			parentArr.push(tempArray);
		 		});
		 		angular.forEach($scope.vitalReviewList, function(value, key) {
		 			angular.forEach(value.vitals, function(value1, key1) {
		 				var index = $scope.leftHeaderList.indexOf(value1.key);
		 				var obj = {x: '', y: ''};
		 				obj.x= value.date;
		 				obj.y = parseInt(value1.value);
		 				parentArr[index].push(obj);
		 			})
		 		});
		 		
		 	 var colorArr = ["#ff7f0e","#2ca02c"];
	         var objArr = new Array();
	         		angular.forEach(parentArr, function(value, key) {
	         			var title = parentArr[key][0];
	         			parentArr[key].shift();
	         			var temp = {
		                     values: parentArr[key],      //values - represents the array of {x,y} data points
		                     key: title, //key  - the name of the series.
		                     color: getRandomColor()  //color - optional: choose your own line color.
		                     //strokeWidth: 2
		                     //classed: 'dashed'
		                 }
	         			objArr.push(temp);
	         		});
               return objArr;
		 } 
	 }
	 //------------- End of Graph---------------//

	/* 
	 * Add Row in vital table 
	 */
	$scope.AddData = function(){
		$scope.$broadcast('show-errors-check-validity');
		if($scope.vitalform.$valid){
			$scope.$broadcast('show-errors-reset');
			$scope.vitalList.push($scope.vitalObj);
			 $scope.initVitals();
		}
	};
	
	/*
	 * Remove Row in vital table
	 */
	$scope.removeData = function(index) {
		if( $window.confirm('Are you absolutely sure you want to delete?')){
			$scope.vitalList.splice(index, 1);
		}
	};
	/*
	 * function to set text boxes.
	 */
	$scope.setVital = function(vitalName, min, max, unit, range, key) {
		$scope.vitalObj.vitalName = vitalName;
		$scope.vitalObj.min = min;
		$scope.vitalObj.max = max;
		$scope.vitalObj.unit = unit;
		$scope.vitalObj.range = range;
		$scope.vitalObj.key = key;
	}
	 $scope.initVitals = function () {
		$scope.vitalObj = angular.copy({
				"vitalName": "",
				"min"      : "",
				"max"      : "",
				"unit"     : "",
				"range"    : "",
				"key"      : ""
			});
		}
	 $scope.initVitals();
	 
	 //save vitals
	 $scope.saveVitlas = function(){
		 $scope.$broadcast('show-errors-check-validity');
				if($scope.vitalList != ''){
					$scope.vitalAddLoader = true;
					var currDt = new Date();
					var datetext = currDt.toTimeString();
					var vitalObj = {
							"date": currDt.getTime(),
							"timeStamp":CommonDateUtils.getTime(),
							"visitId":$scope.visitId,
							"doctorId":$scope.doctorId,
							"vitals":$scope.vitalList
					}
					VitalReviewService.saveVitals(vitalObj, $scope.doctorId, $scope.patientId).then(function(data){
						$scope.vitalList = [];
						$scope.$broadcast('show-errors-reset');
						getCoversheetVitalList();
						$scope.vitalAddLoader = false;
					});
					
				}
			
	 }
	 
	 //get coversheet vitals
	  function getCoversheetVitalList(){
	   VitalReviewService.getCoversheetVitalList($scope.patientId, $scope.visitId).then(function(data){
	   $scope.coversheetVitalList = data; 
	   $scope.vitalLoading = false;
	   });
	  }
	 
	 $scope.decodeFunction = function(patient){
		 return decodeURIComponent(patient);
	 }
	 
	 function getParamValuesFromUrl(){
			  // This function is anonymous, is executed immediately and 
			  // the return value is assigned to QueryString!
			  var query_string = {};
			  var query = window.location.search.substring(1);
			  var vars = query.split("&");
			  for (var i=0;i<vars.length;i++) {
			    var pair = vars[i].split("=");
			        // If first entry with this name
			    if (typeof query_string[pair[0]] === "undefined") {
			      query_string[pair[0]] = decodeURIComponent(pair[1]);
			        // If second entry with this name
			    } else if (typeof query_string[pair[0]] === "string") {
			      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
			      query_string[pair[0]] = arr;
			        // If third or later entry with this name
			    } else {
			      query_string[pair[0]].push(decodeURIComponent(pair[1]));
			    }
			  }
			  //location.href=location.href.replace(query, "");
			  //$rootScope.patientInfo = 
			 //return JSON.parse($scope.decodeFunction(query_string.pData));
			  return JSON.parse(query_string.pData);
			 // return query_string.pData;
	 }
	 
	 /*
	  * Generate vital review table
	  */
	 function generateVitalReviewTable(){
		 var tb = angular.element( document.querySelector( '#myTable' ) );
		 tb.empty();
		 var max = 0;
			var index = 0;
			var vital ={
					vitalName: $scope.vitalName,
					value: $scope.value,
					unit: $scope.unit,
					range: $scope.range,
			}
			angular.forEach($scope.vitalReviewList, function(value, key) {
				 angular.forEach(value.vitals, function(value, key) {
						if ($scope.leftHeaderList.indexOf(value.key) == -1) {
							$scope.leftHeaderList.push(value.key);
						}
					});
				});
					
			 var tableStr = "";
			 var i = 0;
			 	tableStr += "<thead>"
			 		+"<tr class=\"border-bottom\"><th class=\"text-center\" style = \"background-color: #f5fffd;color: #39ab94; padding-right:15px;padding-top: 5px;padding-bottom: 5px;\">&nbsp;<br><br></th>";
			 	angular.forEach($scope.leftHeaderList, function(topHeading, key) {
			 		tableStr += "<th class=\"text-center\" style=\"background-color: #f5fffd; color: #39ab94; padding:4px;\">"+topHeading+"</th>";
				});
			 	tableStr += "</tr></thead>";
			 	
			 	tableStr += "<tbody>"
			 	angular.forEach($scope.vitalReviewList, function(value, key) {
			 		var jsondate = "/Date("+value.date+")/";
			 		var jsDate = new Date(parseInt(jsondate.substr(6)));
			 		var vitalDate = getNewDate(jsDate);
				 tableStr   += "<tr class=\"border-bottom\" >"
				 	    	+"<td style = \"padding-right:15px;padding-top: 5px;padding-bottom: 5px;\"> <div class=\"font-weight-date\">"+ vitalDate+"</div><div class=\"font-weight-date\">"+value.timeStamp+"</div></td>" 
				 	    		angular.forEach($scope.leftHeaderList, function(header, key) {
				 	    			angular.forEach(value.vitals, function(value1, key) {
				 				 if(header == value1.key){
				 					 if( $scope.vitalRangeCheck(value1.value, value1.min, value1.max))
				 						 tableStr += "<td class=\"text-center red-font-color\" style=\"padding:4px;\" >"+ value1.value +" "+value1.unit+"</td>";
				 					 else
				 						 tableStr += "<td class=\"text-center\" style=\"padding:4px;\">"+ value1.value +" "+value1.unit+"</td>";
				 					 i = 1;
				 					 return;
				 				 }
				 			 });
				 	    	if(i==0)
				 	    		 tableStr += "<td class=\"text-center\">-</td>";
				 	    	else
				 	    		i=0;
							});
				
				 tableStr += "</tr>";
			 		//}
				});
			 	 tableStr += "</tbody>";
			 	
			 	//var tableWidth = $scope.vitalReviewList.length * 110 + 121;
			 	var myEl = angular.element( document.querySelector( '#myTable' ) );
			 	myEl.append(tableStr);
	 }
 
	 $scope.vitalRangeCheck = function(val, minVal,maxVal) {
		    var intVal = parseFloat(val);
		    var intMinVal = parseFloat(minVal);
		    var intMaxVal = parseFloat(maxVal);
		    if(intVal >= intMinVal || intVal <= intMaxVal) {
		        return false;
		    } else {
		        return true;
		    }
		}
	 
	 $scope.getLabOrders = function(){
		commonCrudService.getOrderByCategory($scope.patientId,"Lab Order",$rootScope.subCategoryValue).then(function(data) {
			$scope.getLabOrderList = data;
		});
	 }
	 
	 $scope.getImagingOrders = function () {
		 commonCrudService.getOrderByCategory($scope.patientId,"Imaging Order",$rootScope.subCategoryValue).then(function(data) {
			  $scope.getImagingOrderList = data;
		});
	}
	 
	 $scope.getIpPharmacyOrders = function(){
		 commonCrudService.getOrderByCategory($scope.patientId,"IP Pharmacy",$rootScope.subCategoryValue).then(function(data) {
		  $scope.getIpPharmacyOrderList = data;
		 });
	 }
	 
	 $scope.getIvPharmacyOrders = function() {
		 commonCrudService.getOrderByCategory($scope.patientId,"IV Pharmacy",$rootScope.subCategoryValue).then(function(data) {
			  $scope.getIvPharmacyOrderList = data;
			  });
	 }
	
	 $scope.getProcedureSurgicalOrders = function () {
		 commonCrudService.getOrderByCategory($scope.patientId,"Procedure/Surgical",$rootScope.subCategoryValue).then(function(data) {
			  $scope.getProcedureSurgicalOrderList = data;
			  });
	}
	 
	 $scope.getGeneralOrders = function () {
		 commonCrudService.getOrderByCategory($scope.patientId,"General",$rootScope.subCategoryValue).then(function(data) {
			  $scope.getGeneralOrderList = data;
			  });
	}

	 $scope.getConsultOrders = function () {
		 commonCrudService.getOrderByCategory($scope.patientId,"Consult",$rootScope.subCategoryValue).then(function(data) {
			  $scope.getConsultOrderList = data;
			  });
	}
	 $scope.getVitalOrders = function () {
		 commonCrudService.getOrderByCategory($scope.patientId,"Vital",$rootScope.subCategoryValue).then(function(data) {
			  $scope.getVitalOrderList = data;
			  });
	}
	 
	 $scope.getNursingOrders = function () {
		 commonCrudService.getOrderByCategory($scope.patientId,"Nursing",$rootScope.subCategoryValue).then(function(data) {
			  $scope.getNursingOrderList = data;
			  });
	}
	 
	 $scope.getOrderSetsOrders = function() {
		 commonCrudService.getOrderByCategory($scope.patientId,"OrderSets",$rootScope.subCategoryValue).then(function(data) {
			  $scope.getOrderSetsOrderList = data;
			  });
	}
	 
	 $scope.getPatientMovementOrders = function () {
		 commonCrudService.getOrderByCategory($scope.patientId,"Patient Movement","Admit").then(function(data) {
			  $scope.getPatientMovementOrderList = data;
			  });
	}
	 $scope.getBloodComponentOrders = function () {
		 commonCrudService.getOrderByCategory($scope.patientId,"BloodComponent",$rootScope.subCategoryValue).then(function(data) {
			  $scope.getBloodComponentOrderList = data;
			  });
	}
	
	 $scope.getDietOrders = function () {
		 commonCrudService.getOrderByCategory($scope.patientId,"Diet","Diet").then(function(data) {
				$scope.getDietOrderList = data;
				});
	}
	 
	 $scope.getPatientComplaints = function(){
			$scope.complaintReviewLoader = true;
			$scope.addComplaintLoader = true;
		 pateintComplaintService.getPatientComplaintList($scope.patientId).then(function(data){
				$scope.getPatientComplaintList = data;
				$scope.complaintReviewLoader = false;
				$scope.addComplaintLoader = false;
			});
	 }
	 
	 /*$scope.getPatientProblemList = function(){
			pateintComplaintService.getPatientProblemList().then(function(data){
				$scope.getPatientProblemList = data;
			});
		}*/
	 
	 $scope.getOpPharmacyOrders = function(){
			commonCrudService.getOrderByCategory($scope.patientId, "Op Pharmacy","Dosage").then(function(data) {
				$scope.getOpPharmacyOrderList = data;
				});
			}
	 
	 //======= Diet =========//
	 $scope.diet = function(){
		commonCrudService.getOrderByCategory($scope.patientId,"Diet","Diet").then(function(data) {
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
			$scope.getDietOrderList = data;
			});
		}
	 $scope.tubeFeeding = function(){
		$scope.subCategory = "Tube Feeding";
		commonCrudService.getOrderByCategory($scope.patientId,"Diet","Tube Feeding").then(function(data) {
			$scope.orderItems = angular.copy({
				"billingCode"           :"",
				"tubeFeedingProduct"    :"",
				"strength"              :"",
				"quantity"              :"",
				"amount"                :"",
				"specialInstructions"   :"",
				"cancelFutureTRAYPOrder":""
		})
		$scope.getDietOrderList = data;
		});
	}
	
	$scope.earlyLateTray = function(){
		$scope.subCategory = "Early/Late Tray";
		commonCrudService.getOrderByCategory($scope.patientId,"Diet","Early/Late Tray").then(function(data) {
			$scope.orderItems = angular.copy({
				"billingCode":"",
				"Meal":"",
				"startDate":"",
				"endDate":"",
				"dayOfWeek":{"Monday":false,"Tuesday":false,"Wednesday":false,"Thursday":false,"Friday":false,"Saturday":false,"Sunday":false}
			})	
		$scope.getDietOrderList = data;
		});
	}
	
	$scope.addtionalOrders = function(){
		$scope.subCategory = "Additional Orders";
		commonCrudService.getOrderByCategory($scope.patientId,"Diet","Additional Orders").then(function(data) {
			$scope.orderItems = angular.copy({
				"billingCode":"",
				"additionalOrder":""
			});
		$scope.getDietOrderList = data;
		});
	}
	 
	 //========Patient Movement ===========//
	$scope.admit = function(){
		$scope.subCategory = "Admit";
		commonCrudService.getOrderByCategory($scope.patientId,"Patient Movement","Admit").then(function(data) {
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
			$scope.getPatientMovementOrderList = data;
		});
	}
	
	$scope.transfer = function(){
		$scope.subCategory = "Transfer";
		commonCrudService.getOrderByCategory($scope.patientId,"Patient Movement","Transfer").then(function(data) {
			$scope.orderItems = angular.copy({
				"billingCode" :"",
				"wardName"    :"",
				"careProvider":"",
				"speciality"  :"",
				"startDate"   :"",
				"endDate"     :"",
				"description" :""
			});
			$scope.getPatientMovementOrderList = data;
		});
	}
	
	$scope.discharge = function(){
		$scope.subCategory = "Discharge";
		commonCrudService.getOrderByCategory($scope.patientId,"Patient Movement","Discharge").then(function(data) {
			$scope.orderItems = angular.copy({
				"billingCode"       :"",
				"Type"              :"",
				"dischargeDiagnosis":"",
				"description"       :""
			});
			$scope.getPatientMovementOrderList = data;
		});
	}
	 
	 
	 
	 //----------------------- allergy module ------------------------//
	//$scope.allergyObj = [];
	$scope.originatorListFlag = false;
	 $scope.alleryOriginatorModel = [{id: 1}];
     $scope.alleryOriginatorData = [
         {id: 1, label: "Dr. Smith"},
         {id: 2, label: "Dr Dinesh Raddy"},
         {id: 3, label: "Dr. fb"},
         {id: 4, label: "Dr gbf Raddy"}];
     
   
     $scope.alleryOriginatorSettings = {
         smartButtonMaxItems: 3,
          enableSearch: true,
         smartButtonTextConverter: function(itemText, originalItem) {
             if (itemText === 'Dr. Smith') {
             return 'Dr. Smith!';
             }
     
             return itemText;
         }
     };
	
     //-----Date can select todays and previous only
     $scope.dateOptions = {
	    maxDate: new Date(),
	    startingDay: 1
	  };
     
	 $scope.today = function() {
	   	    $scope.allergyObj.date = new Date();
	   	  };
	   	 
	   	
	   	  $scope.allergyOpen = function() {
	   	    $scope.allergyPopup.opened = true;
	   	  };

	   	  $scope.allergyPopup = {
	   	    opened: false
	   	  };
	 	
	 	
		$scope.setAllergiesVital = function(allergyName){
			$scope.allergyObj.allergyName = allergyName;
		}
		
		$scope.saveAllergy = function(){
			$scope.$broadcast('show-errors-check-validity');
			if($scope.allergyForm.$valid){
				$scope.allergyLoader = true;
				$scope.allergyObj.originationDate = new Date($scope.allergyObj.originationDate).getTime();
				$scope.allergyObj.doctorId = $scope.doctorId;
				$scope.allergyObj.visitId = $scope.visitId;
				allergyService.saveAllergy($scope.allergyObj,$scope.patientId).then(function(data){
					$scope.$broadcast('show-errors-reset');
					//$scope.reset();
					getAllergyList();
					getPatientInformation();
					if(data.data._status_Code === 200)
						$scope.reset();
					$scope.allergyLoader = false;
				});
				$scope.allergyName = "";
			}
			
		}
	
		$scope.allergyMarkAsError = function(allergyId, state){
			$scope.allergyLoader = true;
			var param = {
				  "doctorId" : $scope.doctorId,
				  "state": state,
				  "allergyId" : allergyId
				}
			allergyService.allergyMarkAsError(allergyId, $scope.patientId, param).then(function(data) {
				getAllergyList();
				getPatientInformation();
				$scope.allergyLoader = false;
			});
			
		}
		
		$scope.getAllergy = function(){
			$scope.allergyLoader = true;
			$scope.reset();
			allergyService.getAllergyList($scope.patientId).then(function(data) {
				$scope.getAllergyList = data;
				$scope.reset();
				$scope.allergyLoader = false;
			});
		}
		
		function getAllergyList(){
			$scope.reset();
				allergyService.getAllergyList($scope.patientId).then(function(data) {
					$scope.getAllergyList = data;
				});
			}
		
		$scope.reset = function() {
			//$scope.allergyObj = angular.copy({});
			$scope.allergyObj ={
					 "allergyName"    :"",
					 "date"           :new Date().getTime(),
					 "nature"         :"Allergy",
					 "observedHistory":"Historical",
					 "severity"       :"Moderate",
					 "originators"    :"Self",
					 "comments"       :"",
					 "markNKA"		  : true,
					 "symptoms"       :[],
					 "originationDate": new Date(),
					 "type"           :"Confirmed",
					 "doctorId"       : $scope.doctorId,
					 "visitId"        :$scope.visitId,
					 "state"          :"active"
					 
			 };
			$scope.allergyObj.type="Confirmed";
		};
		
		$scope.getDate = function(dateStr){
			return CommonDateUtils.convertJSONStringToDate(dateStr);
		}
		
		$scope.getDateTimeByDate = function(dateStr){
			   return CommonDateUtils.getDateTimeByDate(dateStr);
		}
		
		$scope.convertToIntAndGetDate = function(dateStr){
		    var dt = parseInt(dateStr);
		    return CommonDateUtils.convertJSONStringToDate(dt);
		}
		//$scope.reset();
		
		  $scope.searchAllergies = function(value){
			  var allergyList = [];
			  return $http.get(BASE_URL2+'/allergySearch/'+value, {
		      }).then(function(res){
		    	  if(res.data._status_Code === 200){  
			        angular.forEach(res.data.result, function(item){
			      	  var obj = {allergyId:'',allergyName:'', potentialReaction:'', remarks:'', type:''};
			          obj.allergyId = item._id;
			          obj.allergyName = item.Allergy_Name;
			          obj.potentialReaction = item.Potential_reaction;
			          obj.remarks = item.Remarks
			          obj.type = item.Type
			          allergyList.push(obj);
			        });
			        return allergyList;
		      }
		      },function() {
					$rootScope.showNotification(0,"",$rootScope.connectionError);
					//alert("error");
				});
		  }
		
		 $scope.on_allergy_selected = function($item, $model, $label){
			 $scope.allergyObj.allergyName = $item.allergyName;
		 }
		 
		 $scope.getOriginatorList = function(){
			 if(!$scope.originatorListFlag || $scope.originatorList == undefined){
				 allergyService.getOriginatorList().then(function(data){
					 $scope.originatorList = data;
					 $scope.originatorListFlag = true;
				 });
			 }
		 }
		//----------------- Posting -----------------------//
		//$scope.postingObj=[];
		 /*$scope.color = {
	                red: 57,
	                green: 171,
	                blue: 148
	             };*/
	             $scope.rating = 3;
	             //$scope.nonedrating = 3;
	             $scope.disabled = 70;

		//save Ed
		$scope.saveEdPosting = function(){
			$scope.$broadcast('show-errors-check-validity');
			if($scope.postingEdForm.$valid){
				$scope.$broadcast('show-errors-reset');
				$scope.addPostingLoader = true;
				$scope.postingEDObj.patientId = $scope.patientId;
				$scope.postingEDObj.doctorId = $scope.doctorId;
				$scope.postingEDObj.visitId = $scope.visitId;
				$scope.postingEDObj.date = new Date().getTime();
				$scope.postingEDObj.sliderValue = $scope.rating;
				
				postingService.saveEdPosting($scope.postingEDObj).then(function(data){
					getPostings();
					getLastPostingsList();
					$scope.resetFormValidation();

					if(data.data._status_Code === 200)
						$scope.resetPosting();
					
					$scope.addPostingLoader = false;
				});
			}
		}
		
		//save Non-ED
		$scope.saveNonEdPosting = function(){
			$scope.$broadcast('show-errors-check-validity');
			if($scope.postingNonEdForm.$valid){
				$scope.$broadcast('show-errors-reset');
				$scope.addPostingLoader = true;
				/*----- file upload start----*/
				var file = $scope.myFile;
	             //console.dir(file);
	             var filePath = "";
	             if(file != undefined){
		             var uploadUrl = "/fileUpload";
		             fileUpload.uploadFileToUrl(file, $scope.patientId).then(function(response){
		            	 if(response.data._status_Code === 200){
		            		 filePath = response.data.result.filePath;
		            		$scope.postingNonEdObj.patientId = $scope.patientId;
		     				$scope.postingNonEdObj.doctorId = $scope.doctorId;
		     				$scope.postingNonEdObj.visitId = $scope.visitId;
		     				$scope.postingNonEdObj.fileType = "Picture";
		     				$scope.postingNonEdObj.mediaFileURL = filePath;
		     				$scope.postingNonEdObj.sliderValue = $scope.rating;
		     				postingService.saveNonEdPosting($scope.postingNonEdObj).then(function(data){
		     					getPostings();
		     					getLastPostingsList();
		     					$scope.resetFormValidation();

		    					if(data.data._status_Code === 200)
		    						$scope.resetPosting();
		     				});
		            	 }
		            	 $scope.addPostingLoader = false;
		             });
	             }
	             /*----- file upload end----*/
	             else{
		             $scope.postingNonEdObj.patientId = $scope.patientId;
	  				$scope.postingNonEdObj.doctorId = $scope.doctorId;
	  				$scope.postingNonEdObj.visitId = $scope.visitId;
	  				$scope.postingNonEdObj.fileType = "Picture";
	  				$scope.postingNonEdObj.mediaFileURL = filePath;
	  				$scope.postingNonEdObj.sliderValue = $scope.rating;
	  				postingService.saveNonEdPosting($scope.postingNonEdObj).then(function(data){
	  					getPostings();
	  					getLastPostingsList();
	  					$scope.resetFormValidation();
	  					$scope.addPostingLoader = false;
	  					
	  					if(data.data._status_Code === 200)
    						$scope.resetPosting();
	  				});
	             }
			}
		}
		 function getPostings(){
			postingService.getPostingList($scope.patientId).then(function(data){
				$scope.getPostingList = data;
			});
		}
		 $scope.getPostings = function(){
			 $scope.postingReviewLoader = true;
			 $scope.addPostingLoader = true;
			 postingService.getPostingList($scope.patientId).then(function(data){
					$scope.getPostingList = data;
					$scope.postingReviewLoader = false;
					$scope.addPostingLoader = false;
				});
		 }
		 
		$scope.resetPosting = function(){
			$scope.postingEDObj = {
						"patientId"   :  $scope.patientId,
						"visitId"     : "",
						"doctorId"    : $scope.doctorId,
						"sliderValue" : "",
						"date"        : new Date().getTime(),
						"comment"     : ""
			}
			
			$scope.postingNonEdObj = {
						"patientId"   : $scope.patientId,
						"visitId"     : "",
						"doctorId"    : $scope.doctorId,
						"sliderValue" : "",
						"date"        : new Date().getTime(),
						"comment"     : "",
						"title"       : "",
						"status"      : "pending",
						"mediaFileURL": "",
						"fileType"    : ""
			}
		};
		$scope.resetPosting();
		
		function getLastPostingsList(){
			postingService.getLastPostingsList($scope.patientId).then(function(data){
				$scope.lastPostingsList = data;
				$scope.postingLoading = false;
			});
		}
		angular.element(document.getElementById("comments_row")).show();
		$scope.showHideEDNOED = function(arg){
			if(arg == 'ERTab'){
				angular.element(document.getElementById("NOETab")).removeClass('active');
				angular.element(document.getElementById(arg)).removeClass('active').addClass('active');
			}else if(arg == 'NOETab'){
				angular.element(document.getElementById("ERTab")).removeClass('active');
				angular.element(document.getElementById(arg)).removeClass('active').addClass('in active');
			}
		}
		
		$scope.getTriageStatusColor = ["--", "Red", "Orange", "Yellow", "Green", " Blue", "Black"];
		$scope.getTriageStatus = ["None", "Life Threatening", "Emergent", "Urgent", "Semi Urgent", " Non Urgent", "Deceased"];
		
		$scope.getPostingTime = function(dateTime){
			var today = new Date();
			var Christmas = new Date(dateTime);
			var diffMs = (today - Christmas); // milliseconds between now & Christmas
			var diffDays = Math.floor(diffMs / 86400000); // days
			var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
			var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
			if(diffDays != 0)
				return diffDays + " days";
			else if(diffDays == 0 )
				return diffHrs + " hr, "+ diffMins + " min";
			else if(diffHrs == 0)
				return diffMins + " min";
		} 
		
		$scope.validateSliderText = function(value){
			if(value === undefined){
				$scope.rating = 0;
			}
		}
		
/* ----------------End of Posting ------------------ */
		 $scope.labRangeCheck = function(val, minVal,maxVal) {
			    var intVal = parseFloat(val);
			    var intMinVal = parseFloat(minVal);
			    var intMaxVal = parseFloat(maxVal);
			    if(intVal >= intMinVal || intVal <= intMaxVal) {
			        return false;
			    } else {
			        return true;
			    }
			}
		    
		 
 /*------------------- Intake Output Module ------------------- */
		 
		 $scope.saveIntake = function(intakeOutputType){
			 var parameter ='';
			 if($scope.intakeObj.parameter == 'Other')
				  parameter = $scope.intakeOtherParameter;
			 else
				  parameter = $scope.intakeObj.parameter;
			 
			 $scope.intakeOutputObj = angular.copy({
				 "patientId"        :$scope.patientId,
				 "intakeOutputType" :intakeOutputType,
				 "value"            :$scope.intakeObj.value,
				 "qualifiers"       :$scope.intakeObj.qualifiers,
				 "timeStamp"        : new Date().getTime(),
				 "parameter"        :parameter,
				 "POPFlag"          :true,
				 "doctorId"         : $scope.doctorId,
		 		 "visitId"          : $scope.visitId,
			});
			 intakeOutputService.saveIntake($scope.intakeOutputObj).then(function(data){
				getIntakeOutputList();
			 });
			 resetIntake();
		 }
		 
		 $scope.saveOutput = function(intakeOutputType){
			 var parameter ='';
			 if($scope.outputObj.parameter == 'Other')
				  parameter = $scope.outputOtherParameter;
			 else
				  parameter = $scope.outputObj.parameter;
			 $scope.intakeOutputObj = angular.copy({
				 "patientId"        :$scope.patientId,
				 "intakeOutputType" :intakeOutputType,
				 "value"            :$scope.outputObj.value,
				 "qualifiers"       :$scope.outputObj.qualifiers,
				 "timeStamp"        :new Date().getTime(),
				 "parameter"        :parameter,
				 "POPFlag"          :true  
			});
			 intakeOutputService.saveIntake($scope.intakeOutputObj).then(function(data){
				//alert("success"); 
				getIntakeOutputList();
			 });
			 resetOutput();
		 }
		 $scope.getIntakeOutputList = function(){
			 intakeOutputService.getIntakeOutputList($scope.patientId).then(function(data){
				$scope.getIntakeOutputList = data;
			 });
		 }
		 
		 function getIntakeOutputList(){
			 intakeOutputService.getIntakeOutputList($scope.patientId).then(function(data){
				$scope.getIntakeOutputList = data;
			 });
		 }
		 $scope.resetIntakeOutput = function() {
				$scope.intakeOutputObj = angular.copy({
					 "patientId"        :"",
					 "intakeOutputType" :"",
					 "value"            :"",
					 "qualifiers"       :"",
					 "timeStamp"        :"",
					 "parameter"        :"",
					 "POPFlag"          :true  
				});
			};
		
		function resetIntake(){
			$scope.intakeObj.parameter = "",
			$scope.intakeObj.value ="",
			$scope.intakeObj.qualifiers ="",
			$scope.intakeOtherParameter = ""
		}
		function resetOutput(){
			$scope.outputObj.parameter = "",
			$scope.outputObj.value ="",
			$scope.outputObj.qualifiers ="",
			$scope.outputObjOtherParameter = ""
		}
		 
		$scope.getTimeByDate = function(jsonDate){
			return CommonDateUtils.getTimeByDate(jsonDate);
		}
		
		/*---------------------- POC -------------------*/
		
		function getPOCList(){
			POCService.getPOCList($scope.patientId).then(function(data){
				$scope.getPOCList = data;
				$scope.pocArray = [];
				angular.forEach($scope.getPOCList, function(pocMstList, key) {
					angular.forEach(pocMstList.POCtestList, function(pocDtlList, key1) {
						pocDtlList['_id'] = pocMstList._id;
						pocDtlList['markError'] = pocMstList.markError;
						$scope.pocArray.push(pocDtlList);
					});
				});
			});
		}
		$scope.getPOCMasters = function(){
			getPOCList();
			//$scope.gender = $rootScope.patientInfo.gender;
			POCService.getPOCMasterList().then(function(data){
				$scope.getPOCMasterList = data;
			});
		}
		
		$scope.validatePositiveValue = function(event) {
			//console.log($(value.target)[0].value);
			if($(event.target)[0].value < 0)
				$(event.target)[0].value = '';
		}
		
		$scope.getPOCById = function(pocId){
			$scope.POCTestList = getTests(pocId);
		}
		
		$scope.setAtleastOnePOC = function() {
			var ele = angular.element(document.getElementsByClassName("poctest"));
			var flag = false;
			for(var i = 0; i < $scope.POCTestList.length ; i++){
				if($scope.POCTestList[i].default_Value !='' && $scope.POCTestList[i].default_Value != undefined){
					flag = true;
				}
			}
			
			if(flag){
				ele.removeClass('ng-show').addClass('ng-hide');
			}else{
				ele.removeClass('ng-hide').addClass('ng-show');
				$scope.addPocLoader = false;
			}
		}
		
		$scope.savePOC = function(){
			var pocListObj = []
			var min;
			var max;
			var flag = false;
			var ele = angular.element(document.getElementsByClassName("poctest"));
			list = $scope.POCTestList;
			if(list != undefined){
				$scope.addPocLoader = true;
				for(var i = 0; i<list.length ; i++){
					if(list[i].default_Value !='' && list[i].default_Value != undefined){
						if(list[i].range.length == 2){
							for(var j = 0; j < list[i].range.length; j++){
								if($scope.gender == "Male" && list[i].range[j].key == "men"){
									min=list[i].range[j].min;
									max=list[i].range[j].max;
								}else if($scope.gender == "Female" && list[i].range[j].key == "women"){
									min=list[i].range[j].min;
									max=list[i].range[j].max;
								}
							}
							
						}else{
							min=list[i].range[0].min;
							max=list[i].range[0].max;
						}
						
						var tests = {
							    "test": list[i].parameter_name,
							    "unit": list[i].unit,
							    "minRange" : min,
							    "maxRange" : max,
							    "testValue": list[i].default_Value
						}
						pocListObj.push(tests);
						flag = true;
					}
				}
			}
			if(flag){
				var resultantPOC = {
						"doctorId": $scope.doctorId,
						"visitId" : $scope.visitId,
						"POCTestName": $scope.pocTestName,
						"POCdate":new Date().getTime(),
						"listItems":pocListObj
				};
			
				POCService.savePOC(resultantPOC, $scope.patientId).then(function(data){
					getPOCList();
					//$scope.resetPOCForm();
					if(data.data._status_Code === 200)
						$scope.resetPOCForm();
					$scope.addPocLoader = false;
				});
				ele.removeClass('ng-show').addClass('ng-hide');
			}else{
				ele.removeClass('ng-hide').addClass('ng-show');
				$scope.addPocLoader = false;
			}
		}
		$scope.resetPOCForm = function() {
			var ele = angular.element(document.getElementsByClassName("poctest"));
			if($scope.POCTestList != undefined){
				for(var i = 0; i < $scope.POCTestList.length ; i++){
					$scope.POCTestList[i].default_Value = '';
				}
			}
			ele.removeClass('ng-show').addClass('ng-hide');
		}
		
		$scope.pocMarkError = function(POCId){
			$scope.addPocLoader = true;
			var pocObj =  {
						"POCId":POCId,
						"doctorId" : $scope.doctorId
					};
			POCService.pocMarkError($scope.patientId, pocObj).then(function(data){
				getPOCList();
				$scope.addPocLoader = false;
			});
		}
		
		function getTests(pocId){
			list = $scope.getPOCMasterList;
			 for (var d = 0, len = list.length; d < len; d += 1) {
			        if (list[d]._id === pocId) {
			        	$scope.pocTestName = list[d].test_name;
			            return list[d].Parameter;
			        }
			    }
		}
		
		/*------------------- File Upload ----------------*/
		 $scope.uploadFile = function(){
            /* var file = $scope.myFile;
             
             console.dir(file);
             
             var uploadUrl = "/fileUpload";
             fileUpload.uploadFileToUrl(file, $scope.patientId).then(function(data){
             });*/
          };
        
          
		/*---------------------- Flag -------------------*/
         $scope.flagListValue = false;
         $scope.saveFlag = function(){
        	 var flagName  = $scope.flagObj.flagName;
        	 var flagValue = $scope.flagObj.flagValue;
        	 if(flagName != '' && flagValue != ''){
        		 $scope.flagLoader = true;
	        	 var flagListItems = [];
	        	 /* var obj = {flagName : "", flagValue : ""};
	        	 for(var i=0; i< flagList.length; i++){
	        		 var flag = flagList[i];
	        		 obj.flagName = flagList[i].id;
	        		 obj.flagValue = flagvalue;
	        	 }*/
        		 var obj = {
        				 "flagName"  : flagName,
        				 "flagValue" : flagValue
        		 }
        		 flagListItems.push(obj);
	        	 var flagObj = {
	        			 			"doctorId" : $scope.doctorId,
	        			 			"visitId"  : $scope.visitId,
	        			 			"flagList" : flagListItems
	        			 		}
	        	 FlagService.saveFlag(flagObj, $scope.patientId).then(function(data){

	        		getFlagList(); 
	        		 resetFlag();
	            	 getPatientInformation();
	            	 if(data.data._status_Code === 200)
	            		 resetFlag();
	            	 $scope.flagLoader = false;
	        	 });
        	 }
        	
         } 
         
         function getFlagList(){
        	 FlagService.getFlagList($scope.patientId).then(function(data){
        		$scope.getFlagList = data; 
        	 });
         }
         
         $scope.getFlags = function(){
        	 $scope.flagLoader = true;
        	 resetFlag();
        	 FlagService.getFlagList($scope.patientId).then(function(data){
         		$scope.getFlagList = data;
         		$scope.flagLoader = false;
         	 });
         }
         
         $scope.flagEnteredInError = function(flagId){
        	 $scope.flagLoader = true;
        	 var param = {
        			  		"doctorId" : $scope.doctorId
        	 			}
        	 FlagService.flagEnteredInError(flagId, $scope.patientId,param).then(function(data){
        		 getFlagList();
        		 getPatientInformation();
        		 $scope.flagLoader = false;
        	 });
         }
         
         $scope.updateFlag = function(flagId, flagValue){
        	 $scope.flagLoader = true;

        	 var param = {
        			 		"flagId"   : flagId,
        			 		"flagValue": flagValue,
        			 		"doctorId" : $scope.doctorId
           	 			}
        	 FlagService.updateFlag($scope.patientId, param).then(function(data){
        		 getFlagList();
        		 getPatientInformation();
        		 $scope.flagLoader = false;
        	 });
         }
         
         function resetFlag(){
        	 $scope.flagObj = angular.copy({
				 "flagValue"        :false,
				 "flagName"         :""
			});
         }
		
         $scope.getFlagMasterList = function(){
        	 if(!$scope.flagListValue || $scope.flagMasterList == undefined){
        		 FlagService.getFlagMasterList().then(function(data){
        			 $scope.flagMasterList = data; 
        			 $scope.flagListValue = true;
        		 });
        	 }
         }
//------------------ Medication------------------//
         
         $('#medication_graph').click(function(){
        	angular.element(document.getElementById("medication_tab_row")).show();
  			angular.element(document.getElementById("medication_tab")).removeClass('active');
  			angular.element(document.getElementById("medication_graph")).removeClass('active').addClass('active');
  			angular.element(document.getElementById("medication_tab_row")).hide();
  			angular.element(document.getElementById("chart_div")).show();
  			angular.element(document.getElementById("searchBox")).hide();
  			
  			MedicationService.getMedicationList($scope.patientId).then(function(data) {
  				$scope.getMedicationList = data;
  				google.charts.load('current', {'packages':['timeline']});
  	  	        google.charts.setOnLoadCallback(drawChart);
  			})
         })
         
         
         $('#medication_tab').click(function(){
        	angular.element(document.getElementById("medication_tab_row")).show();
  			angular.element(document.getElementById("medication_tab")).removeClass('active').addClass('active');
  			angular.element(document.getElementById("medication_graph")).removeClass('active');
  			angular.element(document.getElementById("medication_tab_row")).show();
  			angular.element(document.getElementById("chart_div")).hide();
  			angular.element(document.getElementById("searchBox")).show();
  			
  			MedicationService.getMedicationList($scope.patientId).then(function(data) {
  				$scope.getMedicationList = data;
  				
  			})
         })
         
         $scope.getMedications = function(){
        	$scope.medicationReviewLoader = true;
        	angular.element(document.getElementById("medication_tab_row")).show();
 			angular.element(document.getElementById("medication_tab")).removeClass('active').addClass('active');
 			angular.element(document.getElementById("medication_graph")).removeClass('active');
 			angular.element(document.getElementById("chart_div")).hide();
 			angular.element(document.getElementById("searchBox")).show();
 			
 			MedicationService.getMedicationList($scope.patientId).then(function(data) {
 				$scope.getMedicationList = data;
 				$scope.medicationReviewLoader = false;
 			})
 		};
 		
        function getMedicationList(){
        	 MedicationService.getMedicationList($scope.patientId).then(function(data){
        		 $scope.getMedicationList = data;
        		 $scope.getMedicationGraph();
        	 });
         }
         
         function getActiveMedicationsList(){
        	 MedicationService.getActiveMedicationsList($scope.patientId).then(function(data){
         		$scope.activeMedicationList = data; 
         		$scope.medicationLoading = false;
         	 });
         }
         
         /*
          *  $scope.getMedicationGraph
          */
         function getTimestampToDate(time){
    		 var date = new Date(time);
    		 return date;
    	 }
         
         function graphList(){
        	 var arr = $scope.getMedicationList;
        	 var graphList = [[ {label: 'drugName', type: 'string'},
        	                      {label: 'startDate', type: 'date'},
        	                      {label: 'stopDate', type: 'date'}]
        	                   ];
        	 for(var i = 0;i < arr.length; i++){
        		 graphList.push([
              		arr[i].drugName,
              		arr[i].startDate,
              		arr[i].stopDate
              	])
              }
        	 return graphList;
         }
        
         function drawChart() {
        	 var graphData = graphList();

             var data = google.visualization.arrayToDataTable(graphData
             );

             var options = {
               height: 600
             };

             var chart = new google.visualization.Timeline(document.getElementById('chart_div'));

             chart.draw(data, options);
           }
         
 //------------- End of Graph---------------//
         
         
 //------------------ Medication End------------------//    
         
 //------------------ Lab --------------------------//
         
       //Get Lab result by date range 
         $scope.getLabResultByDateRange = function(labDateRange){
        		var values = labDateRange.split(" - ");
        	    var lowerArr =values[0].split("-");
        	    var lowerDate = lowerArr[1] + '-' + lowerArr[0] + '-' + lowerArr[2];
        	    
        	    var upperArr = values[1].split("-");
        	    var upperDate = upperArr[1] + '-' + upperArr[0] + '-' + upperArr[2];
        	    
        	    var upperFinalDate = new Date(upperArr[2], (parseInt(upperArr[1]) - 1), upperArr[0],23,59,59);
        	    
        	    labResultService.getLabResultDateRange($scope.patientId, $scope.patientMrn,upperFinalDate.getTime(), new Date(lowerDate).getTime()).then(function(data){
        	    	if(data == "none"){
        	    		$scope.getLabResultList = "";
        	    	}else{
        	    		$scope.getLabResultList = data;
        	    	}
        	    });
         }
 //------------------ Lab End -----------------------//
  /*-------------- Patient Information (to get patient information and recent allergy and flag) -------------*/
         function getPatientInformation(){
        	 PatientInfoService.getPatientInfo($scope.patientId).then(function(data){
        		$scope.patientInformation = data; 
        		$rootScope.loading = false;
        		getFirstActiveFlag();
        		getFirstActiveAllergy();
        	 });
         }
  /*---------get first active patient flag ------------*/
         function getFirstActiveFlag(){
        	 $scope.patientCoverPageFlag = "";
        		angular.forEach($scope.patientInformation.flagResult, function(flag, key) {
					if(flag.markError == false && flag.flagValue == true){
						$scope.patientCoverPageFlag = flag.flagName;
						return false;
					}
				});
         }
  /*---------get first active allergy -------------*/
         function getFirstActiveAllergy(){
        	 $scope.patientCoverPageAllergy = "";
        	 angular.forEach($scope.patientInformation.Allergies, function(allergy, key) {
					if(allergy.state == 'active'){
						$scope.patientCoverPageAllergy = allergy.allergyName;
						return false;
					}
				});
         }

		  /*$scope.dynamicPopover = {
				    content: 'Hello, World! faryfyu fdtugi fi guu gj fcjgg vuh vu gvkh guhi Hello, World! faryfyu fdtugi fi guu gj fcjgg vuh vu gvkh guhi Hello, World! faryfyu fdtugi fi guu gj fcjgg vuh vu gvkh guhi Hello, World! faryfyu fdtugi fi guu gj fcjgg vuh vu gvkh guhi',
				  };*/
		  $scope.scrollbarConfig = {
					theme: 'dark',
					scrollInertia: 500
				}
		
/*------------------- Complaint/Problems ----------------------*/
		  
		
		  
			$scope.doctorId = $scope.doctorId;
		  	resetProblem();
			$scope.patientComplaint = {};

			function resetProblem() {
				$scope.patientComplaint = angular.copy({
					"doctorId"    : $scope.doctorId, 
					"doctorName"  : $scope.doctorName,
					"duration"	  :"day",
					"severity"	  :"Unknown",
					"status"	  :"active",
					"type"		  :"",
					"description" :"",
					"icdCode"	  :"",
					"date"		  :new Date(),
					"comments"    :"",
		 			"visitId"     :"",
				});
				$scope.message = 'Active';
	            $scope.status = true;
	            $scope.complaintTitle = "";
			};	
			
			/*$scope.patientComplaint.duration = "day";
			$scope.patientComplaint.severity = "Chronic";
			$scope.patientComplaint.status = "active";
			$scope.patientComplaint.type = "primary";*/
			
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
		         
			//**********************************ALERT**********************************//*
			$scope.addAlert = function() {
				//alert();
			    $scope.alerts.push({msg: 'Another alert!'});
			  };

			  $scope.closeAlert = function(index) {
			    $scope.alerts.splice(index, 1);
			  };
		     
		   //**********************************DATEPICKER**********************************//*
		     $scope.today = function() {
		   	    $scope.dt = new Date();
		   	  };
		   	 
		   	  $scope.open1 = function() {
		   	    $scope.popup1.opened = true;
		   	  };

		   	  $scope.popup1 = {
		   	    opened: false
		   	  };
		 	
		   	  //-----Date can select todays and previous only
		   	$scope.dateOptions = {
		   		    maxDate: new Date(),
		   		    startingDay: 1
		   		  };
		 	
			$scope.patientComplaint = angular.copy({
													"doctorId"    : $scope.doctorId, 
													"duration"	  :"day",
													"severity"	  :"Unknown",
													"status"	  :"active",
													"type"		  :"",
													"description" :"",
													"icdCode"	  :"",
													"date"		  :new Date(),
													"doctorName"  : $scope.doctorName,
													"comments"    :"",
													"visitId"     : "",
												   });
			$scope.resetCompaint  = function(){
				$scope.patientComplaint = angular.copy({
					"doctorId"    : $scope.doctorId, 
					"duration"	  :"day",
					"severity"	  :"Unknown",
					"status"	  :"active",
					"type"		  :"",
					"description" :"",
					"icdCode"	  :"",
					"date"		  :new Date(),
					"doctorName"  : $scope.doctorName,
					"comments"    :"",
					"visitId"  : $scope.visitId,
				   });
				$scope.dt = new Date(); 
				//$scope.comments = "";
			}
			
			$scope.setComplaint = function(icdCode,description){
				$scope.icdCode = icdCode;
				$scope.patientComplaint.description = description;
				$scope.patientComplaint.icdCode = icdCode;
				//$scope.patientComplaint.date = new Date().getTime();
				$scope.patientComplaint.doctorName = $scope.doctorName;
				//getPatientComplaintList();
			}
			
			$scope.removeDay = function(){
				var datepicker = Date.parse($scope.dt);
				if(!isNaN(datepicker))
					$scope.patientComplaint.duration = "";
				else
					$scope.patientComplaint.duration = "day";
			}
			
			$scope.saveComplaint = function(){
				$scope.$broadcast('show-errors-check-validity');
				//ngModel.$setValidity('valid', true);
				//$scope.problemListForm.dt.$setValidity("ng-valid-date", true);
				if($scope.problemListForm.$valid){
					$scope.addComplaintLoader = true;
					var complaintDate = angular.element(document.getElementById("problemDate")); 
					var datepicker = Date.parse($scope.dt);
					
					var txtDate = complaintDate.val();
					if(isNaN(datepicker)){
						var duration = $scope.patientComplaint.duration;
						if(duration == 'day'){
							var newDate = new Date();
							newDate.setDate(newDate.getDate() - txtDate);
							 $scope.patientComplaint.date = newDate.getTime(); 
						}else if(duration == 'week'){
							var daysOfWeek = txtDate * 7;
							var newDate = new Date();
							newDate.setDate(newDate.getDate() - daysOfWeek);
							 $scope.patientComplaint.date = newDate.getTime();
						}else if(duration == 'month'){
							 var newDate = new Date();
								newDate.setMonth( newDate.getMonth() - txtDate );
								 $scope.patientComplaint.date = newDate.getTime();
						}else if(duration == "year"){
							var newDate = new Date();
							newDate.setFullYear( newDate.getFullYear() - txtDate );
							 $scope.patientComplaint.date = newDate.getTime();
							 }
					}
					else{
					 var d= new Date($scope.dt);
					 $scope.patientComplaint.date = d.getTime();
					}
					
					var visitId = $scope.visitId;
					var patientId  = $scope.patientId;
					$scope.patientComplaint.doctorName = $scope.doctorName;
					$scope.patientComplaint.visitId = $scope.visitId;
					pateintComplaintService.saveComplaint($scope.patientComplaint,patientId,visitId).then(function(data){
						$scope.$broadcast('show-errors-reset');
						getPatientComplaintList();
						if($scope.patientComplaint.status == 'active'){
							getActiveComplaint();
						}
						if(data.data._status_Code === 200)
							resetProblem();
						$scope.addComplaintLoader = false;
					});
					$scope.searchProblem="";
				}
			}
			
			/*
			 * Get Problem List
			 */
			function getPatientProblemList(){
				pateintComplaintService.getPatientProblemList().then(function(data){
					$scope.getPatientProblemList =  data;
				});
			}
			
			 //get active complaint
//			 $scope.getActiveComplaint = function(){
//				 pateintComplaintService.getActiveComplaint($scope.patientId).then(function(data){
//					$scope.activeComplaintList = data; 
//				 });
//			 }
			 
			 function getActiveComplaint(){
				 pateintComplaintService.getActiveComplaint($scope.patientId).then(function(data){
						$scope.activeComplaintList = data; 
						$scope.complaintLoading = false;
					 });
			 }
			 
			$scope.addComplaintToError = function(complaintId, status){
				$scope.addComplaintLoader = true;
				var param = {
						"doctorId" : $scope.doctorId,
						"status"   : status
				}
				var patientId  = $scope.patientId;
				pateintComplaintService.addComplaintToError(patientId,complaintId, param).then(function(data){
					getPatientComplaintList();
					getActiveComplaint();
					$scope.addComplaintLoader = false;
				});
			}
			
			$scope.changeStatus = function(){
				if($scope.status){
					$scope.patientComplaint.status = "active";
				}else{
					$scope.patientComplaint.status = "inactive";
				}
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
				 $scope.complaintTitle = $item.code + ' - ' + $item.desc;
				 $scope.patientComplaint.description = $item.desc;
					$scope.patientComplaint.icdCode = $item.code;
					$scope.patientComplaint.date = new Date().getTime();
					$scope.patientComplaint.doctorName = $scope.doctorName;
			 }
			function getPatientComplaintList(){
				var patientId  = $scope.patientId;
				$scope.patientComplaint.date = new Date().getTime();
				$scope.patientComplaint.doctorName = $scope.doctorName;
				pateintComplaintService.getPatientComplaintList(patientId).then(function(data){
					$scope.getPatientComplaintList = data;
				});
			}
			
			$scope.stringTrim = function(arg) {
				return arg != null ? arg.trim() : '';
			}
			
/*----------------- patient complaint end ----------------*/
			
/*----------------------- Order -----------------------*/			
	/*$scope.getOrderReviewList = function(){
		OrderService.getOrderReview($scope.doctorId).then(function(data){
			$scope.orderReviewList = data;
		});
	}*/
			
		/***************************************	EXPAND COLLAPSE PROBLEM LIST ***********************/
			$scope.oneAtATime = true;

			  $scope.status = {
			    isCustomHeaderOpen: false,
			    isFirstOpen: true,
			    isFirstDisabled: false
			  };
			  
			  /*self.toggleActivation = function() {
				 
		          if ( !self.activated ) self.modes = [ ];
		          if (  self.activated ) j = counter = 0;
		       };*/
			  
			  /*$scope.data = {
		              switch6: true
		           };*/
		           $scope.message = 'Active';
		           $scope.status = true;
		           $scope.onChange = function(state) {
		               if($scope.status)
		            	   {
		            	   $scope.message = 'Active';
		            	   $scope.patientComplaint.status = "active";
		            	   }
		               else
		            	   {
		            	   $scope.message = 'Inactive';
		            	   $scope.patientComplaint.status = "inactive";
		            	   }
		              
		           };
		           
		           $scope.scrollbarConfig = {
							theme: 'dark',
							scrollInertia: 500
						}      

		           
		           
		          /* *********************************************** DATE TIME PICKER **************************************/
		          /* $scope.dateTimeNow = function() {
		        	    $scope.date = new Date();
		        	  };
		        	  $scope.dateTimeNow();
		        	  
		        	  $scope.toggleMinDate = function() {
		        	    var minDate = new Date();
		        	    var maxDate = new Date();
		        	    // set to yesterday
		        	    minDate.setDate(minDate.getDate() - 1);
		        	    maxDate.setDate(maxDate.getDate() + 3);
		        	    $scope.dateOptions.minDate = $scope.dateOptions.minDate ? null : minDate;
//		        	    $scope.dateOptions.maxDate = $scope.dateOptions.maxDate ? null : maxDate;
		        	  };
		        	   
		        	  $scope.dateOptions = {
		        	    showWeeks: false,
		        	    startingDay: 0
		        	  };
		        	  
		        	  $scope.toggleMinDate();
		        	  
		        	  // Disable weekend selection
		        	  $scope.disabled = function(calendarDate, mode) {
		        	    return mode === 'day' && ( calendarDate.getDay() === 0 || calendarDate.getDay() === 6 );
		        	  };
		        	  
		        	  $scope.open = function($event,opened) {
		        	    $event.preventDefault();
		        	    $event.stopPropagation();
		        	    $scope.dateOpened = true;
		        	  };
		        	  
		        	  $scope.dateOpened = false;
		        	  $scope.hourStep = 1;
		        	  $scope.format = "dd-MMM-yyyy";
		        	  $scope.minuteStep = 15;
		        	  // add min-time="minTime" to datetimepicker to use this value 
		        	  $scope.minTime = new Date(0, 0, 0, Math.max(1, $scope.date.getHours() - 2), 0, 0, 0);

		        	  $scope.timeOptions = {
		        	    hourStep: [1, 2, 3],
		        	    minuteStep: [1, 5, 10, 15, 25, 30]
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
		        	  };*/
		           
		  

/*===================== End Complaint/Problems =======================*/

/* ================ Order review ================ */

$scope.unsignedOrderIdList = [];
$scope.unsignedOrderNames = [];
$scope.orderReviewOrderCategories = [];

//$scope.OrderCategoryArr = ["Lab Order","Imaging Order","IP Pharmacy","IV Pharmacy", "Procedure/Surgical"]

OrderService.getUnSignedOrderByPatientId($scope.doctorId, $scope.patientId).then(function(data){
  $scope.unSignedOrderList = data;
  getUnsignedOrderCategories($scope.unSignedOrderList);
});  



$scope.getOrderReviewList = function(){
 OrderService.getOrderReview($scope.doctorId).then(function(data){
  $scope.orderReviewList = data;
  getOrderReviewOrderCategories();
 });
}

$scope.getPatientList = function(){
 OrderService.fetchAllPatientList($scope.doctorId).then(function(data){
  $scope.patientList = data;
 });
}

$scope.getUnSignedOrderByPatientId = function(patientId){
 OrderService.getUnSignedOrderByPatientId($scope.doctorId, patientId).then(function(data){
  $scope.unSignedOrderList = data;
  getUnsignedOrderCategories($scope.unSignedOrderList);
 });
 
}


// array of orderCategory from unSignedOrderList(Order Sign)
function getUnsignedOrderCategories(unSignedOrderList){
 $scope.unsignedOrderNames = [];
angular.forEach(unSignedOrderList, function(value, key) {
 var orderCategory = value.orderCategory;
 if ($scope.unsignedOrderNames.indexOf(orderCategory) == -1) {
         $scope.unsignedOrderNames.push(orderCategory);
     }
 });
}


// array of orderCategory from orderReviewList(Order Review)
function getOrderReviewOrderCategories(){
 angular.forEach($scope.orderReviewList, function(value, key) {
  var orderCategory = value.orderCategory;
  if ($scope.orderReviewOrderCategories.indexOf(orderCategory) == -1) {
          $scope.orderReviewOrderCategories.push(orderCategory);
      }
  });
}

$scope.isUnsignedCategoryExist = function(categoryName){
 if($scope.unsignedOrderNames.indexOf(categoryName) > -1)
  return 1;
 else
  return 0;
}

$scope.isOrderReviewCategoryExist = function(categoryName){
 if($scope.orderReviewOrderCategories.indexOf(categoryName) > -1)
  return 1;
 else
  return 0;
}

var unsignedOrderIdList = new Array();
$scope.setUnsignedOrder = function(unsignedOrderId){
 var index = unsignedOrderIdList.indexOf(unsignedOrderId);
 if(index == -1){
  unsignedOrderIdList.push(unsignedOrderId);
 }else{
    unsignedOrderIdList.splice(index, 1);
 }
 $scope.unsignedOrderIdList = unsignedOrderIdList;
}

Array.prototype.indexOf = function(elt /*, from*/)
   {
      var len = this.length;
      
      var from = Number(arguments[1]) || 0;
      from = (from < 0)
      ? Math.ceil(from)
      : Math.floor(from);
      
      if (from < 0)
      from += len;
      
      for (; from < len; from++)
      {
         if (from in this &&
         this[from] === elt)
         return from;
      }
      return -1;
   };
   
$scope.upadateUnsignedOrder = function(){
 var orderObj = {
   "cpoeOrders" : $scope.unsignedOrderIdList,
   "signature" : $scope.signature
 }
 if($scope.unsignedOrderIdList != ''){
  OrderService.updateUnSignedOrder(orderObj, $scope.doctorId).then(function(data){
   $scope.signature = "";
   OrderService.getUnSignedOrderByPatientId($scope.doctorId, $scope.patientId).then(function(data){
    $scope.unSignedOrderList = data;
   });
  });
 }
} 

$scope.setPatientName = function(patientName){
	$scope.unsignedPatientName = patientName;
}


$scope.getOrdersByDate = function(date){
 var newDate = new Date(date);
 OrderService.getOrdersByDate($scope.doctorId, newDate.getTime()).then(function(data){
 // $scope.unSignedOrderList = data;
	$scope.orderReviewList = data;
 });
}

$scope.getFavoriteOrders = function(){
 OrderService.getFavoriteOrders($scope.doctorId).then(function(data){
  $scope.favoriteOrderList = data;
 });
}

 $scope.getAgeByDate = function(dateStr){
   return getAge(dateStr);
  };
 


 
/* ================ End Order review ============= */
 
 //------------------- Get Template List --------------------------//
 $scope.getTemplateList = function(category){
	 $scope.templateList = "";
  templateService.getTemplateListByDoctor(category).then(function(data){
   $scope.templateList = data;
  })
 }

 //-------------------- Get Template By Id ------------------------------//
 $scope.getTemplateById = function(templateId){
	 // change cookies santosh
  //$cookies.put('templateId', templateId);
	 var model = angular.element(document.getElementById("prescriptionNote_subModal"));
	 model.modal('hide');
	 $('.modal-backdrop').hide();
	 var setGetData = setGetService.getValue();
	 setGetData['templateId'] = templateId;
	
	 Authorization.go('templateInfo');
  //window.location.href = "./template-info.html";
	 /*$scope.customTemplateData = {};
		getTemplateWithData(templateId);

		//$scope.customTemplateData = tempJson;
		$scope.bindHtml = function(){
		document.getElementById("dynamicHtmlContent").innerHTML = "";
		var dynamicHtml = new String($scope.customTemplateData.template.dynamicHtml);
		dynamicHtml = dynamicHtml.replace("\n","");
		dynamicHtml = dynamicHtml.replace("\t","");
		
		$scope.htmlForm = $sce.trustAsHtml(dynamicHtml);
		var elem = angular.element(document.getElementById("dynamicHtmlContent"));
		elem.append(dynamicHtml);
		$compile(elem)($scope);
		}
		
		$scope.getDate = function(dateString){
			var dateObj = new Date(dateString);
		     var m_names = new Array("Jan", "Feb", "Mar", 
		          "Apr", "May", "Jun", "Jul", "Aug", "Sep", 
		          "Oct", "Nov", "Dec");
		          var month = dateObj.getMonth();
		          var day = dateObj.getDate();
		          var year = dateObj.getFullYear();
		          var formatedDay = '';
		          var formatedMonth = '';
		          
		          var suffix = getDayOfMonthSuffix(day)
		          formatedDay = day+"<sup>"+suffix+"</sup>";
		          
		          if(formatedDay == 'Nan' || m_names[month] == undefined ||  year == 'NaN')
		           return "-";
		          return formatedDay+" " + m_names[month]  + " " + year ;
		    }
		    
		    function getDayOfMonthSuffix(n){
		     if (n >= 11 && n <= 13) {
		         return "th";
		     }
		     switch (n % 10) {
		         case 1:  return "st";
		         case 2:  return "nd";
		         case 3:  return "rd";
		         default: return "th";
		     }
		}
		    
		function getTemplateWithData(templateId){
			var patientId = $scope.patientId;
			templateService.getDoctorCustomTemplate(templateId,patientId).then(function(data){
				$scope.customTemplateData = data;
				return data;
			});
		}
		
		$scope.downloadPdf = function() {
			 var quotes = document.getElementById('dvContainer');
			 var winWidth = window.innerWidth;
			 scroll(0,0);
		        html2canvas(quotes, {
		            onrendered: function(canvas) {

		            //! MAKE YOUR PDF
		            var pdf = new jsPDF('p', 'pt', 'letter');

		            for (var i = 0; i <= quotes.clientHeight/980; i++) {
		                //! This is all just html2canvas stuff
		                var srcImg  = canvas;
		                var sX      = 0;
		                var sY      = 980*i; // start 980 pixels down for every new page
		                var sWidth  = winWidth;
		                var sHeight = 980;
		                var dX      = 0;
		                var dY      = 0;
		                var dWidth  = 900;
		                var dHeight = 980;

		                window.onePageCanvas = document.createElement("canvas");
		                onePageCanvas.setAttribute('width', 1300);
		                onePageCanvas.setAttribute('height', 980);
		                var ctx = onePageCanvas.getContext('2d');
		                // details on this usage of this function: 
		                // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
		                ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

		                // document.body.appendChild(canvas);
		                var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

		                var width         = onePageCanvas.width;
		                var height        = onePageCanvas.clientHeight;

		                //! If we're on anything other than the first page,
		                // add another page
		                if (i > 0) {
		                    pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
		                }
		                //! now we declare that we're working on that page
		                pdf.setPage(i+1);
		                //! now we add content to that page!
		                pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62));

		            }
		            //! after the for loop is finished running, we save the pdf.
		            pdf.save('Test.pdf');
		        }
		      });
	    }*/
 }
              
 
/* ================ Procedure/Surgical Order Autocomplete =================  
 $scope.searchProcedureName = function(keyword){
	 var procedureNameList = [];
	 OrderService.searchProcedureName(keyword).then(function(data){
		 angular.forEach(data, function(item){
       	  var obj = {id:'',procedureId:'', procedureName:'', serviceId: ''};
           obj.id = item._id;
           obj.procedureId = item.Procedure_Id;
           obj.procedureName = item.Procedure_Name;
           obj.serviceId = item.Service_Id;
           procedureNameList.push(obj);
         });
	 });
 }*/
/*---------------------- Order Autocomplete ------------------*/

	
	
}]);
/* =============== End of Controller ================= */
ehrApp.directive('popoverClose', function($timeout){
	  return{
	    scope: {
	      excludeClass: '@'
	    },
	    link: function(scope, element, attrs) {
	      var trigger = document.getElementsByClassName('trigger');
	      
	      function closeTrigger(i) {
	    	  
	        $timeout(function(){

	        	//if(angular.element(trigger[0]).triggerHandler('click') != undefined)
	        	for(i=0; i<trigger.length; i++){
	        		angular.element(trigger[i]).triggerHandler('click');
	        		element.find('table').find("tbody").find("tr").find(".trigger").removeClass("trigger");
	        	}
	        		        
	        });
	      }
	      
	      element.on('click', function(event){
	        var etarget = angular.element(event.target);
	        var tlength = trigger.length;
	        if(!etarget.hasClass('trigger') && !etarget.hasClass(scope.excludeClass)) {
	          for(var i=0; i<tlength; i++) {
	        	  closeTrigger(i);
	          }
	        }
	      });
	    }
	  };
	});
ehrApp.directive('popoverElem', function(){
	  return{
	    link: function(scope, element, attrs) {
	      element.on('click', function(){
	    	  // find all div with class "popover ng-scope ng-isolate-scope right fade in"
	    	  /*var ele = document.getElementsByClassName('popover ng-scope ng-isolate-scope right fade in');
	    	  for(var i=0; i<ele.length; i++) {
	    		  ele[i].remove();
	    	  }*/
	    	 /* var iEl = angular.element( document.querySelector( '.popover .ng-scope .ng-isolate-scope .right .fade .in' ) );
	    	     iEl.remove();*/
	        element.addClass('trigger');
	      });
	    }
	  };
	});

/* =============== Prescription Note/Discharge summary ================= */



