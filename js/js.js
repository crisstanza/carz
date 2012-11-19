(function() {

	var _ROWS = 12;
	var _COLS = 21;

	var order = 0;

	function initGrid() {
		var myForm = document.forms['my-form'];
		var sb = [];
		for ( var i = 0 ; i < _ROWS ; i++ ) {
			for ( var j = 0 ; j < _COLS ; j++ ) {
				sb.push('<input name="points" type="checkbox" data-order="" />');
			}
			sb.push('<br />');
		}
		myForm.innerHTML = sb.join('');

		var points = myForm.points;
		var length = points.length;
		for ( var i = 0 ; i < length ; i++ ) {
			var point = points[i];
			point.addEventListener('click', function(evt) { doSetOrder(evt); }, false);
		}
	}

	function initButons() {
		var btGenerate = document.getElementById('bt-generate');
		btGenerate.addEventListener('click', doGenerate, false);
		var btClear = document.getElementById('bt-clear');
		btClear.addEventListener('click', doClear, false);
	}

	function doGenerate(evt) {
		var myForm = document.forms['my-form'];
		var points = myForm.points;
		var length = points.length;
		var line = [];
		for ( var i = 0 ; i < length ; i++ ) {
			var point = points[i];
			if ( point.checked ) {
				var left = i % _COLS;
				var top = Math.floor(i / _COLS);
				line.push( { order: point.getAttribute('data-order'), left: left, top: top } );
			}
		}

		var myOutput = document.getElementById('my-output');
		line.sort(function(element1, element2) {
			return element1.order - element2.order;
		});
		myOutput.innerHTML = formatLine(line);
	}

	function formatLine(line) {
		var sb = [];
		var length = line.length;
		for ( var i = 0 ; i < length ; i++ ) {
			var point = line[i];
			sb.push(point.left);
			sb.push(point.top);
		}
		return '[ ' + sb.join(', ') + ' ]';
	}

	function doClear(evt) {
		var myForm = document.forms['my-form'];
		myForm.reset();

		var points = myForm.points;
		var length = points.length;
		var line = [];
		for ( var i = 0 ; i < length ; i++ ) {
			var point = points[i];
			point.setAttribute('data-order', '');
		}

		order = 0;

		var myOutput = document.getElementById('my-output');
		myOutput.innerHTML = '';
	}

	function doSetOrder(evt) {
		var point = evt.target;
		if ( point.checked ) {
			point.setAttribute('data-order', order++);
		} else {
			point.setAttribute('data-order', '');
			order--;
		}
	}

	function init() {
		initGrid();
		initButons();
	}

	window.addEventListener('load', init, false);

})();