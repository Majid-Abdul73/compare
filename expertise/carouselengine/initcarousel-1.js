jQuery(document).ready(function(){
    var scripts = document.getElementsByTagName("script");
    var jsFolder = "";
    for (var i= 0; i< scripts.length; i++)
    {
        if( scripts[i].src && scripts[i].src.match(/initcarousel-1\.js/i))
            jsFolder = scripts[i].src.substr(0, scripts[i].src.lastIndexOf("/") + 1);
    }
    if ( typeof html5Lightbox === "undefined" )
    {
        html5Lightbox = jQuery(".html5lightbox").html5lightbox({
            skinsfoldername:"",
            jsfolder:jsFolder,
            barheight:64,
            showtitle:true,
            showdescription:false,
            shownavigation:false,
            thumbwidth:80,
            thumbheight:60,
            thumbtopmargin:12,
            thumbbottommargin:8,
            titlebottomcss:'{color:#333; font-size:14px; font-family:Armata,sans-serif,Arial; overflow:hidden; text-align:left;}',
            descriptionbottomcss:'{color:#333; font-size:12px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 0px 0px; padding: 0px;}'
        });
    }
    jQuery("#amazingcarousel-1").amazingcarousel({
        jsfolder:jsFolder,
     
        skinsfoldername:"",
        interval:5000,
        itembottomshadowimagetop:100,
        donotcrop:false,
        random:false,
        showhoveroverlay:false,
        rownumber:1,
       
        arrowheight:32,
        showbottomshadow:false,
        itembackgroundimagewidth:100,
        imageheight:200,
        skin:"Rotator",
        responsive:true,
        lightboxtitlebottomcss:"{ overflow:hidden; text-align:left;}",
        enabletouchswipe:true,
        navstyle:"bullets",
        backgroundimagetop:-40,
        arrowstyle:"mouseover",
        bottomshadowimagetop:100,
        hidehoveroverlayontouch:false,
        continuous:false,
        itembackgroundimagetop:0,
        hoveroverlayimage:"hoveroverlay-64-64-9.png",
        itembottomshadowimage:"itembottomshadow-100-100-5.png",
        lightboxshowdescription:false,
        
        navswitchonmouseover:false,
        showhoveroverlayalways:false,
        transitioneasing:"easeOutExpo",
        lightboxshownavigation:false,
        showitembackgroundimage:false,
        itembackgroundimage:"",
        playvideoimagepos:"center",
        circular:true,
        arrowimage:"arrows-32-32-4.png",
        scrollitems:1,
        direction:"vertical",
        lightboxdescriptionbottomcss:"{color:#333; font-size:12px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 0px 0px; padding: 0px;}",
        supportiframe:false,
        navimage:"bullet-24-24-0.png",
        backgroundimagewidth:110,
        showbackgroundimage:false,
        lightboxbarheight:64,
        showplayvideo:true,
        spacing:8,
        lightboxthumbwidth:80,
        navdirection:"vertical",
        itembottomshadowimagewidth:100,
        backgroundimage:"",
        lightboxthumbtopmargin:12,
        autoplay:true,
        lightboxnogroup:false,
        arrowwidth:32,
        transparent:false,
        continuousduration:2500,
        bottomshadowimage:"bottomshadow-110-100-5.png",
        scrollmode:"page",
        navmode:"page",
        lightboxshowtitle:true,
        lightboxthumbbottommargin:8,
        arrowhideonmouseleave:1000,
        showitembottomshadow:false,
        lightboxthumbheight:60,
        navspacing:4,
        pauseonmouseover:false,
        imagefillcolor:"FFFFFF",
        playvideoimage:"playvideo-64-64-0.png",
        transitionduration:1000,
        visibleitems:1,
        imagewidth:200,
        usescreenquery:false,
        bottomshadowimagewidth:110,
        screenquery:{
	mobile: {
		
		visibleitems: 1
	}
},
        navwidth:24,
        loop:0,
        navheight:24
    });
});