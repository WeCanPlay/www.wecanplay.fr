
To know where the snake must go, we need to catch the event that are fired when the player press down a key.
We ll start by add listener in *init*.

```JavaScript
WCP.keydown('up', changeDirection);
WCP.keydown('down', changeDirection);
WCP.keydown('left', changeDirection);
WCP.keydown('right', changeDirection);
```

with ``changeDirection()``

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

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/lemulot/xCbn3/embedded/result,js,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Go to [next part](/tuto/eatgrow.html) for eat apple.

---

### Reference

* [API Event](http://wiki.wecanplay.fr/doku.php?id=en:wcp.event)