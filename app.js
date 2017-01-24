var express = require("express");
var http = require("http");
var path = require("path");
app = express();
app.listen(8080);

app.use(express.static(path.join(__dirname, 'public')));

app.engine("ejs", require("ejs-locals"));
app.set("views", __dirname + "/templates");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	
	res.render("index", {title: "Home page"});
	res.end();
});

app.get("/graph", function (req, res) {
	res.render("graph", {title: "Graph"});
	res.end();
});

app.get("/about", function (req, res) {
	res.render("about", {title: "About app"});
	res.end();
});


console.log("Server run ...");