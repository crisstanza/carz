function Car(parent, n) {
	
	this.parent = parent;
	this.angle = 0;
	this.control = { up: false, down: false, left: false, right: false };
	this.drawBoundingBox = false;
	this.drawCenter = true;

	if ( n == 0 ) {
		this.speed = 1;
		this.center = { left: 2, top: 3 };
		this.position = { left: this.center.left + 3, top: this.center.top + 1 };
		this.color = { stroke: '#C00', fill: '#F00' };
		this.size = { width: 8, height: 6 };
		this.lines = [
			[0, 1, 8, 1, 8, 5, 0, 5],
			[1, 0, 3, 0, 3, 1, 1, 1],
			[5, 0, 7, 0, 7, 1, 5, 1],
			[1, 5, 3, 5, 3, 6, 1, 6],
			[5, 5, 7, 5, 7, 6, 5, 6],
		];

	} else if ( n == 1 ) {
		this.speed = 1.5;
		this.center = { left: 3, top: 3 };
		this.position = { left: this.center.left + 1, top: this.center.top + 8 };
		this.color = { stroke: '#0C0', fill: '#0F0' };
		this.size = { width: 8, height: 6 };
		this.lines = [
			[0, 1, 10, 1, 10, 5, 0, 5],
			[2, 0, 4, 0, 4, 1, 2, 1],
			[6, 0, 8, 0, 8, 1, 6, 1],
			[2, 5, 4, 5, 4, 6, 2, 6],
			[6, 5, 8, 5, 8, 6, 6, 6],
		];

	} else if ( n == 2 ) {
		this.speed = 2;
		this.center = { left: 2, top: 2.5 };
		this.position = { left: this.center.left + 2, top: this.center.top + 15 };
		this.color = { stroke: '#00C', fill: '#00F' };
		this.size = { width: 8, height: 6 };
		this.lines = [
			[0, 1, 9, 1, 9, 4, 0, 4],
			[1, 0, 3, 0, 3, 1, 1, 1],
			[5, 0, 7, 0, 7, 1, 5, 1],
			[1, 4, 3, 4, 3, 5, 1, 5],
			[5, 4, 7, 4, 7, 5, 5, 5],
		];
	}

}

Car.prototype.checkControl = function() {
	if ( this.control.up ) {
		this.move(1);
	} else if ( this.control.down ) {
		this.move(-1);
	}

	if ( this.control.left ) {
		this.turn(-1);
	} else if ( this.control.right ) {
		this.turn(1);
	}
}

Car.prototype.draw = function() {
	var canvas = this.parent.canvas;
	var context = canvas.getContext('2d');
	context.save();

	context.translate(this.parent.tX(this.position.left), this.parent.tX(this.position.top));
	context.rotate(this.angle * Math.PI / 180);
	context.strokeStyle = this.color.stroke;
	context.fillStyle = this.color.fill;

	if ( this.drawBoundingBox ) {
		context.globalAlpha = 0.1;
		context.beginPath();
		context.moveTo(this.parent.tX(-this.center.left), this.parent.tY(-this.center.top));
		context.lineTo(this.parent.tX(this.size.width - this.center.left), this.parent.tY(-this.center.top));
		context.lineTo(this.parent.tX(this.size.width - this.center.left), this.parent.tY(this.size.height - this.center.top));
		context.lineTo(this.parent.tX(-this.center.left), this.parent.tY(this.size.height - this.center.top));
		context.closePath();
		context.fill();
		context.stroke();
	}

	context.globalAlpha = 1;

	context.beginPath();
	for ( var i = 0 ; i < this.lines.length ; i++ ) {
		var line = this.lines[i];
		for ( var j = 0 ; j < line.length ; j++ ) {
			if ( j == 0 ) {
				context.moveTo(this.parent.tX(line[j] - this.center.left), this.parent.tY(line[++j] - this.center.top));
			} else {
				context.lineTo(this.parent.tX(line[j] - this.center.left), this.parent.tY(line[++j] - this.center.top));
			}
		}
		context.closePath();
	}
	context.fill();
	context.stroke();

	if ( this.drawCenter ) {
		var size = 0.333;
		context.beginPath();
		context.moveTo(this.parent.tX(-size), this.parent.tY(0));
		context.lineTo(this.parent.tX(size), this.parent.tY(0));
		context.moveTo(this.parent.tX(0), this.parent.tY(-size));
		context.lineTo(this.parent.tX(0), this.parent.tY(size));
		context.stroke();
	}

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
	if ( multiplier < 0 ) {
		multiplier /= 2;
	}

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