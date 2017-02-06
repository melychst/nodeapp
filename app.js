var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var ejs = require("ejs");

app = express();
app.listen(8080);

var constant = require("./mod/constants.js");
var columnChart = require("./mod/columnChart.js");
var donutChart = require("./mod/donutChart.js");
var validation = require("./mod/validate");
var savePDF = require("./mod/savePDF");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine("ejs", require("ejs-locals"));
app.set("views", __dirname + "/templates");
app.set("view engine", "ejs");

app.post("/graph", function (req, res, next) {

	var statusResponse = validation(req.body);
	//console.log(statusResponse);
	if ( ( statusResponse.status != constant.STATUS_DATA_OK ) ) {
		res
			.status(400)
			.type("json")
			.send(JSON.stringify(statusResponse))
			.end();
	
	} else {

		var graphType = req.body.graph;
		var dataJson = req.body.data;
		var link = __dirname;

		switch (graphType) {
			
			case 1 : columnChart(dataJson, link, savePDF, res);
					 break;

			case 2 : donutChart(dataJson, link, savePDF, res);
					 break;

			default : res
						.status(400)
						.type("json")
						.send(statusResponse);
		}
	}
});

console.log("Server run ...");