"ui";

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="色组生成器" h="40dp"/>
            </appbar>
            <canvas id="canvas" margin="5" layout_weight="1"/>
            <horizontal>
            <vertical w="*"h="100dp">
                <button id="to_" text="切换" w="*" layout_weight="1"/>
                <button id="toAry" text="保存数组" w="*" layout_weight="1"/>
            </vertical>
            </horizontal>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <text text="颜色匹配函数" textSize="25sp" margin="5" gravity="center"/>
            <input id="in_fun" w="*" h="*"  layout_weight="1" textSize="16sp" bg="#dddddd" margin="5"/>
            <button id="save_fun" text="保存函数" w="*"/>
            <button id="open_img" text="打开图片" w="*"/>
        </vertical>
    </drawer>
);


toastLog("注意侧拉菜单");
//var img = images.read("/storage/emulated/0/建记/图片/img04.jpg");
var canvasAD = new 图片查看(ui.canvas);


//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.in_fun.setText(canvasAD.isColor.toString());

ui.save_fun.click(function() {
    var txt = ui.in_fun.getText();
    if (txt) {
        try {
            var fun = eval("(" + txt + ")");

        } catch (e) {
            toastLog(e);
        };
        if (typeof fun == "function") {
            canvasAD.isColor = fun;
            toast("OK");
        } else {
            toastLog("不是一个函数");
        };
    };
});

ui.open_img.click(function() {

    选择图片(function(path) {
        var IMG = 加载图片(path);
        canvasAD.setImg(IMG);
        //IMG.recycle();
    });
});

ui.to_.click(function() {
    canvasAD.toMode();

});

ui.toAry.click(function() {
    setClip(JSON.stringify(canvasAD.colorsData));
    toast("已复制");

});

/*
thread = threads.start(function() {
    //toastLog("正在加载图片");
    sleep(1000);
    IMG = images.load('http://b-ssl.duitang.com/uploads/blog/201309/29/20130929153548_rECFe.jpeg');
    if (!IMG) {
        toastLog("网络连接异常");
        toastLog("或使用本地图片");
        //exit();
    };
    //toastLog("图片加载完成");
    canvasAD.setImg(IMG);
});
*/

var fileType = {
    文本: {
        img: "format_text.png",
        ends: ["js", "txt", "json"]
    },
    图片: {
        img: "format_picture.png",
        ends: ["png", "jpg"]
    },
    音乐: {
        img: "format_music.png",
        ends: ["mp3", "m4a"]
    },
    视频: {
        img: "format_media.png",
        ends: ["mp4"]
    },
    安装包: {
        img: "format_apk.png",
        ends: ["apk"]
    },
    压缩包: {
        img: "format_zip.png",
        ends: ["zip"]
    },
    数据: {
        img: "format_unkown.png",
        ends: ["abc"]
    }
};

function nameToType(name) {
    var Extension = name.split(".").pop();
    for (var i in fileType) {
        for (var a = 0; a < fileType[i].ends.length; a++) {
            if (Extension == fileType[i].ends[a]) {
                return i;
            };
        }
    };
    return "unkown";
};

function 加载图片(A) {
    if (files.isFile(A)) {
        imagePath = A;
        return images.read(A);
    };
};

function 选择图片(fun) {
    ui.run(() => {
        importPackage(org.autojs.autojs.ui.explorer);
        importPackage(org.autojs.autojs.model.explorer);
        var explorerView = new ExplorerView(new android.view.ContextThemeWrapper(context, org.autojs.autojs.R.style.AppTheme));
        explorerView.setExplorer(Explorers.workspace(), ExplorerDirPage.createRoot("/sdcard"));
        explorerView.setDirectorySpanSize(2);
        var dialog = new org.autojs.autojs.theme.dialog.ThemeColorMaterialDialogBuilder(context)
            .title("选择图片文件")
            .customView(explorerView, false)
            .positiveText("取消")
            .build();
        explorerView.setOnItemClickListener(function(view, item) {
            if (nameToType(String(item.toScriptFile())) == "图片") {
                fun(String(item.toScriptFile()));
                dialog.dismiss();
            } else {
                toastLog("不是图片");
            };
        });
        com.stardust.app.DialogUtils.showDialog(dialog);
    });
};


function 图片查看(canvasView, img) {
    this.mode = 0;
    this.toMode = function() {
        if (this.mode == 0) {
            this.mode = 1;
            canvasView.setOnTouchListener(new android.view.View.OnTouchListener(this.colorsTouch));
        } else {
            this.mode = 0;
            canvasView.setOnTouchListener(new android.view.View.OnTouchListener(this.imgTouch));
        };
    };

    this.isColor = function(color) {
        return colors.isSimilar(color, "#ff0000", 127);
    };

    this.view = {
        x: canvasView.getX(),
        y: canvasView.getY(),
        w: canvasView.getWidth(),
        h: canvasView.getHeight()
    };
    this.canvasRect = new android.graphics.RectF(0, 0, this.view.w || device.width, this.view.h || device.height);
    this.paint = new Paint;
    this.paint.setTextAlign(Paint.Align.CENTER);
    this.paint.setStrokeWidth(5);
    this.paint.setARGB(127, 0, 0, 0);
    //this.paint.setStyle(Paint.Style.STROKE);
    this.paint.setStyle(Paint.Style.FILL);
    this.textSize = 20;
    this.paint.setTextSize(this.textSize);
    this.matrix = new android.graphics.Matrix();
    this.imginvertMatrix = new android.graphics.Matrix();
    this.imgRect;
    this.colorsMatrix = new android.graphics.Matrix();
    this.colorsinvertMatrix = new android.graphics.Matrix();
    this.colorsRect;
    this.colorsData = {
        color: 0,
        ary: new Array
    };
    if (img) {
        this.imgRect = new android.graphics.RectF(0, 0, img.getWidth(), img.getHeight());
        this.colorsRect = new android.graphics.RectF(0, 0, img.getWidth(), img.getHeight());;
        this.matrix.setRectToRect(this.imgRect, this.canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
    };

    this.RY = {
        Y: 0
    };

    this.setImg = function(IMG) {
        var mg = img;
        img = IMG.clone();
        //mg.recycle();
        this.imgToCenter();
        this.colorsToCenter();
        this.textSize = 20;
        this.paint.setTextSize(this.textSize);
    };
    this.imgToCenter = function() {
        if (img) {
            this.imgRect = new android.graphics.RectF(0, 0, img.getWidth(), img.getHeight());
            this.view = {
                x: canvasView.getX(),
                y: canvasView.getY(),
                w: canvasView.getWidth(),
                h: canvasView.getHeight()
            };
            this.canvasRect = new android.graphics.RectF(0, 0, this.view.w, this.view.h);
            //this.matrix = new android.graphics.Matrix();
            this.matrix.setRectToRect(this.imgRect, this.canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
            this.matrix.invert(this.imginvertMatrix);
        };
    };
    this.colorsToCenter = function() {
        if (img) {
            this.imgRect = new android.graphics.RectF(0, 0, img.getWidth(), img.getHeight());
            this.view = {
                x: canvasView.getX(),
                y: canvasView.getY(),
                w: canvasView.getWidth(),
                h: canvasView.getHeight()
            };
            this.canvasRect = new android.graphics.RectF(0, 0, this.view.w, this.view.h);
            //this.matrix = new android.graphics.Matrix();
            this.colorsMatrix.setRectToRect(this.imgRect, this.canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
            this.colorsMatrix.invert(this.imginvertMatrix);
        };
    };

    this.maxPoints = 2;
    this.Touch = {
        PointStart: new Array,
        PointCurrent: new Array,
        Matrix: new android.graphics.Matrix()
    };

    canvasView.on("draw", (canvas) => {
        canvas.drawARGB(255, 127, 127, 127);
        var w = canvas.getWidth();
        var h = canvas.getHeight();
        if (img) {
            this.textSize = 20;
            this.paint.setTextSize(this.textSize);

            this.paint.setARGB(255, 128, 0, 0);
            canvas.drawImage(img, this.matrix, this.paint);
            this.drawRect(canvas, this.imgRect, this.paint, this.colorsMatrix);
            this.drawPoint(canvas, this.imgRect, this.paint, this.colorsMatrix);
            this.paint.setARGB(255, 0, 255, 0);
            this.paint.setStrokeWidth(5);

        } else {
            this.Loading(canvas, this.paint, this.RY);
        };
    });

    this.drawRect = function(canvas, rect, paint, matrix) {
        paint.setARGB(255, 0, 255, 0);
        paint.setStrokeWidth(5);
        let X = rect.left,
            Y = rect.top,
            x = rect.right,
            y = rect.bottom;
        let ary = this.matrixPoints(matrix, [X, Y, x, Y, X, Y, X, y, X, y, x, y, x, Y, x, y]);
        canvas.drawLines(ary, paint);
    };

    this.drawPoint = function(canvas, rect, paint, matrix, cx, cy) {
        cx = cx || 20;
        cy = cy || 20;
        paint.setARGB(255, 0, 0, 255);
        paint.setStrokeWidth(10);
        let X = rect.left,
            Y = rect.top,
            x = rect.right,
            y = rect.bottom;
        let sx = ((x - X) / cx) / 2,
            sy = ((y - Y) / cy) / 2;
        var Ary = new Array;
        for (var iy = 0; iy < cy; iy ++) {
            for (var ix = 0; ix < cx; ix ++) {
                Ary.push(sx + sx*2*ix, sy + sy*2*iy);
            };
        };
        let ary = this.matrixPoints(matrix, Ary);
        ary = this.toColorsAry(ary, this.imginvertMatrix, img, this.isColor);
        for (var i = 0; i < ary.length; i++) {
            paint.setColor(this.反色(ary[i].color));
            canvas.drawPoint(ary[i].x, ary[i].y, paint);
        };
        return ary;
    };

    this.toColorsAry = function(ary, matrix, img, fun) {
        let w = img.getWidth(),
            h = img.getHeight();
        let Ary = this.matrixPoints(matrix, ary);
        var Bry = new Array;
        let k;
        this.colorsData.ary = new Array;
        for (let i = 0; i < Ary.length; i += 2) {
            let x=Math.floor(Ary[i]),y=Math.floor(Ary[i+1]);
            if (!(0 <= x && x < w && 0 <= y && y < h)) {
                continue;
            };
            let color = img.pixel(x, y);
            if (fun(color)) {
                Bry.push({
                    x: ary[i],
                    y: ary[i + 1],
                    color: color
                });
                if (!k) {
                    k = [x, y];
                    this.colorsData.color = color;
                } else {
                    this.colorsData.ary.push([Math.floor(x - k[0]), Math.floor(y - k[1]), color]);
                };
            };
        };
        return Bry;

    };

    this.Loading = function(canvas, paint, RY) {
        var w = canvas.getWidth();
        var h = canvas.getHeight();
        RY.Y += 5;
        if (RY.Y >= 360) {
            RY.Y = 0;
        };
        canvas.rotate(RY.Y, w * 0.5, h * 0.52);
        paint.setStrokeWidth(5);
        paint.setStyle(Paint.Style.STROKE);
        canvas.drawCircle(w / 2, h * 0.48, w / 3, paint);
        canvas.setMatrix(new android.graphics.Matrix());
        canvas.rotate(-RY.Y, w * 0.5, h * 0.52);
        paint.setStyle(Paint.Style.FILL);
        paint.setStrokeWidth(1);
        var size = 100;
        paint.setTextSize(size);
        canvas.drawText("侧拉菜单中打开一个图片", w / 2, h * 0.48 + 0.365 * size, paint);
    };

    this.反色 = function(color) {
        return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
    };


    this.imgTouch = (view, event) => {
        try {
            var W = view.getWidth();
            var H = view.getHeight();
            var PC = event.getPointerCount();
            switch (event.getActionMasked()) {
                case event.ACTION_MOVE:
                    try {
                        for (let i = 0; i < PC; i++) {
                            let id = event.getPointerId(i);
                            let x = event.getX(i);
                            let y = event.getY(i);
                            this.Touch.PointCurrent[i * 2] = x;
                            this.Touch.PointCurrent[i * 2 + 1] = y;
                        };

                        //记录当前各手指坐标信息。
                        if (PC > this.maxPoints) { //手指数大于4个虽然记录坐标信息，但是不进行矩阵操作。
                            this.imgToCenter();
                            break;
                        };

                        var matrix = new android.graphics.Matrix();
                        matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                        this.matrix = new android.graphics.Matrix();
                        this.matrix.setConcat(matrix, this.Touch.Matrix);
                        //进行矩阵运算并刷新矩阵。
                        this.matrix.invert(this.imginvertMatrix);
                        //反矩阵
                    } catch (e) {
                        log("MOVE " + e);
                    };


                    break;
                case event.ACTION_CANCEL:
                    //log("CANCEL");
                    this.Touch.PointStart = new Array;
                    this.Touch.PointCurrent = new Array;

                    break;
                case event.ACTION_OUTSIDE:
                    //log("OUTSIDE");

                    break;
                default:
                    var I = Math.floor(event.getAction() / 256);
                    var ID = event.getPointerId(I);
                    var X = event.getX(I);
                    var Y = event.getY(I);
                    switch (event.getActionMasked()) {
                        case event.ACTION_DOWN:
                            try {
                                log("down");
                                //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                                this.Touch.PointStart.splice(I * 2, 0, X, Y);
                                this.Touch.PointCurrent.splice(I * 2, 0, X, Y);
                                this.Touch.Matrix = this.matrix;
                                //log(this.Touch.Matrix);
                            } catch (e) {
                                toastLog("DOWN " + e);
                            };
                            break;
                        case event.ACTION_UP:
                            //最后一个手指抬起。
                            log("up");
                            this.Touch.PointStart = new Array;
                            this.Touch.PointCurrent = new Array;

                            break;
                        case event.ACTION_POINTER_DOWN:
                            log("POINTER_DOWN");
                            try {
                                //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                                this.Touch.PointStart.splice(I * 2, 0, X, Y);
                                this.Touch.PointCurrent.splice(I * 2, 0, X, Y);
                                //获取点的总数量。
                                this.Touch.Matrix = this.matrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                //保存坐标的数组。

                                if (PC > this.maxPoints) { //手指数大于4个化为原始矩阵虽然记录坐标信息，但是不进行矩阵操作。
                                    this.imgToCenter();
                                    break;
                                };

                                var matrix = new android.graphics.Matrix();
                                matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                                this.matrix = new android.graphics.Matrix();
                                this.matrix.setConcat(matrix, this.Touch.Matrix);
                                //进行矩阵运算并刷新矩阵。
                                this.matrix.invert(this.imginvertMatrix);
                                //反矩阵
                            } catch (e) {
                                log("P_DOWN " + e);
                            };

                            break;
                        case event.ACTION_POINTER_UP:
                            log("POINTER_UP");
                            try {
                                this.Touch.Matrix = this.matrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                this.Touch.PointStart.splice(I * 2, 2);
                                this.Touch.PointCurrent.splice(I * 2, 2);

                            } catch (e) {
                                log("P_UP " + e);
                            };
                            break;
                    };
            };
        } catch (e) {
            log("0: " + e);
        };

        return true;

    };
    this.colorsTouch = (view, event) => {
        try {
            var W = view.getWidth();
            var H = view.getHeight();
            var PC = event.getPointerCount();
            switch (event.getActionMasked()) {
                case event.ACTION_MOVE:
                    try {
                        for (let i = 0; i < PC; i++) {
                            let id = event.getPointerId(i);
                            let x = event.getX(i);
                            let y = event.getY(i);
                            this.Touch.PointCurrent[i * 2] = x;
                            this.Touch.PointCurrent[i * 2 + 1] = y;
                        };

                        //记录当前各手指坐标信息。
                        if (PC > this.maxPoints) { //手指数大于4个虽然记录坐标信息，但是不进行矩阵操作。
                            this.colorsToCenter();
                            break;
                        };

                        var matrix = new android.graphics.Matrix();
                        matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                        this.colorsMatrix = new android.graphics.Matrix();
                        this.colorsMatrix.setConcat(matrix, this.Touch.Matrix);
                        //进行矩阵运算并刷新矩阵。
                        this.colorsMatrix.invert(this.colorsinvertMatrix);
                        //反矩阵
                    } catch (e) {
                        log("MOVE " + e);
                    };


                    break;
                case event.ACTION_CANCEL:
                    //log("CANCEL");
                    this.Touch.PointStart = new Array;
                    this.Touch.PointCurrent = new Array;

                    break;
                case event.ACTION_OUTSIDE:
                    //log("OUTSIDE");

                    break;
                default:
                    var I = Math.floor(event.getAction() / 256);
                    var ID = event.getPointerId(I);
                    var X = event.getX(I);
                    var Y = event.getY(I);
                    switch (event.getActionMasked()) {
                        case event.ACTION_DOWN:
                            try {
                                log("down");
                                //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                                this.Touch.PointStart.splice(I * 2, 0, X, Y);
                                this.Touch.PointCurrent.splice(I * 2, 0, X, Y);
                                this.Touch.Matrix = this.colorsMatrix;
                                //log(this.Touch.Matrix);
                            } catch (e) {
                                toastLog("DOWN " + e);
                            };
                            break;
                        case event.ACTION_UP:
                            //最后一个手指抬起。
                            log("up");
                            this.Touch.PointStart = new Array;
                            this.Touch.PointCurrent = new Array;

                            break;
                        case event.ACTION_POINTER_DOWN:
                            log("POINTER_DOWN");
                            try {
                                //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                                this.Touch.PointStart.splice(I * 2, 0, X, Y);
                                this.Touch.PointCurrent.splice(I * 2, 0, X, Y);
                                //获取点的总数量。
                                this.Touch.Matrix = this.colorsMatrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                //保存坐标的数组。

                                if (PC > this.maxPoints) { //手指数大于4个化为原始矩阵虽然记录坐标信息，但是不进行矩阵操作。
                                    this.colorsToCenter();
                                    break;
                                };

                                var matrix = new android.graphics.Matrix();
                                matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                                this.colorsMatrix = new android.graphics.Matrix();
                                this.colorsMatrix.setConcat(matrix, this.Touch.Matrix);
                                //进行矩阵运算并刷新矩阵。
                                this.colorsMatrix.invert(this.colorsinvertMatrix);
                                //反矩阵
                            } catch (e) {
                                log("P_DOWN " + e);
                            };

                            break;
                        case event.ACTION_POINTER_UP:
                            log("POINTER_UP");
                            try {
                                this.Touch.Matrix = this.colorsMatrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                this.Touch.PointStart.splice(I * 2, 2);
                                this.Touch.PointCurrent.splice(I * 2, 2);

                            } catch (e) {
                                log("P_UP " + e);
                            };
                            break;
                    };
            };
        } catch (e) {
            log("0: " + e);
        };

        return true;

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
    this.matrixPoints = function(matrix, ary) {
        var ary = this.toJavaArray("float", ary);
        matrix.mapPoints(ary);
        return this.toJsArray(ary);
    };


    canvasView.setOnTouchListener(new android.view.View.OnTouchListener(this.imgTouch));


};