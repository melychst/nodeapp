var d3 = require('d3');
var jsdom = require('jsdom');
var fs = require("fs");
var path = require("path");

function FirstGraph (dataJson, link, callback) {

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

			var graph = window.document.querySelector('graph')
			
			
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

	//console.log(htmlPdf);
				callback(htmlPdf);
			}
		}) // end jsDom done callback
}

module.exports = FirstGraph;