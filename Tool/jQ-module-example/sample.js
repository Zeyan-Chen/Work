(function($) {
'use strict';

	var ModuleName = 'lbx_lnop';

	var Module = function ( ele, options ) {
		this.ele = ele;
		this.$ele = $(ele);
		this.option = options;
	};

	Module.DEFAULT = {
		style: 'classname',
		whenClickCallback: function() {
			console.log('whenClickCallback');
		}
	};

	Module.prototype.func = function () {
		console.log('this is a prototype function!!!');
	};

	Module.prototype.func1 = function (option) {
		console.log('this is a prototype function1!!!');
		console.log(option);
	};

	$.fn[ModuleName] = function ( methods, options ) {
		return this.each(function(){
			var $this = $(this);
			var module = $this.data( ModuleName );
			var opts = null;
			if ( !!module ) {
				if ( typeof options === 'string' &&  typeof options2 === 'undefined' ) {
					module[options]();
				} else if ( typeof options === 'string' &&  typeof options2 === 'object' ) {
					module[options](options2);
				} else {
					console.log('unsupported options!');
					throw 'unsupported options!';
				}
			} else {
				opts = $.extend( {}, Module.DEFAULTS, ( typeof methods === 'object' && options ), ( typeof options === 'object' && options ) );
				module = new Module(this, opts);
				$this.data( ModuleName, module );
			}
		});
	};

})(jQuery);