/* HTML 

<div class="calendar">
	// 剩下的請用js產出來
</div>

*/

// Plugin usage

$('.calendars').calendar({
	dataSource: [  // 資料來源的輸入接口 [ array | string ] 如果是 string的話，請輸入網址
		{
		    "guaranteed": true, // {boolean}
		    "date": "2016/12/15", // {string} YYYY/MM/DD
		    "price": "234567", // {string|number} XXXXXX | 近期上架
		    "availableVancancy": 0, // {number}
		    "totalVacnacy": 20, // {number}
		    "status": "報名" // {string} 報名(#24a07c) | 後補(#24a07c) | 預定(#24a07c) | 截止(#ff7800) | 額滿(#ff7800) | 關團(#ff7800)
		},
		// ...
	],
	// 輸入一開始要在哪一個月份 [string] YYYYMM，若輸入的年月沒有資料，
	// 就要找相近的年月，若前一個月後一個月都有資料，就顯示資料比數比較多的那一個月
	initYearMonth: '201705',
	// 設定各資料的key
	dataKeySetting: {
		// 保證出團
        'guaranteed': 'guaranteed',
        // 狀態
        'status': 'status',
        // 可賣團位
        'available': 'availableVancancy',
        // 團位
        'total': 'totalVacnacy',
        // 價格
        'price': 'price'
    },
    // 點上一個月時
    // @param $btn {$object} jquery 物件
    // @param $data {array} 上一個月的資料
    // @param module {object} 此模組實例物件
    onClickPrev: function( $btn, data, module ) {
    	console.log($btn, data, module);
    },
    // 點下一個月時
    onClickNext: function( $btn, data, module ) {
    	console.log($btn, data, module);
    },
    // 點日期時
    onClickDate: function( $date, data ){
        console.log($date, data);
    }
});
// 下一個有資料的月份
$('.calendars').calendar('nextMonth', function( data, module ) {
	console.log(data, module);
});
// 上一個有資料的月份
$('.calendars').calendar('prevMonth', function( data, module ) {
	console.log(data, module);
});
// 切換日曆或列表模式
$('.calendars').calendar('switch');
// 加資料時如果有相同日期的資料，以後輸入為主，輸入時如果輸入沒有的月份，模組會加上該月份
$('.calendars').calendar('inputData', [
	{
	    "guaranteed": true, // {boolean}
	    "date": "2016/12/15", // {string} YYYY/MM/DD
	    "price": "234567", // {string|number} XXXXXX | 近期上架
	    "availableVancancy": 0, // {number}
	    "totalVacnacy": 20, // {number}
	    "status": "報名" // {string} 報名 | 後補 | 預定 | 截止 | 額滿 | 關團
	},
	// ...
]);
// 重設資料時，月曆、tab重新產出
$('.calendars').calendar('resetData', [
	{
	    "guaranteed": true, // {boolean}
	    "date": "2016/12/15", // {string} YYYY/MM/DD
	    "price": "234567", // {string|number} XXXXXX | 近期上架
	    "availableVancancy": 0, // {number}
	    "totalVacnacy": 20, // {number}
	    "status": "報名" // {string} 報名 | 後補 | 預定 | 截止 | 額滿 | 關團
	},
	// ...
]);
// destroy calendar，destroy時連class new出來的實例物件也要刪除
$('.calendars').calendar('destroy');


// JSON template

[
	{
	    "guaranteed": true, // {boolean}
	    "date": "2016/12/15", // {string} YYYY/MM/DD
	    "price": "234567", // {string|number} XXXXXX | 近期上架
	    "availableVancancy": 0, // {number}
	    "totalVacnacy": 20, // {number}
	    "status": "報名" // {string} 報名 | 後補 | 預定 | 截止 | 額滿 | 關團
	},
	// ...
]

// Tips

/*
HTML
===========================================================
<div className="calendars"> // 可加上這兩個修飾符來切換日曆模式或列表模式 calendars_daymode,calendars_listmode
	<div class="calendars_tabWrap">
		<a href="#" class="prev on"></a>
		<ul class="ntb_tab">
           <li class="tab">
               <a href="#"><span>2017 7月</span></a>
           </li>            
           <li class="tab">
               <a href="#"><span>2017 8月</span></a>
           </li>
           <li class="tab">
               <a href="#"><span>2017 9月</span></a>
           </li>                                                
        </ul>
		<a href="#" class="next on"></a>
	</div>
	<div class="calendars_weeksWrap">
		<th>星期日</th>
		<th>星期一</th>
		<th>星期二</th>
		<th>星期三</th>
		<th>星期四</th>
		<th>星期五</th>
		<th>星期六</th>
	</div>
	<ul class="calendars_daysWrap">
		<li class="calendars_days disabled"></li>
		<li class="calendars_days hasData">
			<div class="date">
				<span class="num">1</span>
				<span class="weekday">星期四</span>
			</div>
			<span class="status">候補</span>
			<span class="sell">可賣：0</span>
			<span class="group">團位：0</span>
			<span class="tip"><i class="ic-ln productreferf"></i>保證出團</span>
			<span class="price">$4,999</span>
		</li>
		<li class="calendars_days hasData">
			<div class="date">
				<span class="num">1</span>
				<span class="weekday">星期五</span>
			</div>
			<span class="status">候補</span>
			<span class="sell">可賣：0</span>
			<span class="group">團位：0</span>
			<span class="tip"><i class="ic-ln productreferf"></i>保證出團</span>
			<span class="price">$4,999</span>
		</li>
	</ul>
</div>
JS
===========================================================
1. 日期的產出與查詢可使用 https://momentjs.com/ 這個外部套件
2. $.ajax({
	method: 'GET',
	url: './json/data1.json'
}).done(function( data ) {
	console.log(data);
});
 */

