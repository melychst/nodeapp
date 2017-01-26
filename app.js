var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var fs = require('fs');
var pdf = require('html-pdf');
var jsdom = require('jsdom');
var d3 = require('d3');

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

	var imgSrc = 'file://' + __dirname + '/public/image/logo.png';
	imgSrc = path.normalize(imgSrc);
	
	var htmlStub = fs.readFileSync(__dirname + "/templates/pdf-template.html").toString();

	//console.log(htmlStub);

	jsdom.env({
		features : { QuerySelector : true }
		, html : htmlStub
		, scripts: ["http://code.jquery.com/jquery.js"]
		, done : function(errors, window) {
			// this callback function pre-renders the dataviz inside the html document, then export result into a static file
			var $ = window.$;

			$("h1").text("My name is Stepan");

			var graph = window.document.querySelector('graph')
				, body = window.document.querySelector('body')
				, circleId = 'a2324'  // say, this value was dynamically retrieved from some database

		var scale = 10;
	 	var max = d3.max(JSON.parse(dataJson));
	 	var w = 600;
	 	var h = max * scale + 50;
	 	var barPadding = 1;

		var svg = d3.select(graph).append("svg:svg").attr("width", w).attr("height", h);
		svg.selectAll("rect")
			.data(dataJson)
			.enter()
			.append("rect")
			.attr("width", function(d) {
				    var count = dataJson.length;
				    var width = 600 - ((count - 1) * 2);
				    return width / count  + "px";
				})
			.attr("height", function(d) {
				    return d*scale + "px";
				})
			.attr("x", function (d, i) {
					var count = dataJson.length;
				    var width = (600 - ((count - 1) * 2)) / count;
					return (i* (width + 2)) ;
			})
			.attr("y", function (d) {
				return h - d*scale;
			})
			.style("fill", function (d, i) {
				return "rgb(10, 10," + d * 10 +  ")";
			});

			svg.selectAll("text")
		   .data(dataJson)
		   .enter()
		   .append("text")
		   .text(function(d) {
		   		return d;
		   })
		   .attr("text-anchor", "middle")
		   .attr("x", function(d, i) {
		   		return i * (w / dataJson.length) + (w / dataJson.length - barPadding) / 2;
		   })
		   .attr("y", function(d) {
		   		return h - (d * scale) + 24;
		   })
		   .attr("font-family", "sans-serif")
		   .attr("font-size", "18px")
		   .attr("fill", "white");


			// generate the dataviz
			/*	d3.select(el)
				.append('svg:svg')
					.attr('width', 600)
					.attr('height', 300)
					.append('circle')
						.attr('cx', 300)
						.attr('cy', 150)
						.attr('r', 30)
						.attr('fill', '#26963c')
						.attr('id', circleId) // say, this value was dynamically retrieved from some database*/

			// make the client-side script manipulate the circle at client side)
			var clientScript = "d3.select('#" + circleId + "').transition().delay(1000).attr('fill', '#f9af26')"

			d3.select(body)
				.append('script')
					.html(clientScript)

			// save result in an html file, we could also keep it in memory, or export the interesting fragment into a database for later use
			var svgsrc = window.document.documentElement.innerHTML;

			fs.writeFile('index.html', svgsrc, function(err) {
				if(err) {
					console.log('error saving document', err);
				} else {

					var imgSrc = 'file://' + __dirname + '/public/image/logo.png';
					imgSrc = path.normalize(imgSrc);

					var options = {
						"format": 'Letter',
						"orientation": "portrait",
						"header": {
							"contents": "",
							"height": "50mm"
						},
						"footer": {
							"height": "50mm",
							"contents": "Some text for footer"
						}
					}

					htmlPdf = svgsrc;
					//var htmlPdf = "<div id='pageHeader'><img src='"+ imgSrc +"'/><div style='text-align: center;'>Author: Marc Bachmann</div></div>";
					pdf.create(htmlPdf, options)
						.toFile('./tpm/graph.pdf', function(err, res) {
			  				if (err) return console.log(err);
			 		
			 				console.log(res); // { filename: '/app/businesscard.pdf' } 
						});
					console.log('The file was saved!');
				}
			})	
		} // end jsDom done callback
	})

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