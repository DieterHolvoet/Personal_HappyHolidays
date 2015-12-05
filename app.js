/* jshint browser: true */

var canvas, context;

var Debugger = function () {
    this.log = function () {
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

    this.error = function (arg) {
        'use strict';
        try {
            console.error(arg);

        } catch (exception) {
            return;
        }
    };
};

window.addEventListener("load", init, false);
window.addEventListener("resize", resize, false);

function init() {
    if(!canvasSupport()) {
        Debugger.log("Geen canvas-ondersteuning!");
        return false;
    }
    
    canvas = document.getElementById("mijnCanvas");
    context = canvas.getContext("2d");
    resize();
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.fillStyle = "#af0808";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function canvasSupport() {
    return !!document.createElement('canvas').getContext;
}