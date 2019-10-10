function bigglass({ big, ele, imglist }) {
    //动态创建节点
    var smallbox = document.createElement('div');//创建小图盒子节点
    ele.appendChild(smallbox);
    smallbox.className = 'smallbox';
    var smallbox = ele.getElementsByClassName('smallbox')[0];
    smallbox.innerHTML = `<img src="" alt="">
                        <div class="fdj_mark"></div>`;
    smallbox.children[0].src = imglist[0];//添加小盒子第一张图
    var mark = ele.getElementsByClassName('fdj_mark')[0];

    var bigbox = document.createElement('div');//创建大图盒子节点
    ele.appendChild(bigbox);
    bigbox.className = 'bigbox';
    bigbox.innerHTML = ` <img src="" alt="" class="bigimg">`;
    bigbox.children[0].src = imglist[0];//添加大盒子第一张图
    var bigbox = ele.getElementsByClassName('bigbox')[0];
    var bigimg = ele.getElementsByClassName('bigimg')[0];

    var smallimg = document.createElement('ul');//创建小小图盒子节点
    ele.appendChild(smallimg);
    smallimg.className = 'smallimg';
    var smallimg = ele.getElementsByClassName('smallimg')[0];

    // var nextimg = document.createElement('span');//创建左右按钮节点
    // ele.appendChild(nextimg);
    // nextimg.className = 'nextimg iconfont iconarrow-right';
    // var prveimg = document.createElement('span');//创建左右按钮节点
    // ele.appendChild(prveimg);
    // prveimg.className = 'prveimg iconfont iconarrow-left';
    //渲染小图
    let html = imglist.map(item => {
        return `<li><img src="${item}" alt=""></li>`;
    }).join('');
    smallimg.innerHTML = html;
    //小图切换大图
    var aimg = smallimg.getElementsByTagName('li');
    for (let i = 0; i < aimg.length; i++) {
        aimg[i].onmouseover = function () {
            for (let j = 0; j < aimg.length; j++) {
                aimg[j].style.border = '1px solid #fff';
            }
            aimg[i].style.border = '1px solid #EF3C79';
            smallbox.children[0].src = this.children[0].src;
            bigbox.children[0].src = this.children[0].src;
        }
    }
    //下一张图片
    // var nextimg = ele.getElementsByClassName('nextimg')[0];
    // var prveimg = ele.getElementsByClassName('prveimg')[0];
    // let ileft = 0;
    // nextimg.onclick = () => {
    //     ileft += 50;
    //     console.log(smallimg.scrollLeft)
    //     smallimg.scrollTo(ileft, 0);
    // }
    // prveimg.onclick = () => {
    //     ileft -= 50;
    //     smallimg.scrollTo(ileft, 0);
    // }
    smallbox.onmousemove = function (ev) {
        let x = ev.pageX;
        let y = ev.pageY;
        let left = x - big.offsetLeft - mark.offsetWidth / 2;
        let top = y - big.offsetTop - mark.offsetHeight / 2;
        if (left <= 0) {
            left = 0;
        }
        if (left >= ele.offsetWidth - mark.offsetWidth) {
            left = ele.offsetWidth - mark.offsetWidth;
        }
        if (top >= ele.offsetHeight - mark.offsetHeight) {
            top = ele.offsetHeight - mark.offsetHeight;
        }
        if (top <= 0) {
            top = 0;
        }
        mark.style.left = left + 'px';
        mark.style.top = top + 'px';
        bigbox.style.display = 'block';
        let scalex = left / (ele.offsetWidth - mark.offsetWidth);
        let scaley = top / (ele.offsetHeight - mark.offsetHeight);
        bigimg.style.left = -(bigimg.offsetWidth - bigbox.offsetWidth) * scalex + 'px';
        bigimg.style.top = -(bigimg.offsetHeight - bigbox.offsetHeight) * scaley + 'px';
    }
    smallbox.onmouseover = function () {
        bigbox.style.display = "block";
        mark.style.display = 'block';
    }
    smallbox.onmouseout = function () {
        bigbox.style.display = "none";
        mark.style.display = 'none';
    }
}