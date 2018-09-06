import React from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import classNames from "classnames";
import styles from "../css.scss";

let Module = props => {
  console.log(props);

  const classes = classNames("cmg_coli");
  return (
    <div styleName={classes}>
      {/* {props.children} */}
      <div className="title">
        <div className="circle" />
        <h1>熱門推薦</h1>
      </div>
      <ul>
        <li>
          <div className="left">
            <div className="btn-1">夏季旅展</div>
            <div className="btn-2">NEW</div>
            <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
          </div>
          <div className="right">
            <span className="price">$9,999,999</span>
            <span className="gray">起</span>
          </div>
        </li>
        <li>
          <div className="left">
            <div className="btn-1">主打星</div>
            <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
          </div>
          <div className="right">
            <span className="price">$9,999,999</span>
            <span className="gray">起</span>
          </div>
        </li>
        <li>
          <div className="left">
            <div className="btn-1">最美峽谷</div>
            <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
          </div>
          <div className="right">
            <span className="price">$9,999,999</span>
            <span className="gray">起</span>
          </div>
        </li>
        <li>
          <div className="left">
            <div className="btn-1">花現青海</div>
            <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
          </div>
          <div className="right">
            <span className="price">$9,999,999</span>
            <span className="gray">起</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
/**
 * Props default value write here
 */
Module.defaultProps = {
  prop: "string"
};
/**
 * Typechecking with proptypes, is a place to define prop api. [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
 */
Module.propTypes = {
  prop: PropTypes.string.isRequired
};

export default CSSModules(Module, styles, { allowMultiple: true });
