#開始開發模組

現在如果你要開始使用設計資源庫的方法來開發模組，你可以先分辯你所要開發的是**元件**還是**模組**：
> 如果你要的是單純的樣式，沒有js，那你可以把這個模組歸類為**元件**；如果你要開發的項目是將三個以上的元件組合並加以修改，或者它括JS代碼，那就要歸類為**模組**

##開發範例
**如你是要開發元件：**
可以參考components下的bt-sample、cd-sample、ic-sample、pg-sample資料夾內的結構

**components/**

| 檔案名稱 | 說明 |
| :-- | :-- |
| preview.html | 你可以將你的HTML Code編寫在這裡並測試，這裡已有匯入core.css |
| css.scss | 你的scss開發檔，內有註解詳細說明 |
| /font | 字型資源放置資料夾，如果沒有，可以刪除 |
| /img | 圖片資源放置資料夾，如果沒有，可以刪除 |

**如你是要開發模組：**
可以參考modules下的cy-sample、ntb-sample等範例

**modules/**

| 檔案名稱 | 說明 |
| :-- | :-- |
| preview.html | 你可以將你的HTML Code編寫在這裡並測試，這裡已有匯入core.css |
| css.scss | 你的scss開發檔，內有註解詳細說明 |
| module.js | 你的js開發檔 |
| /img | 圖片資源放置資料夾，如果沒有，可以刪除 |

##取得唯一ClassName
當你確定了你所收到的設計稿的開發項目是**元件**或**模組**了，就可以去設計資源庫的後台產生出唯一的ClassName（但目前現在設計資源庫後台還沒上線，所以目前的ClassName在收到設計稿時已經被UED指定，如想要自訂ClassName也是可以的，但ClassName前綴不可變動，並且所自訂的ClassName須為唯一值，固在自訂時，也請跟UED通知要自訂的ClassName）

##元件/模組分類與ClassName 前綴名稱

| 項目 | 目錄 | 名稱 | ClassName 範例 （##代表英數） |
| :-- | :-- | :-- | :-- |
| 圖示（icon font） |/ic-## |.ic |.ic-## / .ic_## |
| 使用者頭像（user avatar） |/ua-## |.ua |.ua-## / .ua_## |
| 提示文字（tips） |/tp-## |.tp |.tp-## / .tp_## |
| 標題（title） |/th-## |.th |.th-## / .th_## |
| 按鈕樣式（button） |/bt-## |.bt |.bt-## / .bt_## |
| 按鈕組合（button group） |/btg-## |.btg |.btg-## / .btg_## |
| 表單控制（form control） |/fcl-## |.fcl |.fcl-## / .fcl_## |
| 輸入元件（input、select） |/int-## |.int |.int-## / .int_## |
| 單複選（checkbox、radio） |/cr-## |.cr |.cr-## / .cr_## |
| 標籤徽章（label、badge） |/lb-## |.lb |.lb-## / .lb_## |
| 警訊（alerts） |/alt-## |.alt |.alt-## / .alt_## |
| 卡片面板（cards、panel） |/cd-## |.cd |.cd-## / .cd_## |
| 導航（navs） |/nv-## |.nv |.nv-## / .nv_## |
| 導航列（navbar） |/nvb-## |.nvb |.nvb-## / .nvb_## |
| 麵包屑（breadcrumb） |/bc-## |.bc |.bc-## / .bc_## |
| 分頁（pagination） |/pg-## |.pg |.pg-## / .pg_## |
| 進度、步驟條（progress） |/ps-## |.ps |.ps-## / .ps_## |
| 列表（list group） |/lig-## |.lig |.lig-## / .lig _## |
| 泡泡框（popovers） |/pp-## |.pp |.pp-## / .pp_## |
| 展開 / 收合（collapse） |/clp-## |.clp |.clp-## / .clp_## |
| 輪播（carousel） |/cl-## |.cl |.cl-## / .cl_## |
| 分隔線（line） |/hr-## |.hr |.hr-## / .hr_## |
| 表格（table） |/tb-## |.tb |.tb-## / .tb_## |
| 橫幅（banner） |/bn-## |.bn |.bn-## / .bn_## |
| 頁尾（footer） |/ft-## |.ft |.ft-## / ft_## |
| 頁首（header） |/hd-## |.hd |.hd-## / hd_## |
| 導航頁籤（nav tabs） |/ntb-## |.ntb |.ntb-## / .ntb_## |
| 導航選單組（navmenus） |/nvm-## |.nvm |.nvm-## / .nvm_## |
| 結果列表組合（result list） |/rli-## |.rli |.rli-## / .rli_## |
| 月曆（calendar） |/cy-## |.cy |.cy-## / .cy_## |
| 光箱（lightbox） |/lbx-## |.lbx |.lbx-## / .lbx_## |
| 對話框（modal） |/mdl-## |.mdl |.mdl-## / .mdl_## |
| 搜尋與篩選（search、filter） |/sf-## |.sf |.sf-## / .sf_## |
| 下拉選單（select） |/st-## |.st |.st-## / .st_## |
| 回頁首（affix top） |/atp-## |.atp |.atp-## / .atp_## |
| 紙娃娃（doll maker） |/dmk-## |.dmk |.dmk-## / dmk_## |
| 訂選位（booking、seats） |/bst-## |.bst |.bst-## / bst_## |
| 目的地選單（destination menu） |/dtm-## |.dtm |.dtm-## / dtm_## |
| 自動完成提示（autocomplete） |/atc-## |.atc |.atc-## / atc_## |
| 圖表（charts） |/cht-## |.cht |.cht-## / cht_## |
| 計時器（timer） |/cdt-## |.cdt |.cdt-## / cdt_## |

##開啟元件/模組資料夾，並建立文件
當你有了唯一的**ClassName**後，你就可以以該**ClassName為資料夾名稱**，如果你開發的是元件，請開資料夾在**components**下；若是開發的為模組，請開在**modules**資料夾下。

假設你所建立的資料夾為**th-lion**，此為標題元件，那請在th-lion下建立以下文件：

| th-lion / | 說明 |
| :-- | :-- |
| preview.html | 可以將您的HTML Code編寫在這裡並展示元件/模組 |
| css.scss | 你的scss開發檔 |
| /font | 字型資源放置資料夾，如果沒有，不須建立 |
| /img | 圖片資源放置資料夾，如果沒有，不須建立 |

##開始撰寫元件/模組HTML
以下為**preview.html**的範例HTML，在制定元件/模組的HTML時，請在**preview.html**中制定，所以你需要載入**core.css**與元件/模組的**css.css**：

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="../../core.css" rel="stylesheet">
	<link href="css.css" rel="stylesheet">
	<title>單獨模組樣式檢視</title>
	<!-- 使IE8可以用HTML5與看懂media queries，必需放在主要樣式下一行 -->
	<!--[if lt IE 9]><script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script><script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script><![endif]-->
	</head>
	<body>
		<div class="container example">
			<!-- 制定HTML結構 開始 -->
			...
			<!-- 制定HTML結構 結束 -->
		</div>
	</body>
	</html>

##撰寫元件/模組CSS

###注意事項

以下為css.scss範例，有幾個注意事項：

	// -------------------------------------
	// Susy Import
	// -------------------------------------
	//@import "susy";
	// -------------------------------------
	// Core Mixins
	// -------------------------------------
	@import "../../core/mixins";
	// -------------------------------------
	// Variables Import
	// -------------------------------------
	// 載入全域變數
	@import "../../core/variables";
	// -------------------------------------
	// Susy 設定載入
	// -------------------------------------
	@import "../../core/susy-config";
	// -------------------------------------
	// Components / Modules Setting
	// -------------------------------------
	// 請輸入您的ClassName
	$classname: 'pg-sample';
	// 請問是元件還是模組呢？若是元件，請輸入'components'（全小寫）；若是模組，請輸入'modules'（全小寫）
	$class-category: 'components'; 
	// 編譯後的CSS所在位置，如果你的CSS有需要讀圖檔或字型，請在URL字串前加上'#{$resource-path}'
	$resource-path: resource-path($class-category,$classname);
	// -------------------------------------
	// 您的CSS Code
	// -------------------------------------
	//以下範例可以刪除，改為您自已的CSS Code
	.#{$classname} {}

1. **必須Import** **Core Variables**與**Core Mixins**
2. **請保留並勿刪除或變更$resource-path**的設定，resource-path這個function是為了使你的元件/模組可以在被import時可以自動去更新元件/模組所需要的image、font資源URL。
3. ClassName請使用你所取得的值，並且在**$classname**輸入你的**ClassName**
4. 設定**$class-category**，若是元件，請輸入'components'（全小寫）；若是模組，請輸入'modules'（全小寫）
5. 在寫樣式時，請指定你的ClassName本身、或以下的階層，請勿試圖影響其他元素，例如：

		/* 以下這種以 ”+” 號或 ”~” 來影響區域外的下一個元素或其他的模組的方式請不要使用，這種選擇器請在元件/模組內使用 */
		.pg-## + .bt-## {
		    property : value;
		    ...
		}
		.pg-## ~ ul {
		    property : value;
		    ...
		}
		/* 為了確保每個模組的獨立與完整性，指定別的模組Classname也是不建議使用的 */
		.nv-## {
		    property : value;
		}
		.ic-## {
		    property : value;
		}

6. 在元件/模組的CSS如有要載入圖片或字型的需求，請使用**$resource-path**這個變數來做為url的開始路徑，如：

		 background: url('#{$resource-path}/imgs/pic.png');

若沒有照以上方法來設定資源的URL載入，您的元件/模組將會被要求加上喔！

###斷點設置

當你在設置各種斷點時，您可以使用核心所提供的變數（需要 @import "../../core/variables"）：

    $screen-phone        // 手機 320px
    $screen-tablet       // 平板 768px
    $screen-desktop      // 筆電、桌機 980px
    $screen-lg-desktop   // 較大桌機　1280px

###目前雄旅光速版需求

目前雄旅光速版是以**RWD為原則，在部份元件/模組沒辦法用RWD（Responsive Web Design）去設計CSS時，可以使用AWD（Adaptive Web Design）請後端來替換**；若是使用AWD設計CSS，桌上型裝置中，支援980以上、1280以上的斷點RWD變版，只收到斷點980的設計稿時，請依照等比例放寬至1280，行動裝置沒有收到斷點768的設計稿時，請以手機設計稿為主並等比例放寬元件/模組。


###請將您的CSS檔與Preview.html放置在同層

在**開發設計資源庫的元件/模組與開發一般平台的情況會有所不同**，為了import的方便與未來可維護性的考量，**請將您的CSS檔與SASS原始檔放置在元件/模組的根目錄中**，例如（假設模組ClassName為cd-lion）：

| cd-lion / | 說明 |
| :-- | :-- |
| preview.html | 可以將您的HTML Code編寫在這裡並展示元件/模組 |
| testing.html | 您的模組可在這個進行RWD的測試 |
| css.scss | 你的scss開發檔 |
| css.css | 已編譯好的css檔 |
| /font | 字型資源放置資料夾，如果沒有，不須建立 |
| /img | 圖片資源放置資料夾，如果沒有，不須建立 |

##撰寫元件/模組javascript
如你是使用jQuery，請使用v1.12.3版本，以下為注意事項：

1. 建議使用**匿名閉包**的設計方法，將你的程式碼打包，避免你使用的變數與其他模組相衝突
2. 建議將您的**jQuery**程式碼以**jQuery Plugin**方式來包裝你的程式，Plugin 的命名請使用**ClassName**

##測試與發佈
所設計的元件/模組必須支援IE8以上、chorme、firefox、safari等browser，當完成了測試就可以將你的元件/模組提交到SVN了，並且通知UED來驗收。

**提交到設計資源庫SVN需要提交您的sass文件，以利未來入庫與可維護性，還請開發人員配合。**

###RWD變版測試HTML Sample

以下Code為供您Copy下來並建立測試RWD變版的HTML，並存成testing.html，放置在您的元件/模組根目錄

	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link href="../../core.css" rel="stylesheet">
			<link href="css.css" rel="stylesheet">
			<title>單獨模組樣式檢視</title>
			<!-- 使IE8可以用HTML5與看懂media queries，必需放在主要樣式下一行 -->
			<!--[if lt IE 9]><script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script><script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script><![endif]-->
			<script src="http://code.jquery.com/jquery-1.12.0.min.js"></script>
		</head>
		<body>
			<div class="container">
				<div class="row">
					<div class="col-xs-24 col-sm-6 col-md-6 col-lg-6">
						<!-- 您要測試的元件/模組HTML 開始 -->
						...
						<!-- 您要測試的元件/模組HTML 結束 -->
					</div>
					<div class="col-xs-24 col-sm-12 col-md-12 col-lg-14">
						<!-- 您要測試的元件/模組HTML 開始 -->
						...
						<!-- 您要測試的元件/模組HTML 結束 -->
					</div>
					<div class="col-xs-24 col-sm-6 col-md-6 col-lg-4">
						<!-- 您要測試的元件/模組HTML 開始 -->
						...
						<!-- 您要測試的元件/模組HTML 結束 -->
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12 col-sm-14 col-md-16 col-lg-18 col-xs-push-12 col-sm-push-10 col-md-push-0">
						<!-- 您要測試的元件/模組HTML 開始 -->
						...
						<!-- 您要測試的元件/模組HTML 結束 -->
					</div>
					<div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xs-pull-12 col-sm-pull-14 col-md-pull-0">
						<!-- 您要測試的元件/模組HTML 開始 -->
						...
						<!-- 您要測試的元件/模組HTML 結束 -->
					</div>
				</div>
			</div>
		</body>
	</html>

###要提交前的檢查

1. 經過跨瀏覽器的測試？
2. 是否將您的元件/模組HTML自訂在preview.html？
3. preview.html、css.css、css.sass是否同層？
4. 載入**Core Variables**（@import "../../core/variables";）與**Core Mixins**（@import "../../core/mixins";）？
5. 是否有正確設定$classname、$class-category這兩種變數
6. $resource-path: resource-path($class-category,$classname); 此段代碼有保留
7. 設置URL資源時，有正確的使用 #{$resource-path} 
8. 是否經過testing.html的變版測試？