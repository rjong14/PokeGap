$(function () {
    'use strict';


    var sessionId = localStorage.getItem('myCookieName');

    // if there was no localStorage for the session id
    // the application is being run for the first time
    // the session id must be created
    if (!sessionId) {
         console.log("no session set");
        sessionId = uuid.v4();
        console.log("new sess:" + sessionId);
        localStorage.setItem('myCookieName', sessionId);
    }

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {

        // if there is data being sent
        // add the sessionId to it
        if (options.data) {
            options.data += '&sessionId=' + sessionId;
        }

        // if there is no data being sent
        // create the data and add the sessionId
        else {
            options.data = 'sessionId=' + sessionId;
        }

    });


});
