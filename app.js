var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");

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