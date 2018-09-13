#What is CCMCSS

為了因應大型內容網站的CSS可維護性，與多人同時開發CSS的可執行性，因而制定出CMUCSS設計規範。

CMU的意思為C（Core、Components）、M（Modules）、U（Unique）

#Getting Started

設計資源庫的核心（Core層）係依據雄旅光速版的斷點與版寬需求，並參考了bootstrap與susy的layout做法取其各自的做法與優點，如果您過去是熟悉bootstrap 3的Grid或是Susy的Grid都可以輕易上手！當然，在開發設計資源庫的模組時，也是依據本Core樣式來開發的。

###HTML5 doctype
所使用的 HTML 元素與 CSS 屬性都需要使用到 HTML5 doctype，將它包含在所有專案中頁面的第一行。

    <!DOCTYPE html>
    <html lang="zh">
    ...
    </html>

###行動設備優先
在框架核心面加入選擇性的行動友善樣式。這不是簡單增加一些選擇性的行動樣式，而且直接置於框架核心當中。事實上，設計資源庫的核心（Core層）樣式是行動優先。為了確保適當的呈現和觸控縮放效果，加入可視區域（viewport）的 meta 標籤到頁面的 `<head>`：

    <meta name="viewport" content="width=device-width, initial-scale=1">

####在行動設備上觀看電腦版網頁
在手機設備下要觀看桌上型設備時，viewport的設定會有所不同，這一部份需要通知後端人員：

    <meta name="viewport" content="width=980">

###Normalize.css
為了改善跨瀏覽器的呈現效果，使用了 [Normalize.css](http://necolas.github.io/normalize.css/)，此專案由[Nicolas Gallagher](http://twitter.com/necolas)與[Jonathan Neal](http://twitter.com/jon_neal)開發維護。

###Core.scss
打開core.scss後源始碼如下：

    // 如果是Ruby環境
    // @import "susy";
    // 如果是node.js使用bower套件管理環境
    @import "lib/susy/sass/susy";
    // -------------------------------------
    // 戴入設計資源庫CSS Mixins
    // -------------------------------------
    @import "core/mixins";
    // -------------------------------------
    // 戴入設計資源庫核心變數與樣式
    // -------------------------------------
    @import "core/variables";
    @import "core/normalize";
    @import "core/base";
    @import "core/print";
    @import "core/typography";
    @import "core/utility";
    @import "core/responsive-utilities";
    @import "core/grid";
    // -------------------------------------
    // Susy 設定
    // -------------------------------------
    @import "core/susy-config";

###Susy設定	    
core/_susy-config.scss的Susy設定如下：


    // -------------------------------------
    // Susy 設定
    // -------------------------------------
    $susy: (
        flow: ltr,
        math: fluid,
        output: float,
        gutter-position: inside-static,
        container: auto,
        container-position: center,
        columns: $grid-columns,
        gutters: 1/4,
        column-width: 40px,
        global-box-sizing: border-box,
        use-custom: (
            background-image: true,
            background-options: false,
            box-sizing: true,
            clearfix: true
        )
    );