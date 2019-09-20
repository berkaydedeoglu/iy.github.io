$(document).ready(function () {

    $(".slider").owlCarousel({
        items:                  1,
        autoplay:               true,
        autoplayTimeout:        4500,
        autoplayHoverPause:     true,
        loop:                   true,
        center:                 true,
        nav:                    true,
        navText:                ['<i class="fal fa-angle-left"></i>', '<i class="fal fa-angle-right"></i>'],
    });
    $(".slider .owl-dots").addClass("container");
    $(".logoslider").owlCarousel({
        items:                  8,
        autoplay:               false,
        dots:                   false,
        loop: true,
        nav:                    true,
        navText:                ['<i class="fal fa-angle-left"></i>', '<i class="fal fa-angle-right"></i>'],
        autoplayTimeout:        3500,
        responsive:{
            0:{
                items:1,
            },
            400:{
                items:2,
            },
            750:{
                items:4,
            },
            1150:{
                items:6,
            },
            1500:{
                items:8,
            }
        }
    });

});