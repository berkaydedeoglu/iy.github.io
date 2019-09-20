$(document).ready(function () {


    if( $(".service_images").length ){

        $(".service_images").owlCarousel({
            items:                  1,
            autoplay:               true,
            autoplayHoverPause:     true,
            lazyLoad:               true,
            loop:                   false,
            center:                 true,
        });

    }


    if( $(window).width() > 991 ){

        setTimeout(function () {

            if( ($(window).height() - 100) > $(".categories").height() ){

                $(".categories").scrollToFixed({
                    marginTop: 30,
                    limit: function() {
                        return $("footer").offset().top - $(this).outerHeight(true) - 30;
                    },
                    zIndex: 9
                });

            }else {

                $(".categories").scrollToFixed( {

                    marginTop: function() {
                        var marginTop = $(window).height() - $(".categories").outerHeight(true) - 100;
                        if (marginTop >= 0) return 30;
                        return marginTop;
                    },
                    limit: function() {
                        return $("footer").offset().top - $(this).outerHeight(true) - 30;
                    },
                    zIndex: 9

                });

            }

        }, 1000);

    }



    //categories
    $('[data-top-id="0"]').each(function (i, e) {

        if( $('[data-top-id="'+ $(e).attr("data-id") +'"]').length > 0 ){

            $(e).children("a").addClass("sub-toggle");

        }

    });



    //insert sub categories
    $(document).on("click", ".categories .sub-toggle", function (e) {

        var id = $(this).parent("li").attr("data-id"),
            li = new String();


        $('[data-top-id="'+ id +'"]').each(function (i, e) {

            if( $('[data-top-id="'+ $(e).attr("data-id") +'"]').length )
                $(e).find("a").addClass("sub-toggle");

            li += $(e)[0].outerHTML;

        });

        if( !$(this).parent("li").children(".sub-menu").length && li.length ){

            $(this).after('<ul class="sub-menu">' + li + '</ul>');
            $(this).parent("li").children(".sub-menu").find("li").removeAttr("hidden");

        }

    });



    //sub menu open
    $(document).on("click", ".sub-toggle", function (e) {

        $('.categories [data-top-id="0"]').not($(this).closest('[data-top-id="0"]')).children(".sub-menu").removeClass("svisible");

        $(".categories .current").removeClass("current");
        $(".categories .sub-menu.svisible").siblings(".sub-toggle").addClass("current");


    });


    $('.categories [data-id] .sub-toggle').trigger("click");
    $('.categories [data-id] .sub-toggle').trigger("click");
    $('.categories [data-id] .sub-toggle').trigger("click");
    $('.categories [data-id] .sub-toggle').trigger("click");
    $('.categories [data-id] .sub-toggle').trigger("click");
    $('.categories [data-id] .sub-toggle').trigger("click");
    $('.categories [data-id] .sub-toggle').trigger("click");

    $('.categories .svisible').removeClass("svisible");

    if( $(".sub-menus").attr("current") ){

        $(".categories .current").removeClass("current");

        var sm = $('.categories [data-id="'+ $(".sub-menus").attr("current") +'"]').parents(".sub-menu");

        $(sm).each(function (i, e) {

            $(e).addClass("svisible").siblings(".sub-toggle").addClass("current");

        });

        $('.categories [data-id="'+ $(".sub-menus").attr("current") +'"] > a').addClass("current");

    }else {

        $('.categories .current').removeClass("current");
        $('.categories > ul li a:first').addClass("current");

    }


    $(".categories .current").siblings(".sub-menu").addClass("svisible");
    $(".sub-menu").siblings(".sub-toggle").append('<i class="fa fa-chevron-down arrow"></i>');



    //sub menu open
    $(document).on("click", ".sub-toggle .arrow", function (e) {

        var m = $(this).closest("li").children(".sub-menu");

        if( $(m).length ){

            if( $(m).is(":visible") ){
                $(m).slideUp(300);
            }else {
                $(m).slideDown(300);
            }

            return false;

        }


    });

});