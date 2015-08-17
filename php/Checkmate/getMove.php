<?php
///////////////////////////////
// getMove.php
///////////////////////////////
//
// Get the move.
//	
//////////////////////////



$path = "../../data/Checkmate/log.txt";

$textFile = fopen($path, "r") or die("unable to open file!");
if ( filesize($path) > 0 ) {
	echo fread($textFile, filesize($path));
	
	$writeFile = fopen($path, "w") or die("unable to open file!");
	fwrite($writeFile, "");
	fclose($writeFile);
} else {
	return false;
}
fclose($textFile);



?>