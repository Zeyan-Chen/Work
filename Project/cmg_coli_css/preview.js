import React from "react";
import ReactDOM from "react-dom";
import CmgColi from "./index.js";
import "../core/core.scss";

let props = {
  // [object]
  arrangement: 3, // 排列方式 [number]
  data: [
    // [array]
    {
      title: "", // 產品標題 [string]
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "", // 產品標籤 [string]
      newest: true, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    }
    // ...
  ],
  more: {
    name: "", // 看更多-文字 [string]
    href: "" // 看更多-連結 [string]
  },
  anchorName: "" // 錨點名稱 [string]
};
ReactDOM.render(
  <CmgColi prop={props}>component content ishere</CmgColi>,
  document.getElementById("root")
);
