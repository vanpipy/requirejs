
var ready = (function(global, rootElement) {
    // The window onload event will occur after all element loaded,
    // it is include the element img, but the large img block the loading process
    // what happened? Only hang on.
    //
    // So there is a better way to avoid situation block.
    // Event - DOMContentLoaded
    // Every element loaded before every resouce especially large resoure like image.
    function IEContentLoaded (fn) {
        var d = rootElement, done = false;

        function init () {
            if (!done) {
                done = true;
                fn();
            }
        }

        (function() {
            try {
                d.documentElement.doScroll('left');
            } catch (e) {
                setTimeout(arguments.callee, 50);
                return;
            }

            init();
        })();

        d.onreadystatechange = function () {
            if (d.readyState === 'complete') {
                d.onreadystatechange = null;
                init();
            }
        }
    }

    function main (callback) {
        if (global.addEventListener) {
            rootElement.addEventListener('DOMContentLoaded', function () {
                //Remove it after occured to avoid the recall.
                rootElement.addEventListener('DOMContentLoaded', arguments.callee, false);

                try {
                    callback()
                } catch (e) {
                    throw new Error(e.toString(), 'Ready need functional input.');
                }
            }, false);
        } else if (global.attachEvent) {
            // (IEContentLoaded)[http://javascript.nwbox.com/IEContentLoaded/]
            IEContentLoaded();
        }
    }

    return global.ready = function (callback) { main(callback); }
})(window, document);
