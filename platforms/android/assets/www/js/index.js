var app = {
    locid: 0,
    // geo options
    geoOpts: { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true },
    // on err
    onError: function (err){
          alert('code: '    + err.code    + '\n' +
          'message: ' + err.message + '\n');
    },
    onSuccess: function(position){
        var myLat = position.coords.latitude;
        var myLong = position.coords.longitude;
        mapCenter(myLat,myLong);
    },
    onCatch: function(position){
        console.log('oncatch '+ this.locid)
        var latlng = {lat: position.coords.latitude, lng: position.coords.longitude, id: this.locid};
        catchPokemon(latlng);
    },
    getCurrentPosition: function(){
        navigator.geolocation.getCurrentPosition(this.onSuccess,this.onError,this.geoOpts);
    },
    getCatchPosition: function(id){
        locid = id;
        console.log('get id: '+id+' locid: '+ this.locid);
        navigator.geolocation.getCurrentPosition(this.onCatch,this.onError,this.geoOpts);
    },
    watchPosition: function(){
      navigator.geolocation.watchPosition(this.onSuccess,this.onError,this.geoOpts);
    },
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    }, // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }, // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
            if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#b54543");
    }
    }, // Update DOM on a Received Event
    receivedEvent: function (id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();
