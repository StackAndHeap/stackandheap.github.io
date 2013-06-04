/** Compiled by the Randori compiler v0.2.4 on Tue Jun 04 16:25:46 CEST 2013 */

if (typeof behaviors == "undefined")
	var behaviors = {};
if (typeof behaviors.components == "undefined")
	behaviors.components = {};

behaviors.components.TextInput = function() {
	this._type = "text";
	this._state = "view";
	this._label = null;
	this._dataField = null;
	this.valueCommit = null;
	this._value = null;
	this.valueChanged = null;
	randori.behaviors.AbstractBehavior.call(this);
	
};

behaviors.components.TextInput.prototype.onRegister = function() {
	this.valueChanged.add($createStaticDelegate(this, this.render));
	this.parseNodeDataAttributes(this.decoratedNode);
};

behaviors.components.TextInput.prototype.parseNodeDataAttributes = function(node) {
	if (node.attr("data-label")) {
		this._label = node.attr("data-label");
	}
	this.valueChanged.dispatch();
};

behaviors.components.TextInput.prototype.onDeregister = function() {
	this.valueChanged.remove($createStaticDelegate(this, this.render));
};

behaviors.components.TextInput.prototype.render = function() {
	this.decoratedNode.empty();
	switch (this._state) {
		case "edit":
			this.renderEditState(this.decoratedNode);
			break;
		case "view":
			this.renderViewState(this.decoratedNode);
			break;
	}
};

behaviors.components.TextInput.prototype.renderEditState = function(node) {
	var div = jQuery("<div><\/div>");
	node.append(div);
	var paragraph = jQuery("<p><\/p>");
	paragraph.css("font-weight", "bold");
	paragraph.css("display", "inline-block");
	paragraph.css("vertical-align", "middle");
	paragraph.html(this.get_label() + ": ");
	div.append(paragraph);
	var textinput = jQuery("<input\/>");
	textinput.attr("type", this._type);
	textinput.css("display", "inline-block");
	textinput.css("margin-left", "5px");
	textinput.val(this.get_value());
	textinput.focusout($createStaticDelegate(this, this.onLostFocus));
	textinput.keyup($createStaticDelegate(this, this.keyPressedHandler));
	div.append(textinput);
	textinput.focus();
};

behaviors.components.TextInput.prototype.keyPressedHandler = function(e) {
	switch (e.keyCode) {
		case 13:
			this.commit(e.currentTarget.value);
			break;
		case 27:
			this.cancel();
			break;
	}
};

behaviors.components.TextInput.prototype.onLostFocus = function(e) {
	this.commit(e.currentTarget.value);
};

behaviors.components.TextInput.prototype.commit = function(value) {
	this._state = "view";
	this._value = value;
	this.valueChanged.dispatch();
	this.valueCommit.dispatch(this._value, this._dataField);
};

behaviors.components.TextInput.prototype.cancel = function() {
	this.set_state("view");
};

behaviors.components.TextInput.prototype.renderViewState = function(node) {
	var paragraph = jQuery("<p><\/p>");
	paragraph.click($createStaticDelegate(this, this.gotoEditState));
	paragraph.html(this._label + ": " + this._value);
	node.append(paragraph);
};

behaviors.components.TextInput.prototype.gotoEditState = function(e) {
	this.set_state("edit");
};

behaviors.components.TextInput.prototype.get_value = function() {
	return this._value;
};

behaviors.components.TextInput.prototype.set_value = function(value) {
	this._value = value;
	this.valueChanged.dispatch();
};

behaviors.components.TextInput.prototype.get_dataField = function() {
	return this._dataField;
};

behaviors.components.TextInput.prototype.set_dataField = function(value) {
	this._dataField = value;
	this.valueChanged.dispatch();
};

behaviors.components.TextInput.prototype.get_label = function() {
	return this._label;
};

behaviors.components.TextInput.prototype.set_label = function(value) {
	this._label = value;
	this.valueChanged.dispatch();
};

behaviors.components.TextInput.prototype.get_state = function() {
	return this._state;
};

behaviors.components.TextInput.prototype.set_state = function(value) {
	this._state = value;
	this.valueChanged.dispatch();
};

behaviors.components.TextInput.prototype.get_type = function() {
	return this._type;
};

behaviors.components.TextInput.prototype.set_type = function(value) {
	this._type = value;
	this.valueChanged.dispatch();
};$inherit(behaviors.components.TextInput, randori.behaviors.AbstractBehavior);

behaviors.components.TextInput.className = "behaviors.components.TextInput";

behaviors.components.TextInput.getClassDependencies = function(t) {
	var p;
	return [];
};

behaviors.components.TextInput.injectionPoints = function(t) {
	var p;
	switch (t) {
		case 1:
			p = randori.behaviors.AbstractBehavior.injectionPoints(t);
			p.push({n:'valueCommit', t:'randori.signal.SimpleSignal', r:0, v:null});
			p.push({n:'valueChanged', t:'randori.signal.SimpleSignal', r:0, v:null});
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

