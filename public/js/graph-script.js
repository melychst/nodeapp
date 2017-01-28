
	function firstGraph (data) {
 	
 	var scale = 10;
 	var max = Math.max.apply(null, data); 
 	var w = 600;
 	var h = max * scale + 50;
 	var barPadding = 1;

 		var svg = d3.select("graph").append("svg").attr("width", w).attr("height", h);
			svg.selectAll("rect")
				.data(data)
				.enter()
				.append("rect")
				.attr("width", function(d) {
					    var count = data.length;
					    var width = 600 - ((count - 1) * 2);
					    return width / count  + "px";
					})
				.attr("height", function(d) {
					    return d*scale + "px";
					})
				.attr("x", function (d, i) {
						var count = data.length;
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
	}

	function secondGraph (data) {
		
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

			var svg = d3.select("graph").append("svg")
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
	}

	function thirdGraph (data) {
		alert("Third");
	}

