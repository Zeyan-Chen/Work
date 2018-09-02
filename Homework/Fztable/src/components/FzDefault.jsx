import React, { Component } from "react";

class FzDefault extends Component {
  // 從 FzTable.jsx 收到的值傳進 state
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      columnDate: props.dataList.columnDate,
      rowDate: props.dataList.rowDate,
      contentDate: props.dataList.data,

      itemULW:
        (100 * props.dataList.rowDate.length) / props.dataList.count.show,
      itemLIW: 100 / props.dataList.rowDate.length,

      sliderIndex: 0,
      sliderLiLen: props.dataList.columnDate.length,

      styleName: props.className,

      show: props.dataList.count.show,
      slide: props.dataList.count.slide,
      speed: props.dataList.speed,

      ifPC: true
    };
    // this.windowSizeCheck = this.windowSizeCheck.bind(this);
  }

  // 輪播
  slider = e => {
    // 取小數點第 5 位
    let roundDecimal = function(val, precision) {
      return (
        Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) /
        Math.pow(10, precision || 0)
      );
    };
    let elSlider = document.querySelector(".default .slider-move");
    let index = this.state.sliderIndex;
    let sliderLILen = this.state.sliderLiLen;
    let slide = this.state.slide;
    let move;

    if (e.target.classList.contains("next")) {
      // console.log("next");
      this.setState({ sliderIndex: ++index });
      console.log(index * slide, sliderLILen);
      if (index * slide >= sliderLILen) {
        console.log("超過了");
        this.setState({ sliderIndex: (index = 0) });
      }
    } else {
      // console.log("prev");
      this.setState({ sliderIndex: --index });
      if (index < 0) {
        this.setState({ sliderIndex: (index = sliderLILen - 1) });
      }
    }

    move =
      (roundDecimal(this.state.itemULW, 4) / this.state.sliderLiLen) *
      slide *
      index *
      -1;
    elSlider.style.left = move + "%";
  };

  // windowSizeCheck(thisWindow) {
  //   let elSliderUL = document.querySelectorAll(".slider-move ul");
  //   let elSliderLI = document.querySelectorAll(".slider-move li");
  //   if (thisWindow.innerWidth > 768) {
  //     // console.log("目前為 PC 狀態");
  //     for (let i = 0; i < elSliderUL.length; i++) {
  //       elSliderUL[i].removeAttribute("style");
  //     }

  //     for (let i = 0; i < elSliderLI.length; i++) {
  //       elSliderLI[i].removeAttribute("style");
  //     }
  //   } else {
  //     console.log("目前為 Mobile 狀態");
  //     console.log(this.state.itemULW[0]);

  //     // for (let i = 0; i < elSliderUL.length; i++) {
  //     //   elSliderUL[i].setAttribute(
  //     //     "style",
  //     //     "width: " + this.state.itemULW + "%"
  //     //   );
  //     // }

  //     // for (let i = 0; i < elSliderLI.length; i++) {
  //     //   elSliderLI[i].setAttribute(
  //     //     "style",
  //     //     "width: " + this.state.itemLIW + "%"
  //     //   );
  //     // }
  //   }
  // }

  componentDidMount() {
    let self = this;
    if (window.innerWidth > 768) {
      self.setState({ ifPC: true });
    } else {
      self.setState({ ifPC: false });
    }

    // 當螢幕寬度大於 768 時把 style 全部刪掉，小於時則全部 + style
    window.addEventListener("resize", function(e) {
      // self.windowSizeCheck(e);
      // let elSliderUL = document.querySelectorAll(".slider-move ul");
      // let elSliderLI = document.querySelectorAll(".slider-move li");
      if (e.target.innerWidth > 768) {
        self.setState({ ifPC: true });
      } else {
        self.setState({ ifPC: false });
      }
      self.getValue().ulW;
      self.getValue().liW;
      // console.log(self.state.ifPC);
    }); // window end
    // console.log(self.state.ifPC);
  }

  getValue() {
    const { ifPC } = this.state;
    let ulW = ifPC ? "auto" : this.state.itemULW + "%";
    let liW = ifPC ? "auto" : this.state.itemLIW + "%";
    return { ulW, liW };
  }

  render() {
    return (
      <div className={this.state.styleName}>
        <div className="fas fa-angle-right next" onClick={e => this.slider(e)}>
          {/* <i className="fas fa-angle-right" /> */}
        </div>
        <div className="fas fa-angle-left prev" onClick={e => this.slider(e)}>
          {/* <i className="fas fa-angle-left" /> */}
        </div>
        <div className="left">
          <div className="BackAndGo">
            <span>去程</span>
            <span>回程</span>
          </div>
          <ul>
            {this.state.columnDate.map((tags, i) => {
              return <li key={i}>{tags}</li>;
            })}
          </ul>
        </div>
        <div className="right">
          <div
            className="slider-move"
            style={{
              transition: "all " + this.state.speed + "s ease",
              left: 0 + "%"
            }}
          >
            {/* <ul style={{ width: this.state.itemULW + "%" }}> */}
            <ul style={{ width: this.getValue().ulW }}>
              {this.state.rowDate.map((tags, i) => {
                return (
                  <li style={{ width: this.getValue().liW }} key={i}>
                    {tags}
                  </li>
                );
              })}
            </ul>

            {this.state.contentDate.map((tags, i) => {
              return (
                <ul key={i} style={{ width: this.getValue().ulW }}>
                  {tags.value.map((index, i) => {
                    return (
                      <li style={{ width: this.getValue().liW }} key={i}>
                        {index}
                      </li>
                    );
                  })}
                </ul>

                // <ul
                //   key={i}
                //   style={{ width: (100 * 7) / this.state.show + "%" }}
                // >
                //   {/* {this.createLi(tags)} */}
                //   {tags.value.map((index, i) => {
                //     return (
                //       <li style={{ width: 100 / 7 + "%" }} key={i}>
                //         {index}
                //       </li>
                //     );
                //     // width: calc(100%/7);
                //   })}
                // </ul>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default FzDefault;
