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

  let state = {};

  // data push
  // let data = [];
  // let dataFormat = {
  //   title: "絕美江南紹興古鎮日無購物無自費自費自十八費自費大橋頭營運長", // 產品標題 [string]
  //   href: "", // 產品連結 [string]
  //   targetBlank: true, // 連結另開 [bool]
  //   label: "夏季旅展", // 產品標籤 [string]
  //   newest: false, // 最新 [bool]
  //   price: 99999999 // 產品價格 [number]
  // };

  // "有" new 標籤字數限定 18 "沒有"都 21
  // let limitLen = dataFormat.newest ? 18 : 21;
  // let orignalTitle;

  // if (dataFormat.title.length > limitLen) {
  //   orignalTitle = dataFormat.title.substring(0, limitLen) + "...";
  // }

  // console.log(limitLen);
  // console.log(orignalTitle);

  // // if(dataFormat.title)
  // data.push(dataFormat);

  // data
  let data = [
    {
      title:
        "1絕美江南紹興古鎮日無購物無自費安安安安安絕美江南紹興古鎮日無購物無自費安安安安安絕美江南紹興古鎮日無購物無自費安安安安安絕美江南紹興古鎮日無購物無自費安安安安安絕美江南紹興古鎮日無購物無自費安安安安安絕美江南紹興古鎮日無購物無自費安安安安安絕美江南紹興古鎮日無購物無自費安安安安安", // 產品標題 [string]
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "夏季旅展", // 產品標籤 [string]
      newest: true, // 最新 [bool]
      price: 9999999 // 產品價格 [number]
    },
    {
      title: "2大俠愛吃漢堡堡",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "", // 產品標籤 [string]
      newest: true, // 最新 [bool]
      price: 98973 // 產品價格 [number]
    },
    {
      title:
        "3大橋頭營運長孫總裁大橋頭營運長孫總裁大橋頭營運長孫總裁大橋頭營運長孫總裁大橋頭營運長孫總裁大橋頭營運長孫總裁",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "最美峽谷", // 產品標籤 [string]
      newest: false, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    },
    {
      title: "4天母分布部門地區莊總裁",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "現省2000", // 產品標籤 [string]
      newest: false, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    },
    {
      title: "5士林鵝鑾鼻分布陳總裁",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "花現青海", // 產品標籤 [string]
      newest: false, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    },
    {
      title: "6士林鵝鑾鼻分布陳總裁",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "花現青海", // 產品標籤 [string]
      newest: false, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    },
    {
      title: "7周姊倫御用鋼琴手",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "花現青海", // 產品標籤 [string]
      newest: false, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    },
    {
      title: "869分布",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "花現青海", // 產品標籤 [string]
      newest: true, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    },
    {
      title: "士林鵝鑾鼻分布陳總裁",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "花現青海", // 產品標籤 [string]
      newest: false, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    },
    {
      title: "士林鵝鑾鼻分布陳總裁",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "花現青海", // 產品標籤 [string]
      newest: true, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    }
  ];

  // 字上面 check 有無超過預設字數
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
        {data.map((tags, i) => {
          return (
            <li key={i} className={`col-${props.prop.arrangement}`}>
              <div className="inside-left">
                {/* <div className=""> */}
                {tags.label === "" ? (
                  <div className="flag" />
                ) : (
                  <div className="btn-1">{tags.label}</div>
                )}
                {tags.newest ? <div className="btn-2">NEW</div> : null}
                {/* {textLenCheck(tags.newest, tags.title)} */}
                {/* <p className="text">{tags.title}</p> */}
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

      {/* <ul className="right-content">
          {data.map((tags, i) => {
            if (i >= props.prop.arrangement - 1) {
              return (
                <li key={i}>
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
        </ul> */}
      {/* react for end */}

      {/* 測試用這個 */}
      {/* <ul>
        <li className="col-3">
          <div className="inside-left">
            <div className="btn-1">夏季旅展</div>
            <div className="btn-2">NEW</div>
            <div className="text">1</div>
          </div>
          <div className="inside-right">
            <span className="price">{price(12334)}</span>
            <span className="gray">起</span>
          </div>
        </li>
        <li className="col-3">
          <div className="inside-left">
            <div className="btn-1">主打星</div>
            <div className="text red">2</div>
          </div>
          <div className="inside-right">
            <span className="price">$9,999,999</span>
            <span className="gray">起</span>
          </div>
        </li>
        <li className="col-3">
          <div className="inside-left">
            <div className="btn-1">最美峽谷</div>
            <div className="text">3</div>
          </div>
          <div className="inside-right">
            <span className="price">$9,999,999</span>
            <span className="gray">起</span>
          </div>
        </li>
        <li className="col-3">
          <div className="inside-left">
            <div className="btn-1">花現青海</div>
            <div className="text">4</div>
          </div>
          <div className="inside-right">
            <span className="price">$9,999,999</span>
            <span className="gray">起</span>
          </div>
        </li>
      </ul> */}
      {/* <ul className="right-content">
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
      {/* hot recommend end */}
      {/* <div className="schedule_recommend">
        <div className="title">
          <div className="circle" />
          <h1>推薦行程</h1>
        </div>
        <ul className="left-content">
          <li>
            <div className="inside-left">
              <div className="flag" />
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
              <div className="text">絕美江南紹興古鎮日無購物無自費自</div>
            </div>
            <div className="inside-right">
              <span className="price">$9,999,999</span>
              <span className="gray">起</span>
            </div>
          </li>
        </ul>
      </div> */}
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
