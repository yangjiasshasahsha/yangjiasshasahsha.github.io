// * firstElementChild 获取第一个子元素
function first(a) {//传入节点
    return a.firstElementChild || a.firstChild;
}
// * lastElementChild 获取最后一个子元素
function last(a) {
    return a.lastElementChild || a.lastChild;
}
// * previousElementSibling 获取前一个元素
function siBling(a) {
    return a.previousElementSibling || a.previousSibling;
}
// * nextElementSibling 获取下一个元素
function nextSb(a) {
    return a.nextElementSibling || a.nextSibling;
}

function css() {
    if (arguments.length == 2) {//获取样式
        if (getComputedStyle(arguments[0], false)) {//标准浏览器
            let attr = arguments[1];
            return getComputedStyle(arguments[0], false)[attr];
        } else {//IE8-
            let attr = arguments[1];
            return arguments[0].currentStyle[attr];
        }
    }
    if (arguments.length == 3) {
        let attr = arguments[1];
        arguments[0].style[attr] = arguments[2];
    }
}

/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */
function startMove(obj, json, fnend) {

    clearInterval(obj.timer); //防止定时器叠加
    obj.timer = setInterval(function () {

        var istrue = true;

        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) { //key:键名   json[key] :键值
            //			console.log(key); //width heigth opacity
            var cur = 0; //存初始值

            if (key == 'opacity') { //初始值
                cur = css(obj, key) * 100; //透明度
            } else {
                cur = parseInt(css(obj, key)); // 300px  300  width heigth borderwidth px为单位的

            }

            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            //距离越大，速度越大,下面的公式具备方向
            var speed = (json[key] - cur) / 6; //出现小数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

            //保证上一个属性全部都达到目标值了
            if (cur != json[key]) { //width 200 heigth 400
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //true true
            }

            //3、运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100; //0-1
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //0-100
            } else {
                obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
            }

        }

        //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if (istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) { //可选参数的由来
                fnend();
            }
        }

    }, 30); //obj.timer 每个对象都有自己定时器

}


//正则验证
//方法一
// let s = regular({
//     type: 'email',
//     str: str,
// })
function regular(obj) {
    /*
		验证账号
			* 不能为空，
			* 不能使用特殊字符（数字、字母、下划线、横杠）开头，
			* 必须以字母开头，
			* 长度6-20
		*/
    if (obj.type == 'account') {
        let Reg = /^[a-z][\w\-]{5,19}$/;
        return Reg.test(obj.str);
    }
    //昵称只能输入中文  
    if (obj.type == 'nickname') {
        let Reg = /^[\u2E80-\u9FFF]+$/;
        return Reg.test(obj.str);
    }
    /*
			电子邮件
				jinrong.xie@qq.com
				123@qq.com
				x_x@163.com
				x-x@a-r.com.cn
				x.x@laoxie.com
				邮箱用户名必须3-30个字符
		 */
    if (obj.type == 'email') {
        let Reg = /^[a-z0-9][\w\-\.]{2,29}@[a-z0-9\-]{2,67}(\.[a-z\u2E80-\u9FFF]{2,6})+$/;
        return Reg.test(obj.str);
    }
    /*
        身份证
            18/15
            445655 19900707 2165
            445655 19900707 211x
     */
    if (obj.type == 'id') {
        let Reg = /^(\d{17}|\d{14})[\dx]$/;
        return Reg.test(obj.str);
    }
    /*
			手机号码
				11位
				158 8888 8888
				1 [34578]
		 */
    if (obj.type == 'phone') {
        let Reg = /^1[3-9]\d{9}$/;
        return Reg.test(obj.str);
    }
    /*
			生日 
				1999/05/08
				1999-5-8
				19990508
				1999-05/08	不合法
				199905

				引用分组
					* 正则内：\n
					* 正则外:$n
                分组顺序：以左括号出现的顺序为分组顺序
                这个\1  \2......  都要和正则表达式集合()一起使用
                    简单的说就是
                    \1表示重复正则第一个圆括号内匹配到的内容
                    \2表示重复正则第二个圆括号内匹配到的内容
		 */
    if (obj.type == 'birthday') {
        let Reg = /^\d{4}([\/\-]?)\d{1,2}\1\d{1,2}$/;
        return Reg.test(obj.str);
    }
    /*
			密码  
				长度6-20 
				不能包含空格
		 */
    if (obj.type == 'password') {
        let Reg = /^\S{6,20}$/;
        return Reg.test(obj.str);
    }
    //日期
    if (obj.type == 'day') {
        let Reg = /^\d{4}([\/\-]?)\d{1,2}\1\d{1,2}$/;
        return Reg.test(obj.str);
    }
    if (pbj.type == 'url') {
        let Reg = /^http(s)?:\/\/([w]{3}\.)?[a-zA-Z0-9]+\.[a-zA-Z]{3}$/;
        return Reg.test(obj.str);
    }
}


// 方法二
// let s=reg.email(str);
let reg = {
    /*
		验证账号
			* 不能为空，
			* 不能使用特殊字符（数字、字母、下划线、横杠）开头，
			* 必须以字母开头，
			* 长度6-20
		*/
    account: function (str) {
        let Reg = /^[a-z][\w\-]{5,19}$/;
        return Reg.test(str);
    },
    /*
        电子邮件
            jinrong.xie@qq.com
            123@qq.com
            x_x@163.com
            x-x@a-r.com.cn
            x.x@laoxie.com
            邮箱用户名必须3-30个字符
     */
    email: function (str) {
        let Reg = /^[a-z0-9][\w\-\.]{2,29}@[a-z0-9\-]{2,67}(\.[a-z\u2E80-\u9FFF]{2,6})+$/;
        return Reg.test(str);
    },
    //昵称只能输入中文
    nickname: function (str) {
        let Reg = /^[\u2E80-\u9FFF]+$/;
        return Reg.test(str);
    },
    //身份证
    //18/15
    //         445655 19900707 2165
    //         445655 19900707 211x
    id: function (str) {
        let Reg = /^(\d{17}|\d{14})[\dx]$/;
        return Reg.test(str);
    },
    /*
        手机号码
                11位
                158 8888 8888
                1 [34578]
     */
    phone: function (str) {
        let Reg = /^1[3-9]\d{9}$/;
        return Reg.test(str);
    },
    /*
        生日 
            1999/05/08
            1999-5-8
            19990508
            1999-05/08	不合法
            199905
            引用分组
                 * 正则内：\n
                 * 正则外:$n
             分组顺序：以左括号出现的顺序为分组顺序
             这个\1  \2......  都要和正则表达式集合()一起使用
                 简单的说就是
                 \1表示重复正则第一个圆括号内匹配到的内容
                 \2表示重复正则第二个圆括号内匹配到的内容
    */
    birthday: function (str) {
        let Reg = /^\d{4}([\/\-]?)\d{1,2}\1\d{1,2}$/;
        return Reg.test(str);
    },
    /*
         密码  
             长度6-20 
             不能包含空格
      */
    password: function (str) {
        let Reg = /^\S{6,20}$/;
        return Reg.test(str);
    },
    // url 
    //https://www.baidu.com
    url: function (str) {
        let Reg = /^http(s)?:\/\/([w]{3}\.)?[a-zA-Z0-9]+\.[a-zA-Z]{3}$/;
        return Reg.test(str);
    }
}

//拼接对象用于传参 函数
function href(json) {
    let str = '';
    for (let key in json) {
        str += key + '=' + json[key] + '&';
    }
    let str1 = str.slice(0, -1);
    return str1;
}

//用于时间补0 函数 demo
function totime(a) {//补0
    if (a < 10) {
        a = '0' + a;
        return a;
    } else {
        return a + '';
    }
}
// username.onblur = () => {
//     ajax({
//         type: 'get',
//         url: '../api/check_name.php',
//         data: {
//             name: username.value.trim(),
//         },//可选
//         async: true,//可选
//         succeed: function (suc) {
//             console.log(suc);
//             if (suc == 'yes') {
//                 yn.innerHTML = '验证成功';
//                 yn.style.color = 'green';
//             } else {
//                 yn.innerHTML = '用户名已存在';
//                 yn.style.color = 'red';
//             }
//         },
//         destatus: function (status) {//可选
//             console.log(status);
//         }
//     })
// }


//type必填写方法、data选填写需要传给后端的数据、async选填写异步或者同步
//succeed必填写成功回调函数、destatus选填纠错可用


function ajax({
    type, url, data = '', async = true, succeed = null, destatus = null
}) {
    var xhr = new XMLHttpRequest();
    if (type == 'get') {//get方法
        if (data) {//是否需要传参
            url = url + '?' + href(data);//拼接传参
        }
        xhr.open('get', url, async);//告诉ajax需要什么
        xhr.send(null);//请求
        xhr.onreadystatechange = () => {//处理服务器返回数据
            if (xhr.readyState == 4) {//响应内容的解析状态
                if (xhr.status == 200) {//响应http的状态
                    succeed(xhr.responseText);////成功调用回调函数在外处理
                } else {
                    destatus(xhr.status);//失败打印出http的状态用于找错
                }
            }
        }
    } else {//post方法
        xhr.open('post', url, async);//告诉ajax需要什么
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');//请求头
        let str = href(data);//把需要传的参数转成str
        xhr.send(str);//请求并传参
        xhr.onreadystatechange = () => {//处理服务器返回数据
            if (xhr.readyState == 4) {//响应内容的解析状态
                if (xhr.status == 200) {//响应http的状态
                    succeed(xhr.responseText);//成功调用回调函数在外处理
                } else {
                    destatus(xhr.status);//失败打印出http的状态用于找错
                }
            }
        }
    }
}

//获取cookie
function getcookie(key) {
    let str = document.cookie;//username=admin; age=18
    let arr = str.split('; ');
    for (let item of arr) {
        let arr2 = item.split('=');
        if (key == arr2[0]) {
            return arr2[1];
        }
    }
}

//设置cookie
function setcookie(key, val, iday) {
    let now = new Date();
    now.setDate(now.getDate() + iday);
    document.cookie = key + '=' + val + ';expires=' + now + ';path=/';
}

//删除
function removecookie(key) {
    setcookie(key, '', -1);
}
