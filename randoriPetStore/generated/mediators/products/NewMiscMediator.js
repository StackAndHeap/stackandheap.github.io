/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 14:31:37 CEST 2013 */

if (typeof mediators == "undefined")
	var mediators = {};
if (typeof mediators.products == "undefined")
	mediators.products = {};

mediators.products.NewMiscMediator = function() {
	this.miscService = null;
	this.aboutTxt = null;
	this.quantityTxt = null;
	this.animalTxt = null;
	this.appBus = null;
	this.nameTxt = null;
	randori.behaviors.AbstractMediator.call(this);
	
};

mediators.products.NewMiscMediator.prototype.onRegister = function() {
};

mediators.products.NewMiscMediator.prototype.onDeregister = function() {
};

mediators.products.NewMiscMediator.prototype.save = function() {
	var misc = {};
	misc.name = this.nameTxt.val();
	misc.animal = this.animalTxt.val();
	misc.quantity = this.quantityTxt.val();
	misc.about = this.aboutTxt.val();
	this.miscService.addNew(misc).then($createStaticDelegate(this, this.sendReloadEvent));
};

mediators.products.NewMiscMediator.prototype.sendReloadEvent = function() {
	this.appBus.reloadData.dispatch();
};

$inherit(mediators.products.NewMiscMediator, randori.behaviors.AbstractMediator);

mediators.products.NewMiscMediator.className = "mediators.products.NewMiscMediator";

mediators.products.NewMiscMediator.getClassDependencies = function(t) {
	var p;
	return [];
};

mediators.products.NewMiscMediator.injectionPoints = function(t) {
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
			p.push({n:'nameTxt'});
			p.push({n:'animalTxt'});
			p.push({n:'quantityTxt'});
			p.push({n:'aboutTxt'});
			break;
		default:
			p = [];
			break;
	}
	return p;
};

