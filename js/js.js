(function() {

	var rows = 12;
	var cols = 21;

	function init() {
		var myForm = document.forms['my-form'];
		var sb = [];
		for ( var i = 0 ; i < rows ; i++ ) {
			for ( var j = 0 ; j < cols ; j++ ) {
				sb.push('<input name="point" type="checkbox" />');
			}
			sb.push('<br />');
		}
		myForm.innerHTML = sb.join('');
	}

	window.addEventListener('load', init, false);	

})();