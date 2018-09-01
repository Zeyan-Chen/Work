import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FzTable from "./components/FzTable";
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
  <FzTable dataList={dateJSON} />,
  document.getElementById("Fztable")
);
registerServiceWorker();
