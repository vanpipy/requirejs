'use strict';

var requestConfig;
var request = (function (global, root, ready, context, config) {
    var HEAD = root.head;

    var _urls = config.urls;
    var _baseUrl = config.baseUrl || './';
    var nodeName = 'script';

    // string -> documentElement
    function createNode (url) {
        var node = root.createElement(nodeName);
        node.src = url;
        return node;
    }

    // void
    // Make a mark index to cache node infomation.
    function markNode (node) {
        var keyName = splitKey(node.url);
        context.modules = context.modules || {};
        context.module[keyName].node = node;
    }

    function checkLoaded (node) {
        node._loaded = false;

        //TODO: Check valid script status - maybe need to set something or not?
        //      And set timeout error message.
        node.onload = function (event) {
            node._loaded = true;

        };
    }

    function appendToHead (node) {
        HEAD.appendChild(node);
    }

    function isKeyName (url) {
        return !/[a-zA-Z0-9_]+\.js$/.test(url);
    }
    function splitKey (url) {
        var result = /([a-zA-Z0-9_]+)\.js$/.exec(url);
        return result ? result[1] : result;
    }

    function composeBaseUrl (url) {
        return _baseUrl + url;
    }

    function map (array) {
        return function (todo) {
            return array.map(todo);
        };
    }

    // void
    // node flow; create > mark > check > append
    function createReqsNode (stringKey) {
        var path = isKeyName(stringKey) ? _urls[stringKey] : stringKey;
        var node = createNode(path);
        checkLoaded(node);
        appendToHead(node);
    }

    function main (reqArray) {
        return map(reqArray)(createReqsNode);
    }

    return function (reqArray, fn) {
        ready(function() {
            main(reqArray);
        });
    };
})(window, document, ready, context, requestConfig || {});
