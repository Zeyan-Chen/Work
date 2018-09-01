# 雄旅網機票3合1前端說明文件

## 使用的外部 js 庫
* jquery v1.12.0
* moment.js v2.13.0

## 測試環境
* Chrome
* Firefox
* IE10 up
* Andriod
* IOS Safari

## 根資料夾說明

| 名稱         | 類型 | 描述                                                |
|--------------|:----:|-----------------------------------------------------|
| docs         |  dir | 前端文件資料夾，請打開index.html                    |
| release      |  dir | 打包後的資料夾，包括所有相關資源與html檔            |
| server.js    |  js  | 此資料夾的臨時測試用的web server，詳情請看Run Start |
| package.json | json | npm package.json檔記錄相關相依套件                  |

## release資料夾說明

| 名稱                           | 類型 | 描述                              |
|--------------------------------|:----:|-----------------------------------|
| _shared                        |  dir | 所有的相關資源都放在這            |
| lightbox                       |  dir | lightbox範例內容html都放在這，上線後不需要此資料夾|
| compare.html                   | html | 產品比較 / 收藏                   |
| completed.html                 | html | (一般機票)完成頁                  |
| completed_BFM.html             | html | (BFM)完成頁                       |
| completed_cn.html              | html | (大陸國內機票)完成頁              |
| completed_LCC.html             | html | (TF)完成頁                        |
| completed_req.html             | html | (一般機票)完成頁(需求單)          |
| completed_twks.html            | html | (金廈小三通)完成頁                |
| confirmation_baby.html         | html | (一般機票)確認明細_含嬰兒         |
| confirmation_BFM_mutidest.html | html | (BFM)確認明細_多個目的地          |
| confirmation_BFM_oneway.html   | html | (BFM)確認明細_單程                |
| confirmation_BFM_round.html    | html | (BFM)確認明細_來回                |
| confirmation_cn.html           | html | (大陸國內機票)確認明細            |
| confirmation_LCC_oneway.html   | html | (TF)確認明細_單程                 |
| confirmation_LCC_round.html    | html | (TF)確認明細_來回                 |
| confirmation_oneway.html       | html | (一般機票)確認明細_單程           |
| confirmation_req.html          | html | (一般機票)確認明細_需求單         |
| confirmation_round.html        | html | (一般機票)確認明細_來回不同點進出 |
| confirmation_twks.html         | html | (金廈小三通)確認票價與旅客人數    |
| giftinfo.html                  | html | 搜尋結果光箱-禮品明細(L)          |
| passenger.html                 | html | (一般機票)填寫旅客資料            |
| passenger_BFM.html             | html | (BFM)填寫旅客資料                 |
| passenger_cn.html              | html | (大陸國內機票)旅客資料頁          |
| passenger_LCC.html             | html | (TF)填寫旅客資料                  |
| passenger_req.html             | html | (一般機票)填寫旅客資料_需求單     |
| passenger_twks.html            | html | (金廈小三通)填寫旅客資料          |
| rule.html                      | html | 搜尋結果光箱(一般機票)票規        |
| rule_BFM.html                  | html | 搜尋結果光箱(BFM)票規(L)          |
| rule_LCC.html                  | html | 搜尋結果光箱(TF)票規              |
| search_cn.html                 | html | 大陸國內機票_搜尋結果             |
| search_cn_na.html              | html | 大陸國內機票_搜尋結果_找不到結果  |
| search_mutidest.html           | html | 搜尋結果_多個目的地               |
| search_na.html                 | html | 搜尋結果_找不到結果               |
| search_na_oneway.html          | html | 搜尋結果_單程_找不到結果          |
| search_na_round.html           | html | 搜尋結果_來回_找不到結果          |
| search_oneway.html             | html | 尋結果_單程                       |
| search_round.html              | html | 搜尋結果_來回                     |

## release/_shared 資料夾說明

跟前端有關的資源，都會放在`_shared`，上線時也是如此，記得將`_shared`改為大寫`_Shared`，並放在主機的`root`目錄下

| 名稱 | 類型 | 描述 |
|----- |:----:|------|
|json|dir|目的地選單/補字的資料格式範例(假資料)，上線時，這個資料夾將不會需要，因為會介接正式資料來源，請後端再提供資料來源url|
|LightSpeed|dir|此為光速版所有資前端資源放置的資料夾|

## release/_shared/json 資料夾說明

本資料夾在上測試機或正式機時不需要存在，以下三個檔案會改為其他的路徑，此部分會由雄資F2E組執行

| 名稱 | 類型 | 描述 |
|----- |:----:|------|
|filterTransfer.js|js|排除轉機城國家範例資料|
|flightsInternationalDestinationCsutomMenu.js|js|目的地選單範例資料|
|GetArrayTkt6.js|js|目的地補字範例資料|

## release/_shared/LightSpeed 資料夾說明

| 名稱 | 類型 | 描述 |
|----- |:----:|------|
|files|dir|相關圖片、字型資源檔 |
|lib|dir|相依的外部套件資源檔|
|SubSiteBundles|dir|各子網域的css、js資源檔|

## release/_shared/LightSpeed/SubSiteBundles/Flights 資料夾說明

| 名稱 | 類型 | 描述 |
|----- |:----:|------|
|Backend|dir|提供給後續接手人員的js檔存放地|
|lib|dir|相依的外部套件資源檔|
|compare.bundle.js|js|產品比較頁js|
|compare.css|css|產品比較頁css|
|completed.bundle.js|js|訂購完成頁js|
|completed.css|css|訂購完成頁css|
|confirmation.bundle.js|js|訂購確認頁js|
|confirmation.css|css|訂購確認頁css|
|lightbox.bundle.js|js|lightbox展示頁js|
|lightbox.css|css|lightbox展示頁css|
|passenger.bundle.js|js|填寫旅客資料頁js|
|passenger.css|css|填寫旅客資料頁css|
|search.bundle.js|js|搜尋結果頁js|
|search.css|css|搜尋結果頁css|

## release/_shared/LightSpeed/SubSiteBundles/Flights/Backend 資料夾說明

請後續接手的人員，將您的js腳本寫在本資料夾中找尋你要編寫頁面對應到的js檔，並參考該檔的相關說明，將你的js寫在適合的執行流程上

| 名稱 | 類型 | 描述 |
|----- |:----:|------|
|completepage.js|js|訂購完成頁後續js編寫檔，詳見[CompletePage](./CompletePage.html)|
|confirmationpage.js|js|訂購確認頁js編寫檔，詳見[ConfirmationPage](./ConfirmationPage.html)|
|passengerpage.js|js|填寫旅客資料頁後續js編寫檔，詳見[PassengerPage](./PassengerPage.html)|
|searchpage.js|js|產品比較頁後續js編寫檔，詳見[SearchPage](./SearchPage.html)|

## Run Start
執行以下命令安裝相關套件
```
npm i
```

開啟專案自帶`web server`，並使用`browser`開啟`localhost:2291`
```
npm run start
```