import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FzTable from "./components/FzTable";
import registerServiceWorker from "./registerServiceWorker";

const defaultList = {
  rowDate: [
    "12/30(六)",
    "12/31(日)",
    "01/01(一)",
    "01/02(二)",
    "01/03(三)",
    "01/04(四)",
    "01/05(五)"
  ],
  columnDate: [
    "12/27(三)",
    "12/28(四)",
    "12/29(五)",
    "12/30(六)",
    "12/31(日)",
    "01/01(一)",
    "01/02(二)"
  ],
  data: [
    { value: ["--", "15568", "15568", "15568", "15568", "15568", "15568"] },
    { value: ["15568", "15568", "15568", "15568", "15568", "15568", "15568"] },
    { value: ["15568", "15568", "15568", "12300", "15568", "15568", "15568"] },
    { value: ["15568", "15568", "15568", "15568", "15568", "15568", "15568"] },
    { value: ["15568", "15568", "15568", "15568", "15568", "15568", "15568"] },
    { value: ["15568", "15568", "15568", "15568", "12300", "15568", "12300"] },
    { value: ["15568", "15568", "15568", "15568", "15568", "15568", "15568"] }
  ],
  count: {
    // M版時每次點擊往前往後移動幾格儲存格
    slide: 1, // [number]
    // M版時一個畫面show幾格儲存格
    show: 3 // [number]
  },
  // 設定花多久時間移動完成
  speed: 0.6, // [number]
  // 每次點擊儲存格時會執行此callback，並帶入所點擊的儲存格jquery物件
  whenClick: function($element) {
    // console.log($element)
  }
};

const relList = {
  rowDate: [
    "東京成田",
    "東京羽田",
    "大阪關西",
    "大阪關西",
    "大阪關西",
  ],
  columnDate: ["TPE", "HKG", "PVG"],
  data: [
    { value: ["15568", "15568", "15568", "--", "--"] },
    { value: ["15568", "15568", "15568", "--", "--"] },
    { value: ["15568", "15568", "15568", "--", "--"] },
  ],
  count: {
    // M版時每次點擊往前往後移動幾格儲存格
    slide: 1, // [number]
    // M版時一個畫面show幾格儲存格
    show: 5 // [number]
  },
  // 設定花多久時間移動完成
  speed: 0.6, // [number]
  // 每次點擊儲存格時會執行此callback，並帶入所點擊的儲存格jquery物件
  whenClick: function($element) {
    // console.log($element)
  }
};

ReactDOM.render(
  <FzTable defaultList={defaultList} relList={relList} />,
  document.getElementById("Fztable")
);
registerServiceWorker();
