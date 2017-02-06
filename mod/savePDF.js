var pdf = require('html-pdf');	
var constant = require("./constants.js");
var sendRes = require("./sendRes"); 

function savePDF(htmlTemplate, res) {
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
	
	pdf.create(htmlTemplate, options)
		.toFile('./tmp/graph_'+nameFile+'.pdf', function(err, file) {
			if (err) return console.log(err);
			
			console.log(file); //file path 
			var time = new Date();
			console.log("Finish create file graph_" + nameFile +" -> " + time.getMinutes() + " : " + time.getSeconds() + " : " + time.getMilliseconds());
			
			sendRes(file.filename, res);
		});
}

module.exports = savePDF;