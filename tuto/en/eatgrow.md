## Eat & grow

Our snake is ridiculously small and need some strength. We are going to teach him how to eat to became bigger.

When the snake is at the same position of an apple, he eats it. In a new function, cleverly named eat, we add the code to check the position of our objects.

```JavaScript
function eat() {
	if (snake.x === apple.x && snake.y === apple.y) {
	}
}
```

This function need to be call at each move, to see if the snake is on the same place as the apple.

```JavaScript
loop: function () {
	if (WCP.millitime() >= refresh) {
		move();
		eat();
		refresh = WCP.millitime() + SPEED;
	}
}
```

After eating the apple, our snake grows. We need a new variable, named body.

```JavaScript
var body;
```

That we initialise as an array.

```JavaScript
body = new Array();
```

When the apple is eaten, we add a new part in the body.
The part is an array with the coordinates of the snake.

```JavaScript
body.push({x: snake.x, y: snake.y});
```

To see the body, we need to modify the draw function.
We just print as many square as the body have.
But we first need to create the body's sprite.

```JavaScript
var bodySprite;
```

```JavaScript
bodySprite = new WCP.SliceSprite(WCP.Assets.get('body'), snake.x, snake.y, size, size);
```

```JavaScript
for (var n = 0; n < body.length; n++) {
    bodySprite.position(body[n].x, body[n].y);
    bodySprite.draw();
}
```

The parts of the body need to move with the snake.
To do so, we will take the last part of the body, modify its coordinates with the snake position (just before its move) and put it back in the begining of the array.
We add this code in the begining of the move function.

```JavaScript
if (body.length > 0) {
	var part = body.pop();
	part.x = snake.x;
	part.y = snake.y;
	body.unshift(part);
}
```

Well, if the apple does not change place at each eat, the game will be very simple.
That is why we add few lines when the apple is eaten.

```Html
apple.x = Math.floor(Math.random() * (CANVAS_WIDTH / size)) * size;
apple.y = Math.floor(Math.random() * (CANVAS_HEIGHT / size)) * size;
```

To prevent an apple that pop on the snake and its body, we need to check this.
If it is the case we need to find an other coordinates.

```JavaScript
var stop = false;
while (stop === false) {
	apple.x = Math.floor(Math.random() * (CANVAS_WIDTH / size)) * size;
	apple.y = Math.floor(Math.random() * (CANVAS_HEIGHT / size)) * size;
	stop = true;
	if (snake.x === apple.x && snake.y === apple.y) {
		stop = false;
	}
	else {
		for (var n = 0; n < body.length; n++) {
			if (body[n].x === apple.x && body[n].y === apple.y) {
				stop = false;
				break ;
			}
		}
	}
}
```

We've got this now:
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
            var bodySprite;
            var appleSprite;
			var direction;
			var refresh;
			var body;
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
                    bodySprite = new WCP.SliceSprite(WCP.Assets.get('body'), snake.x, snake.y, size, size);
                    appleSprite = new WCP.SliceSprite(WCP.Assets.get('apple'), snake.x, snake.y, size, size);
					direction = 'RIGHT';
					refresh = WCP.millitime() + SPEED;
					body = new Array();

					WCP.listen();
					WCP.keydown('up', changeDirection);
					WCP.keydown('down', changeDirection);
					WCP.keydown('left', changeDirection);
					WCP.keydown('right', changeDirection);
				},
				loop: function () {
					if (WCP.millitime() >= refresh) {
						move();
						eat();
						refresh = WCP.millitime() + SPEED;
					}
				},
				draw: function () {
					WCP.clear();
					for (var n = 0; n < body.length; n++) {
                        bodySprite.position(body[n].x, body[n].y);
                        bodySprite.draw();
					}
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
				if (body.length > 0) {
					var part = body.pop();
					part.x = snake.x;
					part.y = snake.y;
					body.unshift(part);
				}
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
			function eat() {
				if (snake.x === apple.x && snake.y === apple.y) {
					body.push({x: apple.x, y: apple.y});
					var stop = false;
					while (stop === false) {
						apple.x = Math.floor(Math.random() * (CANVAS_WIDTH / size)) * size;
						apple.y = Math.floor(Math.random() * (CANVAS_HEIGHT / size)) * size;
						stop = true;
						if (snake.x === apple.x && snake.y === apple.y) {
							stop = false;
						}
						else {
							for (var n = 0; n < body.length; n++) {
								if (body[n].x === apple.x && body[n].y === apple.y) {
									stop = false;
									break ;
								}
							}
						}
					}
				}
			}
		</script>
	</body>
</html>
```
