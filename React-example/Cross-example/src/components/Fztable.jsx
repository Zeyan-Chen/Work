import React, { Component } from "react";

class Fztable extends Component {
  constructor(props) {
    super(props);
    this.whenclicked = this.whenclicked.bind(this);
  }
  // state = {
  //   date: [
  //     {
  //       id: 1,
  //       backDate: "",
  //       goDate: "",
  //       price: 123,
  //       sale: true
  //     },
  //     {
  //       id: 2,
  //       price: 123,
  //       sale: true
  //     },
  //     {
  //       id: 3,
  //       price: 123,
  //       sale: true
  //     },
  //     {
  //       id: 4,
  //       price: 123,
  //       sale: true
  //     },
  //     {
  //       id: 5,
  //       price: 123,
  //       sale: true
  //     },
  //     {
  //       id: 6,
  //       price: 123,
  //       sale: true
  //     },
  //     {
  //       id: 7,
  //       price: 123,
  //       sale: true
  //     }
  //   ]
  // };

  // 被點擊時，十字 focus
  whenclicked = (e, index) => {
    let rowTd = e.target.parentNode.childNodes;
    let tableAllTd = document.querySelectorAll("tbody tr td");
    let tableAllTr = document.querySelectorAll("tbody tr");
    // 清除所有 activeThis，active
    for (let i = 0; i < tableAllTd.length; i++) {
      tableAllTd[i].classList.remove("activeThis");
      tableAllTd[i].classList.remove("active");
    }
    // row 除了 activeThis 其餘加入 active
    for (let i = 0; i < rowTd.length; i++) {
      if (
        rowTd[i].classList.value !== "activeThis" &&
        rowTd[i].tagName !== "TH"
      ) {
        rowTd[i].classList.add("active");
      }
    }
    // column，加上 active
    for (let i = 0; i < tableAllTr.length; i++) {
      tableAllTr[i].childNodes[index + 1].classList.add("active");
    }
    // 點到的先加 activeThis
    e.target.classList.remove("active"); // 自己本身移掉 active
    e.target.classList.add("activeThis"); // 自己加上 active
  };

  createData = props => {
    let createRessult = props.dateList.columnDate.map((tag, i) => {
      return (
        <tr key={i}>
          <th>{tag}</th>
          {props.dateList.data[i].value.map((td, index) => {
            return (
              <td key={index} onClick={e => this.whenclicked(e, index)}>
                {td}
              </td>
            );
          })}
        </tr>
      );
    });

    return createRessult;
  };

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th className="BackAndGo">
              <span>去程</span>
              <span>回程</span>
            </th>
            {this.props.dateList.rowDate.map((tag, i) => (
              <th key={i}>{tag}</th>
            ))}
          </tr>
        </thead>
        <tbody>{this.createData(this.props)}</tbody>
      </table>
    );
  }
}

export default Fztable;
