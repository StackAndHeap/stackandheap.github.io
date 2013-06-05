/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 14:31:37 CEST 2013 */

if (typeof services == "undefined")
	var services = {};

services.MockMiscService = function() {
	this.source = "assets\/data\/things.json";
	this.jsonService = null;
	this._filter = null;
	this._data = null;
	
};

services.MockMiscService.prototype.loadJSON = function() {
	var promise = this.jsonService.get(this.source, new services.json.parsers.MiscParser());
	promise.then($createStaticDelegate(this, this.handleResult));
	return promise;
};

services.MockMiscService.prototype.handleResult = function(data) {
	this._data = data;
};

services.MockMiscService.prototype.getAll = function() {
	var promise = new randori.async.Promise();
	if (this._data) {
		var data = this._data;
		var timer = new randori.timer.Timer(20, 1);
		timer.timerTick.add(function() {
			promise.resolve(data);
		});
		timer.start();
	} else {
		promise = this.loadJSON();
	}
	return promise;
};

services.MockMiscService.prototype.get = function(filter) {
	var promise, filteredData;
	promise = new randori.async.Promise();
	this._filter = filter;
	filteredData = this._filter.replace(" ", "") == "" ? this._data : this._data.filter($createStaticDelegate(this, this.filterFunction));
	var timer = new randori.timer.Timer(20, 1);
	timer.timerTick.add(function() {
		promise.resolve(filteredData);
	});
	timer.start();
	return promise;
};

services.MockMiscService.prototype.filterFunction = function(element, index, array) {
	var returnVal;
	returnVal = element["name"].toLowerCase().indexOf(this._filter.toLowerCase()) >= 0 ? true : false;
	if (!returnVal)
		returnVal = element["animal"].toLowerCase().indexOf(this._filter.toLowerCase()) >= 0 ? true : false;
	return returnVal;
};

services.MockMiscService.prototype.save = function(id, value, dataField) {
	for (var i = 0; i < this._data.length; i++) {
		var misc = this._data[i];
		if (misc.id == id) {
			misc[dataField] = value;
		}
	}
};

services.MockMiscService.prototype.getById = function(id) {
	var promise = new randori.async.Promise();
	var selectedItem;
	for (var i = 0; i < this._data.length; i++) {
		var item = this._data[i];
		if (item.id == id) {
			selectedItem = item;
		}
	}
	var timer = new randori.timer.Timer(20, 1);
	timer.timerTick.add(function() {
		promise.resolve(selectedItem);
	});
	timer.start();
	return promise;
};

services.MockMiscService.prototype.addNew = function(misc) {
	var lastMisc = this._data[(this._data.length - 1)];
	misc.id = lastMisc.id + 1;
	misc.picture = "http:\/\/placehold.it\/512x512";
	misc.picture_large = "http:\/\/placehold.it\/512x512";
	this._data[this._data.length] = misc;
	var promise = new randori.async.Promise();
	var timer = new randori.timer.Timer(20, 1);
	timer.timerTick.add(function() {
		promise.resolve(true);
	});
	timer.start();
	return promise;
};

services.MockMiscService.className = "services.MockMiscService";

services.MockMiscService.getClassDependencies = function(t) {
	var p;
	p = [];
	p.push('randori.timer.Timer');
	p.push('randori.async.Promise');
	p.push('services.json.parsers.MiscParser');
	return p;
};

services.MockMiscService.injectionPoints = function(t) {
	var p;
	switch (t) {
		case 1:
			p = [];
			p.push({n:'jsonService', t:'services.json.JsonService', r:0, v:null});
			break;
		default:
			p = [];
			break;
	}
	return p;
};

