The framework provide a set of classes in order to animate objects, sprite or drawing during a certain time. It is possible to move a rectangle along a parabollic path or create all parts of an animation for a game. The use of these features avoid to the developers a lot of calculation too complex.

## WCP.Animation
The class **WCP.Animation** is the **basis** of the WCP animation system. It is this one that allow to make a circle to a sprite or a draw object. When it is created, it is linked to an object that can be a sprite, a draw object or another :

	var rectangle = new WCP.Draw.Rect(10, 10, 25, 25);
	var animation = new WCP.Animation(rectangle);

The principle of this class is that it acts directly on the attributes of the object that is assigned by interpolating the values. To define the attributes to be modified, use the method _animate_. It takes as argument an array which keys are the name of attributs of the object to modify and values represent their future values :

	animation.animate({x: 100, y: 50});

Some keywords can be used to act on elements that can not be contained by the animated object, such as time with the keyword _time_. The list of keywords can be found on below. The scope of a keyword refers only to the effect in which it is defined. In the following example, the object will move to its original position to the position (100, 50) in 2 seconds (2000 milliseconds, the time must be specified in this unit):

	animation.animate({x: 100, y: 50, time: 1000});

The array created and passed as an argument to the method _animate_ is called an **effect**. The method _animate_ accepts in parameters several effects. The set of arguments, and therefore effects form a **bundle**. The effects of a bundle will be start simultaneously at the launch of this one :

	animation.animate({x: 100, y: 50, time: 2000}, {rotation: 42, time: 1000});

It is possible to add a new bundle that will be executed at the end of the previous one with a new call to the method _animate_:

	animation.animate({x: 100, y: 50, time: 2000}, {rotation: 42, time: 1000});
	animation.animate({x: 10, y: 10, time: 1000});

It is possible to chain the call to the method _animate_:

	animation.animate({x: 100, y: 50, time: 2000}, {rotation: 42, time: 1000})
	.animate({x: 10, y: 10, time: 1000});

Use the animate method can be annoying, that is why a set of methods (called animation methods) was created to generate a bundle of effects. All these methods are chainable as _animate_. For example, the following two lines of code are equivalent.

	animation.animate({x: 10, y: 10, time: 200});
	animation.move(10, 10, 200);

Finally, after gradually built your animations with the previous explanations, you can start the animation with the method _start_.

### Animations Keyword

<table>
	<tr>
		<th>Keyword</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>animation</td>
		<td>Start the specify animation or clip.</td>
	</tr>
	<tr>
		<td>clear</td>
		<td>Remove from the list of bundles, all the previous bundle until this one. Thus, it is possible to only repeat one specific part of an animation.</td>
	</tr>
	<tr>
		<td>ease</td>
		<td>Define the Ease of an animation, see below.</td>
	</tr>
	<tr>
		<td>execute</td>
		<td>Execute the function in parallel.</td>
	</tr>
	<tr>
		<td>frames</td>
		<td>Put the animation in pause during a specified number of frames.</td>
	</tr>
	<tr>
		<td>remove</td>
		<td>In the case of a sprite, remove it from the object WCP and clean it from the screen</td>
	</tr>
	<tr>
		<td>repeat</td>
		<td>Allow to repeat the animation a given number of time. If the number is below zero, the animation will be repeat infinitely</td>
	</tr>
	<tr>
		<td>shift</td>
		<td>Define the Shift of an animation, see below.</td>
	</tr>
	<tr>
		<td>time</td>
		<td>Put the animation in pause during a given number of milliseconds</td>
	</tr>
</table>

### WCP.Shift
A **shift** is a **modification of the motion** of an animated object. Without this tool, it would be only possible to move an object along a straight line. To change this, you must specify a shift with the keyword _shift_ in an animation effect in a movement like this next to make a half circle :

	animation.animate(x: 10, y: 10, time: 2000, shift: semiCircle);

### WCP.Ease
An **ease** represent a **modification of the progress** of an interpolation. With this tool, it is possible de move an object faster and faster and to make it bigger slower and slower To do this, you must specify an ease with the keyword _ease_ in an animation effect like this one :

	animation.animate(x: 10, y: 10, time: 2000, ease: parabollic);
	
<table>
	<tr>
		<th>Ease</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>none</td>
		<td>None modification are done, the interpolation runs normally, it is the default Ease.</td>
	</tr>
	<tr>
		<td>parabolic</td>
		<td>The interpolation is modify in a parabolic way, it means that it is start slowly and go faster and faster.</td>
	</tr>
	<tr>
		<td>parabolicReverse</td>
		<td>The interpolation is modify in a reverse parabolic way, it is start fast and go slower and slower.</td>
	</tr>
</table>

## WCP.Clip
A **clip** is a **container** in which we can add animations either other clips. This allows you to group actions such as launching animations or a movement. To add an object, simply use the _add_ method that accepts multiple arguments and launch objects clip must use the _start_ method :

	var clip = new WCP.Clip();
	clip.add(animation1, animation2, clip2);
	clip.start();

<table>
	<tr>
		<th>Shift</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>line</td>
		<td>None modification done, the object do a straight line. It is the default Shift.</td>
	</tr>
	<tr>
		<td>circle</td>
		<td>The object will do a clockwise circle.</td>
	</tr>
	<tr>
		<td>circleReverse</td>
		<td>The object will do a reverse clockwise circle.</td>
	</tr>
	<tr>
		<td>semiCircle</td>
		<td>The object will do a half clocwise circle.</td>
	</tr>
	<tr>
		<td>semiCircleReverse</td>
		<td>The object will do a half reverse clockwise circle.</td>
	</tr>
</table>
	
## WCP.TimeLine
The **timeline** is an object that allow to **define the time of launch** of animations or clip. Thus, we can build an animation like a little movie. The start time is relative to the launch of the timeline with the _start_ method. To specify a time to an animation (in milliseconds), you must use the _set_ method :

	var timeline = new WCP.TimeLine();
	timeline.set(1000, animation);
	timeline.set(2000, clip);
	timeline.start();
