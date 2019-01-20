//这里修改你要运行的脚本

var path = "/sdcard/脚本/111.js";
if(!files.exists(path)){
    toast("脚本文件不存在: " + path);
    exit();
}
var window = floaty.window(
    <frame>
        <button id="action" text="开始运行" w="90" h="40" bg="#cc66ffff" layout_width="match_parent" layout_height="match_parent"/>
    </frame>
);

window.exitOnClose();
var x=device.width/3
var y=device.height/3
window.setPosition(x,y)
var execution = null;

window.action.click(()=>{
    if(window.action.getText() == '开始运行'){
        execution = engines.execScriptFile(path);
        window.action.setText('停止运行');
    }else{
        if(execution){
            execution.getEngine().forceStop();
        }
        window.action.setText('开始运行');
    }
});

window.action.longClick(()=>{
   window.setAdjustEnabled(!window.isAdjustEnabled());
   return true;
});

setInterval(()=>{}, 1000);
