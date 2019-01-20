"ui";

/**
*作者QQ: 1811588980
*完成时间: 2018年12月21日 下午4:50:18
*测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920
 *API: 24
*备注: 暂无备注
**/

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="色组生成器" h="40dp"/>
            </appbar>
            <text id="ConsoleText" w="*"maxLines="1"/>
            <canvas id="canvas" margin="5" layout_weight="1"/>
            <viewpager id="viewpager" w="*"h="50" bg="#dddddd">
                <horizontal  gravity="center">
                    <button id="open_img" text="打开图片"  layout_weight="1"style="Widget.AppCompat.Button.Colored"/>
                    <button id="to_" text="移动切换" layout_weight="1"style="Widget.AppCompat.Button.Colored"/>
                    <button id="toAry" text="复制点组" layout_weight="1"style="Widget.AppCompat.Button.Colored"/>
                </horizontal>
                <horizontal gravity="center">
                    <button id="set_maxColors" text="最大点数" layout_weight="1"/>
                    <button id="set_J" text="记点模式" layout_weight="1"/>
                    <button id="set_go" text="重置记点" layout_weight="1"/>
                    <button id="set_A" text="生成代码" layout_weight="1"/>
                </horizontal>
            </viewpager>
                </vertical>
                <vertical layout_gravity="left" bg="#ffffff" w="280">
                    <text text="颜色匹配函数" textSize="25sp" margin="5" gravity="center"/>
                    <input id="in_fun" w="*" h="250" textSize="16sp" bg="#dddddd" margin="5"/>
                    <button id="save_fun" text="保存函数" w="*"/>
                </vertical>
            </drawer>
);

log = function(t) {
    ui.run(() => {
        ui.ConsoleText.setText(new Date().toTimeString().split(" ")[0] + "/: " + String(t));
    });
};
toastLog("注意侧拉菜单");
//var img = images.read("/storage/emulated/0/建记/图片/img04.jpg");
//var canvasAD = new 图片查看(ui.canvas);

threads.start(function() {
    //    console.show();
});


//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

