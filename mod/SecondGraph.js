var d3 = require('d3');
var jsdom = require('jsdom');
var fs = require("fs");
var path = require("path");

function SecondGraph (data, link, callback) {

	var htmlStub = fs.readFileSync(link + "/templates/pdf-template.html",'utf8');

	//console.log(htmlStub);
	var imgSrc = 'file://' + link + '/public/image/logo.png';
	imgSrc = path.normalize(imgSrc);

jsdom.env({
	features : { QuerySelector : true }
	, html : htmlStub
	, scripts: ["http://code.jquery.com/jquery.js"]
	, done : function(errors, window) {
		// this callback function pre-renders the dataviz inside the html document, then export result into a static file
		var $ = window.$;

		$(".logo").append("<img src='" + imgSrc + "'>");
		console.log(data);
		$("data").append("<div>" + data + "</div");
		var graph = window.document.querySelector('graph');

	 	var w = 640;
	 	var h = 320;
   		radius = Math.min(w, h) / 2;

		//var svg = d3.select(graph).append("svg:svg").attr("width", w).attr("height", h);
		
		var color = d3.scale.ordinal()
    				.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

			var arc = d3.svg.arc()
			    .outerRadius(radius - 10)
			    .innerRadius(radius - 70);

			var pie = d3.layout.pie()
			    .sort(null)
			    .value(function(d) { return d.population; });

			var svg = d3.select(graph).append("svg")
			    .attr("width", w)
			    .attr("height", h)
			  	.append("g")
			    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

			  var g = svg.selectAll(".arc")
			    .data(pie(data))
			    .enter().append("g")
			    .attr("class", "arc");

			  g.append("path")
			      .attr("d", arc)
			      .style("fill", function(d) { return color(d.data.age); });

			  g.append("text")
			    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
			    .attr("dy", ".1em")
			    .attr("dx", "-1em")
			    .style("font-size", "10px")
			    .text(function(d) { return d.data.age; });


			// save result in an html file, we could also keep it in memory, or export the interesting fragment into a database for later use
			
			var htmlPdf = window.document.documentElement.innerHTML; 

	//console.log(htmlPdf);
				callback(htmlPdf);
			}
		}) // end jsDom done callback
}

module.exports = SecondGraph;