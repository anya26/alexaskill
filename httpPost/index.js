'use strict';

var http = require('http');
var Alexa = require("alexa-sdk");
var jsonObject = JSON.stringify({
    "state" : true
});

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
      this.emit('UnlockIntent');
    },
    
    'UnlockIntent': function(){
            var optionspost = {
                //http://irt-ap.cs.columbia.edu:8888/actuator/lock
                host : 'irt-ap.cs.columbia.edu',
                port : 8888,
                path : '/actuator/lock',
                method : 'POST',
                headers:{
                "content-type":"application/json"}
            };

            var reqPost = http.request(optionspost, function(res) {
                console.log("statusCode: ", res.statusCode);
           
                res.on('data', function(d) {
                    console.info('POST result:\n');
                    process.stdout.write(jsonObject);
                    console.info('\n\nPOST completed');
                });
            
            });
            reqPost.end(jsonObject);
            this.response.speak("door is unlocked");
            this.emit(':responseReady');
    },
    
}
