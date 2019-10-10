// var box = document.getElementById('box');
// yzm({
//     ele:box
// })


function yzm({ ele }) {
    let html = 'qwertyuiopasdfghjklzxcvbnm0123456789QWERTYUIOPASDFGHJKLZXCVBNM0123456789';
    let code = '';
    for (var i = 0; i < 4; i++) {
        let dom = parseInt(Math.random() * html.length);
        code += '<span class="span">' + html[dom] + '</span>';
    }
    ele.innerHTML = code;
    var span = ele.getElementsByClassName('span');
    var suiji = 'abcdef0123456789';
    for (var j = 0; j < 4; j++) {
        var yanse = '';
        for (var i = 0; i < 6; i++) {
            var cor = parseInt(Math.random() * suiji.length);
            yanse += suiji[cor];
        }
        span[j].style.color = "#" + yanse;
    }
}