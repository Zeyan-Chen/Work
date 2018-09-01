$(function(){
    PassengerPage.DomReadyStart();
    PassengerPage.BeforeModuleInit();
	//--------------------- nvb_gplt
	$('.nvb_gplt').nvb_gplt({
		adaptiveRun: false,
		dynamicHeaderPadding: false,
		container: '.nvb_gplt,.ft_gplt'
	});

	$( '[data-toggle="membernav"]' ).on( 'click', function ( e ) {
		e.stopPropagation();
		$('.nvb_gplt').nvb_gplt('toggle', 'membernav');
	});

	$( '.nvb_gplt' ).on( 'click', function ( e ) {
		$('.nvb_gplt').nvb_gplt('close');
	} );

    //--------------------- nvb_gplt end
    
    // clp_gplt
    $('.clp_gplt').clp_gplt();
    // clp_gplt end

    $('.st_lnls:not(.membercard,.address-city,.address-section)').st_lnls({
        openDirection: 'down', 
        defaultSelector: 'on'
    });

    //航空公司會員卡
    $('.st_lnls.membercard').st_lnls({
        openDirection: 'down',
        defaultSelector: 'on',
        addClass:{
            OutClass: 'w-50p pl'
        }
    });

    //郵寄城市
    $('.st_lnls.address-city').st_lnls({
        openDirection: 'down',
        defaultSelector: 'on',
        addClass:{
            OutClass: 'w-50p pl md-w-25p'
        }
    });

    //郵寄地區
    $('.st_lnls.address-section').st_lnls({
        openDirection: 'down',
        defaultSelector: 'on',
        addClass:{
            OutClass: 'w-50p pl md-w-30p'
        }
    });

    //收合填寫更多資料
    $('.bt_gpmr:not(.arrow):not(.none)').bt_gpmr({
        initOption: "calendar",
        nextOptions: {
            list: "calendar",
            calendar: "list"
        },
        optionsCallbackFunc: {
            list: function($this) {
                $this.closest('.clp').find('.contents').slideDown();
                $this.closest('.clp').css({
                    'background': '#eaedf1',
                    'padding-top': '10px',
                    'padding-bottom': '10px'
                });
            },
            calendar: function($this) {
                var psg = $this.closest('.psg');
                var top = (psg.length === 0) ? null : psg.offset().top;
                
                $this.closest('.clp').find('.contents').slideUp(function() {
                    $this.closest('.clp').css({
                        'background': '',
                        'padding-top': '',
                        'padding-bottom': ''
                    });

                    if(top && isMobile){
                        $('body').animate({scrollTop:top},500);  
                    }
                    
                });
                
            }
        }
    });


    // 收合重要訂購
    $('.alt_lnop').on('click','.info-title', function(e){
        $(this).closest('.alt_lnop').toggleClass('open');
    });

    
    //英文姓名提示
    $('.show-pop').pp_ln();

    $('[name=waytype]').click(function(){
        if($(this).hasClass('selected')){return;}
        $('.ways-content').slideUp();
        $('[name=waytype]').filter(':checked')
                            .parents('.ways-type')
                            .find('.ways-content')
                            .slideDown()
                            .css({background:"#eaedf1"});
        $('[name=waytype]').removeClass('selected');
        $(this).addClass('selected');
    });
    $('#radio-email').click();

    // 出生年月日
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    $('.born-cy-ln').cy_ln({
        monthCount: 1,
        minYear: 10,
        maxYear: 10,
        minDate: moment().subtract(100, 'years'),
        maxDate: moment(),
        weekdayName: ['日','一','二','三','四','五','六'],
        changeMonthYear: true,
        alignRight: (isMobile? true : false),
    });

    //右側費用卡片
    $('.cd_prsc').cd_prsc({
        openCardTarget: [
            {
                toggleEle: '.info',
                targetEle: '[data-target="price-card"]' 
            }
        ], 
        whenOpen: function(ele){
            console.log('outter open func');
            $('footer').stop().hide();
        },
        whenClose: function(ele){
            console.log('outter close func');
            $('footer').stop().show();
        }
    });
    // gotop
    $(".bt_tp").bt_tp(55);

    PassengerPage.AfterModuleInit();
})

