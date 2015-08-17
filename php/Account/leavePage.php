<?php


$username = $_REQUEST["username"];
$users = "";
$path = "../../data/Account/online.txt";

$file = fopen($path, "r") or die("unable to open file!");
if ( filesize($path) > 0 ) {
	$users = fread($file, filesize($path));
}
fclose($file);

$users = str_replace($username.",","",$users);

$file = fopen($path, "w") or die("unable to open file!");
fwrite($file, $users);
fclose($file);



?>