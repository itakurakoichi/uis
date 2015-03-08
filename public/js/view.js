(function(w) {
	"use strict";

	console.log('confirm reload page: ', (Math.random()*10000000000).toString().substring(0, 5));
	var ConfPageStart = Date.now();

	var _routes = function() {
		var pathnames = window.location.pathname.split('/').slice(1, -1);
		console.log('[DEBUG] pathnames: ', pathnames)
		var pageId = pathnames[pathnames.length - 1];
		var pageKey = '_' + pageId;

		console.log('[DEBUG] pageKey: ', pageKey)

		// [TODO]
		// failed to get pageId, display error page.

		var opts = {
			pageId: pageId || '',
			pageKey: pageKey,
			kpiQuery: 'hogehoge',
			data: _model[pageKey](_data[pageKey])
		};
		console.log('[DEBUG] opts: ', opts)
		_view[pageKey].init(opts);
	}

	var _util = {
		hideMenu: function() {
			w.setTimeout(function(){ w.scrollTo(0,1); }, 100);
		},
		// @date     2014.11
		getAppIdFromUrl: function(url) {
			if (!url || typeof url !== 'string') return;
			if (this.isMiddlePage(url)) {
				var arr = url.split('/');
				var appId = (arr[arr.indexOf('#app') + 2].match(/^[0-9]+/))[0];
				return appId;
			}
			return false;
		},
		/**
		 * judge user agent, return user agent map
		 * @date   2014.12
		 */
		judgeUserAgent: function() {
			var ua = {
				isSp: false,
				isBr: false
			}
			ua.name = w.navigator.userAgent;
			if (/ip(hone|ad|od)|android/i.test(ua.name)){
				ua.isSp = true;
			} else {
				ua.isBr = true;
			}
			console.log('[DEBUG] ua: ', ua)
			return ua;
		},
		/**
		 * make string of date
		 * @date    2014.12.08
		 * @param   {string}     termString(format: YYYYMMDDHHmm)     required
		 */
		parseTerm: function(termString) {
			var obj = {};
			if (isNaN(termString)) {
				console.log('[DEBUG] _unitl.parseTerm: NAN, not a number')
				return;
			}

			var mdhm  = String(termString).slice(4);
			var month = Number(mdhm.slice(0, 2));
			var date  = Number(mdhm.slice(2, 4));
			var hour  = Number(mdhm.slice(4, 6));
			var min   = mdhm.slice(6, 8);
			// [TODO] return year, month, day, hour, min each
			return obj = {
				dateJp:     month +'月'+ date +'日',
				dateSimple: month +'/'+ date,
				dateFull:   month +'/'+ date +' '+ hour +':'+ min,
				month: month,
				date: date,
				hour: hour,
				min: min
			}
		},
		/**
		 * @date    2014.12.08
		 */
		makeCurrentDateString: function() {
			var dateObj = new Date();
			var year = dateObj.getFullYear();
			var month = dateObj.getMonth() + 1;
			var date = dateObj.getDate();
			var hours = dateObj.getHours();
			var minutes = dateObj.getMinutes();

			var now = parseFloat(
				year.toString()
				+ (month < 10 ? '0' : '') + month.toString() + (date < 10 ? '0' : '') + date.toString() + (hours < 10 ? '0' : '')
				+ hours.toString() + (minutes < 10 ? '0' : '') + minutes.toString()
			);

			return now;
		},
		/**
		 * make string of date
		 * @date    2014.12.08
		 * @param   {string}     termString(format: YYYYMMDDHHmm)     required
		 */
		// ?name=hoge&gender=foo
		// now:      [[name, hoge], [gender,foo]]
		// want to:  [{name: hoge}, {gender: foo}]
		getParamSet: function() {
			var search = window.location.search;
			if (!search) {
				return;
			} else {
				var params = search.substring(1).split('&');
				var result = [];
				$.each(params, function(i, e){
					result.push(
						params[i].split('=')
					);
				});
				return result;
			}
		},
		/**
		 * @date    2014.12.08
		 */
		getValueOfAnyParam: function(param) {
			var result = [];
			var paramSet = _util.getParamSet() || [];

			if (paramSet.length) {
				$.each(paramSet, function(i, e){
					if (e.indexOf(param) > -1) {
						result.push(e[1]);
					}
				});
			} else {
				return false; 
			}

			if (result.length === 1) {
				return result[0];
			} else {
				return false; 
			}
		},
		/**
		 * @date    2014.12.14
		 * @note    Specification of argument is no meaning
		 *          code is not common, only use in specified situation... TODO refactor
		 */
		toggle: function (btnDom, targetDom, innerText) {
			$('.event_more').on('click', function () {
				var btnClass = $(this).attr('class');

				if(btnClass.indexOf('open') === -1) {
					$(this)
						.html('<a class="more_btn">閉じる</a></div>')
						.removeClass('tap')
						.addClass('close')
						.parents().children('.held ~ [class*="not_held"]').show();
				}

				if (btnClass.indexOf('close') > -1) {
					$(this).html('<a class="more_btn">開く</a></div>')
						.removeClass('tap')
						.removeClass('close')
						.parent().children('.held ~ [class*="not_held"]').hide();
				}
			});
		}
	}

	var _model = {
		'_0001_name': function(data) {
			var data = data || {};
			return data;
		}
	}

	var _view = {
		'_0001_name': {
			init: function(opts) {
				var self = this;
				var opts = opts || {};
				self.pageId = opts.pageId || '';
				self.pageKey = opts.pageKey || '';
				self.kpiQuery = opts.kpiQuery || '';
				self.data = opts.data || {};
				self.now = _util.makeCurrentDateString();
				console.log('[DEBUG] pageKey: ', self.pageKey)
				console.log('[DEBUG] now: ', self.now)

				// below is common for all views
				// [TODO] initial setting

				// create view container
				var container = $('<div class="view">').addClass(self.pageKey);
				$('body > .wrapper').prepend(container);

				// render component
				var components = self.components = {
					header:   $('<header class="article_header">'),
					section1: $('<section class="container section1">')
				}

				var order = [];
				$.each(components, function(k, v) {
					order.push(k);
				});

				$.each(order.reverse(), function(i, e){
					container.prepend(
						components[e].append(
							$('<img class="loading">', {src: './img/loading.gif', width: '20px'})
						)
					);
				});

				self.render(self.data);
			},
			render: function(data) {
				var self = this;
				var components = self.components;

				var headerData = data.header || {};
				var section1Data = data.section1 || {};

				// header
				components.header.html('');
				components.header
					.append($('<h1 class="campaign_h1">')
						.append($('<img>', {
							src: './img/' + headerData.titleImg,
							width: '100%',
							alt: headerData.title
						}))
					)
					.append($('<p class="text">')
						.html(headerData.text || '')
					)
				// section1
				components.section1
					.html('')
					.append($('<h1>')
						.text(section1Data.title)
					)
					.append($('<img>', {
							src: './img/' + section1Data.titleImg,
							width: '100%'
						}))
					.append($('<div class="text">')
						.html(section1Data.text)
					)
			},
			renderHeader: function(opts) {},
			renderAppList: function(opts) {},
			error: function(opts) {}
		},

		/*
		 * below is module view used each pave views
		 */
		renderBannerArea: function(data) {
			var self = this;
			var bannerArea = $('<div class="container base banner">');
			if ($.isArray && data.length) {
				$.each(data, function (i, e) {
					bannerArea.append(
						_view.renderBanner(e.link, e.image)
					)
				});
			}
			return bannerArea;
		},
		renderBanner: function(link, image) {
			return $('<div class="ad_frame">')
				.append(
					$('<a class="touch">', { href: link })
					.append(
						$('<img>', { src: image, width: "100%" })
					)
				)
		}
	}

	w.addEventListener('load', _util.hideMenu);
	// _routes();

	/*
	 * mouse action
	 * TODO:    chanage function
	 * comment: this must be processed after rendering doms
	 */
	var ua = w.navigator.userAgent;
	var touches = $('.touch');
	if (/ip(hone|ad|od)|android/i.test(ua)){
		touches.bind('touchstart', function() {
			$(this).addClass('tap');
		});
		touches.bind('touchend', function() {
			$(this).removeClass('tap');
		});
	} else {
		touches.bind('mouseover', function() {
			$(this).addClass('tap');
		});
		touches.bind('mouseout', function() {
			$(this).removeClass('tap');
		});
	}

	// milliseconds of processing time
	var ConfPageEnd = Date.now();
	console.log('[DEBUG] time elapse', ConfPageEnd - ConfPageStart, 'ms');

})(this);