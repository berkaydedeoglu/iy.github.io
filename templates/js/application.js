$(document).ready(function (e) {


    //variables
    var lang = $.parseJSON(window.lang);
    var ajaxUrl = window.home + "ajax/ajax.php";


    //external links
    $('a[rel="external"]').click(function () {

        window.open($(this).attr('href'));
        return false;

    });


    //dropdown
    $(".dropdown-toggle").dropdown({
        "boundary": "viewport"
    });


    //dropdown mobile
    if( $(window).width() < 991 ){
        $('.dropdown-caret').addClass('dropdown-toggle');
        $('.dropdown-toggle').dropdown();
    }


    //SVG to element
    $(".svg2e").each(function () {

        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function (data) {

            var $svg = jQuery(data).find('svg');

            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }

            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            $svg = $svg.removeAttr('xmlns:a');
            $img.replaceWith($svg);

        }, 'xml');

    });


    //share popup
    $(document).on("click", ".share > a[href^='http']", function () {

        var width = 600,
            height = 400,
            left = (screen.width / 2) - (width / 2);

        window.open($(this).attr("href"), null, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + width + ", height=" + height + ", top=200, left=" + left);

        return false;

    });


    //linkless
    $('a[href="#"]:not([class])').click(function () {

        return false;

    });


    //category text scrollbar
    if (window.device == "desktop") {

        $(".category-text .inner").css({
            "margin-right": parseFloat(scrollbarWidth() * -1),
            "padding-right": scrollbarWidth(),
            "overflow-y": "scroll",
        });

    }


    //active navigation menu
    $(".navbar-nav a[href='" + document.location.href + "']").parent("li").addClass("active");


    //toastr
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "100",
        "hideDuration": "100",
        "timeOut": "10000",
        "extendedTimeOut": "100",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }


    //jscroll
    if ($(".jscroll").length > 0) {

        var ias = $.ias({

            container: 'section',
            item: '.jcontent',
            pagination: '.pager',
            next: '.next a',
            delay: 700

        });

        ias.extension(new IASSpinnerExtension({
            src: '<i class="fa fa-refresh fa-spin"></i>',
        }));

        ias.extension(new IASTriggerExtension({
            offset: 3,
            text: lang.load_more_label,
        }));

    }


    //current ajax form
    $(document).off("click", ".ajax-form button[type='submit']").on("click", ".ajax-form button[type='submit']", function () {

        window.form = $(this).closest(".ajax-form")[0];

    });


    //ajax form
    var button = $(".ajax-form").find("button");

    $(".ajax-form").ajaxForm({

        beforeSend: function () {
            button.prop("disabled", true);
        },

        error: function () {
            toastr.error(lang.an_error);
            button.prop("disabled", false);
        },

        success: function (data) {

            try {

                var response = $.parseJSON(data);

                if (response.result == 1) {

                    if (!$(form).attr("form-reset")) form.reset();

                    toastr.success(response.text);

                } else {

                    $.each(response, function (key, element) {

                        toastr.error(element.text);

                    });

                }

                setTimeout(function () {

                    button.prop("disabled", false);

                }, 1500);

            } catch (error) {

                toastr.error(lang.an_error);

                setTimeout(function () {

                    button.prop("disabled", false);

                }, 1500);

            }

        },

    });

    /* Swiper */
    /*
    var swiper   = $(".swiper"),
        topos    = $(".swiper-reference").position().top;

    swiper.css({
        "top": (topos + 30) + "px"
    });
    */

}); //doc ready end


var forEach = function (t, o, r) {
    if ("[object Object]" === Object.prototype.toString.call(t)) for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t); else for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t)
};
var hamburgers = document.querySelectorAll(".hamburger");
if (hamburgers.length > 0) {
    forEach(hamburgers, function (hamburger) {
        hamburger.addEventListener("click", function () {
            this.classList.toggle("is-active");
        }, false);
    });
}


function _reload(timeout) {

    setTimeout(function () {
        window.location.reload();
    }, timeout);

}


function scrollbarWidth() {

    //vars
    var o = $('<div>').css({visibility: "hidden", width: 100, overflow: "scroll"}).appendTo("body"),
        w = $('<div>').css({width: '100%'}).appendTo(o).outerWidth();

    //remove
    o.remove();

    //width
    return 100 - w;

}

$('.hamburger').click(function(){
   $('header').toggleClass('show');
});

$("#overformopen").click(function(e){
    overform("show");
    $('body').addClass('scrollspy');
});

$(".closeoverform").click(function(){
    overform("hide");
    $('body').removeClass('scrollspy');
});

$(document).keyup(function (e) {
    if(e.which == "27") {
        overform("hide");
    }
});

function overform(action) {

    var objs = $("header, footer, .page-header, .page.manufacturers");

    if(typeof action === "undefined" || action == "show") {
        objs.hide();
        $(".overform").fadeIn("fast");
    }

    if(action == "hide") {
        $(".overform").hide();
        objs.fadeIn();
    }

}

$('.typic-radio .radio label').click(function () {
   $('.typic-radio .radio label').removeClass("active");
   $(this).addClass('active');
});

$('.checkbox-group .checks label').click(function () {
    $(this).toggleClass('active');
});

$('#search-button').click(function(){
   $(this).parent().find('.search-form').toggleClass('active');
});

$(function(){
    var sizeGet = $(window).innerWidth();
    if(sizeGet > 768){
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            var total = 0;
            if(scroll > total){
                if(!$('header').hasClass("sticky")){
                    $('header').addClass('sticky');
                }
            } else {
                if($('header').hasClass("sticky")){
                    $('header').removeClass('sticky');
                }
            }
        });
    }
});

$("#go-top").click(function () {
    $('html,body').animate({scrollTop: 0}, 2000, 'swing');
});


//HEXAGON
$(function () {
   if($(window).innerWidth() >= 993){
       $('#hexagon .hexagon').click(function () {
           var getImg = $(this).find('.inputs').find('.relatible').find('img').attr('src');
           $(this).find('.inputs').find('.val4').val(getImg);
           var val1 = $(this).find('.inputs').find('.val1').val();
           var val2 = $(this).find('.inputs').find('.val2').val();
           var val3 = $(this).find('.inputs').find('.val3').val();
           var val4 = $(this).find('.inputs').find('.val4').val();
           var val5 = $(this).find('.inputs').find('.val5').val();
           var val6 = $(this).find('.inputs').find('.val6').val();
           $('#hexval1').html(val1);
           $('#hexval2').html(val2);
           $('#hexval3').html(val3);
           $('#hexval4').attr('src', val4);
           $('#hexval5').html(val5);
           $('#coloredOveredBox').removeClass('blue');
           $('#coloredOveredBox').removeClass('purple');
           $('#coloredOveredBox').removeClass('grey');
           $('#coloredOveredBox').removeClass('yellow');
           $('#coloredOveredBox').removeClass('purple-light');
           $('#coloredOveredBox').removeClass('brown');
           $('#coloredOveredBox').removeClass('pink');
           $('#coloredOveredBox').removeClass('orange');
           $('#coloredOveredBox').addClass(val6);
           $('.hexapopup').toggleClass('show');
       });
       $('.hexapopup .overpop').click(function () {
           $('.hexapopup').toggleClass('show');
       });
   } else {
       $('#hexagon .hexagon').click(function () {
           $('#hexagon .hexagon').not(this).removeClass('open');
           $('#hexagon .hexagon').not(this).find('.inputs').slideUp();
           $(this).find('.inputs').slideToggle();
           $(this).toggleClass('open');
       });
   }
});
//MANAGEMIND
$(function () {
   if($(window).innerWidth() >= 993){
       $('#mmhexagon .blue-box').click(function () {
           var getImg = $(this).find('.relatible').find('img').attr('src');
           $(this).find('.inputs').find('.val4').val(getImg);
           var val1 = $(this).find('.inputs').find('.val1').val();
           var val2 = $(this).find('.inputs').find('.val2').val();
           var val3 = $(this).find('.inputs').find('.val3').val();
           var val4 = $(this).find('.inputs').find('.val4').val();
           var val5 = $(this).find('.inputs').find('.val5').val();
           $('#hexval1').html(val2);
           $('#hexval2').html(val1);
           $('#hexval3').html(val3);
           $('#hexval4').attr('src', val4);
           $('#hexval5').html(val5);
           $('.hexapopup').toggleClass('show');
       });
       $('.hexapopup .overpop').click(function () {
           if($('.hexapopup').hasClass('show')){
               $('.hexapopup').removeClass('show');
           }
       });
   } else {
       $('#mmhexagon .blue-box').click(function () {
           $('#mmhexagon .blue-box').not(this).removeClass('open');
           $('#mmhexagon .blue-box').not(this).find('.relatible').slideUp();
           $(this).find('.relatible').slideToggle();
           $(this).toggleClass('open');
       });
   }
});
//APISCOVEN
$(function () {
    $('.workflow .flowbtn').click(function () {
        var getImg = $(this).find('.relatible').find('img').attr('src');
        $(this).find('.inputs').find('.val4').val(getImg);
        var val1 = $(this).find('.inputs').find('.val1').val();
        var val2 = $(this).find('.inputs').find('.val2').val();
        var val3 = $(this).find('.inputs').find('.val3').val();
        var val4 = $(this).find('.inputs').find('.val4').val();
        var val5 = $(this).find('.inputs').find('.val5').val();
        $('#hexval1').html(val2);
        $('#hexval2').html(val1);
        $('#hexval3').html(val3);
        $('#hexval4').attr('src', val4);
        $('#hexval5').html(val5);
        $('.hexapopup').toggleClass('show');
    });
    $('.hexapopup .overpop').click(function () {
        if($('.hexapopup').hasClass('show')){
            $('.hexapopup').removeClass('show');
        }
    });
});
//IMT
$(function () {
    $('.imtbox .item').click(function () {
        var getImg = $(this).find('.relatible').find('img').attr('src');
        $(this).find('.inputs').find('.val4').val(getImg);
        var val1 = $(this).find('.inputs').find('.val1').val();
        var val2 = $(this).find('.inputs').find('.val2').val();
        var val3 = $(this).find('.inputs').find('.val3').val();
        var val4 = $(this).find('.inputs').find('.val4').val();
        var val5 = $(this).find('.inputs').find('.val5').val();
        var val6 = $(this).find('.inputs').find('.val6').val();
        $('#coloredOveredBox').removeClass('blue');
        $('#coloredOveredBox').removeClass('purple');
        $('#coloredOveredBox').removeClass('grey');
        $('#coloredOveredBox').removeClass('yellow');
        $('#coloredOveredBox').removeClass('purple-light');
        $('#coloredOveredBox').removeClass('brown');
        $('#coloredOveredBox').removeClass('pink');
        $('#coloredOveredBox').removeClass('orange');
        $('#coloredOveredBox').addClass(val6);
        $('#hexval1').html(val2);
        $('#hexval2').html(val1);
        $('#hexval3').html(val3);
        $('#hexval4').attr('src', val4);
        $('#hexval5').html(val5);
        $('.hexapopup').toggleClass('show');
    });
    $('.hexapopup .overpop').click(function () {
        if($('.hexapopup').hasClass('show')){
            $('.hexapopup').removeClass('show');
        }
    });
});

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function ($) {
    var pluses = /\+/g;
    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }
    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }
    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }
    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }
    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }
    var config = $.cookie = function (key, value, options) {
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }
            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '',
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }
        var result = key ? undefined : {};
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');
            if (key && key === name) {
                result = read(cookie, value);
                break;
            }
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    };
    config.defaults = {};
    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };
}));
$(".close-cookie-warning").on("click", function() {
    $.cookie('HideCookieMessage', 'true', { expires: 120, path: '/'});
    $('div.cookies').hide();
});
(function ($) {
    if ($.cookie('HideCookieMessage')) { $('.cookies').hide(); } else {
        $('.cookies').show(); }
})(jQuery);


$(function () {
   $('#refToggler a').click(function (e) {
      e.preventDefault();
      var dataid = $(this).attr('data-id');
      if(dataid == "all"){
          $('#refContents').find('.item').show();
      } else {
          $('#refContents').find('.item').hide();
          $('#refContents').find('.cont'+dataid).show();
      }
   });
});

$("li.dropdown").mouseleave(function(){
    $(".dropdown").removeClass("show");
    $(".dropdown").removeClass("active");
    $(".dropdown-menu").removeClass("show");
});

$('.sitemapmain > ul > li > .dropsite').click(function (e) {
    e.preventDefault();
   $(this).parent().find('.sitemap').slideToggle();
   $(this).find('i').toggleClass('fa-plus');
   $(this).find('i').toggleClass('fa-minus');
});

/* Go element position */
function gopos(obj, top, speed) {

    var elem,toppos;

    if(speed == "") {
        speed = "slow";
    }

    if($("#" + obj).length > 0) {
        elem = $("#" + obj);
    }
    else if($("." + obj).length > 0) {
        elem = $("." + obj);
    }
    else if(obj.length > 0) {
        elem = obj;
    }
    else {
        return false;
    }

    if(top) {
        toppos = elem.offset().top - top;
    }
    else {
        toppos = elem.offset().top;
    }

    $("html, body").animate({
        scrollTop : toppos
    }, speed, function() {
        // Animation complete
    });

}

if($(window).innerWidth() < 768){
    $('.nav-item .dropdown-toggle').click(function(){
       var getTop = $(this).offset().top;
       $(window).scrollTop(getTop - 50);
    });
}