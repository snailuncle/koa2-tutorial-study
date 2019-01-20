function Current_judgment(name,Judgement_information){//界面名称和需要验证的信息。
    //界面判断。
    this.Judgement_name=name||"";
    this.Judgement_information=Judgement_information||{};
    //界面信息。
    this.NeedDo=function(){return true;};
    //判断函数。
    this.do=function(){
        console.log(util.format('验证%s界面状态',this.Judgement_name));  
        try{
        return this.NeedDo();
        //验证界面状态。
        }catch(e){
          throw util.format('验证%s界面状态时异常',this.Judgement_name)+"\n"+e;  
        };
    };
};

function Current_action(name,Current_judgment){//动作名称和验证界面状态的实例。
    //当前动作。
    this.Action_name=name||"";
    //动作名称。
    this.Current_judgment=Current_judgment;
    //当前判断。
    this.NeedDo=NeedDo||function(){return true;};
    //执行动作。
    this.do=function(){
        console.log(util.format('执行%s动作',this.Action_name));  
        if(this.Current_judgment()){
            //验证界面状态。
           try{
             return this.NeedDo();
             //执行动作。
           }catch(e){
              throw util.format('执行%s动作时异常',this.Action_name)+"\n"+e;  
           };
        };
    };
};

function Possible_result(){//很多个结果动作。
    
    
    };


