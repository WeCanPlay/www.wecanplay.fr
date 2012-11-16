Now, we create a view that will represent a round of a game.
For more explanation on the view see [User documentation](http://www.wecanplay.fr/doc/en/view.html)

The constructor of the view nedd an object, who can contain 4 differentes functiond: *init*, *loop*, *draw* and *destroy*.
On this tutorial, we just need the 2 first.

```JavaScript
var game = {
	init: function () {
	},
	loop: function () {
	}
};
var gameView = new WCP.View(game);
```

To start the view, just use the function start of the object.

```JavaScript
gameView.start();
```

Now, the page must look like this:

```Html
<!DOCTYPE html>
<html>
	<head>
		<title>Snake</title>
		<style>
			#canvas {
				border : 1px solid black;
			}
		</style>
		<script src='WCP-0.3.js' type='text/javascript'></script>
	</head>
	<body>
		<canvas id="canvas"></canvas>
		<script type="text/javascript">
			CANVAS_WIDTH = 200;
			CANVAS_HEIGHT = 200;
			WCP.setCanvas('canvas', CANVAS_WIDTH, CANVAS_HEIGHT);
			var game = {
				init: function () {
				},
				loop: function () {
				}
			};
			var gameView = new WCP.View(game);
			gameView.start();
		</script>
	</body>
</html>
```