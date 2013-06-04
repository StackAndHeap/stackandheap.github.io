/** Compiled by the Randori compiler v0.2.4 on Tue Jun 04 16:25:46 CEST 2013 */

if (typeof services == "undefined")
	var services = {};
if (typeof services.json == "undefined")
	services.json = {};
if (typeof services.json.parsers == "undefined")
	services.json.parsers = {};

services.json.parsers.MiscParser = function() {
};

services.json.parsers.MiscParser.prototype.parseResult = function(result) {
	var json = JSON.parse(result);
	for (var i = 0; i < json.length; i++) {
		var misc = json[i];
		misc.picture = json[i]["picture"];
		misc.picture_large = json[i]["picture_large"];
	}
	return json;
};

services.json.parsers.MiscParser.className = "services.json.parsers.MiscParser";

services.json.parsers.MiscParser.getClassDependencies = function(t) {
	var p;
	return [];
};

services.json.parsers.MiscParser.injectionPoints = function(t) {
	return [];
};
