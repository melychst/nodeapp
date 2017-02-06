var constant = require("./constants.js");

function sendRes(file, res) {
	var statusResponse = {};

	statusResponse.status = constant.STATUS_GRAPH_IS_READY;
	statusResponse.message = "Ok. graph is ready";
	statusResponse.path = file;			

	res
		.status(200)
		.type("json")
		.send(JSON.stringify(statusResponse))
		.end();  
}

module.exports = sendRes;