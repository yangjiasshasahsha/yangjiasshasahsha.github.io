function shoppingCar({ ele }) {
    //动态创建节点
    var head = document.createElement('div');//动态生成头部
    ele.appendChild(head);
    head.className = 'gwc_hed';
    head.innerHTML = `<input type="checkbox" class="checkall">
                        <span>全选</span>
                        <span>商品</span>
                        <span>单价(元)</span>
                        <span>数量</span>
                        <span>小计(元)</span>
                        <span>操作</span>`;
    var dianpu = document.createElement('div');
    ele.appendChild(dianpu);
    dianpu.className = 'gwc_dianpu';
    dianpu.innerHTML = `<span>店铺:</span>
                        <span>百洋健康跨境自营店</span>
                        <div>
                        <span>免运费</span>
                        <span>满59免运费</span>
                        </div>`;
    var list = document.createElement('ul');//添加商品列表节点
    ele.appendChild(list);
    list.className = 'goodslist';
    var allmey = document.createElement('div');
    ele.appendChild(allmey);
    allmey.className = 'gwc_allmey';
    allmey.innerHTML = `<span class="allmey">0.00</span><span>商品总价:</span> `;
    var foot = document.createElement('div');//动态生成底部
    ele.appendChild(foot);
    foot.className = 'gwc_footer';
    foot.innerHTML = `<span class="delall">全删</span>
                            <span class="sure">确认结算</span>
                            <span>元</span>
                            <span class="allmoney">0.00</span>
                            <span>商品总价（不含运费、税费）</span>`;
    let cookie = getcookie('username');
    creatcar();
    function creatcar() {//渲染商品以及结构
        ajax({
            type: 'get',
            url: '../api/shoppingcar/car.php',
            data: {
                cookie,
            },
            succeed: str => {
                creat(str);
            }
        })
        function creat(str) {
            let arr = JSON.parse(str);
            console.log(arr);
            let html = arr.obj.map((item) => {
                return `<li data-id="${item.id}">
                <input type="checkbox" class="check">
                <img src="${item.img}" alt="" class="gwc_imgs">
                <span class="text">
                <span> <span>海外购</span> ${item.name}</span>
               </br>
                <span>
                <img src="https://b2cstatic.baiyangwang.com/shop/contracticon/05890672784766467_60.gif" alt="">
                <img src="https://b2cstatic.baiyangwang.com/shop/contracticon/05890672577896183_60.gif" alt="">
                <img src="https://b2cstatic.baiyangwang.com/shop/contracticon/jswl_60.gif" alt="">
                </span>
                </span>
                <span class="money">￥${item.price}</span>
                <div class="gwcnum" data-kucun="${item.sum}">
                    <span class="btnjian">-</span>
                    <input type="text" class="num" value="${item.num}">
                    <span class="btnjia">+</span>
                </div>
                <span class="moneyall">${(item.price * item.num).toFixed(2)}</span>
                <span class="scj">移入收藏夹</span>
                <span class="del">删除</span>
        </li>`
            }).join('');
            list.innerHTML = html;
            //加减
            var g_num = ele.getElementsByClassName('num');//商品数量
            var g_btnjia = ele.getElementsByClassName('btnjia');//加减按钮
            var g_btnjian = ele.getElementsByClassName('btnjian');
            var danjia = ele.getElementsByClassName('money');//单价
            var money = ele.getElementsByClassName('moneyall');//单个商品总价
            for (let i = 0; i < g_btnjia.length; i++) {
                g_btnjia[i].onclick = () => {
                    let sum = g_btnjia[i].parentNode.dataset.kucun * 1;
                    console.log(g_num[i].value, sum)
                    if (g_num[i].value < sum) {
                        g_num[i].value++;
                        console.log(1);
                    }
                    let dj = danjia[i].innerHTML.slice(1);//取出单价
                    money[i].innerHTML = (dj * g_num[i].value).toFixed(2);//单个商品总价
                    let id = g_btnjia[i].parentNode.parentNode.dataset.id;
                    ajax({
                        type: 'get',
                        url: '../api/shoppingcar/jiajian.php',
                        data: {
                            id,
                            num: g_num[i].value
                        },
                        succeed: () => {
                            sumall();//勾选的总数量和总价格
                        }
                    });
                }
                g_btnjian[i].onclick = () => {
                    if (g_num[i].value > 1) {
                        g_num[i].value--;
                    }
                    let dj = danjia[i].innerHTML.slice(1);//取出单价
                    money[i].innerHTML = (dj * g_num[i].value).toFixed(2);//单个商品总价
                    let id = g_btnjian[i].parentNode.parentNode.dataset.id;
                    ajax({
                        type: 'get',
                        url: '../api/shoppingcar/jiajian.php',
                        data: {
                            id,
                            num: g_num[i].value
                        },
                        succeed: () => {
                            sumall();//勾选的总数量和总价格
                        }
                    });
                }
            }
            //多选
            var check = ele.getElementsByClassName('check');//获取所有复选框
            var checkall = ele.getElementsByClassName('checkall')[0];
            let checkarr = [];//用来装勾选的商品id
            for (let i = 0; i < check.length; i++) {
                check[i].onclick = () => {
                    let checknum = 0;//用来计数勾选的个数
                    for (let j = 0; j < check.length; j++) {//每次点击遍历勾选个数
                        if (check[j].checked) {
                            checknum++;
                        }
                        if (checknum == check.length && checknum != 0) {//当个数等于总个数勾选全选
                            checkall.checked = true;
                        } else {
                            checkall.checked = false;
                        }
                    }
                    let id = check[i].parentNode.dataset.id;//勾选存入id
                    if (check[i].checked) {//勾选状态
                        if (checkarr.indexOf(id) == -1) {//如果存在不重复存id
                            checkarr.push(id);
                        }
                    } else {
                        let index = checkarr.indexOf(id);//取消勾选
                        checkarr.splice(index, 1);//删除数组中的id
                    }
                    sumall();//勾选的总数量和总价格
                    sureok();
                }
            }
            //全选
            allcek();
            function allcek() {
                checkall.checked = true;
                if (checkall.checked) {//判断是否全选
                    for (let i = 0; i < check.length; i++) {
                        check[i].checked = true;
                        let id = check[i].parentNode.dataset.id;
                        if (check[i].checked) {//勾选状态
                            if (checkarr.indexOf(id) == -1) {//如果存在不重复存id
                                checkarr.push(id);
                            }
                        }
                    }
                } else {
                    for (let i = 0; i < check.length; i++) {
                        check[i].checked = false;
                        checkarr = [];//取消全选清空id数组
                    }
                }
                sumall();//勾选的总数量和总价格
            }
            checkall.onclick = () => {
                if (checkall.checked) {//判断是否全选
                    for (let i = 0; i < check.length; i++) {
                        check[i].checked = true;
                        let id = check[i].parentNode.dataset.id;
                        if (check[i].checked) {//勾选状态
                            if (checkarr.indexOf(id) == -1) {//如果存在不重复存id
                                checkarr.push(id);
                            }
                        }
                    }
                } else {
                    for (let i = 0; i < check.length; i++) {
                        check[i].checked = false;
                        checkarr = [];//取消全选清空id数组
                    }
                }
                sumall();//勾选的总数量和总价格
                sureok();
            }
            //结算
            sureok();
            function sureok() {
                let checknum = 0;//用来计数勾选的个数
                for (let j = 0; j < check.length; j++) {//每次点击遍历勾选个数
                    if (check[j].checked) {
                        checknum++;
                    }
                }
                if (checknum > 0) {
                    $('.sure').css('background', '#EF3C79');
                } else {
                    $('.sure').css('background', '#aaa');
                }
            }
            //删除当行
            list.onclick = ev => {
                if (ev.target.className == 'del') {
                    let id = ev.target.parentNode.dataset.id;
                    ajax({
                        type: 'get',
                        url: '../api/shoppingcar/del.php',
                        data: {
                            id,
                        },
                        succeed: () => {
                            creatcar();//重新渲染购物车
                            checkall.checked = false;//清空全选框
                        }
                    })
                    let index = checkarr.indexOf(ev.target.parentNode.dataset.id);//删除数组id中的该商品id
                    checkarr.splice(index, 1);
                    sumall();//勾选的总数量和总价格
                }
            }
            //删除多行
            var delall = foot.getElementsByClassName('delall')[0];
            delall.onclick = () => {

                let idarr = JSON.stringify(checkarr);//必须以字符串传给后端不然无法处理
                ajax({
                    type: 'get',
                    url: '../api/shoppingcar/delall.php',
                    data: {
                        idarr,
                    },
                    succeed: () => {
                        checkarr = [];//删除选中的商品后清空数组
                        checkall.checked = false;//清空全选框
                        creatcar();//重新渲染购物车
                        // sumall();//勾选的总数量和总价格
                    }
                })
            }
            function sumall() {//勾选商品总个数  每个功能都要调用
                var allnum = foot.getElementsByClassName('allnum')[0];
                var allmoney = foot.getElementsByClassName('allmoney')[0];
                var allmey1 = allmey.getElementsByClassName('allmey')[0];
                let numall = 0;//选中商品总数量
                let nummoney = 0;
                // for (let i = 0; i < checkarr.length; i++) {//勾选商品总数量
                //     if (check[i].checked) {//如果勾选把数量进行累加
                //         numall += check[i].parentNode.children[4].children[1].value * 1;
                //     }
                // }
                // allnum.innerHTML = numall;//渲染总数量
                for (let i = 0; i < check.length; i++) {
                    if (check[i].checked) {//如果勾选把总价进行累加
                        nummoney += check[i].parentNode.children[5].innerHTML * 1;
                    }
                }
                allmoney.innerHTML = (nummoney).toFixed(2);//渲染总价格并保留两位小数
                allmey1.innerHTML = (nummoney).toFixed(2);//渲染总价格并保留两位小数
            }
        }//
    }

}