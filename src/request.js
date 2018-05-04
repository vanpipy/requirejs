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

    function checkLoaded (node, nextNode) {
        //TODO: Check valid script status - maybe need to set something or not?
        //      And set timeout error message.
        node.onload = function (event) {
            appendToHead(nextNode);
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

    // node flow; create > mark > check > append
    function createReqsNode (stringKey) {
        var path = isKeyName(stringKey) ? _urls[stringKey] : stringKey;
        var node = createNode(path);

        return node;
    }

    function main (reqArray) {
        var previousNode = createReqsNode(reqArray[0]);
        appendToHead(previousNode);

        var i = 1;

        while (i < reqArray.length) {
            var nextNode = createReqsNode(reqArray[i]);
            checkLoaded(previousNode, nextNode);
            previousNode = nextNode;

            i++;
        }

        previousNode = undefined;
        nextNode = undefined;
    }

    return function (reqArray, fn) {
        ready(function() {
            main(reqArray);
        });
    };
})(window, document, ready, context, requestConfig || {});
