import React, { Component } from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";

import styles from "../css.scss";
import TableFixed from "./TableFixed.js";
import TableContent from "./TableContent.js";
import TableCtrBtn from "./TableCtrBtn.js";

class FzTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /**
       * 處理ajax回來的資料
       */
      rowTh: [],
      colTh: [],
      data: [],
      dataStartYear: 1970,

      /**
       * 處理props設定show幾欄(column)表格的範圍(1~4)
       */
      countShow: 1,
      /**
       * 當前第一欄(column)的index
       */
      firstColIndex: 0,
      /**
       * 所有欄(column)的數量
       */
      colNum: 0
    };

    this.setFirstColIndex = this.setFirstColIndex.bind(this);
  }
  componentWillMount() {
    const { sDate1, eDate1, sDate2, eDate2 } = this.props.lists;
    this.setState({
      rowTh: [["回程", "去程"], ...this.getDayRange(sDate2, eDate2)]
    });
    this.setState({
      colTh: [["回程", "去程"], ...this.getDayRange(sDate1, eDate1)]
    });
  }
  componentDidMount() {
    this.init();
    window.addEventListener("resize", () => {
      this.resizeToDesktop();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => {
      this.resizeToDesktop();
    });
  }

  init() {
    this.setState({ data: this.sortDate() }, () => {
      this.setState({ colNum: this.state.data.length });
    });

    if (this.props.count.show > 4) {
      this.setState({ countShow: 4 });
    } else if (this.props.count.show < 1) {
      this.setState({ countShow: 1 });
    } else {
      this.setState({ countShow: this.props.count.show });
    }

    this.setState({
      dataStartYear: new Date(this.props.lists.sDate1).getFullYear()
    });
  }
  resizeToDesktop() {
    if (window.innerWidth > 768) {
      this.setState({ firstColIndex: 0 });
    }
  }
  getDayRange(firstDay, endDate) {
    let filterArr = [],
      dayArr = ["日", "一", "二", "三", "四", "五", "六"],
      start = new Date(firstDay).getTime(),
      end = new Date(endDate).getTime(),
      mm,
      dd,
      mmdd,
      day;

    for (let i = start; i <= end; i += 86400000) {
      mm = ("0" + (new Date(i).getMonth() + 1)).slice(-2);
      dd = ("0" + new Date(i).getDate()).slice(-2);

      mmdd = `${mm}/${dd}`;
      day = `(${dayArr[new Date(i).getDay()]})`;
      filterArr.push([mmdd, day]);
    }

    console.log(filterArr);

    return filterArr;
  }
  sortDate() {
    let wArr = [],
      allWArr = [],
      length = this.state.rowTh.length - 1;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        wArr.push(this.props.lists.data[j + i * length].value);
      }
      allWArr.push(wArr);
      wArr = [];
    }
    return allWArr;
  }

  setFirstColIndex(val) {
    this.setState({
      firstColIndex: val
    });
  }

  render() {
    const { countShow, colTh, rowTh, data, firstColIndex, colNum } = this.state;
    return (
      <div className={`FzTable showcol-${countShow}`}>
        {}
        <TableFixed colTh={colTh} />
        <TableContent
          colTh={colTh}
          rowTh={rowTh}
          tdData={data}
          nowFirstColIndex={firstColIndex}
          speed={this.props.speed}
          callBack={this.props.whenClick}
        />
        <TableCtrBtn
          nowFirstColIndex={firstColIndex}
          colNum={colNum}
          slide={this.props.count.slide}
          show={this.props.count.show}
          btnClick={this.setFirstColIndex}
        />
      </div>
    );
  }
}

FzTable.defaultProps = {
  count: {
    // M版時每次點擊往前往後移動幾格儲存格
    slide: 1, // [number]
    // M版時一個畫面show幾格儲存格
    show: 4 // [number]
  },
  // 設定花多久時間移動完成
  speed: 0.3, // [number]
  // 每次點擊儲存格時會執行此callback，並帶入所點擊的儲存格jquery物件
  whenClick: function($element) {
    console.log($element);
  }
};

FzTable.propTypes = {
  lists: PropTypes.object.isRequired,
  count: PropTypes.shape({
    slide: PropTypes.number,
    show: PropTypes.number
  }),
  speed: PropTypes.number,
  whenClick: PropTypes.func
};

export default CSSModules(FzTable, styles, { allowMultiple: true });
