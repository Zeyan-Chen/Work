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