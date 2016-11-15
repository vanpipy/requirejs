'use strict';

var date = new Date();

function onReadyEvent () {
    console.log('ready', date.getTime());
}

ready(onReadyEvent);

window.onload = function () {
    var seconds = new Date().getTime();
    console.log(seconds, seconds - date.getTime());
}
