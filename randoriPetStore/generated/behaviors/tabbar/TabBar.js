/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 14:31:37 CEST 2013 */

if (typeof behaviors == "undefined")
	var behaviors = {};
if (typeof behaviors.tabbar == "undefined")
	behaviors.tabbar = {};

behaviors.tabbar.TabBar = function() {
	this.dataProvider = null;
	this.itemClicked = null;
	this.appBus = null;
	this.dataProviderChanged = null;
	randori.behaviors.AbstractBehavior.call(this);
	
};

behaviors.tabbar.TabBar.prototype.onRegister = function() {
	this.dataProvider = [];
	this.dataProviderChanged.add($createStaticDelegate(this, this.render));
	this.appBus.nameChanged.add($createStaticDelegate(this, this.renameTab));
};

behaviors.tabbar.TabBar.prototype.onDeregister = function() {
	this.dataProviderChanged.remove($createStaticDelegate(this, this.render));
	this.appBus.nameChanged.remove($createStaticDelegate(this, this.renameTab));
};

behaviors.tabbar.TabBar.prototype.renameTab = function(data, type) {
	for (var i = 0; i < this.dataProvider.length; i++) {
		var item = this.dataProvider[i];
		if (item.id == data.id && item.type == type) {
			item.label = data.name;
		}
	}
	this.dataProviderChanged.dispatch();
};

behaviors.tabbar.TabBar.prototype.addTab = function(item) {
	if (this.dataProviderHasItem(item)) {
		this.selectItem(item);
		return;
	}
	this.deselectAllTabs();
	item.selected = true;
	this.dataProvider.push(item);
	this.dataProviderChanged.dispatch();
	this.itemClicked.dispatch(item);
};

behaviors.tabbar.TabBar.prototype.selectItem = function(item) {
	this.deselectAllTabs();
	for (var i = 0; i < this.dataProvider.length; i++) {
		var oldItem = this.dataProvider[i];
		if (oldItem.id == item.id && oldItem.type == item.type) {
			oldItem.selected = true;
		}
	}
	this.dataProviderChanged.dispatch();
	this.itemClicked.dispatch(item);
};

behaviors.tabbar.TabBar.prototype.removeItem = function(item) {
	this.deselectAllTabs();
	var items = [];
	var selectedItem = null;
	for (var i = 0; i < this.dataProvider.length; i++) {
		var oldItem = this.dataProvider[i];
		if (oldItem.id != item.id || oldItem.type != item.type) {
			items.push(oldItem);
		} else {
			if (i > 0 && items[i - 1]) {
				var itemToSelect = items[i - 1];
				itemToSelect.selected = true;
				selectedItem = itemToSelect;
			}
		}
	}
	this.dataProvider = items;
	this.dataProviderChanged.dispatch();
	this.itemClicked.dispatch(selectedItem);
};

behaviors.tabbar.TabBar.prototype.dataProviderHasItem = function(item) {
	for (var i = 0; i < this.dataProvider.length; i++) {
		var oldItem = this.dataProvider[i];
		if (oldItem.id == item.id && item.type == oldItem.type) {
			return true;
		}
	}
	return false;
};

behaviors.tabbar.TabBar.prototype.deselectAllTabs = function() {
	for (var i = 0; i < this.dataProvider.length; i++) {
		var item = this.dataProvider[i];
		item.selected = false;
	}
};

behaviors.tabbar.TabBar.prototype.deselectAll = function() {
	this.deselectAllTabs();
	this.dataProviderChanged.dispatch();
};

behaviors.tabbar.TabBar.prototype.render = function() {
	this.decoratedNode.empty();
	for (var i = 0; i < this.dataProvider.length; i++) {
		var item = this.dataProvider[i];
		var tab = this.renderTab(item, i);
		this.decoratedNode.append(tab);
	}
};

behaviors.tabbar.TabBar.prototype.renderTab = function(item, index) {
	var tab = jQuery("<li><\/li>");
	var link = jQuery("<a><\/a>");
	link.html(item.label);
	var closeButton = jQuery("<button><\/button>");
	closeButton.attr("type", "button");
	closeButton.attr("data-dismiss", "alert");
	closeButton.addClass("close");
	closeButton.html("&times;");
	tab.append(link);
	tab.append(closeButton);
	tab.attr("data-index", index);
	if (item.selected) {
		tab.addClass("selected");
	} else {
		tab.removeClass("selected");
	}
	tab.click($createStaticDelegate(this, this.tabClickedHandler));
	closeButton.click($createStaticDelegate(this, this.closeTabHandler));
	return tab;
};

behaviors.tabbar.TabBar.prototype.tabClickedHandler = function(e) {
	var tab = jQuery(e.currentTarget);
	var item = this.dataProvider[tab.attr("data-index")];
	this.selectItem(item);
};

behaviors.tabbar.TabBar.prototype.closeTabHandler = function(e) {
	var tab = jQuery(e.currentTarget.parentNode);
	var item = this.dataProvider[tab.attr("data-index")];
	this.removeItem(item);
};

$inherit(behaviors.tabbar.TabBar, randori.behaviors.AbstractBehavior);

behaviors.tabbar.TabBar.className = "behaviors.tabbar.TabBar";

behaviors.tabbar.TabBar.getClassDependencies = function(t) {
	var p;
	return [];
};

behaviors.tabbar.TabBar.injectionPoints = function(t) {
	var p;
	switch (t) {
		case 1:
			p = randori.behaviors.AbstractBehavior.injectionPoints(t);
			p.push({n:'dataProviderChanged', t:'randori.signal.SimpleSignal', r:0, v:null});
			p.push({n:'itemClicked', t:'randori.signal.SimpleSignal', r:0, v:null});
			p.push({n:'appBus', t:'eventBus.AppEventBus', r:0, v:null});
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

