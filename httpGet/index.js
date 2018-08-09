'use strict';
var Alexa = require("alexa-sdk");
var http = require("http");

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var jsonObject = JSON.stringify({
    "state" : true
});

console.log(jsonObject);

var handlers = {
   
    'LaunchRequest': function () {
      this.emit('DoorStatusIntent');
    },
    
    'DoorStatusIntent': function () {
       
      console.log("enter intent");
         
        //http://irt-ap.cs.columbia.edu:8888/sensor/open
        var options = {
          host: 'irt-ap.cs.columbia.edu',
          method: 'GET',
          port:8888,
          path: '/sensor/open'
          
        }
        
        var req = http.request(options, res => {
            res.setEncoding('utf8');
            var returnData = "";
            
            
            res.on('data', status => {
                returnData = returnData + status;
                console.log(returnData);
            });

            res.on('end', () => {
               var result = JSON.parse(returnData);
               if (result.state ==true){
                  this.response.speak("The door is open");
                  this.emit(':responseReady');
               }
               else{
                  this.response.speak("No, the door is closed");
                  this.emit(':responseReady');
               }
               
            });

        });
       req.end();

    },
    
     'SessionEndedRequest' : function() {
        console.log('Session ended');
     },
     'AMAZON.StopIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
     },
     'AMAZON.HelpIntent' : function() {
        this.response.speak("Help");
        this.emit(':responseReady');
     },
     'AMAZON.CancelIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
     },
    'Unhandled' : function() {
       this.response.speak("Sorry, I didn't get that.");
      //  console.log("test");
    }
};


