var map;

var opts = {
    center: {
        lat: 51.688401,
        lng: 5.287144
    },
    zoom: 19,
    disableDefaultUI: true,
    styles: [{
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [{
            "saturation": "-1"
        }, {
            "visibility": "on"
        }]
    }, {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [{
            "saturation": "-98"
        }, {
            "gamma": "10.00"
        }, {
            "lightness": "100"
        }, {
            "hue": "#ff0000"
        }]
    }, {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [{
            "lightness": "-100"
        }]
    }, {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
            "saturation": "-100"
        }, {
            "lightness": "-100"
        }, {
            "gamma": "0.00"
        }]
    }, {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#f1efe8"
        }, {
            "saturation": "14"
        }]
    }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{
            "visibility": "on"
        }, {
            "gamma": "1.19"
        }]
    }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [{
            "visibility": "on"
        }, {
            "gamma": "0.00"
        }, {
            "weight": "2.07"
        }]
    }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
            "saturation": "-100"
        }, {
            "lightness": "-100"
        }, {
            "gamma": "0.00"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#b2ac83"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#b2ac83"
        }]
    }, {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#8ac0c4"
        }]
    }]
};

var loadLocations = function () {
    getLocations(function (locat) {
        console.log('got locat');
        console.log(locat);
        $.each(locat, function () {
            marker = new google.maps.Marker({
                icon: 'img/pokeball.png',
                position: this.latlng,
                map: map,
                pokeid: this.pokeid,
                id: this.id
            });
            link = '';
            bindInfoWindow(marker, map, this.pokeid, this.id);
        })
    })
};


function bindInfoWindow(marker, map, pokeid, id) {
    console.log('before bind id: '+ id)
    var infoWindowVisible = (function () {
        var currentlyVisible = false;
        return function (visible) {
            if (visible !== undefined) {
                currentlyVisible = visible;
            }
            return currentlyVisible;
        };
    }());
    iw = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function () {
        console.log('bind id: '+ id)
        var button = '<span class="p'
            + pokeid
            + ' sprite"></span>'
            + '<button data="'
            + id
            +'" class="btn-catchpokemon waves-effect waves-light btn-large accent-color width-50 m-b-20 animated bouncein delay-4">Catch Pokemon</button>';

        $('.modal-inner').html(button)
        $('.modal-header').html('catch pokemon')
        $('.modal').css('display','block')


//        if (infoWindowVisible()) {
//            iw.close();
//            infoWindowVisible(false);
//        } else {
//            var html = '<div style="color:#000;background-color:#fff;height:100%;width:100%;"><h4>'
//            + '</h4><button data="'
//            + pokeid
//            +'" class="btn-catchpokemon waves-effect waves-light btn-large accent-color width-50 m-b-20 animated bouncein delay-4">Catch Pokemon</button></div>';
//            iw = new google.maps.InfoWindow({
//                content: html
//            });
//            iw.open(map, marker);
//            infoWindowVisible(true);
//        }
    });
    google.maps.event.addListener(iw, 'closeclick', function () {
        infoWindowVisible(false);
    });
};



var meMarker;
var mapCenter = function (lat, lng){
    var center = new google.maps.LatLng(lat, lng);
    if(!meMarker){
        meMarker.setMap(null);
    }
    map.panTo(center);
    meMarker.setPosition(center);
}

var initMap = function () {
    map = new google.maps.Map(document.getElementById('map'), opts);
    loadLocations();
        meMarker = new google.maps.Marker({
                position: opts.center,
                map: map,
            });
    app.getCurrentPosition();
    app.watchPosition();
};
