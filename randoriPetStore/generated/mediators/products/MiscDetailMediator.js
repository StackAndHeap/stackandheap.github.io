/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 14:31:37 CEST 2013 */

if (typeof mediators == "undefined")
	var mediators = {};
if (typeof mediators.products == "undefined")
	mediators.products = {};

mediators.products.MiscDetailMediator = function() {
	this.miscService = null;
	this.aboutTxt = null;
	this.quantityTxt = null;
	this.animalTxt = null;
	this.appBus = null;
	this.nameTxt = null;
	this._data = null;
	this.pictureImg = null;
	randori.behaviors.AbstractMediator.call(this);
	
};

mediators.products.MiscDetailMediator.prototype.AnimalDetailMediator = function() {
};

mediators.products.MiscDetailMediator.prototype.render = function() {
	this.nameTxt.set_value(this._data.name);
	this.nameTxt.set_dataField("name");
	this.quantityTxt.set_value("" + this._data.quantity);
	this.quantityTxt.set_dataField("quantity");
	this.quantityTxt.set_type("number");
	this.animalTxt.set_value(this._data.animal);
	this.animalTxt.set_dataField("animal");
	this.aboutTxt.set_value(this._data.about);
	this.aboutTxt.set_dataField("about");
	this.pictureImg.set_url(this._data.picture_large);
};

mediators.products.MiscDetailMediator.prototype.onRegister = function() {
	this.nameTxt.valueCommit.add($createStaticDelegate(this, this.saveValue));
	this.quantityTxt.valueCommit.add($createStaticDelegate(this, this.saveValue));
	this.animalTxt.valueCommit.add($createStaticDelegate(this, this.saveValue));
	this.aboutTxt.valueCommit.add($createStaticDelegate(this, this.saveValue));
};

mediators.products.MiscDetailMediator.prototype.onDeregister = function() {
	this.nameTxt.valueCommit.remove($createStaticDelegate(this, this.saveValue));
	this.quantityTxt.valueCommit.remove($createStaticDelegate(this, this.saveValue));
	this.animalTxt.valueCommit.remove($createStaticDelegate(this, this.saveValue));
	this.aboutTxt.valueCommit.remove($createStaticDelegate(this, this.saveValue));
};

mediators.products.MiscDetailMediator.prototype.saveValue = function(value, dataField) {
	this.miscService.save(this._data.id, value, dataField);
	this._data[dataField] = value;
	if (dataField == "name") {
		this.appBus.nameChanged.dispatch(this._data, "misc");
	}
};

mediators.products.MiscDetailMediator.prototype.setData = function(value) {
	this.miscService.getById(value.id).then($createStaticDelegate(this, this.dataReceivedHandler));
};

mediators.products.MiscDetailMediator.prototype.dataReceivedHandler = function(data) {
	this._data = data;
	this.render();
};

$inherit(mediators.products.MiscDetailMediator, randori.behaviors.AbstractMediator);

mediators.products.MiscDetailMediator.className = "mediators.products.MiscDetailMediator";

mediators.products.MiscDetailMediator.getClassDependencies = function(t) {
	var p;
	return [];
};

mediators.products.MiscDetailMediator.injectionPoints = function(t) {
	var p;
	switch (t) {
		case 1:
			p = randori.behaviors.AbstractMediator.injectionPoints(t);
			p.push({n:'miscService', t:'services.MockMiscService', r:0, v:null});
			p.push({n:'appBus', t:'eventBus.AppEventBus', r:0, v:null});
			break;
		case 2:
			p = randori.behaviors.AbstractMediator.injectionPoints(t);
			break;
		case 3:
			p = randori.behaviors.AbstractMediator.injectionPoints(t);
			p.push({n:'nameTxt', t:'behaviors.components.TextInput'});
			p.push({n:'quantityTxt', t:'behaviors.components.TextInput'});
			p.push({n:'animalTxt', t:'behaviors.components.TextInput'});
			p.push({n:'aboutTxt', t:'behaviors.components.TextArea'});
			p.push({n:'pictureImg', t:'behaviors.components.Image'});
			break;
		default:
			p = [];
			break;
	}
	return p;
};

