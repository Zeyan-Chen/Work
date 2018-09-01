import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker.js";
import FzTable from "./index.js";

const ajaxLists = {
  sDate1: "2017/12/27",
  eDate1: "2018/01/02",
  sDate2: "2017/12/30",
  eDate2: "2018/01/05",
  data: [
    { value: "— —" },
    { value: 15568 },
    { value: 15568 },
    { value: 15568 },
    { value: 12300 },
    { value: 15568 },
    { value: 15568 },

    { value: 15568 },
    { value: 12300 },
    { value: 15568 },
    { value: 15568 },
    { value: 15568 },
    { value: 15568 },
    { value: 15568 },

    { value: "查看" },
    { value: 15568 },
    { value: 15568 },
    { value: 15568 },
    { value: 15568 },
    { value: 15568 },
    { value: 15568 },

    { value: "查看" },
    { value: "查看" },
    { value: 15568 },
    { value: 12300 },
    { value: 15568 },
    { value: 15568 },
    { value: 15568 },

    { value: "查看" },
    { value: "查看" },
    { value: "查看" },
    { value: 15568 },
    { value: 15568 },
    { value: 12300 },
    { value: 15568 },

    { value: "查看" },
    { value: "查看" },
    { value: "查看" },
    { value: "查看" },
    { value: 15568 },
    { value: 15568 },
    { value: 15568 },

    { value: "查看" },
    { value: "查看" },
    { value: "查看" },
    { value: "查看" },
    { value: "查看" },
    { value: 15568 },
    { value: 15568 }
  ]
};

let reatcApp = ReactDOM.render(
  <FzTable
    lists={ajaxLists}
    count={{
      // M版時每次點擊往前往後移動幾格儲存格
      slide: 2, // [number]
      // M版時一個畫面show幾格儲存格
      show: 4 // [number]
    }}
    // 設定花多久時間移動完成
    speed={0.3} // [number]
    // 每次點擊儲存格時會執行此callback，並帶入所點擊的儲存格jquery物件
    whenClick={function($element) {
      console.log($element);
    }}
  />,
  document.getElementById("root")
);
console.log(reatcApp);
registerServiceWorker();
