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

  // data
  let data = [
    {
      title: "絕美江南紹興古鎮日無購物無自費自", // 產品標題 [string]
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "夏季旅展", // 產品標籤 [string]
      newest: true, // 最新 [bool]
      price: 99999999 // 產品價格 [number]
    },
    {
      title: "大俠愛吃漢堡堡",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "主打星", // 產品標籤 [string]
      newest: false, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    },
    {
      title: "大橋頭營運長孫總裁",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "最美峽谷", // 產品標籤 [string]
      newest: true, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    },
    {
      title: "天母分布部門地區裝總裁",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "花現青海", // 產品標籤 [string]
      newest: false, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    },
    {
      title: "士林李榮浩",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "現省2000", // 產品標籤 [string]
      newest: false, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    },
    {
      title: "天母分布部門地區裝總裁",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "絕讚光明頂", // 產品標籤 [string]
      newest: false, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    },
    {
      title: "天母分布部門地區裝總裁",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "睡臥雪山", // 產品標籤 [string]
      newest: false, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    },
    {
      title: "天母分布部門地區裝總裁",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "北疆特價", // 產品標籤 [string]
      newest: false, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    }
  ];

  return (
    <div styleName={classes}>
      <div className="hot_recommend">
        <div className="title">
          <div className="circle" />
          <h1>熱門推薦</h1>
        </div>
        <ul className="left-content">
          {data.map((tags, i) => {
            if (i <= 3) {
              return (
                <li>
                  <div className="inside-left">
                    <div className="btn-1">{tags.label}</div>
                    {tags.newest ? <div className="btn-2">NEW</div> : null}
                    <div className="text">{tags.title}</div>
                  </div>
                  <div className="inside-right">
                    <div className="price">{price(tags.price)}</div>
                    <span className="gray">起</span>
                  </div>
                </li>
              );
            }
          })}
        </ul>

        <ul className="right-content">
          {data.map((tags, i) => {
            if (i > 3) {
              return (
                <li>
                  <div className="inside-left">
                    <div className="btn-1">{tags.label}</div>
                    {tags.newest ? <div className="btn-2">NEW</div> : null}
                    <div className="text">{tags.title}</div>
                  </div>
                  <div className="inside-right">
                    <div className="price">{price(tags.price)}</div>
                    <span className="gray">起</span>
                  </div>
                </li>
              );
            }
          })}
        </ul>
        {/* react for end */}

        {/* <ul className="left-content">
          <li>
            <div className="inside-left">
              <div className="btn-1">夏季旅展</div>
              <div className="btn-2">NEW</div>
              <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">{price(12334)}</span>
              <span className="gray">起</span>
            </div>
          </li>
          <li>
            <div className="inside-left">
              <div className="btn-1">主打星</div>
              <div className="text red">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">$9,999,999</span>
              <span className="gray">起</span>
            </div>
          </li>
          <li>
            <div className="inside-left">
              <div className="btn-1">最美峽谷</div>
              <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">$9,999,999</span>
              <span className="gray">起</span>
            </div>
          </li>
          <li>
            <div className="inside-left">
              <div className="btn-1">花現青海</div>
              <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">$9,999,999</span>
              <span className="gray">起</span>
            </div>
          </li>
        </ul>
        <ul className="right-content">
          <li>
            <div className="inside-left">
              <div className="btn-1">夏季旅展</div>
              <div className="btn-2">NEW</div>
              <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">$9,999,999</span>
              <span className="gray">起</span>
            </div>
          </li>
          <li>
            <div className="inside-left">
              <div className="btn-1">主打星</div>
              <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">$9,999,999</span>
              <span className="gray">起</span>
            </div>
          </li>
          <li>
            <div className="inside-left">
              <div className="btn-1">最美峽谷</div>
              <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">$9,999,999</span>
              <span className="gray">起</span>
            </div>
          </li>
          <li>
            <div className="inside-left">
              <div className="btn-1">花現青海</div>
              <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">$9,999,999</span>
              <span className="gray">起</span>
            </div>
          </li>
        </ul> */}
      </div>{" "}
      {/* hot recommend end */}
      <div className="schedule_recommend">
        <div className="title">
          <div className="circle" />
          <h1>推薦行程</h1>
        </div>
        <ul className="left-content">
          <li>
            <div className="inside-left">
              <div className="flag" />
              {/* <div className="btn-1">夏季旅展</div> */}
              <div className="btn-2">NEW</div>
              <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">{price(12334)}</span>
              <span className="gray">起</span>
            </div>
          </li>
          <li>
            <div className="inside-left">
              <div className="flag" />
              {/* <div className="btn-1">主打星</div> */}
              <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">$9,999,999</span>
              <span className="gray">起</span>
            </div>
          </li>
          <li>
            <div className="inside-left">
              <div className="flag" />
              {/* <div className="btn-1">最美峽谷</div> */}
              <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">$9,999,999</span>
              <span className="gray">起</span>
            </div>
          </li>
          <li>
            <div className="inside-left">
              <div className="flag" />
              {/* <div className="btn-1">花現青海</div> */}
              <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">$9,999,999</span>
              <span className="gray">起</span>
            </div>
          </li>
        </ul>
        <ul className="right-content">
          <li>
            <div className="inside-left">
              <div className="flag" />
              {/* <div className="btn-1">夏季旅展</div> */}
              <div className="btn-2">NEW</div>
              <div className="text red">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">$9,999,999</span>
              <span className="gray">起</span>
            </div>
          </li>
          <li>
            <div className="inside-left">
              <div className="flag" />
              {/* <div className="btn-1">主打星</div> */}
              <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">$9,999,999</span>
              <span className="gray">起</span>
            </div>
          </li>
          <li>
            <div className="inside-left">
              <div className="flag" />
              {/* <div className="btn-1">最美峽谷</div> */}
              <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">$9,999,999</span>
              <span className="gray">起</span>
            </div>
          </li>
          <li>
            <div className="inside-left">
              <div className="flag" />
              {/* <div className="btn-1">花現青海</div> */}
              <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">$9,999,999</span>
              <span className="gray">起</span>
            </div>
          </li>
        </ul>
      </div>
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
