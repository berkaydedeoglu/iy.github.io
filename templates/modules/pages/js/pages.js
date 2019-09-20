$(document).ready(function () {

    var lang = $.parseJSON(window.lang);

    $(document).on("click", ".contact-button", function () {

        var form = $(this).closest("form"),
            button = $(this);

        if($(form).find('#rule') && !$(form).find('#rule').is(':checked')){
            toastr.info(lang.agreements_warning);
            return false;
        }


        //Button disabled
        $(button).prop("disabled", true);


        //Send post
        $.post($(form).attr("data-url"), $(form).serializeArray(), function (data) {

            try {

                var response = $.parseJSON(data);

                if (response.result == 1) {

                    form[0].reset();

                    $('.checks label').removeClass('active');

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


        });

});

});