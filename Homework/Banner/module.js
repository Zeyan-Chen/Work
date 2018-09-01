(function($) {
  "use strict";
  var ModuleName = "banner";

  var Module = function(ele, options) {
    this.ele = ele;
    this.$ele = $(ele);
    this.btn = `<div class="${options.button.class}"></div>`;
    this.option = options;
  };

  // options
  Module.DEFAULTS = {
    //設定一開始是否為開或合
    openAtStart: true, // [boolean] true | false
    // 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
    autoToggle: true, // [boolean|number] true | false | 3000
    // 設定收合展開按鈕
    button: {
      closeText: "收合", // [string]
      openText: "展開", // [string]
      class: "btn" // [string]
    },
    // 設定模組在各狀態時的class
    class: {
      closed: "closed", // [string]
      closing: "closing", // [string]
      opened: "opened", // [string]
      opening: "opening" // [string]
    },
    // 是否要有transition效果
    transition: true,
    // 當有transition時，要執行的callback function
    whenTransition: function() {
      console.log("whenTransition");
    }
  };

  /* ==== 是否剛開始就開合 */
  Module.prototype.ifStartOpen = function() {
    // console.log("openAtStart狀態:" + this.option.openAtStart);
    var self = this;

    if (this.option.openAtStart) {
      this.$ele.addClass(this.option.class.opening);
    } else {
      this.$ele.addClass(this.option.class.closing);
    }

    // 判斷動畫完成
    this.ele.addEventListener(
      "webkitAnimationEnd",
      function() {
        this.className = this.className.replace(
          self.nowStatus()[0],
          self.nowStatus()[1]
        );
      },
      false
    );

    self.settingBtn();
  };

  /* ==== 判斷目前開合狀態 */
  Module.prototype.nowStatus = function(params) {
    var nowStatus;
    // 判斷 class 目前有沒有 open, 或是 close
    for (let i = 0; i < this.$ele[0].classList.length; i++) {
      if (this.$ele[0].classList[i] == "opening") {
        nowStatus = ["opening", "opened"];
      } else {
        nowStatus = ["closing", "closed"];
      }
    }
    return nowStatus;
  };

  /* ==== open and close status */
  Module.prototype.OpenAndClose = function(ele, status) {
    switch (status) {
      case "close":
        ele
          .addClass("closing")
          .removeClass("opened")
          .removeClass("opening");
        ele
          .find(".img")
          .addClass("move")
          .removeClass("nomove");
        break;

      case "open":
        ele
          .addClass("opening")
          .removeClass("closed")
          .removeClass("closing");
        ele
          .find(".img")
          .addClass("nomove")
          .removeClass("move");
        break;
    }
  };

  /* ==== btn 按下時 */
  Module.prototype.bannerToggle = function(module) {
    var $banner = $(module.data.$bannerModule.ele); // jQuery 選取
    var opened = module.data.$bannerModule.option.class.opened;
    var opening = module.data.$bannerModule.option.class.opening;

    if ($banner.hasClass(opened) || $banner.hasClass(opening)) {
      module.data.$bannerModule.OpenAndClose($banner, "close");
    } else {
      module.data.$bannerModule.OpenAndClose($banner, "open");
    }
    module.data.$bannerModule.nowStatus(); // 目前的 class 狀態判斷
    module.data.$bannerModule.settingBtn(); // 按鈕外觀設定
  };

  /* ==== 是否 + transition */
  Module.prototype.ifTransition = function() {
    // console.log("transition狀態:" + this.option.transition);
    if (this.option.transition) {
      this.option.whenTransition();
      this.$ele.addClass("transition");
      this.$ele.find(".img").addClass("transition");
    } else {
      this.$ele.removeClass("transition");
      this.$ele.find("*").removeClass("transition");
    }
  };

  /* ==== 是否自動開合 */
  Module.prototype.ifAutoOpen = function() {
    // console.log("autoToggle狀態:" + this.option.autoToggle);
    var self = this;
    var countTime = 3; // 倒數秒數
    var nowClass = self.$ele[0].classList;
    for (let i = 0; i < nowClass.length; i++) {
      if (
        self.$ele[0].classList[i] == "opening" ||
        self.$ele[0].classList[i] == "opened"
      ) {
        alert("目前為打開的狀態，自動開合失效");
        return;
      }
    }

    // 秒數倒數完執行
    setTimeout(function() {
      if (self.$ele.hasClass("closed")) {
        self.OpenAndClose(self.$ele, "open");
        self.settingBtn();
      }
    }, countTime * 1000);

    // 倒數計時器，看 console
    var countCalculatorDone = setInterval(countCalculator, 1000);
    function countCalculator() {
      console.log(countTime);
      countTime--;
      if (countTime == 0) {
        console.log(0);
        clearInterval(countCalculatorDone);
      }
    }
  };

  /* ==== 收合按鈕 UI 設定 */
  Module.prototype.settingBtn = function() {
    var btnClass = this.option.button.class;
    var self = this;
    var textResult; // 判斷目前的狀態結果來填 btn 要的文字
    var iFa; // font awesome html
    var btnText = function() {
      if (self.$ele.hasClass("opened") || self.$ele.hasClass("opening")) {
        textResult = self.option.button.closeText;
      } else {
        textResult = self.option.button.openText;
      }
      return textResult;
    };

    switch (btnText()) {
      case self.option.button.openText:
        iFa = '<i class="fas fa-caret-down"></i>';
        break;

      case self.option.button.closeText:
        iFa = '<i class="fas fa-caret-up"></i>';
        break;
    }
    // btn 文字內容
    this.$ele.find("." + btnClass).html(`${btnText()}${iFa}`);
  };

  /* ==== 一開始的判斷 */
  Module.prototype.begining = function() {
    for (let i = 0; i < this.nowStatus().length; i++) {
      if (this.nowStatus()[i] == "closed") {
        this.OpenAndClose(this.$ele, "close");
      }
    }
  };

  $.fn[ModuleName] = function(methods, options) {
    return this.each(function() {
      var opts = $.extend(
        {},
        Module.DEFAULTS,
        typeof methods === "object" && methods,
        typeof options === "object" && options
      );
      var module = new Module(this, opts);

      // 所有的事件
      // append 一個 btn
      var btnClass = module.option.button.class; // btn 的 class Name
      module.$ele.append(`<div class="${btnClass}"></div>`); // append 按鈕
      var $btn = module.$ele.find("." + btnClass); // 選到 btn
      // click event
      $btn.on("click", { $bannerModule: module }, module.bannerToggle);
      // transition setting
      module.ifTransition();
      // btn setting
      module.settingBtn();
      // openAtStart setting
      module.ifStartOpen();
      // autoToggle setting
      if (module.option.autoToggle) {
        module.ifAutoOpen();
      }
      // begining
      module.begining();
    });
  };
})(jQuery);
