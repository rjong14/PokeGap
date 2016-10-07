var map;

var opts = {
    center: {
        lat: 51.688401,
        lng: 5.287144
    },
    zoom: 15,
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

//        var mapElement = document.getElementById('map');
//        var map = new google.maps.Map(mapElement, mapOptions);
//var locat = [
//    {
//        pokeid: '1',
//        latlng: {
//            lat: 51.68853980000001,
//            lng: 5.287459099999978
//        }
//                },
//    {
//        pokeid: '9',
//        latlng: {
//            lat: 51.7986066,
//            lng: 5.189319399999931
//        }
//                }
//            ];

var loadLocations = function () {
    getLocations(function (locat) {
        $.each(locat, function () {
            marker = new google.maps.Marker({
                icon: 'https://mapbuildr.com/assets/img/markers/ellipse-black.png',
                position: this.latlng,
                map: map,
                pokeid: this.pokeid
            });
            rectangle = new google.maps.Rectangle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                bounds: {
                    north: this.latlng.lat,
                    south: this.endlatlng.lat,
                    east: this.endlatlng.lng,
                    west: this.latlng.lng
                }
            });

            link = '';
            bindInfoWindow(marker, map, this.pokeid);
        })
    })
};


function bindInfoWindow(marker, map, pokeid) {
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
        if (infoWindowVisible()) {
            iw.close();
            infoWindowVisible(false);
        } else {
            var html = "<div style='color:#000;background-color:#fff;padding:5px;width:150px;'><h4>" + pokeid + "</h4></div>";
            iw = new google.maps.InfoWindow({
                content: html
            });
            iw.open(map, marker);
            infoWindowVisible(true);
        }
    });
    google.maps.event.addListener(iw, 'closeclick', function () {
        infoWindowVisible(false);
    });
};

var initMap = function () {
    map = new google.maps.Map(document.getElementById('map'), opts);
    loadLocations();
};
