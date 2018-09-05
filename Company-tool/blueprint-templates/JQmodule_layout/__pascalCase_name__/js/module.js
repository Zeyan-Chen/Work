
(function ($) {
  'use strict';
  var ModuleName = 'lbx_lnop';

  var Module = function (ele, options) {
    this.ele = ele;
    this.$ele = $(ele);
    this.option = options;
  };

  Module.DEFAULTS = {
    style: 'classname',
    whenClickCallback: function () {
      console.log('whenClickCallback');
    }
  };

  Module.prototype.func = function () {
    console.log('this is a prototype function!!!');
  };

  Module.prototype.method = function () {
    console.log('this is a prototype function!!!');
  };

  $.fn[ModuleName] = function (methods, options) {
    return this.each(function () {
      // console.log(Module, Module.DEFAULTS);
      var opts = $.extend({}, Module.DEFAULTS, (typeof methods === 'object' && methods), (typeof options === 'object' && options));
      var module = new Module(this, opts);
      console.log(module);
      // Do something to each element here.
    });
  };

})(jQuery);
