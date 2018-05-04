'use strict';

define('b', ['a'], function (a) {
    a();
    console.log('I am module b.');
});

