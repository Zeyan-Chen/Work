
#Grid System

設計資源庫的核心（Core層）包含自適應功能，以行動優先的流動格線系統，並且隨著設備或可視區域大小縮放，格線系統會自動擴大最大至 24 個欄位。它包含易於佈局的**預定義類別**`.col-**-**`選項，以及用於產生更有語義怖局的**core mixins**及**susy mixins**。

###容器 Container
設計資源庫的核心（Core層）需要一個`.container`容器元素來包裝網站的Column。還請勿將`.container`巢狀套用。container會根據裝置的大小來改變`max-width`，您可以直接在HTML元素上套用`.container`外，您也可以使用**core mixins**或**susy mixins**來寫入

**預定義類別：**

    <div class="container">
    ...
    </div>
**Core Mixins：**

    .classname {
        @include container-fixed;
    
        @media (min-width: $screen-tablet) {
            max-width: $container-sm;
        }
        @media (min-width: $screen-desktop) {
            max-width: $container-md;
        }
        @media (min-width: $screen-lg-desktop) {
            max-width: $container-lg;
        }
    }
**Susy Mixins：**

    .classname{
        @include container($susy);
    }
####裝置斷點參數
當你在設置各種斷點時，您可以使用核心所提供的變數：

    $screen-phone        // 手機 320px
    $screen-tablet       // 平板 768px
    $screen-desktop      // 筆電、桌機 980px
    $screen-lg-desktop   // 較大桌機　1280px
###媒體查詢 Media Query
**一般方法：**

    /* 超小螢幕設備（手機，小於 768px）沒有媒體查詢，因為這是預設的。 */
    /* 小螢幕設備（平板，768px（含）以上） */
    @media (min-width: $screen-tablet) { ... }
    
    /* 中螢幕設備（一般桌面，980px（含）以上） */
    @media (min-width: $screen-desktop) { ... }
    
    /* 大螢幕設備（大型桌面，1280px（含）以上） */
    @media (min-width: $screen-lg-desktop) { ... }

**Susy Media**

    /* 超小螢幕設備（手機，小於 768px）沒有媒體查詢，因為這是預設的。 */
    /* 小螢幕設備（平板，768px（含）以上） */
    @include susy-media($screen-tablet) { ... }
    
    /* 中螢幕設備（一般桌面，980px（含）以上） */
    @include susy-media($screen-desktop) { ... }
    
    /* 大螢幕設備（大型桌面，1280px（含）以上） */
    @include susy-media($screen-lg-desktop) { ... }

###柵格參數
設計資源庫的核心（Core層）針對不同裝置大小提供更高的支援性，讓你可以對不同裝置設置不同大小的柵格。

|                 | 超小螢幕設備 手機（<768px）                     | 小螢幕設備 平板（≥768px） | 中螢幕設備桌面（≥980px） | 大螢幕設備 大桌面（≥1280px） |
| --------------- | -----------------                               | -------------------       | ----                      | ---                          |
| 容器寬度        | 無（自動）                                      | 768px                     | 960px                     | 1200px                       |
| 預定義類別前綴  | `.col-xs-*`                                     | `.col-sm-*`               | `.col-md-*`               | `.col-lg-*`                  |
| Core Mixins     | `make-xs-column(*)`                             | `make-sm-column(*)`       | `make-md-column(*)`       | `make-lg-column(*)`          |
| column 寬度     | 自動                                            | ~32px                     | ~40px                     | ~50px                        |

| 特性            | 說明                                            |
| --------------- | -----------------                               |
| column 數       | 24                                              |
| 中縫寬度        | 10px（column 左右邊各 5px）                     |
| 可巢狀套用      | 是                                              |
| 位移（Offsets） | 是                                              |
| 自訂column排序  | 是（susy不支援、請使用Core Mixins所提供的方法） |


###範例一：均分使用
你的column必需放在container中，你可以使用`.col-xs-*`、`.col-sm-*`、`.col-md-*`、`.col-lg-*`。[看範例](../layout.html)

**預定義類別：**

    <main class="container">
        <div class="row">
            <div class="col-lg-1">.col-lg-1</div>
            <div class="col-lg-1">.col-lg-1</div>
            <div class="col-lg-1">.col-lg-1</div>
            <div class="col-lg-1">.col-lg-1</div>
            ...
        </div>
    </main>
**Core Mixins：**

    // CSS
    .classname {
        @include make-lg-column(1);
    }
    // HTML
    <main class="container">
        <div class="row">
            <div class="classname">.col-lg-1</div>
            <div class="classname">.col-lg-1</div>
            <div class="classname">.col-lg-1</div>
            <div class="classname">.col-lg-1</div>
            ...
        </div>
    </main>

**Susy Mixins**
    
    // CSS
    .classname{
        @include susy-breakpoint($screen-lg-desktop) { 
        @include span(1);
        }
    }
    // HTML
    <main class="container">
        <div class="row">
            <div class="classname">.col-lg-1</div>
            <div class="classname">.col-lg-1</div>
            <div class="classname">.col-lg-1</div>
            <div class="classname">.col-lg-1</div>
            ...
        </div>
    </main>
###範例二：手機、平板、桌機混合使用
你可以在一個柵格上指定不同裝置所需要的寬度。[看範例](../layout.html)

**預定義類別：**

    <main class="container">
        <div class="col-xs-20 col-sm-16 col-md-12 col-lg-8">
            .col-xs-24 .col-sm-16 .col-md-12 .col-lg-8
        </div>
        <div class="col-xs-4 col-sm-8 col-md-12 col-lg-16">
            .col-xs-4 .col-sm-8 .col-md-12 .col-lg-16
        </div>
    </main>
**Core Mixins：**
    
    // CSS
    .side {
        @include make-xs-column(20);
        @include make-sm-column(16);
        @include make-md-column(12);
        @include make-lg-column(8);
    }
    .content {
        @include make-xs-column(4);
        @include make-sm-column(8);
        @include make-md-column(12);
        @include make-lg-column(16);        
    }
    // HTML
    <main class="container">
        <div class="side>
        ...
        </div>
        <div class="content">
        ...
        </div>
    </main>
**Susy Mixins：**

    // CSS
    .side {
        @include span(20);
        @include susy-breakpoint($screen-tablet) { 
            @include span(16);
        }
        @include susy-breakpoint($screen-desktop) { 
            @include span(12);
        }
        @include susy-breakpoint($screen-lg-desktop) { 
            @include span(8);
        }
    }
    .content {
        @include span(4);
        @include susy-breakpoint($screen-tablet) { 
            @include span(8);
        }
        @include susy-breakpoint($screen-desktop) { 
            @include span(12);
        }
        @include susy-breakpoint($screen-lg-desktop) { 
            @include span(16);
        }
    }
    // HTML
    <main class="container">
        <div class="side>
        ...
        </div>
        <div class="content">
        ...
        </div>
    </main>

###範例三：巢狀套用column
設計資源庫的核心（Core層）可以讓你巢狀套用column，在巢狀的column外你需要使用`.row`來清除最前欄與最後欄的padding。[看範例](../layout.html)

**預定義類別：**

    <div class="col-xs-20 col-sm-16 col-md-12 col-lg-8">
        Level 1
        <div class="row">
            <div class="col-xs-18 col-sm-12 col-md-9 col-lg-6">
                Level 2
            </div>
            <div class="col-xs-6 col-sm-12 col-md-15 col-lg-18">
                Level 2
            </div>
        </div>
    </div>

**Core Mixins：**

    // CSS
    .content {
        @include make-xs-column(20);
        @include make-sm-column(16);
        @include make-md-column(12);
        @include make-lg-column(8);
    }
    .wrap {
        @include make-row;
        .column1 {
            @include make-xs-column(18);
            @include make-sm-column(12);
            @include make-md-column(9);
            @include make-lg-column(6);
        }
        .column2 {
            @include make-xs-column(6);
            @include make-sm-column(12);
            @include make-md-column(15);
            @include make-lg-column(18);
        }
    }
    // HTML
    <div class="content">
        Level 1
        <div class="wrap">
            <div class="column1">
            Level 2
            </div>
            <div class="column2">
            Level 2
            </div>
        </div>
    </div>

**Susy Mixins：**

    // CSS
    .content {
        @include span(20);
        @include susy-breakpoint($screen-tablet) {
            @include span(16);
        }
        @include susy-breakpoint($screen-desktop) {
            @include span(12);
        }
        @include susy-breakpoint($screen-lg-desktop) {
            @include span(8);
        }
    }
    .wrap {
        @include make-row;
        .column1 {
            @include span(18);
            @include susy-breakpoint($screen-tablet) {
                @include span(12);
            }
            @include susy-breakpoint($screen-desktop) {
                @include span(9);
            }
            @include susy-breakpoint($screen-lg-desktop) {
                @include span(6);
            }
        }
        .column2 {
            @include span(6);
            @include susy-breakpoint($screen-tablet) {
                @include span(12);
            }
            @include susy-breakpoint($screen-desktop) {
                @include span(15);
            }
            @include susy-breakpoint($screen-lg-desktop) {
                @include span(18);
            }
        }
    }
    // HTML
    <div class="content">
        Level 1
        <div class="wrap">
            <div class="column1">
            Level 2
            </div>
            <div class="column2">
            Level 2
            </div>
        </div>
    </div>

###範例四：column位移
你可以使用位移來將你的column置中、置右或是移動到你想要的位置。[看範例](../layout.html)

**預定義類別：**

    <div class="col-lg-12 col-lg-offset-12">
        .col-lg-12 .col-lg-offset-12
    </div>
    <div class="col-md-12 col-md-offset-6">
        .col-md-12 .col-md-offset-6
    </div>
    <div class="col-sm-12 col-sm-offset-4">
        .col-sm-12 .col-sm-offset-4
    </div>
    <div class="col-xs-12 col-xs-offset-2">
        .col-xs-12 .col-xs-offset-2
    </div>

**Core Mixins：**

    // CSS
    .column1 {
        @include make-lg-column(12);
        @include make-lg-column-offset(12);
    }
    .column2 {
        @include make-md-column(12);
        @include make-md-column-offset(6);
    }
    .column3 {
        @include make-sm-column(12);
        @include make-sm-column-offset(4);
    }
     .column4 {
        @include make-xs-column(12);
        @include make-xs-column-offset(2);
    }
    // HTML
    <div class="column1">
        .column1
    </div>
    <div class="column2">
        .column2
    </div>
    <div class="column3">
        .column3
    </div>
    <div class="column4">
        .column4
    </div>

**Susy Mixins：**

    // CSS
    .column1 {
        @include susy-breakpoint($screen-lg-desktop) {
            @include span(12);
            @include pre(12);
        }
    }
    .column2 {
        @include susy-breakpoint($screen-desktop) {
            @include span(12);
            @include pre(6);
        }
    }
    .column3 {
        @include susy-breakpoint($screen-tablet) {
            @include span(12);
            @include pre(4);
        }
    }
     .column4 {
        @include susy-breakpoint($screen-phone) {
            @include span(12);
            @include pre(2);
        }
    }
    // HTML
    <div class="column1">
        .column1
    </div>
    <div class="column2">
        .column2
    </div>
    <div class="column3">
        .column3
    </div>
    <div class="column4">
        .column4
    </div>

###範例五：column 排序
正常情況你的column是根據你在HTML文件的順序來決定，設計資源庫的核心（Core層）提供變更順序的方法，讓你可以自由的排版，除了可以根據不同的裝置大小，給同一欄不同的寬度，更可以同一欄不同的順序喔！[看範例](../layout.html)

**預定義類別：**

    <div class="col-md-9 col-md-push-3">
        .col-md-9 .col-md-push-3
        在html中我是第一個，但顯示出來是第二個
    </div>
    <div class="col-md-3 col-md-pull-9">
        .col-md-3 .col-md-pull-9
        在html中我是第二個，但顯示出來是第一個
    </div>

**Core Mixins：**

    // CSS
    .column1 {
        @include make-md-column(9);
        @include make-md-column-push(3);
    }
    .column2 {
        @include make-md-column(3);
        @include make-md-column-pull(9);
    }
    // HTML
    <div class="column1">
        .column1
        在html中我是第一個，但顯示出來是第二個
    </div>
    <div class="column2">
        .column2
        在html中我是第二個，但顯示出來是第一個
    </div>

**Susy Mixins：**

    // CSS
    .column1 {
        @include susy-breakpoint($screen-desktop) {
            @include span(9);
            left: percentage((3 / $grid-columns));
        }
    }
    .column2 {
        @include susy-breakpoint($screen-desktop) {
            @include span(3);
            left: percentage((9 / $grid-columns));
        }
    }
    // HTML
    <div class="column1">
        .column1
        在html中我是第一個，但顯示出來是第二個
    </div>
    <div class="column2">
        .column2
        在html中我是第二個，但顯示出來是第一個
    </div>