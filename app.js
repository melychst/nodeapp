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

	/*	
	var htmlStub = fs.readFileSync(__dirname + "/templates/pdf-template.html").toString();
	var imgSrc = 'file://' + __dirname + '/public/image/logo.png';
	imgSrc = path.normalize(imgSrc);

	jsdom.env({
		features : { QuerySelector : true }
		, html : htmlStub
		, scripts: ["http://code.jquery.com/jquery.js"]
		, done : function(errors, window) {
			// this callback function pre-renders the dataviz inside the html document, then export result into a static file
			var $ = window.$;

			$(".logo").append("<img src='" + imgSrc + "'>");

			var graph = window.document.querySelector('graph')
			
			var htmlPdf = FirstGraph(dataJson);

	var data = JSON.parse(dataJson);
		var scale = 10;
	 	var max = d3.max(data);
	 	var w = 500;
	 	var h = max * scale + 50;
	 	var barPadding = 1;

		var svg = d3.select(graph).append("svg:svg").attr("width", w).attr("height", h);
		svg.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("width", function(d) {
				    var count = data.length;
				    var width = w - ((count - 1) * 2);
				    return width / count  + "px";
				})
			.attr("height", function(d) {
				    return d*scale + "px";
				})
			.attr("x", function (d, i) {
					var count = data.length;
				    var width = (w - ((count - 1) * 2)) / count;
					return (i* (width + 2)) ;
			})
			.attr("y", function (d) {
				return h - d*scale;
			})
			.style("fill", function (d, i) {
				return "rgb(10, 10," + d * 10 +  ")";
			});

			svg.selectAll("text")
		   .data(data)
		   .enter()
		   .append("text")
		   .text(function(d) {
		   		return d;
		   })
		   .attr("text-anchor", "middle")
		   .attr("x", function(d, i) {
		   		return i * (w / data.length) + (w / data.length - barPadding) / 2;
		   })
		   .attr("y", function(d) {
		   		return h - (d * scale) + 24;
		   })
		   .attr("font-family", "sans-serif")
		   .attr("font-size", "18px")
		   .attr("fill", "white");


			// save result in an html file, we could also keep it in memory, or export the interesting fragment into a database for later use
			var htmlPdf = window.document.documentElement.innerHTML; 



		} // end jsDom done callback */
		var link = __dirname;

		FirstGraph(dataJson, link, function (arg) {
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
		});
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