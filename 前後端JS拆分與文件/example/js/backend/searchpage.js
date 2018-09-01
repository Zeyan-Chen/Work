/**
 * @namespace SearchPage
 * @description 搜尋結果頁方法物件，此物件是集合各種js運行的流程方法，後端若要寫自已的js，可以在這找尋合適的地方寫，若此無適合的地方，可連絡雄獅資訊F2E組
 * @type {Object}
 * @property {Function} DomReadyStart 當此頁DOM 物件 Ready 時會執行此function
 * @property {Function} BeforeModuleInit 當此頁模組啟動前會執行此function
 * @property {Function} AfterModuleInit 當此頁模組啟動後會執行此function
 * @property {Function} LoadMoreMobile M版點擊"載入更多"時會執行的function
 * @property {Object} PanelMobile 此頁搜尋面板Mobile相關function
 * @property {Object} PanelDesktop 此頁搜尋面板Desktop相關function
 */
var SearchPage = {
	DomReadyStart: function () {
		// 請在這寫入你的js腳本
		console.log('Run DomReadyStart');
	},
	BeforeModuleInit: function () {
		// 請在這寫入你的js腳本
		console.log('Run BeforeModuleInit');
	},
	/**
	 * @param {Object} ModuleInit - ModuleInit 提供 search page 重新啟動模組的methods
	 * @param {function} ModuleInit.SearchFilter.Mutidest.Mobile - 重新啟動小尺寸裝置時間軸拉把模組
	 * @param {function} ModuleInit.SearchFilter.Mutidest.Desktop - 重新啟動大尺寸裝置時間軸拉把模組
	 * @param {function} ModuleInit.TicketCard.All - 重新啟動所有尺寸裝置機票卡片模組
	 * @param {function} ModuleInit.ThreeDayPrice.Mobile - 重新啟動小尺寸裝置前後三天票價模組
	 * @param {function} ModuleInit.ThreeDayPrice.Desktop - 重新啟動大尺寸裝置前後三天票價模組
	 * @param {function} ModuleInit.PriceCalendar.Mobile - 重新啟動小尺寸裝置低價日曆模組
	 * @param {function} ModuleInit.PriceCalendar.Desktop - 重新啟動大尺寸裝置低價日曆模組
	 * @param {function} ModuleInit.LoadingPage.Start - show出Loading圖
	 * @param {function} ModuleInit.LoadingPage.End - remove掉Loading圖
	 */
	AfterModuleInit: function (ModuleInit) {
		// 請在這寫入你的js腳本
		console.log('Run AfterModuleInit');
	},
	/**
	 * Mobile搜尋面板各種 function
	 * @namespace SearchPage.PanelMobile
	 * @type {Object}
	 * @property {Function} WhenInit 當搜尋面板初始化時執行
	 * @property {Function} WhenRecodeWrited 當搜尋面板寫入上次搜尋記錄後執行
	 * @property {Function} WhenFormChanged 當搜尋面板上一般Input change時執行
	 * @property {Function} WhenBeforeSubmit 當搜尋面板點下搜尋按鈕，並在寫入搜尋記錄前執行
	 * @property {Function} WhenSubmit 當搜尋面板點下搜尋按鈕，並在寫入搜尋記錄後執行
	 */
	PanelMobile: {
		/**
		 * @function SearchPage.PanelMobile.WhenInit
		 * @description 當搜尋面板初始化時會執行的 function
		 * @param {$object} $PanlWrap 當下面板的父層容器
		 */
		WhenInit: function ( $PanlWrap ) {
			// 請在這寫入你的js腳本
			console.log('Run PanelMobile WhenInit');
		},
		/**
		 * @function SearchPage.PanelMobile.WhenRecodeWrited
		 * @param {$object} $PanlWrap 當下面板的父層容器
		 * @param {$object} $Input 寫入記錄時被寫入的Input
		 */
		WhenRecodeWrited: function( $PanlWrap, $Input ) {
			// 請在這寫入你的js腳本
			console.log('Run PanelMobile WhenRecodeWrited');
		},
		/**
		 * @function SearchPage.PanelMobile.WhenFormChanged
		 * @param {$object} $PanlWrap 當下面板的父層容器
		 * @param {$object} $Input 當下被改變的Input
		 */
		WhenFormChanged: function( $PanlWrap, $Input ) {
			// 請在這寫入你的js腳本
			console.log('Run PanelMobile WhenFormChanged');
		},
		/**
		 * @function SearchPage.PanelMobile.WhenBeforeSubmit
		 * @param {$object} $PanlWrap 當下面板的父層容器
		 * @param {$object} $Submit User所點下的按鈕
		 */
		WhenBeforeSubmit: function( $PanlWrap, $Submit ) {
			// 請在這寫入你的js腳本
			console.log('Run PanelMobile WhenBeforeSubmit');
		},
		/**
		 * @function SearchPage.PanelMobile.WhenSubmit
		 * @description 在送資料到後端前，您可以將你收集user的搜尋條件的js腳本，寫在這個function中，並且有關目的地跟出發地user所選擇到的資料，都會先記錄在 input 的 attribute 上，供您使用js來取得。
		 * @param {$object} $PanlWrap 當下面板的父層容器
		 * @param {$object} $Submit User所點下的按鈕
		 * @example <caption>．取得單程/來回出發地，User所選譯的相關資料範例</caption>
		 * var $departureInput = $PanlWrap.find('.inout .int > input').eq(0);
		 * var $departureData = {
		 * 	countryname: $departureInput.attr('data-countryname'),
		 * 	countrycode: $departureInput.attr('data-countrycode'),
		 * 	cityname: $departureInput.attr('data-cityname'),
		 * 	citycode: $departureInput.attr('data-citycode'),
		 * 	airportname: $departureInput.attr('data-airportname'),
		 * 	airportcode: $departureInput.attr('data-airportcode'),
		 * 	iscity: $departureInput.attr('data-iscity')
		 * };
		 * @example <caption>．取得單程/來回目的地，User所選譯的相關資料範例</caption>
		 * var $destInput = $PanlWrap.find('.inout .int > input').eq(1));
		 * var $destData = {
		 * 	countryname: $destInput.attr('data-countryname'),
		 * 	countrycode: $destInput.attr('data-countrycode'),
		 * 	cityname: $destInput.attr('data-cityname'),
		 * 	citycode: $destInput.attr('data-citycode'),
		 * 	airportname: $destInput.attr('data-airportname'),
		 * 	airportcode: $destInput.attr('data-airportcode'),
		 * 	iscity: $destInput.attr('data-iscity')
		 * };
		 */
		WhenSubmit: function( $PanlWrap, $Submit ) {
			// 請在這寫入你的js腳本
			console.log('Run PanelMobile WhenSubmit');
		}
	},
	/**
	 * Desktop搜尋面板各種 function
	 * @namespace SearchPage.PanelDesktop
	 * @type {Object}
	 * @property {Function} WhenInit 當搜尋面板初始化時執行
	 * @property {Function} WhenRecodeWrited 當搜尋面板寫入上次搜尋記錄後執行
	 * @property {Function} WhenFormChanged 當搜尋面板上一般Input change時執行
	 * @property {Function} WhenBeforeSubmit 當搜尋面板點下搜尋按鈕，並在寫入搜尋記錄前執行
	 * @property {Function} WhenSubmit 當搜尋面板點下搜尋按鈕，並在寫入搜尋記錄後執行
	 */
	PanelDesktop: {
		/**
		 * @function SearchPage.PanelDesktop.WhenInit
		 * @description 當搜尋面板初始化時會執行的k function
		 * @param {$object} $PanlWrap 當下面板的父層容器
		 */
		WhenInit: function ( $PanlWrap ) {
			// 請在這寫入你的js腳本
			console.log('Run PanelDesktop WhenInit');
		},
		/**
		 * @function SearchPage.PanelDesktop.WhenRecodeWrited
		 * @param {$object} $PanlWrap 當下面板的父層容器
		 * @param {$object} $Input 寫入記錄時被寫入的Input
		 */
		WhenRecodeWrited: function( $PanlWrap, $Input ) {
			// 請在這寫入你的js腳本
			console.log('Run PanelDesktop WhenRecodeWrited');
		},
		/**
		 * @function SearchPage.PanelDesktop.WhenFormChanged
		 * @param {$object} $PanlWrap 當下面板的父層容器
		 * @param {$object} $Input 當下被改變的Input
		 */
		WhenFormChanged: function( $PanlWrap, $Input ) {
			// 請在這寫入你的js腳本
			console.log('Run PanelDesktop WhenFormChanged');
		},
		/**
		 * @function SearchPage.PanelDesktop.WhenBeforeSubmit
		 * @param {$object} $PanlWrap 當下面板的父層容器
		 * @param {$object} $Submit User所點下的按鈕
		 */
		WhenBeforeSubmit: function( $PanlWrap, $Submit ) {
			// 請在這寫入你的js腳本
			console.log('Run PanelDesktop WhenBeforeSubmit');
		},
		/**
		 * @function SearchPage.PanelDesktop.WhenSubmit
		 * @description 在送資料到後端前，您可以將你收集user的搜尋條件的js腳本，寫在這個function中，並且有關目的地跟出發地user所選擇到的資料，都會先記錄在 input 的 attribute 上，供您使用js來取得。
		 * @param {$object} $PanlWrap 當下面板的父層容器
		 * @param {$object} $Submit User所點下的按鈕
		 * @example <caption>．取得單程/來回出發地，User所選譯的相關資料範例</caption>
		 * var $departureInput = $PanlWrap.find('.location_date > .inout .int > input').eq(0);
		 * var $departureData = {
		 * 	countryname: $departureInput.attr('data-countryname'),
		 * 	countrycode: $departureInput.attr('data-countrycode'),
		 * 	cityname: $departureInput.attr('data-cityname'),
		 * 	citycode: $departureInput.attr('data-citycode'),
		 * 	airportname: $departureInput.attr('data-airportname'),
		 * 	airportcode: $departureInput.attr('data-airportcode'),
		 * 	iscity: $departureInput.attr('data-iscity')
		 * };
		 * @example <caption>．取得單程/來回目的地，User所選譯的相關資料範例</caption>
		 * var $destInput = $PanlWrap.find('.location_date > .inout .int > input').eq(1);
		 * var $destData = {
		 * 	countryname: $destInput.attr('data-countryname'),
		 * 	countrycode: $destInput.attr('data-countrycode'),
		 * 	cityname: $destInput.attr('data-cityname'),
		 * 	citycode: $destInput.attr('data-citycode'),
		 * 	airportname: $destInput.attr('data-airportname'),
		 * 	airportcode: $destInput.attr('data-airportcode'),
		 * 	iscity: $destInput.attr('data-iscity')
		 * };
		 */
		WhenSubmit: function( $PanlWrap, $Submit ) {
			// 請在這寫入你的js腳本
			console.log('Run PanelDesktop WhenSubmit');
		}
	},
	/**
	 * @function SearchPage.LoadMoreMobile
	 * @param {Function} loadingComplete 當資料讀取完後，可執行此方法
	 */
	LoadMoreMobile: function ( loadingComplete ) {
		// 請在這寫入你的js腳本
		console.log('Run LoadMoreMobile');
	},
	/**
	 * 點擊依價格排序後會執行的各種 function
	 * @namespace SearchPage.PriceSort
	 * @type {Object}
	 * @property {Function} MobileDesc 當M版排序改變為依價格排後執行
	 * @property {Function} DesktopAsc 當價格排序為升序時執行
	 * @property {Function} DesktopDesc 當價格排序為降序時執行
	 */
	PriceSort: {
		MobileDesc: function() {
			// 請在這寫入你的js腳本
			console.log('Run PriceSort.MobileDesc');
		},
		DesktopAsc: function() {
			// 請在這寫入你的js腳本
			console.log('Run PriceSort.DesktopAsc');
		},
		DesktopDesc: function() {
			// 請在這寫入你的js腳本
			console.log('Run PriceSort.DesktopDesc');
		}
	},
	/**
	 * 點擊依航空公司排序後會執行的各種 function
	 * @namespace SearchPage.AirPlaneSort
	 * @type {Object}
	 * @property {Function} MobileDesc 當M版排序改變為依航空公司排序後執行
	 * @property {Function} DesktopAsc 當航空公司排序序為升序時執行
	 * @property {Function} DesktopDesc 當航空公司排序序為升序時執行
	 */
	AirPlaneSort: {
		MobileDesc: function() {
			// 請在這寫入你的js腳本
			console.log('Run AirPlaneSort.MobileDesc');
		},
		DesktopAsc: function() {
			// 請在這寫入你的js腳本
			console.log('Run AirPlaneSort.DesktopAsc');
		},
		DesktopDesc: function() {
			// 請在這寫入你的js腳本
			console.log('Run AirPlaneSort.DesktopDesc');
		}
	}
};
