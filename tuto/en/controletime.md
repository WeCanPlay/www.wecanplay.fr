## Time Controle

Well, the snake move pretty fast. We will modify this.

Firstly, just create one constant.

```JavaScript
SPEED = 80;
```

An other variable will be necessary.

```JavaScript
var refresh;
```

Initialise it with the current time in milliseconds added to the speed.

```JavaScript
refresh = WCP.millitime() + SPEED;
```

This define the next time of the move.

We need to check the next move inside the loop and set the next time for the move.

```JavaScript
if (WCP.millitime() >= refresh) {
	move();
	refresh = WCP.millitime() + SPEED;
}
```

We have this code now:

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
			SPEED = 80;
			WCP.setCanvas('canvas', CANVAS_WIDTH, CANVAS_HEIGHT);
			var snake;
			var apple;
			var size;
            var headSprite;
            var appleSprite;
			var direction;
			var refresh;
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
					refresh = WCP.millitime() + SPEED;

					WCP.listen();
					WCP.keydown('up', changeDirection);
					WCP.keydown('down', changeDirection);
					WCP.keydown('left', changeDirection);
					WCP.keydown('right', changeDirection);
				},
				loop: function () {
					if (WCP.millitime() >= refresh) {
						move();
						refresh = WCP.millitime() + SPEED;
					}
				},
				draw: function () {
					WCP.clear();
                    headSprite.position(snake.x, snake.y);
                    headSprite.draw();
                    appleSprite.position(apple.x, apple.y);
                    appleSprite.draw();				},
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