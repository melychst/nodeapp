
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

		/*
		d3.select("graph")
			.attr("class", "first-graph")
			.selectAll("div")
		    .data(data)
		    .enter()
		    .append("div")
		    .attr("class", "bar")
		    .style("height", function(d) {
			    return d*10 + "px";
			})
			.style("width", function(d) {
			    var count = data.length;
			    var width = 600 - ((count - 1) * 2);
			    return width / count  + "px";
			});
		*/
	}

	function secondGraph (data) {
		
	}

	function thirdGraph (data) {
		alert("Third");
	}

