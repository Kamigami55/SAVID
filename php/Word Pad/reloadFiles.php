<?php
///////////////////////////////
// reloadFiles.php
///////////////////////////////
//
// Load notes.
//	
//////////////////////////




$fileList = glob("../../data/Word Pad/notes/*.txt");

foreach( $fileList as $note ) {
	echo substr($note, 26).","; // cut "../../data/Word Pad/notes/"
}

?>