const ModuleName = 'frzTable';
const ModuleDefaults = {
    count: {
        // M版時每次點擊往前往後移動幾格儲存格
        slide: 3, // [number] 
        // M版時一個畫面show幾格儲存格 友情提示:show最好要大於slide
        show: 3 // [number] 
    },
    // 設定花多久時間移動完成
    speed: .1, // [number] 
    // 每次點擊儲存格時會執行此callback，並帶入所點擊的儲存格jquery物件
    whenClick: function($element) {
        console.log($element)
    }
};
const ModuleReturns = ['output', 'methods'];

class Module {
    constructor(ele, options) {
        this.ele = ele;
        this.$ele = $(ele);
        this.option = options;
    }
    init() {
        var self = this;
        var $this = this.$ele;
        var opts = this.option;
        var $smallBox = $this.find(".content_box2");
        // $('.content_box2').attr("style", 'left: 0px;');
        $(window).resize(function() {
            self.matchContainerWidth();
        });

        this.defaultScroll();
        //選擇表格function
        this.selectBox(); 
        this.selectDot();
        //表格顯示數量
        this.changeShow();
        this.resizeShow();
        this.setShow();
        this.whenClick();   
        return this;
    }
    methods() {
        return this;
    }
    frzTable() {
        return this;
    }
    selectBox() {
        var self = this;
        var $this = this.$ele;
        var $smallBoxN = $this.find(".content_box2:not(.boxHead, .null)");
        var $smallBox = $this.find(".content_box2");
        var $BoxSelect = $this.find(".select");
            $smallBoxN.on('click', function() {
                $smallBox.removeClass('select').removeClass('hight_light');
                $(this).addClass('select').siblings().addClass('hight_light');
                var selectIndex = $this.find(".select").index() + 1;//:nth-child()的索引值從1開始
                var selectRel = $this.find(".select").parent().index()-1; //contentBox的index~有一行無用所以要減一   
                $this.find(".content_box2:nth-child(" + selectIndex + ")").removeClass("hight_light").addClass("hight_light");
                $this.find('.content_box2_rel').removeClass('hight_light');
                $this.find(".boxHead_rel").removeClass("relSelect");
                $this.find(".left_rel").removeClass("relSelect");
                $this.find(".left_rel:nth-child(" + selectRel + ")").addClass("relSelect");
                $this.find(".boxHead_rel:nth-child(" + selectIndex + ")").addClass("relSelect");
                $this.find(".boxHead:nth-child(" + selectIndex + ")").removeClass("hight_light");
                $(this).removeClass('hight_light');
        });
        return this;
    }
    
    

    resizeShow(){
        // 判定瀏覽器寬度設定格子數量 
        var self = this;
        var $this = this.$ele;
        var opts = this.option;
        var $smallBox = $this.find(".content_box2");
        self.matchContainerWidth();
        $(window).resize(function() {
            //改變window尺寸時,重整畫面!
            var widowWidth = $(window).width();
            self.matchContainerWidth();
            $smallBox.width(BoxShow);
            if (widowWidth <= 690) {
                self.changeShow();
                return this;
            } else {
                var BoxShow = ($(".main_box").width()) / 7 - 2;
                var BoxShow2 = ($(".main_box").width()) / 5 - 2;
                $(".content_box2_defaule").width(BoxShow);
                $(".content_box2_rel").width(BoxShow2);
                return this;
            }
        });
    }
    //判定瀏覽器寬度設定格子數量//要抓到ele的dom數量//寫死了....好爛...
    setShow() {
        var self = this;
        var $this = this.$ele;
        var $smallBox = $this.find(".content_box2");
        var $mainBox = $this.find(".main_box");
        var $smallBoxNumber=$smallBox.length / 8;//抓到了有幾排!!!分別上7下5!
        var widowWidth = $(window).width();
        self.matchContainerWidth();
        if (widowWidth >= 691) {
        //左右各1px的border!!!!//原本是968
            var BoxShow = ($(".main_box").width() / 7) - 2;
            var BoxShow2 = ($(".main_box").width() / 5) - 2;
            $(".content_box2_defaule").width(BoxShow);
            $(".content_box2_rel").width(BoxShow2);
        } else {
            self.changeShow();
            return this;
        }
    }
    changeShow() {
        var self = this;
        var $this = this.$ele;
        var opts = this.option;
        var $smallBox = $this.find(".content_box2");
        var $mainBox = $this.find(".main_box");
        var $smallBoxNumber= $smallBox.length / 8;//抓到了有幾排!!!分別上7下5!
        var widowWidth = $(window).width();
        self.matchContainerWidth();
        var borderSpace = opts.count.show * 2;
        // var BoxShow = ($(".main_box").width() - borderSpace) / this.option.count.show;
        var BoxShow = ( $mainBox.width() - borderSpace) / opts.count.show;
        $smallBox.width(BoxShow);
        // $(".content_box2").width(BoxShow);
        return this;
    }
    matchContainerWidth(){
        var containerWidth=$('.container').width();
        // if( containerWidth<768 ){
            $('.main_box').css("max-width",containerWidth +"px");
        // }
        return this;
    }
    ///defaultScroll 測試中!!!
    defaultScroll(){
        var self = this;
        var $this = this.$ele;
        var opts = this.option;
        var $slide_left = $this.find(".slide_left");
        var $slide_right = $this.find(".slide_right");
        var $smallBox = $this.find(".content_box2");
        var $grayBox = $this.find(".grayBox");
        var $thisDot= $this.find(".dotCircle");

        var slider = opts.count.show;
        var moveStep = opts.count.slide;
        var Defaultshow = opts.count.show; //show的數字不會變,原點
        var srcollSpeed = opts.speed * 1000;
        var $grayBoxNum= $this.find(".fristBox").length;
        var $smallBoxNum = $smallBox.length / $grayBoxNum;//7或5


        self.matchContainerWidth();
        /////測試中!!!!!!!!!!
        $(window).resize(function() {
            var srcollWidth = ($smallBox.width() + 2) * (slider - Defaultshow); //1px的border的一半
                $smallBox.animate({
                    left: "+=" + srcollWidth + "",
                }, 0.0005);
                slider = Defaultshow;
                $thisDot.removeClass("dotSelect");
                $this.find(".dotCircle:nth-child(1)").addClass("dotSelect");
                return this;
        });
        /////

        $slide_left.on('click', function() {
            if (slider - Defaultshow > 0 && slider > Defaultshow * 2 && moveStep !== 1) {
                slider = slider - moveStep;
                self.goLeftScroll();
                $thisDot.removeClass("dotSelect");
                $this.find(".dotCircle:nth-child(" + (slider- 2) + ")").addClass("dotSelect");
            } else if (slider - Defaultshow > 0 && slider <= Defaultshow * 2 && moveStep !== 1) {
               
                var srcollWidth = ($smallBox.width() + 2) * (slider - Defaultshow); //1px的border的一半
                $smallBox.animate({
                    left: "+=" + srcollWidth + "",
                }, srcollSpeed);
                slider = Defaultshow;
                //點點
                $thisDot.removeClass("dotSelect");
                $this.find(".dotCircle:nth-child(" + (slider- 2) + ")").addClass("dotSelect");
                //點點測試中
                return this;
            }
        });
        $slide_left.on('click', function() {
            if (moveStep === 1 && slider - Defaultshow > 0) {
                slider = slider - moveStep;
                self.goLeftScroll();
                $thisDot.removeClass("dotSelect");
                $this.find(".dotCircle:nth-child(" + (slider-(Defaultshow-moveStep)) + ")").addClass("dotSelect");
            }
        });

        //處理完成95%!!!!!!!!!!!!!!
        $slide_right.on('click', function() {
            if (slider + moveStep <= $smallBoxNum) {
                slider = slider + moveStep;
                self.goRightScroll(); //這裡是剛好滾完的狀態,如slide:2 show:3
                //點點
                $thisDot.removeClass("dotSelect");
                if(moveStep!==1){
                $this.find(".dotCircle:nth-child(" + (slider- 2) + ")").addClass("dotSelect");
                }else{
                 $this.find(".dotCircle:nth-child(" + (slider-(Defaultshow-moveStep)) + ")").addClass("dotSelect");   
                }
                //點點測試中
            } else if ($smallBoxNum - slider > 0) {
                var srcollWidth = ($smallBox.width() + 2) * ($smallBoxNum - slider) ; //1px的border的一半
                $smallBox.animate({
                    left: "-=" + srcollWidth + "",
                }, srcollSpeed);

                slider = slider + ($smallBoxNum - slider);
                //點點
                $thisDot.removeClass("dotSelect");
                $this.find(".dotCircle:nth-child(" + (slider- 2) + ")").addClass("dotSelect");
                //點點測試中
                return this;
            };
        });
    }
    ///正在做!!!!不要斷掉!!!!!!!
    goLeftScroll() {
        var self = this;
        var $this = this.$ele;
        var $smallBox = $this.find('.content_box2');
        var slider = this.option.count.show;
        var moveStep = this.option.count.slide;
        var Defaultshow = this.option.count.show; //show的數字不會變
        var srcollSpeed = this.option.speed * 1000;
        var srcollWidth = ($smallBox.width() + 2) * this.option.count.slide;
         $smallBox.animate({
                left: "+=" + srcollWidth + "",
            }, srcollSpeed);
        return this;
    }
    ///正在做!!!!!不要斷掉!!!
    ///塞入了this.$ele 就不會互相影響了!!!
    goRightScroll() {
        var self = this;
        var $this = this.$ele;
        var opts = this.option; 
        var $smallBox = $this.find('.content_box2');
        var slider = this.option.count.show;
        var moveStep = this.option.count.slide;
        var Defaultshow = this.option.count.show; //show的數字不會變
        var srcollSpeed = this.option.speed * 1000;
        var srcollWidth = ($smallBox.width()+2) * this.option.count.slide;
         $smallBox.animate({
                left: "-=" + srcollWidth + "",
        }, srcollSpeed); //這裡是剛好滾完的狀態,如slide:2 show:3       
        return this;
    }
    ////////////////////////////////////////////////////////////////////scroll區
    selectDot() {
        // var self = this;
        // var $this = this.$ele;
        // var opts = this.option; 
        // var $smallBoxN = $this.find(".content_box2:not(.boxHead, .null)");
        // var $smallBox = $this.find(".content_box2");
        // var $thisDot= $this.find(".dotCircle");

        // $smallBoxN.on('click', function() {
        //     $thisDot.removeClass("dotSelect");
        //     // $(".dotCircle").removeClass("dotSelect");
        //     var selectIndex = $this.find(".select").index() + 1;
        //     $this.find(".dotCircle:nth-child(" + selectIndex + ")").addClass("dotSelect");
        // });
        // return this;
    }

    whenClick(){
        var self = this;
        var $this = this.$ele;
        var opts = this.option; 
        var $smallBoxN = $this.find(".content_box2:not(.boxHead)");
        var $element=$smallBoxN;
        var $smallBox = $this.find(".content_box2");
        var whenClickCallBack=this.option.whenClick;
        $smallBoxN.click( function($element) {
            var $element=$this.find(".content_box2:not(.boxHead)");
            whenClickCallBack($element);
        });
        return this;
    }
};

export { ModuleName, ModuleDefaults, ModuleReturns, Module };