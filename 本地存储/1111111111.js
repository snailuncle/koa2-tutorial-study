"ui";
"auto";

//ui里面数据、备注、验证文本名变量为data_name ,expre_name，check_name;
//ui里转账间隔变量tt，支付密码数字分辨为(数组t存放总密码),t1、t2、t3、t4、t5、t6
//转账计数变量为count,运行起始下标为subscript
//2019年1月26日在客户红米Note 5A上稳定运行,支持了自动继续上次记录，支持计数，支持次数完毕关闭脚本

ui.layout(
    <vertical padding="16" background="#e0dede" clickable="true" >
        {/* <text textSize="24sp" textColor="blue" gravity="center" text="精至支付宝营销 V1.0"/>
        <text textSize="16sp" textColor="red" gravity="center" text="售后联系微信kaikou8868"/>
       <horizontal padding="1" paddingBottom= "0">
            <text textSize = "14sp" textColor = "black" gravity = "left" text="输入注册码:"></text>
            <input id="注册码" inputType="number" hint="购买联系微信kaikou8868"/>
        </horizontal> */}
        <horizontal padding="1" paddingBottom= "0">
            <text textSize = "14sp" textColor = "black" gravity = "left" text="数据路径:/storage/emulated/0/精至/"></text>
            <input id="data_name" inputType="text" textSize = "12sp" hint="数据"/>
            <text textSize = "14sp" textColor = "black" gravity = "left" text=".txt"></text>
        </horizontal>
        <horizontal padding="1" paddingBottom= "0">
            <text textSize = "14sp" textColor = "black" gravity = "left" text="备注路径:/storage/emulated/0/精至/"></text>
            <input id="expre_name" inputType="text" textSize = "12sp" hint="备注"/>
            <text textSize = "14sp" textColor = "black" gravity = "left" text=".txt"></text>
        </horizontal>
        <horizontal padding="1" paddingBottom= "0">
            <text textSize = "14sp" textColor = "black" gravity = "left" text="好友验证路径:/storage/emulated/0/精至/"></text>
            <input id="check_name" inputType="text" textSize = "12sp" hint="验证"/>
            <text textSize = "14sp" textColor = "black" gravity = "left" text=".txt"></text>
        </horizontal>
        <horizontal padding="1">
            <text textSize = "14sp" textColor = "black" gravity = "left" text="转账间隔:"></text>
            <input id="tt" inputType="number" hint="建议5-13秒"/>
            <text textSize = "14sp" textColor = "black" gravity = "left" text="秒"></text>
        </horizontal>
        <horizontal padding="1">
            <text textSize = "14sp" textColor = "black" gravity = "left" text="转账计数:"></text>
            <input id="count" inputType="number" hint="不能大于数据行数"/>
            <text textSize = "14sp" textColor = "black" gravity = "left" text="次"></text>
        </horizontal>
        <horizontal padding="1" paddingBottom= "0">
            <text textSize = "14sp" textColor = "black" gravity = "left" text="支付密码:"></text>
            <input id="t1" inputType="number" hint="a"/>
            <input id="t2" inputType="number" hint="b"/>
            <input id="t3" inputType="number" hint="c"/>
            <input id="t4" inputType="number" hint="d"/>
            <input id="t5" inputType="number" hint="e"/>
            <input id="t6" inputType="number" hint="f"/>
        </horizontal>
        <button id="ok" text="确定"/>
        </vertical>
        );

        //载入历史数据
        threads.start(function(){
            setText(3,23);
         });
         var storage = storages.create("JZ_Alipay");
var info=storage.get('info')
if(info != null){
  ui.data_name.setText(info.data_name)
  ui.expre_name.setText(info.expre_name)
  ui.check_name.setText(info.check_name)
  ui.count.setText(String(info.count))
  ui.tt.setText(String(info.tt))
  ui.t1.setText(info.password.substring(0,1))
  ui.t2.setText(info.password.substring(1,2))
  ui.t3.setText(info.password.substring(2,3))
  ui.t4.setText(info.password.substring(3,4))
  ui.t5.setText(info.password.substring(4,5))
  ui.t6.setText(info.password.substring(5,6))
}

    //指定确定按钮点击时要执行的动作
    ui.ok.click(function(){
        //通过text()获取输入的内容
         let t = new Array();
         data_name = ui.data_name.text() || '数据';    //数据文本名
         log ("data_name-->"+data_name);
         expre_name = ui.expre_name.text() || '备注';  //备注文本名
         log ("expre_name-->"+expre_name);
         check_name = ui.check_name.text() || '验证';  //验证文本名
         log ("check_name-->"+check_name);
         tt = ui.tt.text()-0 || 8;
         log ("tt-->"+tt);
         count = ui.count.text()-0 || 1;
         log ("count-->"+count);
         t[0] = ui.t1.text()-0 || 0;
         log ("t1-->"+t[0]);
         t[1] = ui.t2.text()-0 || 0;
         log ("t2-->"+t[1]);
         t[2] = ui.t3.text()-0 || 0;
         log ("t3-->"+t[2]);
         t[3] = ui.t4.text()-0 || 0;
         log ("t4-->"+t[3]);
         t[4] = ui.t5.text()-0 || 0;
         log ("t5-->"+t[4]);
         t[5] = ui.t6.text()-0 || 0;
         log ("t6-->"+t[5]);

          data_path = "/storage/emulated/0/精至/"+data_name+".txt";   //读取话术路径
         log ("数据路径为："+data_path);
         files.createWithDirs(data_path)
          expre_path = "/storage/emulated/0/精至/"+expre_name+".txt";   //读取备注路径
         log ("备注路径为："+expre_path);
         files.createWithDirs(expre_path)
         check_path = "/storage/emulated/0/精至/"+check_name+".txt";   //读取话术路径
         log ("验证路径为："+check_path);
         files.createWithDirs(check_path)

          data_file = open(data_path,"r","UTF-8");
          data_data =data_file.readlines();
          data_number = data_data.length ;
         log("数据总共"+data_number+"行");
         log("固定输出第二十行、用于校验:\n____"+data_data[19]);
         log ("用户文本名为："+data_name);

          expre_file = open(expre_path,"r","UTF-8");
          expre_data = expre_file.readlines();
          expre_number = expre_data.length ;
         log("备注总共"+expre_number+"行");
         log("固定输出第二行、用于校验:\n____"+expre_data[1]);
         log ("备注文本名为："+expre_name);

          check_file = open(check_path,"r","UTF-8");
          check_data =check_file.readlines();
          check_number = check_data.length ;
         log("验证总共"+check_number+"行");
         log("固定输出第二十行、用于校验:\n____"+check_data[19]);
         log ("验证文本名为："+check_name);

         let storage = storages.create("JZ_Alipay");
         storage.put("S_data_name", data_name);
         storage.put("S_expre_name", expre_name);
         storage.put("S_check_name", check_name);
         storage.put("S_count", count);
         storage.put("S_tt", tt);
         storage.put("S_t1", t[0]);
         storage.put("S_t2", t[1]);
         storage.put("S_t3", t[2]);
         storage.put("S_t3", t[3]);
         storage.put("S_t5", t[4]);
         storage.put("S_t6", t[5]);
         var info={
          data_name:data_name,
          expre_name:expre_name,
          check_name:check_name,
          count:count,
          tt:tt,
          password:t.join('')
         }
         log(info)
         storage.put("info", info);

         threads.start(function(){
           log(1);
        });
    });
