function Track(parent, n) {
	
	this.parent = parent;

	if ( n == 0 ) {
		this.center = { left: 0, top: 0 };
		this.position = { left: this.center.left + 2, top: this.center.top + 2 };
		this.colors = [ { stroke: '#333', fill: '#AAA' } ];
		this.size = { width: 8, height: 6 };
		this.lines = [
			{ color: 0, points: [0, 0, 155, 0, 155, 115, 0, 115] },
			{ color: 0, points: [40, 40, 110, 40, 110, 75, 40, 75] }
		];
	}

}

Track.prototype.draw = function() {
	var canvas = this.parent.canvas;
	var context = canvas.getContext('2d');
	context.save();

	context.translate(this.parent.tX(this.position.left), this.parent.tY(this.position.top));
	context.lineWidth = 4;

	for ( var i = 0 ; i < this.lines.length ; i++ ) {
		context.beginPath();
		var line = this.lines[i];
		var points = line.points;
		var color = this.colors[line.color];
		context.strokeStyle = color.stroke;
		// context.fillStyle = color.fill;
		for ( var j = 0 ; j < points.length ; j++ ) {
			if ( j == 0 ) {
				context.moveTo(this.parent.tX(points[j] - this.center.left), this.parent.tY(points[++j] - this.center.top));
			} else {
				context.lineTo(this.parent.tX(points[j] - this.center.left), this.parent.tY(points[++j] - this.center.top));
			}
		}
		context.closePath();
		// context.fill();
		context.stroke();
	}

	context.beginPath();
	
	var line = this.lines[0];
	var color = this.colors[line.color];
	// context.strokeStyle = color.stroke;
	context.fillStyle = color.fill;
	
	var points = line.points;
	for ( var j = 0 ; j < points.length ; j++ ) {
		if ( j == 0 ) {
			context.moveTo(this.parent.tX(points[j] - this.center.left), this.parent.tY(points[++j] - this.center.top));
		} else {
			context.lineTo(this.parent.tX(points[j] - this.center.left), this.parent.tY(points[++j] - this.center.top));
		}
	}
	context.closePath();

	var points = this.lines[1].points;
	context.lineTo(this.parent.tX(points[0] - this.center.left), this.parent.tY(points[1] - this.center.top));
	for ( var j = points.length - 1 ; j >= 0  ; j-- ) {
		context.lineTo(this.parent.tX(points[j - 1] - this.center.left), this.parent.tY(points[j--] - this.center.top));
	}

	context.closePath();
	context.fill();
	// context.stroke();

	context.restore();
};