模組開發前所需JS觀念 ES6
=========================== 

# let, const

let與const無疑是要取代原本的使用var語句來定義變數與常數。在ES6之前，並沒有"常數"這個東西，只有"變數"而已，也就是用var所宣告的識別名稱。在這份舊的[Google JavaScript](http://alloyteam.github.io/JX/doc/specification/google-javascript.xml)樣式風格指引中，會告訴你要用全大寫英文字元來作為常數定義，像是var MAX_HEIGHT = 10這種定義方式。

實際上在多年的只有var可用，加上其他亂用亂寫的語法下，在JavaScript中共有4種宣告變數的方式，它們分別是:

```js
a = 10
this.a = 10
window.a = 10
var a = 10
```

let與const是區塊作用域(block scope)，而var是函式作用域(function scope)，這是第一個我們會看到的差異性。區塊作用域與函式作用域會差在什麼地方？

var是函式作用域的設計，也就是說它只能以函式為變數作用域的分界，在一些使用了區塊語句(用花括號的語句)的像if, else, for, while等等區塊語句中，在這裡面用var宣告的變數仍然是會曝露到全域之中可被存取，例如:

```js
function test(){
  var a = 10
}

if(true){
  var b = 20
}

console.log(a) // a is not defined 存取不到
console.log(b) // 存取得到
```

這對初學者容易造成誤解外，如果再搭配到隱藏的提升特性(最下面有說明)，整個程式碼經常會有出人意表的結果。在許多撰寫風格指引通常會提醒這點，而且叫你一定要把`var`語句寫在程式碼檔案的最上面。(甚至連for語句中的`var`宣告也要寫到最上面)

如果使用了`let`或`const`來宣告，就是以區塊語句為分界的作用域，它會比較明確而且不易發生錯誤。一些之前對於`var`語句的麻煩撰寫風格，就可以不需要了。從下面的例子可以看得到：


```js
function test() {
  let a = 10
}

if (true) {
  const b = 20
}

console.log(a) // a is not defined 存取不到
console.log(b) // b is not defined 存取不到
```

# const

`const`針對是常數的定義，常數在一宣告時就必定要指定給值，不然會產生錯誤。而對於常數在ES6的定義是:

> 不可再指定(can't re-assignment)

指定的意思就是用等號(=)作指定運算，像下面這例子就是再指定值(或重覆指定值)，所以會產生錯誤:

```js
const a = 10
a = 20  // TypeError: Assignment to constant variable. 錯誤
```

> 註: JS中的指定運算符除了等號(=)外，還有多種等號(=)與其他運算符組合而成的指定運算符，請參考MDN上面的這篇[Assignment_Operators](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Assignment_Operators)

宣告了一個常數，代表這個識別名稱的參照(reference)是唯讀的(read-only)，並不代表這個參照指定到的值是不可改變的(immutable)。這是在講什麼？這是在講如果你宣告的常數是一個物件或陣列類型，像這種參照類型的值，裡面的值是可以作改變的。像下面的例子都是合法的使用:

```js
const a = []
a[0] = 1

const b = {}
b.foo = 123
```

所以對於物件、陣列、函式來說，使用`const`常數來宣告就可以，除非你有需要再指定這個陣列或物件的參照。

# 提升(Hoisting)

有些人會認為`let`與`const`不會被提升，實際上是會的。因為它們被定義有一段時間是無法存取的，這是在被宣告與進入作用域之間時，這段時間稱為`Temporal Dead Zone`(TDZ, 時間死區)，所以不同於`var`或`function`，存取`let`或`const`提升的變數/常數會產生錯誤`ReferenceError`，而不是`undefined`。

> 註: dead zone在英文裡是專有名詞，是指"電波達不到的地區"。

要理解`let`, `const`是否會被提升，可以用下面的簡單例子來看。第一個例子，是正常可以輸出`x`變數的值：

```js
let x = 'outer scope';

(function() {
    console.log(x)
}())
```

第二個例子，會產生錯誤`ReferenceError`。這是因為函數中的那個用let宣告的x變數被提升到函數中區塊的最上面，因此造成錯誤:

```js
let x = 'outer scope';

(function() {
    console.log(x)
    let x = 'inner scope' //多加這行程式碼，這行被提升到函式區塊中的最上面一行
}())
```

# Arrow Function(箭頭函式)

根據網路上統計的統計資料，箭頭函式(Arrow Functions)是ES6標準中，是最受歡迎的其中一種ES6新特性。它會受歡迎的原因是好處多多，只要注意在某些情況下不要用過頭就行了。有什麼好處呢？大致上有以下幾點:

- 語法簡單，少打很多字元
- 可以讓程式碼的可閱讀性提高
- 可以綁定詞法上的`this`值

## 語法介紹

箭頭函式的語法如下，出自[箭頭函數(MDN)](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions)：

```js
([param] [, param]) => {
   statements
}

param => expression
```

簡單的說明如下:

- 符號是肥箭頭符號(=>) (註: "->"是瘦箭頭)
- 基本上是"函式表達式(FE)的簡短寫法"

一個簡單的範例是：

```js
const func = (x) => x + 1
```

相當於

```javascript
const func = function (x) { return x + 1 }
```

所以你可以少打很多英文字元與一些標點符號之類的，函式是個匿名的函式。基本上的使用如下說明：

- 花括號({})是有意義的，如果函式有多行語句(表達式)時就要使用花括號，花括號中的`return`回傳值語句要自己寫。例如 `() => {}`
- 只有單一個傳入參數時，可以不需要左邊(前面)作為傳入參數使用的圓括號(())符號，例如 `x => x*x`

因此，初學者最容易搞混的是下面這個例子，因為有花括號({})與沒有是兩碼子事:

```js
const funcA = x => x + 1
const funcB = x => { x + 1 }

funcA(1) //2
funcB(1) //undefined
```

當沒使用花括號({})時，代表要會使用自動有`return`的作用，所以它也只能用在單一行的表達式的時候使用。使用花括號({})則是可以加入多行的語句，不過`return`不會自動加，有需要你要自己加上，沒加這個函式最後等於`return undefined`

> 註: 表達式與語句仍然有一些差異，像`throw "Error2"`是一個只有單一行的語句，但它並不能用於箭頭函式中無花括號的情況。

> 註: JS語言中函式的設計，必有回傳值，沒寫相當於回傳undefined

第二個會容易造成混亂與誤解的是，在肥箭頭符號(=>)的後面可以直接換行，下面指的是單行回傳表達式的情況，雖然不會造成錯誤但很難閱讀，所以不建議這樣寫。像下面這幾個的例子都是合法語法:

```js
// !! 不建議這樣寫 !!
const funcA = x =>
x + 1

// !! 不建議這樣寫 !!
const funcB =
x =>
x + 1
```

在這裡容易造成誤解，理由是肥箭頭符號(=>)的後面可以用換行，但"前面"不能直接接到換行，這個會造成編譯器無法編譯，瀏覽器也無法執行。我想主要原因是，畢竟這個符號是等號(=)與大於符號(>)組合而成的一個新符號，等號還有其他的用途。放在語句的前面應該就是等號的作用，再加上一個大於符號會造成語法錯誤。不管如何，別亂寫語法就對了，按照一般的你所看到的正常語法來寫就對了。

## 綁定this值

箭頭函式可以取代原有使用var self = this或.bind(this)的情況，它可以在詞彙上綁定this變數。

```js
const obj = {a:1}

function func(){
  const that = this

  setTimeout(
    function(){
      console.log(that)
    },
    2000
  )
}

func.call(obj) //Object {a: 1}
```

可以改用箭頭函式：

```js
const obj = {a:1}

function func(){
  setTimeout( () => { console.log(this) }, 2000)
}

func.call(obj)
```

另外

```js
var o = {
  f1: function () {
    console.log(this);
    
    var f2 = function () {
      console.log(this);
    };
    f2(); 
  }
}

o.f1()
```

可改為：

```js
var o = {
  f1: function () {
    console.log(this);
    
    var f3 = () => {
      console.log(this);
    };
    
    f3();
  }
}

o.f1();
```

用bind方法的來回傳一個部份函式的語法，也可以用箭頭函式來取代，範例出自[Arrow functions vs. bind()](http://www.2ality.com/2016/02/arrow-functions-vs-bind.html)：

```js
function add(x, y) {
       return x + y
   }

const plus1 = add.bind(undefined, 1)
```

箭頭函式的寫法如下:

```js
const plus1 = y => add(1, y)
```

## 不可使用箭頭函式的情況

以下這幾個範例都是與`this`值有關，所以如果你的箭頭函式裡有用到`this`值要特別小心。以下的範例都只能用一般的函式定義方式，"不可"使用箭頭函式。

### 物件中屬性為箭頭函式

箭頭函式會以定義當下的`this`值為`this`值，也就是`window`物件(或是在嚴格模式的undefined)，所以是存取不到物件中的this.array值的。

```js
const calculate = {
  array: [1, 2, 3],
  sum: () => {
    return this.array.reduce((result, item) => result + item)
  }
}

//TypeError: Cannot read property 'array' of undefined
calculate.sum()
```

應該改為：

```js
const calculate = {
  array: [1, 2, 3],
  sum: function() {
    console.log(this);
  }
}

calculate.sum()
```

### 物件的prototype屬性中定義方法時

這種情況也是像上面的類似，箭頭函式的`this`值，也就是`window`物件(或是在嚴格模式的`undefined`)。

```js
function MyCat(name) {
  this.catName = name
}

MyCat.prototype.sayCatName = () => {
  return this.catName
}

cat = new MyCat('Mew')
// ReferenceError: cat is not defined
cat.sayCatName()
```

### DOM事件處理的監聽者(事件處理函式)

箭頭函式的`this`值，也就是`window`物件(或是在嚴格模式的`undefined`)。這裡的`this`值如果用一般函式定義的寫法，應該就是DOM元素本身，才是正確的值。

```js
const button = document.getElementById('myButton')

button.addEventListener('click', () => {
  this.innerHTML = 'Clicked button'
})
//TypeError: Cannot set property 'innerHTML' of undefined
```

### 建構函式

這會直接在用`new`運算符時拋出例外，根本不能用。

```js
const Message = (text) => {
  this.text = text;
}
// Throws "TypeError: Message is not a constructor"
const helloMessage = new Message('Hello World!');
```

### 其他注意的限制或陷阱

- 函式物件中的`call`、`apply`、`bind`三個方法，無法"覆蓋"箭頭函式中的`this`值。
- 箭頭函式沒有原本(傳統)的函式有的隱藏arguments物件。
- 箭頭函式不能當作generators使用，使用`yield`會產生錯誤。
- 在一些函式庫像jQuery、underscore函式庫有些有使用callback(回調, 回呼)的API中不一定可以用。

## 撰寫風格建議

- callback(回調, 回呼)優先使用箭頭函式。 (Airbnb 8.1, Google 5.5.3)
- 雖然箭頭函式的左邊(傳入參數)只有一個時可以省略圓括號(`()`)，但建議你還是不論幾個都用圓括號框起來。(Google 5.5.3, eslint: [arrow-parens](http://eslint.org/docs/rules/arrow-parens.html))
- 避免合併使用箭頭函式與其他的比較運算符(>=, <=)，這會造成閱讀上不使與混亂。(Airbnb 8.5)
- 肥箭頭符號的前後要加一個空格，不要黏在一起。另外，不要直接在符號前後換行。(前面不行，後面要用圓括號或花括號，上面有說明) (eslint: [arrow-spacing](http://eslint.org/docs/rules/arrow-spacing.html))

# Class(類別)

在ES6中的Class(類別)語法，並不是真的是以類別為基礎(class-based)的物件導向，在骨子裡仍然是以原型為基礎(prototype-based)的物件導向，它只是個語法糖(syntactical sugar)。加入Class(類別)語法的目的，並不是要建立另一套物件導向的繼承模型，而是為了提供更簡潔的語法來作物件建立與繼承，當然，一部份的原因是，讓已經熟悉以類別為基礎的物件導向程式語言的開發者使用，以此提供另一種在物件導向語法上的選擇。

## 在ES6之前

對於已經熟悉JS的開發者而言，在JS中原本就有設計一個四不像的物件導向語法，也就是以建構函式來作為類別，然後用new運算符來實體化物件的這種語法。以下是個簡單的例子:

```js
function Player(fullName, age) {
  this.fullName = fullName;
  this.age = age;
}

Player.prototype.sayHi = function() {
  console.log('Hi! ' + this.fullName);
}

const inori = new Player('Inori', 16);
inori.sayHi();
```
## 類別（Class）介紹

類別(Class)是先裡面定義好物件的整體結構藍圖(blue print)，然後再用這個類別定義，以此來產生相同結構的多個的物件實例，類別在定義時並不會直接產生出物件，要經過實體化的過程(`new`運算符)，才會產生真正的物件實體。另外，目前因為類別定義方式還是個很新的語法，在實作時除了比較新的函式庫或框架，才會開始用它來撰寫。以下的為一個簡單範例：

```js
class Player {
    constructor(fullName, age, gender, hairColor) {
        this.fullName = fullName
        this.age = age
        this.gender = gender
        this.hairColor = hairColor
    }

    toString() {
        return 'Name: '+this.fullName+', Age:'+this.age
    }
}

const inori = new Player('Inori', 16, 'girl', 'pink')
console.log(inori.toString())
console.log(inori.fullName)

const tsugumi = new Player('Tsugumi', 14, 'girl', 'purple')
console.log(tsugumi.toString())
```

> 註: 注意類別名稱命名時要使用大駝峰(ClassName)的寫法

> 註: 類別目前在ES6標準中與函式(Functions)屬同一章節。

下面分別說明一些這個例子中用到的語法與關鍵字的重要概念，以及類別延伸的一些語法。

### this

`this`簡單的說來，是物件實體專屬的指向變數，`this`指向的就是"這個物件實體"，以上面的例子來說，也就是當物件真正實體化時，`this`變數會指向這個物件實體。`this`是怎麼知道要指到哪一個物件實體？是因為`new`運算符造成的結果。

`this`變數是JavaScript的一個特性，當函式呼叫或物件實體化(用new運算符)時，都會以這個`this`變數的指向對象，作為執行期間的依據。我們在函式中，使用作用範圍(Scope)來說明以函式為基礎的檢視角度，在函式區塊中可見的變數與函式的領域的概念。而JavaScript中，另外也有一種上下文環境(Context)的概念，就是對於`this`的在執行期間所依據的影響，即是以物件為基礎的的檢視角度。

`this`也就是執行上下文可以簡單用三個情況來區分:

1. 函式呼叫: 在一般情況下的函式呼叫，`this`通常都指向window(或全域)物件。這也是預設情況。
2. 建構式(constructor)呼叫: 透過`new`運算符建立物件實體，等於呼叫類型的建構式，`this`會指向新建立的物件實例
3. 物件對其中的方法呼叫: `this`指向呼叫這個方法的物件實體

所以當建構式呼叫時，也就是使用`new`運算符建立物件時，`this`會指向新建立的物件，也就是下面這段程式碼:

```js
const inori = new Player('Inori', 16, 'girl', 'pink')
```

因此在建構式中的指定值的語句，裡面的`this`值就會指向是這個新建立的物件，也就是`inori`:

```js
constructor(fullName, age, gender, hairColor) {
        this.fullName = fullName
        this.age = age
        this.gender = gender
        this.hairColor = hairColor
    }
```

也就是說在建立物件後，經建構式的執行語句，這個`inori`物件中的屬性值就會被指定完成，所以可以用像下面的語法來存取屬性:

```js
inori.fullName
inori.age
```

第3種情況是呼叫物件中的方法，也就是像下面的程式碼中，`this`會指向這個呼叫toString方法的物件，也就是`inori`:

```
inori.toString()
```

對於`this`的說明大致上就是這樣而已，這裡都是很直覺的說明。`this`還有一部份的細節與應用情況，`this`的概念在JavaScript中十分重要，初學者真的需要多花點時間才能真正搞懂。

### 建構式(constructor)

建構式是特別的物件方法，它必會在物件建立時被呼叫一次，通常用於建構新物件中的屬性，以及呼叫上層父母類別(如果有繼承的話)之用。用類別(class)的定義時，物件的屬性都只能在建構式中定義，這與用物件字面的定義方式不同，這一點是要特別注意的。如果物件在初始化時不需要任何語句，那麼就不要寫出這個建構式，實際上類別自己有預設的建構式，它會自動幫你作建構的工作。

關於建構式或物件方法的多形(polymorphism)或覆蓋(Overriding)，在JavaScript中**沒有**這種特性。建構式是會被限制只能有一個，而在原本在物件中的方法也沒這個特性，在物件中定義同識別名稱的方法只會有一個定義被使用，這與傳入參數有或沒有，或是有幾個無關。

所以如果你需要定義不同的建構式在物件中，因應不同的物件實體的情況，只能用函式的不定傳入參數方式，或是加上傳入參數的預設值來想辦法改寫，請參考函式其它內容中的說明。以下為一個範例:

```js
class Option {
    constructor(key, value, autoLoad = false) {
        if (typeof key != 'undefined') {
            this[key] = value
        }
        this.autoLoad = autoLoad
    }
}

const op1 = new Option('color', 'red')
const op2 = new Option('color', 'blue', true)
```

> 註: 此處講的"建構式(constructor)"，與上一節中的"建構函式(constructor function)"是不同的東西，要特別注意。

### 繼承

用extends關鍵字可以作類別的繼承，而在建構式中會多呼叫一個`super()`方法，用於執行上層父母類別的建構式之用。`super`也可以用於指向上層父母類別，呼叫其中的方法或存取屬性。

繼承時還有有幾個注意的事項:

- 繼承的子類別中的建構式，`super()`需要放在建構式第一行，這是標準的呼叫方式。如果有需要傳入參數可以傳入。
- 繼承的子類別中的屬性與方法，都會覆蓋掉原有的在父母類別中的同名稱屬性或方法，要區為不同的屬性或方法要用`super`關鍵字來存取父母類別中的屬性或方法，例如`super.toString()`

```js
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y)
        this.color = color
    }
    toString() {
        return super.toString() + ' in ' + this.color
    }
}
```

### 類別中的箭頭函式

在類別中使用箭頭函式來取代裡面原有方法的定義，這在React的元件撰寫時，也是很常見的一種語法。這個語法是有其目的的，主要是為了要作this的綁定。例如以下的例子，範例來自[這裡](https://babeljs.io/blog/2015/06/07/react-on-es6-plus):

```js
class PostInfo extends React.Component {
  handleOptionsButtonClick = (e) => {
    this.setState({showOptionsModal: true});
  }
}
```

因為在React元件使用ES6 Class的語法來定義元件時，官方取消了原有的Autobind(自動綁定)功能，所以在現在新式的元件寫法中，開發者必須自行綁定類別中的方法。有兩種方法可以進行綁定，第二種像上面的例子這樣，第一種是在建構式中使用函式的bind方法，有些時候會使用第一種語法。像下面這個例子:

```js
class PostInfo extends React.Component {
  constructor(props) {
    super(props);
    // 手動綁定的語法，綁定this到元件的實體...
    this.handleOptionsButtonClick = this.handleOptionsButtonClick.bind(this);
  }
  handleOptionsButtonClick(e) {
    // ...確保'this'可以參照到元件的實體
    this.setState({showOptionsModal: true});
  }
}
```

這個語法也不是ES6標準的語法，它是正在訂定中的新標準語法，是屬於Class Properties([Class Fields & Static Properties](https://github.com/tc39/proposal-class-public-fields))。不過babel編譯工具透過外掛，可以正確編譯就是。

> 註: ES7+的靜態(或類別)屬性的轉換，要使用bebal的[babel-plugin-transform-class-properties](https://babeljs.io/docs/plugins/transform-class-properties/)外掛。

> 註: 你可能會好奇，為何babel編譯工具都可以正確支持編譯React中的JSX與一些超出ES6標準的語法？因為這babel工具專案實際上是Facebook贊助(出錢養的)的專案。

# Module System(模組系統)

本章的目標是對模組系統(Module System)提供一些使用上的簡單說明。模組系統是一個重要的ES6特性，搭配目前的NPM相依性管理工具，可以說是目前JavaScript發展的一個重大的改變，也是目前開發JavaScript應用的主要方式。對開發者來說，語法很簡單就可以開始使用，其他的工作會交由打包與編譯工具來幫你作。

> 註: 本文章同步放置於[Github庫的這裡](https://github.com/eyesofkids/ironman2017/tree/master/day11_module_system)。

> 特別注意: 截至目前為止(2016.12)，所有的瀏覽器都沒有原生(內建)完整支援import/export語法，就算有支援也是實驗性質(需額外開啟)或是功能不完整。你必須使用如babel編譯工具來作預編譯的工作。如果你有需要在瀏覽器上直接執行，也可以[打填充(polyfill)](https://github.com/ModuleLoader/es-module-loader)來讓瀏覽器可以使用這個語法。

> 註: ES6標準中雖然定義了模組的語法，但卻沒定義如何載入模組(只有抽象的表達字詞)，但這也是最複雜的一部份，未來可能會因為環境而實作不同。

## 模組系統是什麼？

當程式碼愈寫愈多，應用程式的規模愈來愈大時，我們需要一個用於組織與管理程式碼的方式，這個需求相當明確，或許不只是應用程式發展到一定程度才會考慮這些，而是應該在開發程式之前的規劃就需要考量進來。JavaScript語言是一個沒有命名空間設計的程式語言，也沒有支援類似的組織與程式碼分離的設計。有些人認為使用物件定義的字面文字，可以定義出物件的方法與屬性，但如果你看過"物件"、"this"與"原型物件導向"的章節內容，就知道物件中並沒有區分私有、公開成員或方法的特性，這個組織方式頂多只是把方法或屬性整理集中而已。

在應用程式規模化的階段，我們需要一種機制，能夠區分出每個獨立檔案的作用域，而不會影響到全域的作用域，也就是不會任意的污染到全域。而在很早之前(2003)在社群上發展出一個稱之為模組樣式(module pattern)，以及之後的變型如 暴露模組樣式(Revealing Module Pattern)，就是第一代的程式碼組織管理方式。模組樣式實作相當簡單，有許多早期開始發展的函式庫或框架採用這個樣式，甚至到今天也可以看到它的使用身影。一個簡單的範例如下(以下範例來自[jQuery](https://learn.jquery.com/code-organization/concepts/)):

```js
// 模組樣式
var feature = (function() {

    // 私有的變數與函式
    var privateThing = "secret"
    var publicThing = "not secret"

    var changePrivateThing = function() {
        privateThing = "super secret"
    };

    var sayPrivateThing = function() {
        console.log( privateThing )
        changePrivateThing()
    };

    // 公開的API
    return {
        publicThing: publicThing,
        sayPrivateThing: sayPrivateThing
    }
})()

feature.publicThing // 公開部份的存取

// 透過公開的API來存取私有的變數
feature.sayPrivateThing()
```

模組樣式使用了IIFE函式的特性，區分出作用域，不過它並沒有辦法徹底解決問題，它在小型的應用程式可以用得很好，但在複雜的程式中仍然有很大的問題，例如以下的問題:

- 沒辦法在程式中作模組載入
- 模組之間的相依性不易管理
- 異步地載入模組
- 除錯與測試都不容易
- 在大型專案中不易管理

模組樣式似乎是一個暫時性的解決方案，但不得不說它的確是上一代很重要的程式碼組織方式。第二代的模組系統，是在2009年之後的CommonJS與AMD(Asynchronous Module Definition)專案，它們實作出真正完整的模組系統，CommonJS是專門設計給伺服器端的Node.js使用的，而AMD的目標則是瀏覽器端。當然它們兩者的設計有所不同，也不相容，使用時也可能需要搭配載入工具來一併使用，不過這個階段的模組系統已經是較前一代完善許多，在相依性與模組輸出與匯入，都有相對的解決方式，程式碼的管理與組織方便了許多。

CommonJS與AMD並不會在這裡討論，我們的重點是是ES6中的模組系統，ES6中加入了模組系統的支援，它採用了CommonJS與AMD的優點，是一個語言內建的模組系統，而且它可以使用於瀏覽器與伺服器端，這是一個相當重大的新特性，可以讓你的開發日子更輕鬆許多。

## 模組如何開始使用

ES6的模組系統使用上相當簡單，各模組有自己的獨立的作用域，所以你必須指示要在應用程式中匯入或輸出哪一些模組。使用上大致上只有三個重點:

- ES6的模組程式碼會自動變成[Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)(嚴格模式)，不論你有沒有使用"use strict"在程式碼中。
- ES6的模組的分隔原則是一個檔案一個模組
- ES6模組使用export進行輸出，與import語句來進行匯入。通常匯入語句位於程式碼檔案中最前面，輸出則可以位於識別名稱處，或是位於程式碼檔案最後。

### 模組的名稱

模組的名稱是由目錄與檔案名稱的組合，而省略掉副檔名(.js或.jsx)。如果是由NPM工具所安裝的模組，則是只需要模組的名稱即可，不需要有路徑部份。

- 如果你要匯入的檔案名稱是utils.js，而且是在同目錄下，則使用import(匯入)這個檔案的名稱，例如`./utils`
- 如果你要匯入的檔案名稱是在相對目錄components下，則加上目錄的相對路徑來作匯入，例如`./components/utils`

## 模組輸出與匯入

有使用模組輸出語句的程式碼檔案，才能讓其他程式碼檔案進行匯入的工作。模組輸出可以使用`export`關鍵字，在想要輸出(也就是變為公開部份)加在前面，物件、類別、函式定義(function 或 function*)與原始資料類型(變數與常數)都可以輸出，例如以下的範例:

### 多個輸出名稱

```js
export const aString = 'test'

export function aFunction(){
  console.log('function test')
}

export const aObject = {a: 1}

export class aClass {
  constructor(name, age){
    this.name = name
    this.age = age
  }
}
```

上面稱之為多個輸出名稱的情況，有兩種方式可以進行匯入，一種是每個要匯入的名稱都需要定義在花括號({})之中，這在匯入模組部份的內容時很常用到。例如以下的範例:

```js
import {aString, aObject, aFunction, aClass} from './lib'

console.log(aString)
console.log(aObject)
```

另一種是使用萬用字元(\*)，代表要匯入所有的輸出定義的值，不過你需要加上一個模組名稱，例如下面程式碼中的`myModule`，這是為了防止命名空間的衝突之用的，之後的程式碼中都需要用這個模組名稱來存取輸出模組中的值，這個作法不常使用:

```js
import * as myModule from './lib'

console.log(myModule.aString)
console.log(myModule.aObject)

myModule.aFunction()
const newObj = new myModule.aClass('Inori', 16)
console.log(newObj)
```

### 單一(預設)輸出識別名稱

這個要輸出成為模組的程式碼檔案中，只會有一個輸出的變數/常數、函式、類別或物件時，或是用於作為最低使用情況的預設輸出時，通常會加上`default`關鍵詞。如果要使用有回傳值的函式，通常也是用單一輸出的方式。例如以下的範例:

```js
function aFunction(param){
  return param * param
}

export default aFunction
```

對單一輸出的模組來進行匯入就不需要用花括號，這代表只匯入以`default`值定義的輸出語句:

```js
import aFunction from './lib2'

console.log(aFunction(5))
```

這是最特別的，可以在匯入時改變匯入值的名稱，這樣可以讓作匯入檔案中，確保不會有名稱衝突的情況:

```js
import square from './lib2'

console.log(square(5))
```

> 特別注意: 當使用var, let 或 const時，"不能"使用`export default`

## 輸出與匯入的語法參考

輸出與匯入的語法實際看例子會比較快。不過常用的就是那幾種而已。如果你有看到不同的語法，可以再對照一下MDN上的相關說明，這裡只有列出常見的幾個。

### 合法的輸出語法

```js
export var x = 42;                      // 輸出一個變數識別名稱
export function foo() {};               // 輸出一個函式識別名稱

export default 42;                      // 輸出一個預設值
export default function foo() {};       // 輸出一個預設值，是個函式定義

export { encrypt };                     // 輸出一個已存在的變數
export { decrypt as dec };              // 輸出一個已存在的變數，改用新的識別名稱
export { encrypt as en } from 'crypto'; // 從另一個模組，輸出一個已存在的變數，改用新的識別名稱
export * from 'crypto';                 // 從另一個模組，輸出所有要輸出的
```

### 合法的匯入語法

```js
import 'jquery';                        // 匯入一個模組，整個匯入
import $ from 'jquery';                 // 匯入模組的預設的輸出部份
import { $ } from 'jquery';             // 匯入模組的一個識別名稱
import { $ as jQuery } from 'jquery';   // 匯入模組的一個識別名稱，用不同的識別名稱取代
import * as crypto from 'crypto';    // 匯入整個模組，改用不同的識別名稱
```

## 撰寫風格


參考資料
=========================== 

[Javascript 標準參程教程](http://javascript.ruanyifeng.com/#introduction)

[Day 05: ES6篇 - let與const](http://ithelp.ithome.com.tw/articles/10185142)

(http://google.github.io/styleguide/jsguide.html)