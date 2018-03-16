/**
 * Created by Administrator on 2018/3/15.
 */
window.onload=function(){
    //阻止touchmove的默认事件
    document.body.addEventListener('touchmove', function(event) {
        event = event ? event : window.event;
        if(event.preventDefault) {
            event.preventDefault()
        } else {
            event.returnValue = false
        }
    }, false);
    var mypages = function(obj) {
        var box = document.getElementById(obj.wrapper);
        var box2 = document.getElementById(obj.pages);
        var len = obj.len;
        var n = obj.n;
        var startY, moveY, cliH;
        var cliW;//ceshi
        var fontSize;

        //获取屏幕高度
        var getH = function() {
            //ceshi
            cliW=document.body.clientWidth;
            cliH = document.body.clientHeight;
            fontSize=document.body.style.fontSize=cliW/10+"px";
            console.log(fontSize);
            console.log(cliH+","+cliW);

        };
        getH();
        window.addEventListener('resize', getH, false);
        //touchStart
        var touchstart = function(event) {
            if(!event.touches.length) {
                return;
            }
            startY = event.touches[0].pageY;
            moveY = 0;
        };
        //touchMove
        var touchmove = function(event) {
            if(!event.touches.length) {
                return;
            }
            moveY = event.touches[0].pageY - startY;
            box2.style.transform = 'translateY(' + (-n * cliH + moveY) + 'px)'; //根据手指的位置移动页面
        };
        //touchEnd
        var touchend = function(event) {
            //位移小于正负50则不翻页
            if(moveY < -50) n++;
            if(moveY > 50) n--;
            //最后和最前页控制
            if(n < 0) n = 0;
            if(n > len - 1) n = len - 1;
            //重定位
            box2.style.transform = 'translateY(' + (-n * 10) + '%)'; //根据百分比位置移动页面
        };
        //touch事件绑定
        box.addEventListener("touchstart", function(event) {
            touchstart(event)
        }, false);
        box.addEventListener("touchmove", function(event) {
            touchmove(event)
        }, false);
        box.addEventListener("touchend", function(event) {
            touchend(event)
        }, false);
    };
    mypages({
        wrapper: 'wrapper',
        pages: 'pages',
        len:34, //页数
        n: 0 //页面打开开始的页数
    });
}