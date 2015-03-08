/*
 * history
 *   15.03.05 TODO: code of running method transfer other file
 *   15.03.05 accordionMenu: .toggle is not need a tag
 *   
 */

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
		},
		accordionMenu: function(opts) {
			var wrapper = opts.wrapper || '';
			var panel = opts.panel || '';
			var toggle = opts.toggle || '';

			var $wrapper = $(wrapper);
			var $panel = $wrapper.find(panel);
			var $toggle = $wrapper.find(toggle);

			$panel.hide();
			$toggle.removeClass('is-open').addClass('is-close');

			$toggle.click(function(e){
				e.preventDefault();
				if($(this).hasClass('is-close')) {
					$(this).parent().next().slideDown();
					$(this).removeClass('is-close').addClass('is-open');
				} else {
					$(this).parent().next().slideUp();
					$(this).removeClass('is-open').addClass('is-close');
				}
			});
		}
	}

	_ui.toggleClass({
		btn: ['.header__nav-btn', '.nav__close-btn'],
		target: '.nav',
		className: 'is-open'
	});

	_ui.accordionMenu({
		wrapper: '.accordion-menu',
		panel: 'dd',
		toggle: '.toggle'
	});


})(this);