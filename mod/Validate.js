var constant = require("./constants.js");

function Validate (dataJson) {

	var graphType = dataJson.graph;
	var dataJson = dataJson.data;

	var statusResponse = {};

	if ( (graphType != undefined) && (graphType != "") ) {

		switch (graphType) {
			case 1 : 
					validFirstGaph(dataJson, statusResponse);
					break;

			case 2 : 
					validSecondGaph(dataJson, statusResponse);
					break;
			default : 
					statusResponse.status = constant.STATUS_WRONG_TYPE_GRAPH;
					statusResponse.message = "Sorry, but type graph is wrong!";
					return statusResponse;
		}
	} else {
		statusResponse.status = constant.STATUS_NO_TYPE_GRAPH;
		statusResponse.message = "Sorry, but you need add type of graph!";
		return statusResponse;
	}
	statusResponse.status = constant.STATUS_DATA_OK;
	return statusResponse;
}

function validFirstGaph(dataJson, statusResponse) {
	dataJson.forEach(function (value) {
		if (isNaN(parseFloat(value)) && !isFinite(value))  {
			statusResponse.status = constant.STATUS_DATA_NO_NUMERIC;
			statusResponse.message = "Sorry, data '" + value + "' must be a numeric";
		}
	})
}

function validSecondGaph(dataJson, statusResponse) {
	dataJson.forEach(function (value) {
		if (isNaN(parseFloat(value.population)) && !isFinite(value.population))  {
			statusResponse.status = constant.STATUS_DATA_NO_NUMERIC;
			statusResponse.message = "Sorry, 'population' field '" + value.population + "' must be a numeric";
		}
	})
}

module.exports = Validate;