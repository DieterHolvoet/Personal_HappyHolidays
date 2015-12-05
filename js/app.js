/* jshint browser: true */
/* global Snowflakes, CanvasHelper, Debugger */

var canvas, context;

window.addEventListener("load", init, false);

function init() {
    if(!CanvasHelper.canvasSupport()) {
        Debugger.log("Canvas is niet gevonden");
        return false;
    }
    
    canvas = new CanvasHelper("mijnCanvas");
    context = canvas.context;
    
    canvas.scaleOnHiDPI();
    canvas.resizeCanvas();
    window.addEventListener("resize", canvas.resizeCanvas, false);
    
    var snowflakes = new Snowflakes(canvas.canvas);
    snowflakes.start();
}
	