




$(function() {
    var header = $(".gridContainer");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 500) {
            header.removeClass('agencybody').addClass("tagencynone");
        } else {
            header.removeClass("agencynone").addClass('agencybody');
        }
    });
});



$(function() {
    var header = $(".euphratesvideo");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 500) {
            header.removeClass('ev-showvideo').addClass("ev-novideo");
        } else {
            header.removeClass("ev-novideo").addClass('ev-showvideo');
        }
    });
});




