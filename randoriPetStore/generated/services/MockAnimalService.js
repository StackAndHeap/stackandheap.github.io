/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 14:31:37 CEST 2013 */

if (typeof services == "undefined")
	var services = {};

services.MockAnimalService = function() {
this.source = "assets\/data\/animals50.json";
this.jsonService = null;
this._filter = null;
this._data = null;
};

services.MockAnimalService.prototype.loadJSON = function() {
	var promise = this.jsonService.get(this.source, new services.json.parsers.AnimalParser());
	promise.then($createStaticDelegate(this, this.handleResult));
	return promise;
};

services.MockAnimalService.prototype.handleResult = function(data) {
	this._data = data;
};

services.MockAnimalService.prototype.getAll = function() {
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

services.MockAnimalService.prototype.getById = function(id) {
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

services.MockAnimalService.prototype.get = function(filter) {
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

services.MockAnimalService.prototype.filterFunction = function(element, index, array) {
	var returnVal;
	returnVal = element["name"].toLowerCase().indexOf(this._filter.toLowerCase()) >= 0 ? true : false;
	if (!returnVal)
		returnVal = element["age"] == this._filter;
	if (!returnVal)
		returnVal = element["animal"].toLowerCase().indexOf(this._filter.toLowerCase()) >= 0 ? true : false;
	return returnVal;
};

services.MockAnimalService.prototype.save = function(id, value, dataField) {
	for (var i = 0; i < this._data.length; i++) {
		var animal = this._data[i];
		if (animal.id == id) {
			animal[dataField] = value;
		}
	}
};

services.MockAnimalService.prototype.addNew = function(animal) {
	var lastAnimal = this._data[(this._data.length - 1)];
	animal.id = lastAnimal.id + 1;
	animal.picture = "http:\/\/placehold.it\/512x512";
	animal.picture_large = "http:\/\/placehold.it\/512x512";
	this._data[this._data.length] = animal;
	var promise = new randori.async.Promise();
	var timer = new randori.timer.Timer(20, 1);
	timer.timerTick.add(function() {
		promise.resolve(true);
	});
	timer.start();
	return promise;
};

services.MockAnimalService.className = "services.MockAnimalService";

services.MockAnimalService.getClassDependencies = function(t) {
	var p;
	p = [];
	p.push('randori.timer.Timer');
	p.push('randori.async.Promise');
	p.push('services.json.parsers.AnimalParser');
	return p;
};

services.MockAnimalService.injectionPoints = function(t) {
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

