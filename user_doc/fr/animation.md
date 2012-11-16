
Le framework fourni un ensemble de classes permettant l'animation d'objet, sprite et dessins dans le temps. Il est possible de faire bouger un rectangle selon une trajectoire parabollique ou m�me cr�er de toutes pi�ces une cin�matique pour un jeu. L'utilisation de ces fonctionalit�s permet d'�viter au d�veloppeur des calculs de tajectoire trop complexe.

## WCP.Animation
La classe **WCP.Animation** est la **base** du syst�me d'animation de WCP. C'est elle qui permettra de faire faire un cercle � un sprite ou un objet draw. Lors de sa cr�ation, elle est li�e avec un objet qui peut �tre un sprite, un objet draw ou autre :

	var rectangle = new WCP.Draw.Rect(10, 10, 25, 25);
	var animation = new WCP.Animation(rectangle);
	
Le principe de cette classe, c'est qu'elle agit directement sur les attributs de l'objet qui lui est attribu� en interpolant leurs valeurs. Pour pouvoir d�finir les attributs � modifier, il faut utiliser la m�thode _animate_. Celle-ci prend en argument un tableau ayant pour cl�s le nom des attributs de l'objet � modifier et en valeur leurs futures valeurs:

	animation.animate({x: 100, y: 50});

Certains mot cl�s peuvent �tre utilis�s pour agir sur des �l�ments qui ne peuvent �tre contenu par l'objet anim�, comme le temps avec le mot cl� _time_. La liste des mots cl�s peut �tre consult� sur cette [page]. La port�e d'un mot cl� ne concerne que l'effet dans lequel il est d�fini. Dans l'exemple suivant, l'objet effectuera un d�placement de sa position d'origine jusqu'� la position (100, 50) en 2 secondes (2000 millisecondes, le temps doit �tre pr�cis� dans cette unit�):

	animation.animate({x: 100, y: 50, time: 1000});

Le tableau cr�� et pass� en argument de la m�thode _animate_ s'appel un **effet**. La m�thode _animate_ accepte en param�tres plusieurs effets. L'ensemble des arguments, et donc des effets, forment un **bundle**. Les effets d'un bundle s'effectueront simultan�ment lors du lancement de ce dernier :

	animation.animate({x: 100, y: 50, time: 2000}, {rotation: 42, time: 1000});

Il est possible d'ajouter un nouveau bundle qui sera ex�cut� � la fin du pr�c�dent avec un nouvel appel � la m�thode _animate_:

	animation.animate({x: 100, y: 50, time: 2000}, {rotation: 42, time: 1000});
	animation.animate({x: 10, y: 10, time: 1000});

Il est possible de chainer l'appel de la m�thode _animate_:

	animation.animate({x: 100, y: 50, time: 2000}, {rotation: 42, time: 1000})
	.animate({x: 10, y: 10, time: 1000});

Utiliser la m�thode animate peut devenir r�barbatif, c'est pour cela qu'un ensemble de m�thodes (dites m�thodes d'animation) a �tait cr�� pour g�n�rer des bundles d'effets. Toutes ces m�thodes sont chainables comme _animate_. Par exemple, voici deux lignes de codes �quivalentes :

	animation.animate({x: 10, y: 10, time: 200});
	animation.move(10, 10, 200);
	
Finalement, apr�s avoir construit petit � petit votre animation gr�ce aux explications pr�c�dentes, vous pouvez lancer la lancer avec la m�thode _start_.

### Mot cl�s animations

<table>
	<tr>
		<th>Mot cl�</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>animation</td>
		<td>D�marre l'animation sp�cifi�e.</td>
	</tr>
	<tr>
		<td>clear</td>
		<td>Enl�ve de la liste des bundles tout les bundle lui pr�c�dent. Ainsi, il est possible de ne r�p�ter qu'une partie sp�cifique d'une animation.</td>
	</tr>
	<tr>
		<td>ease</td>
		<td>D�finis l'Ease d'une animation, voir plus bas.</td>
	</tr>
	<tr>
		<td>execute</td>
		<td>Execute la fonction sp�cifi� en parrall�le</td>
	</tr>
	<tr>
		<td>frames</td>
		<td>Met l'animation en attente selon un nombre de frames sp�cifi�</td>
	</tr>
	<tr>
		<td>remove</td>
		<td>Dans le cas d'un sprite, l'enl�ve de l'objet WCP et l'efface de l'�cran</td>
	</tr>
	<tr>
		<td>repeat</td>
		<td>Permet de r�p�ter l'animation un certain nombre de fois. Si le nombre est en dessous de z�ro, l'animation est r�p�t�e � l'infini.</td>
	</tr>
	<tr>
		<td>shift</td>
		<td>D�termine le Shift d'une animation, voir plus bas</td>
	</tr>
	<tr>
		<td>time</td>
		<td>Met l'animation en attente selon un temps sp�cifi�, en millisecondes</td>
	</tr>
</table>

### WCP.Shift
Un **shift** repr�sente une **modification du mouvement** d'un objet anim�. Sans cet outil, il ne seraient possible de faire bouger un objet que selon une ligne droite. Pour modifier cela, il faut pr�ciser un shift avec le mot cl� _shift_ dans un effet d'animation de mouvement comme ceci pour effectuer un demi cercle :

	animation.animate(x: 10, y: 10, time: 2000, shift: semiCircle);

<table>
	<tr>
		<th>Ease</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>none</td>
		<td>Aucune modification n'est effectu�e, l'interpolation se d�roule normalement, c'est l'Ease par d�faut.</td>
	</tr>
	<tr>
		<td>parabolic</td>
		<td>L'interpolation est modifi�e de mani�re parabollique, c'est � dire d�marre lentement et acc�l�re.</td>
	</tr>
	<tr>
		<td>parabolicReverse</td>
		<td>L'interpolation est modifi�e de mani�re parabollique inverse, c'est � dire d�marre rapidement et ralenti.</td>
	</tr>
</table>

### WCP.Ease
Un **ease** repr�sente une **modification de l'avancement** d'une interpolation. Avec cet outil, il est possible faire bouger un objet de plus en plus vite, de le faire grossir de plus en plus lentement. Pour cela, il faut pr�ciser un ease avec le mot cl� _ease_ dans un effet d'animation comme ceci:

	animation.animate(x: 10, y: 10, time: 2000, ease: parabollic);

<table>
	<tr>
		<th>Shift</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>line</td>
		<td>Aucune modification n'est effectu�e, l'objet fera un mouvement en ligne droite. C'est le shift par d�faut.</td>
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
Un **clip** est un **conteneur** dans lequel on peut ajouter des animations ou m�me d'autre clip. Cela permet de grouper des actions telles que le lancement des animations ou leurs d�placement. Pour ajouter un objet il suffit d'utiliser la m�thode _add_ qui accepte plusieurs arguments et pour lancer les objets du clip il faut utiliser la m�thode _start_ :

	var clip = new WCP.Clip();
	clip.add(animation1, animation2, clip2);
	clip.start();
	
## WCP.TimeLine
La **timeline** est un objet permettant de **d�finir le moment de lancement** des animations ou clip. Ainsi, on peut construire une animation ressemblant � une cin�matique. Le temps de d�part est relatif au lancement la timeline avec la m�thode start. Pour sp�cifier un temps � une animation (en millisecondes), il faut utiliser la m�thode set :

	var timeline = new WCP.TimeLine();
	timeline.set(1000, animation);
	timeline.set(2000, clip);
	timeline.start();
