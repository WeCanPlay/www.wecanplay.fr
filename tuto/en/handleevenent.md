## Handle events

To know where the snake must go, we need to catch the event that are fired when the player press down a key.

Firstly, we say to WCP in the init function that the framework must listen the event triggered.

```JavaScript
WCP.listen();
```

To save the direction, we create a variable.

```JavaScript
var direction;
```

That we initialise.

```JavaScript
direction = 'RIGHT';
```

We create a function that will analyse the triggered event.
We check the check element inside the parameter to know which key was pressed down.

```JavaScript
function changeDirection(event) {
	if (event.which === 37) {
		direction = 'LEFT';
	}
	else if (event.which === 38) {
		direction = 'UP';
	}
	else if (event.which === 39) {
		direction = 'RIGHT';
	}
	else if (event.which === 40) {
		direction = 'DOWN';
	}
}
```

Now, for each key possible in the snake game (up, down, left, right) we associate a callback function, that we name changeDirection, for them.

```JavaScript
WCP.keydown('up', changeDirection);
WCP.keydown('down', changeDirection);
WCP.keydown('left', changeDirection);
WCP.keydown('right', changeDirection);
```

To prevent bugs, we allow to change the direction only if the new direction is not the opposite of the current one.

```JavaScript
function changeDirection(event) {
	if (event.which === 37) {
		if (direction !== 'RIGHT') {
			direction = 'LEFT';
		}
	}
	else if (event.which === 38) {
		if (direction !== 'DOWN') {
			direction = 'UP';
		}
	}
	else if (event.which === 39) {
		if (direction !== 'LEFT') {
			direction = 'RIGHT';
		}
	}
	else if (event.which === 40) {
		if (direction !== 'UP') {
			direction = 'DOWN';
		}
	}
}
```

At this point, we have this:

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
			var snake;
			var apple;
			var size;
            var headSprite;
            var bodySprite;
            var appleSprite;
			var direction;
            WCP.Assets.add({
                path: 'ressources/',
                assets: {
                    'head'  : 'head.png',
                    'body'  : 'body.png',
                    'apple' : 'apple.png',
                }
            });
            WCP.Assets.load();
			var game = {
				init: function () {
					snake = {x: 50, y: 50};
					apple = {x: 100, y: 100};
					size = 10;
                    headSprite = new WCP.SliceSprite(WCP.Assets.get('head'), snake.x, snake.y, size, size);
                    appleSprite = new WCP.SliceSprite(WCP.Assets.get('apple'), snake.x, snake.y, size, size);
					direction = 'RIGHT';

					WCP.listen();
					WCP.keydown('up', changeDirection);
					WCP.keydown('down', changeDirection);
					WCP.keydown('left', changeDirection);
					WCP.keydown('right', changeDirection);
				},
				loop: function () {
				},
				draw: function () {
					WCP.clear();
                    headSprite.position(snake.x, snake.y);
                    headSprite.draw();
                    appleSprite.position(apple.x, apple.y);
                    appleSprite.draw();
				},
				destroy: function () {
				}
			};
			var gameView = new WCP.View(game);
			gameView.start();
			
			function changeDirection(event) {
				if (event.which === 37) {
					if (direction !== 'RIGHT') {
						direction = 'LEFT';
					}
				}
				else if (event.which === 38) {
					if (direction !== 'DOWN') {
						direction = 'UP';
					}
				}
				else if (event.which === 39) {
					if (direction !== 'LEFT') {
						direction = 'RIGHT';
					}
				}
				else if (event.which === 40) {
					if (direction !== 'UP') {
						direction = 'DOWN';
					}
				}
			}
		</script>
	</body>
</html>
```