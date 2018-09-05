import React, { Component } from "react";
import CalenderModule from "./components/CalenderModule.jsx";

class Calender extends Component {
  // 建構式
  constructor(props) {
    // super是呼叫上層父類別的建構式
    super(props);

    // 設定初始的狀態。注意！這裡有個反樣式。
    this.state = {};
  }

  // 渲染方法，回傳React Element(元素)
  render() {
    return (
      <div>
        <CalenderModule />
        {/* <h1>123</h1> */}
        {/* <input
          type="text"
          value={this.state.inputValue}
          placeholder={this.props.initText}
          onKeyPress={this.handleKeyPress.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
        <ul>
          {this.state.items.map((value, index) => {
            return (
              <TodoItem
                text={value}
                index={index}
                onItemClick={this.handleRemoveItem.bind(this)}
              />
            );
          })}
        </ul> */}
      </div>
    );
  }
}

export default Calender;
