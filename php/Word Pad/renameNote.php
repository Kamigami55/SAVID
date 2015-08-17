<?php
///////////////////////////////
// renameNote.php
///////////////////////////////
//
// Rename the note.
//	
//////////////////////////




$path = "../../data/Word Pad/notes/".$_REQUEST["oldFilename"].".txt";
$newName = "../../data/Word Pad/notes/".$_REQUEST["newFilename"].".txt";


if ( file_exists($newName) ) {
	echo false;
} else {
	rename($path, $newName);
	echo true;
}

?>