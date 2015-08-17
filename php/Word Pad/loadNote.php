<?php
///////////////////////////////
// loadNote.php
///////////////////////////////
//
// Open the note.
//	
//////////////////////////




$path = "../../data/Word Pad/notes/".$_REQUEST["filename"].".txt";

$textFile = fopen($path, "r") or die("unable to open file!");
if ( filesize($path) > 0 ) {
	echo fread($textFile, filesize($path));
}
fclose($textFile);

?>