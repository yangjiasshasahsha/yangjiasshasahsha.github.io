<?php
include '../conn.php';
$keyword = isset($_REQUEST['val']) ? $_REQUEST['val'] : ''; //模糊查询关键字眼
$page = isset($_REQUEST['ipage']) ? $_REQUEST['ipage'] : '1'; //前端需要的页数
$num = isset($_REQUEST['num']) ? $_REQUEST['num'] : '25'; //前端需要每页显示的商品个数
$paixu = isset($_REQUEST['paixu']) ? $_REQUEST['paixu'] : 'asc'; //前端需要的排序 方式
$min = isset($_REQUEST['minval']) ? $_REQUEST['minval'] : ''; //前端需要的价格最小值
$max = isset($_REQUEST['maxval']) ? $_REQUEST['maxval'] : ''; //前端需要的价格最大值
$index = ($page - 1) * $num; //利用前端给的页数与条数计算需要从下标为多少的商品开始查询
if ($min && $max) { //如果有价格最小值或者最大值从前端传来就按需查找
    $sql = "SELECT*FROM goodlist WHERE name LIKE '%$keyword%' AND price BETWEEN $min AND $max ORDER BY price $paixu LIMIT $index,$num";
} else { //如果没有就按照模糊查询查找  因为模糊查询如果为空就是查找全部
    $sql = "SELECT*FROM goodlist WHERE name LIKE '%$keyword%'  ORDER BY price $paixu LIMIT $index,$num";
}
$res = $conn->query($sql); //找到相应的结果集
$content = $res->fetch_all(MYSQLI_ASSOC); //生成商品数组
$sql1 = "SELECT*FROM goodlist WHERE name LIKE '%$keyword%'"; //按需查找满足要求的表中全部商品
$res1 = $conn->query($sql1); //获取结果集
if ($min && $max) { //如果有价格区间要求渲染的商品就不能采用模糊查询的所有商品的条数
    $sum = $res->num_rows;
} else { //如果没有价格要求渲染的商品就是模糊查询的总条数
    $sum = $res1->num_rows;
}
$json = array();
for ($i = 0; $i < count($content); $i++) {
    $id = $content[$i]['id'];
    $sqlimg = "SELECT *FROM imglist WHERE id=$id";
    $resimg = $conn->query($sqlimg);
    $arrimg = $resimg->fetch_all(MYSQLI_ASSOC);
    $obj = array(
        'imgs' => $arrimg,
        'id' => $content[$i]['id'],
        'img' => $content[$i]['img'],
        'price' => $content[$i]['price'],
        'name' => $content[$i]['name'],
    );
    $json[] = $obj;
}
$arr = array( //把前端需要数据做成数组
    'json' => $json,
    'sum' => $sum
);
echo json_encode($arr); //传给前端

$conn->close();
