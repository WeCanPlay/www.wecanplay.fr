We start from a basic html sheet.

```Html
<!DOCTYPE html>
<html>
	<head>
		<title>Snake</title>
	</head>
	<body>

	</body>
</html>
```

Then, we add the canvas tag in the body with the id canvas in order to find it easily.

```JavaScript
<canvas id="canvas"></canvas>
```

We put a style on the canvas, inside the head tags, in order to delimit the border.

```JavaScript
<code html>
<style>
	#canvas {
		border : 1px solid black;
	}
</style>
</code>
```

To use the WeCanPlay framework in your html page, [download](https://github.com/downloads/WeCanPlay/WeCanPlay/WCP-1.0.js) on github the livrairy and add this line in the head.

```JavaScript
<code html>
<script src='WCP-1.0.js' type='text/javascript'></script>
</code>
```

At the end of this step, we have the following code:

```JavaScript
<!DOCTYPE html>
<html>
	<head>
		<title>Snake</title>
		<style>
			#canvas {
				border : 1px solid black;
			}
		</style>
		<script src='WCP-0.3.js' type='text/javascript'></script>
	</head>
	<body>
		<canvas id="canvas"></canvas>
	</body>
</html>
```