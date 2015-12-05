/* jshint browser: true */

// HTML5 Canvas Snow Particle Generator
// Based on: http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 30);
            return;
        };
});

function Snowflakes(canvas) {
    'use strict';
    
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.W = canvas.width;
	this.H = canvas.height;
    this.mp = 25;
    this.particles = [];
    this.angle = 0;
    this.fps = 70;
    this.now = 0;
    this.then = Date.now();
    this.interval = 1000 / this.fps;
    this.delta = 0;
    
    for(var i = 0; i < this.mp; i++) {
        this.particles.push({
            x: Math.random() * this.W,     // x-coordinate
            y: Math.random() * this.H,     // y-coordinate
            r: Math.random() * 4 + 1,      // radius
            d: Math.random() * this.mp          // density
        });
    }
}

Snowflakes.prototype.start = function() {
    window.requestAnimationFrame(this.draw.bind(this));
};

// Let's draw the flakes
Snowflakes.prototype.draw = function() {
    this.now = Date.now();
    this.delta = this.now - this.then;
    
    if(this.delta > this.interval) {
        this.drawSnowflakes();
        this.then = this.now - (this.delta % this.interval);
    }
    window.requestAnimationFrame(this.draw.bind(this));
};

Snowflakes.prototype.drawSnowflakes = function() {
    this.context.clearRect(0, 0, this.W, this.H);

    this.context.fillStyle = "rgba(255, 255, 255, 0.8)";
    this.context.beginPath();
    for(var i = 0; i < this.mp; i++) {
        var p = this.particles[i];
        this.context.moveTo(p.x, p.y);
        this.context.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    this.context.fill();
    this.update();
};

// Function to move the snowflakes
Snowflakes.prototype.update = function() {
    this.angle += 0.01;
    for(var i = 0; i < this.mp; i++) {
        var p = this.particles[i];
        p.y += Math.cos(this.angle + p.d) + 1 + p.r/2;
        p.x += Math.sin(this.angle) * 2;

        if(p.x > this.W + 5 || p.x < -5 || p.y > this.H) {
            if(i%3 > 0) {
                this.particles[i] = {x: Math.random() * this.W, y: -10, r: p.r, d: p.d};
            } else {
                if(Math.sin(this.angle) > 0) {
                    this.particles[i] = {x: -5, y: Math.random() * this.H, r: p.r, d: p.d};
                } else {
                    this.particles[i] = {x: this.W + 5, y: Math.random() * this.H, r: p.r, d: p.d};
                }
            }
        }
    }
};