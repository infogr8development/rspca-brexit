(function() {
    var animatedGifs = [];
    $('.gifAnim').each(function(i){
        
        var sup1 = new SuperGif({ gif: this, on_end: function(){ sup1.pause(); }, progressbar_height: 0 } );
        sup1.load();
        var animObj = {
            sup: sup1,
            id: this.id
        }
        animatedGifs.push(animObj);

    })
    console.log(animatedGifs);
    
    $(window).scroll(function() {
        var div1 = $(".triggerP");
        var div1_left = div1.offset().left;
        var div1_right = div1_left + div1.width();
        var div2;

        for(var i = 0; i < animatedGifs.length; i++){
            div2 = $("#" + animatedGifs[i].id);
            var div2_left = div2.offset().left;
            var div2_right = div2_left + div2.width();
            
            if (div1_right >= div2_left && div2.attr("data-played") === "false") {
                // overlapped
                animatedGifs[i].sup.play();
                div2.attr("data-played", "true");
            }
        }

        /*var div3 = $('.indoor');
        
        var div3_left = div3.offset().left;
        var div3_right = div3_left + div3.width();
        //console.log(div1_right >= div3_left);
        if (div1_right >= div3_left && div3.attr("data-played") === "false") {
            // overlapped
            //console.log("oeoeo");
            $( "body" )
                .animate({
                    opacity: 0,
                }, 200, function() {
                  $('html, body').animate({
                        scrollLeft: $(".indoor").offset().left
                    }, 10, function(){
                        console.log("COMPLETE");
                        $( "body" ).animate({ opacity: 1 }, 500)
                    })});
            
            div3.attr("data-played", "true");
        }*/


    })

}());