/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 14:31:37 CEST 2013 */

if (typeof mediators == "undefined")
	var mediators = {};
if (typeof mediators.products == "undefined")
	mediators.products = {};

mediators.products.NewAnimalMediator = function() {
	this.genderDropdown = null;
	this.aboutTxt = null;
	this.ageTxt = null;
	this.animalTxt = null;
	this.appBus = null;
	this.animalService = null;
	this.nameTxt = null;
	randori.behaviors.AbstractMediator.call(this);
	
};

mediators.products.NewAnimalMediator.prototype.onRegister = function() {
};

mediators.products.NewAnimalMediator.prototype.onDeregister = function() {
};

mediators.products.NewAnimalMediator.prototype.save = function() {
	var animal = {};
	animal.name = this.nameTxt.val();
	animal.animal = this.animalTxt.val();
	animal.age = this.ageTxt.val();
	animal.gender = this.genderDropdown.val();
	animal.about = this.aboutTxt.val();
	this.animalService.addNew(animal).then($createStaticDelegate(this, this.sendReloadEvent));
};

mediators.products.NewAnimalMediator.prototype.sendReloadEvent = function() {
	this.appBus.reloadData.dispatch();
};

$inherit(mediators.products.NewAnimalMediator, randori.behaviors.AbstractMediator);

mediators.products.NewAnimalMediator.className = "mediators.products.NewAnimalMediator";

mediators.products.NewAnimalMediator.getClassDependencies = function(t) {
	var p;
	return [];
};

mediators.products.NewAnimalMediator.injectionPoints = function(t) {
	var p;
	switch (t) {
		case 1:
			p = randori.behaviors.AbstractMediator.injectionPoints(t);
			p.push({n:'animalService', t:'services.MockAnimalService', r:0, v:null});
			p.push({n:'appBus', t:'eventBus.AppEventBus', r:0, v:null});
			break;
		case 2:
			p = randori.behaviors.AbstractMediator.injectionPoints(t);
			break;
		case 3:
			p = randori.behaviors.AbstractMediator.injectionPoints(t);
			p.push({n:'nameTxt'});
			p.push({n:'animalTxt'});
			p.push({n:'ageTxt'});
			p.push({n:'genderDropdown'});
			p.push({n:'aboutTxt'});
			break;
		default:
			p = [];
			break;
	}
	return p;
};

