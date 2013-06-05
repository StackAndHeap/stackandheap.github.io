/** Compiled by the Randori compiler v0.2.4 on Wed Jun 05 14:31:37 CEST 2013 */

if (typeof mediators == "undefined")
	var mediators = {};
if (typeof mediators.stats == "undefined")
	mediators.stats = {};

mediators.stats.StatsMediator = function() {
	this.line = null;
	this.pie = null;
	randori.behaviors.AbstractMediator.call(this);
	
};

mediators.stats.StatsMediator.prototype.onRegister = function() {
	this.createLineChart(this.line);
	this.createPieChart(this.pie);
};

mediators.stats.StatsMediator.prototype.onDeregister = function() {
};

mediators.stats.StatsMediator.prototype.createLineChart = function(canvas) {
	var line1 = new Object();
	line1.data = [65, 59, 90, 81, 56, 55, 40];
	var line2 = new Object();
	line2.fillColor = "rgba(151,187,205,0.5)";
	line2.strokeColor = "rgba(151,187,205,1)";
	line2.pointColor = "rgba(151,187,205,1)";
	line2.pointStrokeColor = "#fff";
	line2.data = [28, 48, 40, 51, 49, 41, 60];
	var chartData = new Object();
	chartData.datasets = [line1, line2];
	chartData.labels = ["January", "February", "March", "April", "May", "June", "July"];
	var lineOptions = new Object();
	lineOptions.scaleLineColor = "rgba(0,0,0,.2)";
	lineOptions.scaleLineWidth = 3;
	lineOptions.animationEasing = "easeInExpo";
	var chart = this.createChart(canvas);
	chart.Line(chartData, lineOptions);
};

mediators.stats.StatsMediator.prototype.createPieChart = function(canvas) {
	var data = [new chartJs.data.models.Point(30, "#D97041"), new chartJs.data.models.Point(50, "#E0E4CC"), new chartJs.data.models.Point(100, "#69D2E7")];
	var pieOptions = new Object();
	var chart = this.createChart(canvas);
	chart.Pie(data, pieOptions);
};

mediators.stats.StatsMediator.prototype.createChart = function(canvas) {
	var ctx = canvas["context"].getContext("2d");
	return new Chart(ctx);
};

$inherit(mediators.stats.StatsMediator, randori.behaviors.AbstractMediator);

mediators.stats.StatsMediator.className = "mediators.stats.StatsMediator";

mediators.stats.StatsMediator.getClassDependencies = function(t) {
	var p;
	p = [];
	p.push('chartJs.data.models.Point');
	return p;
};

mediators.stats.StatsMediator.injectionPoints = function(t) {
	var p;
	switch (t) {
		case 1:
			p = randori.behaviors.AbstractMediator.injectionPoints(t);
			break;
		case 2:
			p = randori.behaviors.AbstractMediator.injectionPoints(t);
			break;
		case 3:
			p = randori.behaviors.AbstractMediator.injectionPoints(t);
			p.push({n:'line'});
			p.push({n:'pie'});
			break;
		default:
			p = [];
			break;
	}
	return p;
};

