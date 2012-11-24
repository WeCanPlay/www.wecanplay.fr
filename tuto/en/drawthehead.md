## Draw the head and one apple

Each part of the snake ll be represent by a little green square (darker for the head).
Because, the game start with 1 part, we coding into the ``init`` function.

For create a little square , it's really simple.

```JavaScript
size = 10;
var snake = new WCP.Draw.Rect(50, 50, size, size, {fillStyle: "green"});
```

after, we just need to **add** to this view for being handle by it.

```JavaScript
this.add(snake);
```

we do the smae thing for apple. And the result is normaly two square.

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/lemulot/MTZze/embedded/result,js,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## Move all this

We want to move a little the head's snake. We ll now work on the ``loop`` function.

We starting by add the global variable ``direction`` and create an ``move`` function.

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

Finaly we call this function on the loop.

```JavaScript
loop: function() {
	move();
}
```

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/lemulot/CVEyT/embedded/result,js,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Gasp! it's a little fast for a begining.
Follow the [next part](/tuto/controletime.html) for learn how to reduce speed.

---

### References

* [API View](http://wiki.wecanplay.fr/doku.php?id=en:wcp.view)
* [API Draw](http://wiki.wecanplay.fr/doku.php?id=en:wcp.draw)
