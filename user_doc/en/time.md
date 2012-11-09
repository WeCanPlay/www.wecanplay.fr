## WCP.Time

This module regroups the functions and classes about time. Two functions are available to get the current timestamp : in seconds using ''WCP.time()'' and in milliseconds using ''WCP.millitime()''. Inside the framework, unless specified all time units are in milliseconds.

```JavaScript
// 1333573323.324
WCP.time();

// 1333573323334
WCP.millitime();
```	

### setTimeout & setInterval

Avoid using the native functions ''setTimeout'' and ''setInterval'' as the framework provides alternatives fully integrated with the views.

 * timeouts registered within the views : pause/unpause when the view is paused or unpaused, removed when the active view is stopped
 * callbacks executed synchronously with the views

Warning: you have to call these functions within a view scope !

* ''WCP.setTimeout(duration, fn)'' : execute the callback ''fn'' after ''duration'' milliseconds
* ''WCP.setInterval(duration, fn)'' : execute the callback ''fn'' every ''duration'' milliseconds

```JavaScript
var view = new WCP.View({
	init: function() {
		WCP.setTimeout(5000, function() {
			alert('Called');
		});
	}
});
```

## WCP.Timer

This is a basic timer to get the elapsed time between its initialisation and now. It can be paused and reset.

```JavaScript
var timer = new WCP.Timer();

// then later :
var elapsed = timer.elapsedTime();
```

Use ''.reset()'' to reset it to the current time.

```JavaScript
timer.reset();
```

Additionaly, a ''timeout'' parameter can be stored inside the object and is used with ''.expired()''. Note: this method does not reset the timer.

```JavaScript
var timer = new WCP.Timer(2000); // can be passed in the constructor

if (timer.expired()) {
	// ...
	timer.reset();
	timer.timeout = 3000; // and is stored in this property
}
```
