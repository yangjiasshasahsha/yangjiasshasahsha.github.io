<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "xm";
//创建连接
$conn = new mysqli($servername, $username, $password, $dbname);
//检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}
$conn->set_charset('utf8');

$m = isset($_REQUEST['m']) ? $_REQUEST['m'] : ''; //功能
$uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : ''; //用户id
$username = isset($_REQUEST['username']) ? $_REQUEST['username'] : ''; //修改的密码
$pas = isset($_REQUEST['pas']) ? $_REQUEST['pas'] : ''; //修改的密码
if ($m == 'del') { //删除
    $sql = "DELETE FROM	users WHERE uid=$uid";
    $res = $conn->query($sql);
}
if ($m == 'inquire') { //查询 
    $sql = "SELECT*FROM users";
    $res = $conn->query($sql);
    $arr = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($arr);
}
if ($m == 'amend') { //修改
    $sql = "UPDATE users SET `password`='$pas' WHERE uid=$uid";
    $res = $conn->query($sql);
}
if ($m == 'surename') { //添加
    $usersql = "SELECT *FROM users WHERE username='$username'";
    $userres = $conn->query($usersql);
    if ($userres->num_rows) {
        echo 0;
    } else {
        echo 1;
    }
}
if ($m == 'add') {
    $sql = "INSERT INTO users (username,password) VALUE('$username','$pas')";
    $res = $conn->query($sql);
}
