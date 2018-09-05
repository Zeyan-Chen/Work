import React, { Component } from "react";

const CalenderModule = () => {
  // console.log(props);

  // const handleClick = () => {
  //   //實際上呼叫的是由上層元件從props.onItemClick傳入的方法(上層元件的方法)
  //   props.onItemClick(props.index);
  // };

  // return <li onClick={handleClick}>{props.text}</li>;
  return <h1>3122</h1>;
};

//加入props的資料類型驗証
// CalenderModule.propTypes = {
//   text: React.PropTypes.string.isRequired,
//   index: React.PropTypes.number.isRequired,
//   onItemClick: React.PropTypes.func
// };

//匯出TodoItem模組
export default CalenderModule;
