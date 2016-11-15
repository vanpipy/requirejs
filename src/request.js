'use strict';


var request = (function (global) {
    var nodeName = 'script';

    function createNode () {
        return document.createElement(nodeName);
    }

    function listenEvent (node) {
        node.onload = function (event) {
            node._loaded = true;
        }
    }
})(window);
