var 绘布 = function(view) {
    if (view.accessibilityClassName != "android.widget.ImageView") {
        throw "我报错";
    };
    this.width = view.getWidth();
    this.height = view.getHeight();
    this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
    this.canvas = new android.graphics.Canvas(this.bitmap);
    this.matrix = new android.graphics.Matrix();
    threads.start(new java.lang.Runnable(() => {}));
    this.isOK = () => {
        this.width = view.getWidth();
        this.height = view.getHeight();
        this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
        this.canvas = new android.graphics.Canvas(this.bitmap);
        if (this.width <= 0 || this.height <= 0) {
            return false;
        };
        return true;
    };

    this.Draw = function() {};
    this.setDraw = function(fun) {
        if (typeof fun == "function") {
            this.Draw = fun;
        };
    };
    this.Refresh = (fun) => {
        try {
            this.bitmap.eraseColor(0);
            this.canvas.setMatrix(this.matrix);
            if (typeof fun == "function") {
                fun(this.canvas);
            } else {
                this.Draw(this.canvas);
            };
            ui.run(() => {
                view.setImageBitmap(this.bitmap);
            });
        } catch (e) {
            toastLog(e);
        };
    };


};

if (!images.requestScreenCapture(true)) {
    toastLog("截图请求失败");
    exit();
};
console.show();

//var rainbowColor = [-65536, -23296, -256, -16711936, -16744449, -16776961, -7667457];;

importClass(android.graphics.Paint);

var window = floaty.rawWindow(
    <ImageView id="img"/>
);

window.setSize(-1, -1);
window.setTouchable(false);

var paint = new android.graphics.Paint;
paint.setStrokeWidth(5);
//paint.setStyle(Paint.Style.STROKE);
paint.setColor(colors.GREEN);
//paint.setTextAlign(Paint.Align.CENTER); //写字左右中心

var size = 60;
paint.setTextSize(size);
//paint.setStrokeWidth(5);
//paint.setStyle(Paint.Style.STROKE);

var ad = new 绘布(window.img);

//var img = images.read("./JB.jpg");
var data = {
    "color": "#ffcdd2ce",
    "ary": [
        [-21, 22, "#ffddd4d5"],
        [-22, -21, "#ffc2c4c3"],
        [-42, 1, "#ffd3d2ce"],
        [0, 2, "#ffd7d7d5"],
        [-23, 22, "#ffd9d0d1"],
        [-19, -21, "#ffc6c6c6"],
        [-42, -1, "#ffd5d6d1"],
        [0, -2, "#ffcdcfcc"],
        [-18, 22, "#ffdfd6d7"],
        [-24, -21, "#ffb6bfbc"],
        [-42, 3, "#ffd6d2cf"],
        [0, 5, "#ffdcd2d3"],
        [-25, 21, "#ffbfbbba"],
        [-17, -20, "#ffced2d1"],
        [-42, -4, "#ffdad5d2"],
        [-1, -5, "#ffe4d5da"],
        [-16, 21, "#ffcecdcb"],
        [-26, -20, "#ffd7dddb"],
        [-42, 6, "#ffcfd6cf"],
        [-1, 7, "#ffd3c9ca"],
        [-28, 21, "#ffdedadb"],
        [-15, -20, "#ffc6cfcc"],
        [-41, -6, "#ffe3d9da"],
        [-1, -7, "#ffe6d5dd"],
        [-14, 20, "#ffc7c3c2"],
        [-29, -19, "#ffdcdbd7"],
        [-41, 8, "#ffd8d8d6"],
        [-2, 9, "#ffdddbdc"],
        [-30, 20, "#ffe2e2e0"],
        [-12, -19, "#ffbfbfbf"],
        [-40, -8, "#ffddd4d5"],
        [-2, -9, "#ffd0cacc"],
        [-11, 19, "#ffd2cecd"],
        [-31, -18, "#ffd0d9d4"],
        [-40, 10, "#ffdad4d4"],
        [-3, 12, "#ffccd0cf"],
        [-32, 19, "#ffd3ded6"],
        [-10, -18, "#ffc6b7bc"],
        [-39, -11, "#ffd5cccd"],
        [-4, -11, "#ffd5d3d4"],
        [-9, 18, "#ffd1d0cc"],
        [-33, -17, "#ffc2d1cc"],
        [-39, 12, "#ffcdd3cf"],
        [-4, 13, "#ffc6ccca"],
        [-34, 17, "#ffd4d3d1"],
        [-8, -16, "#ffeddae0"],
        [-38, -13, "#ffdbe8df"],
        [-5, -13, "#fff5e6eb"],
        [-7, 17, "#ffe4dede"],
        [-35, -16, "#ffeae1e4"],
        [-37, 14, "#ffc7d0cb"]
    ]
};


// x 242 960 1682
// y 247 968
var pointsAry = {
    x: [242, 960, 1682],
    y: [247,968]
};



sleep(1000);
if (!ad.isOK()) {
    toastLog("初始化失败\n脚本已停止，请重新运行");
    exit()
};
var cx = -20,
    cy = 1;
while (true) {

    var IMG = images.captureScreen();

    var p = findMultiColors(IMG, data.color, data.ary, {
        region: [242, 247, 1682 - 242, 968 - 247],
        threshold: 40
    });


    ad.Refresh(function(canvas) {
        if (p) {
            //找到位置了。
            log(p);
            var rx = p.x + cx,
                ry = p.y + cy;
            //画圆。
            canvas.drawCircle(rx, ry, 22, paint);
            //画六条线。
            for (var iy in pointsAry.y) {
                for (var ix in pointsAry.x) {
                    canvas.drawLine(rx, ry, pointsAry.x[ix], pointsAry.y[iy], paint);

                };
            };
        };
    });

    //IMG.recycle();

};