<?php
include '../conn.php';
$id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
$delsql = "DELETE FROM shoppingcar WHERE id=$id";
$delres = $conn->query($delsql);
$conn->close();