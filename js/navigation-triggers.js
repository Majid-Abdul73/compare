




$(function() {
    var header = $(".logotext-seen");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 300) {
            header.removeClass('logotext-seen').addClass("logotext-off");
        } else {
            header.removeClass("logotext-off").addClass('logotext-seen');
        }
    });
});



$(function() {
    var header = $(".logo");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 300) {
            header.removeClass('logo-normal').addClass("logo-small");
        } else {
            header.removeClass("logo-small").addClass('logo-normal');
        }
    });
});





$(function() {
    var header = $(".top");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 300) {
            header.removeClass('top-normal').addClass("top-onscroll");
        } else {
            header.removeClass("top-onscroll").addClass('top-normall');
        }
    });
});











$(function() {
    var header = $(".case-highlight");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 300) {
            header.removeClass('case-up').addClass("case-down");
        } else {
            header.removeClass("case-down").addClass('case-up');
        }
    });
});















$(document).ready(function(){
                $(".trigger-navpopup").click(function(){
                    $(".navpopup").css("right", "0");
                });
    
                $(".close-navpopup").click(function(){
                    $(".navpopup").css("right", "-100vw");
                });

});



 $(".").toggle();










