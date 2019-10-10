(() => {
    //my-shoop的显示隐藏
    $('.header-div').mouseenter(function () {
        $('.header-left').css({
            'background': '#ffffff',
            'border-bottom': '1px solid #ffffff',
            'z-index': '100'
        });
        $('.my-shoop').show();
    });
    $('.header-div').mouseleave(function () {
        $('.header-left').css({
            'background': '#FAFAFA',
            'border': '1px solid #F0F0F0',
            'z-index': '0'
        });
        $('.my-shoop').hide();
    });
    //header-car-list的显示隐藏
    $('.header-car').mouseenter(function () {
        $('.header-right').css({
            'background': '#ffffff',
            'border-bottom': '1px solid #ffffff',
            'z-index': '100'
        });
        $('.header-car-list').show();
    });
    $('.header-car').mouseleave(function () {
        $('.header-right').css({
            'background': '#FAFAFA',
            'border': '1px solid #F0F0F0',
            'z-index': '0'
        });
        $('.header-car-list').hide();
    });
    //搜索历史隐藏显示
    $('.input-right').focus(function () {
        $('.header-chaxun').css('display', 'block');
    })
    $('#header-input').mouseleave(function () {
        $('.header-chaxun').css('display', 'none');
    })
    //三级菜单
    $('.nav-left').mouseenter(() => {
        $('.nav-title').css('display', 'block');
    })
    $('.nav-left').mouseleave(() => {
        $('.nav-title').css('display', 'none');
    })
    $('.nav-title').on('mouseenter', 'li', function () {
        $(this.children[0]).css('display', 'block');
    })
    $('.nav-title').on('mouseleave', 'li', function () {
        $(this.children[0]).css('display', 'none');
    })
    //登入账号显示
    if (getcookie('username')) {
        $('.username').html('您好 ' + getcookie('username') + ',' + '欢迎来到');
        $('#login').css('display', 'none');
        $('#zhuce').css('display', 'none');
        $('#tuichu').css('display', 'inline-block');
    }

})();