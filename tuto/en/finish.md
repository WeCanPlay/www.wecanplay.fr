Our games looks good but the rules are not really respected.
If we touch the body with the snake, the game does not end.
We will are going to change this.

We create a new function called ``collision()``.

```JavaScript
function collision() {
	for (var n = 0; n < body.length; n++) {
		if (snake.x === body[n].x && snake.y === body[n].y) {
			gameView.stop();
		}
	}
}
```

And we call it after move, still in the ``loop``

```JavaScript
if (WCP.millitime() >= refresh) {
    move();
    collision();
    eat();
    refresh = WCP.millitime() + SPEED;
}
```

When the player lose, we want to print a mesage. We ll use the last callback of *view*, **destroy**

```JavaScript
var game = {
    init: function() {
    	// ...
    },
    loop: function() {
    	// ...
    },
    destroy: function() {
		new WCP.Text({
			text: 'Game finish :\'(',
			x: 20,
			y: CANVAS_HEIGHT / 2  - 12,
			size: 25
		}).draw();
    }
};
```

Exceptionnaly, ``Text()`` is call with ``draw()`` because it's in the ``destroy`` function. Otherwise, it behaves like ``Draw()`` or ``Sprite()`` (you need to *add* to the ``View()``)

Good ! The tuto is now finish. We can add many thing for make more attractive game like background, scoring, bonus, etc..

You can check the final result on the [show case](/examples/basicsnake.html)

---

### Reference

* [API Text](http://wiki.wecanplay.fr/doku.php?id=en:wcp.text)