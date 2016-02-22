window.onload=function(){
    common.initBanner();
    common.navigationEvent();
    var itemsDome = $(".leader_show .leader_items"),
        buttom = $(".return_bottom"),
        elemHeight = $("#service .apply_operations").height();

    window.onscroll = function(){
        var top = $(window).scrollTop();
        if(top>parseInt(elemHeight)){
            if(buttom.attr("data-isShow") == "false"){
                buttom.removeClass("hideBottom").addClass("showBottom"); 
                buttom.attr("data-isShow","true");
            }
        }else{
            if(buttom.attr("data-isShow") == "true"){
               buttom.removeClass("showBottom").addClass("hideBottom"); 
               buttom.attr("data-isShow","false");
            } 
        }
    }
    new Swiper('.leader_swiper', {
        slidesPerView: 'auto',
        centeredSlides: true,
        slidesOffsetBefore : 5,
        initialSlide :1,
        grabCursor: true,
        onTouchStart : function(swiper,even){
            var index = swiper.snapIndex;
            this.point = {
                x : event.changedTouches[0]["pageX"],
                clientX : event.changedTouches[0]["clientX"],
                clientY : event.changedTouches[0]["clientY"],
                y : event.changedTouches[0]["pageY"]
            };
            this.isLastOrPrev = false;
            this.isNext = false;
            this.currentDom = itemsDome.eq(index);
            this.nextDom = itemsDome.eq(index+1);
            this.prevDom = itemsDome.eq(index-1);
            if(index == 3){
                this.isLast = true;
            }else{
                this.isLast = false;
            }
            if(index == 0){
                this.isPrev = true;
            }else{
                this.isPrev = false;
            }
        },
        onTouchMove : function(swiper,even){
            var newX = event.changedTouches[0]["pageX"]- this.point.x,
                deltaX = Math.abs(newX);
            this.isMove = true;
            this.dir = EVENT.getSwipeDirection({x:event.changedTouches[0]["clientX"],y:event.changedTouches[0]["clientY"]},{x:this.point.clientX,y:this.point.clientY});
            // console.log(str);
            // if(newX<0){
            //     this.dir = "left";
            // }else{
            //     this.dir = "right";
            // }
            if(this.dir == "left"){
                $(this.nextDom).removeClass("filter");
                if(deltaX<101){
                    $(this.currentDom).css("-webkit-transform","scale("+(1-deltaX/1000)+","+(1-deltaX/1000)+")");
                    $(this.nextDom).css("-webkit-transform","scale("+(0.9+deltaX/1000)+","+(0.9+deltaX/1000)+")");
                }
            }else if(this.dir == "right"){
                $(this.prevDom).removeClass("filter");
                if(deltaX<101){
                     $(this.currentDom).css("-webkit-transform","scale("+(1-deltaX/1000)+","+(1-deltaX/1000)+")");
                     $(this.prevDom).css("-webkit-transform","scale("+(0.9+deltaX/1000)+","+(0.9+deltaX/1000)+")");
                }
            }
        },
        onTouchEnd : function(swiper,even){
            if(this.isLast && (this.dir == "left" || this.dir == "right") || this.isPrev && (this.dir == "left" || this.dir == "right")){
                $(this.prevDom).addClass("filter").addClass("scale").css({"transition-timing-function":"cubic-bezier(0.1, 0.57, 0.1, 1)","transition-duration":"200ms","-webkit-transform":"scale(0.9,0.9)"});
                $(this.nextDom).addClass("filter").addClass("scale").css({"transition-timing-function":"cubic-bezier(0.1, 0.57, 0.1, 1)","transition-duration":"200ms","-webkit-transform":"scale(0.9,0.9)"});
                $(this.currentDom).removeClass("filter").css({"transition-timing-function":"cubic-bezier(0.1, 0.57, 0.1, 1)","transition-duration":"200ms","-webkit-transform":"scale(1,1)"});  
            }else{
                if(!this.isNext){
                   if(this.dir == "left"){
                       $(this.nextDom).addClass("filter").addClass("scale").css({"transition-timing-function":"cubic-bezier(0.1, 0.57, 0.1, 1)","transition-duration":"200ms","-webkit-transform":"scale(0.9,0.9)"});
                       $(this.currentDom).removeClass("filter").css({"transition-timing-function":"cubic-bezier(0.1, 0.57, 0.1, 1)","transition-duration":"200ms","-webkit-transform":"scale(1,1)"});  
                    }else if(this.dir == "right"){
                       $(this.prevDom).addClass("filter").addClass("scale").css({"transition-timing-function":"cubic-bezier(0.1, 0.57, 0.1, 1)","transition-duration":"200ms","-webkit-transform":"scale(0.9,0.9)"});
                       $(this.currentDom).removeClass("filter").css({"transition-timing-function":"cubic-bezier(0.1, 0.57, 0.1, 1)","transition-duration":"200ms","-webkit-transform":"scale(1,1)"});  
                    }
                }else{
                    if(this.dir == "left"){
                       $(this.nextDom).removeClass("filter").addClass("scale").css({"transition-timing-function":"cubic-bezier(0.1, 0.57, 0.1, 1)","transition-duration":"200ms","-webkit-transform":"scale(1,1)"});
                       $(this.currentDom).addClass("filter").css({"transition-timing-function":"cubic-bezier(0.1, 0.57, 0.1, 1)","transition-duration":"200ms","-webkit-transform":"scale(0.9,0.9)"});  
                    }else if(this.dir == "right"){
                       $(this.currentDom).addClass("filter").addClass("scale").css({"transition-timing-function":"cubic-bezier(0.1, 0.57, 0.1, 1)","transition-duration":"200ms","-webkit-transform":"scale(0.9,0.9)"});
                       $(this.prevDom).removeClass("filter").css({"transition-timing-function":"cubic-bezier(0.1, 0.57, 0.1, 1)","transition-duration":"200ms","-webkit-transform":"scale(1,1)"});  
                    }
                }
                this.isNext = false;
            }
        },
        onSlideChangeStart : function(swiper){
            if(this.isMove){
                this.isNext = true;
                this.isMove = false; 
                if(this.isNext){
                    if(this.dir == "left"){
                        $(this.currentDom).addClass("filter");
                        $(this.nextDom).removeClass("filter");
                        $(this.currentDom).css("-webkit-transform","scale(0.9,0.9)");
                        $(this.nextDom).css("-webkit-transform","scale(1,1)");
                    }else if(this.dir == "right"){
                        $(this.currentDom).addClass("filter");
                        $(this.prevDom).removeClass("filter");
                        $(this.currentDom).css("-webkit-transform","scale(0.9,0.9)");
                        $(this.prevDom).css("-webkit-transform","scale(1,1)");
                    }
                }
            }
        }
    })

    loading.destory();
}