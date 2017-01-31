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

