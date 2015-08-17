<?php


$username = $_REQUEST["username"];
$path = "../../data/Account/online.txt";

$file = fopen($path, "a") or die("unable to open file!");
fwrite($file, $username.",");
fclose($file);



?>