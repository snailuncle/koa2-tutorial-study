/**
*作者QQ: 1811588980
*完成时间: 2019年1月5日 上午2:42:14
*测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920
 *API: 24
*备注: 暂无备注
**/


var fromFile = files.cwd();
log(fromFile);
var txt=files.read(engines.myEngine().getSource());
//log(txt);
var ary = fromFile.split("/");
var endAry = ary.splice(4,ary.length-4);
log(endAry);
if (dialogs.confirm("是否删除已备份")) {
    files.removeDir(files.join("/sdcard/备份脚本", endAry.pop()));
};
var toFile = files.join("/sdcard/备份脚本", endAry.join("/"));

log(fromFile + "\n" + toFile);
copyDir(fromFile, toFile,1);

toastLog("备份结束");

function copyDir(fromDir, toDir,D) {
    var fromDirFile = new java.io.File(fromDir);
    var toDirFile = new java.io.File(toDir);
    var fun = arguments.callee;
    if (!fromDirFile.isDirectory()) {
        if (!fromDirFile.mkdirs()) {
            throw "A文件夹创建失败";
        };
    };
    if (!toDirFile.isDirectory()) {
        if (!toDirFile.mkdirs()) {
            throw "B文件夹创建失败";
        };
    };

    var toDirPath = files.join(toDirFile.getPath(), fromDirFile.getName());
    log(toDirPath);
    if (files.ensureDir(toDirPath)) {
        fromDirFile.listFiles().forEach(function(file) {
            if (file.isDirectory()) {
                fun(file.getPath(), toDirPath,D);
            } else {
                if(D&&file.getName()=="备份当前文件夹.js"){
                    files.write(file.getPath(),txt);
                 };
                log(files.join(toDirPath, file.getName()));
                files.copy(file.getPath(), files.join(toDirPath, file.getName()));
            };
        });
    };
};


function fileDeeplist2(file, C) {
    var list = file.listFiles().sort();
    list.forEach(function(file) {
        if (file.isDirectory()) {
            if ((!C && C != 0) || C > 0) {
                fileDeeplist2(file, C - 1);
            };
        } else {
            log(file.getName());
        };
    });
};