  $(function () {
        'use strict';


        $(".content").on("tap", "li.pokeitem", function () {
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

        $(".content").on("tap", ".btn-login", function () {
            console.log(this);
            var elem = $(this).parent();

            var keeplog = {};




            var email = elem.find('input.email').val();
            var password = elem.find('input.password').val();

            if (elem.find('input.keeplog').is(':checked')) {
                keeplog = {checked: true, cred: {e: email, p: password }}
            } else {
               keeplog = {checked: false}
            }
            localStorage.setItem('keeplog', JSON.stringify(keeplog));
            console.log(elem.find('email'))
            console.log('email: ' + email+ ' password: '+password);
            postLogin(email,password);
        });
        $(".content").on("tap", ".btn-logadmin", function () {
            postLogin('administrator','administrator');
        });

        $(".m-profile").on("tap", function () {
            $(".content").empty();
            console.log('clickclick');
            getProfile(function(data){
                console.log(data.local)
            var ml = '<br /><br /><br /><div><b>'+data.local.email+'</b></div>'
            $(".content").html(ml);
            });

        });

      $('.btn-modal-close').on('tap', function() {
         $('.modal').css('display', 'none')
      });
    $('.notif-close').on('tap', function() {
         $('.notif').css('display', 'none')
      });
      $('.modal').on('click', '.btn-catchpokemon', function(){
          var id = $(this).attr('data');
          console.log('btn '+ id)
          app.getCatchPosition(id);
      });

        $('.notif').on('click', '.btn-share', function(){
          var id = $(this).attr('data');
          console.log('btn '+ id)
          var link = 'http://www.pokemon.com/us/pokedex/'+id;
          navigator.share(link,'PokeGap','plain/text')
      });

        $('.btn-logout').on('tap', function(){
           localStorage.clear();
           location.reload(true);
        });
        $(".m-home").on("tap", function () {
            $(".content").empty();
            $(".content").load("home.html");
        });
        $(".m-todo").on("tap", function () {
            $(".content").empty();
            $(".content").load("todo.html");
        });
        $(".m-pokelist").on("tap", function () {
            $(".content").empty();
            $(".content").load("pokelist.html");
        })
        $(".m-locations").on("tap", function () {
            $(".content").empty();
            $(".content").load("locations.html");
        });
        $(".m-login").on("tap", function () {
            $(".content").empty();
            $(".content").load("login.html");
        });
        $(".content").on("tap", ".m-signup", function () {
            $(".content").empty();
            $(".content").load("signup.html");
        });


});
