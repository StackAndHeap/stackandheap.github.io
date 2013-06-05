/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 15:07:08 CEST 2013 */

if (typeof services == "undefined")
	var services = {};
if (typeof services.json == "undefined")
	services.json = {};
if (typeof services.json.parsers == "undefined")
	services.json.parsers = {};

services.json.parsers.AnimalParser = function() {
};

services.json.parsers.AnimalParser.prototype.parseResult = function(result) {
	var json = JSON.parse(result);
	for (var i = 0; i < json.length; i++) {
		var animal = json[i];
		animal.picture = json[i]["picture"];
		animal.picture_large = json[i]["picture_large"];
	}
	return json;
};

services.json.parsers.AnimalParser.className = "services.json.parsers.AnimalParser";

services.json.parsers.AnimalParser.getClassDependencies = function(t) {
	var p;
	return [];
};

services.json.parsers.AnimalParser.injectionPoints = function(t) {
	return [];
};
