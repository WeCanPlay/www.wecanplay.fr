/*
* WeCanPlay : Library for html5 games
* http://www.wecanplay.fr/
* Version 0.3
*
* Copyright © WeCanPlay
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*/

(function (w, d, undefined) {
    "use strict";

    function WCP() {
        this.debug = false;
        this.ctx = 0;
        this.canvas = 0;
        this.width = 0;
        this.height = 0;
    }

    WCP.prototype.setCanvas = function (c, width, height) {
        this.canvas = d.getElementById(c);

        if (width > 0 && height > 0) {
            this.canvas.width = width;
            this.canvas.height = height;
        }

        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;

        this.ctx = this.canvas.getContext('2d');

        this.initScenes();
        this.fire("canvasReady");
    };

    WCP.prototype.setMode = function (modes) {
        /*
        for (var key in MODES) {
            if ((modes & MODES[key]) == MODES[key]) {
                if (my.mode[key]) {
                    my.log(key+" MODE OFF");
                    my.mode[key] = false;
                } else {
                    my.mode[key] = true;
                    my.log(key+" MODE ON");
                }
            }
        }*/
        console.error("DEPRECATED - for log use WCP.log(true)");
    };

    WCP.prototype.log = function (msg) {
        if (typeof msg === 'boolean') {
            this.logEnable = msg;
        }
        if (this.logEnable) {
            console.log(msg);
        }
    };

    WCP.prototype.extend = function (opt, module) {
        console.error("DEPRECATED - see wiki template - kiss LeMulot");
        /*
        console.log("instancy module :" + opt.name);
        if (opt.init) {
            my[opt.name] = new module();
        }
        */
    };

    window.WCP = new WCP();
})(window, document, undefined);

(function (WCP, window, document) {
    "use strict";

    function Tools() {}

    Tools.makeArray = function (item) {
        if (!(item instanceof Array)) {
            item = [item];
        }
        return (item);
    };

    Tools.inArray = function (obj, ar) {
        for (var i = 0; i < ar.length; i++) {
            if (ar[i] === obj) {
                return true;
            }
        }
        return false;
    };

    Tools.getCanvasPos = function () {
        var obj = WCP.canvas;
        var top = 0;
        var left = 0;
        while (obj.offsetParent) {
            top += obj.offsetTop;
            left += obj.offsetLeft;
            obj = obj.offsetParent;
        }
        return {
            top: top,
            left: left
        };
    };

    Tools.cloneObject = function (obj) {
        var target = {};
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                target[i] = obj[i];
            }
            return target;
        }
    };

    Tools.degresToRadian = function (degres) {
        return degres * Math.PI / 180;
    };

    function clear() {
        WCP.ctx.clearRect(0, 0, WCP.width, WCP.height);
    }

    function bufferCanvas(width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.ctx = canvas.getContext('2d');

        return (canvas);
    }

    function random(min, max) {
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    }

    WCP.Tools = Tools;
    WCP.clear = clear;
    WCP.bufferCanvas = bufferCanvas;
    WCP.random = random;
})(WCP, window, document);

(function (WCP) {
    "use strict";
    
    WCP.utils = {};
    
    WCP.utils.makeArray = function (item) {
        if (typeof item.length === 'undefined') {
            item = [item];
        }
        return (item);
    };
    
    WCP.utils.merge = function (o) {
        for (var i = 1; i < arguments.length; i++) {
            var a = arguments[i];
            
            for (var name in a) {
                if (a.hasOwnProperty(name)) {
                    o[name] = a[name];
                }
            }
        }
        
        return (o);
    };
    
    WCP.utils.clone = function (o) {
        var n = new o.__proto__.constructor();
        WCP.utils.merge(n, o);
        
        if (n.prototype.clone) {
            n.clone();
        }
        
        return (n);
    };
    
})(WCP);


(function (WCP) {
    "use strict";

    function Vector(x, y, x2, y2) {
        if (arguments.length === 1 && typeof x === 'object') {
            this.x = x.x;
            this.y = x.y;
        } else {
            if (arguments.length === 4) {
                this.x = x2 - x;
                this.y = y2 - y;
            } else {
                this.x = x;
                this.y = y;
            }
        }
    }

    Vector.prototype.get = function () {
        return ({
            x: this.x,
            y: this.y
        });
    };


    Vector.prototype.norm = function () {
        return (Math.sqrt(this.x * this.x + this.y * this.y));
    };


    Vector.prototype.normalize = function () {
        var norm = this.norm();

        return (new Vector(this.x / norm, this.y / norm));
    };

    Vector.prototype.add = function (v) {
        return (new Vector(this.x + v.x, this.y + v.y));
    };

    Vector.prototype.sub = function (v) {
        return (new Vector(this.x - v.y, this.y - v.y));
    };

    Vector.prototype.mult = function (value) {
        return (new Vector(this.x * value, this.y * value));
    };

    Vector.prototype.dot = function (v) {
        return (this.x * v.x + this.y * v.y);
    };

    Vector.prototype.cross = function (v) {
        return (this.x * v.y + this.y * v.x);
    };

    Vector.prototype.tangent = function () {
        return (new Vector(-this.y, this.x));
    };
    
    Vector.prototype.angleTo = function (v) {
        return (Math.atan2(this.cross(v) / (this.norm() * v.norm()), this.dot(v)));
    };
    
    Vector.prototype.absoluteAngle = function () {
        return (Math.atan2(this.cross(new Vector(1, 0)), this.dot(new Vector(1, 0))));
    };

    /** static methods **/
    Vector.norm = function (x, y) {
        return (Math.sqrt(x * x + y * y));
    };

    Vector.normalize = function (x, y) {
        var norm = Vector.norm(x, y);

        return ({
            x: x / norm,
            y: y / norm
        });
    };

    Vector.add = function (x1, y1, x2, y2) {
        return ({
            x: x1 + x2,
            y: y1 + y2
        });
    };

    Vector.sub = function (x1, y1, x2, y2) {
        return ({
            x: x1 - x2,
            y: y1 - y2
        });
    };

    WCP.Vector = Vector;
})(WCP);

(function (WCP) {
    "use strict";

    /**
     * Used by the functions time() and millitime()
     */
    WCP.internalTime = 0;


    /**
     * Return a relative time in seconds
     *
     * This is not mandatory this time is a timestamp (since 1970), it
     * can be a value since the browser running time.
     * You need to use it as relative time by comparing with another time value
     *
     * @see WCP.microtime
     * @returns Relative time in seconds
     */
    function time() {
        return (Date.now() / 1000);
    }

    /**
     * Return a relative time in milliseconds
     *
     * This is not mandatory this time is a timestamp (since 1970), it
     * can be a value since the browser running time.
     * You need to use it as relative time by comparing with another time value
     *
     * @see WCP.time
     * @returns Relative time in milliseconds
     */
    function millitime() {
        return (Date.now());
    }

    /**
     * Timer object is used to retrive the elapsed time
     *
     * @param timeout (optional) if timeout is specified (in milliseconds) this clock can act like a timer
     */
    function Timer(timeout) {
        this.timeout = timeout || 0;

        this.reset();
    }

    /**
     * Returns the clock elapsed time in milliseconds
     *
     * @returns elapsed time in milliseconds
     */
    Timer.prototype.elapsedTime = function () {
        if (this.pauseStart > 0) {
            return (this.pauseStart - this.startTime - this.pauseDuration);
        }

        return (millitime() - this.startTime - this.pauseDuration);
    };

    /**
     * Pause the clock
     * No effect is the clock is already paused
     */
    Timer.prototype.pause = function () {
        if (this.pauseStart === 0) {
            this.pauseStart = millitime();
        }
    };

    /**
     * Unpause the clock.
     * No effect if the clock is unpaused
     */
    Timer.prototype.unpause = function () {
        if (this.pauseStart > 0) {
            this.pauseDuration += millitime() - this.pauseStart;
            this.pauseStart = 0;
        }
    };

    /**
     * Return if the clock is paused
     *
     * @returns true if the clock is paused
     */
    Timer.prototype.paused = function () {
        return (this.pauseStart > 0);
    };

    /**
     * This function make the Timer object like a Timer.
     * If the timeout is expired, and you want to use it again you need
     * to reset the Timer (using Timer.reset())
     *
     * @see Timer.reset
     * @returns true if the timeout period is expired
     */
    Timer.prototype.expired = function () {
        if (this.timeout) {
            return (this.elapsedTime() > this.timeout);
        }

        return (false);
    };

    /**
     * Resets the clock. Clears the pause status, and the start time
     * as now.
     */
    Timer.prototype.reset = function () {
        this.startTime = millitime();
        this.pauseStart = 0;
        this.pauseDuration = 0;
    };



    /**
     * Setup a time scheduler for timeouts and intervals
     */
    function TimeScheduler() {
        this.timer = new Timer();

        /**
         * Holds an Array of timeouts : [timeout time, callback function]
         */
        this.timeouts = [];
        this.nTimeouts = 0;
        /**
         * Holds an Array of intervals : [interval starting time, interval time, callback function]
         */
        this.intervals = [];
        this.nIntervals = 0;

        this.clear();
        this.reset();
    }

    TimeScheduler.prototype.update = function () {
        if (this.paused()) {
            return;
        }

        var elapsed = this.timer.elapsedTime();
        var i, t;


        for (i in this.timeouts) {
            t = this.timeouts[i];

            if (t[0] < elapsed) {
                try {
                    t[1]();
                } catch (e) {
                    throw e;
                } finally {
                    delete this.timeouts[i];
                    this.nTimeouts--;
                }
            }
        }

        for (i in this.intervals) {
            t = this.intervals[i];

            if (t[0] + t[1] < elapsed) {
                t[0] = elapsed;

                try {
                    t[2]();
                } catch (e) {
                    throw e;
                }
            }
        }
    };

    TimeScheduler.prototype.clear = function () {
        this.timeouts = [];
        this.intervals = [];

        this.nTimeouts = 0;
        this.nIntervals = 0;
    };

    TimeScheduler.prototype.setTimeout = function (duration, fn) {
        this.timeouts.push([this.timer.elapsedTime() + duration, fn]);
        this.nTimeouts++;

        return (this.timeouts.length - 1);
    };

    TimeScheduler.prototype.setInterval = function (duration, fn) {
        this.intervals.push([this.timer.elapsedTime(), duration, fn]);
        this.nIntervals++;

        return (this.intervals.length - 1);
    };

    TimeScheduler.prototype.clearTimeout = function (id) {
        if (this.timeouts[id]) {
            delete this.timeouts[id];
            this.nTimeouts--;

            return (true);
        }

        return (false);
    };

    TimeScheduler.prototype.clearInterval = function (id) {
        if (this.intervals[id]) {
            delete this.intervals[id];
            this.nIntervals--;

            return (true);
        }

        return (false);
    };

    TimeScheduler.prototype.reset = function () {
        this.timer.reset();
    };

    TimeScheduler.prototype.pause = function () {
        this.timer.pause();
    };

    TimeScheduler.prototype.unpause = function () {
        this.timer.unpause();
    };

    TimeScheduler.prototype.paused = function () {
        return (this.timer.paused());
    };

    /**
     * FPS Tick Counter
     *
     * @param duration
     */
    function TimeCounter(duration) {
        this.precision = 0.1; // number of s/block
        this.duration = duration || 5;
        this.size = Math.ceil(this.duration / this.precision) + 1;
        this.filled = 0;
        this.index = 0;
        this.previousTime = 0;
        this.startTime = 0;
        this.data = new Array(this.size);

        this.reset();
    }

    TimeCounter.prototype.get = function () {
        var sum = 0;
        var nb = 0;

        for (var i = 0; i < this.size && i < this.filled; i++) {
            if (i !== this.index && this.data[i] > 0) {
                sum += this.data[i];
                nb++;
            }
        }

        if (nb === 0) {
            return (0);
        }

        return (sum / nb / this.precision);
    };

    TimeCounter.prototype.tick = function () {
        var time = WCP.time();
        var delta = time - this.startTime;
        var nextIndex = Math.floor(delta / this.precision) % this.size;

        if (this.index !== nextIndex) {
            this.data[nextIndex] = 0;
        }

        this.data[nextIndex]++;
        this.index = nextIndex;

        if (nextIndex > this.filled) {
            this.filled = nextIndex;
        }
    };

    TimeCounter.prototype.reset = function () {
        this.index = 0;
        this.filled = 0;
        this.startTime = 0;

        for (var i = 0; i < this.size; i++) {
            this.data[i] = 0;
        }
    };


    /**
     * Symbol export
     */
    WCP.time = time;
    WCP.millitime = millitime;
    WCP.Timer = Timer;
    WCP.TimeScheduler = TimeScheduler;
    WCP.TimeCounter = TimeCounter;
})(WCP);

(function (WCP) {
    "use strict";

    var spriteId = 1;

    // private const
    var ORIGIN_TYPE_PX = 0;
    var ORIGIN_TYPE_RATIO = 1;

    function Sprite(image, x, y) {
        this.img = image;
        this.x = x || 0;
        this.y = y || 0;
        this.width = image.width;
        this.height = image.height;
        this.sliceX = 0;
        this.sliceY = 0;
        this.sliceWidth = this.width;
        this.sliceHeight = this.height;
        this.alpha = 1;
        this.id = spriteId++;
        this.originX = 0;
        this.originY = 0;
        this.originType = ORIGIN_TYPE_PX;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.matrix = [1, 0, 0, 1, 0, 0];
        this.symmetryX = this.symmetryY = false;
        this.animationsData = new Array();
        this.animation = new WCP.Animation(this);
    }

    function SliceSprite(Image, x, y, width, height) {
        var s = new Sprite(Image, 0, 0);
        s.setSlice(x, y, width, height);
        return (s);
    }

    Sprite.prototype.clone = function (x, y) {
        var o = new WCP.Sprite(this.img, x, y);
        for (var i in this) {
            if (this.hasOwnProperty(i) && i !== "id") {
                o[i] = this[i];
            }
        }
        return (o);
    };

    Sprite.prototype.setSubRect = function (rect) {
        this.sliceX = rect.x;
        this.sliceY = rect.y;
        this.sliceWidth = rect.width;
        this.sliceHeight = rect.height;
    };

    Sprite.prototype.setSlice = function (x, y, width, height) {
        this.width = width;
        this.height = height;
        this.sliceX = x;
        this.sliceY = y;
        this.sliceWidth = width;
        this.sliceHeight = height;
    };

    Sprite.prototype.draw = function (ctx) {
        ctx = ctx || WCP.ctx;
        var originX = this.x;
        var originY = this.y;

        ctx.save();
        ctx.globalAlpha = this.alpha;
//        console.log(this.img, this.sliceX, this.sliceY, this.sliceWidth,
//                this.sliceHeight, originX, originY, this.width, this.height);

        // translation
        
        var origX, origY;
        var width = this.width;/* * this.scaleX*/
        var height = this.height;/* * this.scaleY*/

        if (this.originType === ORIGIN_TYPE_PX) {
            origX = this.originX;
            origY = this.originY;
        } else {
            origX = (width * this.originX);
            origY = (height * this.originY);
        }

        var scaleX = (this.symmetryX === true ? -1 : 1);
        var scaleY = (this.symmetryY === true ? -1 : 1);
        if (scaleX === -1) {
            origX += this.width;
        }
        if (scaleY === -1) {
            origY += this.height;
        }
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(scaleX, scaleY);

        ctx.drawImage(this.img, this.sliceX, this.sliceY, this.sliceWidth,
                this.sliceHeight, -origX, -origY, width, height);
        ctx.restore();
    };

    Sprite.prototype.move = function (x, y) {
        this.x += x;
        this.y += y;
    };

    Sprite.prototype.position = function (x, y) {
        this.x = x;
        this.y = y;
    };

    Sprite.prototype.scale = function (x, y) {
        if (typeof y === 'undefined') {
            y = x;
        }

        this.scaleX = x;
        this.scaleY = y;
        this.width = this.sliceWidth * this.scaleX;
        this.height = this.sliceHeight * this.scaleY;
    };

    Sprite.prototype.symmetry = function (x, y) {
        this.symmetryX = x;
        this.symmetryY = y;
    };

    Sprite.prototype.vector = function () {
        return (new WCP.Vector(this.x, this.y));
    };

    Sprite.prototype.getPos = function () {
        return ({
            x: this.x,
            y: this.y
        });
    };

    Sprite.prototype.getRect = function () {
        return ({
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        });
    };
    
    Sprite.prototype.animations = function (animations) {
        this.animationsData = animations;
    };
    
    Sprite.prototype.setAnimation = function (animation) {
        if (typeof(this.animationsData[animation]) === "undefined") {
            return ;
        }

        this.animation.clean();

        for (var n in this.animationsData[animation]) {
            var slice = this.animationsData[animation][n];
            this.animation.setSlice(slice.x, slice.y, slice.width, slice.height);
            if (typeof(this.animationsData.frameRate) !== "undefined") {
                this.animation.wait(this.animationsData.frameRate);
            }
            else if (typeof(this.animationsData.timeRate) !== "undefined") {
                this.animation.waitTime(this.animationsData.timeRate);
            }
        }
        this.animation.repeat();
        this.animation.start();
    };

    Sprite.prototype.setOrigin = function (ratioX, ratioY) {
        if (!ratioY && typeof ratioX[0] !== 'undefined') {
            this.originX = ratioX[0];
            this.originY = ratioX[1];
        } else {
            this.originX = ratioX;
            this.originY = ratioY;
        }

        this.originType = ORIGIN_TYPE_RATIO;
    };

    Sprite.prototype.setOriginPos = function (x, y) {
        this.originX = x;
        this.originY = y;
        this.originType = ORIGIN_TYPE_PX;
    };

    Sprite.ORIGIN_TOPLEFT = [0, 0];
    Sprite.ORIGIN_TOP = [0.5, 0];
    Sprite.ORIGIN_TOPRIGHT = [1, 0];
    Sprite.ORIGIN_LEFT = [0, 0.5];
    Sprite.ORIGIN_CENTER = [0.5, 0.5];
    Sprite.ORIGIN_RIGHT = [1, 0.5];
    Sprite.ORIGIN_BOTLEFT = [0, 1];
    Sprite.ORIGIN_BOT = [0.5, 1];
    Sprite.ORIGIN_BOTRIGHT = [1, 1];

    WCP.Sprite = Sprite;
    WCP.SliceSprite = SliceSprite;
})(WCP);

(function (WCP) {
    "use strict";
    
    /**
     * Event object contains the callbacks related to a specific type of event
     *
     */
    function Event() {
        this.callbacks = [];
    }
    
    
    /**
     * CustomEvent object
     * Contains and manage an event and its callbacks
     * @param type, type of the event
     * @param event (optional) event must be an Event object. If specified, will be stored instead of creating a new Event.
     *
     */
    
    function CustomEvent(type, event) {
        if (event) {
            if (typeof event === "Object") {
                this.event = event;
            } else {
                this.event = new Event();
            }
        } else {
            this.event = new Event();
        }
        this.type = type;
    }
        
    /**
     * Alternative to event.type = newType
     *
     * @param newType is the new name of the CustomEvent
     */
    CustomEvent.prototype.rename = function (newType) {
        this.type = newType;
    };
    
    
    /**
     * Attaches the given action to the event
     *
     * @param action callback function to execute when the event is fired
     */
    CustomEvent.prototype.suscribe = function (action) {
        this.event.callbacks.push(action);
    };
    
    /**
     * Removes the given action from the event
     *
     * @param action callback to remove, if not given, all callbacks are removed
     */
    CustomEvent.prototype.unsuscribe = function (action) {
        var found = false;
        for (var i in this.event.callbacks) {
            if (this.event.callbacks[i] === action || !action) {
                delete this.event.callbacks[i];
                found = true;
            }
        }
        return (found);
    };
        
    /**
     * Executes all the event's callbacks.
     *
     * @param params (optional) use params as parameters when calling the functions
     */
    CustomEvent.prototype.fire = function (params) {
        for (var i in this.event.callbacks) {
            this.event.callbacks[i](params);
        }
    };

    
    /**
     * EventTarget
     * Manages standard events and custom events on a DOM element (by default WCP.canvas)
     *
     */
    
    function EventTarget() {
    }

    /**
     * Extends the given class with EventTarget methods and attributes
     * Allows to use any class as an event manager.
     * The objects instancied from the classes extended by EventTarget have to use listen()
       in order to activate the event listeners and initialize the attributes.
     * @see EventTarget.listen()
     * @param targetClass, the class to extend
     *
     */

    EventTarget.extend = function (targetClass) {
        targetClass.prototype.initEvents = EventTarget.prototype.initEvents;
        targetClass.prototype.listen = EventTarget.prototype.listen;
        targetClass.prototype.handleEvents = EventTarget.prototype.handleEvents;
        targetClass.prototype.custom = EventTarget.prototype.custom;
        targetClass.prototype.getEvent = EventTarget.prototype.getEvent;
        targetClass.prototype.register = EventTarget.prototype.register;
        targetClass.prototype.suscribe = EventTarget.prototype.suscribe;
        targetClass.prototype.unsuscribe = EventTarget.prototype.unsuscribe;
        targetClass.prototype.on = EventTarget.prototype.on;
        targetClass.prototype.fire = EventTarget.prototype.fire;
    };
    
    
    /**
     * Extends the given object with EventTarget methods and attributes
     * Allows to use any class as an event manager.
     * The objects  by EventTarget have to use listen()
       in order to activate the event listeners and initialize the attributes.
     * @see EventTarget.listen()
     * @param targetObject, the object to extend
     * (WCP is extended with EventTarget.extendObject)
     */

    EventTarget.extendObject = function (targetObject) {
        targetObject.initEvents = EventTarget.prototype.initEvents;
        targetObject.listen = EventTarget.prototype.listen;
        targetObject.handleEvents = EventTarget.prototype.handleEvents;
        targetObject.custom = EventTarget.prototype.custom;
        targetObject.getEvent = EventTarget.prototype.getEvent;
        targetObject.register = EventTarget.prototype.register;
        targetObject.suscribe = EventTarget.prototype.suscribe;
        targetObject.unsuscribe = EventTarget.prototype.unsuscribe;
        targetObject.on = EventTarget.prototype.on;
        targetObject.fire = EventTarget.prototype.fire;
    };
    
    
    EventTarget.prototype.initEvents = function () {
        if (!this.events) {
            this.events = [];
        }
    };
    
    /**
     * Activates standard listeners on the given DOM element
     * Initializes the managable events
     * This method must be called before to try ANY management of ANY event.
     * This method MUST be called before to try any management of any event.
     * @param element (optional), the element to listen. If not given, WCP.canvas will be used by default
     */
    EventTarget.prototype.listen = function (element) {
        this.initEvents();
        var domElement = element ? element : WCP.canvas;
        if (!domElement) {
            return;
        }
        
        // Creating listeners
        
        this.events.push(new CustomEvent("mousemove"));
        this.events.push(new CustomEvent("mouseover"));
        this.events.push(new CustomEvent("mouseout"));
        this.events.push(new CustomEvent("mousedown"));
        this.events.push(new CustomEvent("mouseup"));
        this.events.push(new CustomEvent("keydown"));

                // listening canvas standard events
        
        domElement.addEventListener("mouseover", function (that) {
                                return function (evt) {
                                    that.handleEvents(evt);
                                };
                            }(this), false);

        domElement.addEventListener("mouseout", function (that) {
                                return function (evt) {
                                    that.handleEvents(evt);
                                };
                            }(this), false);

        domElement.addEventListener("mousemove", function (that) {
                                return function (evt) {
                                    that.handleEvents(evt);
                                };
                            }(this), false);

        domElement.addEventListener("mousedown", function (that) {
                                return function (evt) {
                                    that.handleEvents(evt);
                                };
                            }(this), false);

        domElement.addEventListener("mouseup", function (that) {
                                return function (evt) {
                                    that.handleEvents(evt);
                                };
                            }(this), false);

        window.onkeydown = function (that) {
                                return function (evt) {
                                    that.handleEvents(evt);
                                };
                            }(this);

        
    };
    
    /**
     * Manages events triggering
     * Fires the triggering event using the standard event object as parameter
     * @private
    */
    EventTarget.prototype.handleEvents = function (evt) {
        this.fire(evt.type, evt);
    };

    /**
     * Returns the asked event, if event is an object, returns event.
     * @private
     * @param event is the event type or a CustomEvent object
     * @returns the required event
    */
    EventTarget.prototype.getEvent = function (event) {
        if (typeof event === "object") {
            return (event);
        } else {
            for (var i in this.events) {
                if (this.events[i].type === event) {
                    return this.events[i];
                }
            }
        }
    };
    
    /**
     * Store the management methods in given class's prototype allowing any instance of this class to manage the events of this event manager.
     * @param myClass is the class to register
    */
    
    EventTarget.prototype.register = function (myClass) {
        myClass.prototype.suscribe = function (that) {
            return function (event, action) {
                that.on(event, action);
            };
        }(this);
        myClass.prototype.on = function (event, action) {
            this.suscribe(event, action);
        };
        myClass.prototype.unsuscribe = function (that) {
            return function (event, action) {
                that.unsuscribe(event, action);
            };
        }(this);
        myClass.prototype.custom = function (that) {
            return function (customId) {
                that.custom(customId);
            };
        }(this);
    };
    
    /**
    * Creates and store a custom event
    * @param customId, the type/name of the event
    * @returns CustomEvent object
    */
    
    EventTarget.prototype.custom = function (customId, override) {
        var evt = this.getEvent(customId);
        if (evt && override === true) {
            this.unsuscribe(customId);
        } else if (evt && !override) {
            return;
        }
        evt = new CustomEvent(customId);
        this.events.push(evt);
        return evt;
    };

    /**
    * Calls CustomEvent.suscribe of the given
    * @see CustomEvent.suscribe
    * @param event, the type/name of the event to suscribe
    * @param action, the action to add
    */
    EventTarget.prototype.on = function (event, action) {
        this.suscribe(event, action);
    };

    /**
    * Calls CustomEvent.suscribe
    * @see CustomEvent.suscribe
    * @param event, the type/name of the event to suscribe
    * @param action, the action to add
    */
    EventTarget.prototype.suscribe = function (event, action) {
        var evt = this.getEvent(event);
        if (evt) {
            evt.suscribe(action);
        }
    };
    
    /**
    * Calls CustomEvent.unsuscribe
    * @see CustomEvent.unsuscribe
    * @param event, the type/name of the event to suscribe
    *         if no event name is given, unsuscribe all callbacks for all events
    * @param action, the action to delete
    */

    EventTarget.prototype.unsuscribe = function (event, action) {
        var evt = this.getEvent(event);
        if (!event) {
            for (var i in this.events) {
                this.events[i].unsuscribe();
            }
        } else if (evt) {
            evt.unsuscribe(action);
        }
    };

    /**
    * Calls CustomEvent.fire
    * @param event, the type/name of the event to suscribe
    * @param params, the parameters to send to the event's callbacks
    *
    * @see CustomEvent.fire
    */
    
    EventTarget.prototype.fire = function (event, params) {
        var evt = this.getEvent(event);
        if (evt) {
            evt.fire(params);
        }
    };
    
    /**
     * Symbol export
     */

     
    WCP.EventTarget = EventTarget;
    EventTarget.extendObject(WCP);
    
    // Here should be created the events needed in modules implementation
    WCP.initEvents();
    WCP.custom("canvasReady");
    
    
    var KEY_DOWN        = 40;
    var KEY_UP            = 38;
    var KEY_LEFT        = 37;
    var KEY_RIGHT       = 39;

    var KEY_END            = 35;
    var KEY_BEGIN        = 36;

    var KEY_BACK_TAB     = 8;
    var KEY_TAB            = 9;
    var KEY_SH_TAB      = 16;
    var KEY_ENTER        = 13;
    var KEY_ESC            = 27;
    var KEY_SPACE        = 32;
    var KEY_DEL            = 46;

    var KEY_A            = 65;
    var KEY_B            = 66;
    var KEY_C            = 67;
    var KEY_D            = 68;
    var KEY_E            = 69;
    var KEY_F            = 70;
    var KEY_G            = 71;
    var KEY_H            = 72;
    var KEY_I            = 73;
    var KEY_J            = 74;
    var KEY_K            = 75;
    var KEY_L            = 76;
    var KEY_M            = 77;
    var KEY_N            = 78;
    var KEY_O            = 79;
    var KEY_P            = 80;
    var KEY_Q            = 81;
    var KEY_R            = 82;
    var KEY_S            = 83;
    var KEY_T            = 84;
    var KEY_U            = 85;
    var KEY_V            = 86;
    var KEY_W            = 87;
    var KEY_X            = 88;
    var KEY_Y            = 89;
    var KEY_Z            = 90;

    var KEY_PF1            = 112;
    var KEY_PF2            = 113;
    var KEY_PF3            = 114;
    var KEY_PF4            = 115;
    var KEY_PF5            = 116;
    var KEY_PF6            = 117;
    var KEY_PF7            = 118;
    var KEY_PF8            = 119;
    
    var KEY_0            = 48;
    var KEY_1            = 49;
    var KEY_2            = 50;
    var KEY_3            = 51;
    var KEY_4            = 52;
    var KEY_5            = 53;
    var KEY_6            = 54;
    var KEY_7            = 55;
    var KEY_8            = 56;
    var KEY_9            = 57;

})(WCP);


(function (WCP) {
    "use strict";
    
    function Draw() {
		
        this.styles = {};
        
        this.options = {
            strokeStyle : "Black",
            fillStyle : "White",
            lineWidth : 1
        };
        
        this.ctx = WCP.ctx;
        var setContext = function (that) {
            return function () {
                that.ctx = WCP.ctx;
            };
        }(this);
        WCP.on("canvasReady", setContext);
    }
	
    Draw.prototype.setContext = function (context) {
        this.ctx = context;
    };
    
	Draw.prototype.draw = function (style) {
		var opts;
		if (style) {
			if (this.styles[style]) {
				opts = this.styles[style];
			} else if (style instanceof Object) {
				opts = style;
			}
        } else {
			opts = this.options;
		}
		for (var opt in this.options) {
			if (!opts[opt]) {
				opts[opt] = this.options[opt];
			}
		}
		this.ctx.lineWidth = opts.lineWidth;
		this.ctx.strokeStyle = opts.strokeStyle;
		this.ctx.fillStyle = opts.fillStyle;
		this.ctx.fill();
		this.ctx.stroke();
	};

	
	Draw.prototype.defaultStyle = function (style) {
		for (var opt in this.options) {
			if (style[opt] === undefined) {
				style[opt] = this.options[opt];
			}
		}
		this.options = style;
	};
    
	Draw.prototype.newStyle = function () {
		return {};
	};
    
	Draw.prototype.addStyle = function (style, id) {
		if (id !== undefined) {
			this.styles[id] = style;
		}
	};
    
	Draw.prototype.removeStyle = function (id) {
		if (this.styles[id]) {
			this.styles[id] = 0;
			return true;
		}
		return false;
	};
    
	Draw.prototype.newPolygon = function () {
		return {
			array : [],
			length : 0,
			add : function (posx, posy) {
				var point = {x : posx, y : posy};
				this.array[this.length++] = point;
			}
		};
	};
    
    
	Draw.prototype.point = function (x, y, size, color) {
        return new this.Point(x, y, size, color);
    };

	Draw.prototype.Point = function (x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    };

	Draw.prototype.Point.prototype.draw = function () {
        if (!this.size) {
            this.size = 1;
        }
        WCP.Draw.ctx.save();
        if (this.color) {
            WCP.Draw.ctx.fillStyle = this.color;
        }
		WCP.Draw.ctx.fillRect(this.x - (this.size / 2 >= 1 ? this.size / 2 : 0), this.y - (this.size / 2 >= 1 ? this.size / 2 : 0), this.size, this.size);
        WCP.Draw.ctx.restore();
	};

	Draw.prototype.line = function (x1, y1, x2, y2, style) {
        return new this.Line(x1, y1, x2, y2, style);
    };

	Draw.prototype.Line = function (x1, y1, x2, y2, style) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.style = style;
    };
    
	Draw.prototype.Line.prototype.draw = function () {
        WCP.Draw.ctx.save();
		WCP.Draw.ctx.beginPath();
		WCP.Draw.ctx.moveTo(this.x1, this.y1);
		WCP.Draw.ctx.lineTo(this.x2, this.y2);
		WCP.Draw.ctx.closePath();
		WCP.Draw.draw(this.style);
        WCP.Draw.ctx.restore();
	};

    Draw.prototype.circle = function (x, y, radius, style) {
        return new this.Circle(x, y, radius, style);
    };
    
	Draw.prototype.Circle = function (x, y, radius, style) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.style = style;
	};
    
    Draw.prototype.Circle.prototype.draw = function () {
        WCP.Draw.ctx.save();
        WCP.Draw.ctx.beginPath();
        WCP.Draw.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        WCP.Draw.ctx.closePath();
        WCP.Draw.draw(this.style);
        WCP.Draw.ctx.restore();
    };

	Draw.prototype.ellipse = function (x, y, width, height, style) {
        return new this.Ellipse(x, y, width, height, style);
    };
    
	Draw.prototype.Ellipse = function (x, y, width, height, style) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.style = style;
    };
    
    Draw.prototype.Ellipse.prototype.draw = function () {
        WCP.Draw.ctx.save();
		WCP.Draw.ctx.beginPath();
		WCP.Draw.ctx.moveTo(this.x, this.y - this.height / 2); // A1
		WCP.Draw.ctx.bezierCurveTo(
			this.x + this.width / 2, this.y - this.height / 2, // C1
			this.x + this.width / 2, this.y + this.height / 2, // C2
			this.x, this.y + this.height / 2); // A2
		WCP.Draw.ctx.bezierCurveTo(
			this.x - this.width / 2, this.y + this.height / 2, // C3
			this.x - this.width / 2, this.y - this.height / 2, // C4
			this.x, this.y - this.height / 2); // A1
        WCP.Draw.ctx.closePath();
		WCP.Draw.draw(this.style);
        WCP.Draw.ctx.restore();
	};

	Draw.prototype.Rect = function (x, y, width, height, style) {
        return new this.Rect(x, y, width, height, style);
    };
    
	Draw.prototype.Rect = function (x, y, width, height, style) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.style = style;
    };

	Draw.prototype.Rect.prototype.draw = function () {
        WCP.Draw.ctx.save();
		WCP.Draw.ctx.beginPath();
		WCP.Draw.ctx.moveTo(this.x, this.y);
		WCP.Draw.ctx.lineTo(this.x + this.width, this.y);
		WCP.Draw.ctx.lineTo(this.x + this.width, this.y + this.height);
		WCP.Draw.ctx.lineTo(this.x, this.y + this.height);
		WCP.Draw.ctx.lineTo(this.x, this.y);
		WCP.Draw.ctx.closePath();
		WCP.Draw.draw(this.style);
        WCP.Draw.ctx.restore();
	};

    
	Draw.prototype.polygon = function (points, style) {
        return new this.Polygon(points, style);
    };

	Draw.prototype.Polygon = function (points, style) {
		if (points.array !== undefined) {
			if (points.array instanceof Array) {
				this.points = points.array;
			}
		} else {
            this.points = points;
        }
    };
    
    Draw.prototype.Polygon.prototype.draw = function () {
		if (this.points instanceof Array) {
            WCP.Draw.ctx.save();
            WCP.Draw.ctx.beginPath();
			var points = this.points();
            points.reverse();
			var firstPoint = points.pop();
			WCP.Draw.ctx.moveTo(firstPoint.x, firstPoint.y);
			while (points.length > 0) {
				var point = points.pop();
				if (point) {
					WCP.Draw.ctx.lineTo(point.x, point.y);
				}
			}
			WCP.Draw.ctx.lineTo(firstPoint.x, firstPoint.y);
			WCP.Draw.ctx.closePath();
			WCP.Draw.draw(this.style);
            WCP.Draw.ctx.restore();
		}
	};

    
	Draw.prototype.quadraCurve = function (x1, y1, cpx, cpy, x2, y2, style) {
        return new this.QuadraCurve(x1, y1, cpx, cpy, x2, y2, style);
    };

	Draw.prototype.QuadraCurve = function (x1, y1, cpx, cpy, x2, y2, style) {
        this.x1 = x1;
        this.y1 = y1;
        this.cpx = cpx;
        this.cpy = cpy;
        this.x2 = x2;
        this.y2 = y2;
        this.style = style;
    };
    
	Draw.prototype.QuadraCurve.prototype.draw = function () {
        WCP.Draw.ctx.save();
		WCP.Draw.ctx.beginPath();
		WCP.Draw.ctx.moveTo(this.x1, this.y1);
		WCP.Draw.ctx.quadraticCurveTo(this.cpx, this.cpy, this.x2, this.y2);
		WCP.Draw.draw(this.style);
        WCP.Draw.ctx.restore();
	};

	Draw.prototype.bezierCurve = function (x1, y1, cpx1, cpy1, cpx2, cpy2, x2, y2, style) {
        return new this.BezierCurve(x1, y1, cpx1, cpy1, cpx2, cpy2, x2, y2, style);
    };
    
	Draw.prototype.BezierCurve = function (x1, y1, cpx1, cpy1, cpx2, cpy2, x2, y2, style) {
        this.x1 = x1;
        this.y1 = y1;
        this.cpx1 = cpx1;
        this.cpy1 = cpy1;
        this.cpx2 = cpx2;
        this.cp2y = cpy2;
        this.x2 = x2;
        this.y2 = y2;
        this.style = style;
    };
    
	Draw.prototype.BezierCurve.prototype.draw = function () {
        WCP.Draw.ctx.save();
		WCP.Draw.ctx.beginPath();
		WCP.Draw.ctx.moveTo(this.x1, this.y1);
		WCP.Draw.ctx.bezierCurveTo(this.cpx1, this.cpy1, this.cpx2, this.cpy2, this.x2, this.y2);
		WCP.Draw.draw(this.style);
        WCP.Draw.ctx.restore();
	};
    WCP.Draw = new Draw();

})(WCP);
/*
 * Note:
 *
 * Evolution:
 * - More interpolation color :(
 * - More Shift
 * - Animation, replace sprite by any object.
 * - Animation Text
 *
 * Fix:
 * - interpolation and rotation, straight line 
 *
 * Opti:
 * - replace curBundle int by bundle object
 * - Rename some method and member
 * - change for var i in for i in
 * - pointeur de fonction stepEffect
 */

(function(WCP) {
    var animateList = new Array();
    var animateId = 0;

    /*
     * TimeLine
     */
    function TimeLine() {
        animateList[animateId] = this;
        this.animateId = animateId;
        animateId++;

        this.timeLine = new Array();
        this.time = 0;
        this.stop = false;
        this.speed = 1;
        this.startTime = -1;
    }

    TimeLine.prototype.add = function (time, object) {
        if (this.timeLine.length === 0) {
            this.timeLine.push({time: time, object: object});
        }
        else {
            var isAdd = false;
            for (x in this.timeLine) {
                if (time <= this.timeLine[x].time) {
                    this.timeLine.splice(x, 0, {time: time, object: object});
                    isAdd = true;
                    break ;
                }
            }
            if (isAdd === false) {
                this.timeLine.push({time: time, object:object});
            }
        }
    };
    
    TimeLine.prototype.start = function () {
        if (this.startTime < 0) {
            this.startTime = WCP.millitime();
            this.step();
        }
    }
    
    TimeLine.prototype.step = function () {
        if (this.stop === false) {
            while (this.timeLine.length > 0 && this.timeLine[0].time <= this.time) {
                if (typeof(this.timeLine[0].object) !== "undefined") {
                    this.timeLine[0].object.start();
                }
                this.timeLine.shift();
            }
            this.time = WCP.millitime() - this.startTime;
        }
        
        WCP.setTimeout(0, (function (o) {
            return function () {
                o.step();
            };
        })(animateList[this.animateId]));
    };

    /*
     * Clip
     */
    function Clip() {
        this.clip = this;
        this.list = new Array();
        this.index = 0;
        this.speed = 1;
        this.stop = false;
    }
    
    Clip.prototype.add = function () {
        for (var i = 0; i < arguments.length; i++) {
            this.list[this.index] = arguments[i];
            this.index++;
        }
    };

    Clip.prototype.start = function () {
        if (this.stop === false) {
            for (x in this.list) {
                var complete = this.list[x].start();
            }
        }
    };

    Clip.prototype.clone = function () {
        var newAnimationClip = new Clip();
        for (var effect in this.list) {
            if (arguments.length > effect) {
                newAnimationClip.list[newAnimationClip.index] = this.list[effect].clone(arguments[effect]);
            }
            else {
                newAnimationClip.list[newAnimationClip.index] = this.list[effect].clone();
            }
            newAnimationClip.index++;
        }
        newAnimationClip.index = this.index;
        newAnimationClip.speed = this.speed;
        newAnimationClip.stop = this.stop;
        return (newAnimationClip);
    };

    Clip.prototype.offset = function (x, y) {
        for (var effect in this.list) {
            this.list[effect].offset(x, y);
        }
    }
    
    Clip.prototype.pause = function () {
        this.stop = true;
    };

    Clip.prototype.resume = function () {
        this.stop = false;
    };

    Clip.prototype.setSpeed = function (speed) {
        this.speed = speed;
    };
    
    /*
     * Animation
     */
    function Animation(sprite, soundManager) {
        animateList[animateId] = this;
        this.animateId = animateId;
        animateId++;

        this.sprite = sprite;
        this.isSpriteAdd = false;

        this.soundManager = soundManager;

        this.bundles = new Array();
        this.curBundle = 0;
        this.lastBundle = -1;
        this.spriteOrigin = null;
        this.startTime = -1;
        this.frameNumber = 0;
        this.time = 0;
    }

    Animation.prototype.animate = function () {
        if (arguments.length > 0) {
            this.addBundle(arguments);
        }
        return (this);
    };
    
    Animation.prototype.addBundle = function (effects) {
        var bundle = new Array();
        for (var i = 0; i < effects.length; i++) {
            var effect = this.createEffect(effects[i]);

            // Add effect in bundle
            bundle.push(effect);
        }
        this.bundles.push(bundle);
    };

    Animation.prototype.createEffect = function (effect) {
        // Init effect object's properties
        var duration = 0;
        var dType = durationType.NONE;
        if (typeof(effect.frames) !== "undefined") {
            duration = effect.frames;
            dType = durationType.FRAMES;
        }
        else if (typeof(effect.time) !== "undefined") {
            duration = effect.time;
            dType = durationType.TIME;
        }
        effect.properties = {
            complete: false,
            duration: duration,
            durationType: dType,
            shift: ((typeof(effect.shift) !== 'undefined') ? effect.shift : Shift.line),
            ease: ((typeof(effect.ease) !== 'undefined') ? effect.ease : Ease.none)
        };
        delete effect.duration;
        delete effect.frames;
        delete effect.time;
        return (effect);
    };

    Animation.prototype.start = function () {
        if (this.startTime < 0) {
            if (this.isSpriteAdd === false) {
                WCP.add(this.sprite);
                this.isSpriteAdd = true;
            }
            this.startTime = WCP.millitime();
            this.step();
        }
    };
    
    Animation.prototype.step = function () {
        // If no bundles, don't start the animation
        if (this.bundles.length === 0) {
            return ;
        }
        
        // If there is no more bundles, stop
        if (this.curBundle >= this.bundles.length) {
            return ;
        }

        this.frameNumber++;
        
        while (this.curBundle < this.bundles.length && this.stepBundle() === true) {};

        // @TODO: getFps is that right?
        WCP.setTimeout(0, (function (o) {
            return function () {
                o.step();
            };
        })(animateList[this.animateId]));
    };
    
    Animation.prototype.stepBundle = function () {
        // For a new bundle, copy the orignal data from sprite
        if (this.curBundle !== this.lastBundle) {
            if (this.spriteOrigin !== null) {
                delete this.spriteOrigin;
            }
            this.spriteOrigin = new Array();
            for (var i in this.sprite) {
                if (this.sprite.hasOwnProperty(i)) {
                    this.spriteOrigin[i] = this.sprite[i];
                }
            }
            this.startTime = WCP.millitime();
            this.lastBundle = this.curBundle;
        }

        var next = true;
        var bundle = this.bundles[this.curBundle];
        if (bundle.length > 0) {
            for (var i = 0; i < bundle.length; i++) {
                this.time = WCP.millitime() - this.startTime; // * speed to modify speed
                var effect = bundle[i];
                if (typeof(effect.properties) === "undefined") {
                    console.log(this.bundles, this.curBundle, bundle, bundle[i]);
                }
                if (effect.properties.complete === false) {
                    this.stepEffect(effect);
                    next = false;
                }
                if (effect.properties.next === true) {
                    next = true;
                }
            }
        }
        if (next === true) {
            this.curBundle++;
        }
        return (next);
    };
    
    Animation.prototype.getDelta = function (effect) {
        var percent = 1;
        var finish = true;
        if (effect.properties.durationType !== durationType.NONE && effect.properties.duration > 0) {
            var delta = 0;
            if (effect.properties.durationType === durationType.FRAMES) {
                delta = this.frameNumber;
            }
            else if (effect.properties.durationType === durationType.TIME) {
                delta = this.time;
            }
        
            if (delta > effect.properties.duration) {
                percent = 1;
                finish = true;
            }
            else {
                percent = effect.properties.ease.calculate(delta / effect.properties.duration);
                finish = false;
            }
        }
        return ({percent: percent, finish: finish});
    };
    
    Animation.prototype.stepEffect = function (effect) {
        // Manage other effect
        if (typeof(effect.animation) !== "undefined") {
            effect.animation.start();
            effect.properties.complete = true;
        }
        else if (typeof(effect.remove) !== "undefined") {
            // @TODO: hide sprite
            this.sprite.position(-1000, -1000);
            WCP.remove(this.sprite);
            this.isSpriteAdd = true;
            effect.properties.complete = true;
        }
        else if (typeof(effect.execute) !== "undefined") {
            effect.execute();
            effect.properties.complete = true;
        }
        else if (typeof(effect.sound) !== "undefined") {
            console.log(effect.sound);
            this.soundManager.get(effect.sound).play();
            effect.properties.complete = true;
        }
        else if (typeof(effect.repeat) !== "undefined") {
            if (effect.repeat !== 0) {
                for (var i = 0; i < this.bundles.length; i++) {
                    for (var j = 0; j < this.bundles[i].length; j++) {
                        this.bundles[i][j].properties.complete = false;
                        this.bundles[i][j].properties.next = false;
                    }
                }
            }
            if (effect.repeat > 0) {
                this.curBundle = -1;
                this.startTime = 0;
                effect.repeat--;
            }
            else if (effect.repeat < 0) {
                this.curBundle = -1;
                this.startTime = 0;
            }
            effect.properties.complete = ((effect.repeat === 0) ? true : false);
            effect.properties.next = true;
        }
        else {
            var delta = this.getDelta(effect);
            
            // Explore effect and update values
            for (var i in effect) {
                // properties musn't be use here
                if (effect.hasOwnProperty(i) && i !== 'properties') {                
                    // x & y are subject to shift
                    if (i !== 'x' && i !== 'y'){
                        this.sprite[i] = this.spriteOrigin[i] + delta.percent * (effect[i] - this.spriteOrigin[i]);
                    }
                }
            }
            
            // @TODO: Possible optimisation
            var x = ((typeof(effect.x) !== 'undefined') ? effect.x : this.spriteOrigin.x);
            var y = ((typeof(effect.y) !== 'undefined') ? effect.y : this.spriteOrigin.y);
            if (x !== this.spriteOrigin.x || y !== this.spriteOrigin.y) {
                // @TODO: Is that good to change directly the position?
                var newPosition = effect.properties.shift.calculate(this.spriteOrigin.x, this.spriteOrigin.y, x, y, delta.percent);
                // @TODO: FOR circle console.log("OX:", this.spriteOrigin.x, "OY", this.spriteOrigin.y, "X:", x, "Y:", y, "NX:", newPosition.x, "NY:", newPosition.y);
                this.sprite.x = newPosition.x;
                this.sprite.y = newPosition.y;
            }
            
            if (delta.finish === true) {
                effect.properties.complete = true;
            }
        }
    };
    
    Animation.prototype.move = function (x, y) {
        var bundle = new Array();
        bundle.push({x: x, y: y});
        this.addBundle(bundle);
        return (this);
    };
    
    Animation.prototype.setSlice = function (x, y, width, height) {
        var bundle = new Array();
        bundle.push({sliceX: x, sliceY: y, width: width, height: height, sliceWidth: width, sliceHeight: height});
        this.addBundle(bundle);
        return (this);
    };

    Animation.prototype.wait = function (frames) {
        var bundle = new Array();
        bundle.push({frames: frames});
        this.addBundle(bundle);
        return (this);
    };

    Animation.prototype.waitTime = function (time) {
        var bundle = new Array();
        bundle.push({time: time});
        this.addBundle(bundle);
        return (this);
    };

    Animation.prototype.remove = function () {
        var bundle = new Array();
        bundle.push({remove: true});
        this.addBundle(bundle);
    };

    Animation.prototype.repeat = function (time) {
        var bundle = new Array();
        bundle.push({repeat: (typeof(time) !== "undefined" ? time : -1)});
        this.addBundle(bundle);
        return (this);
    };
    
    Animation.prototype.startAnimation = function (animation) {
        var bundle = new Array();
        bundle.push({animation: animation});
        this.addBundle(bundle);
        return (this);
    };
    
    Animation.prototype.execute = function (f) {
        var bundle = new Array();
        bundle.push({execute: f});
        this.addBundle(bundle);
        return (this);
    };
    
    Animation.prototype.sound = function (sound) {
        var bundle = new Array();
        bundle.push({sound: sound});
        this.addBundle(bundle);
        return (this);
    };
    
    Animation.prototype.pauseSound = function (sound) {
        var bundle = new Array();
        bundle.push({playSound: sound});
        this.addBundle(bundle);
        return (this);
    };
    
    Animation.prototype.clean = function () {
        this.bundles = new Array();
        this.curBundle = 0;
        this.lastBundle = -1;
        this.spriteOrigin = null;
        this.startTime = -1;
        this.time = 0;
    };
    
    Animation.prototype.offset = function (x, y) {
        this.sprite.x += x;
        this.sprite.y += y;
        for (bundle in this.bundles) {
            for (effect in this.bundles[bundle]) {
                if (typeof(this.bundles[bundle][effect].x) !== "undefined") {
                    this.bundles[bundle][effect].x += x;
                }
                if (typeof(this.bundles[bundle][effect].y) !== "undefined") {
                    this.bundles[bundle][effect].y += y;
                }
            }
        }
    };
    
    Animation.prototype.clone = function (newSprite) {
        WCP.add(newSprite);
        var o = new Animation(newSprite);
        
        for (var i in this) {
            if (this.hasOwnProperty(i) && i !== "animateId" && i !== "bundles" && i !== "sprite") {
                o[i] = this[i];
            }
        }
        
        // @TODO: opti
        for (var bundle in this.bundles) {
            var newBundle = new Array();
            for (var effect in this.bundles[bundle]) {
                var newEffect = {};
                for (var i in this.bundles[bundle][effect]) {
                    if (i === "properties") {
                        var newProperties = {};
                        for (var j in this.bundles[bundle][effect][i]) {
                            newProperties[j] = this.bundles[bundle][effect][i][j];
                        }
                        newEffect[i] = newProperties;
                    }
                    else {
                        newEffect[i] = this.bundles[bundle][effect][i];
                    }
                }
                newBundle.push(newEffect);
            }
            o.bundles.push(newBundle);
        }
        return (o);
    };
    
    /*
     * Shift
     */
    function shiftCircle(fx, fy, tx, ty, percent, semi, clockwise) {
        var centerX = (fx + tx) / 2;
        var centerY = (fy + ty) / 2;
        
        var h = centerY - fy;
        var w = fx - centerX;
        
        var dist = Math.sqrt(h * h + w * w);
                
        if(w == 0) {
            if(h > 0)
                var initAngle = - Math.PI / 2;
            else
                var initAngle = Math.PI / 2;
        }
        else {
            var atan = Math.atan(h / Math.abs(w));
            if(w > 0)
                var initAngle = atan;
            else {
                var initAngle = Math.PI - atan;
            }
        }
        
        if(clockwise)
            var addAngle = 1 * semi * percent * Math.PI;
        else
            var addAngle = -1 * semi * percent * Math.PI;	
            
        var angle = initAngle + addAngle;

        var current = {};
        
        current.x = Math.floor(centerX + dist * Math.cos(angle));
        current.y = Math.floor(centerY + dist * Math.sin(angle));

        return (current);
    }
    var Shift = {
        line: {
            calculate: function (fx, fy, tx, ty, percent) {
                var current = {};
                current.x = fx + percent * (tx - fx);
                current.y = fy + percent * (ty - fy);
                return (current);
            }
        },
        circle: {
            calculate: function (fx, fy, tx, ty, percent) {
                return (shiftCircle(fx, fy, tx, ty, percent, 1, 2));
            }
        },
        circleReverse: {
            calculate: function (fx, fy, tx, ty, percent) {
                return (shiftCircle(fx, fy, tx, ty, percent, -1, 2));
            }
        },
        semiCircle: {
            calculate: function (fx, fy, tx, ty, percent) {
                return (shiftCircle(fx, fy, tx, ty, percent, 1, 1));
            }
        },
        semiCircleReverse: {
            calculate: function (fx, fy, tx, ty, percent) {
                return (shiftCircle(fx, fy, tx, ty, percent, -1, 1));
            }
        }
    };
    
    /*
     * Ease
     */
    var Ease = {
        none: {
            calculate: function (percent) {
                return (percent);
            }
        },
        parabolic: {
            calculate: function (percent) {
                return (percent * percent);
            }
        },
        parabolicReverse: {
            calculate: function (percent) {
                return (1 - ((percent - 1) * (percent - 1)));
            }
        }
    };
    
    /*
     * Duration Type
     */
    var durationType = {
        NONE: 1,
        FRAMES: 2,
        TIME: 3
    };
    
    WCP.Clip = Clip;
    WCP.TimeLine = TimeLine;
    WCP.Animation = Animation;
    WCP.Ease = Ease;
    WCP.Shift = Shift;
})(WCP);

(function(WCP) {

    function AssetManager() {
        this.assetsCollection = {};
        this.assetsCount = 0;
        this.assetsLoaded = 0;
        this.callbackLoadProgress = null;
        this.callbackLoadComplete = null;
    }

    AssetManager.prototype.add = function(assetName, url) {
        var self = this;
        if (typeof assetName === 'object') {
            for ( var i in assetName) {
                this.add(i, assetName[i]);
            }
        } else {
            var type = url.substr(url.length - 4).toLowerCase();
            if (type == ".jpg" || type == ".png" || type == ".svg"
                    || type == ".gif") {
                var asset = new Image();
                asset.loadFromSrc = url;
                asset.loaded = false;
                asset.loading = false;
                asset.type = type;
                asset.onload = function() {
                    self.imageLoaded(asset);
                };
                this.assetsCollection[assetName] = asset;
                this.assetsCount++;
                return (asset);
            } else if (type == ".ogg" || type == ".mp3") {
                var asset = new Audio(url);
                asset.loadFromSrc = url;
                asset.type = type;
                asset.load();
                this.assetsCollection[assetName] = asset;
                this.assetsCount++;
                this.assetsLoaded++;
                return (asset);
            } else {
                console.log("Error type file(s) loading");
                return;
            }
        }
    };
    AssetManager.prototype.loadAll = function() {
        for ( var i in this.assetsCollection) {
            var asset = this.assetsCollection[i];

            if (!asset.loaded && !asset.loading) {
                asset.src = asset.loadFromSrc;
                asset.loading = true;
            }
        }
    };
    AssetManager.prototype.get = function(assetName) {
        return (this.assetsCollection[assetName]);
    };
    AssetManager.prototype.size = function() {
        return (this.assetsCount);
    };
    AssetManager.prototype.imageLoaded = function(oAsset) {
        this.assetsLoaded++;
        oAsset.loaded = true;
        oAsset.loading = false;

        if (this.callbackLoadProgress) {
            this.callbackLoadProgress.apply(null, [ this, oAsset,
                    this.assetsLoaded, this.assetsCount ]);
        }

        if (this.assetsLoaded == this.assetsCount && this.callbackLoadComplete) {
            this.callbackLoadComplete.apply(null, [ this ]);
        }
    };
    /**
     * callback(oAssetManager, oAsset, iAssetsLoaded, iAssetsLength)
     */
    AssetManager.prototype.onLoadProgress = function(callback) {
        this.callbackLoadProgress = callback;
    };
    /**
     * callback(oAssetManager)
     */
    AssetManager.prototype.onLoadComplete = function(callback) {
        this.callbackLoadComplete = callback;
    };
    WCP.Assets = new AssetManager();
})(WCP);
(function (WCP) {
    "use strict";
    
    /**
    * Class SoundEntity
    * Provides some facilities to manipulate an Audio type
    * @param audio, can be the source of the audio file or an Audio object
    * @param params (optional), some parameters for the Audio object
    *
    */
    
    function SoundEntity(audio, params) {
        if (typeof audio === "object") {
            this.sound = audio;
        } else {
            this.sound = new Audio();
            this.sound.src = audio;
        }
        this.sound.volume = 0.5;
        this.param(params);
    }


    SoundEntity.prototype.param = function (params) {
        var i;
        for (i in params) {
            if (i === 'volume') {
                this.sound[i] = params[i] / 100;
            } else {
                this.sound[i] = params[i];
            }
        }
    };

    /**
    * Uses Audio.play()
    * No effect if the sound is already playing
    */

    SoundEntity.prototype.play = function () {
        this.sound.play();
    };

    /**
    * Uses Audio.pause()
    * No effect if the sound is already paused
    */
    SoundEntity.prototype.pause = function () {
        this.sound.pause();
    };

    /**
    * Uses Audio.plaused
    * @returns true if the sound is paused
    */
    SoundEntity.prototype.paused = function () {
        return this.sound.paused || this.sound.currentTime === 0 || this.sound.currentTime === this.sound.duration;
    };

    /**
    * Calls play() if paused
    * Calls pause() if playing()
    */
    SoundEntity.prototype.togglePlay = function () {
        if (this.sound.paused || this.sound.currentTime === 0) {
            this.sound.play();
        } else {
            this.sound.pause();
        }
    };

    /**
    * Uses Audio.muted
    * When Audio.muted is set to true, mutes the sound.
    */
    SoundEntity.prototype.mute = function () {
        this.sound.muted = true;
    };

    /**
    * Unmutes the sound
    * @see mute()
    */
    SoundEntity.prototype.unmute = function () {
        this.sound.muted = false;
    };

    /**
    * Unmutes if muted
    * Mutes if not muted
    */
    SoundEntity.prototype.toggleMute = function () {
        if (!this.sound.muted) {
            this.mute();
        } else {
            this.unmute();
        }
    };

    /**
    * Returns the state of the sound (muted or not muted)
    * @returns true if muted
    */
    SoundEntity.prototype.muted = function () {
        return this.sound.muted;
    };


    /**
    * Set the volume to vol
    * @param vol, the new volume to set
    * If no param given, returns the actual volume
    * @returns the sound's volume
    */
    SoundEntity.prototype.volume = function (vol) {
        if (vol) {
            if (vol > 100) {
                vol = 100;
            }
            if (vol < 0) {
                vol = 0;
            }
            this.sound.volume = vol / 100;
        }
        return this.sound.volume * 100;
    };

    /**
    * Returns the sounds duration
    * @return Audio.duration
    */
    SoundEntity.prototype.duration = function (dur) {
        return this.sound.duration;
    };

    /**
    * If no time given, returns the currentTime
    * Else, set the currentTime to t and returns the new currentTime
    * @param t, the new time to be set
    * @return Audio.currentTime
    */
    SoundEntity.prototype.time = function (t) {
        if (t >= 0) {
            this.sound.currentTime = t;
        }
        return this.sound.currentTime;
    };

    /**
    * Moves back by seconds second in the sound
    * @param seconds, if not given, moves by 1 second
    */
    SoundEntity.prototype.rearward = function (seconds) {
        this.sound.currentTime -= seconds || 1;
        if (this.sound.currentTime <= 0) {
            this.sound.currentTime = 0;
            this.sound.play();
        }
    };

    /**
    * Moves toward by seconds second in the sound
    * @param seconds, if not given, moves by 1 second
    */
    SoundEntity.prototype.forward = function (seconds) {
        this.sound.currentTime += seconds || 1;
    };




    /** @Prototype
    * Channel
    * Multiple identical sounds management
    * Use it for a short sound that you may play multi times simultaneously (exemple : laser firing)
    * USE : call Channel.play() whenever you want to play the sound, a new clone will be created automatically
    * @param : uses SoundEntity
    */
    function Channel(audio, params) {
        this.sounds = [];
        this.audio = audio;
        this.params = params;
        this.sounds.push(new SoundEntity(audio, params));
        this.clonable = false;
        this.setLimit(10);
    }


    Channel.prototype.setLimit = function (limit) {
        this.limit = limit;
        while (this.sounds.length < this.limit) {
            this.clone();
        }
    };

    Channel.prototype.getNew = function () {
        return new SoundEntity(this.audio.src, this.params);
    };

    /**
    * Clones the original sound and push it to the array IF the sound is ready
    */
    Channel.prototype.clone = function () {
        this.sounds.push(this.getNew());
    };

    /**
    * Creates a new clone and plays it
    */
    Channel.prototype.play = function () {
        var i;
        for (i = 0; i < this.sounds.length - 1;   i++) {
            if (this.sounds[i].time() === this.sounds[i].duration()) {
                this.sounds[i].time(0);
            }
            if (this.sounds[i].paused()) {
                this.sounds[i].play();
                return;
            }
        }
    };

    Channel.prototype.pause = function () {
    };

    /**
    * Sound manager
    * Allows to load, store and manage sounds.
    */

    function SoundManager() {
        this.sounds = [];
    }

    /**
    * Creates and stores a sound
    * @param location, src of the sound file
    * @param params (optional), parameters for the Audio file
    *         fill params.id to give and id to the sound so that you can find it again.
    *         if no id given, the sound can be found by its source location.
    */

    SoundManager.prototype.sound = function (audio, params) {
        var snd = new SoundEntity(audio, params);
        if (params.id) {
            this.sounds[params.id] = snd;
        } else if (snd.src) {
            this.sounds[snd.src] = snd;
        }
        return snd;
    };


    SoundManager.prototype.channel = function (audio, params) {
        var chan = new Channel(audio, params);
        if (params.id) {
            this.sounds[params.id] = chan;
        } else if (chan.src) {
            this.sounds[chan.src] = chan;
        }
        return chan;
    };

    /**
    * Returns the element of the array sounds correpsonding to the key given in argument
    * @params id, the key of the wanted element
    */

    SoundManager.prototype.get = function (id) {
        var i;
        for (i in this.sounds) {
            if (i === id) {
                return (this.sounds[i]);
            }
        }
    };

    SoundManager.prototype.shutDown = function () {
        var i;
        for (i in this.sounds) {
            this.sounds[i].pause();
        }
    };

    WCP.SoundManager = SoundManager;
}) (WCP);


(function (WCP, window, document) {

    "use strict";

    var spanBuffer;
    
    // Private functions
    
    function getMetrics(that) {
        // A optimiser
        var spbDom = document.createElement("span");
        document.body.appendChild(spbDom);
        spbDom.setAttribute('id', 'spanBuffer');
        spanBuffer = document.getElementById("spanBuffer");
        spanBuffer.style.font = that.weight + " " + that.size + "px " + that.font;
        var n_child = document.createTextNode(that.text);
        spbDom.appendChild(n_child);
        var offsetHeight = spanBuffer.offsetHeight;
        //var width = WCP.ctx.measureText("qwertyploploutre").width;
        var width = spanBuffer.offsetWidth;
        //console.log(width)
        var descent = 0; //-BottomBaseline;
        var ascent = 0; //TopBaseline;
        document.body.removeChild(spanBuffer);
        return {height: offsetHeight, width:  width, descent: descent, ascent: ascent};
    }

    function traceWrite(txt, that) {
        WCP.ctx.save();
        WCP.ctx.rotate(WCP.Tools.degresToRadian(that.rotation));
        // GESTION BASELINE
        WCP.ctx.textBaseline = that.baseline;
        WCP.ctx.fillStyle = that.color;
        WCP.ctx.font = that.weight + " " + that.size + "px " + that.font;
        WCP.ctx.fillText(txt, that.x, that.y);
        WCP.ctx.restore();
    }

    // Class Text
    
    function Text(txt, x, y, width, color) {
        this.id = WCP.random(10, 99999); // ID RANDOM en attendant un solution pour les stack z-index !
        if (typeof txt === 'object') {
            this.txt = txt.text || "";
            this.x = txt.x || 0;
            this.y = txt.y || 0;
            this.width = txt.maxwidth || WCP.canvas.width;
            this.color = txt.color || "#333333";
            this.rotation = txt.rotation || 0;
            this.baseline = txt.baseline || "top";
            this.font = txt.font || "sans-serif";
            this.size = txt.size || 12;
            this.weight = txt.weight || "normal";
            this.wordwarp = txt.wordwarp || true;
        } else {
            this.txt = txt || "";
            this.x = x || 0;
            this.y = y || this.y;
            this.width = width || WCP.canvas.width;
            this.color = color || WCP.ctx.fillStyle;
            this.rotation = 0;
            this.baseline = "top";
            this.font = "sans-serif";
            this.size = 12;
            this.weight = "normal";
            this.wordwarp = true;
        }

        this.metrics = getMetrics(this);
        return this;
    }

    Text.prototype.draw = function () {
        if (this.txt !== "") {
            // VERIFIER COMPATIBILITE
            var mT = WCP.ctx.measureText(this.txt).width;
            if (mT + this.x > this.width && this.wordwarp) {
                // commencer le wrapping
                var words = this.txt.split(" ");
                var line = "";
                //this.lineHeight = getMetrics().height;

                for (var n = 0; n < words.length; n++) {
                    var testLine = line + words[n] + " ";
					var testWidth = WCP.ctx.measureText(testLine).width;
                    if (testWidth > (this.width - this.x)) {
                        traceWrite(line, this);
                        line = words[n] + " ";
                        this.y += this.metrics.height;
                    } else {
                        line = testLine;
                    }
                }
                traceWrite(line, this);
            } else {
                traceWrite(this.txt, this);
            }
            //this.y = this.y + this.metrics.height;
        }
    };
    
    
    Text.prototype.setFont = function (fnt, size, weight) {
        if (arguments.lenght !== 0) {
            this.size = size || this.size;
            this.weight = weight || this.weight;
            this.font = fnt;
        }
        return this.weight + " " + this.size + "px " + this.font;
    };
    
    Text.prototype.setSize = function (size) {
        if (arguments.lenght !== 0) {
            this.size = size;
            this.metrics = getMetrics(this);
        }
        return this.size;
    };

    Text.prototype.setColor = function (color) {
        if (arguments.lenght !== 0) {
            this.color = color;
        }
        return WCP.ctx.fillStyle;
    };
    
    Text.prototype.setText = function (txt) {
        if (arguments.lenght !== 0) {
            this.txt = txt;
            this.metrics = getMetrics(this);
        }
        return this.txt;
    };
    
    Text.prototype.setBaseline = function (baseline) {
        if (arguments.lenght !== 0) {
            this.baseline = baseline;
        }
        return this.baseline;
    };

    WCP.Text = Text;

})(WCP, window, document);

(function (WCP) {
    "use strict";

    /**
    * Filter object
    */
    function Filter() {}

    Filter.blur = function (obj, param) {
        return this.applyFilter(obj, "blur", param);
    };
    
    Filter.brightness = function (obj, param) {
        return this.applyFilter(obj, "brightness", param);
    };
    
    Filter.colorAdjust = function (obj, params) {
        return this.applyFilter(obj, "colorAdjust", params[0], params[1], params[2]);
    };
    
    Filter.contrast = function (obj, param) {
        return this.applyFilter(obj, "contrast", param);
    };
    
    Filter.grayscale = function (obj) {
        return this.applyFilter(obj, "grayscale");
    };
    
    Filter.hue = function (obj, param) {
        return this.applyFilter(obj, "hue", param);
    };

    Filter.invert = function (obj) {
        return this.applyFilter(obj, "invert");
    };

    Filter.lightness = function (obj, param) {
        return this.applyFilter(obj, "lightness", param);
    };
    
    Filter.mosaic = function (obj, param) {
        return this.applyFilter(obj, "mosaic", param);
    };
    
    Filter.saturation = function (obj, param) {
        return this.applyFilter(obj, "saturation", param);
    };
    
    Filter.sepia = function (obj) {
        return this.applyFilter(obj, "sepia");
    };
    
    Filter.solarize = function (obj) {
        return this.applyFilter(obj, "solarize");
    };
    
    Filter.threshold = function (obj, param) {
        return this.applyFilter(obj, "threshold", param);
    };

    Filter.filter = function (obj, filterName, params) {
        return this.applyFilter(obj, params[0], params[1], params[2], params[3]);
    };

    Filter.applyFilter = function (obj, filterName, param1, param2, param3) {
        if (!obj) {
            WCP.log("filter: Unable to apply a filter on an inexisting object");
            return null;
        }

        var buffer = WCP.bufferCanvas(obj.width, obj.height);
        if (obj instanceof WCP.Sprite) {
            buffer.ctx.drawImage(obj.img, obj.sliceX, obj.sliceY, obj.sliceWidth,
                obj.sliceHeight, 0, 0, obj.width, obj.height);
        } else if (obj instanceof Image) {
            buffer.ctx.drawImage(obj, 0, 0, obj.width, obj.height);
        }
        var imageData = this.filterApplyFilter(buffer.ctx, obj, filterName, param1, param2, param3);
        buffer.ctx.putImageData(imageData, 0, 0);
        return buffer;
    };

    Filter.filterApplyFilter = function (ctx, obj, filterName, param1, param2, param3) {
        var filters = {
            blur: this.filterApplyBlur,
            brightness: this.filterApplyBrightness,
            colorAdjust: this.filterApplyColorAdjust,
            contrast: this.filterApplyContrast,
            grayscale: this.filterApplyGrayscale,
            hue: this.filterApplyHueOrSaturation,
            invert: this.filterApplyInvert,
            lightness: this.filterApplyLightness,
            mosaic: this.filterApplyMosaic,
            saturation: this.filterApplyHueOrSaturation,
            sepia: this.filterApplySepia,
            solarize: this.filterApplySolarize,
            threshold: this.filterApplyThreshold
        };

        var imageData = ctx.getImageData(0, 0, obj.width, obj.height);
        if (filterName === 'hue') {
            param2 = 0;
        }
        else if (filterName === 'saturation') {
            param2 = param1;
            param1 = 0;
        }
        if (filterName === 'colorAdjust' && typeof(param2) === "undefined" && typeof(param3) === "undefined") {
            param2 = param1[1];
            param3 = param1[2];
            param1 = param1[0];
        }
        if (filters[filterName]) {
            filters[filterName](imageData.data, imageData.width, imageData.height, param1, param2, param3);
        }
        return imageData;
    };

    Filter.filterApplyBlur = function (imageData, width, height, adjustment) { // from 1 to +infinity (6, it's already not bad)
        adjustment = Math.max(1, adjustment);
        var imageDataTmp = imageData;
        for (var count = 0; count < adjustment; count++) {
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    var idx2 = (x + (y - 1) * width) * 4;
                    var r2 = imageData[idx2];
                    var g2 = imageData[idx2 + 1];
                    var b2 = imageData[idx2 + 2];
                    var idx4 = (x - 1 + y * width) * 4;
                    var r4 = imageData[idx4];
                    var g4 = imageData[idx4 + 1];
                    var b4 = imageData[idx4 + 2];
                    var idx5 = (x + y * width) * 4;
                    var r5 = imageData[idx5];
                    var g5 = imageData[idx5 + 1];
                    var b5 = imageData[idx5 + 2];
                    var idx6 = (x + 1 + y * width) * 4;
                    var r6 = imageData[idx6];
                    var g6 = imageData[idx6 + 1];
                    var b6 = imageData[idx6 + 2];
                    var idx8 = (x + (y + 1) * width) * 4;
                    var r8 = imageData[idx8];
                    var g8 = imageData[idx8 + 1];
                    var b8 = imageData[idx8 + 2];
                    if (y - 1 < 0) {
                        r2 = imageData[idx5];
                        g2 = imageData[idx5 + 1];
                        b2 = imageData[idx5 + 2];
                    }
                    if (x - 1 < 0) {
                        r4 = imageData[idx5];
                        g4 = imageData[idx5 + 1];
                        b4 = imageData[idx5 + 2];
                    }
                    if (x + 1 >= width) {
                        r6 = imageData[idx5];
                        g6 = imageData[idx5 + 1];
                        b6 = imageData[idx5 + 2];
                    }
                    if (y + 1 >= height) {
                        r8 = imageData[idx5];
                        g8 = imageData[idx5 + 1];
                        b8 = imageData[idx5 + 2];
                    }
                    imageDataTmp[idx5] = (r2 + r4 + r5 * 2 + r6 + r8) / 6;
                    imageDataTmp[idx5 + 1] = (g2 + g4 + g5 * 2 + g6 + g8) / 6;
                    imageDataTmp[idx5 + 2] = (b2 + b4 + b5 * 2 + b6 + b8) / 6;
                }
            }
            imageData = imageDataTmp;
        }
    };

    Filter.filterApplyBrightness = function (imageData, width, height, adjustment) { // from -150 to +150
        adjustment = (Math.max(-150, Math.min(150, adjustment))) * 100 / 150;
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var idx = (x + y * width) * 4;
                var r = imageData[idx];
                var g = imageData[idx + 1];
                var b = imageData[idx + 2];
                imageData[idx] = Math.round(r * (1 + adjustment / 100));
                imageData[idx + 1] = Math.round(g * (1 + adjustment / 100));
                imageData[idx + 2] = Math.round(b * (1 + adjustment / 100));
            }
        }
    };

    Filter.filterApplyColorAdjust = function (imageData, width, height, red, green, blue) { // from 0 to +255
        red = Math.round((Math.max(0, Math.min(255, red))) - 255);
        green = Math.round((Math.max(0, Math.min(255, green))) - 255);
        blue = Math.round((Math.max(0, Math.min(255, blue))) - 255);
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var idx = (x + y * width) * 4;
                var r = imageData[idx] + red;
                var g = imageData[idx + 1] + green;
                var b = imageData[idx + 2] + blue;
                if (r > 255) {
                    imageData[idx] = 255;
                } else if (r < 0) {
                    imageData[idx] = 0;
                } else {
                    imageData[idx] = r;
                }
                if (g > 255) {
                    imageData[idx + 1] = 255;
                } else if (g < 0) {
                    imageData[idx + 1] = 0;
                } else {
                    imageData[idx + 1] = g;
                }
                if (b > 255) {
                    imageData[idx + 2] = 255;
                } else if (b < 0) {
                    imageData[idx + 2] = 0;
                } else {
                    imageData[idx + 2] = b;
                }
            }
        }
    };

    Filter.filterApplyContrast = function (imageData, width, height, adjustment) { // from -1.0 to + infinity (+3.0, it's already not bad)
        adjustment = Math.max(-1.0, adjustment);
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var idx = (x + y * width) * 4;
                var r = imageData[idx];
                var g = imageData[idx + 1];
                var b = imageData[idx + 2];
                imageData[idx] = Math.round(r + adjustment * (r - 127));
                imageData[idx + 1] = Math.round(g + adjustment * (g - 127));
                imageData[idx + 2] = Math.round(b + adjustment * (b - 127));
            }
        }
    };

    Filter.filterApplyGrayscale = function (imageData, width, height) {
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var idx = (x + y * width) * 4;
                var r = imageData[idx];
                var g = imageData[idx + 1];
                var b = imageData[idx + 2];
                var v = 0.3 * r + 0.59 * g + 0.11 * b;
                imageData[idx] = v;
                imageData[idx + 1] = v;
                imageData[idx + 2] = v;
            }
        }
    };

    Filter.filterApplyHueOrSaturation = function (imageData, width, height, hue, saturation) { // from -180 to +180 for the Hue and from -100 to +100 for the Saturation
        hue = Math.max(-180, Math.min(180, hue));
        hue = (hue % 360) / 360;
        var hue6 = hue * 6;
        saturation = (Math.max(-100, Math.min(100, saturation))) / 100;
        if (saturation < 0) {
            saturation++;
        } else {
            saturation = saturation * 2 + 1;
        }
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var idx = (x + y * width) * 4;
                var r = imageData[idx];
                var g = imageData[idx + 1];
                var b = imageData[idx + 2];
                var vs = r;
                if (g > vs) {
                    vs = g;
                }
                if (b > vs) {
                    vs = b;
                }
                var ms = r;
                if (g < ms) {
                    ms = g;
                }
                if (b < ms) {
                    ms = b;
                }
                var vm = vs - ms;
                var l = (ms + vs) / 510;
                if (l > 0) {
                    if (vm > 0) {
                        var s = 0;
                        var v = 0;
                        var h = 0;
                        if (l <= 0.5) {
                            s = vm / (vs + ms) * saturation;
                            if (s > 1) {
                                s = 1;
                            }
                            v = (l * (1 + s));
                        } else {
                            s = vm / (510 - vs - ms) * saturation;
                            if (s > 1) {
                                s = 1;
                            }
                            v = (l + s - l * s);
                        }
                        if (r === vs) {
                            if (g === ms) {
                                h = 5 + ((vs - b) / vm) + hue6;
                            } else {
                                h = 1 - ((vs - g) / vm) + hue6;
                            }
                        } else if (g === vs) {
                            if (b === ms) {
                                h = 1 + ((vs - r) / vm) + hue6;
                            } else {
                                h = 3 - ((vs - b) / vm) + hue6;
                            }
                        } else {
                            if (r === ms) {
                                h = 3 + ((vs - g) / vm) + hue6;
                            } else {
                                h = 5 - ((vs - r) / vm) + hue6;
                            }
                        }
                        if (h < 0) {
                            h += 6;
                        }
                        if (h >= 6) {
                            h -= 6;
                        }
                        var m = (l + l - v);
                        var sextant = h >> 0;
                        if (sextant === 0) {
                            r = v * 255;
                            g = (m + ((v - m) * (h - sextant))) * 255;
                            b = m * 255;
                        } else if (sextant === 1) {
                            r = (v - ((v - m) * (h - sextant))) * 255;
                            g = v * 255;
                            b = m * 255;
                        } else if (sextant === 2) {
                            r = m * 255;
                            g = v * 255;
                            b = (m + ((v - m) * (h - sextant))) * 255;
                        } else if (sextant === 3) {
                            r = m * 255;
                            g = (v - ((v - m) * (h - sextant))) * 255;
                            b = v * 255;
                        } else if (sextant === 4) {
                            r = (m + ((v - m) * (h - sextant))) * 255;
                            g = m * 255;
                            b = v * 255;
                        } else if (sextant === 5) {
                            r = v * 255;
                            g = m * 255;
                            b = (v - ((v - m) * (h - sextant))) * 255;
                        }
                    }
                }
                if (r > 255) {
                    imageData[idx] = 255;
                } else if (r < 0) {
                    imageData[idx] = 0;
                } else {
                    imageData[idx] = r;
                }
                if (g > 255) {
                    imageData[idx + 1] = 255;
                } else if (g < 0) {
                    imageData[idx + 1] = 0;
                } else {
                    imageData[idx + 1] = g;
                }
                if (b > 255) {
                    imageData[idx + 2] = 255;
                } else if (b < 0) {
                    imageData[idx + 2] = 0;
                } else {
                    imageData[idx + 2] = b;
                }
            }
        }
    };

    Filter.filterApplyInvert = function (imageData, width, height) {
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var idx = (x + y * width) * 4;
                imageData[idx] = 255 - imageData[idx];
                imageData[idx + 1] = 255 - imageData[idx + 1];
                imageData[idx + 2] = 255 - imageData[idx + 2];
            }
        }
    };

    Filter.filterApplyLightness = function (imageData, width, height, lightness) { // from -100 to +100
        lightness = (Math.max(-100, Math.min(100, lightness))) / 100;
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var idx = (x + y * width) * 4;
                var r = imageData[idx];
                var g = imageData[idx + 1];
                var b = imageData[idx + 2];
                if (lightness < 0) {
                    r *= (lightness + 1);
                    g *= (lightness + 1);
                    b *= (lightness + 1);
                } else if (lightness > 0) {
                    r = r * (1 - lightness) + lightness * 255;
                    g = g * (1 - lightness) + lightness * 255;
                    b = b * (1 - lightness) + lightness * 255;
                }
                if (r > 255) {
                    imageData[idx] = 255;
                } else if (r < 0) {
                    imageData[idx] = 0;
                } else {
                    imageData[idx] = r;
                }
                if (g > 255) {
                    imageData[idx + 1] = 255;
                } else if (g < 0) {
                    imageData[idx + 1] = 0;
                } else {
                    imageData[idx + 1] = g;
                }
                if (b > 255) {
                    imageData[idx + 2] = 255;
                } else if (b < 0) {
                    imageData[idx + 2] = 0;
                } else {
                    imageData[idx + 2] = b;
                }
            }
        }
    };

    Filter.filterApplyMosaic = function (imageData, width, height, mosaic) { // from 2 to +infinity (+10 it's already not bad)
        mosaic = Math.max(2, mosaic);
        for (var x1 = 0; x1 < width; x1 += mosaic) {
            for (var y1 = 0; y1 < height; y1 += mosaic) {
                var idx1 = (x1 + y1 * width) * 4;
                var r = imageData[idx1];
                var g = imageData[idx1 + 1];
                var b = imageData[idx1 + 2];
                var mosaicX = mosaic;
                var mosaicY = mosaic;
                if (mosaicX + x1 > width) {
                    mosaicX = width - x1;
                }
                if (mosaicY + y1 > height) {
                    mosaicY = height - y1;
                }
                for (var x2 = x1; x2 < x1 + mosaicX; x2 ++) {
                    for (var y2 = y1; y2 < y1 + mosaicY; y2 ++) {
                        var idx2 = (x2 + y2 * width) * 4;
                        imageData[idx2] = r;
                        imageData[idx2 + 1] = g;
                        imageData[idx2 + 2] = b;
                    }
                }
            }
        }
    };

    Filter.filterApplySepia = function (imageData, width, height) {
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var idx = (x + y * width) * 4;
                var r = imageData[idx];
                var g = imageData[idx + 1];
                var b = imageData[idx + 2];
                var rTmp = r * 0.393 + g * 0.769 + b * 0.189;
                var gTmp = r * 0.349 + g * 0.686 + b * 0.168;
                var bTmp = r * 0.272 + g * 0.534 + b * 0.131;
                if (rTmp > 255) {
                    imageData[idx] = 255;
                } else if (rTmp < 0) {
                    imageData[idx] = 0;
                } else {
                    imageData[idx] = rTmp;
                }
                if (gTmp > 255) {
                    imageData[idx + 1] = 255;
                } else if (gTmp < 0) {
                    imageData[idx + 1] = 0;
                } else {
                    imageData[idx + 1] = gTmp;
                }
                if (bTmp > 255) {
                    imageData[idx + 2] = 255;
                } else if (bTmp < 0) {
                    imageData[idx + 2] = 0;
                } else {
                    imageData[idx + 2] = bTmp;
                }
            }
        }
    };

    Filter.filterApplySolarize = function (imageData, width, height) {
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var idx = (x + y * width) * 4;
                var r = imageData[idx];
                var g = imageData[idx + 1];
                var b = imageData[idx + 2];
                if (r > 127) {
                    r = 255 - r;
                }
                if (g > 127) {
                    g = 255 - g;
                }
                if (b > 127) {
                    b = 255 - b;
                }
                imageData[idx] = r;
                imageData[idx + 1] = g;
                imageData[idx + 2] = b;
            }
        }
    };

    Filter.filterApplyThreshold = function (imageData, width, height, threshold) { // from 0 to 254
        threshold = Math.max(0, Math.min(254, threshold));
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var idx = (x + y * width) * 4;
                var r = imageData[idx];
                var g = imageData[idx + 1];
                var b = imageData[idx + 2];
                var v = 0;
                if (0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold) {
                    v = 255;
                }
                imageData[idx] = v;
                imageData[idx + 1] = v;
                imageData[idx + 2] = v;
            }
        }
    };

    Filter.AQUA = [0, 255, 255];
    Filter.BLACK = [0, 0, 0];
    Filter.BLUE = [0, 0, 255];
    Filter.FUCHSIA = [255, 0, 255];
    Filter.GRAY = [128, 128, 128];
    Filter.GREEN = [0, 128, 0];
    Filter.LIME = [0, 255, 0];
    Filter.MAROON = [128, 0, 0];
    Filter.NAVY = [0, 0, 128];
    Filter.OLIVE = [128, 128, 0];
    Filter.PURPLE = [128, 0, 128];
    Filter.RED = [255, 0, 0];
    Filter.SILVER = [192, 192, 192];
    Filter.TEAL = [0, 128, 128];
    Filter.WHITE = [255, 255, 255];
    Filter.YELLOW = [255, 255, 0];

    WCP.Filter = Filter;
})(WCP);

(function (WCP) {
    "use strict";

    function Matrix(matrix) {
        if (matrix.length < 2) {
            WCP.log('length too short');
            return (null);
        }
        for (var test = 1; test < matrix.length; test++) {
            if (matrix[0].length !== matrix[test].length) {
                WCP.log('Bad format');
                return (null);
            }
        }
        
        this.matrix = matrix;
        this.line = matrix.length;
        this.column = matrix[0].length;
        
        if (this.line === this.column) {
            this.square = this.line;
        } else {
            this.square = null;
        }
    }

    function MatrixDiagonal(elements) {
        if (elements.length < 2) {
            return (null);
        }
    
        var matrix = [];
        for (var i = 0; i < elements.length; i++) {
            matrix[i] = [];
            for (var j = 0; j < elements.length; j++) {
                matrix[i][j] = i === j ? elements[i] : 0;
            }
        }
        var m = new Matrix(matrix);
        return (m);
    }

    function MatrixIdentity(n) {
        if (n < 2) {
            return (null);
        }
        
        var elements = [];
        for (var i = 0; i < n; i++) {
            elements[i] = 1;
        }
        var m = new MatrixDiagonal(elements);
        return (m);
    }

    function MatrixRotation(angle) {
        var m = new Matrix([
                [Math.cos(angle), -Math.sin(angle)],
                [Math.sin(angle), Math.cos(angle)]
            ]);
        return m;
    }

    function MatrixRotationX(angle) {
        var m = new Matrix([
                [1, 0, 0],
                [0, Math.cos(angle), -Math.sin(angle)],
                [0, Math.sin(angle), Math.cos(angle)]
            ]);
        return m;
    }

    function MatrixRotationY(angle) {
        var m = new Matrix([
                [Math.cos(angle), 0, Math.sin(angle)],
                [0, 1, 0],
                [-Math.sin(angle), 0, Math.cos(angle)]
            ]);
        return m;
    }

    function MatrixRotationZ(angle) {
        var m = new Matrix([
                [Math.cos(angle), -Math.sin(angle), 0],
                [Math.sin(angle), Math.cos(angle), 0],
                [0, 0, 1]
            ]);
        return m;
    }

    function MatrixZero(c, l) {
        var matrix = [];
        for (var i = 0; i < c; i++) {
            matrix[i] = [];
            for (var j = 0; j < l; j++) {
                matrix[i][j] = 0;
            }
        }
        var m = new Matrix(matrix);
        return (m);
    }

    Matrix.prototype.add = function (matrix) {
        if ((this.column !== matrix.column) || (this.line !== matrix.line)) {
            return null;
        }
        
        var m = this.cpy();
        for (var y = 0; y < this.line; y++) {
            for (var x = 0; x < this.column; x++) {
                m.matrix[y][x] = m.matrix[y][x] + matrix.matrix[y][x];
            }
        }
        return m;
    };

    Matrix.prototype.at = function (line, col) {
        return (this.matrix[line][col]);
    };
    
    Matrix.prototype.cpy = function () {
        var cpyMatrix = [];
        for (var i = 0; i < this.line; i++) {
            cpyMatrix[i] = [];
            for (var j = 0; j < this.column; j++) {
                cpyMatrix[i][j] = this.at(i, j);
            }
        }

        var m = new Matrix(cpyMatrix);
        return m;
    };
    
    Matrix.prototype.determinant = function (n) {
        if (this.square === false) {
            return null;
        }
        if (arguments.length === 0) {
            n = this.column;
        }
        
        var d = 0;
        var m = new MatrixZero(3, 3);
        if (n === 2)
        {
            d = this.matrix[0][0] * this.matrix[1][1] - this.matrix[1][0] * this.matrix[0][1];
        } else {
            for (var col = 0; col < n; col++)
            {
                for (var i = 1; i < n; i++)
                {
                    var jm = 0;
                    for (var j = 0; j < n; j++)
                    {
                        if (j !== col) {
                            m.matrix[i - 1][jm] = this.matrix[i][j];
                            jm++;
                        }
                    }
                }
                
                d = d + Math.pow(-1.0, col) * this.matrix[0][col] * m.determinant(n - 1);
            }
        }

        return d;
    };

    Matrix.prototype.isSameSizeAs = function (matrix) {
        if (this.line === matrix.line && this.column === matrix.column) {
            return true;
        } else {
            return false;
        }
    };
    
    Matrix.prototype.mult = function (obj) {
        if (obj instanceof Matrix) {
            var matrix = [];
            for (var i = 0; i < this.line; i++) {
                matrix[i] = [];
                for (var jelem = 0; jelem < this.line; jelem++) {
                    var value = 0;
                    for (var j = 0; j < this.column; j++) {
                        value += this.at(i, j) * obj.at(j, jelem);
                    }
                    matrix[i][jelem] = value;
                }
            }
            
            var m = new Matrix(matrix);
            return m;
        }
    };
    
    Matrix.prototype.round = function () {
        var cpyMatrix = [];
        for (var i = 0; i < this.line; i++) {
            cpyMatrix[i] = [];
            for (var j = 0; j < this.column; j++) {
                cpyMatrix[i][j] = Math.round(this.at(i, j));
            }
        }

        var m = new Matrix(cpyMatrix);
        return m;
    };
    
    Matrix.prototype.show = function (name) {
        if (arguments.length === 1) {
            WCP.log('/-- ' + name + ' ---');
        } else {
            WCP.log('/----------');
        }
        for (var i = 0; i < this.column; i++) {
            console.log('[' + this.matrix[i].toString() + ']');
        }
        if (arguments.length === 1) {
            WCP.log('--- ' + name + ' --\\');
        } else {
            WCP.log('----------\\');
        }
    };
    
    Matrix.prototype.sub = function (matrix) {
        if ((this.column !== matrix.column) || (this.line !== matrix.line)) {
            return null;
        }
        
        var m = this.cpy();
        for (var y = 0; y < this.line; y++) {
            for (var x = 0; x < this.column; x++) {
                m.matrix[y][x] = m.matrix[y][x] - matrix.matrix[y][x];
            }
        }
        return m;
    };
    
    WCP.Matrix = Matrix;
    WCP.MatrixDiagonal = MatrixDiagonal;
    WCP.MatrixIdentity = MatrixIdentity;
    WCP.MatrixRotation = MatrixRotation;
    WCP.MatrixRotationX = MatrixRotationX;
    WCP.MatrixRotationY = MatrixRotationY;
    WCP.MatrixRotationZ = MatrixRotationZ;
    WCP.MatrixZero = MatrixZero;

})(WCP);

(function (WCP) {
    "use strict";

    window.requestAnimFrame = (function () {
        return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback, element) {
                    window.setTimeout(callback, 1000 / 20);
                };
    })();

    var scenesData = {
        scenes: [],
        scenesLength: 0,
        updatingScene: null,
        lastGlobalUpdateTime: 0
    };

    /**
     * WCP Global (internal) variables
     */
    WCP.globalFps = 60;
    WCP.fpsCounter = new WCP.TimeCounter();

    /**
     * Scene class
     */
    function Scene(param) {
        this.id = scenesData.scenesLength;
        // scene refresh rate (in ms)
        this.refresh = param.refreshRate || (1000 / 60);
        // scene last update time
        this.lastUpdate = 0;
        this.active = false;
        this.paused = false;

        this.sched = new WCP.TimeScheduler();
        this.drawElements = [];
        this.drawElementsLength = 0;

        // Scene methods
        this.fn = {
            init: param.init || (function () {}),
            loop: param.loop || (function () {}),
            draw: param.draw || (function () {}),
            destroy: param.destroy || (function () {})
        };

        // Registering the new scene
        scenesData.scenes[this.id] = this;
        scenesData.scenesLength++;
    }

    Scene.prototype.update = function () {
        if (this.active) {
            scenesData.updatingScene = this;

            this.sched.update();
            this.fn.loop.call(this);
            this.draw();

            scenesData.updatingScene = null;
        }
    };

    Scene.prototype.draw = function () {
        for (var i in this.drawElements) {
            if (this.drawElements.hasOwnProperty(i)) {
                var s = this.drawElements[i];

                s.draw();
            }
        }
        
        this.fn.draw.call(this);
    };

    Scene.prototype.start = function (params) {
        this.active = true;

        scenesData.updatingScene = this;
        this.fn.init.call(this, params);
        scenesData.updatingScene = null;
    };

    Scene.prototype.stop = function () {
        scenesData.updatingScene = this;
        this.fn.destroy.call(this);
        scenesData.updatingScene = null;

        this.active = false;
        this.paused = false;
        this.lastUpdate = 0;

        this.drawElements = [];
        this.drawElementsLength = 0;
        this.sched.reset();
    };

    Scene.prototype.pause = function () {
        if (!this.paused && this.active) {
            this.paused = true;
            this.active = false;

            this.sched.unpause();
        }
    };

    Scene.prototype.unpause = function () {
        if (this.paused) {
            this.paused = false;
            this.active = true;

            this.sched.unpause();
        }
    };

    Scene.prototype.add = function (s) {
        if (!s.id) {
            WCP.log('Scene.addSprite: invalid parameter "s": not a WCP.Sprite');
            return;
        }

        if (!this.drawElements[s.id]) {

            this.drawElements[s.id] = s;
        }
    };

    Scene.prototype.remove = function (s) {
        if (!s.id) {
            WCP.log('Scene.addSprite: invalid parameter "s": not a WCP.Sprite');
            return;
        }

        if (this.drawElements[s.id]) {
            delete this.drawElements[s.id];
        }
    };

    Scene.prototype.elapsed = function () {
        return (scenesData.lastGlobalUpdateTime - this.lastUpdate);
    };

    /**
     * Global WCP exports
     */
    function getScene(param) {
        if ((typeof param !== 'object') && scenesData.scenes[param]) {
            return (scenesData.scenes[param]);
        }

        if (typeof param === 'object') {
            return (param);
        }

        return (null);
    }

    function startScene(id, params) {
        var scene = getScene(id);

        if (scene) {
            scene.start(params);
        } else {
            WCP.log("WCP.startScene: invalid scene identifier: " + id);
        }
    }

    function stopScene(id) {
        var scene = getScene(id);

        if (scene) {
            scene.stop();
        } else {
            WCP.log("WCP.stopScene: invalid scene identifier: " + id);
        }
    }

    function pauseScene(id) {
        var scene = getScene(id);

        if (scene) {
            scene.pause();
        } else {
            WCP.log("WCP.pauseScene: invalid scene identifier: " + id);
        }
    }

    function unpauseScene(id) {
        var scene = getScene(id);

        if (scene) {
            scene.unpause();
        } else {
            WCP.log("WCP.unpauseScene: invalid scene identifier: " + id);
        }
    }

    function clearScenes() {
        for (var i = 0; i < scenesData.scenesLength; i++) {
            if (scenesData.scenes[i]) {
                var s = scenesData.scenes[i];

                if (s.active) {
                    s.destroy();
                    s.active = false;
                }
            }
        }
    }

    function setFps(v) {
        v = (v < 1 ? 1 : (v > 60 ? 60 : v));

        console.log(v);
        WCP.globalFps = v;
    }

    function getFps() {
        return (WCP.globalFps);
    }

    function getRealFps() {
        return (WCP.fpsCounter.get());
    }

    /**
     * Creates a proxy function to bind a global function (inside WCP) to call
     *   a function inside the 'scenesData.updatingScene' object
     *
     * @param functionName the final function to call
     * @param property (optional) the property
     */
    function createUpdatingSceneProxy(functionName, property) {
        if (property) {
            return (function () {
                if (scenesData.updatingScene) {
                    scenesData.updatingScene[property][functionName].apply(scenesData.updatingScene[property], arguments);
                }
            });
        }

        return (function () {
            if (scenesData.updatingScene) {
                scenesData.updatingScene[functionName].apply(scenesData.updatingScene, arguments);
            }
        });
    }

    // Scene class
    WCP.Scene = Scene;

    // Scene functions
    WCP.startScene = startScene;
    WCP.stopScene = stopScene;
    WCP.clearScenes = clearScenes;
    WCP.setFps = setFps;
    WCP.getFps = getFps;
    WCP.getRealFps = getRealFps;

    WCP.add = createUpdatingSceneProxy("add");
    WCP.remove = createUpdatingSceneProxy("remove");
    WCP.setTimeout = createUpdatingSceneProxy("setTimeout", "sched");
    WCP.clearTimeout = createUpdatingSceneProxy("clearTimeout", "sched");
    WCP.setInterval = createUpdatingSceneProxy("setInterval", "sched");
    WCP.clearInterval = createUpdatingSceneProxy("clearInterval", "sched");

    // Private data
    WCP.scenesData = scenesData;

    /**
     * Scenes GLOBAL updating function
     */
    function updateAllScenes() {
        window.requestAnimFrame(updateAllScenes);

        var time = WCP.millitime();

        // No update
        if ((time - scenesData.lastGlobalUpdateTime) < (1000 / WCP.globalFps)) {
            return;
        }

        scenesData.lastGlobalUpdateTime = time;

        var cleared = false;

        for (var i = 0; i < scenesData.scenesLength; i++) {
            if (typeof scenesData.scenes[i] !== 'undefined') {
                var scene = scenesData.scenes[i];

                if (scene.lastUpdate === 0) {
                    scene.lastUpdate = scenesData.lastGlobalUpdateTime;
                }

                if (!cleared) {
                    WCP.clear();
                    WCP.fpsCounter.tick();

                    cleared = true;
                }

                if (scene.active === true) {
                    scene.update();
                } else if (scene.paused) {
                    scene.draw();
                }

                scene.lastUpdate = scenesData.lastGlobalUpdateTime;
            }
        }
    }

    WCP.initScenes = function () {
        WCP.fpsCounter.reset();

        updateAllScenes();
    };
})(WCP);
