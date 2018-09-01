import React, { Component } from 'react';
import TodoList from './TodoList.js';

class App extends Component {
  render() {
    return <TodoList initText="開始輸入文字吧！" />
  }
}

//輸出App元件
export default App;