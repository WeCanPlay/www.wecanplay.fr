## Load Assets

Before move the snake, we must see it and we need to see the apple in order to eat it.
For make it very simple, we ll use one image of apple, one sound when the snake eat and the snake will be drawn

Before load asset, we need to add.

```JavaScript
WCP.Assets.add({
    path: 'ressources/',
    assets: {
        'apple' : 'apple.png',
        'bg' : 'background.png',
        'crunch'   : ['apple-crunch.mp3', 'apple-crunch.ogg']
}});
```

To print the snake and the apple on the screen, we need their positions.
We create two variables for this.

```JavaScript
var snake;
var apple;
```

We initialise with a random position these variables in the init function of the view.

```JavaScript
snake = {x: 50, y: 50};
apple = {x: 100, y: 100};
```

To create a sprite with WeCanPlay, we need to know which size we want that the sprite is.
We set a variable for this, and will use it for create each sprite.
We also create a variable for each sprite.

```JavaScript
var size;
var head;
var body;
var apple;
```

And the initialisation.

```JavaScript
head = new WCP.Draw.Rect(snake.x, snake.y, size, size, {fillStyle: "green"});
body = new WCP.Draw.Rect(apple.x, apple.y, size, size, {fillStyle: "red"});
apple = new WCP.Sprite(WCP.Assets.get('apple'), apple.x, apple.y);
```

We call the function position() of each Sprite to place them, and then we call the draw() function of each one to draw them.

```JavaScript
headSprite.position(snake.x, snake.y);
headSprite.draw();
appleSprite.position(apple.x, apple.y);
appleSprite.draw();
```

By the end of this step, you must have this code:

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
		</script>
	</body>
</html>
```