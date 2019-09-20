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


function maps(element, coordinates) {

    var LatLng = coordinates.split(", ");

    var location = {lat: parseFloat(LatLng[0]), lng: parseFloat(LatLng[1])};

    var map = new google.maps.Map(element, {
        zoom: 10,
        center: location,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ]
    });

    var marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.BOUNCE,
        icon: {

            url: window.base + "templates/images/map-marker.svg",
            scaledSize: new google.maps.Size(64, 64)

        }
    });

    google.maps.event.addListener(marker, 'click', function() {
        window.open("https://www.google.com/maps?daddr=" + parseFloat(LatLng[0]) + "," + parseFloat(LatLng[1]), "_blank");
    });

}