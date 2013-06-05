/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 14:31:37 CEST 2013 */

if (typeof mediators == "undefined")
	var mediators = {};

mediators.ModalMediator = function() {
	this.body = null;
	this._loadedMedatior = null;
	this.saveBtn = null;
	this.closeBtn = null;
	this.title = null;
	this.appBus = null;
	this.modal = null;
	randori.behaviors.AbstractMediator.call(this);
	
};

mediators.ModalMediator.prototype.onRegister = function() {
	this.appBus.showModal.add($createStaticDelegate(this, this.openModal));
	this.saveBtn.click($createStaticDelegate(this, this.saveBtnClickedHandler));
	this.closeBtn.click($createStaticDelegate(this, this.closeBtnClickedHandler));
};

mediators.ModalMediator.prototype.onDeregister = function() {
	this.appBus.showModal.remove($createStaticDelegate(this, this.openModal));
};

mediators.ModalMediator.prototype.closeBtnClickedHandler = function(e) {
	this.closeModal();
};

mediators.ModalMediator.prototype.closeModal = function() {
	this.modal.modal("hide");
	this.body.popView();
};

mediators.ModalMediator.prototype.saveBtnClickedHandler = function(e) {
	this._loadedMedatior.save();
	this.closeModal();
};

mediators.ModalMediator.prototype.openModal = function(url, titleString) {
	this.title.html(titleString);
	this.loadView(url);
};

mediators.ModalMediator.prototype.loadView = function(url) {
	this.body.pushView(url).then($createStaticDelegate(this, this.viewPushedHandler));
};

mediators.ModalMediator.prototype.viewPushedHandler = function(mediator) {
	this._loadedMedatior = mediator;
	this.modal.modal();
};

$inherit(mediators.ModalMediator, randori.behaviors.AbstractMediator);

mediators.ModalMediator.className = "mediators.ModalMediator";

mediators.ModalMediator.getClassDependencies = function(t) {
	var p;
	return [];
};

mediators.ModalMediator.injectionPoints = function(t) {
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
			p.push({n:'modal'});
			p.push({n:'title'});
			p.push({n:'body', t:'randori.behaviors.ViewStack'});
			p.push({n:'saveBtn'});
			p.push({n:'closeBtn'});
			break;
		default:
			p = [];
			break;
	}
	return p;
};

