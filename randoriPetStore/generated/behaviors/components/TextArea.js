/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 14:31:37 CEST 2013 */

if (typeof behaviors == "undefined")
	var behaviors = {};
if (typeof behaviors.components == "undefined")
	behaviors.components = {};

behaviors.components.TextArea = function() {
	this.valueCommit = null;
	this._value = null;
	this._state = "view";
	this._label = null;
	this.valueChanged = null;
	this._dataField = null;
	randori.behaviors.AbstractBehavior.call(this);
	
};

behaviors.components.TextArea.prototype.onRegister = function() {
	this.valueChanged.add($createStaticDelegate(this, this.render));
	this.parseNodeDataAttributes(this.decoratedNode);
};

behaviors.components.TextArea.prototype.parseNodeDataAttributes = function(node) {
	if (node.attr("data-label")) {
		this._label = node.attr("data-label");
	}
	this.valueChanged.dispatch();
};

behaviors.components.TextArea.prototype.onDeregister = function() {
	this.valueChanged.remove($createStaticDelegate(this, this.render));
};

behaviors.components.TextArea.prototype.render = function() {
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

behaviors.components.TextArea.prototype.renderEditState = function(node) {
	var div = jQuery("<div><\/div>");
	node.append(div);
	var paragraph = jQuery("<p><\/p>");
	paragraph.css("font-weight", "bold");
	paragraph.css("display", "inline-block");
	paragraph.css("vertical-align", "top");
	paragraph.html(this.get_label() + ": ");
	div.append(paragraph);
	var textinput = jQuery("<textarea\/>");
	textinput.attr("cols", "70");
	textinput.attr("rows", "5");
	textinput.css("display", "inline-block");
	textinput.css("margin-left", "5px");
	textinput.text(this.get_value());
	textinput.focusout($createStaticDelegate(this, this.onLostFocus));
	textinput.keyup($createStaticDelegate(this, this.keyPressedHandler));
	div.append(textinput);
	textinput.focus();
};

behaviors.components.TextArea.prototype.keyPressedHandler = function(e) {
	switch (e.keyCode) {
		case 13:
			this.commit(e.currentTarget.value);
			break;
		case 27:
			this.cancel();
			break;
	}
};

behaviors.components.TextArea.prototype.onLostFocus = function(e) {
	this.commit(e.currentTarget.value);
};

behaviors.components.TextArea.prototype.commit = function(value) {
	this._state = "view";
	this._value = value;
	this.valueChanged.dispatch();
	this.valueCommit.dispatch(this._value, this._dataField);
};

behaviors.components.TextArea.prototype.cancel = function() {
	this.set_state("view");
};

behaviors.components.TextArea.prototype.renderViewState = function(node) {
	var paragraph = jQuery("<p><\/p>");
	paragraph.click($createStaticDelegate(this, this.gotoEditState));
	paragraph.html(this._label + ": " + this._value);
	node.append(paragraph);
};

behaviors.components.TextArea.prototype.gotoEditState = function(e) {
	this.set_state("edit");
};

behaviors.components.TextArea.prototype.get_value = function() {
	return this._value;
};

behaviors.components.TextArea.prototype.set_value = function(value) {
	this._value = value;
	this.valueChanged.dispatch();
};

behaviors.components.TextArea.prototype.get_dataField = function() {
	return this._dataField;
};

behaviors.components.TextArea.prototype.set_dataField = function(value) {
	this._dataField = value;
	this.valueChanged.dispatch();
};

behaviors.components.TextArea.prototype.get_label = function() {
	return this._label;
};

behaviors.components.TextArea.prototype.set_label = function(value) {
	this._label = value;
	this.valueChanged.dispatch();
};

behaviors.components.TextArea.prototype.get_state = function() {
	return this._state;
};

behaviors.components.TextArea.prototype.set_state = function(value) {
	this._state = value;
	this.valueChanged.dispatch();
};$inherit(behaviors.components.TextArea, randori.behaviors.AbstractBehavior);

behaviors.components.TextArea.className = "behaviors.components.TextArea";

behaviors.components.TextArea.getClassDependencies = function(t) {
	var p;
	return [];
};

behaviors.components.TextArea.injectionPoints = function(t) {
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

