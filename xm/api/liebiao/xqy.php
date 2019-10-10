<?php
include '../conn.php';
$id = $_REQUEST['id'] ? ($_REQUEST['id']) : ''; //需要查询关联表某个商品的id
$sql = "SELECT * FROM imglist WHERE id=$id";
$res = $conn->query($sql);
$arr = $res->fetch_all(MYSQLI_ASSOC);
$json = array();
for ($i = 0; $i < count($arr); $i++) {
    $json[] = $arr[$i]['img'];
}
$listsql = "SELECT * FROM goodlist WHERE id=$id";
$listres = $conn->query($listsql);
$listjson = $listres->fetch_all(MYSQLI_ASSOC);
$obj = array(
    'imgs' => $json,
    'content' => $listjson
);
echo json_encode($obj);

$conn->close();
