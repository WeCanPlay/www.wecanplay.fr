Our snake is ridiculously small and need some strength. We are going to teach him how to eat to became bigger.

When the snake is at the same position of an apple, he eats it.

In a new function, cleverly named eat, we add the code to check the position of our objects.
if the condition is true, we create a new square, add to the view and save this part to the array ``body``

```JavaScript
function eat() {
    if (snake.x === apple.x && snake.y === apple.y) {
        var newpartofbody = new WCP.Draw.Rect(apple.x, apple.y, size, size, {
            fillStyle: "lightgreen"
        })
        gameView.add(newpartofbody)
        body.push(newpartofbody);
    }
}
```
This function need to be call at each move, to see if the snake is on the same place as the apple.

```JavaScript
loop: function() {
    if (timer.elapsedTime() > SPEED) {
        move();
        eat();
        timer.reset();
    }
}
```

and we don't forget to move new part (added on the top of ``move()``).

```JavaScript
if (body.length > 0) {
	var part = body.pop();
	part.x = snake.x;
	part.y = snake.y;
	body.unshift(part);
}
```

After eating, we move the apple to a random place.

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
                break;
            }
        }
    }
}
```

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/lemulot/v7k6Y/embedded/result,js,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Our snake can now move and eat. Why to don't add a *crunch* sound during eat ?

## Crunch

Assets like images and sound *need* to be loaded (or partialy for sound).
**WeCanplay** handle that for you.

For add a new ressource, you can call ``WCP.Assets.add()``

```JavaScript
WCP.Assets.add('apple-crunch', ['apple-crunch.mp3', 'apple-crunch.ogg']);
```

and start the view only when it's loaded

```JavaScript
WCP.Assets.load('*', null, function(){
	gameView.start();
});
```

Finaly, when the snake eat we play the sound.

```JavaScript
WCP.Assets.get('apple-crunch').play();
```

Time to finish with the [final part](/tuto/finish.html).

---

### Reference

* [API Draw](http://wiki.wecanplay.fr/doku.php?id=en:wcp.draw)
* [API Assets](http://wiki.wecanplay.fr/doku.php?id=en:wcp.asset)
* [API AUdio](http://wiki.wecanplay.fr/doku.php?id=en:wcp.audio)
