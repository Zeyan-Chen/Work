React 模組開發範例
=========================== 

# 開發 環境設定

## Sublime

- SublimeLinter
- Babel Plugin
- Babel Snippets
- SublimeLinter-contrib-eslint

## Chrome React.js Developer Tool

# 模組專案環境設定

## .eslintrc

```js
{
  // use babel-eslint for parsing!
  "parser": "babel-eslint",
  "env": {
    // for browser
    "browser": true,
    // in CommonJS
    "node": true
  },
  // some rule options:
  "rules": {
    "quotes": [2, "single"],
    "eol-last": [0],
    "no-mixed-requires": [0],
    "no-underscore-dangle": [0]
  }
}
```

[eslinter config](https://eslint.org/docs/user-guide/configuring)

## package.json

```js
{
  "name": "sample.react",
  "version": "1.0.0",
  "description": "",
  "main": "component.jsx",
  "scripts": {
    "storybook": "start-storybook -p 9001 -c .storybook",
    "start": "webpack-dev-server --open --colors --progress"
  },
  "repository": {
    "type": "git",
    "url": "http://git.liontech.com.tw/_sample.react.git"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@storybook/react": "^3.1.9",
    "babel-core": "^6.25.0",
    "babel-eslint": "^7.2.3",
    "babel-loader": "^7.1.1",
    "babel-preset-env": "^1.6.0",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.4",
    "eslint": "^4.3.0",
    "eslint-plugin-react": "^7.1.0",
    "html-webpack-plugin": "^2.29.0",
    "sass-loader": "^6.0.6",
    "style-loader": "^0.18.2",
    "webpack": "^3.3.0",
    "webpack-dev-server": "^2.6.1"
  },
  "dependencies": {
    "react": "^15.6.1",
    "react-css-modules": "^4.5.2",
    "react-dom": "^15.6.1"
  }
}
```
## webpack.config.js

```js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        preview: './preview.js'
    },
    output: {
        path: path.resolve(__dirname, './'),
    },
    module: {
        rules: [
            {
                test: /\.css$|\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]'
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.js?$|\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react']
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        compress: true,
        port: 9000
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './preview.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
```


# HelloWorld解說與JSX語法

## 學習目標

1. HelloWorld程式碼說明
2. 基本的開發與執行的流程
3. JSX語法與React Element(元素)
4. React Component(元件)語法

## HelloWorld程式碼說明

上一章最後使用了一個簡單的範例 - `HelloWorld`。這是一個在React中稱之為元件的撰寫方式，現在我們開始來解說這個元件的程式碼內容。或許你會認為這程式碼這麼簡單，有什麼好說的，不過這裡面包含了React應用最基礎的結構，對初學者來說，這些都是必學的基礎知識，之後在複雜的元件中都是同樣的結構。

首先是最上面的兩個語句，這是ES6中引用模組的語句，這兩個是所有React根程式檔案所需要的模組，一個是`React`，另一個是`ReactDOM`:

```js
import React from 'react'
import ReactDOM from 'react-dom'
```

如果你在這個程式碼檔案只需要撰寫元件，不需要渲染(render)到網頁上，那只需引用`React`模組即可。

> 注意: 這裡會有個常遇見的問題，如果你在程式碼裡用了JSX語法，至少要匯入'react'套件，因為JSX語法是個簡寫語法(下面有說明)，裡面用了這個套件裡的方法。

通常我們會把每個元件寫在一個獨立的程式碼檔案之中，這樣比較容易管理，通常檔案名稱就是那個元件的名稱，例如`MyButton`元件的檔案名稱就會使用`MyButton.js`或是`MyButton.jsx`。

> 注意: .jsx副檔名的檔案格式，其實與.js副檔名的並無差異，有些人認為如果程式碼裡用了JSX語法，就使用.jsx副檔名，這樣比較好作區別。不過但前提是你的開發工具要認得這種副檔名，不然語法無法作高亮度顯示，也沒有自動完成的功能。

如果你需要引用某個你自己的元件檔案，只需要用以下的語法就可以引用，不過前提是你的`MyButton.js`中也要有對應的`export`語句，代表輸出模組。這語句中的`./`代表是同一目錄中，注意後面並不需要加上副檔名:

```js
import MyButton from './MyButton'
```

一般來說，在較具規模的應用中，你可以使用元件(Components)、樣式(Style)等等資料夾，來區分不同的程式碼檔案，作為一個檔案管理組織分類的方式。`import`語句可以針對這些資料夾來使用，例如你把`MyButton.js`放在`Components`資料夾中，可以用下面的語法來匯入:

```js
import MyButton from './Components/MyButton'
```

接下來的程式碼是一個元件的類別繼承宣告，因為我們一開始用的元件內容很簡單，所以幾乎沒寫什麼，只有一個`render`方法的定義而已，類別定義是ES6標準的新內容。

```js
class HelloWorld extends Component {
    render() {
        return <h1>{this.props.text}</h1>
    }
}
```

這個宣告代表著元件都是由`React.Component`類別繼承而來的，所有的元件都是一樣的寫法。

```js
<h1>{this.props.text}</h1>
```

那麼這一段是什麼？看起來好像是HTML中的`<h1>`標記的寫法，但中間的又好像是JavaScript的程式碼。

這種把HTML寫在JavaScript的程式碼中的技術，稱之為JSX語法，是React中很特別的一種語法，它可以讓你把HTML中的各種標記，直接混在JavaScript程式碼中來寫(並不是字串，而是直接使用)。JSX語法在React中是一種必學的語法。當HTML的標記與JavaScript互相混在一起時，為了要標明與執行JavaScript的程式碼，所以用了花括號({})把程式碼的部份括起來。所以`this.props.text`這一句是JavaScript的程式碼沒錯。

那麼`this.props.text`指的又是什麼？

`this`是這個元件類別所產生的物件實體，`props`則代表屬性(property)的複數簡寫，也就是有可能有多個屬性，屬性這個東西，其實如果你懂HTML大概就很容易理解，像下面這樣的HTML標記:

```html
<img src="images/test.jpg" width="100" height="100" alt="..." />
```

對`img`元素標記來說，"src"、"width"、"height"、"alt"就是它的屬性。(不過在英文裡專有名詞叫"attributes"，中文翻譯也是"屬性")

我們的`HelloWorld`元件會拿來與HTML中的`img`標記比對，那有什麼是它的屬性(props)？就是`text`這個。下面這段程式碼的意思是，要把`HelloWorld`元件中的`text`屬性的值，顯示在這個位子上:

```js
{this.props.text}
```

怎麼看出來它這個屬性，最後是什麼值？就App.js中的這一段的程式碼:

```js
<HelloWorld text="今天就開始學React!" />
```

有看到`<HelloWorld text="今天就開始學React!" />`這行了嗎？它是不是長得和上面說的HTML中的`img`標記的語法有點像，當然我們只能透過這個方法來作這件事，你不能直接存取或修改網頁上DOM元素。

那麼要渲染(顯示)怎麼樣的內容呢？就是`<HelloWorld text="今天就開始學React!" />`這個元件的內容。

`HelloWorld`是我們設計好的元件，它真正的HTML顯示內容是下面這個，所以最後的輸出就是把`text`裡面的值代換入這個內容中:

```js
<h1>{this.props.text}</h1>
```

也就是像下面這樣:

```html
<h1>今天就開始學React!</h1>
```

props是讓元件之間建構出擁有者元件(owner)與被擁有者元件(ownee)間的關係，這也是父母元件與子女元件間的傳遞資料(溝通)的第一種關係，可以由下圖來說明:

![props](https://raw.githubusercontent.com/eyesofkids/ironman2017/master/day15_jsx/asset/props.png)

擁有者通常指的是某個位於上層的元件。規則很簡單:

- A元件在`render()`中建立了B元件，A就是B的擁有者。(或者可以說因為A元件的定義中設定了B元件的屬性)
- 元件是無法改變自己的`props`(屬性)，這是它的擁有者才可以作的事。

> 特別注意: 元件無法改變自己的`props`，這是我們學習到的第一條React的強硬規則。一定要記住。

> 註: 在這個範例中，我們使用了三個程式檔案，分別是index.js, App.js, HelloWorld.js。這只是一般應用上的分隔，你不一定要按照這個區分方式。index.js作為最後把虛擬DOM轉譯為直實DOM的檔案，它算是個入口檔案(entry)。App.js則是集中整合所有的元件，它是整個應用的元件控制中心。HelloWorld.js則是我們自己寫的元件內容，之後有可能有很多元件。這樣作看起來很麻煩，但這樣的分隔實際上有一些好處，它可以讓每個程式檔案要作的事情分隔清楚。之後如果元件愈來愈多時，就可以獲得比較好的組織管理。

## 開發與執行的流程

React開發的流程大致上像下面這樣:

1. 撰寫每個元件的內容，每個元件區分不同的程式碼檔案，每個元件之間可以互相輸出匯入來引用。
2. 最後統整到index.js中，以`ReactDOM.render`方法作最後的輸出(渲染)的工作。
3. 開發完成打包(壓縮 & 醜化)成一個js檔案，然後發佈這個檔案。

因為React函式庫並沒有附帶可以負責組織整體流程的框架，要作資料流與元件之間的溝通，只能使用一些基本方式。如果要在複雜的元件間作互動管理，需要另外再使用Redux之類的Flux概念架構函式庫來協助。不過這個要等到你對React的開發已經有一定的熟悉程度再來使用，後面的課堂會再說明。

## JSX語法與React Element(元素)

React的核心概念中有兩個，一個是React Element(元素)，另一個是React Component(元件)，兩者都是虛擬DOM中的東西。React Element(元素)是其中最基本的概念。

React Element(元素)是一個React用於描述虛擬DOM元素的物件，它只有單純用於描述的屬性值，其中沒有帶有方法，在(prototype)原型中也沒有其他東西，它用四個重要的屬性來描述DOM元素:

- type: 一個字串，代表任何合法的HTML元素類型名稱，例如h1、div，或是參照到React程式碼中定義的的元件類別。
- props: 對應到元素的屬性值的屬性。
- key: React用來識別元素的屬性，尤其是在同樣類型的元素間要用這個屬性來區分。
- ref: React用來存取對應的實體(真實)DOM用的屬性。

React Element(元素)需要透過`ReactDOM.render`方法，才能把虛擬DOM元素，轉換為實體(真實)DOM，也就是說React Element(元素)代表的是一種無狀態的、不可改變的、虛擬的DOM元素，它就是所謂的"**Virtual DOM**"的組成分子。React元素與元件間是一種"你之中有我，我之中有你"的結構。

React提供了`React.createElement`方法，讓開發者可以自行定義React Element(元素)，也可以組合元素們間的 父母-子女(parent-children) 關係。下面的程式碼範例中，使用了`React.createElement`方法來建立虛擬的DOM元素:

```js
var child = React.createElement('li', null, '項目')
var root = React.createElement('ul', { className: 'my-list' }, child)

ReactDOM.render(root, document.getElementById('root'))
```

最後在網頁上的真實DOM元素的結構會像下面這樣:

```html
<ul data-reactroot="" class="my-list">
  <li>項目</li>
</ul>
```

這個React Element(元素)，也就是用於描述的虛擬DOM元素的JavaScript物件會長這個樣子，實際上是可以有巢狀結構的:

```js
{
  type: 'ul',
  props: {
    className: 'my-list',
    children: {
      type: 'li',
      props: {
        children: '項目'
      }
    }
  }
}
```

講了這麼久，那JSX語法與這個React Element(元素)有什麼關係？

我們先說明JSX語法是什麼，是一種可以讓HTML標記直接寫在JavaScript程式碼中的擴充語法，`X`代表的是`XML`語法的意思，React允許你可以這樣作，是因為它在讀到JSX語法時，會自動幫你用`React.createElement`方法來建立虛擬的DOM元素，也就是說JSX語法實際上就是使用`React.createElement`方法的簡寫語法。這當然需要透過babel編譯工具才能正確轉譯，之前有提過babel是Facebook贊助的專案，自然會跟著React要作什麼運用而加這些功能。

雖然React並沒有強迫你一定要用JSX語法來定義虛擬的DOM元素的結構與內容，但說實在的，如果DOM元素複雜了些，加上又在其中要混用JavaScript語句，使用`React.createElement`會讓程式碼顯得混亂，所以JSX語法是一定要用的。上面的範例寫成JSX語法會非常的直覺，就像在寫一般的網頁HTML碼一樣:

```js
const root =  <ul className='my-list'><li>項目</li></ul>
```

當然，JSX語法中的這些HTML標記，並不是真正的網頁上HTML的標記，而是人造的、假的，這是經過React中設計的用來對應合法的HTML標記。有些HTML的標記中的屬性會和JavaScript語言相衝突，所以會被改用別的名稱，不過這種例外情況並不多見，只有HTML標記中的屬性`class`與`for`，它們在JSX語法中要改用`className`與`htmlFor`來取代，官方的這個[深入 JSX](https://facebook.github.io/react/docs/jsx-in-depth.html)網頁上可以參考更多資訊。

你如果要把用JSX語法寫成的語句，倒回去看真正的`React.createElement`的方法應該怎麼寫，可以用[babel提供的線上轉換程式](https://babeljs.io/repl/)來轉換，這一段JSX的語法，真正的JavaScript執行語句是，和上面的寫法差不多，只是寫到同一個語句中:

```js
var root = React.createElement(
  'ul',
  { className: 'my-list' },
  React.createElement(
    'li',
    null,
    '項目'
  )
);
```

React Element(元素)也可以用來描述我們自訂的元件，就像一般的HTML元素一樣。我們在`HelloWorld`範例中用的JSX語法有兩個地方，我把它們的對照createElement方法的程式碼寫在下面。其中一個是元件的類別定義處:

```js
//JSX
<h1>{this.props.text}</h1>

//createElement
React.createElement(
  "h1",
  null,
  undefined.props.text
);
```

另一個是在最後的`ReactDOM.render`方法中:

```js
//JSX
<HelloWorld text="今天就開始學React!" />

//createElement
React.createElement(HelloWorld, { text: "今天就開始學React!" });
```

React Element(元素)會把我們自訂的元件，當作一種特別的`type`(類型)，也就是把它當作是一種可以使用的DOM元素來描述，當然同樣也可以有巢狀的結構。

## React Component(元件)語法

React Component(元件)是React的真正的心臟與靈魂。可以說React就是一個讓開發者打造自訂元件用的函式庫。相較於React Element(元素)只是單純的描述虛擬DOM的屬性內容，React Component(元件)則是裡面可以封裝多個React Element(元素)或封裝其他元件，也可以帶有狀態(state)，以及各種事件處理的方法。

在React v15中，我們可以用下面三種方式來定義一個元件。會有這麼多種的方式，大概是React的設計者們認為，多幾種方式可以讓不同需求的開發者增加來使用React的誘因，菜色不同但都可以吃好吃飽。

第一種在`HelloWorld`的範例中有看到了，這是ES6+的類別定義方式，是使用繼承自React.Component類別的語法，這樣式又可以稱為建構式樣式(constructor pattern)。因為現在可以直接執行ES6+相關語法與API的瀏覽器，通常會需要要新版本的瀏覽器，而且還不見得會100%相容。所以我們會先經由babel工具幫忙先轉成ES5語法再執行，這樣在瀏覽器各種不同版本與品牌中，可以得到最大的相容性。ES6+是一種未來將會普及的語法，這也是時間早晚的問題而已。

```js
class HelloWorld extends Component {
    render() {
        return <h1>{this.props.text}</h1>
    }
}
```

> 註: ES6+指的是使用了ES6標準以上的語法或API。

第二種是ES5的語法，這是為了要能相容於只支援ES5的瀏覽器，所使用的一種方式，最早React的版本中只有這種語法，所以現在官網或網路上的範例大部份都是用這種語法，如果你連JSX語法也不使用的話，那麼是完全可以不需要babel工具，就可以在各種支援ES5標準的瀏覽器中執行。這種樣式又可以稱之為工廠樣式(factory pattern)。不過現在開始這種語法會慢慢減少，主因是它在自訂方法或屬性時，比第一種方式的彈性少很多。

```js
var HelloWorld = React.createClass({
  render: function() {
    return <h1>{this.props.text}</h1>
  }
});
```

第三種是函式定義樣式，這只能在無狀態的函式元件(Stateless functional components)上使用，像我們這個`HelloWorld`就是無狀態的(stateless)，裡面沒有定義`state`值與相關生命週期的方法，純粹是個顯示用的簡單元件，所以可以用這個語法。這個語法是在React 0.14版本才加入的，也是前不久的事情而已(2015/10)。通常這個樣式還會使用ES6中的箭頭函式語法，讓程式碼更簡潔，不過它看起來不太像是個功能很強大的元件就是了，純粹是個函式而已:

```js
 const HelloWorld = (props) => (
   <h1>{props.text}</h1>
 )
```
> 註: 不知道你有發覺到了嗎，這無狀態元件的寫法，其實就是我們之前有一章談到的"純粹函式"。
>
> 註: React的最近版本是從0.14直接大跳板號到15.0的。
>
> 註: 箭頭函式的後面使用括號(())是只有單個語句時使用的，會自動加上return在語句前。如果是多行語句要用花括號({})，而且要自行加上return的語句。


結果這三種語法對我們的`HelloWorld`元件來說，都可以得到同樣的結果。實際上不論你是用ES6類別的定義(建構式樣式)，或是`React.createClass`方法(工廠樣式)，React都不允許你自己建立元件的實體，元件仍然是在虛擬DOM中的東西，也就是說就算你使用類別的定義方式，你在整個的應用中，也不能使用`new`運算符來由類別產生實體。產生實體這件事要交給React來作，`ReactDOM.render`是唯一能將虛擬DOM(渲染)到實體DOM的方法。

所以，不論你是使用類別、`React.createClass`方法或函式定義，它們都是React的元件，仍然是把props(屬性)當成輸入，最後把React Elements(元素)作為回傳，這也是元件最基本的結構。不過當然每種語法所能使用的特性有所不同，使用的語法也不相同。

在本課堂中，我們只會使用第1種ES6+語法與第3種，工廠模式是算是舊的ES5語法，現在有很多新的範例或教學都開始改用新式的ES6+語法了。如果你會第1種語法，要看得懂ES5語法不會很困難。


## 結論

本章說明了簡單的HelloWorld應用中的幾個基本的知識，在讀過本章後，應該掌握的幾個重點如下:

- JSX語法是React.createElement的簡寫語法，要使用它需要匯入(import)react函式庫，並且要透過babel工具編譯才可以。
- props(屬性)是在JSX語法中，用類似HTML標記的方式，在標記中指定屬性給元件的一種語法。
- 元件不能改變自己的props，只有它的擁者有元件(owner)可以作這件事。
- 元件共有三種語法，不同的語法可以得到同樣的結果，目前都是使用ES6類別的語法，以及無狀態的函式元件語法。

# TextInput程式

第一個是無狀態的顯示元件，名稱是TextShow，它的檔案名稱是TextShow.js，裡面的內容很簡單，只有下面這樣而已:

> components/TextShow.js

```js
import React, { Component } from 'react';

const TextShow = (props) => (
    <h1>{props.text}</h1>
);

// 加入props的資料類型驗証
TextShow.propTypes = {
  text: React.PropTypes.string.isRequired
};

// 匯出TextShow模組
export default TextShow;
```

另一個檔案是我們主要的元件名稱是TextInput，而且它裡面會匯入使用到TextShow元件，檔名一樣是用`TextInput.js`，因為檔案滿長的，所以分幾個部份來看首先是最前面的部份:

> components/TextInput.js

```js
import React, { Component } from 'react';
import TextShow from './TextShow.jsx';

class TextInput extends Component {
    // 建構式
    constructor(props: Props) {
        // super是呼叫上層父類別的建構式
        super(props)

        // 設定初始的狀態。注意！這裡有個反樣式，不要用props的值來設定state的初始值
        this.state = {
            text: '',
        }

    }
    // 處理的方法，用e.target可以獲取到輸入框的值，用箭頭函式可以綁定`this`
    handleChange(e) {
        // Flow會檢查必定要HTMLInputElement的物件才能有輸入值
        console.log(e);
        console.log(e.target);
        console.log(e.bubbles);
        console.log(e.preventDefault);
        console.log(e.type);
        // console.log(e.target);
        if (e.target instanceof HTMLInputElement) {
            this.setState({text: e.target.value})
        }
    }
    // 渲染方法，回傳React Element(元素)
    render() {
        return (
            <div>
                <input type="text"
                    value={this.state.text}
                    placeholder={this.props.initText}
                    // onChange={(e) => this.handleChange(e)}
                    onChange={this.handleChange.bind(this)}
                />
                <TextShow text={this.state.text}/>
            </div>
        )
    }
}

//加入props的資料類型驗証
TextInput.propTypes = {
    initText: React.PropTypes.string.isRequired
}

export default TextInput;
```
這個接下來的程式碼部份，是這個範例的重點。首先這使用了之前說明的在類別中的箭頭函式，這是一個超出ES6標準的語法。這是為了要綁定this在這個方法中可以使用，因為在這個方法中，我們需要使用到`this.setState`這個方法。

`setState`是一個元件中非常重要的方法，state(狀態)是元件的內部使用的一個值(一般為物件值)，在元件中的state是不可以直接更動其中所包含的值，也就是如果你直接用`this.state.text = 'Hello'`這樣的更動語句，React會產生錯誤給你。唯一可以更動state的，只有透過`setState`這個方法，這是React中我們學到的第二條強硬規則。

> 特別注意: 唯一可以更動元件中的state(狀態)，只有使用setState方法。

這個`handleChange`方法主要是要處理文字框輸入的事件，它可以獲取得到事件物件，在React中使用JSX語法所寫的事件都是人造(假的)事件，是由React中設計出來對應真實DOM中的事件物件，實際在使用時與一般的事件差不多。React中的事件的對應，類似於DOM事件處理模型的內聯模型的寫法，是寫在JSX語法中對應的DOM元件標記上的。也就是對應下面的這段在`render`方法中`onChange`的語法:

```js
<input type="text"
    value={this.state.text}
    placeholder={this.props.initText}
    // onChange={(e) => this.handleChange(e)}
    onChange={this.handleChange.bind(this)}
/>
```

React中的人造事件，都是使用小駝峰的命名法，例如`onChange`、`onClick`這樣，而DOM事件處理內聯模型是用全小寫，React會協助處理用監聽的方式來處理事件，你**不需要**再使用`addEventListener`的方法來作事件的監聽。關於React中處理事件的方式，你可以參考官方的[這篇文件](https://facebook.github.io/react/docs/handling-events.html)中的說明。

第三個檔案是App.js，它仍然是最上層的用於集中所有元件的元件，與之前的範例相同。它會設定TextInput中的props.initText這個屬性值。程式碼如下:

> components/App.js

```js
import React, { Component } from 'react';
import TextInput from './TextInput.js';

class App extends Component {
  render() {
    return <TextInput initText="開始輸入文字吧！" />
  }
}

//輸出App元件
export default App;
```

第四個檔案是我們用來呈現元件在網頁上的程式碼檔案index.js，裡面會引用TextInput元件，程式碼如下:

> preview.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
```

## 其他部份的詳細解說

### 用propTypes限制props(屬性)值的類型

props(屬性)並沒有限制你只能指定給它什麼樣類型的值，可以是JavaScript中常見的幾種資料類型，字串、數字、布林、函式、陣列、物件與符號(Symbol)。你從範例中看到，元件會自動就會取得你所定義的props(屬性)值，例上面的範例中`TextShow`元件中的程式碼使用了一個名稱為`text`的props(屬性)，在JSX中使用它就可以獲取得到設定的值。

當元件中的結構很複雜時，props(屬性)的值有很多不同種類時，對於屬性值不加上限制會變得麻煩，我們需要一個檢查的機制可以來預先聲明，哪一些props(屬性)是必要的或可選的，或是它們只能使用哪種資料類型，這對於打造可重覆使用的元件很重要。

React中可以使用類別中的`propTypes`屬性來定義props(屬性)的限制，在執行時會對這些受限制的props(屬性)作檢查，`propTypes`屬性需要定義為靜態屬性，如果是像`TextShow`是一個使用 無狀態的功能性元件(Stateless functional components)的定義法，它的`propTypes`屬性只能使用下面的語法再額外定義，這語句是寫在函式區塊的"**外面**":

```js
TextShow.propTypes = {
  text: React.PropTypes.string
}
```

這將會限制這個屬性只能使用字串類型，當你傳入其他資料類型時(例如數字)，就會出現以下的警告訊息(不會中斷程式):

```
Warning: Failed prop type: Invalid prop `text` of type `number` supplied to `TextShow`, expected `string`.
```

不過這時候只會對`text`作資料類型的檢查，如果你想要設定這個props(屬性)是必要的，需要再加上`isRequired`在檢查類型的後面(連鎖語法)，像下面這樣:

```js
TextShow.propTypes = {
  text: React.PropTypes.string.isRequired
}
```

關於其他的可使用的props驗証，請參考[React官網這裡](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)的說明，可用的規則還滿多的。不過你大概已經發現了，`propTypes`只會出警告，並不會發生錯誤來中斷你的程式，也就是說它並不是一種強制性的類型限制。我們之後在其他的教學範例中會看到使用這些規則

### props(屬性)的預設值

props(屬性)也可以設定一個預設值，可以使用`defaultProps`來給定某個props(屬性)的預設值，這個屬性的設定方式與上面的`propTypes`屬性一模一樣。

所以在`TextShow`元件中設定其中的text屬性的預設值語法，注意這是設定在函式的外面:

```js
TextShow.defaultProps = {
  text: '文字秀!'
}
```

在`TextInput`元件中的定義`getDefaultProps`的方式一樣有兩種。第一種是用在類別定義區塊外面的寫法:

```js
TextInput.defaultProps = {
  initText: '來輸入一些文字吧!'
}
```

這個預設值只會在元件的這個屬性，沒有被設定任何值時才會使用到。當有設定預設值(`defaultProps`)時，`propTypes`中的`isRequired`(必要)檢查就會算通過了。

## 元件的"擁有者-被擁有者(owner-ownee)"關係

`props`(屬性)中有關"擁有者-被擁有者(owner-ownee)" 的關係，這關係只會存在於React元件定義中，擁有者通常指的是某個位於上層的元件。規則很簡單:

- A元件在`render()`中建立了B元件，A就是B的擁有者。(或者可以說因為A元件的定義中設定了B元件的屬性)
- 元件是無法改變自己的`props`(屬性)，這是它的擁有者才可以作的事。

擁有者-被擁有者 關係對比DOM元素中的樹狀結構中的父母-子女關係，父母-子女是類似DOM中的直接的上下層結構關係，而擁有者-被擁有者 關係是定義時的設定props(屬性)的關係。以我們的例子來說:

- "擁有者-被擁有者" 關係: TextInput元件是div、input與TextShow元件的擁有者
- "父母-子女" 關係: TextShow元件的父母節點是div

"擁有者-被擁有者(owner-ownee)"的關係之所以會重要，因為它涉及到資料流(Data Flow)的概念。元件本身無法改變自己的props(屬性)，對元件本身來說，自己的屬性是無法改變的(immutable)，但它的擁有者元件可以。

這可以形成我們看到的第一種元件互相溝通的關係，由"擁有者-被擁有者(owner-ownee)"所建立的 - `擁有者 -> 被擁有者`的資料流，以我們的範例來說，也就是直接在TextInput(擁有者)元件中的定義裡，直接設定TextShow(被擁有者)元件的props屬性。

## state(狀態)

> Components are Just State Machines (元件就是狀態的機器) ~ React官方文件

state(狀態)是元件中重要的特性，React認為元件就是狀態的機器，代表state(狀態)特性在元件中的重要程度。不過並不是所有的元件都要變成狀態機器，在你的應用程式中使用的組成元件們，大部份都是無狀態(Stateless)的元件，只有少數幾個會是有狀態的(Stateful)的元件。無狀態(Stateless)的元件一般都只會寫成函式元件的語法。

在React中的設計是，你只要簡單地更新元件的狀態(state)，React會負責用最有效率的的方式來更新真實的DOM的樣子。對開發者來說，就是整個重新渲染的概念，一有小更動就整個全部渲染，有點類似不斷在瀏覽器中重新整理你的網頁。但在React中只是對Virtual DOM(虛擬DOM)作這件事而已，React自己會想辦法真正渲染到真實網頁上的DOM中。你可以把React想成是一個女僕或男管家，大小事都叫他去幫你處理就行了。當然為了在有些情況下，一定需要在真實的DOM元素上處理，React也提供了一些方式可以存取到真實的DOM元素。

那麼在React中，要怎麼觸發重新渲染的事件？

就是靠改變`state(狀態)`，也就是使用`setState`方法來改變原有的狀態值，就會觸發重新渲染(re-render)的事件，就這麼簡單而已。再次強調，`state(狀態)`也只能靠`setState`方法才能改變，這是一個強硬規則。

state(狀態)是代表會在程式執行時，會被改變的一種值，像我們的範例中，那個文字輸入框中的輸入文字，就會一直被改變(因為一直在輸入，它也只有這個功能…)，很明顯的它就是一個`state(狀態)`中的值。

state(狀態)一開始會在元件定義，因為state(狀態)也是個物件，所以會先定義它的初始值，以我們的範例來說是在建構式中定義`this.state`物件，其中有一個`text`屬性，初始值是空白字串:

```js
//建構式
constructor() {
    //super是呼叫上層父類別的建構式
    super()

    //設定初始的狀態。注意！這裡有個反樣式，不要用props的值來設定state的初始值。
    this.state = {
        text: ''
    }
}
```


當使用者在文字框中不斷輸入字串時，要設計讓它會觸發`state(狀態)`的改變，以此來觸發重新渲染，所以程式碼會像下面這樣寫，`event.target.value`代表要把`text`屬性的值改變為文字框當下輸入的值:

```js
//處理的方法，用e.target可以獲取到輸入框的值，用箭頭函式可以綁定`this`
handleChange = (e) => {
    this.setState({text: e.target.value})
}
```

因為`state(狀態)`時，我們還需要把它顯示到`TextShow`元件中，所以用上面的 擁有者-被擁有者 關係的資料傳遞方式，把TextShow元件標記中的`text`屬性值先定義為`{this.state.text}`，因為`TextShow`元件位於render方法中，每次只要重新渲染時，`text`屬性值也會跟著`state(狀態)`的值改變。像下面的程式碼這樣:

```js
//渲染方法，回傳React Element(元素)
render() {
    return <div>
              <TextShow text={this.state.text}/>
            </div>
}
```

範例程式中整體的`state(狀態)`使用，以及搭配被擁有者元件的`props(屬性)`資料流，程式碼的流程就是這樣。

`state(狀態)`的運用與概念並不困難，只要花點時間就能掌握。因為這個範例還算非常簡單的應用程式，之後的教學中的使用開始會複雜些。`state(狀態)`是被鎖住在每個元件中使用的，這也造成`state(狀態)`有一些限制，在複雜的使用者介面應用程式中，`state(狀態)`需要搭配其他的架構來協助資料流的處理。

### state(狀態) 比較 props(屬性)

那props(屬性)相較於state(狀態)是什麼？

前面說了那麼多，props(屬性)就是元件的屬性值，在元件的標記裡設定，它的主要功能是設定元件中的"屬性"值用的，就像一顆西瓜中的屬性有重量、大小、產地、顏色、甜度之類的屬性。要特別注意，並不是說props(屬性)的值是不能改變的，而是元件不能改變自己本身的屬性，只有它的擁有者元件可以作這件事。

state(狀態)並不是props(屬性)的相反特性，這是一個常見的誤解，它們兩個是相關配合使用的屬性，只是某些其中的屬性設計成很類似。如果你有看到網路上的比較表，我建議你可以跳過，這兩個並不是相對的東西，拿來作比較反而會造成誤解。它們是相輔相成的特性。一個元件自主在內容中管理自己本身的state(狀態)，它可以說是元件中"私有的(private)"特性。

props(屬性)可以先設定預設值，只是在沒有給定某個props(屬性)時自動給定這個預設值。state(狀態)代表的是在應用程式執行中一直改變的值，state(狀態)給定初始值只會在一開始第一次應用程式建立執行時，才使用這個初始值，之後應用程式就不會再使用它。state(狀態)的初始值的概念與props(屬性)的預設值不太一樣。

所以上面的程式碼註解中有一個反樣式，這個反樣式就是**不要用props(屬性)來設定state(狀態)的初始值**，根據官方(上一版的)的文章內容，單純的使用屬性值來設定作內部的狀態初始而已是可接受的樣式，但是如果還要利用props(屬性)的運算結果值就不能接受。這個原因是state(狀態)的初始值只會在應用程式第一次建立時使用，之後的重新渲染並不會再使用初始值。

# TodoList程式


![intro](https://raw.githubusercontent.com/eyesofkids/ironman2017/master/day17_todolist/asset/intro.png)

![TextInput元件展示](https://raw.githubusercontent.com/eyesofkids/ironman2017/master/day17_todolist/asset/day17_demo.gif)

> 註: 本文章附有影片，影片網址在[Youtube的這個網址](https://youtu.be/PtGcztIDVOE)。本文章同步放置於[Github庫的這裡](https://github.com/eyesofkids/ironman2017/tree/master/day17_todolist/)，所有的程式碼也在裡面。

> 註: 這支程式只是很小型的一個TodoList應用，與一些教學或框架中的TodoMVC之類的功能完全不能比，不過我們會慢慢從這個應用中再延伸來學習。

我們在這個範例程式中，要使用四個程式碼檔案，其中二個index.js與App.js與之前的幾乎是一樣的，就不再多說這兩個檔案。

先看TodoItem這個元件，它比上次的TextShow元件多了二個props(屬性)，新增的屬性分別是props.index與props.onItemClick，這兩個的屬性的作用分別是:

- index: 因為列表中的項目是陣列中的資料，這個是代表這個項目的索引值
- onItemClick: 是一個上層父母元件(擁有者元件)中的方法定義，按了它等於呼叫上層元件中的方法

> TodoItem.js

```js
import React, { Component } from 'react';

const TodoItem = (props) => {

  const handleClick = () => {
        //實際上呼叫的是由上層元件從props.onItemClick傳入的方法(上層元件的方法)
        props.onItemClick(props.index)
  }

  return <li onClick={handleClick}>{props.text}</li>
};

//加入props的資料類型驗証
TodoItem.propTypes = {
  text: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  onItemClick: React.PropTypes.func
};

//匯出TodoItem模組
export default TodoItem;
```

在這個程式中，`onItemClick`是一個關鍵性的角色。之前已經有提過，props的值除了像原始資料類型的數字、字串、布林外，也可以是物件、陣列或函式。`onItemClick`是一個函式類型的值，它是在上層元件(擁有者元件)中設定給它的。在TodoItem中，每個項目在`onClick`事件觸發時，並不是呼叫自己元件中(擁有者元件)的方法，而是去呼叫到上層元件中定義的方法。我們在這個程式中，這個方法就是要從列表中移除掉這個被點按的項目，注意下面這個`handleClick`中的程式碼，第一次看到可能會有點轉不過來:

```js
const handleClick = () => {
      //實際上呼叫的是由上層元件從props.onItemClick傳入的方法(上層元件的方法)
      props.onItemClick(props.index)
}
```

接著是TodoList元件的程式碼，它是包含了所有應用程式中的控制核心。它的基本結構與上一章的TextInput元件很類似，一樣我們分幾個部份來看。

TodoList元件上面的類別的部份，都是固定的寫法，唯一與TextInput元件不同的，是在`state`中的物件資料結構，用了一個items來存放列表中的每筆待辦事項的文字資料，它會是一個字串類型值的陣列，用Flow工具的標記可以很清楚的預先定義出來。陣列資料在多筆資料的情況下很常使用，這也是為何之前會在純粹函式中加入一些陣列處理的純粹函式改寫語法，因為陣列的運算處理很常使用到。

```js
import React, { Component } from 'react';
import TodoItem from './TodoItem.jsx';

class TodoList extends Component {
    // 建構式
    constructor(props) {
        // super是呼叫上層父類別的建構式
        super(props)

        // 設定初始的狀態。注意！這裡有個反樣式。
        this.state = {
            items: [],
            inputValue:'',
        }

    }
    handleChange (e) {

        if (e.target instanceof HTMLInputElement) {
            this.setState({
                inputValue: e.target.value,
            });
        }

    }
    handleKeyPress (e) {
        if( e.key === 'Enter' && e.target instanceof HTMLInputElement ) {
            const newItems = [e.target.value, ...this.state.items ]

            //按下enter後，加到列表項目中並清空輸入框
            this.setState({
                items: newItems,
                inputValue: '',
            })
        }
    }
    handleRemoveItem (index) {
        const oldItems = this.state.items

        //從陣列中移除一個index的成員的純粹函式
        const newItems = oldItems.slice(0,index).concat(oldItems.slice(index+1))

        //整個陣列重新更新
        this.setState({
            items: newItems,
        })
    }
    // 渲染方法，回傳React Element(元素)
    render() {
        return (
            <div>
                <input type="text"
                    value={this.state.inputValue}
                    placeholder={this.props.initText}
                    onKeyPress={this.handleKeyPress.bind(this)}
                    onChange={this.handleChange.bind(this)}
                />
                <ul>
                    {
                    this.state.items.map((value, index) => {
                    return <TodoItem key={index} text={value} index={index} onItemClick={this.handleRemoveItem.bind(this)}/>
                    })
                    }
                </ul>
            </div>
        )
    }
}

export default TodoList;
}
```

在對文字輸入框的處理方法，一共會有兩個，以下為程式碼:

```js
//處理的方法，用e.target可以獲取到輸入框的值，用箭頭函式可以綁定`this`
//輸入文字時
handleChange (e) {

    if (e.target instanceof HTMLInputElement) {
        this.setState({
            inputValue: e.target.value,
        });
    }

}
//按下Enter時
handleKeyPress (e) {
    if( e.key === 'Enter' && e.target instanceof HTMLInputElement ) {
        const newItems = [e.target.value, ...this.state.items ]

        //按下enter後，加到列表項目中並清空輸入框
        this.setState({
            items: newItems,
            inputValue: '',
        })
    }
}
```

第一個是`handleChange`是處理輸入框在不斷輸入文字時用的，它與之前的TextInput元件是一樣的語法。

第二個是輸入框被按下Enter鍵時要處理的方法，我們要判斷是按下Enter鍵而不是其它的鍵，可以用獲取到的[KeyboardEvent物件](https://facebook.github.io/react/docs/events.html#keyboard-events)的`key`屬性。然後要作兩個事，第一件事是把新的項目加到陣列中，也就是把新的項目(字串值)，加到陣列中的第一個成員，其它的成員往後排。本來這個是陣列中的[unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)方法，但JavaScript陣列中內建的unshift方法是個有副作用的方法，所以要改用純粹函式的寫法，這個語法是很簡單的，原先在state中的陣列先用展開運算符(...)展開，然後與新項目組合為一個新的陣列，像下面這樣:

```js
const newItems = [e.target.value, ...this.state.items ]
```

最後把這個新的陣列`newItems`替換掉原本的state中的items屬性值即可。

```js
this.setState({
	items: newItems,
})
```

因為我們為了方便，在按下Enter鍵時，也要把文字輸入框中的文字清空，所以也要設定state中的inputValue值為空字串，所以用下面的語法:

```js
this.setState({
	inputValue: '',
})
```

上面兩個合併在一起使用，就寫成下面這樣就可以了:

```js
this.setState({
	items: newItems,
	inputValue: '',
})
```

> 註: 你也可以使用KeyboardEvent物件的keyCode屬性，對應Enter鍵是13(數字類型)。雖然[MDN上的文件](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/charCode)說它是非標準的屬性。

> 註: 實際上setState這個方法它在執行時進行效率的最佳化，可以合併在一起的語法它會進行合併。這只是它的內部設計部份，稍微說明一下而已。

第三個方法是`handleRemoveItem`，它並不是給這個元件中的DOM元素使用的，而是給包含在其中的子項目元件(TodoItem元件)使用的。這個方法會被當作是props屬性的其中一個，用標記中的`onItemClick`屬性指定給子項目元件(TodoItem元件)。程式碼如下:

```js
//處理移除掉其中一個陣列中成員的方法
handleRemoveItem (index) {
    const oldItems = this.state.items

    //從陣列中移除一個index的成員的純粹函式
    const newItems = oldItems.slice(0,index).concat(oldItems.slice(index+1))

    //整個陣列重新更新
    this.setState({
        items: newItems,
    })
}
```

因為我們要刪除掉陣列中的其中一個成員，最簡單的方式就是用這個項目目前在陣列中的索引值，所以要寫成一個方法，傳入參數用索引值即可。

這個刪除其中一個成員的純粹函式語法，實際上是使用陣列的[slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)方法，它是用來分割陣列為子陣列用的，語法看起來很簡潔有點一下子難以看懂，這裡稍微說明一下，把原先的陣列`oldItems`，分割為從索引值0開始到這個要刪除的成員的索引值之前，用的是這語句`oldItems.slice(0,index)`。再從這個成員索引值，到陣列最後，分割出另一個子陣列，用的是這語句`oldItems.slice(index+1)`，然後再把這兩個陣列用[concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)方法連接起來，成為一個新陣列。

最後，仍然要呼叫`setState`方法，讓整個DOM元素重新渲染更新，用下面的程式碼:

```js
this.setState({
	items: newItems,
})
```

在TodoList元件的最後部份，也就是render方法。相較於之前的TextInput元件，在文字輸入框的地方，多了一個`onKeyPress`的事件，它是用來獲取按下鍵盤的事件用的。而在下面的`<ul>...</ul>`之中，加入了一個使用陣列的map方法，把所有目前的在state中的items項目，整個輸出的運算語句。

```js
//渲染方法，回傳React Element(元素)
render() {
    return (
        <div>
            <input type="text"
                value={this.state.inputValue}
                placeholder={this.props.initText}
                onKeyPress={this.handleKeyPress.bind(this)}
                onChange={this.handleChange.bind(this)}
            />
            <ul>
                {
	                this.state.items.map((value, index) => {
	                	return <TodoItem key={index} text={value} index={index} onItemClick={this.handleRemoveItem.bind(this)}/>
	                })
                }
            </ul>
        </div>
    )
}
```

在JSX語法中的花括號({})中，可以加入JavaScript的表達式，或是函式等等。之後會有另一章詳細的來說明JSX中的一些語法。

下面這行語句的運算，是把state中的items陣列，用TodoItem元件的格式來作最後的輸出，這裡有我們需要的index、text、onItemClick三個props(屬性)值。但多了一個key值，key是用於像這種列表項目，或是有多個同樣的元件在React中渲染時使用的，它並不是props的成員，而是讓React用於識別不同的元件(或DOM元素)使用的。React會要求像這種列表項目時，開發者一定要給key值。下面有詳細的說明。

```js
this.state.items.map((value, index) => {
  return <TodoItem key={index} text={value} index={index} onItemClick={this.handleRemoveItem}/>
})
```

整個程式碼的說明大致上就是這樣。這支程式的重點在於，要對子元件作資料上的變動，或是觸發事件後更動它的props(屬性)，仍然需要遵守在React嚴格的強硬規則:

> 元件無法改變自己的props(屬性)，只有它的擁有者物件可以

這支程式實際上就展示在這個規則下，如何使用一種"迂迴"的方式，讓子元件可以進行自己屬性的更動(或自我毀滅)。當在子元件中觸發某個事件時，實際上它只是遞出訊息告訴父母元件說: `嘿，老爸，我想要改變一下我自己的某個屬性`或是`嘿，老板，麻煩你fire我吧！`，然後由上層的擁有者元件中的方法，來作這個子元件的props(屬性)的更動，最後當然一定要有的，就是實體DOM元素的重新渲染。

重新渲染的機制之前有說過了，當你用了React後，不管是現在是要更動1個項目還是100個，如何更動網頁上的真實DOM元素都不關你的事，反正就是叫React去想辦法，它自然會用最有效率的方式來作網頁上的真實DOM元件的重新渲染與呈現。

> 註: 陣列的處理方法，請看之前的"ES6篇: Side Effects(副作用)與Pure Functions(純粹函式)"章節，或是[電子書的陣列](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part3/array.html)這一章。常用的你可以先理解一下，看懂裡面的用法，之後有需要再查對照表就行了，其實就那幾種語法而已，實際上不會很困難。

> 註: 程式碼都是一直不斷改進語法，才會像你現在看到的這樣，哪有可能一寫就寫得這麼好。除非已經是很熟練的工程師，才有辦法一寫就寫出看起來漂亮簡潔又沒bugs的程式碼，對初學者來說，只求一開始先能達到所需的功能，再不斷的改進與調整裡面的語法就好。

---

## 其他的詳細說明

### key屬性

講到子節點，就不得不說明一下`key`這個React Element(元素)中的屬性之一。`key`是一個可選的，具唯一性的識別子，當你的一個元件使用動態來生成具有同樣結構的子元素節點時，不論這些子元素是其他的元件還是HTML中的DOM元素，React都要求你要提供`key`的屬性值，以此來區分不同的子元素，當然每個子元素的`key`值不能相同，也就是說它在元件結構裡是唯一的。

> 特別注意: `key`是個字串類型的值。它並不是`props`其中的一員，你可以參考這裡的[React Element](https://gist.github.com/sebmarkbage/fcb1b6ab493b0c77d589#formal-type-definitions)的結構定義。

```js
const ListItem = (props) => (
    <li>{props.text}</li>
)

const names = ['鮎川天理', '汐宮栞', '中川加儂', '小阪千尋']

//最後用來輸出到實體DOM的方法
ReactDOM.render(
    <ul>
    {
        /* 用map方法回傳陣列 */
        names.map(function (value, index, array) {
            return <ListItem text={value}/>
        })
    }
    </ul>, document.getElementById('root')
)
```

會出誢以下的警告訊息(註: 只是警告，不會中斷程式):

```
Warning: Each child in an array or iterator should have a unique "key" prop. Check the top-level render call using <ul>. See https://fb.me/react-warning-keys for more information.
```

把key屬性加上，就可以避免這個警告訊息，如果是陣列值的話，使用索引值剛好可以用來當不能重覆的key屬性，改寫過的map方法如下:

```js
{
    names.map(function (value, index, array){
        return <ListItem key={index} text={value}/>
    })
}
```

> 特別注意: `key`值應該是在進行render時直接給定就行了，而不是在定義元件的時候給定，也就是說它是動態定義的。

`key`值對React進行重新渲染非常重要，React會用`key`來決定子元素是同一個還是不同的，所以所有的子元素都一定要有`key`值，即便你只有一個子元素。因此，雖然在我們的這個例子裡，是直接使用陣列的索引值當`key`值，實際上這是一個反樣式(anti-pattern)。在真實的應用中，`key`值最好是使用能產生唯一值的其它方式。最簡單是用一個全域的變數值，來作為`key`值的累加，也會看到用獲取當下時間轉換為微秒值，或是使用像[shortid](https://www.npmjs.com/package/shortid)的函式庫。可以參考官網這篇[Lists and Keys](https://facebook.github.io/react/docs/lists-and-keys.html)文章，與這篇[Index as a key is an anti-pattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318#.lly6p2vm9)文章中的說明。

> 特別注意: `key`值使用"陣列索引值"會是個反樣式，你應該採用別的隨機而且唯一值的產生方式。

# 參考資料

[Day 15: React篇: HelloWorld解說與JSX語法](http://ithelp.ithome.com.tw/articles/10186053)
[Day 16: React篇: TextInput程式](http://ithelp.ithome.com.tw/articles/10186199)
[Day 17: React篇: TodoList程式](http://ithelp.ithome.com.tw/articles/10186375)
[Day 18: React篇: JSX語法指引](http://ithelp.ithome.com.tw/articles/10186570)
[Day19: React篇: TodoList程式 + 樣式(Style)](http://ithelp.ithome.com.tw/articles/10186714)
[Day 20: React篇: TodoList程式改造 => TodoApp](http://ithelp.ithome.com.tw/articles/10186845)
[Day 21: React篇 - TodoApp程式 + 編輯項目](http://ithelp.ithome.com.tw/articles/10186982)
[Day 22: React篇: TodoApp程式 + 搜尋/過濾 + 排序](http://ithelp.ithome.com.tw/articles/10187146)
[Day 23: React篇 - TodoApp程式 + Fetch/Ajax 於生命週期方法](http://ithelp.ithome.com.tw/articles/10187243)

[babel提供的線上轉換程式](https://babeljs.io/repl/)