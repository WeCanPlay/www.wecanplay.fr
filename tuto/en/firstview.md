Now, we need to create a view.
**View** can represent a game's round or level.
For more explanation on the view, watch [User documentation](http://www.wecanplay.fr/doc/en/view.html)

The constructor of the view need an object, who can contain 4 differentes functions: *init*, *loop*, *draw* and *destroy*.
On this tutorial, we just need the 2 first.

* *Init* will containt event initialisation, add the first part of the snake to the view.
* *loop* is the main loop of our game. It ll containt logic for moving the snake.

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

[Next step](/tuto/drawthehead.html), we will draw some shapes

---

### References

* [User documentation View](http://www.wecanplay.fr/doc/en/view.html)
* [API View](http://wiki.wecanplay.fr/doku.php?id=en:wcp.view)