import React, { Component } from "react";
import "../style/css.min.css";
import FzDefault from "./FzDefault";
import FzRel from "./FzRel";

class FzTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      default: {
        dataList: props.defaultList,
        item: { itemULW: 100, itemLIW: 100 }
      },
      rel: { dataList: props.relList }
    };
  }

  render() {
    return (
      // <div>
      <React.Fragment>
        <h1>style: default</h1>
        <FzDefault dataList={this.state.default.dataList} className="default" />
        <h1>style: rel</h1>
        <FzDefault dataList={this.state.rel.dataList} className="rel" />
      </React.Fragment>
      // </div>
    );
  }
}

export default FzTable;
