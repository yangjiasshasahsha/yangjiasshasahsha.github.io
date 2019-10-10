<?php
include '../conn.php';
$id = isset($_REQUEST['id']) ? $_REQUEST['id'] : ''; //传入需要加减数量的商品id
$m = isset($_REQUEST['m']) ? $_REQUEST['m'] : ''; //传入加或减
$num = isset($_REQUEST['num']) ? $_REQUEST['num'] : ''; //传入商品数量
//加减数量
$jiasql = "UPDATE shoppingcar SET num='$num' WHERE id=$id";
$jiares = $conn->query($jiasql);
$conn->close();
