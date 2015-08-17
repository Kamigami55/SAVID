<?php
///////////////////////////////
// deleteNote.php
///////////////////////////////
//
// Delete the note.
//	
//////////////////////////




$path = "../../data/Word Pad/notes/".$_REQUEST["filename"].".txt";

unlink($path);
echo $_REQUEST['filename']; //todo

?>