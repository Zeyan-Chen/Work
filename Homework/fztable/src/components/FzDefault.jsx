import React, { Component } from "react";

class FzDefault extends Component {
  // 從 FzTable.jsx 收到的值傳進 state
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      columDate: props.dataList.columnDate,
      rowDate: props.dataList.rowDate,
      contentDate: props.dataList.data,

      itemULW: (100 * 7) / props.count.show,
      itemLIW: 100 / 7,

      show: props.count.show,
      speed: props.speed
    };
    // this.definWH = this.definSliderWH.bind(this);
  }

  // 輪播
  slider = e => {
    let elSlider = document.querySelector(".slider-move");
    if (e.target.classList.contains("next")) {
      elSlider.setAttribute("style", "left: 100px");
    } else {
    }

    return `transition: all ${this.state.speed}s ease-in-out`;
  };

  componentDidMount() {
    let self = this;
    // 當螢幕寬度大於 768 時把 style 全部刪掉，小於時則全部 + style
    window.addEventListener("resize", function(e) {
      let elSliderUL = document.querySelectorAll(".slider-move ul");
      let elSliderLI = document.querySelectorAll(".slider-move li");
      if (e.target.innerWidth > 768) {
        console.log("目前為 PC 狀態");
        for (let i = 0; i < elSliderUL.length; i++) {
          elSliderUL[i].removeAttribute("style");
        }

        for (let i = 0; i < elSliderLI.length; i++) {
          elSliderLI[i].removeAttribute("style");
        }
      } else {
        console.log("目前為 Mobile 狀態");
        for (let i = 0; i < elSliderUL.length; i++) {
          elSliderUL[i].setAttribute(
            "style",
            "width: " + self.state.itemULW + "%"
          );
        }

        for (let i = 0; i < elSliderLI.length; i++) {
          elSliderLI[i].setAttribute(
            "style",
            "width: " + self.state.itemLIW + "%"
          );
        }
      }
    }); // window end
  }

  render() {
    console.log(this.state);
    return (
      <div className="default">
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
            {this.state.columDate.map((tags, i) => {
              return <li key={i}>{tags}</li>;
            })}
          </ul>
        </div>
        <div className="right">
          <div
            className="slider-move"
            style={{
              transition: `all ${this.state.speed}s ease-in-out`
            }}
          >
            {/* <ul style={{ width: (100 * 7) / this.state.show + "%" }}> */}
            <ul style={{ width: (100 * 7) / this.state.show + "%" }}>
              {this.state.rowDate.map((tags, i) => {
                return (
                  <li style={{ width: 100 / 7 + "%" }} key={i} key={i}>
                    {tags}
                  </li>
                );
              })}
            </ul>

            {this.state.contentDate.map((tags, i) => {
              return (
                // 今天從這邊開始修
                <ul key={i} style={{ width: this.state.itemULW + "%" }}>
                  {tags.value.map((index, i) => {
                    return (
                      <li style={{ width: this.state.itemLIW + "%" }} key={i}>
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
