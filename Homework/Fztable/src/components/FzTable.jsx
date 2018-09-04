import React, { Component } from "react";
import "../style/css.min.css";
import FzDefault from "./FzDefault";
import FzRel from "./FzRel";

class FzTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      default: {
        dataList: props.defaultList
      },
      rel: { dataList: props.relList }
    };
  }

  render() {
    return (
      // <React.Fragment>
      <div>
        <h1>style: default</h1>
        <FzDefault dataList={this.state.default.dataList} />
        <h1>style: rel</h1>
        <FzRel dataList={this.state.rel.dataList} />
      </div>
      //</React.Fragment> */}
      // React.createElement(
      //   FzDefault,
      //   {
      //     dataList: this.state.default.dataList,
      //     className: "default"
      //   },
      //   React.createElement(FzRel, {
      //     dataList: this.state.rel.dataList,
      //     className: "rel"
      //   })
      // )

      // FzDefault,
      // {
      //   dataList: this.state.default.dataList,
      //   className: "default"
      // },
      // FzRel,
      // {
      //   dataList: this.state.rel.dataList,
      //   className: "rel"
      // }
    );
  }
}

export default FzTable;
