
Le framework fourni un ensemble de classes permettant l'animation d'objet, sprite et dessins dans le temps. Il est possible de faire bouger un rectangle selon une trajectoire parabollique ou même créer de toutes pièces une cinématique pour un jeu. L'utilisation de ces fonctionalités permet d'éviter au développeur des calculs de tajectoire trop complexe.

## WCP.Animation
La classe **WCP.Animation** est la **base** du système d'animation de WCP. C'est elle qui permettra de faire faire un cercle à un sprite ou un objet draw. Lors de sa création, elle est liée avec un objet qui peut être un sprite, un objet draw ou autre :

	var rectangle = new WCP.Draw.Rect(10, 10, 25, 25);
	var animation = new WCP.Animation(rectangle);
	
Le principe de cette classe, c'est qu'elle agit directement sur les attributs de l'objet qui lui est attribué en interpolant leurs valeurs. Pour pouvoir définir les attributs à modifier, il faut utiliser la méthode _animate_. Celle-ci prend en argument un tableau ayant pour clés le nom des attributs de l'objet à modifier et en valeur leurs futures valeurs:

	animation.animate({x: 100, y: 50});

Certains mot clés peuvent être utilisés pour agir sur des éléments qui ne peuvent être contenu par l'objet animé, comme le temps avec le mot clé _time_. La liste des mots clés peut être consulté sur cette [page]. La portée d'un mot clé ne concerne que l'effet dans lequel il est défini. Dans l'exemple suivant, l'objet effectuera un déplacement de sa position d'origine jusqu'à la position (100, 50) en 2 secondes (2000 millisecondes, le temps doit être précisé dans cette unité):

	animation.animate({x: 100, y: 50, time: 1000});

Le tableau créé et passé en argument de la méthode _animate_ s'appel un **effet**. La méthode _animate_ accepte en paramètres plusieurs effets. L'ensemble des arguments, et donc des effets, forment un **bundle**. Les effets d'un bundle s'effectueront simultanément lors du lancement de ce dernier :

	animation.animate({x: 100, y: 50, time: 2000}, {rotation: 42, time: 1000});

Il est possible d'ajouter un nouveau bundle qui sera exécuté à la fin du précédent avec un nouvel appel à la méthode _animate_:

	animation.animate({x: 100, y: 50, time: 2000}, {rotation: 42, time: 1000});
	animation.animate({x: 10, y: 10, time: 1000});

Il est possible de chainer l'appel de la méthode _animate_:

	animation.animate({x: 100, y: 50, time: 2000}, {rotation: 42, time: 1000})
	.animate({x: 10, y: 10, time: 1000});

Utiliser la méthode animate peut devenir rébarbatif, c'est pour cela qu'un ensemble de méthodes (dites méthodes d'animation) a était créé pour générer des bundles d'effets. Toutes ces méthodes sont chainables comme _animate_. Par exemple, voici deux lignes de codes équivalentes :

	animation.animate({x: 10, y: 10, time: 200});
	animation.move(10, 10, 200);
	
Finalement, après avoir construit petit à petit votre animation grâce aux explications précédentes, vous pouvez lancer la lancer avec la méthode _start_.

### Mot clés animations

<table>
	<tr>
		<th>Mot clé</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>animation</td>
		<td>Démarre l'animation spécifiée.</td>
	</tr>
	<tr>
		<td>clear</td>
		<td>Enlève de la liste des bundles tout les bundle lui précédent. Ainsi, il est possible de ne répéter qu'une partie spécifique d'une animation.</td>
	</tr>
	<tr>
		<td>ease</td>
		<td>Définis l'Ease d'une animation, voir plus bas.</td>
	</tr>
	<tr>
		<td>execute</td>
		<td>Execute la fonction spécifié en parrallèle</td>
	</tr>
	<tr>
		<td>frames</td>
		<td>Met l'animation en attente selon un nombre de frames spécifié</td>
	</tr>
	<tr>
		<td>remove</td>
		<td>Dans le cas d'un sprite, l'enlève de l'objet WCP et l'efface de l'écran</td>
	</tr>
	<tr>
		<td>repeat</td>
		<td>Permet de répéter l'animation un certain nombre de fois. Si le nombre est en dessous de zéro, l'animation est répétée à l'infini.</td>
	</tr>
	<tr>
		<td>shift</td>
		<td>Détermine le Shift d'une animation, voir plus bas</td>
	</tr>
	<tr>
		<td>time</td>
		<td>Met l'animation en attente selon un temps spécifié, en millisecondes</td>
	</tr>
</table>

### WCP.Shift
Un **shift** représente une **modification du mouvement** d'un objet animé. Sans cet outil, il ne seraient possible de faire bouger un objet que selon une ligne droite. Pour modifier cela, il faut préciser un shift avec le mot clé _shift_ dans un effet d'animation de mouvement comme ceci pour effectuer un demi cercle :

	animation.animate(x: 10, y: 10, time: 2000, shift: semiCircle);

<table>
	<tr>
		<th>Ease</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>none</td>
		<td>Aucune modification n'est effectuée, l'interpolation se déroule normalement, c'est l'Ease par défaut.</td>
	</tr>
	<tr>
		<td>parabolic</td>
		<td>L'interpolation est modifiée de manière parabollique, c'est à dire démarre lentement et accélère.</td>
	</tr>
	<tr>
		<td>parabolicReverse</td>
		<td>L'interpolation est modifiée de manière parabollique inverse, c'est à dire démarre rapidement et ralenti.</td>
	</tr>
</table>

### WCP.Ease
Un **ease** représente une **modification de l'avancement** d'une interpolation. Avec cet outil, il est possible faire bouger un objet de plus en plus vite, de le faire grossir de plus en plus lentement. Pour cela, il faut préciser un ease avec le mot clé _ease_ dans un effet d'animation comme ceci:

	animation.animate(x: 10, y: 10, time: 2000, ease: parabollic);

<table>
	<tr>
		<th>Shift</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>line</td>
		<td>Aucune modification n'est effectuée, l'objet fera un mouvement en ligne droite. C'est le shift par défaut.</td>
	</tr>
	<tr>
		<td>circle</td>
		<td>L'objet effectuera un cercle dans le sens des aiguilles d'une montre.</td>
	</tr>
	<tr>
		<td>circleReverse</td>
		<td>L'objet effectuera un cercle dans le sens inverse des aiguilles d'une montre.</td>
	</tr>
	<tr>
		<td>semiCircle</td>
		<td>L'objet effectuera un demi cercle dans le sens des aiguilles d'une montre.</td>
	</tr>
	<tr>
		<td>semiCircleReverse</td>
		<td>L'objet effectuera un demi cercle dans le sens inverse des aiguilles d'une montre.</td>
	</tr>
</table>

## WCP.Clip
Un **clip** est un **conteneur** dans lequel on peut ajouter des animations ou même d'autre clip. Cela permet de grouper des actions telles que le lancement des animations ou leurs déplacement. Pour ajouter un objet il suffit d'utiliser la méthode _add_ qui accepte plusieurs arguments et pour lancer les objets du clip il faut utiliser la méthode _start_ :

	var clip = new WCP.Clip();
	clip.add(animation1, animation2, clip2);
	clip.start();
	
## WCP.TimeLine
La **timeline** est un objet permettant de **définir le moment de lancement** des animations ou clip. Ainsi, on peut construire une animation ressemblant à une cinématique. Le temps de départ est relatif au lancement la timeline avec la méthode start. Pour spécifier un temps à une animation (en millisecondes), il faut utiliser la méthode set :

	var timeline = new WCP.TimeLine();
	timeline.set(1000, animation);
	timeline.set(2000, clip);
	timeline.start();
