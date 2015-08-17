<?php


$username = $_REQUEST["username"];
$path = "../../data/Request/".$username.".xml";

unlink($path);

?>