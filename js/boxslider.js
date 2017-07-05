// @zzSlider
// @author Eunjoung Park
// @version 0.1
// Copyright 2015 - zzangsuni.com

(function($){
	function Zzslider(obj, options){
		this.obj = $(obj);
		this.slider = this.obj.find(options.slideFrame);
		this.slideChildren = this.slider.find("li");
		this.len = this.slideChildren.length;
		this.slideWidth = parseInt(options.slideWidth);
		this.unit = (options.slideWidth.indexOf("px") > 0)  ? "px" : "%";
		this.autoTime = options.autoTime;
		this.slideSpeed = options.slideSpeed;
		this.slideAuto = options.slideAuto;
		this.useCarousel = options.useCarousel;
		this.useDirectBtn = options.useDirectBtn;
		this.carousel = options.slideCarousel;
		this.slideLeft = options.slideLeft;
		this.slideRight = options.slideRight;
		this.carouselEl = null;
		this.carouselChild = null;
		this.slideLeftEl = null;
		this.slideRightEl = null;
		this.childWidth = null;
		this.intv = null;
		this.cnt = 0;
		this.targetCnt = 0;

		this.init();
	};

	//초기화
	Zzslider.prototype.init = function(){
		this.slider.css("width", this.len * this.slideWidth + this.unit);
		this.slideChildren.css("width", this.slideWidth / this.len + this.unit);

		//slide auto
		if(this.slideAuto){
			this.sliderAutoFunc();
		}

		//carousel
		if(this.useCarousel){
			this.appendCarousel();
		}

		//direct butto
		if(this.useDirectBtn){
			this.appendDirectBtn();
		}
	};

	//sliderAuto
	Zzslider.prototype.sliderAutoFunc = function(){
		var objThis = this;
		this.intv = setInterval(function(){
			objThis.sliderDefaultMove();
		},objThis.autoTime);
	};

	//sliderDefaultMove
	Zzslider.prototype.sliderDefaultMove = function(){
		var objThis = this;

		objThis.targetCnt = objThis.cnt +1;


		if(objThis.targetCnt >= objThis.len){
			objThis.cnt = 0;
		}else{
			objThis.cnt++;
		}

		objThis.slideChildren.filter(":first-child").after(objThis.slideChildren.eq(objThis.cnt));

		objThis.slider.not(":animated").animate({"margin-left": "-"+objThis.slideWidth + objThis.unit},objThis.slideSpeed,function(){
			objThis.slideChildren.filter(":first-child").appendTo(objThis.slider);
			objThis.slider.css("margin-left",0);
		});
		if(this.useCarousel) objThis.slideCarouselOver(objThis.cnt);
	};

	//sliderLeftMove
	Zzslider.prototype.sliderLeftMove = function(){
		var objThis = this;
		clearInterval(objThis.intv);

		if(!objThis.slider.is(":animated")){
			objThis.slideChildren.filter(":first-child").before(objThis.slideChildren.eq(objThis.targetCnt));
			objThis.slider.css("margin-left", "-" + objThis.slideWidth + objThis.unit);

			objThis.slider.not(":animated").animate({"margin-left": "0"},objThis.slideSpeed);
			objThis.cnt = objThis.targetCnt;
			if(objThis.useCarousel) objThis.slideCarouselOver(objThis.cnt);
		}
		//slideAuto Request
		if(this.slideAuto){
			objThis.sliderAutoFunc();
		}
	};

	//sliderRightMove
	Zzslider.prototype.sliderRightMove = function(){
		var objThis = this;
		clearInterval(objThis.intv);
		objThis.slideChildren.filter(":first-child").after(objThis.slideChildren.eq(objThis.targetCnt));

		objThis.slider.not(":animated").animate({"margin-left": "-="+objThis.slideWidth + objThis.unit},objThis.slideSpeed,function(){
			objThis.slideChildren.filter(":first-child").appendTo(objThis.slider);
			objThis.slider.css("margin-left",0);
			objThis.cnt = objThis.targetCnt;
			if(objThis.useCarousel) objThis.slideCarouselOver(objThis.cnt);
		});

		//slideAuto Request
		if(this.slideAuto){
			objThis.sliderAutoFunc();
		}
	};

	//slider Carousel Over
	Zzslider.prototype.slideCarouselOver = function(idx){
		this.carouselChild.removeClass("on");
		$(this.carouselChild[idx]).addClass("on");
	}

	//appendCarousel
	Zzslider.prototype.appendCarousel = function(){
		var html = '<p class="'+this.carousel+'">';
		for(var i=0;i<this.len;i++){
			html += '<a href="#"><span>'+(i+1)+'</span></a>';
		}
		html +='</p>';

		this.obj.append(html);

		this.carouselEl = this.obj.find("."+this.carousel);
		this.carouselChild = this.carouselEl.find("a");

		var objThis = this;

		//carousel click event
		this.carouselChild.on("click",function(e){
			objThis.targetCnt = objThis.carouselChild.index(this);

			if(objThis.cnt > objThis.targetCnt){
				objThis.sliderLeftMove();
			}else if(objThis.cnt <= objThis.targetCnt){
				objThis.sliderRightMove();
			}
			e.preventDefault();
		});

		this.slideCarouselOver(this.cnt);
	}

	//appendDirectBtn
	Zzslider.prototype.appendDirectBtn = function(){
		var html ='<p class="'+this.slideLeft+'"><a href="#"><span>move left</span></a></p>';
		html += '<p class="'+this.slideRight+'"><a href="#"><span>move right</span></a></p>';
		this.obj.append(html);

		var objThis = this;

		objThis.slideLeftEl = objThis.obj.find("."+objThis.slideLeft+" > a");
		objThis.slideRightEl = objThis.obj.find("."+objThis.slideRight+" > a");

		objThis.slideLeftEl.on("click",function(e){
			objThis.targetCnt = (objThis.cnt <= 0) ? objThis.len-1 : objThis.cnt - 1;
			objThis.sliderLeftMove();
			e.preventDefault();
		});

		objThis.slideRightEl.on("click",function(e){
			objThis.targetCnt = (objThis.cnt >= (objThis.len-1)) ? 0 : objThis.cnt + 1;
			objThis.sliderRightMove();
			e.preventDefault();
		});

		if(this.useCarousel){
			this.slideCarouselOver(this.cnt);
		}
	}

	//defaultOption
	slideDefaultOpt = {
		slideWrap : ".slideWrap",
		slideFrame : ".slider",
		slideCarousel : "carousel", //캐러셀 class명
		slideLeft : "directLeft", // 왼쪽화살표 class명
		slideRight : "directRight", //오른쪽화살표 class명
		slideEffect : "slide", // 효과타입 slide of fade
		slideAuto : true, // 자동슬라이드 사용유무 true of false
		autoTime : 3000, // 자동슬라이드 간격
		useCarousel : true, // 캐러셀 사용유무 true of false
		useDirectBtn : true, // 좌우방향 버튼 사용유무 true of false
		slideSpeed : 300, // 슬라이드 시간 1000 => 1초
		slideWidth : "100%" //슬라이드 너비
	};

	$.fn.zzSlider = function(optionList){
		this.each(function(idx){
			var options = $.extend(null, slideDefaultOpt, optionList[idx]);
			var slider = new Zzslider(this, options);
		});
	}
})(jQuery);
