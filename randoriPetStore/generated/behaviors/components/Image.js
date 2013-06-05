/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 14:31:37 CEST 2013 */

if (typeof behaviors == "undefined")
	var behaviors = {};
if (typeof behaviors.components == "undefined")
	behaviors.components = {};

behaviors.components.Image = function() {
	this._url = null;
	this.urlChanged = null;
	randori.behaviors.AbstractBehavior.call(this);
	
};

behaviors.components.Image.prototype.get_url = function() {
	return this._url;
};

behaviors.components.Image.prototype.set_url = function(value) {
	this._url = value;
	this.urlChanged.dispatch();
};

behaviors.components.Image.prototype.render = function() {
	this.decoratedNode.empty();
	var img = jQuery("<img \/>");
	img.attr("src", this._url);
	this.decoratedNode.append(img);
};

behaviors.components.Image.prototype.onRegister = function() {
	this.urlChanged.add($createStaticDelegate(this, this.render));
};

behaviors.components.Image.prototype.onDeregister = function() {
	this.urlChanged.remove($createStaticDelegate(this, this.render));
};

$inherit(behaviors.components.Image, randori.behaviors.AbstractBehavior);

behaviors.components.Image.className = "behaviors.components.Image";

behaviors.components.Image.getClassDependencies = function(t) {
	var p;
	return [];
};

behaviors.components.Image.injectionPoints = function(t) {
	var p;
	switch (t) {
		case 1:
			p = randori.behaviors.AbstractBehavior.injectionPoints(t);
			p.push({n:'urlChanged', t:'randori.signal.SimpleSignal', r:0, v:null});
			break;
		case 2:
			p = randori.behaviors.AbstractBehavior.injectionPoints(t);
			break;
		case 3:
			p = randori.behaviors.AbstractBehavior.injectionPoints(t);
			break;
		default:
			p = [];
			break;
	}
	return p;
};

