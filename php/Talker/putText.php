<?php
///////////////////////////////
// putText.php
///////////////////////////////
//
// Put the text.
//	
//////////////////////////




$path = "../../data/Talker/log.txt";

$text = $_REQUEST["text"];
$username = $_REQUEST["username"];

$textFile = fopen($path, "a") or die("unable to open file!");
fwrite($textFile, $username.": ".$text."<br>");
fclose($textFile);

?>