var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var ejs = require("ejs");

app = express();
app.listen(8080);

var constant = require("./mod/constants.js");
var FirstGraph = require("./mod/columnChart.js");
var SecondGraph = require("./mod/donutChart.js");
var validation = require("./mod/validate");
var savePDF = require("./mod/savePDF");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine("ejs", require("ejs-locals"));
app.set("views", __dirname + "/templates");
app.set("view engine", "ejs");

function sendRes(res) {
	var statusResponse = {};

	statusResponse.status = constant.STATUS_GRAPH_IS_READY;
	statusResponse.message = "Ok. graph is ready";			

	res
		.status(200)
		.type("json")
		.send(JSON.stringify(statusResponse))
		.end();  
}

app.post("/graph", function (req, res, next) {

	var statusResponse = validation(req.body);
	//console.log(statusResponse);
	if ( ( statusResponse.status != constant.STATUS_DATA_OK ) ) {
		res
			.status(402)
			.type("json")
			.send(JSON.stringify(statusResponse))
			.end();
	
	} else {

		var graphType = req.body.graph;
		var dataJson = req.body.data;
		var link = __dirname;

		switch (graphType) {
			
			case 1 : FirstGraph(dataJson, link, savePDF);
				 	 sendRes(res);			
					 break;

			case 2 : SecondGraph(dataJson, link, savePDF);
					 sendRes(res);	
					 break;

			default : res
						.status(401)
						.type("json")
						.send(statusResponse);
		}
	}
});

console.log("Server run ...");