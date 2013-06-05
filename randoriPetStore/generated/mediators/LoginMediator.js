/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 14:31:37 CEST 2013 */

if (typeof mediators == "undefined")
	var mediators = {};

mediators.LoginMediator = function() {
	this.signinUsername = null;
	this.signupEmail = null;
	this.button_login = null;
	this.appBus = null;
	this.signupPassword = null;
	this.signinPassword = null;
	this.button_register = null;
	this.signupUsername = null;
	randori.behaviors.AbstractMediator.call(this);
	
};

mediators.LoginMediator.prototype.onRegister = function() {
	this.signinUsername.keyup($createStaticDelegate(this, this.login_inputChangeHandler));
	this.signinPassword.keyup($createStaticDelegate(this, this.login_inputChangeHandler));
	this.button_login.click($createStaticDelegate(this, this.loginClickedHandler));
	this.signupPassword.keyup($createStaticDelegate(this, this.signup_inputChangeHandler));
	this.signupEmail.keyup($createStaticDelegate(this, this.signup_inputChangeHandler));
	this.signupUsername.keyup($createStaticDelegate(this, this.signup_inputChangeHandler));
	this.button_register.click($createStaticDelegate(this, this.registerClickedHandler));
};

mediators.LoginMediator.prototype.login_inputChangeHandler = function(e) {
	if (this.validateInputs([this.signinPassword, this.signinUsername]) == true) {
		this.button_login.removeClass("disabled");
		this.button_login.prop("disabled", "");
	} else {
		this.button_login.addClass("disabled");
		this.button_login.prop("disabled", "disabled");
	}
};

mediators.LoginMediator.prototype.loginClickedHandler = function() {
	this.appBus.login.dispatch({username:this.signinUsername.val(), password:this.signinPassword.val()});
};

mediators.LoginMediator.prototype.signup_inputChangeHandler = function(e) {
	if (this.validateInputs([this.signupEmail, this.signupPassword, this.signupUsername]) == true) {
		this.button_register.removeClass("disabled");
		this.button_register.prop("disabled", "");
	} else {
		this.button_register.addClass("disabled");
		this.button_register.prop("disabled", "disabled");
	}
};

mediators.LoginMediator.prototype.registerClickedHandler = function(e) {
};

mediators.LoginMediator.prototype.validateInputs = function(inputs) {
	var valid = true, length = inputs.length, i = 0;
	for (i; i < length; i++) {
		var string = inputs[i].val() || "";
		if (string.replace(" ", "") == "")
			valid = false;
	}
	return valid;
};

mediators.LoginMediator.prototype.onDeregister = function() {
};

$inherit(mediators.LoginMediator, randori.behaviors.AbstractMediator);

mediators.LoginMediator.className = "mediators.LoginMediator";

mediators.LoginMediator.getClassDependencies = function(t) {
	var p;
	return [];
};

mediators.LoginMediator.injectionPoints = function(t) {
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
			p.push({n:'button_login'});
			p.push({n:'signinUsername'});
			p.push({n:'signinPassword'});
			p.push({n:'signupUsername'});
			p.push({n:'signupEmail'});
			p.push({n:'signupPassword'});
			p.push({n:'button_register'});
			break;
		default:
			p = [];
			break;
	}
	return p;
};

