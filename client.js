var mqtt = require('mqtt'), url = require('url');
// Parse

const cfenv = require("cfenv");
const appEnv = cfenv.getAppEnv();

// get the service variables by name
var services = appEnv.getServices();
for (var service in services){
  if (services[service].tags.indexOf('rabbitmq') > -1){
    var host = services[service].credentials.protocols.mqtt.host;
    var username = services[service].credentials.protocols.mqtt.username;
    var password = services[service].credentials.protocols.mqtt.password;
    var port =  services[service].credentials.protocols.mqtt.port;
    break;
  }
}

var url = "mqtt://" + host;

function subscribe(){
  var options = {
    port: port,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: username,
    password: password,
  };
  // Create a client connection
  var client = mqtt.connect(url, options);

  client.on('connect', function() { // When connected

    // subscribe to a topic
    client.subscribe('hello/world', function() {
      // when a message arrives, do something with it
      client.on('message', function(topic, message, packet) {
        console.log("Received '" + message + "' on '" + topic + "'");
        return message;
      });
    });
  });
}

function publish(){
  var options = {
    port: port,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: username,
    password: password,
  };
  // Create a client connection
  var client = mqtt.connect(url, options);

  client.on('connect', function() { // When connected
    // publish a message to a topic
    client.publish('hello/world', 'my message', function() {
      console.log("Message is published");
      client.end(); // Close the connection when published
    });
  });
}

module.exports ={
  subscribe, 
  publish
}