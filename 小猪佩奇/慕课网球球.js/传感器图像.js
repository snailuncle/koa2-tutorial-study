"ui";

/**
*作者QQ: 1811588980
*完成时间: 2019年1月5日 下午10:57:57
*测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920
 *API: 24
*备注: 暂无备注
**/
ui.layout(
    <vertical bg="{{colors.toString(colors.GRAY)}}" gravity="center">
        <text id="text" w="*" text="重力传感器" gravity="center"/>
        <canvas id="canvas" w="*" layout_weight="1"/>
        <text id="text1" w="*" gravity="center"/>
        <list id="list" w="*"h="200dp" bg="#40000000" gravity="center">
            <vertical w="*"  margin="5">
                <text w="*" text="{{name}}" gravity="center" />
                <text w="*" text="{{value}}" gravity="center"/>
            </vertical>
        </list>
    </vertical>
);
var storage = storages.create("传感器图像");
var sensorName = storage.get("sensor", {
    value: "gyroscope",
    name: "陀螺仪传感器"
});


//sleep(1000);
events.on("exit", function() {
    storage.put("sensor", sensorName);
});

//importClass(android.graphics.Paint);
//importClass(android.graphics.Canvas);
//importClass(android.graphics.Bitmap);
var SensorAry = new Array;
//忽略不支持的传感器，即使有传感器不支持也不抛出异常
//sensors.ignoresUnsupportedSensor = true;
var sensorsList = [{
        value: "accelerometer",
        name: "加速度传感器"
    },
    {
        value: "orientation",
        name: "方向传感器"
    },
    {
        value: "gyroscope",
        name: "陀螺仪传感器"
    },
    {
        value: "magnetic_field",
        name: "磁场传感器"
    },
    {
        value: "gravity",
        name: "重力传感器"
    },
    {
        value: "linear_acceleration",
        name: "线性加速度传感器"
    },
    {
        value: "ambient_temperature",
        name: "环境温度传感器"
    },
    {
        value: "light",
        name: "光线传感器"
    },
    {
        value: "pressure",
        name: "压力传感器"
    },
    {
        value: "proximity",
        name: "距离传感器"
    },
    {
        value: "relative_humidity",
        name: "湿度传感器"
    }
];

ui.list.setDataSource(sensorsList);
ui.text.setText(String(sensorName.name));

function SensorFun() {
    var ary = new Array;
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "number") {
            ary.push(arguments[i]);
        };
    };
    ui.run(() => {
        ui.text1.setText(String(ary.map(function(a) {
            return Math.round(a * 10) / 10
        })));
    });
    SensorAry.push(ary);
    if (SensorAry.length >= 100) {
        for (var i = 0; i < 5; i++) {
            SensorAry.shift();
        };
    };
};

//传感器
var sensor = sensors.register(sensorName.value, sensors.delay.ui);
if (sensor) {
    sensor.on("change", SensorFun);
} else {
    toastLog("不支持此传感器");
};

ui.list.on("item_click", function(item, i, itemView, listView) {
    //传感器
    var newsensor = sensors.register(item.value, sensors.delay.ui);
    if (newsensor) {
        ui.run(() => {
            ui.text.setText(item.name);
        });
        sensors.unregister(sensor);
        sensor = newsensor;
        sensorName = item;
        sensor.on("change", SensorFun);
    } else {
        toastLog("不支持此传感器");
    };

});

var paint = new android.graphics.Paint;
paint.setStrokeWidth(5);
paint.setTextAlign(Paint.Align.CENTER); //写字左右中心

var rainbowColor = [{
        色: "赤色",
        值: [255, 0, 0]
    },
    {
        色: "橙色",
        值: [255, 165, 0]
    },
    {
        色: "黄色",
        值: [255, 255, 0]
    },
    {
        色: "绿色",
        值: [0, 255, 0]
    },
    {
        色: "青色",
        值: [0, 127, 255]
    },
    {
        色: "蓝色",
        值: [0, 0, 255]
    },
    {
        色: "紫色",
        值: [139, 0, 255]
    }
];


ui.canvas.on("draw", function(canvas) {
    var w = canvas.getWidth(),
        h = canvas.getHeight();
        canvas.drawARGB(255,127,127,127);

  

    paint.setColor(colors.BLACK);
    canvas.drawLine(50, 0, 50, h, paint);
    canvas.drawLine(50, h / 2, w, h / 2, paint);

    var x = w * 0.9,
        y = h * 0.5;
    var sw = 15,
        sh = 25;
    for (var i = -50; i <= 50; i++) {

        var hy = y - i * sh;
        paint.setARGB(31, 0, 0, 0);
        canvas.drawLine(0, hy, w, hy, paint);
        paint.setARGB(127, 0, 0, 0);
        paint.setStrokeWidth(1); //边缘宽度
        paint.setStyle(Paint.Style.FILL); //实心样式
        var size = 30;
        paint.setTextSize(size);
        canvas.drawText(String(i), 25, hy + 0.365 * size, paint);

    };
    paint.setStrokeWidth(5); //边缘宽度
    for (var i = 1; i <= SensorAry.length; i++) {
        var ary = SensorAry[SensorAry.length - i];
        var bary = SensorAry[SensorAry.length - i - 1];
        var X = x - i * sw;
        var bX = x - (i + 1) * sw;
        if (bary) {
            for (var ii = 0; ii < ary.length; ii++) {
                var cy = y - ary[ii] * sh;
                var bcy = y - bary[ii] * sh;
                if (bcy) {

                    paint.setColor(colors.rgb.apply(colors, rainbowColor[ii].值));
                    canvas.drawLine(inon(X,0,w), inon(cy,0,h), inon(bX,0,w), inon(bcy,0,h), paint);
                };
            };
        };
    };
});

function inon(a,b,c){
    return (a>=b||a<c)?a:(a>=b?c-1:a);
    };




function getsd(s, ary) {
    var sum = weiyi(ary);
    var S = (s / sum) || 0;
    for (var i = 0; i < ary.length; i++) {
        ary[i] = ary[i] * S;
    };
    return ary;
};

function weiyi(ary) {
    var sum = 0;
    for (var i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
};

function kdfx(Y) {
    var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
    var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
    return [x, y];
};

function ydfx(ary) {
    var ary = getsd(1, ary);
    var x = ary[0],
        y = ary[1];
    var Y = Math.asin(y) / (2 * Math.PI) * 360;
    if (x < 0) {
        Y = 180 - Y;
    };
    return Y;
};



/*
function eraseColor() {
void eraseColor(int)
}

*/



function 反色(color) {
    return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
};
