<?php
include '../conn.php';
$idarr = isset($_REQUEST['idarr']) ? $_REQUEST['idarr'] : ''; //必须传入字符串形式
$arr = json_decode($idarr); //转为数组
for ($i = 0; $i < count($arr); $i++) {//遍历数组
    $id = $arr[$i];//提取出id
    $sql = "DELETE FROM shoppingcar WHERE id=$id";//删除该id对应的商品
    $res = $conn->query($sql);
}
$conn->close();