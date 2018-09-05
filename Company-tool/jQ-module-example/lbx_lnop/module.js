(function($) {
	'use strict';

	var ModuleName = 'lbx_lnop';

	var Module = function ( element, mode,  options ) {
		this.ele = element;
		this.$ele = $( element );
		this.$dailog = this.$ele.find(".lbx_lnop_dialog");
		this.$wrap = this.$ele.find('.wrap') || null;
		this.$sections = this.$ele.find('.section') || null;
		this.$block = $('<div class="placeholder"></div>');
		this.mode = mode || 'normal'; // normal, include, senter, include-single, single-senter
		this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		this.opts = options;
		this.opening = false;
		this.loading = false;
		this.moduleInParent = false;
		this.nextParams = {};
		this.srcStatus = function(obj) {
			var object = {};
			for(var keys in obj ) {
				object[keys] = false;
			}
			return object;
		}(this.opts.iframeSources);
		this.$trigger = $(this.opts.trigger);
		this.transitionEvent = function (transitions){
			var t, el = document.createElement("fakeelement");
			for (t in transitions){
				if (el.style[t] !== undefined){
					return transitions[t];
				}
			}
		}({
			"transition": "transitionend",
			"OTransition": "oTransitionEnd",
			"MozTransition": "transitionend",
			"WebkitTransition": "webkitTransitionEnd"
		});
		this.messageEvent = null;
		this.sliding = false;
	};
	Module.REGISTEDMODE = {
		'normal': 'NORMAL',
		'include': 'INCLUDE',
		'senter': 'SNETER',
		'include-single': 'INCLUDESINGLE',
		'single-senter': 'SINGLESNETER'
	};

	Module.NORMAL = {
		trigger: '.login',
		backdrop: '.lbx_lnop',
		closeButton: '.closeBtn',
		firstView: 'login',
		showViewAuto: null,
		childListener: false,
		handler: {
			main: function($btn, $section, data) {
				console.log($btn,$section,data);
			},
			nextHandler: function($btn, $section, data, $nextSection, nextSlide) {
				console.log($btn, $section, data, $nextSection, nextSlide);
			}
		}
	};

	Module.INCLUDE = {
		src: null,
		trigger: '.lbx_lnopBtn',
		frameLoaded: false,
		sentOptions: {
			showViewAuto: null,
			firstView: 'login'
		},
		whenParentReceive: function(data) {
			console.log(data);
		}
	};

	Module.SNETER = {
		trigger: null,
		backdrop: '.lbx_lnop',
		closeButton: '.closeBtn',
		firstView: 'login',
		showViewAuto: 'login',

		childListener: true,
		handler: {
			main: function($btn, $section, data) {
				console.log($btn,$section,data);
			},
			nextHandler: function($btn, $section, data, $nextSection, nextSlide) {
				console.log($btn, $section, data, $nextSection, nextSlide);
			}
		}
	};

	Module.INCLUDESINGLE = {
		trigger: '.login',
		backdrop: '.lbx_lnop',
		closeButton: '.closeBtn',
		firstView: 'login',
		showViewAuto: null,
		iframeSources: {
			'main': '',
			'next': ''
		},
		whenParentReceive: function(data) {
			console.log(data);
		}
	};

	Module.SINGLESNETER = {
		handler: {
			main: function() {
				console.log($btn,$section,data);
			},
			nextHandler: function($btn, $section, data, $nextSection, nextSlide) {
				console.log($btn, $section, data, $nextSection, nextSlide);
			}
		},
		whenSectionReceive: function(data) {
			console.log(data);
		}
	};

	Module.prototype.normalMode = function () {
		var self = this;
		var settings = this.opts;
		var transitionEvent = this.transitionEvent;
		var $trigger = this.$trigger || false;
		var $module = this.$ele;
		var $module_dialog = this.$dailog;
		var $module_content = $module.find(".lbx_lnop_content");
		var $backdrop = $(settings.backdrop);
		var $closeBtn = $(settings.closeButton);
		var $eventButtons = $module.find('[data-handler],[data-next]');
		var $sections = $module.find('.section');
		var initSection = this.initSection;
		var setInitWidth = function(width) {
			self.initWidth = width + 'px';
		}
		// 初始化
		this.initPosition();
		// 註冊事件
		// 當設有 data-handler及data-next的element被click後
		$eventButtons.on('click', function(e) {
			e.preventDefault();
			self.buttonHandler( $(this), $sections );
		});
		// 當login button 被click後
		$trigger.length > 0 && $trigger.on('click', function(e) {
			if ( !$(this).attr("data-section") == undefined || !$(this).attr("data-section") == "" ) {
				settings.firstView = $(this).attr("data-section");
			}
			if ( !$(this).attr("data-max-width") == undefined || !$(this).attr("data-max-width") == "" ) {
				setInitWidth($(this).attr("data-max-width"));
			}
			$module.trigger('open', settings.firstView);
			e.preventDefault();
		});
		// 開啟lightbox
		$module.on('open', function(e, viewName, maxWidth) {
			if ( maxWidth !== undefined ) {
				setInitWidth(maxWidth);
			}
			self.waitSectionReady( viewName, self.openLightBox.bind( self, $sections, viewName ) );
			//self.openLightBox( $sections, viewName );
		});
		// 關閉lightbox
		$module.on('close', function(e, viewName, callback) {
			if ( callback && typeof callback === 'function' ) {
				callback();
			} else if ( viewName && typeof viewName === 'function' ) {
				viewName();
			}
			if (settings.closeHandler && typeof settings.closeHandler === 'function') {
				settings.closeHandler();
			}
			self.closeLightBox( $sections );
		});
		$module.on('setCloseHandler', function(e, closeHandler) {
			if ( closeHandler && typeof closeHandler === 'function' ) {
				self.opts.closeHandler = closeHandler;
			}
		});
		// 當backdrop 被click後
		$backdrop.on('click', function() {
			$module.trigger('close');
		});
		// 當module_dialog 被click後
		$module_dialog.on("click", function(e){
			e.stopPropagation();
		});
		$closeBtn.on("click", function(e){
			$module.trigger('close');
			e.preventDefault();
		});
		// Init
		if ( settings.maxWidth !== null ) { 
			setInitWidth(settings.maxWidth);
		}
		if ( settings.showViewAuto !== null && typeof settings.showViewAuto === 'string' ) {
			$module.trigger('open', [settings.showViewAuto]);
		} else if ( settings.showViewAuto !== null && typeof settings.showViewAuto === 'function' ) {
			$module.trigger('open', [settings.showViewAuto()]);
		} else {
			initSection.call(this, $sections, settings.firstView);
		}
	};


	Module.prototype.includeMode = function () {
		var self = this;
		if ( this.$ele.is('iframe') ) {
			this.$trigger.on('open', function(e, viewName) {
				if ( viewName === undefined ) {
					this.openIframe();
				} else {
					this.openIframe(viewName);
				}
			}.bind(this)).on('click', function(e) {
				if( !$(this).attr("data-max-width") == undefined || !$(this).attr("data-max-width") == "" ) {
					self.initSetting = {
						width: $(this).attr("data-max-width")
					}
				}
				if( !$(this).attr("data-section") == undefined || !$(this).attr("data-section") == "" ) {
					var viewName = $(this).attr("data-section");
					if ( self.initSetting ) {
						self.initSetting.view = $(this).attr("data-section");
					} else {
						self.initSetting = {
							view: $(this).attr("data-section")
						}
					}
					$(this).trigger('open', [viewName]);
				} else {
					$(this).trigger('open');
				}

				e.preventDefault();
			});
		} else {
			throw 'Module target dom is not iframe!';
		}
	};

	Module.prototype.senterMode = function () {
		self = this;
		this.addChildListener();
		this.normalMode();
		if ( !this.isMobile ) {
			$(window).on('load', function(e) {
				self.msgSendToParent(window.parent, 'loaded' + '', '*');
			});
		}
	};

	Module.prototype.includeSingleMode = function () {
		var self = this;
		var settings = this.opts;
		var transitionEvent = this.transitionEvent;
		var $trigger = this.$trigger || false;
		var $module = this.$ele;
		var $module_dialog = $module.find(".lbx_lnop_dialog");
		var $module_content = $module.find(".lbx_lnop_content");
		var $backdrop = $(settings.backdrop);
		var $closeBtn = $(settings.closeButton);
		var $eventButtons = $module.find('[data-handler],[data-next]');
		var $sections = $module.find('.section');
		var initSection = this.initSection;
		var setInitWidth = function(width) {
			self.initWidth = width + 'px';
		}
		// 初始化
		console.log(self.opts)
		this.initPosition();
		if ( self.mode === 'include-single' ) {
			this.msgListener( this.opts.whenParentReceive );
		}
		// 註冊事件

		// 當login button 被click後
		$trigger.length > 0 && $trigger.on('click', function(e) {
			if( !$(this).attr("data-section") == undefined || !$(this).attr("data-section") == "" ) {
				settings.firstView = $(this).attr("data-section");
			}
			if ( !$(this).attr("data-max-width") == undefined || !$(this).attr("data-max-width") == "" ) {
				setInitWidth($(this).attr("data-max-width"));
			}
			$module.trigger('open', [settings.firstView]);
			
			
			e.preventDefault();
		});
		// 開啟lightbox
		$module.on('open', function(e, viewName) {
			self.opening = true;
			self.waitSectionReady( viewName, function($module) {
				if ( this.mode === 'include-single' ) {
					$module.css({'display': 'block', 'visibility': 'hidden'});
				}
			}.bind(self, self.$ele) );
			//self.openLightBox( $sections, viewName );
		});
		// 關閉lightbox
		$module.on('close', function(e, viewName, callback) {
			this.opening = false;
			if ( callback && typeof callback === 'function' ) {
				callback();
			} else if ( viewName && typeof viewName === 'function' ) {
				viewName();
			}
			if (settings.closeHandler && typeof settings.closeHandler === 'function') {
				settings.closeHandler();
			}
			self.closeLightBox( $sections );
		});
		$module.on('setCloseHandler', function(e, closeHandler) {
			if ( closeHandler && typeof closeHandler === 'function' ) {
				self.opts.closeHandler = closeHandler;
			}
		});
		$module.on('setUrlParams', function(e, section, params){
			if (params && typeof params == 'object') {
				var urlParam = "?";
				for (var p in params) {
					console.log(p)
					if (urlParam.length > 1) {
						urlParam += "&" + p + "=" + params[p]
					} else {
						urlParam += p + "=" + params[p]
					}
				}
				settings.iframeSources[section] += urlParam;
				$module.find('[data-section='+ section +']').attr('src') && $module.find('[data-section='+ section +']').attr('src', settings.iframeSources[section])
			}
		});
		// 當backdrop 被click後
		$backdrop.on('click', function() {
			$module.trigger('close');
		});
		// 當module_dialog 被click後
		$module_dialog.on("click", function(e){
			e.stopPropagation();
		});
		$closeBtn.on("click", function(e){
			$module.trigger('close');
			e.preventDefault();
		});
		// Init
		if ( settings.maxWidth !== null ) { 
			setInitWidth(settings.maxWidth);
		}
		if ( settings.showViewAuto !== null && typeof settings.showViewAuto === 'string' ) {
			$module.trigger('open', [settings.showViewAuto]);
		} else if ( settings.showViewAuto !== null && typeof settings.showViewAuto === 'function' ) {
			$module.trigger('open', [settings.showViewAuto()]);
		}
	};

	Module.prototype.singleSenterMode = function () {
		var self = this;
		var $module = this.$ele;
		var $eventButtons = $module.find('[data-handler],[data-next]');
		var $section = $module;
		var sectionName = $section.attr('data-section');
		console.log(self.opts)
		if ( $section.length == 1 ) {
			if ( !this.isMobile ) {
				$section.css({'padding': '30px 45px'}).attr('class', 'section');
				this.checkModuleInParent(sectionName);
				if ( self.mode === 'single-senter' ) {
					this.addChildListener( this.opts.whenSectionReceive );
				}
				$(window).on('load', function(e) {
					self.msgSendToParent(window.parent, 'loaded?section=' + sectionName + '&height=' + $(document).outerHeight(true) + '', '*');
				});
				$eventButtons.on('click', function(e) {
					e.preventDefault();
					self.buttonHandler( $(this), $section );
				});
				$('body').css({'overflow': 'hidden'});
			} else {
				$eventButtons.on('click', function(e) {
					e.preventDefault();
					self.buttonHandler( $(this), $section );
				});
			}
		} else if ( $section.length < 1 ) {
			throw 'No section found!';
		} else if ( $section.length > 1 ) {
			throw 'Multi section is unsupported!';
		}
		console.log($module);
		$eventButtons.on('data-next', function(e, viewName) {
			$(this).attr('data-next', viewName);
			$(this).attr('href', self.opts.hrefSources[viewName]);
		});
		$module.on('close', function(e, viewName, callback) {
			if ( callback && typeof callback === 'function' ) {
				callback();
			} else if ( viewName && typeof viewName === 'function' ) {
				viewName();
			}
			self.msgSendToParent(window.parent, 'closelbx', '*');
		});
	};

	Module.prototype.initPosition = function () {
		this.$dailog.css({
			top: $(window).height() * -1,
		});
	};

	Module.prototype.waitSectionReady = function ( sectionName, callback ) {
		this.loading = true;
		// this.$sections.removeClass('active');
		// this.$sections.filter('[data-section="' + sectionName + '"]').removeClass('top bottom right left');
		var $showSection = this.$sections.filter('[data-section="' + sectionName + '"]').show();
		if ( $showSection.is('iframe') && this.mode === 'include-single') {
			$showSection.attr({'src': this.opts.iframeSources[sectionName], 'scrolling': 'no'});
			if ( typeof callback === 'function' ) {
				callback();
			}
		} else {
			if ( typeof callback === 'function' ) {
				callback();
			}
		}
	};

	Module.prototype.openLightBox = function ( $sections, viewName, viewHeight ) {
		var $module = this.$ele;
		var $module_dialog = $module.find(".lbx_lnop_dialog");
		this.sliding = false;
		
		$sections.attr('style', '');
		if ( typeof viewName === 'undefined' ) {
			this.initSection($sections, this.opts.firstView, viewHeight);
		} else {
			this.initSection($sections, viewName, viewHeight);
		}
		this.$block.remove();
		if ( $(".lbx_lnop_mask").length == 0 ) {
			$("body").append("<div class='lbx_lnop_mask'></div>");
		}
		$(".lbx_lnop_mask").stop().animate({
			"opacity": 0.5
		});
		
		$('body').css("overflow", "hidden");
		if ( this.mode === 'include-single' ) {
			$module.css({'display': 'block', 'visibility': 'visible'});
			$module_dialog.stop().animate({
				top: 0
			}, 600);
		} else {
			$module.css("display", "block");
			$module_dialog.stop().animate({
				top: 0
			}, 600);
		}
		if ( this.initWidth ) {
			$module_dialog.css({'max-width': this.initWidth});
			delete this.initWidth;
		}
		this.opening = false;
	};

	Module.prototype.closeLightBox = function ( $sections ) {
		var $module = this.$ele;
		var $module_dialog = $module.find(".lbx_lnop_dialog");
		var _height = $module_dialog.outerHeight(true);
		$module_dialog.stop().animate({
			top: _height * -1
		}, 600, function(){
			$('body').css("overflow", "auto").removeAttr('style');
			$module.css("display", "none");
			$(".lbx_lnop_mask").stop().animate({
				"opacity": 0
			}, function(){
				$(".lbx_lnop_mask").remove();
				if (window.self !== window.parent) {
					window.parent.postMessage("closed","*");
				}
			});
			$sections.removeClass('left right top bottom middle active');
			$module_dialog.css({'max-width':''});
		});
	};


	Module.prototype.openIframe = function (viewName) {
		if ( this.opts.frameLoaded === false ) {
			this.$ele.attr({'src': this.opts.src + '?' + $.param(this.opts.sentOptions), 'allowTransparency': 'true'}).addClass('open');
			this.opts.frameLoaded = true;
		} else {
			this.$ele.addClass('open');
			// Sent message to child page
			var msg = "open";
			if ( this.initSetting !== undefined ) {
				msg += '?'
				var first = true;
				for (var key in this.initSetting) { 
					if ( first ) {
						msg += key + '=' + this.initSetting[key]
						first = false;
					} else {
						msg += '&' + key + '=' + this.initSetting[key]
					}
				}
				delete this.initSetting;
			}
			this.msgSendToChild(this.ele, msg, "*");
		}
		this.msgListener( this.opts.whenParentReceive );
	};

	Module.prototype.closeIframe = function ( messageHandler ) {
		this.$ele.removeClass('open');
		console.log('close iframe');
		removeEventListener(this.messageEvent, messageHandler);
	};

	Module.prototype.msgListener = function ( callback ) {
		console.log('msgListener');
		var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
		var listener = window[eventMethod];
		var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
		var messageHandler = function (e) {
			if ( typeof e.data ==='string' ) {
				var command = e.data.replace(/(^\w+)(\?.+)/,'$1');
				var strparams = e.data.replace(/\w+(\?)(.+)/,'$2').split("&").map(function(n){
					n = n.split("=");
					this[n[0]] = n[1];
					if ( Object.keys(this).length > 0 && function(obj) {
						var arr = [];
						for (var key in obj) {
							arr.push(obj[key]);
						}
						return arr;
					}(this).indexOf(undefined) === -1 ) {
						return this;
					} else {
						return null;
					}
					return Object.keys(this).length > 0 ? this : null; 
				}.bind({}))[0];
				// console.log(command, strparams);
				switch (command) {
					case 'closelbx':
						this.$ele.trigger('close');
					break;
					case 'closed':
						this.closeIframe( messageHandler );
					break;
					case 'hello':
						this.msgSendToChild(this.$sections.filter('[data-section=' + strparams.section + ']')[0] , ModuleName, '*');
					break;
					case 'loaded':
						if ( this.mode === 'include-single' ) {

							this.srcStatus[strparams.section] = true;
							this.loading = false;
							if ( this.opts.firstView === strparams.section && this.opening === true ) {
								console.log('open Lightbox!');
								this.openLightBox( this.$sections, this.opts.firstView, strparams.height );
							} else if ( this.opts.showViewAuto === strparams.section && this.opening === true ) {
								console.log('open Lightbox!');
								this.openLightBox( this.$sections, this.opts.showViewAuto, strparams.height );
							} else {
								console.log('not open Lightbox!', strparams.section, this.opening);
								this.initSection(this.$sections, strparams.section, strparams.height);
								this.nextSlide.call(this, this.$wrap, this.$sections, this.$block, null, this.nextParams);
							}

						} else if ( this.mode === 'include' ) {
							var msg = 'open';
							if ( this.initSetting !== null ) {
								msg += '?'
								var first = true;
								for (var key in this.initSetting) { 
									if ( first ) {
										msg += key + '=' + this.initSetting[key]
										first = false;
									} else {
										msg += '&' + key + '=' + this.initSetting[key]
									}
								}
								delete this.initSetting;
							}
							this.msgSendToChild(this.ele , msg, '*');
						}
					break;
					case 'next':
						if ( !!this.loading ) {
							throw 'Wait other section loading!';
						} else {
							var $next = this.$sections.filter('[data-section=' + strparams.next + ']');
							this.nextParams = strparams;
							this.waitSectionReady( strparams.next, function($module, $nextSection, driection) {
								if ( this.mode === 'include-single' ) {
									$nextSection.css({'display': 'block'}).addClass(driection);
								}
							}.bind(this, this.$ele, $next, strparams.driection ) );
						}
					break;
					case 'check':
						if ( typeof strparams.height !== 'undefined' ) {
							var $section = this.$sections.filter('[data-section=' + strparams.section + ']');
							$section.height(strparams.height);
						}
					break;

					default:
						// console.log(e);
					break;
				}
			} else {
			// Run developer custom callback
				if ( typeof callback === 'function' ) {
					callback(e);
				}
			}
		}.bind(this);
		this.messageEvent = messageEvent;
		listener(messageEvent, messageHandler, false);
	};

	Module.prototype.addChildListener = function( callback ) {
		console.log("childListener");
		var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
		var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
		var childListener = window[eventMethod];
		var messageHandler = function(e) {
			if ( typeof e.data ==='string' ) {
				var command = e.data.replace(/(^\w+)(\?.+)/,'$1');
				var strparams = e.data.replace(/\w+(\?)(.+)/,'$2').split("&").map(function(n){
					n = n.split("=");
					this[n[0]] = n[1];
					if ( Object.keys(this).length > 0 && function(obj) {
						var arr = [];
						for (var key in obj) {
							arr.push(obj[key]);
						}
						return arr;
					}(this).indexOf(undefined) === -1 ) {
						return this;
					} else {
						return null;
					}
					return Object.keys(this).length > 0 ? this : null; 
				}.bind({}))[0];
				// console.log(command, strparams);
				switch (command) {
					case 'open':
						if ( strparams !== null && strparams.hasOwnProperty('view') && strparams.hasOwnProperty('width') ) {
							this.$ele.trigger('open', [strparams.view, strparams.width]);
						} else if ( strparams !== null && strparams.hasOwnProperty('view') ) {
							this.$ele.trigger('open', [strparams.view]);
						} else {
							this.$ele.trigger('open');
						}
					break;
					case ModuleName:
						this.moduleInParent = true;
						callback();
					break;
					default:
						// console.log(e);
					break;
				}
			} else {
			// Run developer custom callback
				if ( typeof callback === 'function' ) {
					// callback(e);
				}
			}
		}.bind(this);
		childListener(messageEvent, messageHandler , false);
	};

	Module.prototype.formObjectData = function ( $inputs ) {
		var obj = {};
		$inputs.each(function(){
			var $this = $(this);
			var key = $this.attr('name');
			var val;
			if ( $this.is(':checkbox') ) {
				val = $this.prop( 'checked' );
			} else {
				val = $this.val();
			}
			obj[key] = val;
		});
		return obj;
	};

	Module.prototype.initSection = function ( $sections, sectionName, sectionHeight ) {
		var $initSection = $sections.filter('[data-section=' + sectionName + ']');
		var $activelinks = $initSection.find('[data-next]');
		
		
		if ( $sections.length === 0 ) {
			throw 'no have section dom!';
		}
		if ( this.mode === 'include-single' && this.opts.firstView === sectionName ) {
			$initSection.addClass('active').css('height', sectionHeight);
		} else if ( this.mode === 'include-single' && this.opts.showViewAuto === sectionName ) {
			$initSection.addClass('active').css('height', sectionHeight);
		} else if ( this.mode === 'include-single' && this.opts.firstView !== sectionName ) {
			$initSection.css('height', sectionHeight);
		} else {
			$initSection.addClass('active');
			$activelinks.each(function() {
				var nextSection = $(this).attr('data-next');
				var nextDriection = $(this).attr('data-driection');
				var $targetSection = $sections.filter('[data-section=' + nextSection + ']');
				$targetSection.addClass(nextDriection);
			});
		}
	};

	Module.prototype.nextSlide = function ( $wrap, $sections, $block, $button, params ) {
		var self = this;
		var $dailog = this.$ele.children('.lbx_lnop_dialog');
		var $section;
		var nextSection;
		var $nextSection;
		var nextDriection;
		var slideOutClass;
		var slideOutLeft;
		var slideOutTop;
		if (!this.sliding) {
			if (!this.moduleInParent) {
				if ( this.mode === 'include-single' ) {
					$section = $sections.filter('[data-section=' + params.section + ']');
					nextSection = params.next;
					$nextSection = $sections.filter('[data-section=' + nextSection + ']');
					nextDriection = params.driection;
					slideOutClass = '';
					slideOutLeft = 0;
					slideOutTop = 0;
					$wrap.append($block.height($section.height()).css('margin','0'));
					console.log($section);
					$section.removeClass('active');
					$section.addClass('middle');
					switch ( nextDriection ) {
						case "left":
							slideOutClass = 'right';
						break;
						case "right":
							slideOutClass = 'left';
						break;
						case "top":
							slideOutClass = 'bottom';
							slideOutTop = $section.height() + 30;
						break;
						case "bottom":
							slideOutClass = 'top';
							slideOutTop = -$section.height() - 30;
						break;
					}
					this.sliding = true;
					$section.addClass(slideOutClass).removeClass('middle').css({'top':slideOutTop});
					if ( typeof params.maxWidth !== 'undefined' ) {
						$dailog.animate({'max-width':params.maxWidth}, 500);
					} else if ( !!$dailog[0].style["max-width"] ) {
						$dailog.animate({'max-width':'429px'}, 500);
					}
					// 改變佔位容器的高為下一個畫面容器高
					$nextSection.removeClass(nextDriection).addClass('middle');
					$block.height( $nextSection.outerHeight(true) );
					$section.one(this.transitionEvent, function () {
						$sections.removeClass('left right top bottom');
						console.log(self.transitionEvent);
						$section.css({'display': '', 'height': 'auto'});
						var slideEnd = setTimeout(function() {
							$sections.removeClass('middle');
							$nextSection.addClass('active');
							$block.remove();
							self.sliding = false;
						},50);
					});
				} else {
					$section = $button.closest('.section');
					nextSection = $button.attr('data-next');
					$nextSection = $sections.filter('[data-section=' + nextSection + ']');
					nextDriection = $button.attr('data-driection');
					slideOutClass = '';
					slideOutLeft = 0;
					slideOutTop = 0;
					$nextSection.addClass(nextDriection);
					// 將目前的容器移出
					$wrap.append($block.height($section.height()));
					$section.removeClass('active');
					$section.addClass('middle');
					switch ( nextDriection ) {
						case "left":
							slideOutClass = 'right';
						break;
						case "right":
							slideOutClass = 'left';
						break;
						case "top":
							slideOutClass = 'bottom';
							slideOutTop = $section.height() + 30;
						break;
						case "bottom":
							slideOutClass = 'top';
							slideOutTop = -$section.height() - 30;
						break;
					}
					this.sliding = true;

					$section.addClass(slideOutClass).removeClass('middle').css({'top':slideOutTop});
					// 改變佔位容器的高為下一個畫面容器高
					$nextSection.removeClass(nextDriection).addClass('middle').attr('style', '');
					$block.height( $nextSection.height() );

					$section.one(this.transitionEvent, function () {
						$sections.removeClass('left right top bottom');
						var slideEnd = setTimeout(function() {
							self.initSection( $sections, nextSection );
							$block.remove();
							$sections.removeClass('middle');
							self.sliding = false;
						},50);
					});
				}
			} else {
				var readySendData = $button.data();
				readySendData['href'] = $button.attr('href');
				readySendData['section'] = $button.closest('.section').attr('data-section');
				var readySendParams = $.param( readySendData );
				this.msgSendToParent(window.parent, 'next?' + readySendParams, "*");
			}
		} else {
			console.log('plz wait');
		}
	};

	Module.prototype.msgSendToChild = function ( win, data, domain ) {
		console.log("to child: ", data);
		win.contentWindow.postMessage(data, domain);
	};

	Module.prototype.msgSendToParent = function ( win, data, domain ) {
		console.log("to parent: ", data);
		win.postMessage(data, domain);
	};

	Module.prototype.checkModuleInParent = function ( sectionName ) {
		if (window.self !== window.parent) {
			this.msgSendToParent(window.parent, "hello?section=" + sectionName + "", "*");
		} else {
			return false;
		}
	};

	Module.prototype.buttonHandler = function ( $button, $sections ) {
		var self = this;
		var nextSlide = this.nextSlide.bind( this, this.$wrap, $sections, this.$block );
		var hasHandler = $button.is('[data-handler]');
		var hasNext = $button.is('[data-next]');
		if ( hasHandler ) {
			var handlerName = $button.attr('data-handler');
			var $section = $button.closest('.section');
			var $inputs = $section.find('input[name],textarea[name],select[name]');
			// 將inputs整理為object
			var data = this.formObjectData( $inputs );
			if(!!this.opts.handler[handlerName] && typeof this.opts.handler[handlerName] === 'function') {
				if ( hasNext ) {
					var $nextSection = $sections.filter('[data-section=' + $button.attr('data-next') + ']');
					if ( $nextSection.length < 1 ) {
						$nextSection = $button.attr('data-next');
					}
					this.opts.handler[handlerName]($button, $section, data, $nextSection, function() {
						if ( self.isMobile ) {
							console.log( 'This method only support pc device!' );
							$(location).attr('href', $button.attr('href'));
						} else {
							var nowSection = $section.attr('data-section');
							var activeSection = $sections.filter('.active').attr('data-section');
							if ( self.$ele.is(':visible') && nowSection == activeSection ) {
								nextSlide( $button );
							} else if ( self.mode === 'single-senter' ) {
								nextSlide( $button );
							}
						}
					});
				} else {
					this.opts.handler[handlerName]($button, $section, data);
				}
			} else {
				console.log('此行為未指定function');
			}
			if ( this.moduleInParent ) {
				this.msgSendToParent(window.parent, 'check?' + 'height=' + $('html').outerHeight(true) + '&section=' + $button.closest('.section').attr('data-section'), "*");
			}
		} else if ( hasNext ) {
			if ( !this.isMobile ) {
				nextSlide( $button );
			} else {

				$(location).attr('href', $button.attr('href'));
			}
		}
	};

	Module.prototype.getSource = function (source) {
		var self = this;
		var jsRegex = this.opts[source].match(/\.js$/);
		var jsonRegex = this.opts[source].match(/\.json$/);
		var isJsRegex = jsRegex !== null && jsRegex.length > 0;
		var isJsonRegex = jsonRegex !== null && jsonRegex.length > 0;
		var dataType = "";
		if ( isJsRegex ) {
			// 如果傳入是js檔
			$.ajax({
				async: false,
				method: "GET",
				url: this.opts[source],
				dataType: "script",
			}).done(function(data) {
				self.opts[source] = urls;
			}).fail(function( jqxhr, textStatus, error ) {
			    var err = textStatus + ", " + error;
			    console.log( "Request Failed: " + err );
			});
		} else if ( isJsonRegex ) {
			// 如果傳入是json檔
			$.ajax({
				async: false,
				method: "GET",
				url: this.opts[source],
				dataType: "JSON",
			}).done(function(data) {
				self.opts[source] = data;
			}).fail(function( jqxhr, textStatus, error ) {
			    var err = textStatus + ", " + error;
			    console.log( "Request Failed: " + err );
			});
		}
		console.log(source + ": ", this.opts[source]);
	}

	$.fn[ModuleName] = function ( options, options2 ) {
		return this.each(function(){
				var $this = $(this);
				var module = $this.data( ModuleName );
				var MODE = function( mode ) {
					if ( typeof mode === 'object' && typeof options2 === 'undefined' ) {
						return 'normal';
					} else if (  typeof mode === 'string' && typeof options2 === 'object'  ) {
						for (var key in Module.REGISTEDMODE) {
							if ( mode === key ) {
								return key;
							}
						}
						throw 'unsupported mode!';
					}
				}( options );
				var DEFAULTS = function ( key ) {
					if ( !!key ) {
						return Module[key];
					} else {
						throw 'con\'t find default options may because unsupported mode!';
					}
					
				}( Module.REGISTEDMODE[MODE] );
				var URLPARAMS = function(str) {
					return str.replace(/(^\?)/,'').split("&").map(function(n){
						n = n.split("=");
						this[n[0]] = n[1];
						if ( Object.keys(this).length > 0 && function(obj) {
							var arr = [];
							for (var key in obj) {
								arr.push(obj[key]);
							}
							return arr;
						}(this).indexOf(undefined) === -1 ) {
							return this;
						} else {
							return null;
						}
						return Object.keys(this).length > 0 ? this : null; 
					}.bind({}))[0];
				}(document.location.search);
				var opts = null;
				if ( !!module ) {
					if ( typeof options === 'string' &&  typeof options2 === 'undefined' ) {
						module[options]();
					} else {
						// throw 'unsupported method!';
					}
				} else {
					opts = $.extend( {}, DEFAULTS, ( typeof options === 'object' && options ), ( typeof options2 === 'object' && options2 ), URLPARAMS );
					// console.log('options:', options, '\noptions2:', options2);
					// console.log('','MODE:', MODE,'\nDEFAULTS:', DEFAULTS,'\nopts:', opts);
					// New module function
					module = new Module(this, MODE,	opts);
					if ( opts.hasOwnProperty("iframeSources") && typeof opts.iframeSources === 'string' ) {
						module.getSource("iframeSources");
					}
					if ( opts.hasOwnProperty("hrefSources") && typeof opts.hrefSources === 'string' ) {
						module.getSource("hrefSources");
					}
					// Bind module function to entry dom
					$this.data( ModuleName, module );
					//console.log(module);
					// Run init by mode
					switch ( MODE ) {
						case 'include':
							module.includeMode();
						break;
						case 'senter':
							module.senterMode();
						break;
						case 'include-single':
							module.includeSingleMode();
						break;
						case 'single-senter':
							module.singleSenterMode();
						break;
						default: 
							module.normalMode();
						break;
					}
					/*
					module.$trigger.on('click', function(e) {
						module[options]();
						e.preventDefault();
					});*/
				}
		});
	};

})(jQuery);