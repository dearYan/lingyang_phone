$(function(){
       var windowS = window.screen.height,
           windowH = $(window).height(),
        elemHeight = $("#index .section4").height(),
        headerStyle = window.getComputedStyle($(".header_container")[0], null),
        sectionStyle = window.getComputedStyle($(".index_container .section1")[0], null),
        headerH = headerStyle.height,
        buttom = $(".return_bottom"),
        sectionMargintop = sectionStyle.marginTop,
        sectionMarginBottom = sectionStyle.marginBottom,
        ua = navigator.userAgent.toUpperCase(),
        sectionHeight;
        if( ua.indexOf('ANDROID') != -1){
            sectionHeight = parseInt(windowH) - parseInt(headerH) - parseInt(sectionMargintop) - parseInt(sectionMarginBottom);
        }else{
            sectionHeight = parseInt(windowS) - parseInt(headerH) - parseInt(sectionMargintop) - parseInt(sectionMarginBottom)-108;
        }
        // alert("windowH:"+windowH);
        // alert("headerH:"+headerH);
        // alert("windowS:"+windowS);
        // alert("sectionHeight:"+sectionHeight);
        $(".section1").height(sectionHeight);
    //    alert($(".section1").height());
        
        var services = new Swiper ('.servicesIndicators', {
            autoplay: 3000,
            grabCursor: true,
            speed:600,
            loop: true,
            isContinueAutoplay : true,
            pagination: '.swiper-pagination'
        });

        var apply = new Swiper ('.applyServices', {
            autoplay: 3000,
            grabCursor: true,
            speed:600,
            loop: true,
            isContinueAutoplay : true,
            pagination: '.swiper-pagination'
        });

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
})
window.onload = function(){
	common.initBanner();
     
	loading.destory();
}