var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var ejs = require("ejs");

app = express();
app.listen(8080);

var FirstGraph = require("./mod/FirstGraph.js");
var SecondGraph = require("./mod/SecondGraph.js");
var validation = require("./mod/validate");
var savePDF = require("./mod/savePDF");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine("ejs", require("ejs-locals"));
app.set("views", __dirname + "/templates");
app.set("view engine", "ejs");

function sendRes(graphType, res) {
	var statusResponse = {};
		statusResponse.status = 200;
		statusResponse.message = "Ok. graph is ready";			

		res
		.cookie('remember me', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
		.type("json")
		.append("Status", "Ok, graph " + graphType + " was built!")
		.send(JSON.stringify(statusResponse))
		.end();  
}



app.post("/graph", function (req, res, next) {
	//console.log(req.body);
	var statusResponse = validation(req.body);

	if ( (statusResponse.status == 8) || (statusResponse.status == 0) ) {
		res
			.status(400)
			.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
			.type("json")
			.append("ERROR", "The data not validate" )
			.send(JSON.stringify(statusResponse))
			.end();
	
	} else {

	var graphType = req.body.graph;
	var dataJson = req.body.data;
	var link = __dirname;


		switch (graphType) {
			
			case 1 : FirstGraph(dataJson, link, savePDF);
				 	 sendRes(graphType, res);			
					 break;

			case 2 : SecondGraph(dataJson, link, savePDF);
					 sendRes(graphType);	
					 break;

			default : res
						.status(400)
						.type("json")
						.append("ERROR", "Type graph is wrong!")
						.send(req.body);
		}
	}
});

console.log("Server run ...");