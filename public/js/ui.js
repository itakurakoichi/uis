/*
 * history
 *   15.03.05 TODO: code of running method transfer other file
 *   15.03.05 add accordionMenu
 *   15.03.18 add pull down ui
 *   
 */

(function(w) {
	"use strict";

	var _ui = {
		/*
		 * 15.03.05
		 * TODO: separate button from component
		 */
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
				$(target).toggleClass(className);
				// $(target).slideToggle(className);
			});
		},
		/*
		 * 15.03.05
		 * TODO: .toggle is not need a tag
		 */
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
		},
		/**
		 * pull down area
		 * 15.03.18
		 * -- display area and hider area (i.e. toggle...)
		 * -- TODO: almost same accordionMenu, to merge
		 *
		 * @param   {Object}     opts            required
		 * @param   {dom}        opts.trigger    required
		 * @param   {dom}        opts.target     required
		 */
		pullDown: function(opts) {
			opts = opts || {};
			var $trigger = opts.trigger || '';
			var $target = opts.target || '';

			$trigger.addClass('close')
			$target.hide();

			$trigger.on('click', function() {
				if ($trigger.hasClass('close')) {
					$target.slideDown('fast', function() {
						$trigger.removeClass('close').addClass('open')
					});
				} else {
					$target.slideUp('fast', function(){
						$trigger.removeClass('open').addClass('close')
					});
				}
				return false;
			});
		}
	}

	_ui.pullDown({
		trigger: $('.pull-down__trigger'),
		target: $('.pull-down__target')
	});

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