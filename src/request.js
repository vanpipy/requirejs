'use strict';

var request = (function (global, root, ready, context) {
    var HEAD = root.head;
    var nodeName = 'script';

    // string -> documentElement
    function createNode (url) {
        var node = root.createElement(nodeName);
        node.src = url;
        checkLoaded(node);
        return node;
    }

    function appendToHead (node) {
        HEAD.appendChild(node);
    }

    function checkLoaded (node) {
        node._loaded = false;

        //TODO: Check valid script status - maybe need to set something or not?
        //      And set timeout error message.
        node.onload = function (event) {
            node._loaded = true;

        };
    }

    function map (array) {
        return function (todo) {
            return array.map(todo);
        };
    }

    // void
    function createReqsNode (stringKey) {
        var node = createNode(stringKey);
        appendToHead(node);
    }

    function main (reqArray) {
        return map(reqArray)(createReqsNode);
    }

    return function (reqArray) {
        ready(function() {
            main(reqArray);
        });
    };
})(window, document, ready, context);
