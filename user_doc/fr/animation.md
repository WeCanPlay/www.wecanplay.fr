
Le framework fourni un ensemble de classes permettant l'animation d'objet, sprite et dessins dans le temps. Il est possible de faire bouger un rectangle selon une trajectoire parabollique ou m&ecirc;me cr&eacute;er de toutes pi&egrave;ces une cin&eacute;matique pour un jeu. L'utilisation de ces fonctionalit&eacute;s permet d'&eacute;viter au d&eacute;veloppeur des calculs de tajectoire trop complexe.

## WCP.Animation
La classe **WCP.Animation** est la **base** du syst&egrave;me d'animation de WCP. C'est elle qui permettra de faire faire un cercle &agrave; un sprite ou un objet draw. Lors de sa cr&eacute;ation, elle est li&eacute;e avec un objet qui peut &ecirc;tre un sprite, un objet draw ou autre :

	var rectangle = new WCP.Draw.Rect(10, 10, 25, 25);
	var animation = new WCP.Animation(rectangle);
	
Le principe de cette classe, c'est qu'elle agit directement sur les attributs de l'objet qui lui est attribu&eacute; en interpolant leurs valeurs. Pour pouvoir d&eacute;finir les attributs &agrave; modifier, il faut utiliser la m&eacute;thode _animate_. Celle-ci prend en argument un tableau ayant pour cl&eacute;s le nom des attributs de l'objet &agrave; modifier et en valeur leurs futures valeurs:

	animation.animate({x: 100, y: 50});

Certains mot cl&eacute;s peuvent &ecirc;tre utilis&eacute;s pour agir sur des &eacute;l&eacute;ments qui ne peuvent &ecirc;tre contenu par l'objet anim&eacute;, comme le temps avec le mot cl&eacute; _time_. La liste des mots cl&eacute;s peut &ecirc;tre consult&eacute; sur cette [page]. La port&eacute;e d'un mot cl&eacute; ne concerne que l'effet dans lequel il est d&eacute;fini. Dans l'exemple suivant, l'objet effectuera un d&eacute;placement de sa position d'origine jusqu'&agrave; la position (100, 50) en 2 secondes (2000 millisecondes, le temps doit &ecirc;tre pr&eacute;cis&eacute; dans cette unit&eacute;):

	animation.animate({x: 100, y: 50, time: 1000});

Le tableau cr&eacute;&eacute; et pass&eacute; en argument de la m&eacute;thode _animate_ s'appel un **effet**. La m&eacute;thode _animate_ accepte en param&egrave;tres plusieurs effets. L'ensemble des arguments, et donc des effets, forment un **bundle**. Les effets d'un bundle s'effectueront simultan&eacute;ment lors du lancement de ce dernier :

	animation.animate({x: 100, y: 50, time: 2000}, {rotation: 42, time: 1000});

Il est possible d'ajouter un nouveau bundle qui sera ex&eacute;cut&eacute; &agrave; la fin du pr&eacute;c&eacute;dent avec un nouvel appel &agrave; la m&eacute;thode _animate_:

	animation.animate({x: 100, y: 50, time: 2000}, {rotation: 42, time: 1000});
	animation.animate({x: 10, y: 10, time: 1000});

Il est possible de chainer l'appel de la m&eacute;thode _animate_:

	animation.animate({x: 100, y: 50, time: 2000}, {rotation: 42, time: 1000})
	.animate({x: 10, y: 10, time: 1000});

Utiliser la m&eacute;thode animate peut devenir r&eacute;barbatif, c'est pour cela qu'un ensemble de m&eacute;thodes (dites m&eacute;thodes d'animation) a &eacute;tait cr&eacute;&eacute; pour g&eacute;n&eacute;rer des bundles d'effets. Toutes ces m&eacute;thodes sont chainables comme _animate_. Par exemple, voici deux lignes de codes &eacute;quivalentes :

	animation.animate({x: 10, y: 10, time: 200});
	animation.move(10, 10, 200);
	
Finalement, apr&egrave;s avoir construit petit &agrave; petit votre animation gr&acirc;ce aux explications pr&eacute;c&eacute;dentes, vous pouvez lancer la lancer avec la m&eacute;thode _start_.

### Mot cl&eacute;s animations

<table>
	<tr>
		<th>Mot cl&eacute;</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>animation</td>
		<td>D&eacute;marre l'animation sp&eacute;cifi&eacute;e.</td>
	</tr>
	<tr>
		<td>clear</td>
		<td>Enl&egrave;ve de la liste des bundles tout les bundle lui pr&eacute;c&eacute;dent. Ainsi, il est possible de ne r&eacute;p&eacute;ter qu'une partie sp&eacute;cifique d'une animation.</td>
	</tr>
	<tr>
		<td>ease</td>
		<td>D&eacute;finis l'Ease d'une animation, voir plus bas.</td>
	</tr>
	<tr>
		<td>execute</td>
		<td>Execute la fonction sp&eacute;cifi&eacute; en parrall&egrave;le</td>
	</tr>
	<tr>
		<td>frames</td>
		<td>Met l'animation en attente selon un nombre de frames sp&eacute;cifi&eacute;</td>
	</tr>
	<tr>
		<td>remove</td>
		<td>Dans le cas d'un sprite, l'enl&egrave;ve de l'objet WCP et l'efface de l'&eacute;cran</td>
	</tr>
	<tr>
		<td>repeat</td>
		<td>Permet de r&eacute;p&eacute;ter l'animation un certain nombre de fois. Si le nombre est en dessous de z&eacute;ro, l'animation est r&eacute;p&eacute;t&eacute;e &agrave; l'infini.</td>
	</tr>
	<tr>
		<td>shift</td>
		<td>D&eacute;termine le Shift d'une animation, voir plus bas</td>
	</tr>
	<tr>
		<td>time</td>
		<td>Met l'animation en attente selon un temps sp&eacute;cifi&eacute;, en millisecondes</td>
	</tr>
</table>

### WCP.Shift
Un **shift** repr&eacute;sente une **modification du mouvement** d'un objet anim&eacute;. Sans cet outil, il ne seraient possible de faire bouger un objet que selon une ligne droite. Pour modifier cela, il faut pr&eacute;ciser un shift avec le mot cl&eacute; _shift_ dans un effet d'animation de mouvement comme ceci pour effectuer un demi cercle :

	animation.animate(x: 10, y: 10, time: 2000, shift: semiCircle);

<table>
	<tr>
		<th>Ease</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>none</td>
		<td>Aucune modification n'est effectu&eacute;e, l'interpolation se d&eacute;roule normalement, c'est l'Ease par d&eacute;faut.</td>
	</tr>
	<tr>
		<td>parabolic</td>
		<td>L'interpolation est modifi&eacute;e de mani&egrave;re parabollique, c'est &agrave; dire d&eacute;marre lentement et acc&eacute;l&egrave;re.</td>
	</tr>
	<tr>
		<td>parabolicReverse</td>
		<td>L'interpolation est modifi&eacute;e de mani&egrave;re parabollique inverse, c'est &agrave; dire d&eacute;marre rapidement et ralenti.</td>
	</tr>
</table>

### WCP.Ease
Un **ease** repr&eacute;sente une **modification de l'avancement** d'une interpolation. Avec cet outil, il est possible faire bouger un objet de plus en plus vite, de le faire grossir de plus en plus lentement. Pour cela, il faut pr&eacute;ciser un ease avec le mot cl&eacute; _ease_ dans un effet d'animation comme ceci:

	animation.animate(x: 10, y: 10, time: 2000, ease: parabollic);

<table>
	<tr>
		<th>Shift</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>line</td>
		<td>Aucune modification n'est effectu&eacute;e, l'objet fera un mouvement en ligne droite. C'est le shift par d&eacute;faut.</td>
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
Un **clip** est un **conteneur** dans lequel on peut ajouter des animations ou m&ecirc;me d'autre clip. Cela permet de grouper des actions telles que le lancement des animations ou leurs d&eacute;placement. Pour ajouter un objet il suffit d'utiliser la m&eacute;thode _add_ qui accepte plusieurs arguments et pour lancer les objets du clip il faut utiliser la m&eacute;thode _start_ :

	var clip = new WCP.Clip();
	clip.add(animation1, animation2, clip2);
	clip.start();
	
## WCP.TimeLine
La **timeline** est un objet permettant de **d&eacute;finir le moment de lancement** des animations ou clip. Ainsi, on peut construire une animation ressemblant &agrave; une cin&eacute;matique. Le temps de d&eacute;part est relatif au lancement la timeline avec la m&eacute;thode start. Pour sp&eacute;cifier un temps &agrave; une animation (en millisecondes), il faut utiliser la m&eacute;thode set :

	var timeline = new WCP.TimeLine();
	timeline.set(1000, animation);
	timeline.set(2000, clip);
	timeline.start();
