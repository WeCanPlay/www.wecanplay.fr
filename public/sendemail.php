<?php

if (isset($_POST)) {
	if (!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['message'])) {
		$msg = "Un message a partir du site www.wecanplay.fr viens d'etre envoyé\n";
		$msg .= "De la part de ".$_POST['name']." ( ".$_POST['email']." - ".$_SERVER['REMOTE_ADDR']." ) \n";
		$msg .= $_POST['message'];
		mail("contact@wecanplay.fr", "[form website]", $msg);
		echo "{msg: 'ok'}";
		exit();
	}
}
echo "{msg: 'error'}";
//header("Location: http://www.wecanplay.fr/contact.html");