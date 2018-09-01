<div class="banner">
	<a class="wrap" href="#">
		<img class="img" src="./imgs/1200x380.png" title="輸入廣告促銷說明文字" alt="輸入廣告促銷說明文字">
	</a>
</div>

$('.banner').banner({
	// 設定一開始是否為開或合
	openAtStart: true, // [boolean] true | false
	// 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
	autoToggle: true, // [boolean|number] true | false | 3000
	// 設定收合展開按鈕
	button: {
		closeText: '收合', // [string]
		openText: '展開', // [string]
		class: 'btn' // [string]
	},
	// 設定模組在各狀態時的class
	class: {
		closed: 'closed', // [string]
		closing: 'closing', // [string]
		opened: 'opened', // [string]
		opening: 'opening' // [string]
	},
	// 是否要有transition效果
	transition: true,
	// 當有transition時，要執行的callback function
	whenTransition: function() {
		console.log('whenTransition');
	}
});

$('.banner').banner('toggle');

$('.banner').banner('open');

$('.banner').banner('close');