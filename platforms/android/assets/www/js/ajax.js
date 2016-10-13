var makeNofif = function(txt){
     var html = '<div class="notification notification-danger"><p>Error</p><span>'+txt+'</span></div>';

     $('.notif').html(html);

 }

 var doTokenShit = function(){
        var token = window.localStorage.getItem('token');

        if (token) {
            $.ajaxSetup({
                headers: {
                    'token': token
                }
            });
        }
 }

 // AJAX
var getPokemon = function (pokemon, elem) {
        console.log("pokemon");
        if (pokemon == undefined) {
            pokemon = '1';
        }
        var call_url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;
        console.log("2");
        console.log(call_url);

        var detailhtml = "";

        $.getJSON(call_url, function (data) {
                console.log("json");
                console.log(data.name);
                detailhtml += '<ul><li>Name : ' + data.name + '</li><li>Weight : ' + data.weight + '</li></ul><h5>types :</h5><ul>';
                $.each(data.types, function () {
                    detailhtml += '<li>' + this.type.name + '</li>';
                });
                detailhtml += '</ul>'
            })
            .done(function () {

                elem.find(".collapsible-body").empty();
                elem.find(".collapsible-body").html(detailhtml);
            });
}

var getCatch = function (pokemon) {
        console.log("pokemon");
        if (pokemon == undefined) {
            return;
        }
        var call_url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;

        var detailhtml = "";

        $.getJSON(call_url, function (data) {
                console.log("json");
                console.log(data.name);
                detailhtml += '<ul><li>Name : ' + data.name + '</li><li>Weight : ' + data.weight + '</li></ul><h5>types :</h5><ul>';
                $.each(data.types, function () {
                    detailhtml += '<li>' + this.type.name + '</li>';
                });
                detailhtml += '</ul>'
            })
            .done(function () {

                elem.find(".collapsible-body").empty();
                elem.find(".collapsible-body").html(detailhtml);
            });
}

var postLogin = function (e,p){
        $.post( "https://apipoke.herokuapp.com/api/token", { email: e, password: p } ).done(function (data){
            console.log(data.data)
            console.log('id: '+data.data.id)
            localStorage.setItem('token',data.data.token)
            localStorage.setItem('uid',data.data.id)
            doTokenShit();
            $('.toolbar').removeClass('hide');
            $(".content").empty();
            $(".content").load("home.html");
        }).fail(function() {
    makeNofif('no login biotch')
  });
    }

var catchPokemon = function (latlng){
    var uid = window.localStorage.getItem('uid');
    console.log(uid);
    console.log(latlng);
        $.post( "https://apipoke.herokuapp.com/api/users/"+uid+"/location/", latlng).done(function (data){

        }).fail(function() {
    makeNofif('no poke biotch')
  });
}

    var allPokemon = function () {
        var listContent = '';
        var pkeNR = 0;
        console.log('get all the pokemon')
        $.getJSON('https://pokeapi.co/api/v2/pokemon', function (data) {
            $.each(data.results, function () {
                pkeNR++;
                listContent += '<li class="animated fadeinright delay-1 pokeitem" data-pokemon="' + pkeNR + '"><div class="collapsible-header"><i class="ion-android-more-vertical right"></i>' + pkeNR + ' - ' + this.name + '</div><div class="collapsible-body"><p>LOADING</p></div></li>';
            });

            $('.pokelist').html(listContent);
        });

}
    var getProfile = function (cb) {
        $.getJSON('https://apipoke.herokuapp.com/api/profile', function (data) {

            console.log(data);
            cb(data.data);
        });
    };

    var getHome = function (cb) {
        $.getJSON('https://apipoke.herokuapp.com/api/profile', function (data) {

            var uid = localStorage.getItem('uid')
            var pokecount = 'you have: '+ Object.keys(data.data.pokemon).length +' Pokemon'
            var elem = $('.content')

            elem.find(".email").empty()
            elem.find(".email").html(data.data.local.email)

            $.getJSON('https://apipoke.herokuapp.com/api/users/'+uid+'/pokemon', function (data) {
                console.log(data)
                var listContent = '';
                var pkeNR = 0;
                $.each(data.data, function () {
                pkeNR++;
                listContent += '<li class="animated fadeinright delay-1 pokeitem" data-pokemon="' + this.pokeid + '"><div class="collapsible-header"><i class="ion-android-more-vertical right"></i>' + this.pokeid + ' - ' + this.name + '<span class="right">'+ this.caught_at +'</span></div><div class="collapsible-body"><p>LOADING</p></div></li>';
            });

            $('.pokelist').html(listContent);

            elem.find('.pokecount').empty()
            elem.find('.pokecount').html(pokecount)

            });

        });
    };

    var getLocations = function (cb) {
        var locat = [];
        var c = 0;
        $.getJSON('https://apipoke.herokuapp.com/api/locations', function (data) {
            $.each(data.data, function () {
                locat.push({
                    id: this._id,
                    pokeid: this.pokeid,
                    latlng: this.latlng
                })
                console.log(locat);

            })
            console.log(locat)
            console.log(locat)
            cb(locat);

        });

    };

    var getApi = function () {
        var listContent = '';
        $.getJSON('https://apipoke.herokuapp.com/api/', function (data) {
            console.log(data);
            listContent = data

            $('.divcontent').html(listContent);
        });

    };
