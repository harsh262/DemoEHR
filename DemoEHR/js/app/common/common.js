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

function getAge(dateStr) {
	 try{
	   var date = new Date(parseInt(dateStr));
	   var  dateString;
	   var mm , dd;
	    if(parseInt(date.getMonth()+1) < 10)
	     mm = "0"+ parseInt(date.getMonth()+1);
	    else
	     mm = parseInt(date.getMonth()+1);
	    
	    if(parseInt(date.getDate()) < 10)
	     dd = "0"+ parseInt(date.getDate());
	    else
	     dd = parseInt(date.getDate());
	  
	       var currentDate = mm +'-'+  dd + '-' + date.getFullYear();
	    dateString = currentDate;
	     var now = new Date();
	     var today = new Date(now.getYear(),now.getMonth(),now.getDate());
	     var yearNow = now.getYear();
	     var monthNow = now.getMonth();
	     var dateNow = now.getDate();
	  
	     var dob = new Date(dateString.substring(6,10),
	                        dateString.substring(0,2)-1,                   
	                        dateString.substring(3,5)                  
	                        );
	     //alert(dob);
	     var yearDob = dob.getYear();
	     var monthDob = dob.getMonth();
	     var dateDob = dob.getDate();
	     var age = {};
	     var ageString = "";
	     var yearString = "";
	     var monthString = "";
	     var dayString = "";
	  
	  
	     yearAge = yearNow - yearDob;
	  
	     if (monthNow >= monthDob)
	       var monthAge = monthNow - monthDob;
	     else {
	       yearAge--;
	       var monthAge = 12 + monthNow -monthDob;
	     }
	  
	     if (dateNow >= dateDob)
	       var dateAge = dateNow - dateDob;
	     else {
	       monthAge--;
	       var dateAge = 31 + dateNow - dateDob;
	  
	       if (monthAge < 0) {
	         monthAge = 11;
	         yearAge--;
	       }
	     }
	  
	     age = {
	         years: yearAge,
	         months: monthAge,
	         days: dateAge
	         };
	  
	     if ( age.years > 1 ) yearString = " Y";
	     else yearString = " Y";
	     if ( age.months> 1 ) monthString = " M";
	     else monthString = " M";
	     if ( age.days > 1 ) dayString = " D";
	     else dayString = " D";
	  
	  
	     if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )
	       ageString = age.years + yearString; //+ ", " + age.months + monthString + " " + age.days + dayString + "";
	     else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )
	       ageString = "" + age.days + dayString + "";
	     else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )
	       ageString = age.years + yearString;// + " old. Happy Birthday!!";
	     else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )
	       ageString = age.years + yearString;// + " " + age.months + monthString + "";
	     else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )
	       ageString = age.months + monthString + " " + age.days + dayString + "";
	     else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )
	       ageString = age.years + yearString;// + " " + age.days + dayString + "";
	     else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )
	       ageString = age.months + monthString;// + " old.";
	     else ageString = "--";
	    //console.log(ageString);
	     return ageString;
	  }catch(e){
	   return "--"
	  }
	}
