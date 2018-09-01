$(function(){
    const $ps_flpk = $('.ps_flpk'); //進度條模組
    /* @if ENVIRONMENT='develop' */
    const fakeLoad = setInterval(fakeloading, 500);
    /* @endif */

    let settingStringify = ( obj ) => {
        return JSON.stringify(obj).replace(/\"/g, '\'');
    };

    //出發,目的地換值
    function changeValue(dept, dest, btn, isMobile){

        const deptInt = dept.find('input');
        const destInt = dest.find('input');
        const deptVal = deptInt.val();
        const destVal = destInt.val();
        const Parent = dept.parent(); 

        //return if both input's value undefined
        if(deptVal === '' && destVal === '') return;

        dept.detach().appendTo(Parent);
        dest.detach().prependTo(Parent);

        const $firstDIV = Parent.children(':first-child');
        const $lastDIV = Parent.children(':last-child');
        $firstDIV.find('.label').text('出發地');
        $lastDIV.find('.label').text('目的地');

        //手機額外處理分頁的input
        if(isMobile){
            const $dept_nvb = $(`[data-id="${$firstDIV.data('nvb_gplt')}"`);
            const $dest_nvb = $(`[data-id="${$lastDIV.data('nvb_gplt')}"`);
            $dept_nvb.children('.nvb_gplt_header').find('h3').text('出發地');
            $dept_nvb.find('[data-place="Location"]').find('.label').text('出發地');
            $dest_nvb.children('.nvb_gplt_header').find('h3').text('目的地');
            $dest_nvb.find('[data-place="Location"]').find('.label').text('目的地');
        }
    }
    /* @if ENVIRONMENT='develop' */
    //模擬進度條loading
    function fakeloading(){
        if(($ps_flpk.children('.result').width() / $ps_flpk.width() *100) > 99){
            $ps_flpk.ps_flpk('doneProgress', function(){
                console.log('Loading Done');
                $ps_flpk.ps_flpk('toggleProgressBar', false);
            });
            clearInterval(fakeLoad);
        } else {
            $ps_flpk.ps_flpk('nextProgress');  
        }
    }
    /* @endif */
    //多目的地日期input的啟動參數
	const cylnObj = {
        monthCount: 2,
        btnDisabled:true,
        minDate: moment().subtract(1, 'days'),
        weekdayName: ['日','一','二','三','四','五','六'],
        cssClass:{
            left:-45
        }
    };

    //pc-dtm_lnls參數
    //出發地
    const dtmObj = {
        'source':'./_shared/json/GetArrayTkt6.js',
        'bfmQuery':true,
        'autoCategory':true,
        'dataTemplate':'flightsInternational',
        'more':true,
        'removeNotWordStringWhenSearch':false,
        'toggleCustomMenu':true,
        'menuSource':'./_shared/json/flightsInternationalDestinationCsutomMenu.js',
        'runCustomMenuRenderer':true,
        'customMenuLineOrder':['_9', '_5','_6','_7','_3','_1','_2'],
        'appendTargetPosition':'body',
        'moreString': '更多出發地,請輸入關鍵字'
    };
    //目的地
    const dtmObj_dest = {
        'source':'./_shared/json/GetArrayTkt6.js',
        'bfmQuery':true,
        'autoCategory':true,
        'dataTemplate':'flightsInternational',
        'more':true,
        'removeNotWordStringWhenSearch':false,
        'toggleCustomMenu':true,
        'menuSource':'./_shared/json/flightsInternationalDestinationCsutomMenu.js',
        'runCustomMenuRenderer':true,
        'customMenuLineOrder':['_5', '_6', '_7', '_3', '_1', '_2', '_4'],
        'appendTargetPosition':'body',
        'moreString': '更多目的地,請輸入關鍵字'
    };


    $('.cy').cy_ln(cylnObj);
    $('#o-date').cy_ln({
        monthCount: 2,
        btnDisabled:true,
        minDate: moment().subtract(1, 'days'),
        range:[$('#i-date')[0]],
        weekdayName: ['日','一','二','三','四','五','六'],
        cssClass:{
            left:-45
        },
        afterClickDate: function(self, $this, $input, dataRange) {
            if(!$('#i-date').is(':visible')){
                $('#i-date').val('');
                $('.cy-ln').hide();
            }
        }
    });
    $('.clp_stbm:not(.clp_stbm-m,.clp_stbm_ch)').clp_stbm({
        width:250,
        hiddenChange:function(showBlock, hiddenBlock){
            //人數,艙等
            const l = $('#level option:selected').text();
            const a = +$('#adult').val();
            const c = +$('#child').val();
            const b = +$('#baby').val();
            const showText = showBlock.find('input');
            showText.val(`共${a+b+c}人，${l}`);
        }
    });
    //=================================
    $('[data-toggle^="dtm-lnls"], #filterTransfer').dtm_lnls({
        isRunning: true,
        // 設定階層keyName
        dataTemplate: {
            "flightsInternational": [],
            "flightsInternationalMobile": [],
            "filterTransfer": ['vLine','vCountry'],
            "filterTransferMobile": ['vLine','vCountry']
        },
        levelName: {
            "flightsInternational": ["國家", "城市", "機場"],
            "flightsInternationalMobile": ["國家", "城市", "機場"],
            "filterTransfer": ["國家"],
            "filterTransferMobile": ["國家"]
        },
        whenItemClicked: function($menu, $item, $input) {
            //console.log('whenItemClicked', $menu, $item, $input);
            switch ( $input.attr('id') ) {
                default:
                    var itemData = $item.data();
                    for (var key in itemData) {
                        $input.attr('data-'+key, itemData[key]);
                    }
                    break;
            };
        },
        whenDestinationShow: function($menu, $input) {
            //console.log('whenDestinationShow', $menu, $input);
        },
        customMenuRenderHTML: function(Module, dataTemplateName, sourceData, hierarchyArray, firstLevelOrder, itemDataKeys) {
            var METHODS = {
                "flightsInternational": function(Module, sourceData, hierarchyArray, firstLevelOrder, itemDataKeys) {
                    var self = Module;
                    var templateHTML = '';
                    var hierarchyArray = function(ha, sdata) {
                        var data;
                        if ( !!ha ) {
                            data = ha;
                        } else {
                            data = Object.keys(sdata);
                        }
                        return data;
                    }(hierarchyArray, sourceData);
                    templateHTML += '<div class="dtm-lnls"><button class="close">×</button>';
                    templateHTML += '<div class="m-place c-fastmenu">' + Module.opts.moreString + '</div>';
                    templateHTML += '<ul class="tabs">';
                    templateHTML += function( orderArr, level1Data ) {
                        var string = '';

                        var tabLabel;
                        for (var i = 0; i < orderArr.length; i++) {
                            tabLabel = level1Data[orderArr[i]] || false;
                            if ( !tabLabel ) {
                                continue;
                            }
                            string += '<li><span>' + function(labelString) {
                                if ( !!labelString ) {
                                    return labelString.replace(new RegExp(self.opts.removeStringOnMenu,'g'), '');
                                } else {
                                    return ''
                                }
                            }( tabLabel ) + '</span></li>';
                        }
                        return string;
                    }(firstLevelOrder, sourceData[hierarchyArray[0]]);
                    templateHTML += '</ul>';
                    templateHTML += '<div class="ctns">';
                    templateHTML += function(lineOrder, itemData) {
                        var i;
                        var templateHTML = '';
                        var nKey;
                        var thisItemData = null;
                        var thisItemAttrs = null;
                        var key;
                        var codeRegex = /(?=\()*\w+(?=\)$)/g;
                        var nameRegex = /[A-Z|\W|\w]+(?=\(.+\))/g;
                        for ( i = 0; i < lineOrder.length; i++ ) {
                            thisItemData = null;
                            thisItemData = itemData[lineOrder[i]];
                            templateHTML += '<div class="panl">';
                            for ( key in thisItemData) {
                                thisItemAttrs = null;
                                thisItemAttrs = function(dataParts){
                                    var loc = {
                                        countryCode: !!dataParts[0] ? dataParts[0].match(codeRegex) : null,
                                        countryName: !!dataParts[0] ? dataParts[0].match(nameRegex) : null,
                                        cityCode: !!dataParts[1] ? dataParts[1].match(codeRegex) : null,
                                        cityName: !!dataParts[1] ? dataParts[1].match(nameRegex) : null,
                                        airportCode: !!dataParts[2] ? dataParts[2].match(codeRegex) : null,
                                        airportName: !!dataParts[2] ? dataParts[2].match(nameRegex) : null,
                                        isCity: dataParts.length <= 2 ? true : false,
                                        label: null,
                                        intValue: dataParts.length <= 2 ? dataParts[1] : dataParts[2]
                                    }
                                    loc.label = loc.countryName + '(' + loc.countryCode + ')' + '-' + loc.cityName + '(' + loc.cityCode + ')' + (!!loc.airportName ? '-' + loc.airportName + '(' + loc.airportCode + ')' : '');
                                    loc.countryCode = loc.countryCode.toString();
                                    loc.countryName = loc.countryName.toString();
                                    loc.cityCode = !!loc.cityCode ? loc.cityCode.toString() : null;
                                    loc.cityName = !!loc.cityName ? loc.cityName.toString() : null;
                                    loc.airportCode = !!loc.airportCode ? loc.airportCode.toString() : null;
                                    loc.airportName = !!loc.airportName ? loc.airportName.toString() : null;
                                    return loc;
                                }( thisItemData[key].split("__") );
                                templateHTML += '<span class="sec-wrap in-block">';
                                templateHTML += '<a ' + function(attrs) {
                                    var string = '';
                                    for ( var key in attrs ) {
                                        string += ' data-' + key + '="' + ( !!attrs[key] ? attrs[key] : '_' ) + '"';
                                    }
                                    return string;
                                }(thisItemAttrs) + '>' + thisItemData[key].replace(/.+__|-\w.+\(.+\)|-\(.+\)/g, '') + '</a>';
                                templateHTML += '</span>';
                            }
                            templateHTML += '</div>';
                        }
                        return templateHTML;
                    }(firstLevelOrder, sourceData[hierarchyArray[1]]);
                    templateHTML += '</div>';
                    return templateHTML;
                },
                "flightsInternationalMobile": function(Module, sourceData, hierarchyArray, firstLevelOrder, itemDataKeys) {
                    var self = Module;
                    var templateHTML = '';
                    var hierarchyArray = function(ha, sdata) {
                        var data;
                        if ( !!ha ) {
                            data = ha;
                        } else {
                            data = Object.keys(sdata);
                        }
                        return data;
                    }(hierarchyArray, sourceData);
                    templateHTML += '<div class="dtm-lnls mobile"><button class="close">×</button>';
                    templateHTML += '<ul class="tabs">';
                    templateHTML += function( orderArr, level1Data ) {
                        var string = '';

                        var tabLabel;
                        for (var i = 0; i < orderArr.length; i++) {
                            tabLabel = level1Data[orderArr[i]] || false;
                            if ( !tabLabel ) {
                                continue;
                            }
                            string += '<li><span>' + function(labelString) {
                                if ( !!labelString ) {
                                    return labelString.replace(new RegExp(self.opts.removeStringOnMenu,'g'), '');
                                } else {
                                    return ''
                                }
                            }( tabLabel ) + '</span></li>';
                        }
                        return string;
                    }(firstLevelOrder, sourceData[hierarchyArray[0]]);
                    templateHTML += '</ul>';
                    templateHTML += '<div class="ctns">';
                    templateHTML += function(lineOrder, itemData) {
                        var i;
                        var templateHTML = '';
                        var nKey;
                        var thisItemData = null;
                        var thisItemAttrs = null;
                        var key;
                        var codeRegex = /(?=\()*\w+(?=\)$)/g;
                        var nameRegex = /[A-Z|\W|\w]+(?=\(.+\))/g;
                        for ( i = 0; i < lineOrder.length; i++ ) {
                            thisItemData = null;
                            thisItemData = itemData[lineOrder[i]];
                            templateHTML += '<div class="panl">';
                            for ( key in thisItemData) {
                                thisItemAttrs = null;
                                thisItemAttrs = function(dataParts){
                                    var loc = {
                                        countryCode: !!dataParts[0] ? dataParts[0].match(codeRegex) : null,
                                        countryName: !!dataParts[0] ? dataParts[0].match(nameRegex) : null,
                                        cityCode: !!dataParts[1] ? dataParts[1].match(codeRegex) : null,
                                        cityName: !!dataParts[1] ? dataParts[1].match(nameRegex) : null,
                                        airportCode: !!dataParts[2] ? dataParts[2].match(codeRegex) : null,
                                        airportName: !!dataParts[2] ? dataParts[2].match(nameRegex) : null,
                                        isCity: dataParts.length <= 2 ? true : false,
                                        label: null,
                                        intValue: dataParts.length <= 2 ? dataParts[1] : dataParts[2]
                                    }
                                    loc.label = loc.countryName + '(' + loc.countryCode + ')' + '-' + loc.cityName + '(' + loc.cityCode + ')' + (!!loc.airportName ? '-' + loc.airportName + '(' + loc.airportCode + ')' : '');
                                    loc.countryCode = loc.countryCode.toString();
                                    loc.countryName = loc.countryName.toString();
                                    loc.cityCode = !!loc.cityCode ? loc.cityCode.toString() : null;
                                    loc.cityName = !!loc.cityName ? loc.cityName.toString() : null;
                                    loc.airportCode = !!loc.airportCode ? loc.airportCode.toString() : null;
                                    loc.airportName = !!loc.airportName ? loc.airportName.toString() : null;
                                    return loc;
                                }( thisItemData[key].split("__") );
                                templateHTML += '<span class="sec-wrap in-block">';
                                templateHTML += '<a ' + function(attrs) {
                                    var string = '';
                                    for ( var key in attrs ) {
                                        string += ' data-' + key + '="' + ( !!attrs[key] ? attrs[key] : '_' ) + '"';
                                    }
                                    return string;
                                }(thisItemAttrs) + '>' + thisItemData[key].replace(/.+__|-\w.+\(.+\)|-\(.+\)/g, '') + '</a>';
                                templateHTML += '</span>';
                            }
                            templateHTML += '</div>';
                        }
                        return templateHTML;
                    }(firstLevelOrder, sourceData[hierarchyArray[1]]);
                    templateHTML += '</div>';
                    return templateHTML;
                },
                "filterTransferMobile": function(Module, sourceData, hierarchyArray, firstLevelOrder, itemDataKeys) {
                    var self = Module;
                    var templateHTML = '';
                    var hierarchyArray = function(ha, sdata) {
                        var data;
                        if ( !!ha ) {
                            data = ha;
                        } else {
                            data = Object.keys(sdata);
                        }
                        return data;
                    }(hierarchyArray, sourceData);
                    templateHTML += '<div class="dtm-lnls mobile"><button class="close">×</button>';
                    templateHTML += '<ul class="tabs">';
                    templateHTML += function( orderArr, level1Data ) {
                        var string = '';

                        var tabLabel;
                        for (var i = 0; i < orderArr.length; i++) {
                            tabLabel = level1Data[orderArr[i]] || false;
                            if ( !tabLabel ) {
                                continue;
                            }
                            string += '<li><span>' + function(labelString) {
                                if ( !!labelString ) {
                                    return labelString.replace(new RegExp(self.opts.removeStringOnMenu,'g'), '');
                                } else {
                                    return ''
                                }
                            }( tabLabel ) + '</span></li>';
                        }
                        return string;
                    }(firstLevelOrder, sourceData[hierarchyArray[0]]);
                    templateHTML += '</ul>';
                    templateHTML += '<div class="ctns">';
                    templateHTML += function(lineOrder, itemData) {
                        var i;
                        var templateHTML = '';
                        var nKey;
                        var thisItemData = null;
                        var thisItemAttrs = null;
                        var key;
                        var codeRegex = /(?=\()*\w+(?=\)$)/g;
                        var nameRegex = /[A-Z|\W|\w]+(?=\(.+\))/g;
                        for ( i = 0; i < lineOrder.length; i++ ) {
                            thisItemData = null;
                            thisItemData = itemData[lineOrder[i]];
                            templateHTML += '<div class="panl">';
                            for ( key in thisItemData) {
                                thisItemAttrs = null;
                                thisItemAttrs = function(dataParts){
                                    var loc = {
                                        countryCode: !!dataParts[0] ? dataParts[0].match(codeRegex) : null,
                                        countryName: !!dataParts[0] ? dataParts[0].match(nameRegex) : null,
                                        cityCode: !!dataParts[1] ? dataParts[1].match(codeRegex) : null,
                                        cityName: !!dataParts[1] ? dataParts[1].match(nameRegex) : null,
                                        airportCode: !!dataParts[2] ? dataParts[2].match(codeRegex) : null,
                                        airportName: !!dataParts[2] ? dataParts[2].match(nameRegex) : null,
                                        isCity: dataParts.length <= 2 ? true : false,
                                        label: null,
                                        intValue: dataParts.length <= 2 ? dataParts[1] : dataParts[2]
                                    }
                                    loc.label = loc.countryName + '(' + loc.countryCode + ')' + '-' + loc.cityName + '(' + loc.cityCode + ')' + (!!loc.airportName ? '-' + loc.airportName + '(' + loc.airportCode + ')' : '');
                                    loc.countryCode = loc.countryCode.toString();
                                    loc.countryName = loc.countryName.toString();
                                    loc.cityCode = !!loc.cityCode ? loc.cityCode.toString() : null;
                                    loc.cityName = !!loc.cityName ? loc.cityName.toString() : null;
                                    loc.airportCode = !!loc.airportCode ? loc.airportCode.toString() : null;
                                    loc.airportName = !!loc.airportName ? loc.airportName.toString() : null;
                                    return loc;
                                }( thisItemData[key].split("__") );
                                templateHTML += '<span class="sec-wrap in-block">';
                                templateHTML += '<a ' + function(attrs) {
                                    var string = '';
                                    for ( var key in attrs ) {
                                        string += ' data-' + key + '="' + ( !!attrs[key] ? attrs[key] : '_' ) + '"';
                                    }
                                    return string;
                                }(thisItemAttrs) + '>' + thisItemData[key].replace(/.+__|-\w.+\(.+\)|-\(.+\)/g, '') + '</a>';
                                templateHTML += '</span>';
                            }
                            templateHTML += '</div>';
                        }
                        return templateHTML;
                    }(firstLevelOrder, sourceData[hierarchyArray[1]]);
                    templateHTML += '</div>';
                    return templateHTML;
                }
            };
            return METHODS[dataTemplateName](Module, sourceData, hierarchyArray, firstLevelOrder, itemDataKeys);
        }
    });
    //出發地input 更新快速選單參數
    $('[data-toggle="dtm-lnls"]').attr('data-dtm-lnsl', settingStringify(dtmObj)).dtm_lnls('updateOptions', settingStringify(dtmObj));
    //目的地input 更新快速選單參數
    $('[data-toggle="dtm-lnls-dest"]').attr('data-dtm-lnsl', settingStringify(dtmObj_dest)).dtm_lnls('updateOptions', settingStringify(dtmObj_dest));
    //================================
    $('#flights3in1').sf_lnse({
        whenInit:function($module){
            const panl = $module.find('.panl');
            const tabs = $module.children('.tabs');
            const left = $module.find('.left');
            const location_date = left.children('.location_date');
            const date = location_date.children('.date');
            const add_items = $module.find('.add-items');
            const edit_items = add_items.siblings('.edit-items');
            const section_block = panl.children('.clearfix').children('.section_block');
            const remove_items = section_block.find('.remove-item');
            const more_btn = $module.find('.more_btn');

            //切換單程,來回...etc
            function _render(index){

                switch (index){
                    case 0:
                        panl.removeClass('mutiple theme');
                        date.addClass('one');
                        panl.siblings('.more-select').children('main').children('.st_lnls').show();
                        break;
                    case 1:
                        panl.removeClass('mutiple theme');
                        date.removeClass('one');
                        panl.siblings('.more-select').children('main').children('.st_lnls').show();
                        break;
                    case 2:
                        panl.addClass('mutiple');
                        panl.removeClass('theme');
                        date.addClass('one');
                        //多目的地沒有廉價航空
                        panl.siblings('.more-select').children('main').children('.st_lnls').hide();
                        break;
                    case 3:
                        panl.addClass('theme');
                        panl.removeClass('mutiple');
                        date.removeClass('one');
                        panl.siblings('.more-select').children('main').children('.st_lnls').show();
                        break;
                }
            }

            function _switch(length){
                if (length > 1){
                    add_items.hide();
                    edit_items.show();
                    edit_items.find('.already_choice > span').text(length+1);
                } else {
                    add_items.show();
                    edit_items.hide();
                    edit_items.closest('.pos').removeClass('edit-mode');
                }
            }

            function cleanData(section){
                section.find('.cy').val('');
                section.find('[data-toggle="dtm-lnls"]').val('').trigger('input');
                $('.dtm-lnls').removeClass('show');
            }
            //移除航段
            function _remove(){
                edit_items.closest('.pos').removeClass('max-items');
                $(this).closest('.section').addClass('d-no');
                _switch(section_block.children('.section:visible').length);
                cleanData($(this).closest('.section'));
            }

            //增加航段
            function _add(){
                section_block.children('.d-no').eq(0).removeClass('d-no');
                if( section_block.children('.section:visible').length === 5) {
                    edit_items.closest('.pos').addClass('max-items');
                }
                // section_block.append(html);
                // section_block.children(':last-child').find('.remove-item').on('click','button', _remove);
                // section_block.children(':last-child').find('.cy').cy_ln(cylnObj);
            }

            //初始化
            _render(0);

            //切換tabs
            tabs.on('click', 'li', function(){
                $(this).siblings('li').removeClass('active');
                $(this).addClass('active');
                _render($(this).index());
            });

            //增加航段
            add_items.on('click', 'button', function(e){
                _add();
                _switch(section_block.children('.section:visible').length);

                edit_items.closest('.pos').addClass('edit-mode');
                section_block.addClass('edit-mode');
            });
            //編輯航段
            edit_items.on('click', 'button:first', function(){
                edit_items.closest('.pos').addClass('edit-mode');
                section_block.addClass('edit-mode');
            });
            edit_items.on('click', '.add', function(){
                _add();
                _switch(section_block.children('.section:visible').length);
            });
            //移除航段
            remove_items.on('click', 'button', _remove);

            $(window).on('scroll', function(){
                edit_items.closest('.pos').removeClass('edit-mode');
                section_block.removeClass('edit-mode');
            });
            //更多選項
            more_btn.on('click',function(e){
                e.preventDefault();
                $(this).toggleClass('open');
                $(this).parent().siblings('main').slideToggle();
            });
            SearchPage.PanelDesktop.WhenInit();
        },
        whenRecodeWrited: function($visiablePanlWrap, $input, $inputHidden) {
            console.log('whenRecodeWrited Callback', $input, $inputHidden);
            SearchPage.PanelDesktop.WhenRecodeWrited($visiablePanlWrap, $input, $inputHidden);
        },
        whenFormChanged: function($visiablePanlWrap, $input, $inputHidden) {
            console.log('whenFormChanged Callback', $input, $inputHidden);
            SearchPage.PanelDesktop.WhenFormChanged($visiablePanlWrap, $input, $inputHidden);
        },
        whenBeforeSubmit: function($visiablePanlWrap, $submit) {
            console.log('whenBeforeSubmit Callback', $visiablePanlWrap, $submit);
            SearchPage.PanelDesktop.WhenBeforeSubmit($visiablePanlWrap, $submit);
        },
        whenSubmit: function($visiablePanlWrap, $submit) {

            //submit前驗證
            var isVerfiy = (function(pn) {
                
                //判斷單程or來回or多目的地
                var Rtow = function(){

                    const type = $(pn).closest('.sf-lnse').children('.tabs').children('.active').text();
            
                    switch(type){
                        case '單程':
                            return 0;
                            break;
                        case '來回':
                            return 1;
                            break;
                        case '多個目的地':
                            return 3;
                            break;
                    }

                }();

                var switchHandler = {
                    "3": function() {
                        return true;
                    },
                    default: function() {
                        var $adult = $('#adult');
                        var $child = $('#child');
                        var $baby = $('#baby');
                        var adultNum = parseInt( $adult.val() );
                        var childNum = parseInt( $child.val() );
                        var babyNum = parseInt( !!$baby.attr('disabled') ? 0 : $baby.val() );
                        var childrenNum = childNum + babyNum;
                        var totalNum = adultNum + childNum + babyNum;
                        if ( totalNum > 8 ) {
                            alert('總人數不得超過8位');
                            return false;
                        } else if ( adultNum < babyNum || adultNum*2 < childNum || adultNum*2 < childrenNum ) {
                            alert('1位大人最多帶2位孩童或1位嬰兒，請再次確認人數');
                            return false;
                        } else {
                            return true;
                        }
                    }
                };
                // console.log('flightsInternational isVerfiy:', switchHandler['3']());
                return switchHandler['3']() && switchHandler['default']();

            })($visiablePanlWrap);

            if(!isVerfiy) return;

            SearchPage.PanelDesktop.WhenSubmit($visiablePanlWrap, $submit);
            
        }
    });

    //出發地&目的地交換
    $('.changeBtn').on('click', function(){
        const dept = $(this).prev();
        const dest = $(this).next();
        const isMobile = typeof dept.data('nvb_gplt') !== 'undefined';
        
        changeValue(dept, dest, $(this), isMobile);
    });

    //排序
    $('.bt_sort#AccdePrice').bt_sort({
        descText: '依價格',
        ascText: '依價格',
        whenClick: function($dom,$this) {
            console.log("whenClick",$dom,$this);
            var $bt_sorts = $dom.closest('.group').children('.bt_sort');
            $.each($bt_sorts,function(idx,bt_sort){
                if( bt_sort != $dom[0]){
                    $(bt_sort).bt_sort('reset');
                }
            })
        },
        whenDesc: function($dom) {
            console.log("switchDesc",$dom);
            SearchPage.PriceSort.DesktopAsc();
        },
        whenAsc: function($dom) {
            console.log("switchAsc",$dom)
            SearchPage.PriceSort.DesktopDesc();
        }
    });
    $('.bt_sort#AccdeCompany').bt_sort({
        descText: '依航空公司',
        ascText: '依航空公司',
        whenClick: function($dom,$this) {
            console.log("whenClick",$dom,$this);
            var $bt_sorts = $dom.closest('.group').children('.bt_sort');
            $.each($bt_sorts,function(idx,bt_sort){
                if( bt_sort != $dom[0]){
                    $(bt_sort).bt_sort('reset');
                }
            })
        },
        whenDesc: function($dom) {
            console.log("switchDesc",$dom)
            SearchPage.AirPlaneSort.DesktopAsc();
        },
        whenAsc: function($dom) {
            console.log("switchAsc",$dom)
            SearchPage.AirPlaneSort.DesktopDesc();
        }
    });
    $('.bt_sort#AccdeTime').bt_sort({
        descText: '依出發時間',
        ascText: '依出發時間',
        whenClick: function($dom,$this) {
            console.log("whenClick",$dom,$this);
            var $bt_sorts = $dom.closest('.group').children('.bt_sort');
            $.each($bt_sorts,function(idx,bt_sort){
                if( bt_sort != $dom[0]){
                    $(bt_sort).bt_sort('reset');
                }
            })
        },
        whenDesc: function($dom) {console.log("switchDesc",$dom)},
        whenAsc: function($dom) {console.log("switchAsc",$dom)},
    });

    //進度條
    $ps_flpk.ps_flpk({
        speed:1000
    });
    
})