## Include WCP

To use the WeCanPlay framework in your html page, [download](https://github.com/downloads/WeCanPlay/WeCanPlay/WCP-1.0.js) on github the librairie and add this line in the ``<head>``.
Add also a ``<canvas>`` and ``<script>`` in the ``<body>``

Obviously, we need to take care about Dom loading. It's why we put the *script* tag on the bottom.
Now, all the javascript we code have to be added inside this script tags.

## Initialisation

To use the WeCanPlay framework on a specific canvas, we need to tell to the framework which one we will use.
In order to simplify the code, we create two global variables that determine the size of the canvas.

```JavaScript
CANVAS_WIDTH = 200;
CANVAS_HEIGHT = 200;
WCP.setCanvas('canvas', CANVAS_WIDTH, CANVAS_HEIGHT);
```

Now, at this step we have the following code in our page:

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Snake</title>
		<style>
			#canvas {
				border : 1px solid black;
			}
		</style>
		<script src='WCP-1.0.js' type='text/javascript'></script>
	</head>
	<body>
		<canvas id="canvas"></canvas>
		<script type="text/javascript">
			CANVAS_WIDTH = 200;
			CANVAS_HEIGHT = 200;
			WCP.setCanvas('canvas', CANVAS_WIDTH, CANVAS_HEIGHT);
		</script>
	</body>
</html>
```

Continue with [create the main view](/tuto/firstview.html)