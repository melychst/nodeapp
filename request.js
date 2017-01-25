var express = require("express");

var request = function () {
	
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

}



module.exports = request;