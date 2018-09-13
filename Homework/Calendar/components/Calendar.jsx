import React, { Component } from "react";

class Calendar extends Component {
  // 建構式
  constructor(props) {
    // super是呼叫上層父類別的建構式
    super(props);
    console.log(props);

    // 設定初始的狀態。注意！這裡有個反樣式。
    this.state = {};
  }

  // 渲染方法，回傳React Element(元素)
  render() {
    return (
      <div>
        <h1>123456</h1>
        <h1>123</h1>
      </div>
    );
  }
}

export default Calendar;
