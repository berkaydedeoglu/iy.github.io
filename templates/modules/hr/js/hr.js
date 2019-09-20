$(document).ready(function (e) {

    $('[name="phone"]').mask("0 (999) 999-9999");

    $(".map").each(function (i, e) {

        maps(e, $(e).attr("location"));

    });

    $(document).on("click", ".contact-button", function () {

        var form = $(this).closest("form"),
            button = $(this);


        //Button disabled
        $(button).prop("disabled", true);

        
        //Send post
        $.post($(form).attr("data-url"), $(form).serializeArray(), function (data) {

            try {

                var response = $.parseJSON(data);

                if (response.result == 1) {

                    form[0].reset();

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