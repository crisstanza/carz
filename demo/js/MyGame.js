function MyGame(canvasId) {

	MyGame._LEFT = 37;
	MyGame._UP = 38;
	MyGame._RIGHT = 39;
	MyGame._DOWN = 40;

	MyGame._1 = 49;
	MyGame._2 = 50;
	MyGame._3 = 51;

	MyGame._Z = 90;
	MyGame._X = 88;

	this.mainLoop = null;

	this.canvasId = canvasId;
	this.canvas = document.getElementById(canvasId);

	this.offsetX = 0;
	this.offsetY = 0;
	this.scale = 20;

	this.cars = [ new Car(this) ];

	this.currentCar = 0;

}

MyGame.prototype.refresh = function() {
	var canvas = this.canvas;
	var context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	this.draw();
};

MyGame.prototype.draw = function() {
	for ( var i = 0 ; i < this.cars.length ; i++ ) {
		var car = this.cars[i];
		car.draw();
	}
};

MyGame.prototype.transformX = function(value) {
	return value * this.scale + this.offsetX;
};

MyGame.prototype.transformY = function(value) {
	return value * this.scale + this.offsetY;
};

MyGame.prototype.start = function() {
	var instance = this;
	this.mainLoop = setInterval(function() { instance.refresh(); }, 40);
};

MyGame.prototype.stop = function() {
	if ( this.mainLoop != null ) {
		clearInterval(this.mainLoop);
		this.mainLoop = null;
	}
};

MyGame.prototype.doKeyDown = function(evt) {
	var key = evt.keyCode;
	var car = this.cars[this.currentCar];
	if ( key == MyGame._LEFT ) {
		car.turn(-1);
		evt.preventDefault();
	} else if ( key == MyGame._UP ) {
		car.move(1);
		evt.preventDefault();
	} else if ( key == MyGame._RIGHT ) {
		car.turn(1);
		evt.preventDefault();
	} else if ( key == MyGame._DOWN ) {
		car.move(-1);
		evt.preventDefault();
	} else if ( key == MyGame._1 ) {
		this.currentCar = 0;
		evt.preventDefault();
	} else if ( key == MyGame._2 ) {
		this.currentCar = 1;
		evt.preventDefault();
	} else if ( key == MyGame._3 ) {
		this.currentCar = 2;
		evt.preventDefault();
	} else if ( key == MyGame._Z ) {
		this.scale *= 0.75;
		evt.preventDefault();
	} else if ( key == MyGame._X ) {
		this.scale *= 1.25;
		evt.preventDefault();
	}
}

MyGame.prototype.test = function() {
	for ( var i = 0 ; i < this.cars.length ; i++ ) {
		var car = this.cars[i];
		console.log(i);
		console.log(car);
	}
};