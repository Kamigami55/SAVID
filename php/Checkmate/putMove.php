<?php
///////////////////////////////
// putMove.php
///////////////////////////////
//
// Put the move.
//	
//////////////////////////



$path = "../../data/Checkmate/log.txt";
$source = $_REQUEST["source"];
$target = $_REQUEST["target"];

$textFile = fopen($path, "w") or die("unable to open file!");
fwrite($textFile, $source."-".$target);
fclose($textFile);



?>