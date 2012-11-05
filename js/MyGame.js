function MyGame(canvasId) {

	this.mainLoop = null;

	this.canvasId = canvasId;
	this.canvas = document.getElementById(canvasId);

	this.offset = 10;
	this.scale = 5;
	this.lineWidth = 1;

	this.lines = [
		[0, 0, 100, 0, 100, 100, 0, 100, 0, 0],
		[10, 10,  90, 10,  90,  90, 10,  90, 10, 10]
	];
	this.car = [
		[10, 4, 15, 4, 15, 6, 10, 6, 10, 4]
	]
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
					context.moveTo(this.transform(line[i]), this.transform(line[++i]));
				} else {
					context.lineTo(this.transform(line[i]), this.transform(line[++i]));
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
					context.moveTo(this.transform(line[i]), this.transform(line[++i]));
				} else {
					context.lineTo(this.transform(line[i]), this.transform(line[++i]));
				}
			}
		}
		{
			var line = lines[1];
			for ( var i = line.length - 1 ; i >= 0 ; i-- ) {
				context.lineTo(this.transform(line[i - 1]), this.transform(line[i--]));
			}
		}
		context.lineTo(this.transform(lines[0][0]), this.transform(lines[0][1]));
		context.closePath();
		context.fill();
	}
	{
		context.strokeStyle = '#000';
		context.fillStyle = '#444';
		context.lineWidth = 1;
		context.beginPath();
		{
			var line = this.car[0];
			for ( var i = 0 ; i < line.length ; i++ ) {
				if ( i == 0 ) {
					context.moveTo(this.transform(line[i]), this.transform(line[++i]));
				} else {
					context.lineTo(this.transform(line[i]), this.transform(line[++i]));
				}
			}
			context.closePath();
			context.fill();
			context.stroke();
		}
	}
};

MyGame.prototype.transform = function(value) {
	return value * this.scale + this.offset;
};

MyGame.prototype.start = function() {
	var instance = this;
	this.mainLoop = setInterval(function() { instance.refresh(); }, 100);
};

MyGame.prototype.stop = function() {
	if ( this.mainLoop != null ) {
		clearInterval(this.mainLoop);
		this.mainLoop = null;
	}
};