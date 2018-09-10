import React from "react";
import ReactDOM from "react-dom";
import CmgColi from "./index.js";
import "../core/core.scss";

let props = {
  // [object]
  arrangement: 2, // 排列方式 [number] //設定如果上面寫幾欄就除以幾欄 1~3
  data: [
    {
      title: "絕美江南紹興古鎮日無購物無自費安安安安安", // 產品標題 [string]
      href: "https://www.youtube.com/", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "夏季旅展", // 產品標籤 [string]
      newest: true, // 最新 [bool]
      price: 9999999 // 產品價格 [number]
    },
    {
      title: "大俠愛吃漢堡堡",
      href: "https://www.google.com.tw/", // 產品連結 [string]
      targetBlank: false, // 連結另開 [bool]
      label: "", // 產品標籤 [string]
      newest: true, // 最新 [bool]
      price: 98973 // 產品價格 [number]
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
      title: "天母分布部門地區莊總裁",
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
    },
    {
      title: "周姊倫御用鋼琴手",
      href: "", // 產品連結 [string]
      targetBlank: true, // 連結另開 [bool]
      label: "", // 產品標籤 [string]
      newest: false, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    },
    {
      title: "69分布",
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
      label: "", // 產品標籤 [string]
      newest: true, // 最新 [bool]
      price: 3222 // 產品價格 [number]
    }
  ],
  more: {
    name: "", // 看更多-文字 [string]
    href: "" // 看更多-連結 [string]
  },
  anchorName: "" // 錨點名稱 [string]
};

ReactDOM.render(
  <CmgColi prop={props}>component content ishere</CmgColi>,
  document.getElementById("root")
);
