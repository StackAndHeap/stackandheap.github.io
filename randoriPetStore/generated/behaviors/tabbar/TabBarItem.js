/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 14:31:37 CEST 2013 */

if (typeof behaviors == "undefined")
	var behaviors = {};
if (typeof behaviors.tabbar == "undefined")
	behaviors.tabbar = {};

behaviors.tabbar.TabBarItem = function() {
	this.label = null;
	this.id = 0;
	this.type = null;
	this.selected = null;
	
};

behaviors.tabbar.TabBarItem.className = "behaviors.tabbar.TabBarItem";

behaviors.tabbar.TabBarItem.getClassDependencies = function(t) {
	var p;
	return [];
};

behaviors.tabbar.TabBarItem.injectionPoints = function(t) {
	return [];
};
