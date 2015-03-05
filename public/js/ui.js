(function(w) {
	"use strict";

	var _ui = {
		toggleClass: function(opts) {
			opts = opts || {};
			var btn       = opts.btn || [];
			var target    = opts.target || '';
			var className = opts.className || '';

			if (btn.length > 0) {
				btn = btn.join(',')
			} else {
				return;
			}

			$(btn).on('click', function() {
				// $(target).toggleClass(className);
				$(target).slideToggle(className);
			});
		}
	}

	_ui.toggleClass({
		btn: ['.header__nav-btn', '.nav__close-btn'],
		target: '.nav',
		className: 'is-open'
	});

})(this);