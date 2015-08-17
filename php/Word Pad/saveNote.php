<?php
///////////////////////////////
// saveNote.php
///////////////////////////////
//
// Save the note.
//	
//////////////////////////




$path = "../../data/Word Pad/notes/".$_REQUEST["filename"].".txt";
$content = $_REQUEST["content"];

$textFile = fopen($path, "w") or die("unable to open file!");
fwrite($textFile, $content);
fclose($textFile);

?>