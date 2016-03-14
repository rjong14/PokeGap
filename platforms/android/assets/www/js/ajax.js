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

    var allPokemon = function () {
        var listContent = '';
        var pkeNR = 0;

        $.getJSON('https://pokeapi.co/api/v2/pokemon', function (data) {
            $.each(data.results, function () {
                pkeNR++;
                listContent += '<li class="animated fadeinright delay-1 pokeitem" data-pokemon="' + pkeNR + '"><div class="collapsible-header"><i class="ion-android-more-vertical right"></i>' + pkeNR + ' - ' + this.name + '</div><div class="collapsible-body"><p>lorem</p></div></li>';
            });

            $('.pokelist').html(listContent);
        });

    }
