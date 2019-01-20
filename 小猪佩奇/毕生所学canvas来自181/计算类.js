    this.matrixPoints = function(imgMatrix, ary) {
        var ary = this.toJavaArray("float", ary);
        imgMatrix.mapPoints(ary);
        return this.toJsArray(ary);
    };
    this.toJavaArray = function(type, ary) {
        //var Ary = java.lang.reflect.Array.newInstance(		java.lang.Float.TYPE, 4);
        var Ary = util.java.array(type, ary.length);
        for (let i in ary) {
            Ary[i] = ary[i];
        };
        return Ary;
    };
    this.toJsArray = function(ary) {
        var Ary = new Array(ary.length);
        for (let i in ary) {
            Ary[i] = ary[i];
        };
        return Ary;
    };
    this.getsd = (s, ary) => {
        var sum = this.weiyi(ary);
        var S = (s / sum) || 0;
        for (var i = 0; i < ary.length; i++) {
            ary[i] = ary[i] * S;
        };
        return ary;
    };
    this.weiyi = function(ary) {
        var sum = 0;
        for (var i = 0; i < ary.length; i++) {
            sum += Math.pow(ary[i], 2);
        };
        return Math.sqrt(sum);
    };
    this.kdfx = function(Y) {
        var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
        var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
        return [x, y];
    };
    this.ydfx = (ary) => {
        var ary = this.getsd(1, ary);
        var x = ary[0],
            y = ary[1];
        var Y = Math.asin(y) / (2 * Math.PI) * 360;
        if (x < 0) {
            Y = 180 - Y;
        };
        return Y;
    };

    this.rectPoints = function(w, h, s, g) {
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

    this.circlePoints = function(r, s, g) {
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
