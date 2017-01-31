/**
 * Common Date Utils
 */
homePageApp.factory('CommonDateUtils', function ($window) {
    var root = {};
    root.show = function(msg){
        $window.alert(msg);
    };
    
    root.getTime = function(){
    	return DisplayCurrentTime();
    }
    
   root.convertJSONStringToDate = function(dateStr){
    	return convertJSONStringToDate(dateStr);
    }
   
   	root.getTimeByDate = function(jsonDate){
   		return getTimeByDate(jsonDate);
   	}
    return root;
    
    function DisplayCurrentTime() {
        var date = new Date();
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        var am_pm = date.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
        return hours + ":" + minutes + " " + am_pm;
    };
    
    function getTimeByDate(jsonDate){
    	var date = new Date(jsonDate);
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        var am_pm = date.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
        return hours + ":" + minutes + " " + am_pm;
    }
    function getNewDate(dateObj){
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
    		
    		return formatedDay+" " + m_names[month]  + " " + year ;
    }
    
    function convertJSONStringToDate(dateString){
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
        		//alert(formatedDay);
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
});