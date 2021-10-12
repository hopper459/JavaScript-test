{
    // Called when an error occurs.
    onError: function(event) {
        //console.log(event);
    },

    // Called before validation of the form.
    onBeforeValidation: function(event) {    	
        
        function getFieldNameByClass(field){        
    		var labelValues=[0];            
            labelValues[0] = 'cdp-liteRegistrationLanding-' + field;
            labelValues[1] = 'cdp-liteRegistrationLanding-' + field + '-error';
            return labelValues;                        
        }        
             
        function removeSpan(className){
        	document.getElementsByClassName(className)[0].children[2].style.display = 'none';
           	document.getElementsByClassName(className)[1].children[2].style.display = 'none';
        } 
          
        function showErrorMessage(fieldName, message) { 
        	var fields = getFieldNameByClass(fieldName);           
            document.getElementsByClassName(fields[1])[0].innerHTML = message; 
            document.getElementsByClassName(fields[1])[1].innerHTML = message; 
            removeSpan(fields[0]);
        }

        function removeValidCharacters(invalidString) { 
            return invalidString.replace(/[^\d!|¡¿=¬¨·;:#\$%\^&\*\+\?_~\"\(\)\-\.\\\/]/g, '');
        }        

        var firstName = event.formData["profile.firstName"];
        var lastName = event.formData["profile.lastName"];
        var email = event.formData["profile.email"];
        var phone = event.formData["profile.phones.number"];
        var day = event.formData["profile.birthDay"];
        var month = event.formData["profile.birthMonth"];
        var year = event.formData["profile.birthYear"];
        var country =  event.formData["profile.country"];
        
        var phoneRegex =  /^\+?(?:[0-9] ?){6,28}[0-9]$/;
        var emailRegex = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var firstAndLastNameRegex = /^([A-zÁ-úÑñ\'\s]+)$/;
        var lenghtRegex = /^.{1,29}$/;
        
        var errorMessageEmptyFirstName = 'Ingresa tu nombre';
        var errorMessageEmptyLastName = 'Ingresa tu apellido';
        var errorMessageEmptyEmail = 'Ingresa un correo electrónico válido';
        var errorMessageEmptyPhone = 'Ingresa un número de teléfono válido';
        var errorMessageNoSelectedBirthDay = 'Debe escoger un dia';
        var errorMessageNoSelectedBirthMonth = 'Debe escoger un mes';
        var errorMessageNoSelectedBirthYear = 'Debe escoger un año';
        var errorMessageNoSelectedCountry = 'Debe seleccionar un país';

        var errorMessageInvalidFirstName = 'Los siguientes caracteres ingresados no son válidos:(//). Solo son válidos los caracteres Alfabéticos de la a-z, incluído las tildes.';
        var errorMessageInvalidLastName = 'Los siguientes caracteres ingresados no son válidos:(//). Solo son válidos los caracteres Alfabéticos de la a-z, incluído las tildes.';
        var errorMessageInvalidEmail = 'Ingresa un correo electrónico válido ';
        var errorMessageInvalidPhone = 'Ingresa un número de teléfono válido';
       
        var errorMessagelenghtFirstName = 'El nombre no puede superar los 29 caracteres';
        var errorMessagelenghtLastName = 'El apellido no puede superar los 29 caracteres';
        

        if (event.screen === 'gigya-subscribe-with-email-screen'){  
            if (!firstName) { 
                showErrorMessage('firstname', errorMessageEmptyFirstName);
            } else{            	
                if (!firstAndLastNameRegex.test(firstName)) {
                    if(!lenghtRegex.test(firstName)){
                        showErrorMessage('firstname', errorMessagelenghtFirstName);
                    }else{
                        errorMessageInvalidFirstName = errorMessageInvalidFirstName.replace('//', removeValidCharacters(firstName) );                   
                        showErrorMessage('firstname', errorMessageInvalidFirstName);
                    }                    	
                }          	                	
            }            
            if (!lastName) {
                showErrorMessage('lastname', errorMessageEmptyLastName);
            } else if (!firstAndLastNameRegex.test(lastName)) {
                if(!lenghtRegex.test(lastName)){
                    showErrorMessage('lastname', errorMessagelenghtLastName);
                }else{
                    errorMessageInvalidLastName = errorMessageInvalidLastName.replace('//', removeValidCharacters(lastName) );
                    showErrorMessage('lastname', errorMessageInvalidLastName);
                }
            }
            
            if (!phone) {
                showErrorMessage('phone', errorMessageEmptyPhone);
            } else if (!phoneRegex.test(phone)) {
                showErrorMessage('phone', errorMessageInvalidPhone);
            }        
       
            if (!email) {
                showErrorMessage('email', errorMessageEmptyEmail);
            } else if (!emailRegex.test(email)) {
                showErrorMessage('email', errorMessageInvalidEmail);
            } 

            if (day === '') {
                showErrorMessage('birthday-day', errorMessageNoSelectedBirthDay);
            }

            if (month === '') {
                showErrorMessage('birthday-month', errorMessageNoSelectedBirthMonth);
            }

            if (year === '') {
                showErrorMessage('birthday-year', errorMessageNoSelectedBirthYear);
            }

            if (country === '') {
                showErrorMessage('country', errorMessageNoSelectedCountry);
            }
       	}
    },

    // Called before a form is submitted. This event gives you an opportunity to perform certain actions before the form is submitted, or cancel the submission by returning false.
    onBeforeSubmit: function(event) {
    },

    // Called when a form is submitted, can return a value or a promise. This event gives you an opportunity to modify the form data when it is submitted.
    onSubmit: function(event) {
    
    	console.log(event);

        delete event.formModel.data.additionals.field1;
		delete event.formModel.data.additionals.field2;
        delete event.formModel.data.additionals.field3;
        delete event.formModel.data.additionals.field4;
        delete event.formModel.data.additionals.field5;
        
        console.log(event);
   
         var today = new Date();
         var channel =  window.gigya.thisScript.globalConf.channel;
         
        /* if(channel === 'BRANDING') {

            event.formModel.data.flag_branding = true;            
            event.formModel.data.date_branding = today;
            setCallingCodeToPhoneNumber(event);             
         }
    
         if(channel === 'RETAIL') {
            
            event.formModel.data.flag_retail = true;
            event.formModel.data.date_retail = today;
            setCallingCodeToPhoneNumber(event);
         }*/
       
       /* event.formModel.data.flag_commerce = true;
        event.formModel.data.date_commerce = today;*/
        
        event.formModel.data.flag_branding = true;            
        event.formModel.data.date_branding = today;
        setCallingCodeToPhoneNumber(event);

         function setCallingCodeToPhoneNumber(event) {
            if(!event.formModel.profile.phones.number.includes('+')) {
            
                var countryIsocode = event.formModel.profile.country;      
                
                console.log(countryIsocode);                
                //alert("Jquery Version: " + jQuery().jquery);

                if(countryIsocode) {
                    
                    var callingCode;
                    var token;
                    
                    var apiendpoint = 'https://api-qa.belcorp.biz';
                    var user = 'interfacesIKU';
                    //QA
                    var password = 'vjm8GduiaTUpqT17gYW4jYqk8S88oC5DoRg2/WJZvpg=';
                   
                    $.ajax({
                        url: apiendpoint + "/oauth/token",
                        type: "POST",
                        dataType: "application/json", 
                        contentType: "application/x-www-form-urlencoded",
                        async:false,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader ("Authorization", "Basic " + btoa(user + ":" + password));
                        },

                        data: {
                            "grant_type": "client_credentials" 
                        },
                        complete: function(data) {
                            //called when complete                           
                            token = JSON.parse(data.responseText)["access_token"];                            
                        }           
                    });
                            
                    if(token) {                        
                    
                        $.ajax({
                            url: apiendpoint +"/countries/" + countryIsocode,
                            type: "GET",
                            dataType: "application/json",                             
                            async:false,
                            headers: {"x-access-token": token},                                                 
                            complete: function(data) {                                                                
                                callingCode = JSON.parse(data.responseText)["phone_code"];                                
                            }
                        });
                        
                        if(callingCode) {                            
                            event.formModel.profile.phones.number = callingCode.concat(event.formModel.profile.phones.number);                          
                        }
                        
                    } else {
                        
                        switch (countryIsocode) {
                            case "BO":
                                callingCode = "+591";
                                break;
                            case "BR":
                                callingCode = "+55";
                                break;
                            case "CL":
                                callingCode = "+56";
                                break;
                            case "CO":
                                callingCode = "+57";
                                break;
                            case "CR":
                                callingCode = "+506";
                                break;
                            case "EC":
                                callingCode = "+593";
                                break;
                            case "SV":
                                callingCode = "+503";
                                break;
                            case "US":
                                callingCode = "+1";
                                break;
                            case "GT":
                                callingCode = "+502";
                                break;
                            case "MX":
                                callingCode = "+52";
                                break;
                            case "PA":
                                callingCode = "+507";
                                break;
                            case "PE":
                                callingCode = "+51";
                                break;
                            case "PR":
                                callingCode = "+1";
                                break;
                            case "DO":
                                callingCode = "+809";
                                break;
                            default:
                                break;
                          }
                        
                        if(callingCode) { 
                            event.formModel.profile.phones.number = callingCode.concat(event.formModel.profile.phones.number);                           
                        }                        
                    }
                }
                else {
                	console.log("no if statement");
                }
            }
         }
   
    },

    // Called after a form is submitted.
    onAfterSubmit: function(event) {
    

    	var apiUrl = "https://api.belcorp.biz";
        var clientId = "interfacesIKU";
		var clientSecret = "vjm8GduiaTUpqT17gYW4jYqk8S88oC5DoRg2/WJZvpg=";
        var oauthTokenSettings = {
          "url":  apiUrl + "/oauth/token",
          "method": "POST",
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": {
            "grant_type": "client_credentials",
            "client_id": clientId,
            "client_secret": clientSecret,
            "scope": "scopeIKU"
          }
        };

        $.ajax(oauthTokenSettings).done(function (response) {
          var ecrmCampaignsSettings = {
            "url": apiUrl + "/ecrm_campaigns",
            "method": "POST",
            "headers": {
              "Content-Type": "application/json",
              "x-access-token": response.access_token
            },
            "data": JSON.stringify({
              userId: event.response.UID,
              initiative: event.data.flag_initiatives,
              fields: {
                Campo1: event.data.additionals.field1,
                Campo2: event.data.additionals.field2,
                Campo3: event.data.additionals.field3,
                Campo4: event.data.additionals.field4,
                Campo4: event.data.additionals.field5
              }
            }),
          };
          $.ajax(ecrmCampaignsSettings);
        });
        
        //Inteacciones con MKT                
        var token;      
        var x_csrf_token;

        $.ajax({
            url: apiUrl + "/oauth/token",
            type: "POST",
            dataType: "application/json", 
            async: false,
            contentType: "application/x-www-form-urlencoded",            
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa(clientId + ":" + clientSecret));
            },
            data: {
                "grant_type": "client_credentials" 
            },                       
            complete: function(data) {
                //called when complete 
                token = JSON.parse(data.responseText)["access_token"];                
            }           
        });      
        
        var uid =event.response.UID;
        
        //console.log("token: -> "+ token);
        
         if(token) {                 
            $.ajax({
                url: apiUrl + "/ecrm_interactions/$metadata",
                type: "GET", 
                async: false,
                xhrFields: { withCredentials: true },
                crossDomain: true,
                headers: {
                	'x-access-token': token,
                    'x-csrf-token': 'Fetch'
                },  
                success: function(data, status, xhr) {                    
                    x_csrf_token = $.trim(xhr.getResponseHeader('x-csrf-token'));
                    console.log("x_csrf_token:  -> " + x_csrf_token);
                },
                error: function(xhr, status, errorThrown) {
                    //console.log('error - GET'); 
                    console.log(xhr);    
                    console.log(status);     
                    console.log(errorThrown); 
                },
                complete: function(data, status, xhr) { 
                	//called when complete 
                    //console.log('complete metadata - GET');  
                    console.log(data);    
                    //console.log(status);     
                    //console.log(xhr);  
                    //console.log("x-csrf-token -> " + data.getResponseHeader('x-csrf-token'));  
                     
                }
            });           
        }
        
        console.log("fine!");                
        var today = new Date();
        
		var dateString = new Date(today.getTime() - (today.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split(".")[0];
                      
      var  batch =  '--batch\n' +
		            'content-type:multipart/mixed; boundary=changeset_batch\n' +
		            '\n' + 
		            '--changeset_batch\n' +
		            'content-type: application/http\n' +
		            'content-transfer-encoding: binary\n' +
		            '\n' +
		            'POST Interactions HTTP/1.1\n' +
		            'Content-Length: 1035\n' +
		            'Accept: application/json\n' +
		            'Content-Type: application/json\n' +
		            'xhrFields: { withCredentials: true }\n'+
                    'crossDomain: true\n'+
		            '\n' +
		            '{\n' +
		            '"InteractionContactOrigin": "GIGYA_ID",\n' +
		            '"InteractionContactId": "'+ uid +'",\n' +
		            '"CommunicationMedium": "WEB",\n' +
		            '"InteractionType": "WEBSITE_REGISTRATION",\n' +
		            '"InteractionTimeStampUTC": "'+ dateString +'",\n' +
		            '"InteractionSourceObjectType": "WEB_SESSION",\n' +
		            '"InteractionSourceObject": "",\n' +
		            '"MarketingArea": "MARKETING_AREA_IKU",\n' +
					'"InteractionReason": "'+ reason +' " \n' +	
					'}\n' +
		            '\n' +
		            '--changeset_batch--\n' +
		            '\n' +
		            '--batch--';
                    
        //console.log('x_csrf_token: -> '+ x_csrf_token);
        //console.log("dateString: -> " + dateString);
        //console.log("uid:  -> " + uid);
        console.log("reason:  -> " + reason);       
        //console.log("batch: -> " + batch);
                    
        if(x_csrf_token){     	
        	
            //debugger;
            $.ajax({
                url: apiUrl + "/ecrm_interactions/$batch",
                type: "POST", 
                async: false,
                headers: {                              
                    'x-access-token': token,
                    'x-csrf-token': x_csrf_token,
                    'Content-Type': 'multipart/mixed;boundary=batch'
                },  
                xhrFields : { withCredentials: true },
                crossDomain: true,      
                data: batch, 
                success: function(data, status, xhr) {
                    //console.log('success - POST'); 
                    console.log(data);    
                    console.log(status);     
                    //console.log(xhr); 
                },
                error: function(xhr, status, errorThrown) {
                    //console.log('error - POST'); 
                    console.log(xhr);    
                    console.log(status);     
                    console.log(errorThrown); 
                },
                complete: function(data, status, xhr) { 
                	//called when complete 
                    console.log('complete - POST');  
                    console.log(data);    
                    console.log(status);     
                    console.log(xhr);        
                }
            });
        }

    },

    // Called before a new screen is rendered. This event gives you an opportunity to cancel the navigation by returning false.
    onBeforeScreenLoad: function(event) {		
    },

    // Called after a new screen is rendered.
    onAfterScreenLoad: function(event) {
    
    	//console.log(event);
    
        var channel =  window.gigya.thisScript.globalConf.channel;
        
        var url_string = document.URL;
        var url = new URL(url_string);
        var url_token = url.searchParams.get("token");
        
        if(event.currentScreen === 'gigya-subscribe-with-email-screen' && url_token) {
 
            url_token = url_token.toLowerCase();
            url_token = url_token.substring(0,8) +"-"+ url_token.substring(08,12) +"-"+ url_token.substring(12,16) +"-"+ url_token.substring(16,20) +"-"+ url_token.substring(20);

            var apiendpoint = 'https://api.belcorp.biz';
            var user = 'interfacesIKU';
            //QA
            var password = 'vjm8GduiaTUpqT17gYW4jYqk8S88oC5DoRg2/WJZvpg=';
            var token;
            var firstName;
            var lastName;
            var phone;
            var country;

            $.ajax({
                url: apiendpoint + "/oauth/token",
                type: "POST",
                dataType: "application/json", 
                contentType: "application/x-www-form-urlencoded",
                async:false,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", "Basic " + btoa(user + ":" + password));
                },

                data: {
                    "grant_type": "client_credentials" 
                },                       
                complete: function(data) {
                    //called when complete                           
                    token = JSON.parse(data.responseText)["access_token"];                           
                }           
            });

            if(token) {

                $.ajax({
                    url: apiendpoint + "/sap/opu/odata/sap/API_MKT_CONTACT_SRV/Contacts(guid'" + url_token + "')?$format=json",
                    type: "GET",
                    dataType: "application/json",                             
                    async:false,
                    headers: {"x-access-token": token},               
                    complete: function(data) {                                                                
                       var json_data = JSON.parse(data.responseText)["d"];
                        //console.log(data);
                        //console.log(json_data);

                        if(json_data["FirstName"]) {                        
                            firstName = json_data["FirstName"];
                        }
                        if(json_data["LastName"]) { 
                            lastName = json_data["LastName"];
                        }
                        if(json_data["MobileNumber"]) { 
                            phone = json_data["MobileNumber"];
                        }
                        if(json_data["Country"]) { 
                            country = json_data["Country"];
                        }                                               
                    }
                });           
            }

            if(firstName) {                                
                populateField("profile.firstName", firstName);
                blockFieldControl("profile.firstName");                
            }

            if(lastName) {
                populateField("profile.lastName", lastName);
                blockFieldControl("profile.lastName");                
            }

            if(phone) {                
                populateField("profile.phones.number", phone);
                blockFieldControl("profile.phones.number");
            }
            if(country) {                
               
               	if(document.getElementById("gigya-dropdown-88650221655214600")) {
                	document.getElementById("gigya-dropdown-88650221655214600").value = country;
                }                                                               
            }else {            
            	if(phone.includes('+')) { 
                    if(document.getElementById("gigya-dropdown-88650221655214600")) {                    	                       
                        document.getElementById("gigya-dropdown-88650221655214600").value = setCountryFromPhone(phone);
                    }
                }
            }
        }
                      
        else if(event.currentScreen === 'gigya-subscribe-with-email-screen' && !url_token && channel === 'BRANDING') {
            addNewField(event);            
        }
        
        if($('.subscribe-thank-you.cdp-liteRegistrationLanding-thank-you-msg p').html() && channel === 'BRANDING') {
            removeNewField(event);
        }
        
        function populateField(fieldName, value) {
            document.getElementsByName(fieldName)[0].setAttribute("value", value);
            document.getElementsByName(fieldName)[0].setAttribute("data-original-value", value);

            document.getElementsByName(fieldName)[1].setAttribute("value", value);
            document.getElementsByName(fieldName)[1].setAttribute("data-original-value", value);
        }
        
        function blockFieldControl(fieldName) {
            document.getElementsByName(fieldName)[0].readOnly = true;
            document.getElementsByName(fieldName)[1].readOnly = true;
        }
        
        function hideFieldControl(fieldName) {
            document.getElementsByName(fieldName)[0].style.display = 'none';
            document.getElementsByName(fieldName)[1].style.display = 'none';        
        }  
        
        function setCountryFromPhone(phone) {
            
            var country;            
            
            switch (true) {
                case phone.startsWith("+591"):
                    country = "BO";
                    break;
                case phone.startsWith("+55"):
                    country = "BR";
                    break;
                case phone.startsWith("+56"):
                    country = "CL";
                    break;
                case phone.startsWith("+57"):
                    country = "CO";
                    break;
                case phone.startsWith("+506"):
                    country = "CR";
                    break;
                case phone.startsWith("+593"):
                    country = "EC";
                    break;
                case phone.startsWith("+503"):
                    country = "SV";
                    break;
                case phone.startsWith("+1"):
                    country = "US";
                    break;
                case phone.startsWith("+502"):
                    country = "GT";
                    break;
                case phone.startsWith("+52"):
                    country = "MX";
                    break;
                case phone.startsWith("+507"):
                    country = "PA";
                    break;
                case phone.startsWith("+51"):
                    country = "PE";
                    break;
                case phone.startsWith("+1"):
                    country = "PR";
                    break;
                case phone.startsWith("+809"):
                    country = "DO";
                    break;              
                default:
                    break;
            }
            return country;
        }

    },

    // Called when a field is changed in a managed form.
    onFieldChanged: function(event) {
    	//console.log(event);
    },

    // Called when a user clicks the "X" (close) button or the screen is hidden following the end of the flow.
    onHide: function(event) {
    }
    
}
