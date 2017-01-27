var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var fs = require('fs');
var pdf = require('html-pdf');
//var jsdom = require('jsdom');
//var d3 = require('d3');
var FirstGraph = require("./mod/FirstGraph.js");
var SecondGraph = require("./mod/SecondGraph.js");

app = express();
//var request = require("./request");
app.listen(8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine("ejs", require("ejs-locals"));
app.set("views", __dirname + "/templates");
app.set("view engine", "ejs");

app.get("/", function(req, res) {	
	res.render("index", {title: "Home page"});
	//res.end();
});

app.get("/graph", function (req, res) {
	res.render("graph", {title: "Graph", method : req.method});
});

app.post("/graph", function (req, res, next) {
	var graphType = req.body.graphType;
	var dataJson = req.body.dataJson;
	
	var link = __dirname;

var getPDF =  function savePDF (arg) {
				var options = {
					"format": 'Letter',
					"orientation": "portrait",
					"header": {
						"contents": "",
						"height": "1mm"
					},
					"footer": {
						"height": "50mm",
						"contents": "Some text for footer and copyright"
					}
				}

				pdf.create(arg, options)
					.toFile('./tpm/graph.pdf', function(err, res) {
							if (err) return console.log(err);
					
							console.log(res); // { filename: '/app/businesscard.pdf' } 
					});
				}



		switch (graphType) {
			
			case "1" : FirstGraph(dataJson, link, getPDF);  break;

			case "2" :  SecondGraph(dataJson, link, getPDF);	break;

			default : console.log("cccc");

		}

	res.render("graph", {
				title: "Graph", 
				graphType: graphType, 
				dataJson : dataJson,
				method : req.method
				});
}); // end POST 

app.get("/about", function (req, res) {	
	res.render("about", {title: "About app"});
});


console.log("Server run ...");