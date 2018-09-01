/**
 * @typedef $object
 * @description jQuery 選取selector後 return 的物件
 * @see {@link http://api.jquery.com/Types/#jQuery}
 */

 /**
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @external jQuery
 * @see {@link http://api.jquery.com/jQuery/}
 * @type {class}
 */

 /**
 * The jQuery plugin namespace.
 * @external "jQuery.fn"
 * @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
 * @type {object}
 */

/** 
 * @function external:"jQuery.fn".ntb_gpsh
 * @description 搜尋結頁頁M版搜尋下展模組方法
 * @example <caption>．展開M版搜尋面板的使用範例</caption>
 * $('.ntb_gpsh').ntb_gpsh('showTargetPanel');
 * @example <caption>．關閉M版搜尋面板的使用範例</caption>
 * $('.ntb_gpsh').ntb_gpsh('hidePanel');
 */

 /** 
 * @function external:"jQuery.fn".mdl_lnls
 * @description 在搜尋結果頁使用script方式來打開lightbox，目前在搜尋結果頁已經安裝好lightbox的開啟
 * @example <caption>．修改已安裝好的lightbox所打開的頁面路徑</caption>
// ./lightbox/giftinfoiframe.html 這段是您需要改的路徑
 <a href="./lightbox/giftinfoiframe.html .modal-header,.modal-body" data-toggle="mdl_lnls" data-target="#giftinfo" class="icon-text md-m-r-md">
    <i class="icon ic-ln toolgiftf fz-lg "></i>
    <span class="md-c-lighter-gray hidden-md hidden-lg">禮品明細</span>
    <span class="md-c-lighter-gray hidden-xs hidden-sm">禮品</span>
</a>
 * @example <caption>．使用script打開lightbox使用範例(第一次啟動)</caption>
$('#rule').mdl_lnls({
	remote: './lightbox/ruleiframe.html .modal-header,.modal-body'
});
 * @example <caption>．使用script開關lightbox使用範例(第一次啟動後)</caption>
$('#rule').mdl_lnls('toggle');
 */

  /** 
 * @function external:"jQuery.fn".ps_flpk
 * @description 搜尋結果頁的進度條模組
 * @example <caption>．開關進度條UI</caption>
// 開
$('.ps_flpk').ps_flpk('toggleProgressBar');
// 關
$('.ps_flpk').ps_flpk('toggleProgressBar', false);
 * @example <caption>．進到下一個進度</caption>
$('.ps_flpk').ps_flpk('nextProgress');
 * @example <caption>．指定到某個百分比</caption>
$('.ps_flpk').ps_flpk('assignPercent', 50, function() {
    // 完成後執行的callback
});
 * @example <caption>．完成整個進度條</caption>
$('.ps_flpk').ps_flpk('doneProgress');
 */