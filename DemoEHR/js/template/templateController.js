//var templateApp = angular.module("templateApp", ['ngSanitize','ngCookies']);

ehrApp.controller('templateController' , ['$scope','templateService','$sce','$compile','$cookies','setGetService','PatientInfoService','CommonDateUtils',function($scope,templateService,$sce,$compile,$cookies,setGetService,PatientInfoService,CommonDateUtils){
	
	$scope.customTemplateData = {};
	getTemplateWithData();
	getPatientInformation();
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
	    
	function getTemplateWithData(){
		var setGetData = setGetService.getValue();
		var templateId = setGetData.templateId;//$cookies.get("templateId");
		var patientId = setGetData.patientId;//$cookies.get("patientId");
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
    }
	 $scope.getAgeByDate = function(dateStr){
		   return getAge(dateStr);
		  }
	 
	 $scope.convertToIntAndGetDate = function(dateStr){
		    var dt = parseInt(dateStr);
		    return CommonDateUtils.convertJSONStringToDate(dt);
		}
	
	 function getPatientInformation(){
		 var setGetData = setGetService.getValue();
    	 PatientInfoService.getPatientInfo(setGetData.patientId).then(function(data){
    		$scope.patientInformation = data; 
    		getFirstActiveFlag();
    		getFirstActiveAllergy();
    	 });
     }
	 
	  /*---------get first active patient flag ------------*/
     function getFirstActiveFlag(){
    	 $scope.patientCoverPageFlag = "";
    	 	//console.log($scope.patientInformation.flagResult);
    		angular.forEach($scope.patientInformation.flagResult, function(flag, key) {
				if(flag.markError == false && flag.flagValue == true){
					$scope.patientCoverPageFlag = flag.flagName;
					//console.log(flag.flagName);
					return false;
				}
			});
     }
/*---------get first active allergy -------------*/
     function getFirstActiveAllergy(){
    	 $scope.patientCoverPageAllergy = "";
    	 //console.log($scope.patientInformation.Allergies);
    	 angular.forEach($scope.patientInformation.Allergies, function(allergy, key) {
				if(allergy.state == 'active'){
					$scope.patientCoverPageAllergy = allergy.allergyName;
					//console.log(allergy.allergyName);
					return false;
				}
			});
     }
	
}])
