(() => {
    //跳跃登入注册页
    $('#login').click(() => {//登录 
        window.open('html/login.html');
        if (getcookie('url')) {
            removecookie('url');
            setcookie('url', window.location.href, 0);
        } else {
            setcookie('url', window.location.href, 0);
        }
    })

    $('#zhuce').click(() => {//注册
        window.open('html/zhuce.html');
    })
    //退出删除
    $('#tuichu').click(function () {
        removecookie('username');
        window.open('html/login.html');
    })
    //足迹
    let cookie = getcookie('username');
    $.ajax({
        type: 'get',
        url: 'api/footprint/foot.php',
        data: {
            cookie
        },
        dataType: 'json',
        success: str => {
            let html = str.map(item => {
                return `<div><img src="${item.img}" alt=""></div>`
            }).join('');
            $('.my-zuji-list').html(html);
        }
    })
    //小购物车
    creatcarr();
    function creatcarr() {
        $.ajax({
            type: 'get',
            url: 'api/shoppingcar/car.php',
            data: {
                cookie
            },
            dataType: 'json',
            success: str => {
                //购物车商品个数
                $('.numcar').html(str.obj.length);
                //小购物车
                let meyall = 0;
                let html = str.obj.map(item => {
                    meyall += item.num * item.price * 1;
                    return `<li data-id="${item.id}">
                 <div>
                     <img src="${item.img}" alt="">
                 </div>
                 <p>${item.name}</p>
                 <p><span>¥${item.price}</span>×<span>${item.num}</span></p>
                 <p class="headdel">删除</p>
             </li>`
                }).join('');
                //渲染总数量以及总价格 
                $('.car-list').html(html);
                $('.headnumall').html(str.obj.length);
                $('.headmeyall').html('￥' + meyall.toFixed(2));
                //跳转购物车
                $('.car-foot div').click(function () {
                    window.open('html/gwc.html');
                })
                //删除商品
                $('.headdel').click(function () {
                    let id = $(this.parentNode).attr('data-id');
                    console.log(id);
                    $.ajax({
                        type: 'get',
                        url: 'api/shoppingcar/del.php',
                        data: {
                            id,
                        },
                        success: str => {
                            creatcarr();
                        }
                    })
                })
            }

        })
    }
    //侧栏跳转购物车
    $('.side-car').click(function () {
        window.open('html/gwc.html');
    })
})();