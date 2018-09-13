import React, { Component } from "react";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="calendar">
        <div className="sliderMonth">
          <div className="fas fa-caret-right next" />
          <div className="fas fa-caret-left prev" />
          <ul className="tab">
            <li>2018 10月</li>
            <li className="active">2018 11月</li>
            <li>2018 12月</li>
            <li>2018 01月</li>
            <li>2018 02月</li>
            <li>2018 03月</li>
          </ul>
        </div>
        <ul className="week">
          <li>星期日</li>
          <li>星期一</li>
          <li>星期二</li>
          <li>星期三</li>
          <li>星期四</li>
          <li>星期五</li>
          <li>星期六</li>
        </ul>
        <ul className="contentDates">
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
        </ul>
      </div>
    );
  }
}

export default Calendar;
