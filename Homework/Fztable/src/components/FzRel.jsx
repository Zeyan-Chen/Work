import React, { Component } from "react";

class FzRel extends Component {
  // 從 FzTable.jsx 收到的值傳進 state
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      columnDate: props.dataList.columnDate, //　行程表 左側欄
      rowDate: props.dataList.rowDate, //　行程表 上排
      contentDate: props.dataList.data, //　行程表 Data

      // 100 * 7 / 1
      itemULW:
        (100 * props.dataList.rowDate.length) / props.dataList.count.show, // Ul　寬度計算
      itemLIW: 100 / props.dataList.count.show, // li　寬度計算
      // 100 / 7

      sliderIndex: 0, // 目前的　index
      sliderLiLen: props.dataList.columnDate.length, // slider 裡有幾個　li

      styleName: props.dataList.styleName, // 目前用哪個　layout
      show: props.dataList.count.show, // M　版顯示多少格
      slide: props.dataList.count.slide, // 移動多少格
      speed: props.dataList.speed, // 移動多少速度
      ifPC: true, // 是否　pc 狀態
      sliderLeft: 0 // slider left 移動多少
    };
    // this.windowSizeCheck = this.windowSizeCheck.bind(this);
  }

  // 輪播
  slider = e => {
    let sliderLeft = this.state.sliderLeft;
    let itemULW = this.state.itemULW;
    let itemLIW = this.state.itemLIW;
    let slide = this.state.slide;
    let show = this.state.show;
    let clickNumber = this.state.sliderIndex;

    // next，prev
    if (e.target.classList.contains("next")) {
      let move = (sliderLeft += itemLIW * slide);
      this.setState({
        sliderLeft: move
      });

      this.setState({ sliderIndex: ++clickNumber });
    } else {
      this.setState({
        sliderLeft: (sliderLeft -= itemLIW * slide)
      });
      this.setState({ sliderIndex: --clickNumber });
    }

    // 計算移動到最底的寬度
    let last = itemULW - itemLIW * show;
    console.log("前進的寬度:" + sliderLeft);
    console.log("到底:" + last);

    if (sliderLeft >= last) {
      console.log("超過了");
      this.setState({ sliderLeft: (sliderLeft = last) });
      document
        .querySelector(`.${this.state.styleName} .next`)
        .classList.add("hidden");
    } else {
      document
        .querySelector(`.${this.state.styleName} .next`)
        .classList.remove("hidden");
    }

    if (sliderLeft <= 0) {
      this.setState({ sliderLeft: (sliderLeft = 0) });
      document
        .querySelector(`.${this.state.styleName} .prev`)
        .classList.add("hidden");
    } else {
      document
        .querySelector(`.${this.state.styleName} .prev`)
        .classList.remove("hidden");
    }
  };

  componentDidMount() {
    // 初始判定螢幕目前的狀態
    let self = this;
    if (window.innerWidth > 768) {
      self.setState({ ifPC: true });
    } else {
      self.setState({ ifPC: false });
    }

    // 畫面縮放時，回傳目前螢幕的狀態
    window.addEventListener("resize", function(e) {
      if (e.target.innerWidth > 768) {
        self.setState({ ifPC: true });
      } else {
        self.setState({ ifPC: false });
      }
    });
  }

  // 被點擊時，十字 focus
  whenclicked = (e, index, value) => {
    // 點到的值為 -- 就不做了
    if (value === "--") {
      return false;
    }

    let elClicked; // 被按到的那個
    // // 判斷點到進來的格式
    if (e.target.nodeName === "SPAN") {
      elClicked = e.target.parentNode; // li
      if (e.target.nodeName === "SPAN") {
        if (e.target.classList.contains("gray")) {
          elClicked = e.target.parentNode.parentNode; // li
        }
      }
    } else {
      elClicked = e.target; // li
    }

    //　每次點擊就優先把底下的 li class [active, activeThis] 都刪掉
    let allLi = document.querySelectorAll(
      `.${this.state.styleName} .slider-move li`
    );
    for (let i = 0; i < allLi.length; i++) {
      if (allLi[i].classList.contains("activeThis")) {
        allLi[i].classList.remove("activeThis");
      }
    }

    // 一進來先移除飛機 class
    let allAirplaneClass = document.querySelectorAll(".fa-plane");
    for (let i = 0; i < allAirplaneClass.length; i++) {
      allAirplaneClass[i].classList.remove("fa-plane");
      allAirplaneClass[i].parentNode.classList.remove("focuscolor");
    }

    // 點擊到的 el 加上 activethis
    elClicked.classList.add("activeThis");

    // 橫排加飛機
    let elRowLI = document.querySelectorAll(
      `.${this.state.styleName} .rowStyle li`
    );
    let rowAirplane = document.createElement("I");
    rowAirplane.setAttribute("class", "fas fa-plane");
    elRowLI[index].appendChild(rowAirplane);
    elRowLI[index].classList.add("focuscolor");

    // 直排加飛機
    let columnIndex; // 直排有 activeThis index
    let elColumnLI = document.querySelectorAll(
      `.${this.state.styleName} .columnStyle li`
    );
    let elSliderUL = document.querySelectorAll(
      `.${this.state.styleName} .slider-move ul`
    );

    // 算出目前直排點到的 index
    for (let i = 0; i < elSliderUL.length; i++) {
      for (let y = 0; y < elSliderUL[i].childNodes.length; y++) {
        if (elSliderUL[i].childNodes[y].classList.contains("activeThis")) {
          columnIndex = i;
          break;
        }
      }
    }
    let columnAirplane = document.createElement("I");
    columnAirplane.setAttribute("class", "fas fa-plane");
    elColumnLI[columnIndex - 1].appendChild(columnAirplane);
    elColumnLI[columnIndex - 1].classList.add("focuscolor");
  };

  render() {
    return (
      <div className={this.state.styleName}>
        <div
          className="fas fa-angle-right next"
          onClick={e => this.slider(e)}
        />
        <div
          onClick={e => this.slider(e)}
          className={
            this.state.sliderLeft === 0
              ? "fas fa-angle-left prev hidden"
              : "fas fa-angle-left prev"
          }
        />
        <div className="left">
          <div className="BackAndGo">
            <span>
              <i className="fas fa-arrow-down" />
              出發地
            </span>
            <span>
              目的地 <i className="fas fa-arrow-right" />
            </span>
          </div>
          <ul className="columnStyle">
            {this.state.columnDate.map((tags, i) => {
              return (
                <li key={i}>
                  <h3>{tags.english}</h3>
                  <p>{tags.chiness}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right">
          <div
            className="slider-move"
            style={{
              transition: this.state.ifPC
                ? null
                : "all " + this.state.speed + "s ease",
              left: this.state.ifPC ? null : -this.state.sliderLeft + "%"
            }}
          >
            {/* <ul style={{ width: this.state.itemULW + "%" }}> */}
            <ul
              className="rowStyle"
              style={{
                width: this.state.ifPC ? null : this.state.itemULW + "%"
              }}
            >
              {this.state.rowDate.map((tags, i) => {
                return (
                  <li
                    key={i}
                    style={{
                      width: this.state.ifPC ? null : this.state.itemLIW + "%"
                    }}
                  >
                    <h3>{tags.english}</h3>
                    <p
                      className={
                        tags.chiness === "" ? "gray disableStyle" : null
                      }
                    >
                      {tags.chiness === "" ? "請選擇目的地" : tags.chiness}
                    </p>
                  </li>
                );
              })}
            </ul>

            {this.state.contentDate.map((tags, i) => {
              return (
                <ul
                  key={i}
                  style={{
                    width: this.state.ifPC ? null : this.state.itemULW + "%"
                  }}
                >
                  {tags.value.map((value, i) => {
                    return (
                      <li
                        style={{
                          width: this.state.ifPC
                            ? null
                            : this.state.itemLIW + "%"
                        }}
                        key={i}
                        className={value === "12300" ? "sale" : null}
                        onClick={e => this.whenclicked(e, i, value)}
                      >
                        <span>{value === "--" ? null : "中華航空公司"}</span>
                        {!isNaN(value) ? (
                          <span>
                            ${value}
                            <span className="gray">起</span>
                          </span>
                        ) : (
                          <span className={value === "--" ? "gray" : null}>
                            {value}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default FzRel;
