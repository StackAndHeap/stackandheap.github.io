/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 14:31:37 CEST 2013 */

if (typeof behaviors == "undefined")
	var behaviors = {};
if (typeof behaviors.components == "undefined")
	behaviors.components = {};

behaviors.components.DropDown = function() {
	this.valueCommit = null;
	this._dataProvider = null;
	this._value = null;
	this._state = "view";
	this._label = null;
	this.valueChanged = null;
	this._dataField = null;
	randori.behaviors.AbstractBehavior.call(this);
	
};

behaviors.components.DropDown.prototype.onRegister = function() {
	this.valueChanged.add($createStaticDelegate(this, this.render));
	this.parseNodeDataAttributes(this.decoratedNode);
};

behaviors.components.DropDown.prototype.parseNodeDataAttributes = function(node) {
	if (node.attr("data-label")) {
		this._label = node.attr("data-label");
	}
	this.valueChanged.dispatch();
};

behaviors.components.DropDown.prototype.onDeregister = function() {
	this.valueChanged.remove($createStaticDelegate(this, this.render));
};

behaviors.components.DropDown.prototype.render = function() {
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

behaviors.components.DropDown.prototype.renderEditState = function(node) {
	var div = jQuery("<div><\/div>");
	node.append(div);
	var paragraph = jQuery("<p><\/p>");
	paragraph.css("font-weight", "bold");
	paragraph.css("display", "inline-block");
	paragraph.css("vertical-align", "middle");
	paragraph.html(this.get_label() + ": ");
	div.append(paragraph);
	var dropdown = jQuery("<select><\/select>");
	dropdown.css("display", "inline-block");
	dropdown.css("margin-left", "5px");
	for (var i = 0; i < this.get_dataProvider().length; i++) {
		var item = this.get_dataProvider()[i];
		var option = jQuery("<option><\/option>");
		option.html(item);
		if (item == this.get_value()) {
			option.attr("selected", "selected");
		} else {
			option.removeAttr("selected");
		}
		dropdown.append(option);
	}
	dropdown.focusout($createStaticDelegate(this, this.onLostFocus));
	dropdown.change($createStaticDelegate(this, this.onLostFocus));
	div.append(dropdown);
	dropdown.focus();
};

behaviors.components.DropDown.prototype.onLostFocus = function(e) {
	this.commit(e.currentTarget.value);
};

behaviors.components.DropDown.prototype.commit = function(value) {
	this._state = "view";
	this._value = value;
	this.valueChanged.dispatch();
	this.valueCommit.dispatch(this._value, this._dataField);
};

behaviors.components.DropDown.prototype.renderViewState = function(node) {
	var paragraph = jQuery("<p><\/p>");
	paragraph.click($createStaticDelegate(this, this.gotoEditState));
	paragraph.html(this._label + ": " + this._value);
	node.append(paragraph);
};

behaviors.components.DropDown.prototype.gotoEditState = function(e) {
	this.set_state("edit");
};

behaviors.components.DropDown.prototype.get_value = function() {
	return this._value;
};

behaviors.components.DropDown.prototype.set_value = function(value) {
	this._value = value;
	this.valueChanged.dispatch();
};

behaviors.components.DropDown.prototype.get_dataField = function() {
	return this._dataField;
};

behaviors.components.DropDown.prototype.set_dataField = function(value) {
	this._dataField = value;
	this.valueChanged.dispatch();
};

behaviors.components.DropDown.prototype.get_label = function() {
	return this._label;
};

behaviors.components.DropDown.prototype.set_label = function(value) {
	this._label = value;
	this.valueChanged.dispatch();
};

behaviors.components.DropDown.prototype.get_state = function() {
	return this._state;
};

behaviors.components.DropDown.prototype.set_state = function(value) {
	this._state = value;
	this.valueChanged.dispatch();
};

behaviors.components.DropDown.prototype.get_dataProvider = function() {
	return this._dataProvider;
};

behaviors.components.DropDown.prototype.set_dataProvider = function(value) {
	this._dataProvider = value;
	this.valueChanged.dispatch();
};$inherit(behaviors.components.DropDown, randori.behaviors.AbstractBehavior);

behaviors.components.DropDown.className = "behaviors.components.DropDown";

behaviors.components.DropDown.getClassDependencies = function(t) {
	var p;
	return [];
};

behaviors.components.DropDown.injectionPoints = function(t) {
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

