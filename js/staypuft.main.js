var staypuft = staypuft || {};

staypuft = {

    watchPage: function (url, option) {
        var self = this;
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        
        http.onreadystatechange = function() { 
            if(http.readyState === 4 && http.status === 200) {

                var parser = new DOMParser ();
                var responseDoc = parser.parseFromString (http.responseText, "text/html");
                var opts = responseDoc.getElementsByTagName('option');
                var matchFound = false;

                if(opts) {
                    for(var i=0; i < opts.length; i++) {
                        if(opts[i].text.trim().indexOf(option) > -1) {
                            self.addItem(opts[i].value);
                            matchFound = true;
                            clearInterval(self.iVal);
                            break;
                        }    
                    }
                } else {
                    console.log('[STATUS]: FAIL -- Items were found but correct variant was not. Please try another');
                }

                if(matchFound) {
                    console.log('[STATUS]: SUCCESS -- Item and correct variant found');
                } else {
                    console.log('[STATUS]: FAIL -- Item not found.');
                }

            }
        };
        http.send();          
    
    }, 
    
    addItem: function (id) {
        var self = this;
        var http = new XMLHttpRequest();
        var url = this.config.addToCartURL;
        http.open("POST", url, true);

        var params = self.config.addToCartIDParam + "=" + id;
        
        for(var i in self.config.additionalAddToCartParams) {
            params += "&" + i + "=" + self.additionalAddToCartParams[i];
        }

        console.log('Attempting to add with params:' + params);

        //Send the proper header information along with the request
        http.setRequestHeader('Access-Control-Allow-Origin', '*');
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        http.onreadystatechange = function() { 
            if(http.readyState === 4 && http.status === 200) {
                console.log('Success with id - ' + id);
                
                if(self.config.attemptCheckout) {
                    self.checkout("POST", self.config.checkoutURL, self.config.checkoutParams, self.config.checkoutRedirect);
                } else {
                   self.redirect(self.config.checkoutRedirect);
                }
            }
        };
        http.send(params);      

    },
    
    redirect: function(url){
        window.location.href = url;
    },
    
    checkout: function (reqType, url, paramObj, redirect){

        var http = new XMLHttpRequest();

        if(typeof reqType === "undefined") {
            reqType = "GET";
        }

        http.open(reqType, url, true);

        //params 
        var params = "";

        for(var i in paramObj) {
            params += i + "=" + paramObj[i];
        }

        //Send the proper header information along with the request
        http.setRequestHeader('Access-Control-Allow-Origin', '*');
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        http.onreadystatechange = function() { 
            if(http.readyState === 4 && http.status === 200) {
                
                if(redirect) {
                    console.log('Redirecting to checkout portal...');
                    window.location.href = redirect;
                }
            }
        };
        http.send(params); 
    }   
};

console.log('staypuft.main.loaded...');