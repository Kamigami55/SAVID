<?php


$username = $_REQUEST["username"];
$path = "../../data/Request/".$username.".xml";

$file = fopen($path, "x") or die("unable to add file");
fclose($file);



?>