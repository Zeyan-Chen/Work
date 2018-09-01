import React from "react"; // 必要的
import ReactDOM from "react-dom"; // 必要的
import "./style/index.min.css";

// import Counter from "./components/counter";
import Counters from "./components/counters";

// ReactDOM.render(<Counter />, document.querySelector("#root")); // render，這邊的 Counter 是在 counter.jsx
ReactDOM.render(<Counters />, document.querySelector("#root"));
