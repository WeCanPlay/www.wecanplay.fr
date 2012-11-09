## WCP.Time

Ce module regroupe les fonctions et classes concernant le temps. Deux fonctions permettent de recuperer le timestamp actuel : en secondes ''WCP.time()'' et en millisecondes ''WCP.millitime()''. L'unite de temps par defaut du framework est en millisecondes.

```JavaScript
// 1333573323.324
WCP.time();

// 1333573323334
WCP.millitime();
```	

### setTimeout & setInterval

Evitez d'utiliser les fonctions natives ''setTimeout'' et ''setInterval'', le framework propose des alternatives integrees avec les autres elements (comme le module View).

 * enregistrement aupres de la vue active : les timers seront mis en pause en meme temps que leur vue et supprimes quand elle est arretee.
  * mise a jour synchrone avec la vue

Attention : vous devez appeler ces fonctions depuis une vue ! 

* ''WCP.setTimeout(duration, fn)'' : va executer la fonction ''fn'' au bout de ''duration'' millisecondes
* ''WCP.setInterval(duration, fn)'' : va executer la fonction ''fn'' en boucle toutes les ''duration'' millisecondes

Quand une vue est mise en pause l'ensemble des timers de la vue sont aussi mis en pause. Idem lors de l'arret de la vue.

```JavaScript
var view = new WCP.View({
	init: function() {
		WCP.setTimeout(5000, function() {
			alert('Called');
		});
	}
});
```

## WCP.Timer

Un chronometre basique dont vous devez verifier son etat manuellement. Il retourne le temps ecoule depuis sa derniere reinitialisation.

```JavaScript
var timer = new WCP.Timer();

// then later :
var elapsed = timer.elapsedTime();
```

Pour le reinitialiser (le prochain appel a ''.elapsedTime()'' retourne le temps ecoule depuis ''.reset()'') : 

```JavaScript
timer.reset();
```

Un parametre, ''timeout'' peut etre stockee dans l'objet et sert avec ''.expired()''

```JavaScript
var timer = new WCP.Timer(2000);

if (timer.expired()) {
	// ...
	timer.reset();
	timer.timeout = 3000;
}
```
