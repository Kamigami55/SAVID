<?php


$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

if ( $_SERVER['SERVER_NAME'] == "savid.twomini.com" ) {
	$con = mysqli_connect("mysql.2freehosting.com","u468347883_sam","samkami","u468347883_savid");
} else {
	$con = mysqli_connect("localhost", "root", "mysql", "u468347883_savid");
}

$result = mysqli_query($con, "SELECT * FROM Users WHERE Username='".$username."'");


if ( $row = mysqli_fetch_array($result) ){ 
	if ( $row['Password'] == $password ) {
		echo true;
	} else {
		echo false;
	}
} else {
	echo false;
}

mysqli_close($con);


?>