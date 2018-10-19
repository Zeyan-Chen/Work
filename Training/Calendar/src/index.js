import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './css.css';
import Calendar from './components/Calendar';
import registerServiceWorker from './registerServiceWorker';

let data = {
    dataSource: require('./json/data1.json'),
    // 資料來源的輸入接口 [ array | string ] 如果是 string的話，請輸入網址
    //   {
    //     guaranteed: true, // {boolean}
    //     date: "2016/12/15", // {string} YYYY/MM/DD
    //     price: "234567", // {string|number} XXXXXX | 近期上架
    //     availableVancancy: 0, // {number}
    //     totalVacnacy: 20, // {number}
    //     status: "報名" // {string} 報名(#24a07c) | 後補(#24a07c) | 預定(#24a07c) | 截止(#ff7800) | 額滿(#ff7800) | 關團(#ff7800)
    //   }
    // ...

    // 輸入一開始要在哪一個月份 [string] YYYYMM，若輸入的年月沒有資料，
    // 就要找相近的年月，若前一個月後一個月都有資料，就顯示資料比數比較多的那一個月
    initYearMonth: '201801',
    // 設定各資料的key
    dataKeySetting: {
        // 保證出團
        guaranteed: 'guaranteed',
        // 狀態
        status: 'status',
        // 可賣團位
        available: 'availableVancancy',
        // 團位
        total: 'totalVacnacy',
        // 價格
        price: 'price'
    }
};

// fetch('./json/data1.json', {
//     method: 'GET'
// })
//     // https://training.pada-x.com/resources/javascript-es6-react/data.out
//     .then(response => {
//         console.log(response);
//         return response.json();
//     })
//     .then(jsonData => {
//         console.log(jsonData);
//         // console.log(data.dataSource);
//         // for (let i = 0; i < jsonData.length; i++) {
//         //     console.log(jsonData[i]);
//         //     data.dataSource.push(jsonData[i]);
//         // }
//     })
//     .catch(error => {
//         console.log('錯誤');
//     });

ReactDOM.render(<Calendar {...data} />, document.querySelector('.container'));
registerServiceWorker();
