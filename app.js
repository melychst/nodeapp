var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var fs = require('fs');
var pdf = require('html-pdf');
var jsdom = require('jsdom');
var d3 = require('d3');

/*

var pdf = require('html-pdf');
var html = fs.readFileSync('./templates/businesscard.html', 'utf8');
var options = { format: 'Letter' };
 
pdf.create(html, options).toFile('./graph.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' } 
});
*/

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
	
htmlStub = '<html><head><style type="text/css">h1 {color:red; margin-left:100px; margin-top:50px;}</style></head>'+
						'<body><img src="/public/image/logo.jpg"><h1>Hello world!</h1><div id="dataviz-container"></div>' +
						'<script src="https://d3js.org/d3.v4.js"></script>' +
						'</body></html>';


		jsdom.env({
			features : { QuerySelector : true }
			, html : htmlStub
			, done : function(errors, window) {
			// this callback function pre-renders the dataviz inside the html document, then export result into a static file

				var el = window.document.querySelector('#dataviz-container')
					, body = window.document.querySelector('body')
					, circleId = 'a2324'  // say, this value was dynamically retrieved from some database

				// generate the dataviz
				d3.select(el)
					.append('svg:svg')
						.attr('width', 600)
						.attr('height', 300)
						.append('circle')
							.attr('cx', 300)
							.attr('cy', 150)
							.attr('r', 30)
							.attr('fill', '#26963c')
							.attr('id', circleId) // say, this value was dynamically retrieved from some database

				// make the client-side script manipulate the circle at client side)
				var clientScript = "d3.select('#" + circleId + "').transition().delay(1000).attr('fill', '#f9af26')"

				d3.select(body)
					.append('script')
						.html(clientScript)

				// save result in an html file, we could also keep it in memory, or export the interesting fragment into a database for later use
				var svgsrc = window.document.documentElement.innerHTML
				fs.writeFile('index.html', svgsrc, function(err) {
					if(err) {
						console.log('error saving document', err);
					} else {
var imgSrc = path.join('file://' + __dirname, '/public/image/logo.jpg');
//var imgSrc = 'file://' + __dirname + '/public/image/logo.jpg';
console.log(imgSrc);

imgSrc = path.normalize(imgSrc);

console.log(imgSrc);

var options = {
    "format": 'Letter',
    "orientation": "portrait",
    "header": {
    		"contents": "Hello world 7",
        "height": "90mm"
		  },
		  "footer": {
		    "contents": "Some text for footer"
		  }
		}
 
pdf.create("<div id='pageHeader'><img src='" + imgSrc + "' /><div style='text-align: center;'>Author: Marc Bachmann</div></div>", options).toFile('./graph_new.pdf', function(err, res) {
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
});

app.get("/about", function (req, res) {	
	res.render("about", {title: "About app"});
});



console.log("Server run ...");