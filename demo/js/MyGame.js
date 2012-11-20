function MyGame(canvasId) {

	MyGame.MAIN_DELAY = 40;

	MyGame._LEFT = 37;
	MyGame._UP = 38;
	MyGame._RIGHT = 39;
	MyGame._DOWN = 40;

	MyGame._1 = 49;
	MyGame._2 = 50;
	MyGame._3 = 51;
	MyGame._4 = 52;

	MyGame._Z = 90;
	MyGame._X = 88;

	this.mainLoop = null;

	this.canvasId = canvasId;
	this.canvas = document.getElementById(canvasId);

	this.offsetX = 0;
	this.offsetY = 0;
	this.scale = 10;

	this.cars = [
		new Car(this, 0),
		new Car(this, 1),
		new Car(this, 2),
		new Car(this, 3)
	];

	this.currentCar = 0;

}

MyGame.prototype.refresh = function() {
	this.checkControl();
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

MyGame.prototype.checkControl = function() {
	var showBoundingBox = document.getElementById('show-bounding-box');
	var car = this.cars[this.currentCar];
	car.drawBoundingBox = showBoundingBox.checked;

	for ( var i = 0 ; i < this.cars.length ; i++ ) {
		var car = this.cars[i];
		car.checkControl();
	}
};

MyGame.prototype.tX = function(value) {
	return value * this.scale + this.offsetX;
};

MyGame.prototype.tY = function(value) {
	return value * this.scale + this.offsetY;
};

MyGame.prototype.start = function() {
	var instance = this;
	this.mainLoop = setInterval(function() { instance.refresh(); }, MyGame.MAIN_DELAY);
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
		car.control.right = false;
		car.control.left = true;
		evt.preventDefault();
	} else if ( key == MyGame._UP ) {
		car.control.down = false;
		car.control.up = true;
		evt.preventDefault();
	} else if ( key == MyGame._RIGHT ) {
		car.control.left = false;
		car.control.right = true;
		evt.preventDefault();
	} else if ( key == MyGame._DOWN ) {
		car.control.up = false;
		car.control.down = true;
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
	} else if ( key == MyGame._4 ) {
		this.currentCar = 3;
		evt.preventDefault();

	} else if ( key == MyGame._Z ) {
		this.scale *= 0.95;
		evt.preventDefault();
	} else if ( key == MyGame._X ) {
		this.scale *= 1.05;
		evt.preventDefault();
	}
}

MyGame.prototype.doKeyUp = function(evt) {
	var key = evt.keyCode;
	var car = this.cars[this.currentCar];

	if ( key == MyGame._LEFT ) {
		car.control.left = false;
		evt.preventDefault();
	} else if ( key == MyGame._UP ) {
		car.control.up = false;
		evt.preventDefault();
	} else if ( key == MyGame._RIGHT ) {
		car.control.right = false;
		evt.preventDefault();
	} else if ( key == MyGame._DOWN ) {
		car.control.down = false;
		evt.preventDefault();
	}
}

MyGame.prototype.test = function() {
	for ( var i = 0 ; i < this.cars.length ; i++ ) {
		var car = this.cars[i];
		console.log('car ' + i + ': ', car);
	}
};