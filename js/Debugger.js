var Debugger = function () {
};

Debugger.log = function () {
    'use strict';
    try {
        if(arguments.length == 1) {
            console.log(arguments[0]);
        } else if(arguments.length > 1) {
            console.dir(arguments);
        }

    } catch (exception) {
        return;
    }
};

Debugger.error = function (arg) {
    'use strict';
    try {
        console.error(arg);

    } catch (exception) {
        return;
    }
};
