/*
* WeCanPlay : Library for html5 games
* http://www.wecanplay.fr/
* Version 1.0
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

        this.initViewModule();
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
        }
		return target;
    };

	Tools.extend = function(dest, src) {
		for (var i in src) {
            if (src.hasOwnProperty(i)) {
				dest[i] = src[i];
			}
		}
		return dest;
	}
	
    Tools.degresToRadian = function (degres) {
        return degres * Math.PI / 180;
    };

	Tools._length = function(object) {
		var size = 0, key;
		for (key in object) {
			if (object.hasOwnProperty(key)) {
				size++;
			}
		}
		return size;
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
    
    function Callback(action, key) {
        this.callback = action;
		this.parse(key);
    }
	
	Callback.prototype.parse = function (key) {
        if (typeof key === 'string' && key !== 'undefined') {
            var keys = key.split('|');
            this.keys = {};
            for (var i in keys) {
                this.keys[i] = keys[i];
            }
        }
	};
    
    /**
     * Event object contains the callbacks related to a specific type of event
     *
     */
    function Event() {
        this.callbacks = [];
    }
    
    Event.keyCodes = {
        8: "back_tab",
        9: "tab",
        13: "enter",
        16: "shift",
        17: "ctrl",
		18: "alt",
        20: "capslock",
        27: "escape",
        32: "space",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        48: "0",
        49: "1",
        50: "2",
        51: "3",
        52: "4",
        53: "5",
        54: "6",
        55: "7",
        56: "8",
        57: "9",
        65: "a",
        66: "b",
        67: "c",
        68: "d",
        69: "e",
        70: "f",
        71: "g",
        72: "h",
        73: "i",
        74: "j",
        75: "k",
        76: "l",
        77: "m",
        78: "n",
        79: "o",
        80: "p",
        81: "q",
        82: "r",
        83: "s",
        84: "t",
        85: "u",
        86: "v",
        87: "w",
        88: "x",
        89: "y",
        90: "z"
    };
    
    Event.keyCode = function (key) {
        for (var i in Event.keyCodes) {
            if (Event.keyCodes[i] === key) {
                return i;
            }
        }
        return -1;
    };
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
    CustomEvent.prototype.subscribe = function (action) {
		this.event.callbacks.push(new Callback(action));
	};

    CustomEvent.prototype.on = function (action) {
		this.subscribe(action);
    };
    /**
     * Removes the given action from the event
     *
     * @param action callback to remove, if not given, all callbacks are removed
     */
    CustomEvent.prototype.unsubscribe = function (action) {
        var found = false;
        for (var i in this.event.callbacks) {
			if (this.event.callbacks[i].callback) {
				if (this.event.callbacks[i].callback === action || !action) {
					delete this.event.callbacks[i];
					found = true;
				}
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
        if (params) {
            for (var i in this.event.callbacks) {
				if (this.event.callbacks[i].callback) {
					this.event.callbacks[i].callback(params);
				}
            }
        } else {
            for (var i in this.event.callbacks) {
				if (this.event.callbacks[i].callback) {
					this.event.callbacks[i].callback();
				}
            }
        }
    };
    
	/**
	 * ComboManager
	 *
	 */
	 
	function ComboManager() {
		this.combos = {};
		this.sequenceEntry = [];
		this.matchingSequences = {};
		this.sequenceToCall = 0;
		this._default = {
			interval_timeout: 500,
			ordered: true
		};
	}
	 
	ComboManager.prototype.addSequence = function (keys, sequence) {
        if (typeof sequence === "object") {
            sequence.sequence = true
        }
        this.add(keys, sequence);
	};

	ComboManager.prototype.add = function (keys, combo) {
		if (this.combos[keys]) {
			for (var j in combo) {
				this.combos[keys][j] = combo[j];
			}
		} else {
			this.combos[keys] = {};
			this.combos[keys] = WCP.Tools.cloneObject(this._default);
			WCP.Tools.extend(this.combos[keys], combo);
			if (!this.combos[keys].total_timeout) {
				this.combos[keys].total_timeout = this.combos[keys].interval_timeout * keys.split(' ').length;
			}
		}
	};

	ComboManager.prototype.getCombos = function () {
		var sequences = {};
		for (var c in this.combos) {
			if (this.combos[c].sequence === false) {
				sequences[c] = this.combos[c];
			}
		}
		return sequences;
	};

	ComboManager.prototype.getSequences = function () {
		var sequences = {};
		for (var c in this.combos) {
			if (this.combos[c].sequence === true) {
				sequences[c] = this.combos[c];
			}
		}
		return sequences;
	};

	ComboManager.prototype.getSequencesCopy = function () {
		var sequences = {};
		for (var c in this.combos) {
			if (this.combos[c].sequence === true) {
				sequences[c] = WCP.Tools.cloneObject(this.combos[c]);
			}
		}
		return sequences;
	};

	ComboManager.prototype.arrayCmp = function (firstArray, secondArray) {
		if (firstArray.length !== secondArray.length) {
			return false;
		}
		for (var a1 in firstArray) {
			var keyExists = false;
			for (var a2 in secondArray) {
				if (secondArray[a2] === firstArray[a1]) {
					keyExists = true;
					break;
				}
			}
			if (!keyExists) {
				return false;
			}
		}
		return true;
	};
	
	ComboManager.prototype.arrayCmpOrdered = function (firstArray, secondArray) {
		if (firstArray.length !== secondArray.length) {
			return false;
		}
		for (var a in firstArray) {
			if (firstArray[a] !== secondArray[a]) {
				return false;
			}
		}
		return true;
	};
		
	ComboManager.prototype.update = function (key) {
		// A key has been pushed, we have to cancel all the current flushing and sequence calling procedures
		// And add the new key to the sequenceEntry
		clearTimeout();
		this.sequenceToCall = 0;
		if (WCP.Tools._length(this.matchingSequences) === 0 && this.sequenceEntry.length === 0) {
			this.matchingSequences = this.getSequencesCopy();
			this.sequenceEntry.length = 0;
		}
		this.sequenceEntry.push(key);
		var timeout = 0;
		for (var s in this.matchingSequences) {
			// Keys string splitting
			var splitted = s.split(' ');
			if (splitted[this.sequenceEntry.length - 1] === this.sequenceEntry[this.sequenceEntry.length - 1].key) {
				if (this.sequenceEntry.length >= 2) {
					if (this.sequenceEntry[this.sequenceEntry.length - 1].age - this.sequenceEntry[this.sequenceEntry.length - 2].age > this.matchingSequences[s].interval_timeout) {
						// If the time since the last pressed key is longer than our actual sequence's timeout, BYEBYE
						delete this.matchingSequences[s];
						continue;
					}
				}
				// Getting the max interval_timeout for the entry sequence cancelling
				if (this.matchingSequences[s].interval_timeout > timeout) {
					timeout = this.matchingSequences[s].interval_timeout;
				}
				if (splitted.length === this.sequenceEntry.length) {
					// The sequence is valid.
					// Store its keydown function for a later use
					if (this.matchingSequences[s].keydown) {
						this.sequenceToCall = this.matchingSequences[s].keydown;
						delete this.matchingSequences[s];
					}
				}
			} else {
			// No match anymore. You're out.
				delete this.matchingSequences[s];
			}
		}
		// How much matching sequences do we have ?
		if (WCP.Tools._length(this.matchingSequences) === 0) {
		// 0 ? fak. Start another sequence
			if (this.sequenceToCall) {
				//No risk of conflict with another matching sequence because NO OTHER MATCHING SEQUENCE
				this.sequenceToCall();
				this.sequenceToCall = 0;
			}
			if (this.sequenceEntry.length > 1) {
				this.sequenceEntry.length = 0;
				this.update(key);
			} else {
				this.sequenceEntry.length = 0;
			}
		} else {
		// More than 0 ? GUD
			// Got to cancel the current sequence entry flushing procedure
			var that = this;
			// Engage a new flushing procedure

			setTimeout(function (that) {
				return function () {
					// Trigger the last valid sequence keydown function
					if (that.sequenceToCall) {
						that.sequenceToCall();
						that.sequenceToCall = 0;
					}
					that.sequenceEntry.length = 0;
					that.matchingSequences = {};
				}
			}(this), timeout);
		}
	};

	ComboManager.prototype.getMatchingCombos = function (combos, keys) {
		var validCombos = {};

		for (var c in combos) {
			if (typeof combos[c] !== "object") {
				continue;
			}
			var splitted = c.split(' ');
			if (combos[c].ordered) {
				if (this.arrayCmpOrdered(splitted, keys)) {
					validCombos[c] = combos[c];
				}
			} else {
				if (this.arrayCmp(splitted, keys)) {
					validCombos[c] = combos[c];
				}
			}
		}
		return validCombos;
	};
		
	ComboManager.prototype.find = function (criterias, callback) {
		if (criterias.type === 'combo') {
			var combos = this.getCombos();
			if (!criterias.keys) {
				callback(combos);
			}
			callback(this.getMatchingCombos(combos, criterias.keys));
		}
		if (criterias.type === 'sequence') {
			var sequences = this.getSequences();
			callback(sequences);
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
        targetClass.prototype.initCurrentEvent = EventTarget.prototype.initCurrentEvent;
        targetClass.prototype.initMobileEvent = EventTarget.prototype.initMobileEvent;
        targetClass.prototype.currentEvent = EventTarget.prototype.currentEvent;
        targetClass.prototype.listen = EventTarget.prototype.listen;
        targetClass.prototype.handleEvents = EventTarget.prototype.handleEvents;
        targetClass.prototype.custom = EventTarget.prototype.custom;
        targetClass.prototype.getEvent = EventTarget.prototype.getEvent;
        targetClass.prototype.register = EventTarget.prototype.register;
        targetClass.prototype.subscribe = EventTarget.prototype.subscribe;
        targetClass.prototype.unsubscribe = EventTarget.prototype.unsubscribe;
        targetClass.prototype.on = EventTarget.prototype.on;
        targetClass.prototype.off = EventTarget.prototype.off;
        targetClass.prototype.fire = EventTarget.prototype.fire;
        targetClass.prototype.parseEvent = EventTarget.prototype.parseEvent;
        targetClass.prototype.combo = EventTarget.prototype.combo;
        targetClass.prototype.advancedCombo = EventTarget.prototype.advancedCombo;
        targetClass.prototype.sequence = EventTarget.prototype.sequence;
        targetClass.prototype.advancedSequence = EventTarget.prototype.advancedSequence;
        targetClass.prototype.keydown = EventTarget.prototype.keydown;
		targetClass.prototype.keyup = EventTarget.prototype.keyup;
		var target = new targetClass();
		target.listen();
		return target;
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
        targetObject.initCurrentEvent = EventTarget.prototype.initCurrentEvent;
        targetObject.initMobileEvent = EventTarget.prototype.initMobileEvent;
        targetObject.currentEvent = EventTarget.prototype.currentEvent;
        targetObject.listen = EventTarget.prototype.listen;
        targetObject.handleEvents = EventTarget.prototype.handleEvents;
        targetObject.custom = EventTarget.prototype.custom;
        targetObject.getEvent = EventTarget.prototype.getEvent;
        targetObject.register = EventTarget.prototype.register;
        targetObject.subscribe = EventTarget.prototype.subscribe;
        targetObject.unsubscribe = EventTarget.prototype.unsubscribe;
        targetObject.on = EventTarget.prototype.on;
        targetObject.off = EventTarget.prototype.off;
        targetObject.fire = EventTarget.prototype.fire;
        targetObject.parseEvent = EventTarget.prototype.parseEvent;
        targetObject.combo = EventTarget.prototype.combo;
        targetObject.advancedCombo = EventTarget.prototype.advancedCombo;
        targetObject.sequence = EventTarget.prototype.sequence;
        targetObject.advancedSequence = EventTarget.prototype.advancedSequence;
        targetObject.keydown = EventTarget.prototype.keydown;
        targetObject.keyup = EventTarget.prototype.keyup;
		
		targetObject.initEvents();
		if (!WCP.canvas) {
			targetObject.custom("canvasReady");
			targetObject.on("canvasReady", function(that) {
				return function () {
					that.listen();
				};
			}(targetObject));
		} else {
			targetObject.listen();
		}
	};
    
    
    EventTarget.prototype.initEvents = function () {
		if (!this.events) {
			this.events = {};
		}
        if (!this.events._events) {
            this.events._events = [];
        }
    };
	
	EventTarget.prototype.initMobileEvent = function() {
		this.on("mousedown", function (that) {
			return function(evt) {
				that.events._lastEvent = evt;
			}
		}(this));

		this.on("mouseup", function (that) {
			return function(evt) {
				checkSwipe(that.events._lastEvent, evt, that);
			}
		}(this));
	};
	
	function checkDirection(lx, ly, x, y) {
		var xD, yD;
		xD = Math.abs(lx - x);
		yD = Math.abs(ly - y);
		if (xD >= yD) {
			if (lx - x > 0) {
				return("Left");
			} else {
				return("Right");
			}
		} else {
			if (ly - y > 0) {
				return("Up");
			} else {
				return("Down");
			}
		}	
	};
	
	function checkSwipe(lastEvt, evt, that) {
		var direction = checkDirection(lastEvt.clientX, lastEvt.clientY, evt.clientX, evt.clientY);
		var mvh = Math.abs(lastEvt.clientX - evt.clientX) > 30;
		var mvv = Math.abs(lastEvt.clientY - evt.clientY) > 30;
		if (mvh && (direction === "Left" || direction === "Right"))
			that.fire('swipe', direction);
		if (mvv && (direction === "Up" || direction === "Down"))
			that.fire('swipe', direction);
	};
	
    EventTarget.prototype.initCurrentEvent = function (param) {
		if (!this.events) {
			this.events = {};
		}
		this.events.currentEvent = param;
    };
    
    /**
     * Activates standard listeners on the given DOM element
     * Initializes the managable events
     * This method must be called before to try ANY management of ANY event.
     * This method MUST be called before to try any management of any event.
     * @param element (optional), the element to listen. If not given, WCP.canvas will be used by default
     */
    EventTarget.prototype.listen = function (element) {
		this.events = {};
        this.initEvents();
		this.events._keysdown = [];
		this.events._sequence = [];
		this.events._time = new Date();
		this.events._time.setTime(this.events._time.getTime());
		this.events._timeScheduler = new WCP.TimeScheduler();
		this.events._combos = new ComboManager();
        var domElement = element ? element : WCP.canvas;
        if (!domElement) {
            return;
        }
        
		var eventNames = {
			// Creating listeners
			// ---> PC <---
						
			"mouseover": true,
			"mouseout": true,
			"mousemove": true,
			"mousedown": true,
			"mouseup": true,
			"click": true,
			"dblclick": true,
			"keydown": true,
			"keypress": true,
			"keyup": true,
			
			// ---> MOBILE <---
			
			"touchstart": true,
			"touchmove": true,
			"touchend": true,
			"touchcancel": true,
			"drag": true,
			"dragstart": true,
			"dragmove": true,
			"dragend": true,
			"gesturestart": true,
			"gestureend": true,
			"gesturechange": true,
			
			// Scroll
			"scrollstart": true,
			"scrollstop": true,
			
			// Is triggered during a rotation gesture (two fingers rotating clockwise or counterclockwise).
			"rotate": true,
			"rotatecw": true,
			"rotateccw": true,
			
			// Is triggered during a pinch gesture (two fingers moving away from or towards each other).
			"pinch": true,
			"pinchopen": true,
			"pinchclose": true,
			
			
			// Triggers when a device orientation changes (by turning it vertically or horizontally).
			"orientationchange": true,
			
			// Mobile Tap --> Triggers after a quick, complete touch event.
			"tap": true,
			"taphold": true,
			"tapone": true,
			"taptwo": true,
			"tapthree": true,
			"dbltap": true,
			
			// Mobile Swipe --> Triggers when a horizontal drag of 30px or more (and less than 20px vertically) occurs within 1 second duration.
			"swipe": true,
			"swipemove": true,
			"swipeone": true,
			"swipetwo": true,
			"swipethree": true,
			"swipefour": true,
			"swipeup": true,
			"swiperightup": true,
			"swiperight": true,
			"swiperightdown": true,
			"swipedown": true,
			"swipeleftdown": true,
			"swipeleft": true,
			"swipeleftup": true
		};
		
		for (var i in eventNames) {
			this.events._events.push(new CustomEvent(i));
			domElement.addEventListener(i, function (that) {
				return function (evt) {
					that.handleEvents(evt);
				};
			}(this), false);
		}
		

		
		// listening canvas standard events


        window.addEventListener("keydown", function (that) {
                                return function (evt) {
                                    that.handleEvents(evt);
                                };
                            }(this));
        window.addEventListener("keyup", function (that) {
                                return function (evt) {
                                    that.handleEvents(evt);
                                };
                            }(this));
	};
  
    /**
     * Manages events triggering
     * Fires the triggering event using the standard event object as parameter
     * @private
    */

    EventTarget.prototype.handleEvents = function (evt) {
        if (typeof(this.events.currentEvent) !== 'undefined') {
            this.currentEvent(evt);
        }
		if (evt.type === "keydown") {
			this.events._combos.update({key: Event.keyCodes[evt.keyCode], age: WCP.millitime() % 10000});
			if (this.events._keysdown.indexOf(Event.keyCodes[evt.keyCode]) === -1) {
				this.events._keysdown.push(Event.keyCodes[evt.keyCode]);
				this.events._combos.find({keys: this.events._keysdown, type: 'combo'}, function (combos) {
					for (var c in combos) {
						if (combos[c].keydown) {
							combos[c].keydown(evt);
						}
					}
				});
			}
		}
		if (evt.type === "keyup") {
			this.events._combos.find({keys: this.events._keysdown, type: 'combo'}, function (combos) {
				for (var c in combos) {
					if (combos[c].keyup) {
						combos[c].keyup(evt);
					}
				}
			});
			if (this.events._keysdown.indexOf(Event.keyCodes[evt.keyCode]) !== -1) {
				this.events._keysdown.splice(this.events._keysdown.indexOf(Event.keyCodes[evt.keyCode]), 1);
			}
		}
		if (evt.type !== "keyup" && evt.type !== "keydown") {
			this.fire(evt.type, evt);
		}
    };

	EventTarget.prototype.keydown = function (key, action) {
		var combo = {
			keydown : action,
			sequence: false
		};
		this.events._combos.add(key, combo);
	};
	
	EventTarget.prototype.keyup = function (key, action) {
		var combo = {
			keyup : action,
			sequence: false
		};
		this.events._combos.add(key, combo);
	};
	
	EventTarget.prototype.combo = function (keys, action) {
		var combo = {
			keydown : action,
			sequence: false,
			ordered: true
		};
		this.events._combos.add(keys, combo);
	};
	
	EventTarget.prototype.sequence = function (keys, action) {
		var combo = {
			keydown : action,
			sequence: true
		};
		this.events._combos.add(keys, combo);
	};
	EventTarget.prototype.advancedCombo = function (combos) {
		for (var combo in combos) {
			this.events._combos.add(combo, combos[combo]);
		}
	};
	EventTarget.prototype.advancedSequence = function (sequences) {
		for (var sequence in sequences) {
			this.events._combos.addSequence(sequence, sequences[sequence]);
		}
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
            for (var i in this.events._events) {
                if (this.events._events[i].type === event) {
                    return this.events._events[i];
                }
            }
        }
    };
    
    /**
     * Store the management methods in given class's prototype allowing any instance of this class to manage the events of this event manager.
     * @param myClass is the class to register
    */
    
    EventTarget.prototype.register = function (myClass) {
        myClass.prototype.subscribe = function (that) {
            return function (event, action) {
                that.on(event, action);
            };
        }(this);
        myClass.prototype.on = function (event, action) {
            this.subscribe(event, action);
        };
        myClass.prototype.unsubscribe = function (that) {
            return function (event, action) {
                that.unsubscribe(event, action);
            };
        }(this);
        myClass.prototype.off = function (event, action) {
            this.unsubscribe(event, action);
        };
        myClass.prototype.custom = function (that) {
            return function (customId) {
                that.custom(customId);
            };
        }(this);
        myClass.prototype.keydown = function (that) {
            return function (key, action) {
                that.keydown(key, action);
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
            this.unsubscribe(customId);
        } else if (evt && !override) {
            return;
        }
        evt = new CustomEvent(customId);
        this.events._events.push(evt);
        return evt;
    };

    /**
    * Calls CustomEvent.subscribe of the given
    * @see CustomEvent.subscribe
    * @param event, the type/name of the event to subscribe
    * @param action, the action to add
    */
    EventTarget.prototype.on = function (event, action) {
        this.subscribe(event, action);
    };

    /**
    * Calls CustomEvent.subscribe
    * @see CustomEvent.subscribe
    * @param event, the type/name of the event to subscribe
    * @param action, the action to add
    */
    EventTarget.prototype.subscribe = function (event, action) {
		if (typeof event === "string") {
			this.parseEvent(event, action);
        } else if (typeof event === "object") {
			for (var e in event) {
				this.parseEvent(e, event[e]);
			}
		}
    };

    EventTarget.prototype.parseEvent = function (event, action) {
        var params = [];
        var evt = {};
		
		params = event.split(' ');
        evt = this.getEvent((params[0] !== undefined ? params[0] : event));
        if (evt) {
            evt.subscribe(action, (params.length === 2 ? params[1] : 0));
        }
	};
    
    /**
    * Calls CustomEvent.unsubscribe
    * @see CustomEvent.unsubscribe
    * @param event, the type/name of the event to subscribe
    *         if no event name is given, unsubscribe all callbacks for all events
    * @param action, the action to delete
    */

    EventTarget.prototype.unsubscribe = function (event, action) {
        var evt = this.getEvent(event);
        if (!event) {
            for (var i in this.events._events) {
                this.events._events[i].unsubscribe();
            }
        } else if (evt) {
            evt.unsubscribe(action);
        }
    };

	EventTarget.prototype.off = function (event, action) {
        this.unsubscribe(event, action);
    };
	
	function listEvent(evt, curEvt) {
		for (var i in curEvt) {
			if (typeof(evt[curEvt[i]]) !== "undefined") {
				document.getElementById("displayCE").innerHTML += evt[curEvt[i]] + ' ';
//				console.log(evt[curEvt[i]]);
			}
		}
	}
	
	EventTarget.prototype.currentEvent = function (evt) {
		var rect = WCP.canvas.getBoundingClientRect();
		var root = document.documentElement;
		var mouseX = evt.clientX - rect.top - root.scrollTop;
		var mouseY = evt.clientY - rect.left - root.scrollLeft;
		var displayCE = '';
		if (typeof(evt.clientX) !== "undefined" && typeof(evt.clientY !== "undefined")) {
			displayCE += ' - PosX = ' + mouseX + ' - PosY = ' + mouseY;
		}
		if (typeof(evt.keyCode) !== "undefined" && evt.keyCode !== 0) {
			displayCE += ' - Key = ' + evt.keyCode;
		}
		if (typeof(evt.buttons) !== "undefined" && evt.buttons !== 0) {
			displayCE += ' - Button = ' + evt.buttons;
		}
		if (typeof(this.events.currentEvent) === 'object') {
			listEvent(evt, this.events.currentEvent);
		} else if (this.events.currentEvent === false) {
			document.getElementById("displayCE").innerHTML += evt.type + displayCE;
//				console.log(evt.type + displayCE);
		} else {
			if (typeof(evt.screenX) !== "undefined" && typeof(evt.screenY !== "undefined")) {
				displayCE += ' - ScreenX = ' + evt.screenX + ' - ScreenY = ' + evt.screenY;
			}
			if (typeof(evt.target) !== "undefined") {
				displayCE += ' - Target = ' + evt.target.localName;
			}
			document.getElementById("displayCE").innerHTML += evt.type + displayCE;
//				console.log(evt);
		}
		document.getElementById("displayCE").innerHTML += '<br />';
		document.getElementById("displayCE").scrollTop = 10000;
    };

    /**
    * Calls CustomEvent.fire
    * @param event, the type/name of the event to subscribe
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
    WCP.Event = Event;
    EventTarget.extendObject(WCP);
    
    // Here should be created the events needed in modules implementation
    WCP.initEvents();
    WCP.custom("canvasReady");
    
    
    var KEY_DOWN        = 40;
    var KEY_UP          = 38;
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

    window.requestAnimFrame = (function () {
        return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback, element) {
                    window.setTimeout(callback, 1000 / 60);
                };
    })();

    var _viewsData = {
        activeViews: [],
        updatingView: null,
        lastGlobalUpdateTime: 0
    };
    
    /**
     * WCP Global (internal) variables
     */
    WCP.globalFps = 60;
    WCP.fpsCounter = new WCP.TimeCounter();

    /**
     * A Drawable is an object able to be drawn on the canvas
     * This class is an Abstract class, the inheriting classes have to
     *   implement the : draw(ctx) method
     */
    function Drawable() {
        this._zindex = 100;
        this._parent = null;
    }

    /**
     * Draw the object onto the `ctx` canvas object
     * This method is abstract and have to be overriden in children classes
     */
    Drawable.prototype.draw = function (ctx) {
        throw new Error("You have to override the draw(ctx) method");
    };

    /**
     * Set the z-index of this objects. This value is relative to the other
     *   objects contained in the parent Layer.
     * The z-index value is caped between 0 and 999
     */
    Drawable.prototype.setZIndex = function (v) {
        if (v > 999) {
            v = 999;
        }
        
        if (v < 0) {
            v = 0;
        }
        
        var old = this._zindex;
        this._zindex = v;
        
        if (this._parent) {
            this._parent._notifyZIndexChange(this, old, v);
        }
    };

    /**
     * Returns the z-index of this objects
     */
    Drawable.prototype.getZIndex = function () {
        return (this._zindex);
    };


    /**
     * This is a container for Drawable objects, it can maintain
     *    a list of objects to be draw and respect their ZIndex
     * All elements inside are stored in a ZIndex value indexed list
     *   like this : _children[zindex] = [e^0, e^1, ... e^n]
     *   It is a good compromise between usuability and performances. If the
     *   user needs many different ZIndex the performances might decrease (to test)
     *
     * Implements: Drawable
     */
    function Layer() {
        this._children = [];
    }

    Layer.prototype = new Drawable();

    /**
     * Draw all the _children of this Layer onto the `ctx` 2D context (or WCP.ctx)
     * The elements are drawn respectively to their relative ZIndex
     */
    Layer.prototype.draw = function (ctx) {
        ctx = ctx || WCP.ctx;
        
        // first level is the zindex of the elements
        for (var zi in this._children) {
            if (this._children.hasOwnProperty(zi)) {
                var elements = this._children[zi];
    
                for (var i = 0, len = elements.length; i < len; i++) {
                    elements[i].draw(ctx);
                }
            }
        }
    };

    /**
     * Private function called when the ZIndex of a _children of this Layer
     *   is changed. The element is then moved from the old to the new ZIndex
     *   list
     */
    Layer.prototype._notifyZIndexChange = function (el, old_zindex, new_zindex) {
        if (el._parent !== this) {
            return;
        }
        
        if (!this._children[new_zindex]) {
            this._children[new_zindex] = [];
        }
        
        var index = this._children[old_zindex].indexOf(el);
        this._children[old_zindex].splice(index, 1);
        this._children[new_zindex].push(el);
    };
    
    /**
     * Add one or multiple Drawable elements to this Layer
     * The method accepts an unlimited number of arguments, each of them
     *   has to be a Drawable object
     * The Layer <-> Drawable parental relationship is made within this method
     * If any Drawable already has a parent Layer, the object will be moved
     *   to this Layer. No effect if the Drawable parent is already this Layer
     */
    Layer.prototype.add = function () {
        for (var i = 0; i < arguments.length; i++) {
            var element = arguments[i];
            
            var zi = element._zindex;
            
            if (element._parent !== this) {
                if (!this._children[zi]) {
                    this._children[zi] = [];
                }
                
                this._children[zi].push(element);
                
                if (element._parent) {
                    element._parent.remove(element);
                }
                
                element._parent = this;
            }
        }
    };
    
    /**
     * Remove one or multiple Drawable elements currently inside to this Layer
     * The method accepts an unlimited number of arguments, each of them
     *   has to be a child Drawable object
     * The Layer <-> Drawable relationship is removed at this moment
     */
    Layer.prototype.remove = function () {
        for (var i = 0; i < arguments.length; i++) {
            var element = arguments[i];
            
            var zi = element._zindex;
            
            if (element._parent === this && this._children[zi]) {
                var index = this._children[zi].indexOf(element);
                this._children[zi].splice(index, 1);
                
                element._parent = null;
            }
        }
    };

    /**
     * Quickly removes all the children of this Layer
     * The parent relationship with every child is deleted and the
     *   children list is emptied
     */
    Layer.prototype.removeAll = function () {
        for (var zi in this._children) {
            if (this._children.hasOwnProperty(zi)) {
                var elements = this._children[zi];
    
                for (var i = 0, len = elements.length; i < len; i++) {
                    elements[i]._parent = null;
                }
            }
        }

        this._children = [];
    };

    /**
     * Returns the list of all children. You shoul not change the object returned
     *   by this method !
     * The format depends of the implementation of the ZIndex property
     * Indexes of this objects correspond to the ZIndex property values of
     *   the different objects inside
     * For example, if there are 3 objects called: sprite1_10, sprite2_10, sprite3_20
     *   respectively with these z-index values :  10          10          20
     *   so the returned object is:
     *     {10: [sprite1_10, sprite2_10], 20: [sprite3_20]}
     * Note that empty Drawable list might be inside. Example :
     *   {10: [sprite1_10, sprite2_10], 20: [], 30: [sprite4_30]}
     */
    Layer.prototype.getChildren = function () {
        return (this._children);
    };


    /**
     * Represents a unique game "view"
     * It provides a common structure to manage different view together and
     *   their lifetime.
     * Every Drawble, Timer of Event assigned to the View is then handled by it
     *   and will be automatically destroyed when the view is stopped
     * See the documentation for more informations as this object is complicated
     *   to understand
     *
     * Extends: Layer
     */
    function View(param) {
        // scene refresh rate (in ms)
        this.refresh = param.refreshRate || (1000 / 60);
        // scene last update time
        this.lastUpdate = 0;
        this.active = false;
        this.paused = false;

        this.sched = new WCP.TimeScheduler();

        // View methods
        this.fn = {
            init: param.init || (function () {}),
            loop: param.loop || (function () {}),
            draw: param.draw || (function () {}),
            destroy: param.destroy || (function () {})
        };
    }

    View.prototype = new Layer();

    /**
     * Update this view
     * The Time Scheduler is updated and then the user callback `loop` is called
     * No drawing is made withing this method
     */
    View.prototype.update = function () {
        if (this.active) {
            _viewsData.updatingView = this;
    
            this.sched.update();
            this.fn.loop.call(this);
            this.draw();
    
            _viewsData.updatingView = null;
        }
    };
    
    /**
     * Draws the view onto the `ctx` canvas object
     * Calls the Layer.draw() method and then the user callback `draw`
     */
    View.prototype.draw = function (ctx) {
        Layer.prototype.draw.call(this, ctx);
        
        this.fn.draw.call(this);
    };
    
    /**
     * Starts the view (no effect if it is already running)
     * This view object is pushed on the top of the running views stack
     * Upon activation the user callback `init` is called
     */
    View.prototype.start = function (params) {
        if (!this.active) {
            this.active = true;
            
            _viewsData.activeViews.push(this);
            
            _viewsData.updatingView = this;
            this.fn.init.call(this, params);
            _viewsData.updatingView = null;
        }
    };
    
    /**
     * Stops the view (no effect if it is not running)
     * The user callback `destroy` is firstly called
     * Then, all the Drawable elements are removed from the Layer
     *   and the time scheduler is reset
     * The view object is removed from the running views stack
     */
    View.prototype.stop = function () {
        if (this.active) {
            _viewsData.updatingView = this;
            this.fn.destroy.call(this);
            _viewsData.updatingView = null;
            
            this.active = false;
            this.paused = false;
            this.lastUpdate = 0;
            
            _viewsData.activeViews.splice(_viewsData.activeViews.indexOf(this), 1);
            
            this.removeAll();
            this.sched.reset();
        }
    };
    
    /**
     * Pauses the view (no effect if it is already paused)
     * Timers will not be triggered and the update() method will
     *   not be called while it is paused
     */
    View.prototype.pause = function () {
        if (!this.paused && this.active) {
            this.paused = true;
            this.active = false;
    
            this.sched.pause();
        }
    };
    
    /**
     * Unpauses the view (no effect is it is not paused)
     * Timers are unpaused, and the view will be updated on the next tick
     */
    View.prototype.unpause = function () {
        if (this.paused) {
            this.paused = false;
            this.active = true;
    
            this.sched.unpause();
        }
    };
    
    /**
     * Returns the number of milliseconds since the last update of this view
     */
    View.prototype.elapsed = function () {
        return (_viewsData.lastGlobalUpdateTime - this.lastUpdate);
    };
    
    /**
     * Stops all the running view, in stack order
     * The stack will be emptied
     */
    function clearViews() {
        /*
         * When a view is stopped, it is removed from the activeViews array
         * using the slice() array method
         * So the indexes are automatically re-created from zero, and the bottom
         *   view is alwaysthe index 0
         */
        while (_viewsData.activeViews.length > 0) {
            _viewsData.activeViews[0].stop();
        }
    }
    
    /**
     * Set the maximum running FPS (capped between 1 and 60)
     */
    function setFps(v) {
        v = (v < 1 ? 1 : (v > 60 ? 60 : v));
    
        WCP.globalFps = v;
    }
    
    /**
     * Returns the maximum FPS
     */
    function getFps() {
        return (WCP.globalFps);
    }
    
    /**
     * Returns the computed FPS
     */
    function getRealFps() {
        return (WCP.fpsCounter.get());
    }
    
    /**
    * Creates a proxy function to bind a global function (inside WCP) to call
    *   a function inside the '_viewsData.updatingView' object
    *
    * @param functionName the final function to call
    * @param property (optional) the property
    */
    function createUpdatingViewProxy(functionName, property) {
        if (property) {
            return (function () {
                if (_viewsData.updatingView) {
                    _viewsData.updatingView[property][functionName].apply(_viewsData.updatingView[property], arguments);
                }
            });
        }
    
        return (function () {
            if (_viewsData.updatingView) {
                _viewsData.updatingView[functionName].apply(_viewsData.updatingView, arguments);
            }
        });
    }
    
    /*
     * EXPORTS
     */
     // Classes
    WCP.Drawable = Drawable;
    WCP.Layer = Layer;
    WCP.View = View;

    // View functions
    WCP.clearViews = clearViews;
    WCP.setFps = setFps;
    WCP.getFps = getFps;
    WCP.getRealFps = getRealFps;
    
    // Global methods
    WCP.add = createUpdatingViewProxy("add");
    WCP.remove = createUpdatingViewProxy("remove");
    WCP.setTimeout = createUpdatingViewProxy("setTimeout", "sched");
    WCP.clearTimeout = createUpdatingViewProxy("clearTimeout", "sched");
    WCP.setInterval = createUpdatingViewProxy("setInterval", "sched");
    WCP.clearInterval = createUpdatingViewProxy("clearInterval", "sched");
    
    /**
    * Views GLOBAL updating function
    */
    function updateAllViews() {
        window.requestAnimFrame(updateAllViews);
    
        var time = WCP.millitime();
    
        // No update
        if ((time - _viewsData.lastGlobalUpdateTime) < (1000 / WCP.globalFps)) {
            return;
        }
    
        _viewsData.lastGlobalUpdateTime = time;
    
        var cleared = false;
    
        for (var i = 0, len = _viewsData.activeViews.length; i < len; i++) {
            var view = _viewsData.activeViews[i];
    
            if (view.lastUpdate === 0) {
                view.lastUpdate = _viewsData.lastGlobalUpdateTime;
            }
    
            if (!cleared) {
                WCP.clear();
                WCP.fpsCounter.tick();
    
                cleared = true;
            }
    
            if (view.active === true) {
                view.update();
            } else if (view.paused) {
                view.draw();
            }
    
            view.lastUpdate = _viewsData.lastGlobalUpdateTime;
        }
    }
    
    WCP.initViewModule = function () {
        WCP.fpsCounter.reset();
    
        updateAllViews();
    };
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
        this.animationsData = [];
        this.animation = new WCP.Animation(this);
        this.mainAnimation = null;
        
        // private property
        //this._zindex = 100;
        //this._parent = null;
    }

    Sprite.prototype = new WCP.Drawable();

    function SliceSprite(Image, x, y, width, height) {
        var s = new Sprite(Image, 0, 0);
        s.setSlice(x, y, width, height);
        return (s);
    }
    
    Sprite.prototype.clone = function (x, y) {
        var o = new WCP.Sprite(this.img, x, y);
        for (var i in this) {
            if ( this.hasOwnProperty(i) && i !== "id"
                 && this.hasOwnProperty(i) && i !== "x"
                 && this.hasOwnProperty(i) && i !== "y" ) {
                o[i] = this[i];
            }
        }
        return (o);
    };
    
    // Sprite.prototype.setZIndex = function (v) {
    //     if (v >= 9999) {
    //         v = 9999;
    //     }
        
    //     if (v < 0) {
    //         v = 0;
    //     }
        
    //     var old = this._zindex;
    //     this._zindex = v;
        
    //     if (this._parent) {
    //         this._parent._notifyZIndexChange(this, old, v);
    //     }
    // };
    
    // Sprite.prototype.getZIndex = function () {
    //     return (this._zindex);
    // };
    
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
    
        ctx.save();
        ctx.globalAlpha = this.alpha;
        // console.log(this.img, this.sliceX, this.sliceY, this.sliceWidth,
        // this.sliceHeight, originX, originY, this.width, this.height);
    
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
    
	Sprite.prototype.addAnimation = function (animation) {
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
	};
	
    Sprite.prototype.setAnimation = function (animation, finish, finishFunction) {
        if (typeof(this.animationsData[animation]) === "undefined") {
            return;
        }
    
        this.animation.clean();
		this.addAnimation(animation);
		
		if (typeof(finish) === "number") {
			this.animation.repeat(finish - 1);
			this.animation.clear();
			if (typeof(finishFunction) === "function") {
				this.animation.execute(finishFunction);
				this.animation.clear();
			}
			if (this.mainAnimation !== null) {
				this.addAnimation(this.mainAnimation);
				this.animation.repeat();
			}
		}
		else {
			this.animation.repeat();
			this.mainAnimation = animation;
		}
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
		for (var opt in style) {
            this.ctx[opt.toString()] = style[opt];
        }
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

	Draw.prototype.rect = function (x, y, width, height, style) {
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
		this.style = style;
    };
    
    Draw.prototype.Polygon.prototype.draw = function () {
		if (this.points instanceof Array) {
            WCP.Draw.ctx.save();
            WCP.Draw.ctx.beginPath();
			var points = this.points;
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
(function (WCP) {
    "use strict";
	
	/**
	 * Variables to manage the animations
	 */
    var animateList = [];
    var animateId = 0;

    /**
     * The TimeLine object allow to define lunch of animations at a chosen time.
     */
    function TimeLine() {
        animateList[animateId] = this;
        this.animateId = animateId;
        animateId++;

        this.timeLine = [];
        this.time = 0;
        this.startTime = -1;
    }

	/**
	 * Set a object (animation, clip, ...) to be lunch at a special time after 
	 *   the start of the timeline. The `time` is in milliseconds
	 */
    TimeLine.prototype.set = function (time, object) {
        if (this.timeLine.length === 0) {
            this.timeLine.push({time: time, object: object});
        }
        else {
            var isAdd = false;
            for (var x in this.timeLine) {
                if (time <= this.timeLine[x].time) {
                    this.timeLine.splice(x, 0, {time: time, object: object});
                    isAdd = true;
                    break;
                }
            }
            if (isAdd === false) {
                this.timeLine.push({time: time, object: object});
            }
        }
    };
    
	/**
	 * Start the TimeLine, the times specify with the objects set earlier are
	 *   relative to this start.
	 */
    TimeLine.prototype.start = function () {
        if (this.startTime < 0) {
            this.startTime = WCP.millitime();
            this.step();
        }
    };

	/**
	 * Function call in a loop with setTimeout (), used to launch the objects.
	 */
    TimeLine.prototype.step = function () {
		while (this.timeLine.length > 0 && this.timeLine[0].time <= this.time) {
			if (typeof(this.timeLine[0].object) !== "undefined") {
				this.timeLine[0].object.start();
			}
			this.timeLine.shift();
		}
		this.time = WCP.millitime() - this.startTime;
        
        WCP.setTimeout(0, (function (o) {
            return function () {
                o.step();
            };
        })(animateList[this.animateId]));
    };

    /**
     * A Clip is a kind of container for other animation, clip or object.
     */
    function Clip() {
        this.clip = this;
        this.list = [];
        this.index = 0;
    }
    
	/**
	 * Add an object in the Clip.
	 */
    Clip.prototype.add = function () {
        for (var i = 0; i < arguments.length; i++) {
            this.list[this.index] = arguments[i];
            this.index++;
        }
    };

	/**
	 * Start all the object contained in the Clip at the same time.
	 */
    Clip.prototype.start = function () {
		for (var x in this.list) {
			var complete = this.list[x].start();
		}
    };

	/**
	 * Return a clone of the Clip and its content.
	 * The arguments must be the new sprites use by the cloned object. 
	 * The sprites must be in the order of adding.
	 */
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

	/**
	 * This function move all the objects of the clip by adding `x` and `y` to
	 *   the current coordinates.
	 */
    Clip.prototype.offset = function (x, y) {
        for (var effect in this.list) {
            this.list[effect].offset(x, y);
        }
    };
    
    /**
     * Animation is an object that can animate a sprite.
     */
    function Animation(sprite, soundManager) {
        animateList[animateId] = this;
        this.animateId = animateId;
        animateId++;

        this.sprite = sprite;
        this.isSpriteAdd = false;

        this.soundManager = soundManager;

        this.bundles = [];
        this.curBundle = 0;
        this.lastBundle = -1;
        this.spriteOrigin = null;
        this.startTime = -1;
        this.frameNumber = 0;
        this.time = 0;
    }

	/**
	 * The method animate define an animation on the sprite. Several effects can be
	 *   describe it and a set of effects is call a bundle.
	 * The arguments must be array which contains specifics information on the sprite.
	 * Some key words are also possible.
	 * ex: animate({x: 10, time: 1})
	 */
    Animation.prototype.animate = function () {
        if (arguments.length > 0) {
            this.addBundle(arguments);
        }
        return (this);
    };
    
	/**
	 * Method that add a bundle in the bundle list of the animation.
	 */
    Animation.prototype.addBundle = function (effects) {
        var bundle = [];
        for (var i = 0; i < effects.length; i++) {
            var effect = this.createEffect(effects[i]);

            // Add effect in bundle
            bundle.push(effect);
        }
        this.bundles.push(bundle);
    };

	/**
	 * This method return an effect. An animation is componed by several effects.
	 * For example, an spinning wheel that move is componed by the effect of moving
	 *   and the effect of spinning.
	 */
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

	/**
	 * Launch the animation.
	 */
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
    
	/**
	 * Private function call at each frame used to call all the bundles.
	 */
    Animation.prototype.step = function () {
        // If no bundles, don't start the animation
        if (this.bundles.length === 0) {
            return;
        }
        
        // If there is no more bundles, stop
        if (this.curBundle >= this.bundles.length) {
            return;
        }

        this.frameNumber++;
        
        var stop = false;
        while (stop === false) {
            if (!(this.curBundle < this.bundles.length && this.stepBundle() === true)) {
                stop = true;
            }
        }

        // @TODO: getFps is that right?
        WCP.setTimeout(0, (function (o) {
            return function () {
                o.step();
            };
        })(animateList[this.animateId]));
    };
    
	/**
	 * Private function used to analyse the effects inside the current bundle and
	 *   call them.
	 * When a bundle is finished, the next is called.
	 */
    Animation.prototype.stepBundle = function () {
        // For a new bundle, copy the orignal data from sprite
        if (this.curBundle !== this.lastBundle) {
            if (this.spriteOrigin !== null) {
                delete this.spriteOrigin;
            }
            this.spriteOrigin = [];
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
            for (var j = 0; j < bundle.length; j++) {
                this.time = WCP.millitime() - this.startTime; // * speed to modify speed
                var effect = bundle[j];
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
    
	/**
	 * Calculate the percentage of completion of the animation.
	 * Return an array with the current percentage and a boolean, named finish,
	 *   which indicate if the animation exceed its duration.
	 */
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
    
	/**
	 * Private function that use the effect's data to do the animation.
	 * It is in this function that key words for animation are used.
	 * If the information in the effect is not a key word, the function consider
	 *   that is must be a sprite attributes.
	 */
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
            this.soundManager.get(effect.sound).play();
            effect.properties.complete = true;
        }
        else if (typeof(effect.clear) !== "undefined") {
			for (var cur = 0; cur < this.curBundle; cur++) {
				this.bundles.shift();
			}
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
            for (var k in effect) {
                // properties musn't be use here
                if (effect.hasOwnProperty(k) && k !== 'properties') {
                    // x & y are subject to shift
                    if (k !== 'x' && k !== 'y') {
                        this.sprite[k] = this.spriteOrigin[k] + delta.percent * (effect[k] - this.spriteOrigin[k]);
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
    
	/**
	 * Method to create a bundle in order to move the sprite to x and y.
	 */
    Animation.prototype.move = function (x, y) {
        var bundle = [];
        bundle.push({x: x, y: y});
        this.addBundle(bundle);
        return (this);
    };
    
	/**
	 * Method to create a bundle in order to set the slice position of the sprite.
	 */
    Animation.prototype.setSlice = function (x, y, width, height) {
        var bundle = [];
        bundle.push({sliceX: x, sliceY: y, width: width, height: height, sliceWidth: width, sliceHeight: height});
        this.addBundle(bundle);
        return (this);
    };

	/**
	 * Method to create a bundle in order to wait a given number of frames.
	 */
    Animation.prototype.wait = function (frames) {
        var bundle = [];
        bundle.push({frames: frames});
        this.addBundle(bundle);
        return (this);
    };

	/**
	 * Method to create a bundle in order to wait a given number of milliseconds.
	 */
    Animation.prototype.waitTime = function (time) {
        var bundle = [];
        bundle.push({time: time});
        this.addBundle(bundle);
        return (this);
    };

	/**
	 * Method to create a bundle in order to clear the sprite from the screen
	 *   and remove it from the WCP object.
	 */
    Animation.prototype.remove = function () {
        var bundle = [];
        bundle.push({remove: true});
        this.addBundle(bundle);
    };

	/**
	 * Method to create a bundle in order to repeat the effect. If time is 
	 *   negative the animation is repeat infinitely, if not it represent the
	 *   number of repetition.
	 */
    Animation.prototype.repeat = function (time) {
        var bundle = [];
        bundle.push({repeat: (typeof(time) !== "undefined" ? time : -1)});
        this.addBundle(bundle);
        return (this);
    };
    
	/**
	 * Method to create a bundle in order to lunch another animation.
	 */
    Animation.prototype.startAnimation = function (animation) {
        var bundle = [];
        bundle.push({animation: animation});
        this.addBundle(bundle);
        return (this);
    };
    
	/**
	 * Method to create a bundle in order to execute a function.
	 */
    Animation.prototype.execute = function (f) {
        var bundle = [];
        bundle.push({execute: f});
        this.addBundle(bundle);
        return (this);
    };
    
	/**
	 * Method to create a bundle in order to play a sound
	 */
    Animation.prototype.sound = function (sound) {
        var bundle = [];
        bundle.push({sound: sound});
        this.addBundle(bundle);
        return (this);
    };
    
	/**
	 * Method to create a bundle in order to pause a sound.
	 */
    Animation.prototype.pauseSound = function (sound) {
        var bundle = [];
        bundle.push({pauseSound: sound});
        this.addBundle(bundle);
        return (this);
    };

	/**
	 * Method to create a bundle in order to clear the animation.
	 * Call clean but during the animation.
	 */
    Animation.prototype.clear = function () {
        var bundle = [];
        bundle.push({clear: true});
        this.addBundle(bundle);
        return (this);
    };
    
	/**
	 * Remove all the bundles and effect and reset the time of the animation.
	 */
    Animation.prototype.clean = function () {
        this.bundles = [];
        this.curBundle = 0;
        this.lastBundle = -1;
        this.spriteOrigin = null;
        this.startTime = -1;
        this.time = 0;
    };
    
	/**
	 * Add x and y to the coordinates of the sprite.
	 */
    Animation.prototype.offset = function (x, y) {
        this.sprite.x += x;
        this.sprite.y += y;
        for (var bundle in this.bundles) {
            for (var effect in this.bundles[bundle]) {
                if (typeof(this.bundles[bundle][effect].x) !== "undefined") {
                    this.bundles[bundle][effect].x += x;
                }
                if (typeof(this.bundles[bundle][effect].y) !== "undefined") {
                    this.bundles[bundle][effect].y += y;
                }
            }
        }
    };
    
	/**
	 * Method that return a clone object of the animation.
	 * The user must precise a new sprite in order to avoid conflict.
	 */
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
            var newBundle = [];
            for (var effect in this.bundles[bundle]) {
                var newEffect = {};
                for (var j in this.bundles[bundle][effect]) {
                    if (j === "properties") {
                        var newProperties = {};
                        for (var k in this.bundles[bundle][effect][j]) {
                            newProperties[k] = this.bundles[bundle][effect][j][k];
                        }
                        newEffect[j] = newProperties;
                    }
                    else {
                        newEffect[j] = this.bundles[bundle][effect][j];
                    }
                }
                newBundle.push(newEffect);
            }
            o.bundles.push(newBundle);
        }
        return (o);
    };
    
    /**
     * Shift
     */

	/**
	 * Function use to calculate the interpolation of a circle.
	 */
	function shiftCircle(fx, fy, tx, ty, percent, semi, clockwise) {
        var centerX = (fx + tx) / 2;
        var centerY = (fy + ty) / 2;

        var h = centerY - fy;
        var w = fx - centerX;

        var dist = Math.sqrt(h * h + w * w);

        var initAngle = 0;
        if (w === 0) {
            if (h > 0) {
                initAngle = - Math.PI / 2;
            }
            else {
                initAngle = Math.PI / 2;
            }
        }
        else {
            var atan = Math.atan(h / Math.abs(w));
            if (w > 0) {
                initAngle = atan;
            }
            else {
                initAngle = Math.PI - atan;
            }
        }
        
        var addAngle = 0;
        if (clockwise) {
            addAngle = 1 * semi * percent * Math.PI;
        }
        else {
            addAngle = -1 * semi * percent * Math.PI;
        }
            
        var angle = initAngle + addAngle;

        var current = {};
        
        current.x = Math.floor(centerX + dist * Math.cos(angle));
        current.y = Math.floor(centerY + dist * Math.sin(angle));

        return (current);
    }
    
	/**
	 * Shift is an array that contain several function that modify the motion
	 *   direction of the animation.
	 */
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
    
    /**
     * Ease is an array that contains function which modify the progress of the
	 *   animation.
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
    
    /**
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

(function (WCP) {
    'use strict';

    /**
    * AssetManager handle images and sound.
    */
    function AssetManager() {
        this._assetsCollection = [];
        this._assetPath = '';
        this._progressInterval = 100;
    }

    /**
    * Private method for loading music
    */
    function _loadMusic(asset) {
        var test = new Audio();
        for (var j = 0; j < asset.path.length; j++) {
            var type = asset.path[j].match(/\.[0-9a-z]+$/);
            if (type.length) {
                type = type[0];
                var mime = (type === '.mp3') ? 'audio/mp3' : (type === '.ogg') ? 'audio/ogg' : undefined;
                if (mime) {
                    if (test.canPlayType(mime) !== "") {
                        var a  = new Audio();
                        a.src = asset.path[j];
                        a.preload = 'auto';
                        asset.status = 1;
                        a.addEventListener("canplaythrough", (function (asset) {
                                return function () {
                                    asset.status = 2;
                                };
                            })(asset)
                        );
                        a.addEventListener('readystatechange', (function (asset) {
                                return function () {
                                    console.log("!! je sais pas quand survient cette evenement cette asset est chargé", asset.id);
                                    asset.status = 2;
                                };
                            })(asset)
                        );
                        a.addEventListener('error', (function (asset) {
                                return function () {
                                    asset.status = 3;
                                };
                            })(asset)
                        );
                        asset.asset = a;
                        break;
                    }
                } else {
                    console.error('Extension not compatible');
                }
            }
        }
    }

    /**
    * Private method for loading images
    */
    function _loadImage(asset) {
        var type = asset.path.match(/\.[0-9a-z]+$/);
        if (type.length) {
            type = type[0];
            if (type === '.jpg' || type === '.png' || type === '.gif') {
                var a = new Image();
                a.src = asset.path;
                asset.status = 1;
                a.addEventListener('load', (function (asset) {
                        return function () {
                            asset.status = 2;
                        };
                    })(asset)
                );
                a.addEventListener('readystatechange', (function (asset) {
                        return function () {
                            console.log("!! je sais pas quand survient cette evenement cette asset est chargé", asset.id);
                            asset.status = 2;
                        };
                    })(asset)
                );
                a.addEventListener('error', (function (asset) {
                        return function () {
                            asset.status = 3;
                        };
                    })(asset)
                );
                asset.asset = a;
            }  else {
                console.error('Extension not compatible', asset);
            }
        }
    }

    /**
    * Add an asset to the collection
    */
    AssetManager.prototype.add = function () {
        var self = this;
        var arg = arguments.length;

        if (arg === 1 && typeof arguments[0] === 'object') {
            var assets = arguments[0];
            var group = assets.group || null;
            var path = assets.path || "";
            for (var i in assets.assets) {
                if (Array.isArray(assets.assets[i])) {
                    for (var j = 0; j < assets.assets[i].length; j++) {
                        assets.assets[i][j] = path + assets.assets[i][j];
                    }
                    if (group) {
                        this.add(group, i, assets.assets[i]);
                    } else {
                        this.add(i, assets.assets[i]);
                    }
                } else {
                    if (group) {
                        this.add(group, i, path + assets.assets[i]);
                    } else {
                        this.add(i, path + assets.assets[i]);
                    }
                }
            }
        } else if (arg === 2) {
            this.add(null, arguments[0], arguments[1]);
        } else if (arg === 3) {
            var p;
            if (Array.isArray(arguments[2])) {
                p = [];
                arguments[2].forEach(function (a) {
                    p.push(self._assetPath + a);
                });
            } else {
                p = self._assetPath + arguments[2];
            }
            this._assetsCollection.push({
                id: arguments[1],
                group: arguments[0],
                status: 0,
                path: p
            });
        }
    };

    AssetManager.prototype.load = function (group, progressCb, completeCb) {
        var self = this;

        if (arguments.length === 2) {
            completeCb = progressCb;
            progressCb = group;
            group = '*';
        }
        for (var i = 0; i < this._assetsCollection.length; i++) {
            var asset = this._assetsCollection[i];
            if ((asset.group === group) || (group === 'all' || group === '*')) {
                if (Array.isArray(asset.path)) {
                    _loadMusic(asset);
                } else {
                    _loadImage(asset);
                }
            }
        }

        var loadingloop = setInterval(function () {
            function _getStatus(group) {
                var loaded = 0,
                loading = 0,
                error = 0;

                for (var i = 0; i < self._assetsCollection.length; i++) {
                    var asset = self._assetsCollection[i];
                    if ((asset.group === group) || (group === 'all' || group === '*')) {
                        if (self._assetsCollection[i].status === 2) {
                            loaded++;
                        } else if (self._assetsCollection[i].status === 3) {
                            error++;
                        } else if (self._assetsCollection[i].status === 1) {
                            loading++;
                        }
                    }
                }
                return {
                    loaded: loaded,
                    loading: loading,
                    error: error,
                    total: loaded + loading + error
                };
            }
            
            var status = _getStatus(group);
            if (progressCb) {
                progressCb(group, status.total, status.loaded, status.error);
            }

            if ((status.loaded + status.error) === self.size(group)) {
                clearInterval(loadingloop);
                completeCb(group, status.total, status.loaded, status.error);
            }
        }, self._progressInterval);
    };

    /**
    * Return the HTML element depended of assetName
    * @param assetName the Asset's  id
    */
    AssetManager.prototype.get = function (assetName) {
        for (var i = 0; i < this._assetsCollection.length; i++) {
            if (this._assetsCollection[i].id === assetName) {
                return this._assetsCollection[i].asset;
            }
        }
    };

    /**
    * Set a global path for asset
    * and return it
    * @param path (optional)
    */
    AssetManager.prototype.path = function (path) {
        return (this._assetPath = (path !== undefined) ? path : "");
    };

    /**
    * Return the number of assets of all manager or just one group
    * @param group (optional) the group name
    */
    AssetManager.prototype.size = function (group) {
        if (group !== undefined && group !== 'all' && group !== '*') {
            var l = 0;
            for (var i = 0; i < this._assetsCollection.length; i++) {
                if (this._assetsCollection[i].group === group) {
                    l++;
                }
            }
            return l;
        } else {
            return (this._assetsCollection.length);
        }
    };

    /**
    * Initialize AssetManager under WCP.Assets
    */
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
        this.sound = audio;
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
        if (this.audio.src) {
            return new SoundEntity(this.audio.src, this.params);
        } else {
            return false;
        }
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
        this.testFormats();
    }

    /**
    * Creates and stores a sound
    * @param audio, Audio file or src of the sound file
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

    SoundManager.prototype.availableFormats = function () {
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

    SoundManager.prototype.testFormats = function () {
        var audio = document.createElement("audio");
        if (typeof audio.canPlayType === "function") {
            this.mp3 = (audio.canPlayType("audio/mpeg") !== "");
            this.ogg = (audio.canPlayType('audio/ogg; codecs="vorbis"') !== "");
            this.mp4 = (audio.canPlayType('audio/mp4; codecs="mp4a.40.5"') !== "");
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
