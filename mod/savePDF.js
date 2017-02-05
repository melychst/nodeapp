var pdf = require('html-pdf');	

function savePDF(arg) {
	var options = {
		"format": 'Letter',
		"orientation": "portrait",
		"header": {
			"contents": "",
			"height": "1mm"
		},
		"footer": {
			"height": "50mm",
			"contents": "Some text for footer and copyright"
		}
	}

	var time = new Date();

	var nameFile = time.getMinutes() + time.getSeconds()+time.getMilliseconds();
	console.log("Run create file graph_" + nameFile +" -> " + time.getMinutes() + " : " + time.getSeconds() + " : " + time.getMilliseconds());
	
	pdf.create(arg, options)
		.toFile('./tmp/graph_'+nameFile+'.pdf', function(err, resp) {
				if (err) return console.log(err);
				console.log(resp); //file path  
				var time = new Date();
				console.log("Finish create file graph_" + nameFile +" -> " + time.getMinutes() + " : " + time.getSeconds() + " : " + time.getMilliseconds());
		});
}

module.exports = savePDF;