var makeNofif = function (txt, err) {
    var html = '';
    if(err){
       html = '<p class="err">' + txt + '</p>';
    }else{
        html = '<p class="ok">' + txt + '</p>';
    }

    $('.notif-content').html(html);
    $('.notif').css('display', 'block')

}

var doTokenShit = function () {
    var token = window.localStorage.getItem('token');

    if (token) {
        $.ajaxSetup({
            headers: {
                'token': token
            }
        });
    }
}

var doEachPoke = function(poke, cb) {
            var listContent = '';
            var pkeNR = 0;
                $.each(poke, function () {
                pkeNR++;
                listContent += '<li class="animated fadeinright delay-1 pokeitem" data-pokemon="' + this.pokeid + '"><div class="collapsible-header"><i class="ion-android-more-vertical right"></i>' + this.pokeid + ' - ' + this.name + '<span class="right"></span></div><div class="collapsible-body"><p>LOADING</p></div></li>';
            });
    cb(listContent);
}

var doIndex = function () {
    var user = JSON.parse(localStorage.getItem('user'))
    var kl = JSON.parse(localStorage.getItem('keeplog'));

    if(kl.checked == true){
        // Check
        $(".o-keep input").prop("checked", true);
    }else{
    }
    $('.o-email').html(user.local.email)
    $('.o-pokemon').html(Object.keys(user.pokemon).length)
    if (user.role = '56f1c852b40dfc085518788b') {
        $('.isAdmin').html('USER IS ADMIN!!')
    }

}

var toggleloggedin = function (elem) {
    console.log(elem)
    var kl = JSON.parse(localStorage.getItem('keeplog'));
    if(elem.is(':checked')){
        kl.checked = false;
        console.log('unchecked')
    }else{
        kl.checked = true;
        console.log('checked')
    }

    localStorage.setItem('keeplog', JSON.stringify(kl));
    var klnew = JSON.parse(localStorage.getItem('keeplog'));
    console.log(klnew.checked)

}

var checkloggedin = function () {
    console.log('check')
    var kl = JSON.parse(localStorage.getItem('keeplog'));

    if (kl.checked == true) {
        console.log('checked')
        postLogin(kl.cred.e, kl.cred.p);
    } else {
        localStorage.clear();
        location.reload(true);
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
            detailhtml += '<ul><li>Name : ' + data.name + '</li><span class="p' + pokemon + ' sprite"></span>' + '<li>Weight : ' + data.weight + '</li></ul><h5>types :</h5><ul>';

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

var postLogin = function (e, p) {
    $.post("https://apipoke.herokuapp.com/api/token", {
        email: e,
        password: p
    }).done(function (data) {
        console.log(data.data)
        console.log('user: ' + data.data.user._id)
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data.user))
        doTokenShit();
        doIndex();
        $('.toolbar').removeClass('hide');
        $('.side-nav').removeClass('hide');
        $(".content").empty();
        $(".content").load("home.html");
    }).fail(function (err) {
        makeNofif('no login biotch', err)
    });
}

var catchPokemon = function (latlng) {
    var user = JSON.parse(localStorage.getItem('user'));
    console.log(user.id);
    console.log(latlng);
    $.post("https://apipoke.herokuapp.com/api/users/" + user._id + "/location/", latlng).done(function (data) {
        console.log('aftercatch')
        console.log(data);
        if (data.data.pokeid == null){
            makeNofif('no poke 404', {message:'error no poke found'})
        }else{
            var note ='<p>You caught pokemon number: ' +data.data.pokeid+ '</p><button class="btn-share" data="' + data.data.pokeid + '">Share</button><a href="http://www.pokemon.com/us/pokedex/'+data.data.pokeid+'">link</a>';
            makeNofif(note);
        }
        localStorage.removeItem('mypokemon');
    }).fail(function (err) {
        makeNofif('no poke 500', err)
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
};

var getProfile = function (cb) {
    $.getJSON('https://apipoke.herokuapp.com/api/profile', function (data) {

        console.log(data);
        cb(data.data);
    });
};

var getHome = function (cb) {
    $.getJSON('https://apipoke.herokuapp.com/api/profile', function (data) {

        var user = JSON.parse(localStorage.getItem('user'))
        console.log('user');
        console.log(user._id);
        var pokecount = 'you have: ' + Object.keys(data.data.pokemon).length + ' Pokemon'
        var elem = $('.content')

        elem.find(".email").empty()
        elem.find(".email").html(data.data.local.email)
        var mypokemon = JSON.parse(localStorage.getItem('mypokemon'));
        if (mypokemon === null || mypokemon.length === 0){
        $.getJSON('https://apipoke.herokuapp.com/api/users/' + user._id + '/pokemon', function (data) {
            console.log(data)
            mypokemon = data.data;


              doEachPoke(mypokemon, function(listContent){
                    $('.pokelist').html(listContent);
                })
              localStorage.setItem('mypokemon', JSON.stringify(mypokemon));

            elem.find('.pokecount').empty()
            elem.find('.pokecount').html(pokecount)

        });
            }else{
                doEachPoke(mypokemon, function(listContent){
                    $('.pokelist').html(listContent);
                    elem.find('.pokecount').empty()
                    elem.find('.pokecount').html(pokecount)
                })
            }
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
