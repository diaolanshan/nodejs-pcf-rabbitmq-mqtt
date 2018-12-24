const  restify = require('restify');

// local enviroment or cloud environment
const  port = process.env.VCAP_APP_PORT || 3000
const  ip_address = process.env.VCAP_APP_HOST || 'localhost'


var server = restify.createServer({
    name : "nodejs-pcf-rabbitmq-mqtt"
});
 
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
// server.use(restify.plugins.CORS());

const PUB_PATH = '/mqtt/rabbitmq/message/pub'
const SUB_PATH = '/mqtt/rabbitmq/message/sub'

server.get({path : PUB_PATH , version: '0.0.1'}, pub_message);
server.get({path : SUB_PATH , version: '0.0.1'}, sub_message);

const cfenv = require("cfenv");
const appEnv = cfenv.getAppEnv();
var url = '';

// Publish a message to the solace broker
function pub_message(req, res, next){
	var client = require('./client.js')
	client.publish();
	res.send(200 , 'success');
	return next();
}

// Receive a message from solace.
function sub_message(req, res, next){
	var client = require('./client.js')
	console.log(client.subscribe());
	res.send(200 , 'success');
	return next();
}

server.listen(port ,ip_address, function(){
    console.log('%s listening at %s ', server.name , server.url);
});
