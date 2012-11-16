## Move the snake

We gone to use the loop function of the view to make the snake move.

In a new function name move and depending on the direction, we add the size of a square on the coordinates.

```JavaScript
function move() {
	if (direction === 'UP') {
		snake.y -= size;
	}
	else if (direction === 'DOWN') {
		snake.y += size;
	}
	else if (direction === 'LEFT') {
		snake.x -= size;
	}
	else if (direction === 'RIGHT') {
		snake.x += size
	}
}
```

To make it move by itself, call this function in the loop.

```JavaScript
loop: function () {
	move();
}
```

If you test it now, the snake will disapear on the right. To correct this we will add a check.
If the next position is below 0 or over the height or the width.

```JavaScript
function move() {
	if (direction === 'UP') {
		if ((snake.y - size) >= 0) {
			snake.y -= size;
		}
	}
	else if (direction === 'DOWN') {
		if ((snake.y + size) < CANVAS_HEIGHT) {
			snake.y += size;
		}
	}
	else if (direction === 'LEFT') {
		if ((snake.x - size) >= 0) {
			snake.x -= size;
		}
	}
	else if (direction === 'RIGHT') {
		if ((snake.x + size) < CANVAS_WIDTH) {
			snake.x += size
		}
	}
}
```

If you try now, you can see the snake moving fast.
If you change the direction, the square just stop on the border.
To add some challenge in the game, we will make the snake cross the screen to the other side.

```JavaScript
function move() {
	if (direction === 'UP') {
		if ((snake.y - size) >= 0) {
			snake.y -= size;
		}
		else {
			snake.y = CANVAS_HEIGHT - size;
		}
	}
	else if (direction === 'DOWN') {
		if ((snake.y + size) < CANVAS_HEIGHT) {
			snake.y += size;
		}
		else {
			snake.y = 0;
		}
	}
	else if (direction === 'LEFT') {
		if ((snake.x - size) >= 0) {
			snake.x -= size;
		}
		else {
			snake.x = CANVAS_WIDTH - size;
		}
	}
	else if (direction === 'RIGHT') {
		if ((snake.x + size) < CANVAS_WIDTH) {
			snake.x += size
		}
		else {
			snake.x = 0;
		}
	}
}
```

Now you should have this:

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
					move();
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
			function move() {
				if (direction === 'UP') {
					if ((snake.y - size) >= 0) {
						snake.y -= size;
					}
					else {
						snake.y = CANVAS_HEIGHT - size;
					}
				}
				else if (direction === 'DOWN') {
					if ((snake.y + size) < CANVAS_HEIGHT) {
						snake.y += size;
					}
					else {
						snake.y = 0;
					}
				}
				else if (direction === 'LEFT') {
					if ((snake.x - size) >= 0) {
						snake.x -= size;
					}
					else {
						snake.x = CANVAS_WIDTH - size;
					}
				}
				else if (direction === 'RIGHT') {
					if ((snake.x + size) < CANVAS_WIDTH) {
						snake.x += size
					}
					else {
						snake.x = 0;
					}
				}
			}
		</script>
	</body>
</html>
```