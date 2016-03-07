$(function () {
    'use strict';

    $(".m-home").on("click", function () {
        $(".content").empty();
        $(".content").load("home.html");
    });

    $(".m-todo").on("click", function () {
        $(".content").empty();
        $(".content").load("todo.html");
    });
    $(".content").on("click", ".open-left", function () {
        console.log("menu");
    });


});
