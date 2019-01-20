"ui";
ui.layout(
   <vertical> 
   <canvas id="canvas"w="*"h="*"/>
   </vertical> 
);


var mIdIvShow=ui.canvas;

var mPaint=new Paint();

var movingX = 0;
var movingY = 0;
var lastTimestamp = 0;//最后一次的时间戳
mIdIvShow.setOnTouchListener(function(view, event){
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            lastTimestamp = new Date().getTime();
            downX = event.getX();
            downY = event.getY();
            break;
        case event.ACTION_CANCEL:
            break;
        case event.ACTION_MOVE:
            movingX = event.getX();
            movingY = event.getY();
            var curTimestamp = new Date().getTime();
            //计算时间差
            var detaT = curTimestamp - lastTimestamp;
            //计算距离差
            var detaS =weiyi([movingX-downX,movingY- downY]);
            //由于速度是 px/ms
            var v = detaS / detaT;
            //速度转化为画笔宽度的等式
            var width = 14/v;
            //L.d(width + L.l());
            //限制极值情况
            if ((width > 0) && width < 30) {
                mPaint.setStrokeWidth(width);
            }
            mCanvas.drawLine(downX, downY, movingX, movingY, mPaint);
            mIdIvShow.invalidate();
            downX = movingX;
            downY = movingY;
            lastTimestamp = curTimestamp;//更新时间
            //movePos.add(new PointF(event.getX(), event.getY()));
            break;
    }
    return true;
});


    function weiyi(ary) {
        var sum = 0;
        for (var i = 0; i < ary.length; i++) {
            sum += Math.pow(ary[i], 2);
        };
        return Math.sqrt(sum);
    };
