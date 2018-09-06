import React from "react";
import ReactDOM from "react-dom";
import CmgColi from "./index.js";
import "../core/core.scss";
let props = {
  data: {
    // [object]
    positionID: "m01", // [string]
    positionName: "區域名稱", // [string]
    arrangement: 3, // [number]
    data: [
      // [array]
      {
        title: "", // [string]
        href: "", // [string]
        targetBlank: true, // [bool]
        label: "", // [string]
        newest: true // [bool]
      }
      // ...
    ],
    anchorName: "" // [string]
  }
};
ReactDOM.render(
  <CmgColi prop={props}>component content ishere</CmgColi>,
  document.getElementById("root")
);
