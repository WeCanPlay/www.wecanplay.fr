## Module View

Le concept de "vue" dans les frameworks est de plus en plus présent. Par exemple, beaucoup de frameworks PHP reposent sur le principe "MVC" qui permet de séparer les différentes parties de votre code. On a repris le même principe avec les vues de WeCanPlay. C'est un moyen simple de structurer votre code.

Une vue représente un affichage distinct de votre jeu. Par exemple: le menu principal, l’écran de chargement, le jeu, le menu au dessus du jeu. Tous ces "affichages" ne vont pas être codés de la même façon, n'auront pas la même logique derrière, ni les mêmes éléments graphiques. Quand vous passez d'une vue a une autre (par exemple, vous cliquez sur le bouton Jouer du menu principal) il faut alors supprimer tous les éléments graphiques de l'ancienne vue, initialiser la nouvelle puis l'afficher.

Ce cycle est intégré dans l'objet View qui va s'occuper du nettoyage et de la gestion de tout ces éléments pour vous :
  * Cycle complet : initialisation, mise a jour et destruction (''init'', ''loop'', ''destroy'')
  * Gestion des éléments graphiques. Lors de sa destruction, ils ne sont plus affiches
  * Plusieurs vues peuvent être affichées a la fois, sous la forme d'une pile (stack)

Lors de la création de la vue, quatre callbacks peuvent être passes en paramètre. Ils seront exécuté soit lors du fonctionnement de la vue ou lors du changement d’état.
  * ''init'' : une fois lors du démarrage de la vue (methode ''start'')
  * ''loop'' : lorsque la vue fonctionne, a chaque image (ou frame) pour vous permettre de la mettre a jour
  * ''draw'' : lorsque la vue doit être dessinée. Ce callback est utile seulement si vous avez besoin de dessiner des éléments non pris en charge par WeCanPlay. Aucune logique ne doit être inclus dedans car il sera appelé lorsque la vue est en pause.
  * ''destroy'' : lors de l’arrêt de la vue (methode ''stop'')

Chacunes de ces fonctions est execute dans le contexte de l'objet ''View'' (la variable ''this'' a l'interieur des fonctions sera la vue).

### Cycle

Chaque vue fonctionne selon un cycle se repetant :
  * Initialisation. Creation des ressources necessaires
  * Fonctionnement. Les elements sont mis a jour (coordonnes, statut)
  * Destruction. La vue est supprimee, certains elements doivent etre detruis manuellement

Lorsqu'une vue est arretee, il est possible de la demarrer de nouveau et de commencer un nouveau cycle.

Durant un cycle, le framework va garder en memoire certains elements qui seront automatiquement "nettoyes" lors de la fin du cycle.
  * Les elements graphiques ajoutes via la methode ''add''
  * Les timers (''setTimeout'', ''setInterval'')
  * Dans le futur tous les evenements definis dans les callbacks (c'est encore en cours de developpement)

Attention: pour pouvoir gerer certains elements automatiquement (timers et evenements), il faut creer ces elements depuis un callback !

#### Elements graphiques

Les elements ajoutes via la methode ''.add'' sont assignes a la vue. Ils seront automatiquement affiches a chaque image et le cesseront lors de l'arret de la vue. Il n'est pas necessaire de supprimer ces elements dans le callback ''destroy''.

Si vous souhaitez arreter d'afficher un element durant le fonctionnement de la vue, vous pouvez utiliser la methode ''remove'' :

```JavaScript
var logo = new WCP.Sprite(WCP.Assets.get('logo'));

var view = new WCP.View({
    init: function () {
        // ajout du logo a l'initialisation
        this.add(logo);

        var scene = this;

        // Cache le logo au bout de 5 secondes
        WCP.setTimeout(5000, function() {
            scene.remove(logo);
        });
    },
    loop: function () {
        // ...
    }
});
```

Lors de l'affichage de ces elements, leur methode ''draw(ctx)'' est appellee par le framework, avec le contexte graphique en argument.

#### Timers

Les timers crees a l'interieur d'une vue seront automatiquement affectes a cette vue. Ils sont :
  * Mis en pause quand la vue est mise en pause
  * Supprimes lorsque la vue est arretee
  * Synchronises avec le cycle. Avant d'appeler le callback ''loop'' l'ensemble des timers est mis a jour et executés.

La synchronisation d'un timer avec le cycle de la vue est respecte par le Framework. Quand la vue est en pause, les timers le sont aussi. Ils sont tous executes avant l'execution du callback ''loop''.

### Afficher plusieurs vues a la fois

Plusieurs vues peuvent fonctionner en meme temps selon un systeme de pile (stack). La premiere vue activee sera affichee en premier,  puis la seconde et ainsi de suite. Ce fonctionnement facilite l'affichage d'un menu au dessus d'une autre vue (le menu du jeu) ou par exemple d'un dialogue entre PNJ (et plus pourquoi pas un menu encore au dessus).

### Modifier le FPS

Le rafraichissement du canvas est gere dans ce module. Trois fonctions permettent de gerer la vitesse de rafraichissement :

  * WCP.setFps( fps ) : change la frequence de rafraichissement maximum (en images par seconde)
  * WCP.getFps() : retourne la frequence de refraichissement maximum
  * WCP.getRealFps() : retourne le nombre d'images affichees par seconde actuellement

La valeur par defaut est a 60 IPS, ce qui propose un affichage tres fluide sur des ordinateurs recents. Suivant les performances, il se peut que l'ordinateur affiche moins d'images par seconde.

### Controle



### Exemple

La creation d'une vue est une operation simple et rapide. Il faut lui passer en parametre tous les callbacks necessaires. Ensuite, vous pouvez controller cette vue dans votre code.

```JavaScript
var character = null;

/*
 * Creation de la vue avec deux sprites
 */
var view = new WCP.View({
    init: function () {
        var logo = new WCP.Sprite();
        character = new Character();

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

Cet exemple déclare une vue qui sera demarée quand l'utilisateur va cliquer sur le bouton HTML avec l'id ''#btn-launch''. 

Pour rappel, chaque callback est executee dans le contexte de l'objet ''View'' donc il est possible de la controller directement depuis les callbacks.
