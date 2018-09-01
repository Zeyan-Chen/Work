function getUrlParam(paramKey) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1));
    var sURLVariables = sPageURL.split('&');
    var sParameterName = void 0;

    for (var i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === paramKey) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
$('.sf-lnse#flights').sf_lnse({
    $tabsWrap: [$('.sf-lnse#flights').find('.pills'), $('.sf-lnse#flights').find('.labels')],
    renderHiddenToggle: true,
    needHiddenInputsChangeEvents: 'change',
    fromChangeEventName: 'change',
    whenInit: function($module) {
        console.log('whenInit Callback', $module);
        var $panels = $module.find('[data-panl]');
        // 處理每個面板中的input預設值，或是初使化客製內容
        $panels.each(function() {
            var panelName = $(this).attr('data-panl');
            switch (panelName) {
                case "flightsInternational":
                    var flightsInternational = function() {
                        var $this = $(this);
                        var $sTripType = $(this).find('[name=Rtow]');
                        var $sDepartureCity = $(this).find('[name="sDepartureCity"]');
                        var $sDestinationCity = $(this).find('[name="sDestinationCity"]');
                        var $sPlusMinus3Days = $(this).find('[name=sPlusMinus3Days]');
                        var $sDirectFlight = $(this).find('[name=sDirectFlight]');
                        var $sHaveSeat = $(this).find('[name=sHaveSeat]');
                        var $sPaxCountInfant = $(this).find('[name=sPaxCountInfant]');
                        // 單程.來回.多目的地共用表單
                        var $fcAllWrap = $(this).find('[name="fcAllWrap"]');
                        // 單程.來回共用表單
                        var $fcOneWayRoundTripWrap = $(this).find('[name="fcOneWayRoundTripWrap"]');
                        // 單程表單
                        var $fcOneWayWrap = $(this).find('[name="fcOneWayWrap"]');
                        var $oneWayDateStart = $(this).find('[name="sOneWayFromDate"]');
                        // 來回表單
                        var $fcRoundTripWrap = $(this).find('[name="fcRoundTripWrap"]');
                        var $sRoundTripType = $fcRoundTripWrap.find('[name="sRoundTripType"]');
                        var $confirmedWrap = $this.find('#comfirmed');
                        var $confirmedDateStart = $confirmedWrap.find('[name="sRoundTripTypeComfirmedFromDate"]');
                        var $confirmedDateEnd = $confirmedWrap.find('[name="sRoundTripTypeComfirmedToDate"]');
                        // 多目的地表單
                        var $fcMultiDestWrap = $(this).find('[name="fcMultiDestWrap"]');
                        var $multiDestInputs = $fcMultiDestWrap.find('[data-toggle="dtm-lnls"]');
                        var $multiData = $fcMultiDestWrap.find('div[name=dataMulti]');
                        var $addMultiDest = $('button#addMultiDest');
                        // 選單設定
                        var placeDataSource = "/WebSearch/Scripts/GetArrayTkt6.ashx";
                        var departureDataSource = "/_shared/bundle/js/searchEngine/flightsInternationalDestinationCsutomMenu.js";
                        var destinationMenuSource = "/_shared/bundle/js/searchEngine/flightsInternationalDestinationCsutomMenu.js";
                        var departureSetting = "{'source':'" + placeDataSource + "','menuSource':'" + departureDataSource + "','bfmQuery':true,'moreString':'更多出發地，請輸入關鍵字','toggleCustomMenu':true,'autoCategory':true,'dataTemplate':'flightsInternational','region':false,'removeStringOnMenu':'-\\u005cw.+','disabled':2,'more':true,'removeNotWordStringWhenSearch':false,'runCustomMenuRenderer':true,'customMenuLineOrder':['_9','_5','_6','_7','_3','_1','_2']}";
                        var destinationSetting = "{'source':'" + placeDataSource + "', 'bfmQuery':true, 'autoCategory':true,'dataTemplate':'flightsInternational','more':true,'removeNotWordStringWhenSearch':false,'toggleCustomMenu':true,'menuSource':'" + destinationMenuSource + "','runCustomMenuRenderer':true,'customMenuLineOrder':['_5','_6','_7','_3','_1','_2','_4','_9']}";
                        var multiDestSetting = "{'source':'" + placeDataSource + "', 'bfmQuery':true, 'autoCategory':true,'dataTemplate':'flightsInternational','removeNotWordStringWhenSearch':false,'customMenuLineOrder':['_5','_6','_7','_3','_1','_2','_4','_9']}";
                        var changeTripType = function(type) {
                            switch (type) {
                                case '0':
                                    $fcAllWrap.find('label').addClass('em6').removeClass('em5');
                                    $fcOneWayRoundTripWrap.show();
                                    $fcOneWayWrap.show();
                                    $fcRoundTripWrap.hide();
                                    $fcMultiDestWrap.hide();
                                    if (!$sPlusMinus3Days.prop('checked')) {
                                        $sPaxCountInfant.trigger('removeDisabled').prop('disabled', false);
                                    } else {
                                        $sPaxCountInfant.trigger('setDisabled').prop('disabled', true);
                                    }
                                    break;
                                case '1':
                                    $fcAllWrap.find('label').addClass('em6').removeClass('em5');
                                    $fcOneWayRoundTripWrap.show();
                                    $fcOneWayWrap.hide();
                                    $fcRoundTripWrap.show();
                                    $fcMultiDestWrap.hide();
                                    if ( $fcRoundTripWrap.find('[name="sRoundTripType"]:checked').val() == 'NOT_COMFIRMED' || $sPlusMinus3Days.prop('checked') ) {
                                        $sPaxCountInfant.trigger('setDisabled').prop('disabled', true);
                                    };
                                    break;
                                case '3':
                                    $fcAllWrap.find('label').addClass('em5').removeClass('em6');
                                    $fcOneWayRoundTripWrap.hide();
                                    $fcOneWayWrap.hide();
                                    $fcRoundTripWrap.hide();
                                    $fcMultiDestWrap.show();
                                    $sPaxCountInfant.trigger('removeDisabled').prop('disabled', false);
                                    break;
                            }
                        };
                        var changeRoundTripType = function(type) {
                            console.log(type, $sPaxCountInfant);
                            var $sTripType = $this.find('[name=Rtow]');
                            var sTripTypeOption = $sTripType.filter(':checked').val();
                            switch (type) {
                                case 'COMFIRMED':
                                    $fcRoundTripWrap.find('#comfirmed').show();
                                    $fcRoundTripWrap.find('#notcomfirmed').hide();
                                    if (!$sPlusMinus3Days.prop('checked')) $sPaxCountInfant.trigger('removeDisabled').prop('disabled', false);
                                    break;
                                case 'NOT_COMFIRMED':
                                    $fcRoundTripWrap.find('#comfirmed').hide();
                                    $fcRoundTripWrap.find('#notcomfirmed').show();
                                    if ( sTripTypeOption === '1' ) {
                                        $sPaxCountInfant.trigger('setDisabled').prop('disabled', true);
                                    }
                                    break;
                            }
                        };
                        var paneLocalStorage = !!localStorage.getItem('sf-lnse') ? core.parse(localStorage.getItem('sf-lnse')).panelLastSubmit[panelName] : undefined;
                        var fcMultiDestShouldShow = $multiData.map(function (index, ele) {
                            var $thisDest = $(ele);
                            var $dataInput = $thisDest.find('[data-toggle="dtm-lnls"],[data-toggle="cy-ln"]');
                            return $dataInput.map(function (index, ele) {
                                return !!paneLocalStorage ? paneLocalStorage.hasOwnProperty($(ele).attr('data-save')) : false;
                            }).toArray().every(function (val, index) {
                                return val === true;
                            });
                        }).toArray();
                        var IsConfirmDate = function (IsConfirmDate) {
                            if (typeof IsConfirmDate === 'undefined') {
                                return false;
                            } else {
                                return IsConfirmDate === 'true' ? 'COMFIRMED' : 'NOT_COMFIRMED';
                            }
                        }(!!paneLocalStorage && typeof paneLocalStorage.IsConfirmDate === 'object' ? paneLocalStorage.IsConfirmDate.value : undefined);
                        changeTripType($sTripType.filter(':checked').val());
                        changeRoundTripType(IsConfirmDate || $sRoundTripType.filter(':checked').val());
                        $sRoundTripType.filter('[value=' + (!!IsConfirmDate ? IsConfirmDate : 'COMFIRMED') + ']').trigger('click');
                        $sDepartureCity.attr({
                            "data-dtm-lnsl": departureSetting,
                            "data-intvalue": "台北-Taipei(TPE)",
                            "data-label": "中華民國(TW)-台北-Taipei(TPE)",
                            "data-iscity": "true",
                            "data-cityname": "台北-Taipei",
                            "data-citycode": "TPE",
                            "data-countryname": "中華民國",
                            "data-countrycode": "TW"
                        }).val('台北-Taipei(TPE)');
                        $multiDestInputs.first().attr({
                            "data-dtm-lnsl": departureSetting,
                            "data-intvalue": "台北-Taipei(TPE)",
                            "data-label": "中華民國(TW)-台北-Taipei(TPE)",
                            "data-iscity": "true",
                            "data-cityname": "台北-Taipei",
                            "data-citycode": "TPE",
                            "data-countryname": "中華民國",
                            "data-countrycode": "TW"
                        }).val('台北-Taipei(TPE)');
                        $sDestinationCity.attr('data-dtm-lnsl', destinationSetting);
                        $multiDestInputs.attr('data-dtm-lnsl', multiDestSetting);
                        // console.log('$multiDestInputs:', $multiDestInputs);
                        $sTripType.on('click', function () {
                            changeTripType($(this).val());
                        }).on('recodeLoaded', function () {
                            changeTripType(getUrlParam('Rtow') || $(this).val());
                            if (getUrlParam('Rtow') === '3') {
                                $sTripType.filter('[value="' + getUrlParam('Rtow') + '"]').trigger('click');
                            }
                        });
                        $sRoundTripType.on('click recodeLoaded', function () {
                            changeRoundTripType($(this).val());
                        });

                        $sPlusMinus3Days.change(function () {
                            $(this).prop('checked') ? $sPlusMinus3Days.prop('checked', true) : $sPlusMinus3Days.prop('checked', false);
                            $(this).prop('checked') ? $sPaxCountInfant.trigger('setDisabled') : $sPaxCountInfant.trigger('removeDisabled');
                        });
                        $sDirectFlight.change(function () {
                            $(this).prop('checked') ? $sDirectFlight.prop('checked', true) : $sDirectFlight.prop('checked', false);
                        });
                        $sHaveSeat.change(function () {
                            $(this).prop('checked') ? $sHaveSeat.prop('checked', true) : $sHaveSeat.prop('checked', false);
                        });
                        // console.log('confirmedDateStart:', $confirmedDateStart);
                        // console.log('confirmedWrap:', $confirmedWrap);
                        $confirmedDateStart.on('change', function () {
                            // console.log('confirmedDateStart changed!!');
                            var dateStartString = $confirmedDateStart.val().replace(/\//g, '');
                            var dateEndString = $confirmedDateEnd.val().replace(/\//g, '');
                            var dateTodayString = moment().format('YYYY/MM/DD');
                            if (moment(dateStartString).isAfter(dateEndString)) {
                                $confirmedDateEnd.val(moment(dateStartString).format('YYYY/MM/DD'));
                            }
                            $confirmedDateEnd.cy_ln('updateOption', {
                                minDate: moment(dateStartString).subtract(1, 'd'),
                                alertString: {
                                    invalid: '日期格式錯誤！',
                                    beforeMin: '回程日期不得小於出發日期！',
                                    afterMax: '日期必須小於{#Date}！',
                                    fromMoreTo: '日期迄日不可小於起日'
                                }
                            });
                        }).on('recodeLoaded', function () {
                            var dateStartString = $confirmedDateStart.val().replace(/\//g, '');
                            var dateEndString = $confirmedDateEnd.val().replace(/\//g, '');
                            var dateTodayString = moment().format('YYYY/MM/DD');
                            var dateObject = {
                                date: $(this).val(),
                                status: null
                            };
                            $(this).trigger('checkDateStatus', [dateObject]);
                            if (dateObject.status == 'beforeMin') {
                                $(this).val(dateStartDefault);
                            }
                            if (moment(dateStartString).isAfter(dateEndString)) {
                                $confirmedDateEnd.val(moment(dateStartString).format('YYYY/MM/DD'));
                            }
                            typeof $confirmedDateEnd.data('cy_ln') === 'object' && $confirmedDateEnd.cy_ln('updateOption', {
                                minDate: moment(dateStartString).subtract(1, 'd'),
                                alertString: {
                                    invalid: '日期格式錯誤！',
                                    beforeMin: '回程日期不得小於出發日期！',
                                    afterMax: '日期必須小於{#Date}！',
                                    fromMoreTo: '日期迄日不可小於起日'
                                }
                            });
                        });
                        $oneWayDateStart.on('change', function (e) {
                            console.log('$oneTwoWayDateStart change:', $(this).val(), $confirmedDateStart);
                            var $this = $(this);
                            var date = $this.val();
                            $confirmedDateStart.val(date);
                        });
                        $sDepartureCity.on('dtm_lnlsChanged', function () {
                            console.log('sDepartureCity dtm_lnlsChanged', $multiDestInputs.eq(1));
                            var $syncMultiDestInput = $multiDestInputs.eq(0);
                            var syncMultiDestInputIsInit = $syncMultiDestInput.data('dtm_lnls').isInit;
                            var $this = $(this);
                            if ( !syncMultiDestInputIsInit ) {
                                $syncMultiDestInput.trigger('dtm_lnlsInit');
                            }
                            $syncMultiDestInput.val($this.val());
                            $syncMultiDestInput.trigger('inputShowAuto').dtm_lnls('autoSelector');
                        });
                        $sDestinationCity.on('dtm_lnlsChanged', function () {
                            console.log('sDestinationCity dtm_lnlsChanged', $multiDestInputs.eq(1));
                            var $syncMultiDestInput = $multiDestInputs.eq(1);
                            var syncMultiDestInputIsInit = $syncMultiDestInput.data('dtm_lnls').isInit;
                            var $this = $(this);
                            if ( !syncMultiDestInputIsInit ) {
                                $syncMultiDestInput.trigger('dtm_lnlsInit');
                            }
                            $syncMultiDestInput.val($this.val());
                            $syncMultiDestInput.trigger('inputShowAuto').dtm_lnls('autoSelector');
                        });
                        $multiData.each(function (i, ele) {
                            if (i > 1 && fcMultiDestShouldShow[i] === false) {
                                $(ele).remove();
                            }
                        });

                        $multiData = $fcMultiDestWrap.find('div[name=dataMulti]');

                        if ($multiData.length == 6) {
                            $addMultiDest.closest('.group').hide();
                        }

                        $addMultiDest.click(function () {
                            if ($multiData.length < 6) {
                                var $newMultiData = $('<div class="' + $multiData.attr('class') + '" name="' + $multiData.attr('name') + '"></div>');
                                var newMultiDataCount = $multiData.length;
                                var delMulti = '<div class="cell pl10"><div class="w-20 h-20 bg-soildark pos-rlt delMulti"><i class="ic-ln toolcancels x2 pos-abt m-l-n-4 m-t-n-4 c-soildarker"></i></div></div>';
                                var $newCalendar;
                                var $allCalendar;
                                $(this).closest('.group').before($newMultiData.append($multiData.html()));
                                $newMultiData.append(delMulti);
                                $multiData = $fcMultiDestWrap.find('div[name=dataMulti]');
                                $newCalendar = $newMultiData.find('[data-toggle="cy-ln"]');
                                $allCalendar = $multiData.find("[data-toggle='cy-ln']");
                                newMultiDataCount = $multiData.length;
                                $newMultiData.find('[data-toggle="dtm-lnls"]').first().attr({
                                    'id': 'multiDestDeparture' + newMultiDataCount,
                                    'data-save': 'multiDestDeparture' + newMultiDataCount
                                }).dtm_lnls('updateOptions', multiDestSetting);
                                $newMultiData.find('[data-toggle="dtm-lnls"]').last().attr({
                                    'id': 'multiDestDestination' + newMultiDataCount,
                                    'data-save': 'multiDestDestination' + newMultiDataCount
                                }).dtm_lnls('updateOptions', multiDestSetting);

                                $newCalendar.attr({
                                    'id': 'multiDestDate' + newMultiDataCount,
                                    'data-save': 'multiDestDate' + newMultiDataCount
                                }).cy_ln({
                                    weekdayName: ['日', '一', '二', '三', '四', '五', '六'],
                                    minDate: function ($prevCalendar) {
                                        if (moment($prevCalendar.val().replace(/\//g, '')).isValid()) {
                                            return moment($prevCalendar.val().replace(/\//g, ''));
                                        } else {
                                            return moment().subtract(1, 'days');
                                        }
                                    }($allCalendar.eq($allCalendar.index($newCalendar) - 1)),
                                    maxDate: moment().add(361, 'days')
                                });
                            }
                            if ($multiData.length == 6) {
                                $addMultiDest.closest('.group').hide();
                            }
                        });

                        $fcMultiDestWrap.on('click', '.delMulti', function () {
                            console.log($(this));
                            var $thisMultiData = $(this).closest('div[name=dataMulti]');
                            var $lastMultiData = $multiData.last();
                            var $afterMultiData = $thisMultiData.nextUntil($lastMultiData).add($lastMultiData);
                            if ($multiData.length == 6) {
                                $addMultiDest.closest('.group').show();
                            }
                            console.log('$afterMultiData', $afterMultiData);
                            $thisMultiData.remove();
                            $afterMultiData.each(function (index, el) {
                                var $this = $(this);
                                $this.find('[data-toggle="dtm-lnls"]').first().attr({
                                    'id': 'multiDestDeparture' + (index + 3),
                                    'data-save': 'multiDestDeparture' + (index + 3)
                                });
                                $this.find('[data-toggle="dtm-lnls"]').last().attr({
                                    'id': 'multiDestDestination' + (index + 3),
                                    'data-save': 'multiDestDestination' + (index + 3)
                                });
                                $this.find('[data-toggle="cy-ln"]').attr({
                                    'id': 'multiDestDate' + (index + 3),
                                    'data-save': 'multiDestDate' + (index + 3)
                                });
                            });
                            $multiData = $fcMultiDestWrap.find('div[name=dataMulti]');
                        });

                        $fcMultiDestWrap.delegate('input[data-toggle=cy-ln]', 'change', function (e) {
                            var $inputs = $(e.delegateTarget).find('input[data-toggle=cy-ln]');
                            var $input = $(this);
                            var inputIndex = $inputs.index($input);
                            var inputValue = $input.val();
                            if (inputValue.length > 0 && moment(Date.parse(inputValue)).isValid()) {
                                $inputs.each(function (i) {
                                    if (i < inputIndex) {
                                        Date.parse($(this).val()) > Date.parse(inputValue) && $(this).val(inputValue);
                                    } else if (i > inputIndex) {
                                        if (Date.parse($(this).val()) <= Date.parse(inputValue)) {
                                            $(this).val(inputValue);
                                        }
                                        $(this).cy_ln('updateOption', {
                                            minDate: moment(Date.parse(inputValue)).subtract(1, 'd'),
                                            alertString: {
                                                invalid: '日期格式錯誤！',
                                                beforeMin: '日期必須大於{#Date}！',
                                                afterMax: '日期必須小於{#Date}！',
                                                fromMoreTo: '日期迄日不可小於起日'
                                            }
                                        });
                                    }
                                });
                            } else {
                                if ($(this).cy_ln('getOptions').minDate !== null) {
                                    $(this).val(moment().format('YYYY/MM/DD'));
                                }
                            }
                        });
                    }.call(this);
                    break;
                case "flightsChina":
                    break;
            }
        });
    },
    whenRecodeWrited: function ($visiablePanlWrap, $input, $inputHidden) {
        // console.log('whenRecodeWrited Callback', $input, $inputHidden);
    },
    whenTabSwitchDone: function ($visiablePanlWrap) {
        // console.log('whenTabSwitchDone Callback', $visiablePanlWrap);
    },
    whenInputRemoved: function ($inputDom) {
        // console.log('whenInputRemoved Callback', $inputDom);
    },
    whenFormChanged: function ($visiablePanlWrap, $input, $inputHidden) {
        // console.log('whenFormChanged Callback', $input, $inputHidden);
    },
    whenSubmit: function ($visiablePanlWrap, $submit) {
        // console.log('whenSubmit Callback', $visiablePanlWrap, $submit);
        var $panl = $visiablePanlWrap;
        var section = $panl.attr('data-panl');
        var isVerfiy = function (pn) {
            switch (section) {
                case "flightsInternational":
                    var $Rtow = $panl.find('[name=Rtow]:checked');
                    var Rtow = $Rtow.val();
                    var switchHandler = {
                        "3": function () {
                            var $adult = $panl.find('select[name=sPaxCountAdult]');
                            var $child = $panl.find('select[name=sPaxCountChild]');
                            var $baby = $panl.find('select[name=sPaxCountInfant]');
                            var adultNum = parseInt($adult.val());
                            var childNum = parseInt($child.val());
                            var babyNum = parseInt(!!$baby.attr('disabled') ? 0 : $baby.val());
                            var childrenNum = childNum + babyNum;
                            var totalNum = adultNum + childNum + babyNum;
                            var $seekDestinationWrap = $panl.find('[name=fcMultiDestWrap]');
                            var $seekDestinationLists = $seekDestinationWrap.children('.group:visible');
                            var $seekDestinationInputs = $seekDestinationLists.find('[data-toggle=dtm-lnls]');
                            var multiDestValue = $seekDestinationInputs.map(function (index) {
                                var obj = {
                                    countrycode: $(this).attr('data-countrycode'),
                                    citycode: $(this).attr('data-citycode')
                                };
                                return obj;
                            }).toArray();
                            var destCountryCode = multiDestValue.map(function (item) {
                                return item.countrycode;
                            });
                            var destCityCode = multiDestValue.map(function (item) {
                                return item.citycode;
                            });
                            var destCountryCodeAllTW = destCountryCode.every(function (element, index, array) {
                                return element === 'TW';
                            });
                            var destCountryCodeAllCN = destCountryCode.every(function (element, index, array) {
                                return element === 'CN';
                            });
                            var excludeDepartureCityAll = destCountryCode.every(function (element, index, array) {
                                return element !== 'HKG' && element !== 'MFM';
                            });
                            var excludeDestinationCityAll = destCityCode.every(function (element, index, array) {
                                return element !== 'HKG' && element !== 'MFM';
                            });
                            // console.log(multiDestValue, destCountryCode, destCityCode, destCountryCodeAllCN, excludeDepartureCityAll, excludeDestinationCityAll);
                            if (destCountryCodeAllTW) {
                                alert('很抱歉，目前暫不提供台灣國內線航班查詢');
                                return false;
                            } else if (destCountryCodeAllCN && excludeDepartureCityAll && excludeDestinationCityAll) {
                                alert('很抱歉，目前暫不提供中國國內線航班查詢');
                                return false;
                            } else {
                                if (totalNum > 8) {
                                    alert('總人數不得超過8位');
                                    return false;
                                } else if (adultNum < babyNum || adultNum * 2 < childNum || adultNum * 2 < childrenNum) {
                                    alert('1位大人最多帶2位孩童或1位嬰兒，請再次確認人數');
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        },
                        "1": function () {
                            var $sRoundTripType = $panl.find('[name=sRoundTripType]');
                            var $sClass = $panl.find('[name=sClass]');
                            var $sRoundTripTypeNotComfirmedFromDate = $panl.find('[name=sRoundTripTypeNotComfirmedFromDate]');
                            var notComfirmedFromDate = $sRoundTripTypeNotComfirmedFromDate.val();
                            var sRoundTripTypeOption = $sRoundTripType.filter(':checked').val();
                            var sClassOption = $sClass.val();
                            // console.log(sRoundTripTypeOption, sClassOption);
                            if ( sRoundTripTypeOption === 'NOT_COMFIRMED' ) {
                                if ( typeof notComfirmedFromDate !== 'string' || notComfirmedFromDate.length === 0 || /\d{1,4}\/\d\d\/\d\d/.test(notComfirmedFromDate) === false ) {
                                    $sRoundTripTypeNotComfirmedFromDate.val(moment().format('YYYY/MM/DD'));
                                }
                            }
                            if ( sRoundTripTypeOption === 'NOT_COMFIRMED' && sClassOption !== '1' ) {
                                alert('不確定出發僅能搜尋經濟艙');
                                return false;
                            } else {
                                return true;
                            }
                            
                        },
                        "0": function () {

                        },
                        default: function () {
                            var $adult = $panl.find('select[name=sPaxCountAdult]');
                            var $child = $panl.find('select[name=sPaxCountChild]');
                            var $baby = $panl.find('select[name=sPaxCountInfant]');
                            var adultNum = parseInt($adult.val());
                            var childNum = parseInt($child.val());
                            var babyNum = parseInt(!!$baby.attr('disabled') ? 0 : $baby.val());
                            var childrenNum = childNum + babyNum;
                            var totalNum = adultNum + childNum + babyNum;
                            var $seekDestinationWrap = $panl.find('[name=fcOneWayRoundTripWrap]');
                            var $seekDestinationLists = $seekDestinationWrap.children('.group:visible');
                            var $seekDestinationInputs = $seekDestinationLists.find('[data-toggle=dtm-lnls]');
                            var multiDestValue = $seekDestinationInputs.map(function (index) {
                                var obj = {
                                    countrycode: $(this).attr('data-countrycode'),
                                    citycode: $(this).attr('data-citycode')
                                };
                                return obj;
                            }).toArray();
                            var destCountryCode = multiDestValue.map(function (item) {
                                return item.countrycode;
                            });
                            var destCityCode = multiDestValue.map(function (item) {
                                return item.citycode;
                            });
                            var destCountryCodeAllTW = destCountryCode.every(function (element, index, array) {
                                return element === 'TW';
                            });
                            var destCountryCodeAllCN = destCountryCode.every(function (element, index, array) {
                                return element === 'CN';
                            });
                            var excludeDepartureCityAll = destCountryCode.every(function (element, index, array) {
                                return element !== 'HKG' && element !== 'MFM';
                            });
                            var excludeDestinationCityAll = destCityCode.every(function (element, index, array) {
                                return element !== 'HKG' && element !== 'MFM';
                            });
                            console.log(multiDestValue, destCountryCode, destCityCode, destCountryCodeAllTW, destCountryCodeAllCN, excludeDepartureCityAll, excludeDestinationCityAll);
                            if (destCountryCodeAllTW) {
                                alert('很抱歉，目前暫不提供台灣國內線航班查詢');
                                return false;
                            } else if (destCountryCodeAllCN && excludeDepartureCityAll && excludeDestinationCityAll) {
                                alert('很抱歉，目前暫不提供中國國內線航班查詢');
                                return false;
                            } else {
                                if (totalNum > 8) {
                                    alert('總人數不得超過8位');
                                    return false;
                                } else if (adultNum < babyNum || adultNum * 2 < childNum || adultNum * 2 < childrenNum) {
                                    alert('1位大人最多帶2位孩童或1位嬰兒，請再次確認人數');
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        }
                    };
                    // console.log('flightsInternational isVerfiy:', switchHandler['3']());
                    if ( Rtow === '3' ) {
                        return switchHandler['3']();
                    } else if ( Rtow === '1' ) {
                        return switchHandler['1']() && switchHandler['default']();
                    } else {
                        return switchHandler['default']();
                    }
                break;
            };
        }(section);
        if ( isVerfiy ) {
            fnDataSearch();
        }
    }
});

$('.sf-lnse [data-toggle=dtm-lnls]').dtm_lnls({
    isRunning: true,
    // 設定階層keyName
    dataTemplate: {
        "flightsInternational": [],
    },
    levelName: {
        "flightsInternational": ["國家", "城市", "機場"],
    },
    customMenuRenderHTML: function(Module, dataTemplateName, sourceData, hierarchyArray, firstLevelOrder, itemDataKeys) {
        //console.log('customMenuRenderHTML', Module, dataTemplateName, sourceData, hierarchyArray, firstLevelOrder, itemDataKeys);
        var METHODS = {
            "flightsInternational": function(Module, sourceData, hierarchyArray, firstLevelOrder, itemDataKeys) {
                var self = Module;
                var templateHTML = '';
                var hierarchyArray = function(ha, sdata) {
                    var data;
                    if (!!ha) {
                        data = ha;
                    } else {
                        data = Object.keys(sdata);
                    }
                    return data;
                }(hierarchyArray, sourceData);
                templateHTML += '<div class="dtm-lnls"><button class="close">×</button>';
                templateHTML += '<div class="m-place"><span class="m-r-xs icon at"></span>' + Module.opts.moreString + '</div>';
                templateHTML += '<ul class="tabs">';
                templateHTML += function(orderArr, level1Data) {
                    var string = '';

                    var tabLabel;
                    for (var i = 0; i < orderArr.length; i++) {
                        tabLabel = level1Data[orderArr[i]] || false;
                        if (!tabLabel) {
                            continue;
                        }
                        string += '<li><span>' + function(labelString) {
                            if (!!labelString) {
                                return labelString.replace(new RegExp(self.opts.removeStringOnMenu, 'g'), '');
                            } else {
                                return ''
                            }
                        }(tabLabel) + '</span></li>';
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
                    for (i = 0; i < lineOrder.length; i++) {
                        let lineKey = lineOrder[i];
                        thisItemData = null;
                        thisItemData = itemData[lineKey];
                        templateHTML += '<div class="panl">';
                        for (key in thisItemData) {
                            thisItemAttrs = null;
                            thisItemAttrs = function(dataParts) {
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
                                // do same script for every property
                                Object.keys(loc).forEach((objectKey, index) => {
                                    if (typeof loc[objectKey] === 'string') {
                                        loc[objectKey] = loc[objectKey].replace(/\<.+\>/g, '');
                                    }
                                });
                                return loc;
                            }(thisItemData[key].split("__"));
                            templateHTML += '<span class="sec-wrap in-block">';
                            templateHTML += '<a ' + function(attrs) {
                                var string = '';
                                for (var key in attrs) {
                                    string += ' data-' + key + '="' + (!!attrs[key] ? attrs[key] : '_') + '"';
                                }
                                return string;
                            }(thisItemAttrs) + '>' + ((stringData, lineKey) => {
                                let returnString = stringData.replace(/.+__|-\w.+\(.+\)|-\(.+\)/g, '').replace(/[\<\>]/g, '');
                                let individProcess = {
                                    "_1": function(s) {
                                        return s.replace(/\-.+/g,'');
                                    },
                                    "_6": function(s) {
                                        return s.replace(/\-.+|市/g,'');
                                    }
                                };
                                if (typeof lineKey === 'string' && typeof individProcess[lineKey] === 'function') {
                                    returnString = individProcess[lineKey](returnString);
                                }
                                return returnString;
                            })(thisItemData[key], lineKey) + '</a>';
                            templateHTML += '</span>';
                        }
                        templateHTML += '</div>';
                    }
                    return templateHTML;
                }(firstLevelOrder, sourceData[hierarchyArray[1]]);
                templateHTML += '</div>';
                return templateHTML;
            },
        };
        return METHODS[dataTemplateName](Module, sourceData, hierarchyArray, firstLevelOrder, itemDataKeys);
    },
    customArrangeData: function(dataTemplateName, sourceData, levelArray, rowObjKeyName, regexSettings) {
        //console.log('customArrangeData', dataTemplateName, sourceData, levelArray, rowObjKeyName, regexSettings);
        //console.log(dataForSearch);
    },
    whenItemClicked: function($menu, $item, $input) {
        //console.log('whenItemClicked', $menu, $item, $input);
        switch ($input.attr('id')) {
            default: var itemData = $item.data();
            for (var key in itemData) {
                $input.attr('data-' + key, itemData[key]);
            }
            break;
        }
    },
    whenDestinationShow: function($menu, $input) {
        //console.log('whenDestinationShow', $menu, $input);
    }
});

$('.sf-lnse [data-toggle=pp_ln]').pp_ln({
    content: '大人：以回程抵達日為準，年滿12歲(含)以上<br>孩童：以回程抵達日為準，年滿2歲(含)以上、未滿12歲<br>嬰兒：以全程搭乘日為準，未滿2歲(不列入幾人成行的人數計算)',
    trigger: 'hover',
    placement: 'bottom',
    animation: 'fade',
});

$('.sf-lnse select.st_lnls').st_lnls({
    whenOpen: function ($this) {
        $this.closest('.group').css('overflow', 'visible');
        $this.closest('.wrap').css('overflow', 'visible');
    },
    whenClose: function ($this) {
        $this.closest('.group').css('overflow', '');
        $this.closest('.wrap').css('overflow', '');
    }
});
