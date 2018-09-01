import React from "react";
import ReactDOM from "react-dom";

import "./style/css.min.css";
import FzTable from "./components/Fztable";
import registerServiceWorker from "./registerServiceWorker";

const dateJSON = {
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
  ]
};

ReactDOM.render(
  <FzTable
    dateList={dateJSON}
    count={{
      // M版時每次點擊往前往後移動幾格儲存格
      slide: 1, // [number]
      // M版時一個畫面show幾格儲存格
      show: 4 // [number]
    }}
    // 設定花多久時間移動完成
    speed={0.3} // [number]
    // 每次點擊儲存格時會執行此callback，並帶入所點擊的儲存格jquery物件
    whenClick={function($element) {
      // console.log($element)
    }}
  />,
  document.querySelector("#FzTable")
);
// console.log(reatcApp);

registerServiceWorker();

// ReactDOM.render(<Calender />, document.getElementById("calender"));
// ReactDOM.render(<Fztable />, document.getElementById("Fztable"));
