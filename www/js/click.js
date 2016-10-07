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

        $(".content").on("click", ".btn-login", function () {
            console.log(this);
            var elem = $(this).parent();
            var email = elem.find('input.email').val();
            var password = elem.find('input.password').val();
            console.log(elem.find('email'))
            console.log('email: ' + email+ ' password: '+password);
            postLogin(email,password);
        });
        $(".content").on("click", ".btn-logadmin", function () {
            postLogin('administrator','administrator');
        });

        $(".m-profile").on("click", function () {
            $(".content").empty();
            console.log('clickclick');
            getProfile(function(data){
                console.log(data.local)
            var ml = '<br /><br /><br /><div><b>'+data.local.email+'</b></div>'
            $(".content").html(ml);
            });

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
        $(".m-login").on("click", function () {
            $(".content").empty();
            $(".content").load("login.html");
        });
        $(".content").on("click", ".m-signup", function () {
            $(".content").empty();
            $(".content").load("signup.html");
        });


});
