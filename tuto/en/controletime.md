## Reduce speed

Next step is to controling the frequency of calling the move function.
*loop* has a frenquency of 60fps (for the best). For perform reason we can't controle this frequency but with a **timer** we can call ``move()`` when we want.

We ll starting by initialise an ``timer``.

```JavaScript
timer = new WCP.Timer();
```

Before call ``move`` we check if the elapse time is enough. If it's the case, we can ``move()`` and rest the timer

```JavaScript
if (timer.elapsedTime() > SPEED) {
    move();
    timer.reset();
}
```

``SPEED`` is the new variable define at the begining. It represent the number of millisecond between two move.

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/lemulot/xCbn3/embedded/result,js,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

See the [next part](/tuto/handleevent.html) for countrole snake.

---

### References

* [User documentation Timers & Timestamps](http://www.wecanplay.fr/doc/en/time.html)
* [API Timer](http://wiki.wecanplay.fr/doku.php?id=en:wcp.time)