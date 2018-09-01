(function($) {
'use strict';

	var ModuleName = 'bn_lntp';

	var Module = function ( element, opt ) {
		this.ele = element;
		this.$ele = $(element);
		this.$btn = $('<div class="' + opt.button.class +'"></div>');
		this.option = opt;
		this.statusCycle = ['closed', 'opening', 'opened', 'closing'];
		this.status = 0; // 0:closed, 1:opening, 2:opened, 3:closing
		this.transitionEndEvent = function (transitions){
			var el = document.createElement("fakeelement");
			for (var t in transitions){
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
		this.storage;
		this.timer;
	};

	Module.DEFAULTS = {
		openAtStart: false,
		autoOpenClose: false, // open, close
		closeDays: false, // days string
		button: {
			closeText: '收合',
			openText: '展開',
			class: 'btn'
		},
		class: {
			closed: 'closed',
			closing: 'closing',
			opened: 'opened',
			opening: 'opening'
		},
		transition: true,
		countTime: 3000,
		whenTransition: function() {
			console.log('whenTransition');
		}
	};

	Module.prototype.init = function () {
		this.$ele.append(this.$btn);

		if ( this.option.openAtStart ) {
			this.status = 2;
			this.$btn.text( this.option.button.closeText );
			this.addTransition();
		} else {
			this.status = 0;
			this.$btn.text( this.option.button.openText );
		}

		this.$ele.addClass( this.matchStatusClass(this.status) );

		if ( this.option.autoOpenClose === 'open' && this.status === 0 ) {
			this.timer = setTimeout( this.toggle.bind(this), this.option.countTime );
		} else if ( this.option.autoOpenClose === 'close' &&  this.status === 2 ) {
			this.timer = setTimeout( this.toggle.bind(this), this.option.countTime );
		}


	};

	Module.prototype.addTransition = function() {
		if ( this.option.transition && !this.$ele.hasClass('transition') ) {
			this.$ele.addClass('transition');
		}
	};

	Module.prototype.toggle = function () {
		this.clearTimer();
		this.addTransition();
		if ( this.status === 2 ) {
			this.close();
		} else if ( this.status === 0 ) {
			this.open();
		}
		this.timer = setInterval(this.option.whenTransition, 25);
	};

	Module.prototype.transitionEnd = function () {
		if ( this.status === 1 ) {
			this.$ele.removeClass( this.matchStatusClass(this.status) ).addClass( this.matchStatusClass(this.nextStatus()) );
		} else if ( this.status === 3 ) {
			this.$ele.removeClass( this.matchStatusClass(this.status) ).addClass( this.matchStatusClass(this.nextStatus()) );
		}
		this.clearTimer();
	};

	Module.prototype.clearTimer = function() {
		clearInterval(this.timer);
		clearTimeout(this.timer);
	};

	Module.prototype.nextStatus = function () {
		this.status++;
		if ( this.status > this.statusCycle.length-1 ) {
			this.status = 0;
		}
		return this.status;
	};

	Module.prototype.matchStatusClass = function (status) {
		return this.option.class[this.statusCycle[status]];
	}

	Module.prototype.open = function () {
		this.$ele.removeClass( this.matchStatusClass(this.status) ).addClass( this.matchStatusClass(this.nextStatus()) );
		this.$btn.text(this.option.button.closeText);
	};

	Module.prototype.close = function () {
		this.$ele.removeClass( this.matchStatusClass(this.status) ).addClass( this.matchStatusClass(this.nextStatus()) );
		this.$btn.text(this.option.button.openText);

	};



	$.fn[ModuleName] = function ( options, options2 ) {
		return this.each(function(){
			var $this = $(this);
			var module = $this.data( ModuleName );
			var opts = null;
			if ( !!module ) {
				if ( typeof options === 'string' &&  typeof options2 === 'undefined' ) {
					module[options]();
				} else {
					throw 'unsupported options!';
				}
			} else {
				opts = $.extend( {}, Module.DEFAULTS, ( typeof options === 'object' && options ), ( typeof options2 === 'object' && options2 ) );
				module = new Module(this, opts);
				$this.data( ModuleName, module );
				// 初始化
				module.init();
				// 註冊事件
				module.$btn.on('click', function(e) {
					module.toggle(0);
				});
				
				module.$ele.on(module.transitionEndEvent, function(e, ignore) {
					if (ignore) {
						console.log('trigger transitionend and dont run anything');
					} else {
						module.transitionEnd();
					}
				});
			}
		});
	};


})(jQuery);
