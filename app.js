var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var ejs = require("ejs");

/*
var fs = require('fs');
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
	console.log(dataJson);
	
	ejs.renderFile('./templates/graph.ejs', {
						title: "Graph", 
						graphType: graphType, 
						dataJson : dataJson,
						method : req.method
						}, function(err, resault) {
	    // render on success
	    if (resault) {
	       html = resault;
	      
	res.render("graph", {
						title: "Graph", 
						graphType: graphType, 
						dataJson : dataJson,
						method : req.method
						});

	    }
	    // render or error
	    else {
	       console.log(err);
	    }
	});


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