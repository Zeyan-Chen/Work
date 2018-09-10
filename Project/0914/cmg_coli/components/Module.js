import React from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import classNames from "classnames";
import styles from "../css.scss";

let Module = props => {
  // console.log(props);
  const classes = classNames("cmg_coli");

  // 數字換算每三個單位 + 一個逗號
  const price = x => {
    return `$${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  // 字上面 check 有無超過預設字數，(先保留著)
  function textLenCheck(ifNew, Title) {
    // "有" new 標籤字數限定 18 "沒有"都 21
    let limitLen = ifNew ? 18 : 21;
    let newValue;
    // console.log("Title: " + Title);
    // console.log("limitLen: " + limitLen);
    // console.log("TitleLength: " + Title.length);
    if (Title.length > limitLen) {
      newValue = Title.substring(0, limitLen) + "...";
    } else {
      newValue = Title;
    }
    return newValue;
  }

  return (
    <div className={classes}>
      <div className="title">
        <div className="circle" />
        <h1>熱門推薦</h1>
      </div>
      <ul>
        {props.prop.data.map((tags, i) => {
          return (
            <li key={i} className={`col-${props.prop.arrangement}`}>
              <a href={tags.href} target={tags.targetBlank ? "_blank" : null} />
              <div className="inside-left">
                {tags.label === "" ? (
                  <div className="flag" />
                ) : (
                  <div className="btn-1">{tags.label}</div>
                )}
                {tags.newest ? <div className="btn-2">NEW</div> : null}
                {/* {textLenCheck(tags.newest, tags.title)} */}
                {tags.title}
              </div>
              <div className="inside-right">
                <div className="price">{price(tags.price)}</div>
                <span className="gray">起</span>
              </div>
            </li>
          );
        })}
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
