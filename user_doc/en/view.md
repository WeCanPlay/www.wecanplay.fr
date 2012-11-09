## Concept

A View represent a specific display of your game. It separates the different parts of your game into a generic design. This approch is the same as many frameworks using the MVC design.

A game is split into different parts with their specific logic quand display functions. For example: the main menu, the game itself, a game menu, a dialogue between characters, and so on... The code logic can be bundled inside their specific View. The ressources used inside a View are released once it is stopped (graphical ressources, timers, events...).

A View lifecycle is defined with 4 events, defined as callbacks passed to the constructor:
  * ''init'' : when the view starts
  * ''loop'' : called every frame when the view is active
  * ''draw'' : called before the ''loop'' event. Put here only the code to draw some custom elements inside the View. When the view is paused, this callback is still executed but not the ''loop'' event.
  * ''destroy'' : when the view is stopped

The execution context (the this variable) of these functions is the View object.

## Cycle

The views can have three different states:
 * stopped. The view is not active
 * running. It is currently running, the ''loop'' and ''draw'' callbacks are called every frame
 * paused. When the view is paused, the logic is paused but not the display. So only the ''draw'' callback is regularly executed

The cycle can repeat, so the same View can be stopped and restarted later (very handy for a menu).

In your code, you need to design your view following these guidelines :
  * Initialization: create and init resources needed for your view : sprites, events...
  * Running : 
  * Destruction: you do not need to remove all the previously created resources (drawables and timers), this is automatically handled by the framework

The elements linked to the view and automatically destroyed with it are :
  * Drawable objects added with the ''add'' method
  * Timers set with ''WCP.setInterval'' and ''WCP.setTimeout''
  * Planned for a future release: events, musics...

### Graphical elements

Elements added with the view method ''View.add'' are assigned to this view. They will be automatically removed when the view is stopped. You can also manually remove an element with the ''View.remove'' method :

```js
var logo = new WCP.Sprite(WCP.Assets.get('logo'));

var view = new WCP.View({
    init: function () {
        // Add it to be displayed
        this.add(logo);

        var scene = this;

        // hide it after 5 seconds
        WCP.setTimeout(5000, function() {
            scene.remove(logo);
        });
    },
    loop: function () {
        // ...
    }
});
```

### Timers

Les timers crees a l'interieur d'une vue seront automatiquement affectes a cette vue. Ils sont :
  * Mis en pause quand la vue est mise en pause
  * Supprimes lorsque la vue est arretee
  * Synchronises avec le cycle. Avant d'appeler le callback ''loop'' l'ensemble des timers est mis a jour et executés.

La synchronisation d'un timer avec le cycle de la vue est respecte par le Framework. Quand la vue est en pause, les timers le sont aussi. Ils sont tous executes avant l'execution du callback ''loop''.

## Display more than one View

More than one view can be active at the same time, they are ordered like a stack: the first started will be executed (updated and drawed) the first. This is handy to display a menu over your game or any new interface elements.

## Canvas FPS

The whole game framerate (or generally called FPS - Frames Per Second) can me changed using:

  * WCP.setFps( fps ) : set the maximum framerate (between 1 and 60)
  * WCP.getFps() : return the maximum framerate

This will change the views update rate to correspond to the framerate.

As the real framerate is not always the maximum one, you can use this function to retrieve the average FPS during the last seconds :

```JavaScript
var fps = WCP.getRealFps();
```

## Example

The best design is to declare your view once your file is loaded (you do not need to wait the DOM is loaded). After the declaration, you can use it whenever you want.

```JavaScript
var character = null;

/*
 * Creation de la vue avec deux sprites
 */
var view = new WCP.View({
    init: function () {
        var logo = new WCP.Sprite();
        character = new Character();

        // remember : inside the callbacks, 'this' is the View !
        this.add(logo);
        this.add(character.sprite);
    },

    loop: function () {
        // mise a jour de l'ensemble du jeu
        character.update();

        // si le personnage est mort, on arrete le jeu
        if (character.dead) {
            this.stop();
        }
    }
});

function startGame() {
    view.start();

    // ...
}

document.querySelector('#btn-launch').addEventListener('click', startGame);
```

This example is not a working example (not all the code is here). However you can see how to declare your View and then how to start your game. Here, the game is started when the user clicks on the ''#btn-launch'' button.

