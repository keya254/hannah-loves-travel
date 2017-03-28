<?php
header("Content-Type: application/json; charset=UTF-8");

// Grab the parameter from the post request
$article_id = $_POST["param"];

// Connect to the database using the readonly account
$hostname = "localhost:3306";
$username = "hzyang_readonly";
$password = "dmPIg20BVx7R";
$dbname = "hannah_loves_travel";
$usertable = "travel_articles";
$connection = mysql_connect($hostname, $username, $password);
mysql_select_db($dbname, $connection);

// Send the query
$query = "SELECT json_string FROM $usertable WHERE article_id='$article_id'";
$result = mysql_query($query);
$return_JSON = ""; //variable for the return result
if ($result) {
	$return_JSON = mysql_fetch_array($result)[0];
}

echo $return_JSON;
?>