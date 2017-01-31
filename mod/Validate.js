function Validate (dataJson) {
	//console.log("Valid -> " + dataJson);
	var graphType = dataJson.graph;
	var dataJson = dataJson.data;

	var statusResponse = {};

	//console.log(graphType);

	if ( graphType && (graphType != "") ) {
		//console.log("OK");

		switch (graphType) {
			case 1 : 
					validFirstGaph(dataJson, statusResponse);
					break;

			case 2 : 
					validSecondGaph(dataJson, statusResponse);
					break;
			default : 
					statusResponse["status"] = 8;
					statusResponse["message"] = "Sorry but type graph is wrong!";
					return statusResponse;
					break;
		}
	} else {
		console.log("ERROR");
	}
	//console.log("Status -> " + statusResponse);
	return statusResponse;
}

function validFirstGaph(dataJson, statusResponse) {
	dataJson.forEach(function (value) {
		if (!isNaN(parseFloat(value)) && isFinite(value))  {
			//console.log("Numeric -> " + value);
		} else {
			//console.log("NO NOMERIC");
			statusResponse.status = 0;
			statusResponse.message = "Sorry, data must be a numeric";
			return;
		}
	})
}

function validSecondGaph(dataJson, statusResponse) {
	dataJson.forEach(function (value) {
		if (!isNaN(parseFloat(value.population)) && isFinite(value.population))  {
			console.log("Numeric -> " + value);
		} else {
			console.log("NO NOMERIC");
			statusResponse.status = 0;
			statusResponse.message = "Sorry, 'population' field must be a numeric";
		}
	})
}

module.exports = Validate;