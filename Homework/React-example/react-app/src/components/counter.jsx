import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props); // 子類物件要用 super 不然會報錯，上面的 extend 就是最好的例子
    this.clickEvent = this.clickEvent.bind(this); // 綁定 click
  }
  // 資料變數
  state = {
    text: "安安的安安",
    imgUrl: "https://picsum.photos/200",
    className: "test",
    count: this.props.value,
    liContent: ["hi", "im", "zeyan"],
    btnName: "my name is button"
    // key: this.props.select
  };

  styles = {
    fontSize: 30,
    fontWeight: "bold"
  };

  // click event
  clickEvent = product => {
    console.log(product);
    // console.log(product); // 把 doHandleEvent 的值帶過來
    // this.state.count++; // 直接 ++ 你會發現沒有效果，要用下面去++參數
    this.setState({ count: this.state.count + 1 });
  };

  doHandleEvent = () => {
    this.clickEvent({ id: 1 });
  };

  calculateCount() {
    return this.state.count === 0 ? "Zero" : this.state.count;
  }

  // 判斷的 function 位置
  renderTag() {
    // 兩種寫法
    // return this.state.liContent.length === 3 ? "working" : "not working";
    // button 去 call counters 裡面的 onDelete
    // onClick 帶 index 參數過去
    if (this.state.liContent.length === 3) {
      return (
        <ul>
          {this.state.liContent.map(tag => (
            <li key={tag}>{tag}</li>
          ))}{" "}
          <li>{this.calculateCount()}</li>
          <li>
            <button onClick={this.doHandleEvent}>{this.state.btnName}</button>
          </li>
          <li>
            <button onClick={() => this.props.onDelete(this.props.id)}>
              213
            </button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>tags is exiting</li>{" "}
        </ul>
      );
    }
  }

  getClasses() {
    let classes = "badge-1 badge-2";
    classes += this.state.count === 0 ? " badge-3" : " badge-4"; //　用　state 去判斷是否 + class
    return classes;
  }

  formatText() {
    const { text } = this.state; // state 的變數可以設這樣
    // return text === "安安的安安" ? text : alert("不一樣"); // 判斷式
    if (text === "安安的安安") {
      return text;
    } else {
      alert("不一樣");
      return "字不一樣";
    }
  }

  // HTML 渲染
  render() {
    return (
      <ul>
        <li className={this.state.className}>
          <img src={this.state.imgUrl} alt="" />
          {/* <span style={this.styles}>{this.state.text}</span> 也可以像下面一樣寫法 */}
          <span
            style={{ fontSize: 30, fontWeight: "bold" }}
            className={this.getClasses()}
          >
            {this.state.text}
          </span>
        </li>
        <li>{this.formatText()}</li>
        <li>
          <button> increment </button>
        </li>
        <li>
          {/* <ul>
            {this.state.liContent.map(tag => (
              <li key={tag}>{tag}</li>
            ))}{" "}
            <li>{this.renderTag()}</li>
          </ul> */}
          {this.renderTag()}
        </li>
      </ul>
    );

    // React.createElement("ul"); // 設定最外層的 tag 就可以了
    // 帶入連結時，不用雙引號
    // let classes = "badge-1 badge-2";
    // classes += this.state.count === 0 ? " badge-3" : " badge-4"; //　用　state 去判斷是否 + class
  }
}

export default Counter; // 前面有 export default 這段就可以省略
