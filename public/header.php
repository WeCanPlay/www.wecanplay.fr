<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>WeCanPlay - <?php echo $title ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Wecanplay">
	<link rel="canonical" href="" />
	
    <link href="<?php if (isset($base_url))  {echo $base_url; }?>css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php if (isset($base_url))  {echo $base_url; }?>css/wecanplay.css" rel="stylesheet">
    <link href="<?php if (isset($base_url))  {echo $base_url; }?>css/prettify.css" type="text/css" rel="stylesheet" />
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

	<script src="<?php if (isset($base_url))  {echo $base_url; }?>js/build-WCP.js"></script>
    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="<?php if (isset($base_url))  {echo $base_url; }?>imgs/favicon.ico">
	<link rel="apple-touch-icon" href="<?php if (isset($base_url))  {echo $base_url; }?>imgs/apple-touch-icon-iphone.png" /> 
	<link rel="apple-touch-icon" sizes="72x72" href="<?php if (isset($base_url))  {echo $base_url; }?>imgs/apple-touch-icon-ipad.png" /> 
	<link rel="apple-touch-icon" sizes="114x114" href="<?php if (isset($base_url))  {echo $base_url; }?>imgs/apple-touch-icon-iphone4.png" />
	<link rel="apple-touch-icon" sizes="144x144" href="<?php if (isset($base_url))  {echo $base_url; }?>imgs/apple-touch-icon-ipad3.png" />
    <script type="text/javascript" src="<?php if (isset($base_url))  {echo $base_url; }?>js/prettify.js"></script>
    <script type="text/javascript" src="<?php if (isset($base_url))  {echo $base_url; }?>js/jquery.js"></script>
    <script type="text/javascript" src="<?php if (isset($base_url))  {echo $base_url; }?>bootstrap/js/bootstrap.js"></script>
	<script type="text/javascript">

	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-4718334-11']);
	  _gaq.push(['_trackPageview']);

	  (function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();

	</script>
</head>
<body>
	<nav class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
			<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</a>
			<a class="brand" href="http://www.wecanplay.fr/"><img src="<?php if (isset($base_url))  {echo $base_url; }?>imgs/logo_wecanplay.png" width="50" />WeCanPlay</a>
			<div class="nav-collapse">
			<ul class="nav">
				<li <?php if ($page == 'index') { echo 'class="active"'; }?> ><a href="http://www.wecanplay.fr/">Home</a></li>
                <li <?php if ($page == 'about') { echo 'class="active"'; }?> ><a href="/about.html">About</a></li>
                <li <?php if ($page == 'blog') { echo 'class="active"'; }?> ><a href="http://blog.wecanplay.fr">Blog</a></li>
                <li class="dropdown <?php if ($page == 'documentation') { echo 'active'; }?>">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						Learn<b class="caret"></b>
					</a>
					<ul class="dropdown-menu">
						<li><a href="/tuto/intro.html">Tutorial</a></li>
						<li><a href="/doc/en/intro.html">User documentation</a></li>
						<li><a href="http://wiki.wecanplay.fr">API Reference</a></li>
					</ul>
	            </li>
				<li <?php if ($page == 'examples') { echo 'class="active"'; }?> ><a href="/examples.html">Examples</a></li>
				<li <?php if ($page == 'contact') { echo 'class="active"'; }?> ><a href="/contact.html">Contact</a></li>
			</ul>
			</div><!--/.nav-collapse -->
        </div>
      </div>
    </nav>