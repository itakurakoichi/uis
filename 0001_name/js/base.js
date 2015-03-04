(function(w) {
	"use strict";
	var d = document;

	// setting menu bar
	function hideMenu() {
		w.setTimeout(function(){ w.scrollTo(0,1); }, 100);
	}
	w.addEventListener('load', hideMenu);

})(this);