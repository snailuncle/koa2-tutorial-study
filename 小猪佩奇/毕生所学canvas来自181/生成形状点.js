"ui";
//ui布局为一块画布
ui.layout(
    <frame>
        <canvas id="board" w="*" h="*"/>
    </frame>
);


var paint = new Paint;
paint.setTextAlign(Paint.Align.CENTER);
paint.setStrokeWidth(5);
paint.setStyle(Paint.Style.STROKE);

var points = rectPoints(400, 200, 20);
ui.board.on("draw", function(canvas) {
    canvas.drawARGB(255, 127, 127, 127);
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    canvas.translate(w / 2, h / 2);
    paint.setARGB(255, 0, 0, 255);
    canvas.drawLine(0, 0, 0, h, paint);
    paint.setARGB(255, 255, 0, 0);
    canvas.drawLine(0, 0, w, 0, paint);
    paint.setARGB(255, 0, 255, 0);

    canvas.drawPoints(points, paint);
});





function rectPoints(w, h, s, g) {
    //宽,高,点距,是否边框
    let sx = Math.floor(w / s / 2) + 1,
        sy = Math.floor(h / s / 2) + 1;
    //以中心基本点正负循环总量    
    let cw = w / 2,
        ch = h / 2;
    let Ary = new Array;
    if (g) {
        //横向
        for (let ix = 0; ix < sx; ix++) {
            if (ix == 0) {
                Ary.push(0, -ch, 0, ch);
            } else {
                Ary.push(-ix * s, -ch, ix * s, -ch, -ix * s, ch, ix * s, ch);
            };
        };
        //横向边框线
        for (let iy = 0; iy < sy; iy++) {
            if (iy == 0) {
                Ary.push(-cw, 0, cw, 0);
            } else {
                Ary.push(-cw, -iy * s, -cw, iy * s, cw, -iy * s, cw, iy * s);
            };
        };
        //纵向边框线
    } else {
        //内部所有点

        for (let iy = 0; iy < sy; iy++) {
            for (let ix = 0; ix < sx; ix++) {
                if (iy == 0 && ix == 0) {
                    Ary.push(0, 0);
                } else {
                    let AX = -ix * s;
                    let AY = -iy * s;
                    let BX = ix * s;
                    let BY = iy * s;
                    if ((iy == 0 && ix != 0) || (iy != 0 && ix == 0)) {
                        Ary.push(AX, AY, BX, BY);
                    } else {
                        Ary.push(AX, AY, BX, BY, AX, BY, BX, AY);
                    };
                };
            };
        };
    };
    return Ary;
};

function circlePoints(r, s, g) {
    //半径,点距,是否边框
    let S = Math.floor(r / s) + 1;
    //以中心基本点正负循环总量    
    let Ary = new Array;
    if (g) {
        let c = Math.floor(Math.PI * r / 2 / s / 2) + 1;
        //循环量。
        let cR = s / r;
        //差值弧度。
        let AR = Math.PI / 2;
        //90度弧度。
        for (let i = 0; i < c; i++) {
            if (i == 0) {
                let xy = getsd(r, RToxy(0));
                let xy1 = getsd(r, RToxy(AR));
                let xy2 = getsd(r, RToxy(-AR));
                let xy3 = getsd(r, RToxy(AR * 2));
                Ary = Ary.concat(xy, xy1, xy2, xy3);
            } else {
                let xy = getsd(r, RToxy(cR * i));
                let xy1 = getsd(r, RToxy(cR * i + AR));
                let xy2 = getsd(r, RToxy(cR * i - AR));
                let xy3 = getsd(r, RToxy(cR * i + AR * 2));
                Ary = Ary.concat(xy, xy1, xy2, xy3);
                xy = getsd(r, RToxy(-cR * i));
                xy1 = getsd(r, RToxy(-cR * i + AR));
                xy2 = getsd(r, RToxy(-cR * i - AR));
                xy3 = getsd(r, RToxy(-cR * i + AR * 2));
                Ary = Ary.concat(xy, xy1, xy2, xy3);
            };
        };
    } else {
        for (let iy = 0; iy < S; iy++) {
            for (let ix = 0; ix < S; ix++) {
                if (iy == 0 && ix == 0) {
                    Ary.push(0, 0);
                } else if ((iy == 0 && ix != 0) || (iy != 0 && ix == 0)) {
                    Ary.push(-ix * s, -iy * s, ix * s, iy * s);
                } else {
                    let AX = -ix * s;
                    let AY = -iy * s;
                    let BX = ix * s;
                    let BY = iy * s;
                    if (weiyi([AX, AY]) <= r) {
                        Ary.push(AX, AY);
                    };
                    if (weiyi([BX, BY]) <= r) {
                        Ary.push(BX, BY);
                    };
                    if (weiyi([AX, BY]) <= r) {
                        Ary.push(AX, BY);
                    };
                    if (weiyi([BX, AY]) <= r) {
                        Ary.push(BX, AY);
                    };
                };
            };
        };
    };
    return Ary;

    function weiyi(ary) {
        var sum = 0;
        for (var i = 0; i < ary.length; i++) {
            sum += Math.pow(ary[i], 2);
        };
        return Math.sqrt(sum);
    };

    function RToxy(R) {
        var x = Math.cos(R);
        var y = Math.sin(R);
        return [x, y];
    };


    function getsd(s, ary) {
        var sum = weiyi(ary);
        var S = s / sum;
        for (var i = 0; i < ary.length; i++) {
            ary[i] = ary[i] * S;
        };
        return ary;
    };

};
