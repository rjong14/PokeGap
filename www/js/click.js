    $(function () {
        'use strict';

        $(".content").on("click", "li.pokeitem", function () {
            console.log(this);
            var elem = $(this);
            var css = elem.find(".collapsible-body").css("display");
            console.log(css);
            if (css == "none") {
                var pokemon = elem.attr("data-pokemon");
                getPokemon(pokemon, elem);

                elem.toggleClass("active");
                elem.find(".collapsible-body").css("display", "block");
            } else {
                elem.toggleClass("active");
                elem.find(".collapsible-body").css("display", "none");
            }
        });

        $(".m-home").on("click", function () {
            $(".content").empty();
            $(".content").load("home.html");
        });
        $(".m-todo").on("click", function () {
            $(".content").empty();
            $(".content").load("todo.html");
        });
        $(".m-pokelist").on("click", function () {
            $(".content").empty();
            $(".content").load("pokelist.html");
        })
        $(".m-locations").on("click", function () {
            $(".content").empty();
            $(".content").load("locations.html");
        });


    });
