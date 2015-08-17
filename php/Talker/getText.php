<?php
///////////////////////////////
// getText.php
///////////////////////////////
//
// Get the text
//	
//////////////////////////




$path = "../../data/Talker/log.txt";

$textFile = fopen($path, "r") or die("unable to open file!");
if ( filesize($path) > 0 ) {
	echo fread($textFile, filesize($path));
}
fclose($textFile);

?>