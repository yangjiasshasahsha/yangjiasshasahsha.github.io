<?php
include '../conn.php';
$name = isset($_REQUEST['username']) ? $_REQUEST['username'] : '';
$m = isset($_REQUEST['m']) ? $_REQUEST['m'] : '';
$username = isset($_REQUEST['username']) ? $_REQUEST['username'] : '';
$password = isset($_REQUEST['password']) ? $_REQUEST['password'] : '';
$ok = 0;

if ($m == 'findname') { //验证用户名
    $sql = "SELECT username FROM users";
    $res = $conn->query($sql);
    $namearr = $res->fetch_all(MYSQLI_ASSOC);
    for ($i = 0; $i < count($namearr); $i++) {
        if ($namearr[$i]['username'] == $name) {
            $ok = 1;
        }
    };
    if ($ok) {
        $arr = array(
            'code' => $ok,
            'message' => '用户名已存在'
        );
        echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    } else {
        $arr = array(
            'code' => $ok,
            'message' => '用户名可用'
        );
        echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    }
}
if ($m == 'zhuce') { //注册
    $sql = "SELECT username FROM users";
    $res = $conn->query($sql);
    $namearr = $res->fetch_all(MYSQLI_ASSOC);
    for ($i = 0; $i < count($namearr); $i++) {
        if ($namearr[$i]['username'] == $name) {
            $ok = 1;
        }
    };
    if ($ok) {
        $arr = array(
            'code' => $ok,
            'message' => '注册失败'
        );
        echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    } else {
        $sql1 = "INSERT INTO users (username,password) VALUES ('$username',$password)";
        $res1 = $conn->query($sql1);
        $arr = array(
            'code' => $ok,
            'message' => '注册成功'
        );
        echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    }
}
if ($m == 'login') { //登入
    $sql = "SELECT*FROM users WHERE username='$username' AND password='$password'";
    $res = $conn->query($sql);
    if ($res->num_rows) {
        $arr = array(
            'code' => 1,
            'message' => 'yes'
        );
        echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    } else {
        $arr = array(
            'code' => 0,
            'message' => 'no'
        );
        echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    }
}
$conn->close();
