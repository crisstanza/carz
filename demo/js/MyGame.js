function MyGame(canvasId) {

	MyGame._LEFT = 37;
	MyGame._UP = 38;
	MyGame._RIGHT = 39;
	MyGame._DOWN = 40;

	MyGame._1 = 49;
	MyGame._2 = 50;
	MyGame._3 = 51;
	MyGame._4 = 52;
	MyGame._5 = 53;
	MyGame._6 = 54;
	MyGame._7 = 55;
	MyGame._8 = 56;
	MyGame._9 = 57;

	MyGame._Z = 90;
	MyGame._X = 88;
	MyGame._C = 67;

	this.mainLoop = null;

	this.canvasId = canvasId;
	this.canvas = document.getElementById(canvasId);

	this.offsetX = 10;
	this.offsetY = 10;
	this.scale = 10;

	this.lineWidth = 1;

	this.lines = [
		[0, 0, 400, 0, 400, 400, 0, 400, 0, 0],
		[40, 40,  360, 40,  360,  360, 40,  360, 40, 40]
	];
	this.cars = [
		{
			speed: 5,
			angle: 0,
			fillStyle: '#333',
			lines: [
				[20, 4, 40, 4, 40, 12, 20, 12, 20, 4],
				[22, 3, 25, 3, 25, 4, 22, 4, 22, 3],
				[35, 3, 38, 3, 38, 4, 35, 4, 35, 3],
				[22, 12, 25, 12, 25, 13, 22, 13, 22, 12],
				[35, 12, 38, 12, 38, 13, 35, 13, 35, 12],
			]
		},
		{
			speed: 10,
			angle: 0,
			fillStyle: '#00A',
			lines: [
				[22, 16, 40, 16, 40, 24, 22, 24, 22, 16],
				[24, 15, 27, 15, 27, 16, 24, 16, 24, 15],
				[35, 15, 38, 15, 38, 16, 35, 16, 35, 15],
				[24, 24, 27, 24, 27, 25, 24, 25, 24, 24],
				[35, 24, 38, 24, 38, 25, 35, 25, 35, 24],
			]
		},
		{
			speed: 20,
			angle: 0,
			fillStyle: '#040',
			lines: [
				[21, 28, 40, 28, 40, 35, 21, 35, 21, 28],
				[25, 27, 28, 27, 28, 28, 25, 28, 25, 27],
				[33, 27, 36, 27, 36, 28, 33, 28, 33, 27],
				[25, 35, 28, 35, 28, 36, 25, 36, 25, 35],
				[33, 35, 36, 35, 36, 36, 33, 36, 33, 35],
			]
		}
	];
	this.currentCar = 0;
}

MyGame.prototype.refresh = function() {
	var canvas = this.canvas;
	var lines = this.lines;
	var context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.strokeStyle = '#0000FF';
	context.fillStyle = '#BBB';
	context.lineWidth = this.lineWidth;
	{
		for ( var j = 0 ; j < lines.length ; j++ ) {
			context.beginPath();
			var line = lines[j];
			for ( var i = 0 ; i < line.length ; i++ ) {
				if ( i == 0 ) {
					context.moveTo(this.transformX(line[i]), this.transformY(line[++i]));
				} else {
					context.lineTo(this.transformX(line[i]), this.transformY(line[++i]));
				}
			}
			context.closePath();
			context.stroke();
		}
	}
	{
		context.beginPath();
		{
			var line = lines[0];
			for ( var i = 0 ; i < line.length ; i++ ) {
				if ( i == 0 ) {
					context.moveTo(this.transformX(line[i]), this.transformY(line[++i]));
				} else {
					context.lineTo(this.transformX(line[i]), this.transformY(line[++i]));
				}
			}
		}
		{
			var line = lines[1];
			for ( var i = line.length - 1 ; i >= 0 ; i-- ) {
				context.lineTo(this.transformX(line[i - 1]), this.transformY(line[i--]));
			}
		}
		context.lineTo(this.transformX(lines[0][0]), this.transformY(lines[0][1]));
		context.closePath();
		context.fill();
	}
	{
		context.strokeStyle = '#111';
		context.lineWidth = 1;
	}
	for ( var h = 0 ; h < this.cars.length ; h++ ) {
		var car = this.cars[h];
		context.save();
		context.rotate(car.angle);
		context.fillStyle = car.fillStyle;
		context.beginPath();
		for ( var i = 0 ; i < car.lines.length ; i++ ) {
			var line = car.lines[i];
			for ( var j = 0 ; j < line.length ; j++ ) {
				if ( j == 0 ) {
					context.moveTo(this.transformX(line[j]), this.transformY(line[++j]));
				} else {
					context.lineTo(this.transformX(line[j]), this.transformY(line[++j]));
				}
			}
			context.closePath();
			context.fill();
			context.stroke();
		}
		context.restore();
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

MyGame.prototype.move = function(multiplier) {
	var car = this.cars[this.currentCar];
	for ( var i = 0 ; i < car.lines.length ; i++ ) {
		var line = car.lines[i];
		for ( var j = 0 ; j < line.length ; j++ ) {
			line[j]+=(car.speed*multiplier);
			++j;
		}
	}
};

MyGame.prototype.turn = function(multiplier) {
	var car = this.cars[this.currentCar];
	car.angle += (multiplier*0.01);
};

MyGame.prototype.doKeyDown = function(evt) {
	var key = evt.keyCode;
	if ( key == MyGame._LEFT ) {
		this.turn(-1);
		evt.preventDefault();
	} else if ( key == MyGame._UP ) {
		this.move(1);
		evt.preventDefault();
	} else if ( key == MyGame._RIGHT ) {
		this.turn(1);
		evt.preventDefault();
	} else if ( key == MyGame._DOWN ) {
		this.move(-1);
		evt.preventDefault();
	} else if ( key == MyGame._1 ) {
		this.scale = 1;
		evt.preventDefault();
	} else if ( key == MyGame._2 ) {
		this.scale = 2;
		evt.preventDefault();
	} else if ( key == MyGame._3 ) {
		this.scale = 4;
		evt.preventDefault();
	} else if ( key == MyGame._4 ) {
		this.scale = 8;
		evt.preventDefault();
	} else if ( key == MyGame._5 ) {
		this.scale = 16;
		evt.preventDefault();
	} else if ( key == MyGame._6 ) {
		this.scale = 32;
		evt.preventDefault();
	} else if ( key == MyGame._7 ) {
		this.scale = 48;
		evt.preventDefault();
	} else if ( key == MyGame._8 ) {
		this.scale = 64;
		evt.preventDefault();
	} else if ( key == MyGame._9 ) {
		this.scale = 96;
		evt.preventDefault();
	} else if ( key == MyGame._Z ) {
		this.currentCar = 0;
		evt.preventDefault();
	} else if ( key == MyGame._X ) {
		this.currentCar = 1;
		evt.preventDefault();
	} else if ( key == MyGame._C ) {
		this.currentCar = 2;
		evt.preventDefault();
	}
}