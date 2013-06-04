/** Compiled by the Randori compiler v0.2.4 on Tue Jun 04 16:25:46 CEST 2013 */

if (typeof mediators == "undefined")
	var mediators = {};

mediators.LoginMediator = function() {
	this.button_login = null;
	this.appBus = null;
	randori.behaviors.AbstractMediator.call(this);
	
};

mediators.LoginMediator.prototype.onRegister = function() {
	this.button_login.click($createStaticDelegate(this, this.loginHandler));
};

mediators.LoginMediator.prototype.loginHandler = function() {
	this.appBus.login.dispatch();
};

mediators.LoginMediator.prototype.onDeregister = function() {
};

$inherit(mediators.LoginMediator, randori.behaviors.AbstractMediator);

mediators.LoginMediator.className = "mediators.LoginMediator";

mediators.LoginMediator.getClassDependencies = function(t) {
	var p;
	return [];
};

mediators.LoginMediator.injectionPoints = function(t) {
	var p;
	switch (t) {
		case 1:
			p = randori.behaviors.AbstractMediator.injectionPoints(t);
			p.push({n:'appBus', t:'eventBus.AppEventBus', r:0, v:null});
			break;
		case 2:
			p = randori.behaviors.AbstractMediator.injectionPoints(t);
			break;
		case 3:
			p = randori.behaviors.AbstractMediator.injectionPoints(t);
			p.push({n:'button_login'});
			break;
		default:
			p = [];
			break;
	}
	return p;
};

