var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var fs = require('fs');
var pdf = require('html-pdf');

app = express();
app.listen(8080);


//var jsdom = require('jsdom');
//var d3 = require('d3');
var FirstGraph = require("./mod/FirstGraph.js");
var SecondGraph = require("./mod/SecondGraph.js");
var validation = require("./mod/validate");

//var request = require("./request");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine("ejs", require("ejs-locals"));
app.set("views", __dirname + "/templates");
app.set("view engine", "ejs");

/*
app.get("/", function(req, res) {	
	res.render("index", {title: "Home page"});
	//res.end();
});
*/
/*
app.get("/graph", function (req, res) {
	res.render("graph", {title: "Graph", method : req.method});
});
*/

app.post("/graph", function (req, res, next) {
	
	var statusResponse = validation(req.body);

	//console.log("After valodate -> " + statusResponse);

	if ( (statusResponse.status == 8) || (statusResponse.status == 0) ) {
		res
			.status(400)
			.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
			.type("json")
			.send(JSON.stringify(statusResponse))
			.end();
	
	} else {

	var graphType = req.body.graph;
	var dataJson = req.body.data;
	
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

				var time = new Date();

				var nameFile = time.getMinutes() + time.getSeconds()+time.getMilliseconds();
				console.log("Run create file graph_" + nameFile +" -> " + time.getMinutes() + " : " + time.getSeconds() + " : " + time.getMilliseconds());
				
				pdf.create(arg, options)
					.toFile('./tmp/graph_'+nameFile+'.pdf', function(err, resp) {
							if (err) return console.log(err);
							console.log(resp); // { filename: '/app/businesscard.pdf' } 
							
							var time = new Date();
							console.log("Finish create file graph_" + nameFile +" -> " + time.getMinutes() + " : " + time.getSeconds() + " : " + time.getMilliseconds());
					});

					statusResponse.status = 200;
					statusResponse.message = "Ok. graph type "+ graphType +" is ready";

					res
					.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
					.type("json")
					.send(JSON.stringify(statusResponse))
					.end();
				}
		
		switch (graphType) {
			
			case 1 : FirstGraph(dataJson, link, getPDF);  
												
												break;

			case 2 : SecondGraph(dataJson, link, getPDF);	
												//
												break;

			default : res.send(req.body);

		}
	}

}); // end POST 

/*
app.get("/about", function (req, res) {	
	res.render("about", {title: "About app"});
});
*/

console.log("Server run ...");