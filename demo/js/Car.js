function Car(parent) {

	this.parent = parent;

	this.position = { left: 5, top: 5 };
	this.size = { width: 8, height: 6 };
	this.center = { left: 2, top: 3 };

	this.angle = 0;
	this.speed = 1;

	this.color = { stroke: '#111', fill: '#999' };

	this.lines = [
		[0, 1, 8, 1, 8, 5, 0, 5],
		[1, 0, 3, 0, 3, 1, 1, 1],
		[5, 0, 7, 0, 7, 1, 5, 1],
		[1, 5, 3, 5, 3, 6, 1, 6],
		[5, 5, 7, 5, 7, 6, 5, 6],
	];

	this.drawBoundingBox = false;
}

Car.prototype.draw = function() {
	var canvas = this.parent.canvas;
	var context = canvas.getContext('2d');
	context.save();
	//
	context.translate(this.parent.transformX(this.position.left), this.parent.transformX(this.position.top));
	context.rotate(this.angle * Math.PI / 180);
	context.strokeStyle = this.color.stroke;
	context.fillStyle = this.color.fill;
	//
	if ( this.drawBoundingBox ) {
		context.globalAlpha = 0.1;
		context.beginPath();
		context.moveTo(this.parent.transformX(-this.center.left), this.parent.transformY(-this.center.top));
		context.lineTo(this.parent.transformX(this.size.width - this.center.left), this.parent.transformY(-this.center.top));
		context.lineTo(this.parent.transformX(this.size.width - this.center.left), this.parent.transformY(this.size.height - this.center.top));
		context.lineTo(this.parent.transformX(-this.center.left), this.parent.transformY(this.size.height - this.center.top));
		context.closePath();
		context.fill();
		context.stroke();
	}
	//
	context.globalAlpha = 1;
	//
	context.beginPath();
	for ( var i = 0 ; i < this.lines.length ; i++ ) {
		var line = this.lines[i];
		for ( var j = 0 ; j < line.length ; j++ ) {
			if ( j == 0 ) {
				context.moveTo(this.parent.transformX(line[j] - this.center.left), this.parent.transformY(line[++j] - this.center.top));
			} else {
				context.lineTo(this.parent.transformX(line[j] - this.center.left), this.parent.transformY(line[++j] - this.center.top));
			}
		}
		context.closePath();
	}
	context.fill();
	context.stroke();
	//
	context.restore();
};

Car.prototype.turn = function(direction) {
	this.angle += direction*5;
	this.angle %= 360;
	if ( this.angle < 0 ) {
		this.angle = 360 + this.angle;
	}
}

Car.prototype.move = function(multiplier) {
	if ( this.angle <= 90 ) {
		var dir = this.angle / 90;
		this.position.left += (this.speed*multiplier*(1 - dir));
		this.position.top += (this.speed*multiplier*(dir));
	} else if ( this.angle <= 180 ) {
		var dir = (this.angle - 90) / 90;
		this.position.left += -(this.speed*multiplier*(dir));
		this.position.top += (this.speed*multiplier*(1 - dir));
	} else if ( this.angle <= 270 ) {
		var dir = (this.angle - 180) / 90;
		this.position.left += -(this.speed*multiplier*(1 - dir));
		this.position.top += -(this.speed*multiplier*(dir));
	} else if ( this.angle <= 360 ) {
		var dir = (this.angle - 270) / 90;
		this.position.left += (this.speed*multiplier*(dir));
		this.position.top += -(this.speed*multiplier*(1 - dir));
	}
};