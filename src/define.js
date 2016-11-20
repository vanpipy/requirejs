'use strict';

var define = (function(global, context) {
    //TODO: Function define to make anonymous function generated can be tracked.

    return function (name, deps, fns) {
        deps = deps.map(function(dep) {
            return context.modules[dep];
        });
        context.modules[name] = fns.apply(global, deps);
    }
})(window, context);
