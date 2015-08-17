<?php
///////////////////////////////
// addNote.php
///////////////////////////////
//
// Add a new note.
//	
//////////////////////////




$path = "../../data/Word Pad/notes/".$_REQUEST["filename"].".txt";

if ( file_exists($path) ) {
	echo false;
} else {
	$textFile = fopen($path, "x") or die("unable to add file");
	fclose($textFile);
	echo true;
}

?>