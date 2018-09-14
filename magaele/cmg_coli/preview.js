import React from 'react';
import CmgColi from './index.js';
import { storiesOf } from '@storybook/react';

let props = {
    // [object]
    arrangement: 2, // 排列方式 [number] //設定如果上面寫幾欄就除以幾欄 1~3
    data: [
        {
            title: '絕美江南紹興古鎮日無購物無自費安安安安安', // 產品標題 [string]
            href: 'https://www.youtube.com/', // 產品連結 [string]
            targetBlank: true, // 連結另開 [bool]
            label: '夏季旅展', // 產品標籤 [string]
            newest: true, // 最新 [bool]
            price: 9999999 // 產品價格 [number]
        },
        {
            title: '絕美江南紹興古鎮日無購物無自費安安安安安',
            href: 'https://www.google.com.tw/', // 產品連結 [string]
            targetBlank: false, // 連結另開 [bool]
            label: '', // 產品標籤 [string]
            newest: true, // 最新 [bool]
            price: 98973 // 產品價格 [number]
        },
        {
            title: '絕美江南紹興古鎮日無購物無自費安安安安安',
            href: '', // 產品連結 [string]
            targetBlank: true, // 連結另開 [bool]
            label: '最美峽谷', // 產品標籤 [string]
            newest: true, // 最新 [bool]
            price: 9999999 // 產品價格 [number]
        },
        {
            title: '絕美江南紹興古鎮日無購物無自費安安安安安',
            href: '', // 產品連結 [string]
            targetBlank: true, // 連結另開 [bool]
            label: '花現青海', // 產品標籤 [string]
            newest: false, // 最新 [bool]
            price: 3222 // 產品價格 [number]
        },
        {
            title: '絕美江南紹興古鎮日無購物無自費安安安安安',
            href: '', // 產品連結 [string]
            targetBlank: true, // 連結另開 [bool]
            label: '花現青海', // 產品標籤 [string]
            newest: false, // 最新 [bool]
            price: 3222 // 產品價格 [number]
        },
        {
            title: '絕美江南紹興古鎮日無購物無自費安安安安安',
            href: '', // 產品連結 [string]
            targetBlank: true, // 連結另開 [bool]
            label: '花現青海', // 產品標籤 [string]
            newest: false, // 最新 [bool]
            price: 3222 // 產品價格 [number]
        },
        {
            title: '絕美江南紹興古鎮日無購物無自費安安安安安',
            href: '', // 產品連結 [string]
            targetBlank: true, // 連結另開 [bool]
            label: '', // 產品標籤 [string]
            newest: false, // 最新 [bool]
            price: 3222 // 產品價格 [number]
        },
        {
            title: '絕美江南紹興古鎮日無購物無自費安安安安安',
            href: '', // 產品連結 [string]
            targetBlank: true, // 連結另開 [bool]
            label: '花現青海', // 產品標籤 [string]
            newest: false, // 最新 [bool]
            price: 3222 // 產品價格 [number]
        },
        {
            title: '絕美江南紹興古鎮日無購物無自費安安安安安',
            href: '', // 產品連結 [string]
            targetBlank: true, // 連結另開 [bool]
            label: '花現青海', // 產品標籤 [string]
            newest: false, // 最新 [bool]
            price: 3222 // 產品價格 [number]
        },
        {
            title: '我是第10筆',
            href: '', // 產品連結 [string]
            targetBlank: true, // 連結另開 [bool]
            label: '', // 產品標籤 [string]
            newest: true, // 最新 [bool]
            price: 3222 // 產品價格 [number]
        },
        {
            title: '我是第11筆',
            href: '', // 產品連結 [string]
            targetBlank: true, // 連結另開 [bool]
            label: '', // 產品標籤 [string]
            newest: true, // 最新 [bool]
            price: 3222 // 產品價格 [number]
        }
    ],
    more: {
        name: '更多熱門商品', // 看更多-文字 [string]
        href: 'https://www.youtube.com/' // 看更多-連結 [string]
    },
    anchorName: '' // 錨點名稱 [string]
};

/**
 * ## [Storybook Tutorial](https://www.learnstorybook.com/)
 */
storiesOf('組合模組（combine group）', module).add('cmg_coli', () => (
    <div className="container">
        <div>
            {/* <CmgColi prop={props} /> */}
            <CmgColi {...props} />
        </div>
    </div>
));
