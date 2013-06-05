/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 14:31:37 CEST 2013 */

if (typeof router == "undefined")
	var router = {};

router.URLRouter = function() {
	this.route = [];
	this.parseUrl();
};

router.URLRouter.prototype.parseUrl = function() {
	var currentHashes = location.hash.split("\/");
	for (var i = 0; i < currentHashes.length; i++) {
		var hash = currentHashes[i];
		if (hash != "") {
			hash = hash.replace("#", "");
			this.route.push(hash);
		}
	}
};

router.URLRouter.prototype.renderHash = function() {
	location.hash = "#" + this.route.join("\/");
};

router.URLRouter.prototype.addRoute = function(newRoute) {
	this.route.push(newRoute);
	this.renderHash();
};

router.URLRouter.prototype.replaceRoute = function(id, newRoute) {
	this.route[id] = newRoute;
	this.renderHash();
};

router.URLRouter.prototype.removeRoute = function() {
	this.route = [];
	this.renderHash();
};

router.URLRouter.className = "router.URLRouter";

router.URLRouter.getClassDependencies = function(t) {
	var p;
	return [];
};

router.URLRouter.injectionPoints = function(t) {
	return [];
};
