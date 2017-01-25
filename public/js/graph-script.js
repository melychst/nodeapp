		var w = 600px;
		var h = 200px;	

	function firstGraph (data) {
 
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
			    var width = 600 - (count * 2);
			    return width / count  + "px";
			});
	}

	function secondGraph (data) {
		
	}

	function thirdGraph (data) {
		alert("Third");
	}

