<?php 

// Connects to my Database 
$link = mysqli_connect('localhost', 'root', '');

if (!$link) 
    die('Could not connect: ' . mysql_error());
 else 
    mysqli_select_db($link, "artist_jinu") or die(mysqli_error()); 

?>