/* jshint browser: true */
/* global Snowflakes, CanvasHelper, Debugger, buzz, gajus */

var canvas, context, snowflakes, audio, svgMute, svgUnmute, OCE;

window.addEventListener("load", init, false);
window.addEventListener("resize", resize, false);

function init() {
    if(!CanvasHelper.canvasSupport()) {
        Debugger.log("Canvas is niet gevonden");
        return false;
    }
    
    if(!buzz.isSupported()) {
        Debugger.log("Audio-element niet ondersteund. Upgrade je browser!");
    }
    
    canvas = new CanvasHelper("mijnCanvas");
    context = canvas.context;
    
    canvas.scaleOnHiDPI();
    canvas.resizeCanvas();
    
    snowflakes = new Snowflakes(canvas.canvas);
    snowflakes.start();
    
    translateText();
    
    svgMute = document.getElementById("mute");
    svgUnmute = document.getElementById("unmute");
    
    svgMute.onclick = togglePlay;
    svgUnmute.onclick = togglePlay;
    
    audio = new buzz.sound( "assets/fitzgerald", {
        formats: [ "ogg", "mp3", "aac" ],
        autoplay: true,
        loop: true
    });
    
    audio.bind("play", function() {
        svgMute.style.display = "none";
        svgUnmute.style.display = "block";
    });
    
    audio.bind("pause", function() {
        svgMute.style.display = "block";
        svgUnmute.style.display = "none";
    });
    
    function togglePlay() {
        audio.togglePlay();
    }
    
    // Start tracking the orientation change.
    OCE = gajus.orientationchangeend({});

    // Attach event listener to the "orientationchangeend" event.
    OCE.on('orientationchangeend', resize);
}

function resize() {
    canvas.scaleOnHiDPI();
    canvas.resizeCanvas();
    snowflakes.update(canvas.canvas);
}

function translateText() {
    var language = window.navigator.userLanguage || window.navigator.language,
        merry = document.getElementById("merry"),
        christmas = document.getElementById("christmas"),
        and = document.getElementById("and"),
        happy = document.getElementById("happy"),
        newyear = document.getElementById("newyear"),
        from = document.getElementById("from");
    
    switch(language.substr(0, 2)) {
        case "en":
            merry.innerHTML = "Merry";
            christmas.innerHTML = "Christmas";
            and.innerHTML = "and a";
            happy.innerHTML = "Happy";
            newyear.innerHTML = "New Year";
            from.innerHTML = "from Chris, Carine, Dieter and Amber";
            break;
            
        case "fr":
            merry.innerHTML = "Joyeux";
            christmas.innerHTML = "Noël";
            and.innerHTML = "et";
            happy.innerHTML = "Bonne";
            newyear.innerHTML = "Année";
            from.innerHTML = "de la part de Chris, Carine, Dieter et Amber";
            break;
    }
}