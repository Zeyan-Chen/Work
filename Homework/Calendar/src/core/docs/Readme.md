#設計資源庫Core層樣式說明

本說明的目的是要帶您了解Core層的Grid的排版方式，怎麼使用Core層所提供的Mixins來操作Grid排版，另外也提供Susy方法。

##下載Core層樣式與範例


請使用svn將所需要的檔案下載至你的本機：
http://svn.liontech.com.tw/svn/liondesignrepo
（還沒有設定好權限時請至 https://www.dropbox.com/sh/8wgobimbe5uguoq/AACMZEpiqlXw49TpYM_1xNvOa?dl=0 ）

##根目錄檔案說明


| 檔案名稱     | 類型     | 說明                         |
| :----------- | :------- | :-------------------------   |
| /components  | 資料夾   | 元件層sass                   |
| /core        | 資料夾   | Core層sass                   |
| /docs        | 資料夾   | 說明文件                     |
| /modules     | 資料夾   | 模組層sass與js               |
| core.css     | CSS      | Core層展示css                |
| core.scss    | SCSS     | Core層CSS原始檔              |
| layout.html  | HTML     | Core層展示頁，下載後才看得了 |
| Readme.html  | MarkDown | 說明檔                       |

##Core層樣式結構


所有使用設計資源庫的平台都會有相同一個Core樣式，Core的樣式結構依照載入順序分別如下：

* 樣式統一（normailze）
* 基礎樣式（base）
* 打印樣式（print）
* 字級字體（typography）
* 柵格／網格（grid）
* 修飾符／輔助工具（utility）
* RWD輔助（responsive utilities）

##Core層文件說明


| core / | 說明 |
| :-- | :-- |
| mixins | Mixins放置的位置 |
| _variables.scss | 各種變數設置 |
| _normalize.scss | normalize v3.0.3 |
| _base.scss | box-sizing、基本樣式、link樣式等…設定 |
| _print.scss | 一般列印樣式設定 |
| _typography.scss | h1~h6、p、ul、ol、dl、dt、dd與pre的設定 |
| _utility.scss | 所有修飾符與輔助工具的樣式 |
| _responsive-utilities.scss | RWD輔助樣式 |

##Mixins文件說明


| core/mixins / | 說明 |
| :-- | :-- |
| _border-radius.scss | 設定border-radius的輔助mixin |
| _clearfix.scss | 清除浮動 |
| _gradients.scss | 各browser（包括IE8）的漸層方法 |
| _grid-framework.scss | 設計資源庫所使用的Grid框架 |
| _grid.scss | Grid的使用Mixin |
| _opacity.scss | 支持IE8的半透明設定 |
| _responsive-visibility.scss | RWD輔助樣式的Mixin |
| _susy-modifier.scss | Susy的Mixin修改檔 |
| _tab-focus.scss | :focus時的outline修改 |
| _vendor-prefixes.scss | 集合各樣Vendor：<br>Animations、Backface visibility、Box shadow、Box sizing、Content columns、Hyphens、Placeholder text、Transformations、Transitions、User Select|

