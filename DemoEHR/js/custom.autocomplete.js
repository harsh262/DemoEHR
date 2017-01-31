var isAutocompleteHasValue=false;

//----------- Patient Autocomplet -------//
$("#serach-ward").autocomplete({
	
    serviceUrl: "http://54.84.170.46:5100/ehr/doctors/2270f71b-34fd-49bb-874c-fd8bb552106c/patients",
    delimiter: ",",
    paramName: "serach-ward",
    transformResult: function(response) {
    	isAutocompleteHasValue=false;
        return {
            //must convert json to javascript object before process
            suggestions: $.map($.parseJSON(response), function(item) {
            	isAutocompleteHasValue = true;
                return {
                    value: item.name ,
                    patientName: item.name,
               
                };
            })
        };
    },
    onSelect: function(sugg) {
        // alert("ok"+ sugg.firstName);
    	isAutocompleteHasValue = true;
        var param = 'patientId=' + sugg.patientId;
        $('#serach-ward').val(sugg.firstName + " " + sugg.middleName + " " + sugg.lastName)
        $.ajax({
            url: "getPatientById",
            data: param,
            type: "GET",
            success: function(response) {
                // alert(response.status);
                //if(response.status=='success'){
                var patient = response[0];
                //console.log(patient);
              
                //$('input:radio[name=gender1]')
               
                RemoceDirtyClass('.polymer-form');
            },
            error: function(xhr, status, error) {
               // alert("error" + xhr);
            }
        });
    }
});