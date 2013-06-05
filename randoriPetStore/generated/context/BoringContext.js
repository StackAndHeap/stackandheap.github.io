/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 14:31:37 CEST 2013 */

if (typeof context == "undefined")
	var context = {};

context.BoringContext = function() {
	guice.GuiceModule.call(this);
};

context.BoringContext.prototype.configure = function(binder) {
	binder.bind(eventBus.AppEventBus).inScope(guice.binding.Scope.Singleton).to(eventBus.AppEventBus);
	binder.bind(router.URLRouter).inScope(guice.binding.Scope.Singleton).to(router.URLRouter);
	binder.bind(services.MockAnimalService).inScope(guice.binding.Scope.Singleton).to(services.MockAnimalService);
	binder.bind(services.MockMiscService).inScope(guice.binding.Scope.Singleton).to(services.MockMiscService);
};

$inherit(context.BoringContext, guice.GuiceModule);

context.BoringContext.className = "context.BoringContext";

context.BoringContext.getClassDependencies = function(t) {
	var p;
	p = [];
	p.push('services.MockAnimalService');
	p.push('router.URLRouter');
	p.push('services.MockMiscService');
	p.push('eventBus.AppEventBus');
	return p;
};

context.BoringContext.injectionPoints = function(t) {
	var p;
	switch (t) {
		case 1:
			p = guice.GuiceModule.injectionPoints(t);
			break;
		case 2:
			p = guice.GuiceModule.injectionPoints(t);
			break;
		case 3:
			p = guice.GuiceModule.injectionPoints(t);
			break;
		default:
			p = [];
			break;
	}
	return p;
};

