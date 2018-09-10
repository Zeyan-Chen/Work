import React from "react";
import ReactDOM from "react-dom";
import CmgColi from "./index.js";
import "../core/core.scss";

let props = {
  // [object]
  arrangement: 2, // 排列方式 [number] //設定如果上面寫幾欄就除以幾欄 1~3
  data: [
    // [array]
    {
      title: "", // 產品標題 [string]
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "", // 產品標籤 [string]
      newest: true, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    }
    // ...
  ],
  more: {
    name: "", // 看更多-文字 [string]
    href: "" // 看更多-連結 [string]
  },
  anchorName: "" // 錨點名稱 [string]
};

// data
let data = [
  {
    title: "1絕美江南紹興古鎮日無購物無自費安安安安安", // 產品標題 [string]
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
    title: "3大橋頭營運長孫總裁",
    href: "", // 產品連結 [string]
    targetBlank: true, // 連結另開 [bool]
    label: "最美峽谷", // 產品標籤 [string]
    newest: true, // 最新 [bool]
    price: 3222 // 產品價格 [number]
  },
  {
    title: "4天母分布部門地區莊總裁",
    href: "", // 產品連結 [string]
    targetBlank: true, // 連結另開 [bool]
    label: "花現青海", // 產品標籤 [string]
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
    newest: false, // 最新 [bool]
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
    newest: false, // 最新 [bool]
    price: 3222 // 產品價格 [number]
  }
];

ReactDOM.render(
  <CmgColi prop={props}>component content ishere</CmgColi>,
  document.getElementById("root")
);
