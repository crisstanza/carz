function MyGame(canvasId) {

	this.mainLoop = null;

	this.canvasId = canvasId;
	this.canvas = document.getElementById(canvasId);

	this.offsetX = 10;
	this.offsetY = 10;
	this.scale = 4;

	this.lineWidth = 1;

	this.lines = [
		[0, 0, 400, 0, 400, 400, 0, 400, 0, 0],
		[40, 40,  360, 40,  360,  360, 40,  360, 40, 40]
	];
	this.cars = [
		[
			[20, 4, 40, 4, 40, 12, 20, 12, 20, 4],
			[22, 3, 25, 3, 25, 4, 22, 4, 22, 3],
			[35, 3, 38, 3, 38, 4, 35, 4, 35, 3],
			[22, 12, 25, 12, 25, 13, 22, 13, 22, 12],
			[35, 12, 38, 12, 38, 13, 35, 13, 35, 12],
		],
		[
			[20, 16, 40, 16, 40, 24, 20, 24, 20, 16],
			[22, 15, 25, 15, 25, 16, 22, 16, 22, 15],
			[35, 15, 38, 15, 38, 16, 35, 16, 35, 15],
			[22, 24, 25, 24, 25, 25, 22, 25, 22, 24],
			[35, 24, 38, 24, 38, 25, 35, 25, 35, 24],
		],
		[
			[20, 28, 40, 28, 40, 36, 20, 36, 20, 28],
			[22, 27, 25, 27, 25, 28, 22, 28, 22, 27],
			[35, 27, 38, 27, 38, 28, 35, 28, 35, 27],
			[22, 36, 25, 36, 25, 37, 22, 37, 22, 36],
			[35, 36, 38, 36, 38, 37, 35, 37, 35, 36],
		]
	];
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
	{
		context.fillStyle = '#333';
		context.beginPath();
		{
			var line = this.cars[0][0];
			for ( var i = 0 ; i < line.length ; i++ ) {
				if ( i == 0 ) {
					context.moveTo(this.transformX(line[i]), this.transformY(line[++i]));
				} else {
					context.lineTo(this.transformX(line[i]), this.transformY(line[++i]));
				}
			}
			context.closePath();
			context.fill();
			context.stroke();
		}
	}
	{
		context.fillStyle = '#333';
		context.beginPath();
		for ( var i = 0 ; i < this.cars[0].length ; i++ ) {
			var line = this.cars[0][i];
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
	}
	{
		context.fillStyle = '#00A';
		context.beginPath();
		for ( var i = 0 ; i < this.cars[0].length ; i++ ) {
			var line = this.cars[1][i];
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
	}
	{
		context.fillStyle = '#040';
		context.beginPath();
		for ( var i = 0 ; i < this.cars[0].length ; i++ ) {
			var line = this.cars[2][i];
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
	for ( var i = 0 ; i < this.cars[0].length ; i++ ) {
		var line = this.cars[0][i];
		for ( var j = 0 ; j < line.length ; j++ ) {
			line[j]+=(5*multiplier);
			++j;
		}
	}
};

MyGame.prototype.turn = function(multiplier) {
	for ( var i = 0 ; i < this.cars[0].length ; i++ ) {
		var line = this.cars[0][i];
		for ( var j = 0 ; j < line.length ; j++ ) {
			line[j + 1]+=(5*multiplier);
			j++;
		}
	}
};