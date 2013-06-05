/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 15:07:08 CEST 2013 */

if (typeof mediators == "undefined")
	var mediators = {};

mediators.ContentMediator = function() {
	this.selectedTabBarItem = null;
	this.tabBar = null;
	this.menuLeft = null;
	this.appBus = null;
	this.urlRouter = null;
	this.myViewStack = null;
	randori.behaviors.AbstractMediator.call(this);
	
};

mediators.ContentMediator.prototype.onRegister = function() {
	this.menuLeft.set_dataProvider(this.getDefaultMenuItems());
	this.menuLeft.itemClicked.add($createStaticDelegate(this, this.menuClickHandler));
	this.appBus.rowDoubleClicked.add($createStaticDelegate(this, this.itemDoubleClickedHandler));
	this.tabBar.itemClicked.add($createStaticDelegate(this, this.onItemSelected));
	this.selectDefaultView();
};

mediators.ContentMediator.prototype.itemDoubleClickedHandler = function(data, type) {
	var tabItem = new behaviors.tabbar.TabBarItem();
	tabItem.id = data.id;
	tabItem.label = data.name;
	tabItem.type = type;
	this.tabBar.addTab(tabItem);
};

mediators.ContentMediator.prototype.onItemSelected = function(item) {
	this.selectedTabBarItem = item;
	this.menuLeft.deselectAll();
	this.urlRouter.removeRoute();
	if (item == null) {
		this.allTabsRemovedHandler();
	}
	var promise;
	switch (item.type) {
		case "animal":
			promise = this.loadView("views\/content\/products\/animals-detail.html");
			break;
		case "misc":
			promise = this.loadView("views\/content\/products\/misc-detail.html");
			break;
	}
	promise.then($createStaticDelegate(this, this.viewAddedHandler));
};

mediators.ContentMediator.prototype.selectDefaultView = function() {
	if (this.urlRouter.route[0]) {
		var items = this.getDefaultMenuItems();
		for (var i = 0; i < items.length; i++) {
			var menuItem = items[i];
			if (menuItem.route == this.urlRouter.route[0]) {
				this.menuLeft.selectButton(menuItem.id);
				return;
			}
		}
	} else {
		this.menuLeft.selectButton("animalsBtn");
	}
};

mediators.ContentMediator.prototype.menuClickHandler = function(item) {
	this.tabBar.deselectAll();
	this.urlRouter.replaceRoute(0, item.route);
	var promise = this.loadView(item.url);
	promise.then($createStaticDelegate(this, this.viewAddedHandler));
};

mediators.ContentMediator.prototype.loadView = function(url) {
	var promise;
	if (this.myViewStack.hasView(url) == true) {
		this.myViewStack.selectView(url);
		promise = new randori.async.Promise();
		promise.resolve(true);
	} else {
		promise = this.myViewStack.pushView(url);
		promise.then(function() {
			this.myViewStack.selectView(url);
		});
	}
	return promise;
};

mediators.ContentMediator.prototype.viewAddedHandler = function(mediator) {
	if (!this.selectedTabBarItem) {
		return;
	}
	switch (this.selectedTabBarItem.type) {
		case "animal":
			mediator.setData(this.selectedTabBarItem);
			break;
		case "misc":
			mediator.setData(this.selectedTabBarItem);
			break;
	}
};

mediators.ContentMediator.prototype.onDeregister = function() {
	this.menuLeft.itemClicked.remove($createStaticDelegate(this, this.menuClickHandler));
	this.tabBar.itemClicked.remove($createStaticDelegate(this, this.onItemSelected));
};

mediators.ContentMediator.prototype.allTabsRemovedHandler = function() {
	this.selectDefaultView();
};

mediators.ContentMediator.prototype.getDefaultMenuItems = function() {
	var animalsBtn = {};
	animalsBtn.id = "animalsBtn";
	animalsBtn.label = "Animals";
	animalsBtn.url = "views\/content\/products\/animals.html";
	animalsBtn.route = "animals";
	var miscBtn = {};
	miscBtn.id = "miscBtn";
	miscBtn.label = "Misc";
	miscBtn.url = "views\/content\/products\/misc.html";
	miscBtn.route = "misc";
	var statsButton = {};
	statsButton.id = "statsButton";
	statsButton.label = "Statistics";
	statsButton.route = "statistics";
	statsButton.url = "views\/content\/stats\/stats.html";
	return [animalsBtn, miscBtn, statsButton];
};

$inherit(mediators.ContentMediator, randori.behaviors.AbstractMediator);

mediators.ContentMediator.className = "mediators.ContentMediator";

mediators.ContentMediator.getClassDependencies = function(t) {
	var p;
	p = [];
	p.push('randori.async.Promise');
	p.push('behaviors.tabbar.TabBarItem');
	return p;
};

mediators.ContentMediator.injectionPoints = function(t) {
	var p;
	switch (t) {
		case 1:
			p = randori.behaviors.AbstractMediator.injectionPoints(t);
			p.push({n:'appBus', t:'eventBus.AppEventBus', r:0, v:null});
			p.push({n:'urlRouter', t:'router.URLRouter', r:0, v:null});
			break;
		case 2:
			p = randori.behaviors.AbstractMediator.injectionPoints(t);
			break;
		case 3:
			p = randori.behaviors.AbstractMediator.injectionPoints(t);
			p.push({n:'menuLeft', t:'behaviors.MenuList'});
			p.push({n:'myViewStack', t:'randori.behaviors.ViewStack'});
			p.push({n:'tabBar', t:'behaviors.tabbar.TabBar'});
			break;
		default:
			p = [];
			break;
	}
	return p;
};

