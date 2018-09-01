/**
 * @namespace CompletePage
 * @description 訂購完成頁物件，此物件是集合各種js運行的流程方法，後端若要寫自已的js，可以在這找尋合適的地方寫，若此無適合的地方，可連絡雄獅資訊F2E組
 * @type {Object}
 * @property {Callbacks} DomReadyStart 當此頁DOM 物件 Ready 時會執行此function
 * @property {Callbacks} BeforeModuleInit 當此頁模組啟動前會執行此function
 * @property {Callbacks} AfterModuleInit 當此頁模組啟動後會執行此function
 */
var CompletePage = {
	DomReadyStart: function () {
		// 請在這寫入你的js腳本
		console.log('Run DomReadyStart');
	},
	BeforeModuleInit: function () {
		// 請在這寫入你的js腳本
		console.log('Run BeforeModuleInit');
	},
	AfterModuleInit: function () {
		// 請在這寫入你的js腳本
		console.log('Run AfterModuleInit');
	}
}