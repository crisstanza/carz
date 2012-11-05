(function() {
	{
		function MyGame(canvasId) {
			this.canvasId = canvasId;
			this.canvas = document.getElementById(canvasId);
			this.lines = [
				[0, 0, 10, 0, 10, 10, 0, 10, 0, 0],
				[1, 1,  9, 1,  9,  9, 1,  9, 1, 1]
			];
			this.offset = 10;
			this.scale = 20;
			this.lineWidth = 1;
			this.mainLoop = null;
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
		};
		MyGame.prototype.transform = function(value) {
			return value * this.scale + this.offset;
		};
		MyGame.prototype.start = function() {
			var instance = this;
			this.mainLoop = setInterval(function() { instance.refresh(); }, 40);
		};
	}
	{
		function init() {
			var myGame = new MyGame('my-canvas');
			myGame.start();
			{
				var control = 1;
				setInterval(function() {
					myGame.scale += control;
					if ( myGame.scale >= 100 || myGame.scale <= 20 ) {
						control = - control;
					}
				}, 40);
			}
		}
	}
	{
		window.addEventListener('load', init, false);	
	}
})();