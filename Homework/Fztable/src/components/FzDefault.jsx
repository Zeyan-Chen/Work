import React, { Component } from "react";

class FzDefault extends Component {
  // 從 FzTable.jsx 收到的值傳進 state
  constructor(props) {
    super(props);
    // console.log(props);
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
    // console.log(value);
    // if (value == "--" || value == "查看") {
    //   return false;
    // }

    let elClicked; // 被按到的那個
    let rowFocus; // 被按到的那排，橫排
    let columnFocus; // 被按到的那直行，直排

    // 判斷點到進來的格式
    if (e.target.nodeName !== "LI") {
      if (e.target.nodeName === "SPAN") {
        elClicked = e.target.parentNode; // li
        if (e.target.nodeName === "SPAN") {
          if (e.target.classList.contains("gray")) {
            elClicked = e.target.parentNode.parentNode; // li
          }
        }
      }
    } else {
      elClicked = e.target;
    }

    //　每次點擊就優先把底下的 li class [active, activeThis] 都刪掉
    let allLi = document.querySelectorAll(
      `.${this.state.styleName} .slider-move li`
    );
    for (let i = 0; i < allLi.length; i++) {
      if (
        allLi[i].classList.contains("active") ||
        allLi[i].classList.contains("activeThis")
      ) {
        allLi[i].classList.remove("active");
        allLi[i].classList.remove("activeThis");
      }
    }
    elClicked.classList.add("activeThis"); // 點擊到的 el 加上 activethis

    // 橫排的　focus
    rowFocus = elClicked.parentNode.childNodes;
    for (let i = 0; i < rowFocus.length; i++) {
      // 除了　activethis 以外其他都加上　active
      if (!rowFocus[i].classList.contains("activeThis")) {
        rowFocus[i].classList.add("active");
      }
    }

    // 直排的　focus
    let columnUL = elClicked.parentNode.parentNode.childNodes;
    for (let i = 0; i < columnUL.length; i++) {
      columnFocus = columnUL[i].childNodes[index];
      if (!columnUL[i].classList.contains("rowStyle")) {
        columnFocus.classList.add("active");
      }
    }

    // 只要有加上　activeThis 的 active 就拿掉
    if (document.querySelector(".activeThis").classList.contains("active")) {
      document.querySelector(".activeThis").classList.remove("active");
    }
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
            <span>去程</span>
            <span>回程</span>
          </div>
          <ul className="columnStyle">
            {this.state.columnDate.map((tags, i) => {
              return <li key={i}>{tags}</li>;
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
            <ul
              className="rowStyle"
              style={{
                width: this.state.ifPC ? null : this.state.itemULW + "%"
              }}
            >
              {this.state.rowDate.map((tags, i) => {
                return (
                  <li
                    style={{
                      width: this.state.ifPC ? null : this.state.itemLIW + "%"
                    }}
                    key={i}
                  >
                    {tags}
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
                        {!isNaN(value) ? (
                          <span>
                            ${value}
                            <span className="gray">起</span>
                          </span>
                        ) : (
                          <span className="gray">{value}</span>
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

export default FzDefault;
