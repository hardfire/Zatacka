
/*
 *
 * Config Object
 *
 */

// basic configuration object
var Config = function(canvas){
	
	//some defaults.
	this.maxCurveAngle = 6;
	this.curveWidth = 3;
	this.canvasWidth = canvas.width;
	this.context = canvas.getContext('2d'),
	this.canvasHeight = canvas.height;

};

var config = new Config(document.getElementById('canvas'));

