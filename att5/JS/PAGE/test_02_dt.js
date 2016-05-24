/**
 * Created by Administrator on 2016/5/24.
 */
//将数据从后台提取到前台
function GetData()
{
    if($(".textbox-text")[0].value==""||$(".textbox-text")[1].value=="")//取easyui的日历控件值
    {
        alert("请选择查询起止日期！");
    }
    else
    {//实际情况下，要根据前台输入的条件在后台执行sql语句将查找到的数据返回，这里为了方便在前台生成测试数据
        var count_row=200;//两百行数据
        var count_col=70;//每行数据有七十列
        var arr_row=[];

        for(var i=0;i<count_row;i++)
        {
            arr_row=[];
            for(var j=0;j<count_col;j++)
            {
                arr_row.push("第"+(i+1)+"行第"+(j+1)+"列");
            }
            arr_user.push(arr_row);
        }
        //在数据库中取默认的表头名，
        // 可以使用select comments from sys.all_col_comments t where table_name='tablename' 取Oracle数据库表列的注释作为默认表头
        //这里为了方便在前台生成测试数据
        for(var i=0;i<count_col;i++)
        {
            arr_th.push("第"+(i+1)+"列注释");
        }
        CreateSrcData();
    }

}
//为取到的所有数据建立数据集
function CreateSrcData()
{
    arr_user.unshift([100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100
        ,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100
        ,100,100,100,100,100,100,100,100,100,100]);//70列
    var arr_DOM = [];
    var arr_open1 = [];//在单元格里加入一个弹出项
    arr_open1.push("open");
    arr_open1.push("class_open1");
    arr_open1.push("Cooktd");//传入函数名
    arr_open1.push(["onclick", "Openbz()"]);//超链接的事件！！
    arr_DOM.push(arr_open1);
    var arr_mod1=[];//把隐藏在页面中的一个小模块嵌入到表格里
    arr_mod1.push("mod");
    arr_mod1.push("div_mod4");
    arr_DOM.push(arr_mod1);
    var arr_input1 = [];//在单元格里加入一个输入项
    arr_input1.push("input");
    arr_input1.push("class_input1");
    arr_input1.push("100px");
    arr_input1.push(["onkeydown", "onlyNum()"]);//限制只能输入数字
    //arr_input1.push(["onchange", "count_cj()"]);
    arr_DOM.push(arr_input1);
    //下面是67个简单字符串单元格
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_DOM.push("str");
    arr_user.unshift(arr_DOM);

    arr_user.unshift(arr_th);
    arr_user.unshift(dwmc+$(".textbox-text")[0].value+"全表列查询");
    $("#str_note")[0].innerHTML="查询到"+(arr_user.length-4)+"条数据";
    if((arr_user.length-4)>=0)
    {//查到数据之后使能数据操作按钮
        $(".btn_afterget").prop("disabled",false);//jquery批量修改属性，大大提高书写效率！！！！
    }
}
function ChooseCol()//打开一个用来选择表列的弹出框
{
    btn_del2();
    Open_div("div_ssbup", "div_choose", 1080, 360, 40, 40, "", "",1);//打开一个带遮罩的弹出框
    $("#div_choose")[0].innerHTML = $("#div_mod2")[0].innerHTML;
    InsertChoose();
}
function btn_del2()
{//在打开弹窗之前先把可能存在的弹窗关上
    var evt=evt||window.event;
    cancelPropagation(evt);
    delete_div('div_choose');
    delete_div('div_mask');
}
//向弹出框里插入选项
function InsertChoose()
{
    var len=arr_user[1].length;
    for(var i=0;i<len;i++)
    {//插入默认列名
        $("#div_choose .div_choose1")[0].innerHTML+="<div style='width: 300px;float: left' class='div_option2'><input type='checkbox' style='float: left' class='str_check'><nobr style='width: 260px;float: left;position: relative;top: -2px'>"
        +arr_user[1][i]+"</nobr></div>";
    }
    $("#div_choose .div_choose2 button")[0].disabled=false;//使能添加按钮
    //拖拽处理
    var div_choose=$("#div_choose")[0];
    drag(div_choose);
    var div_inmod2_content=$("#div_choose .div_inmod2_content")[0];
    div_inmod2_content.onmousedown=function()
    {
        var evt=evt||window.event;
        cancelPropagation(evt);
    }
    var btn_close=$("#div_choose .div_inmod_head button")[0];
    btn_close.onmousedown=function()
    {
        var evt=evt||window.event;
        cancelPropagation(evt);
    }
}
function divinsert()//添加
{
    var len=$("#div_choose .div_choose1 .str_check").length;
    for(var i=0;i<len;i++)
    {
        try {
            if ($("#div_choose .div_choose1 .str_check")[i].checked)//如果这一项被勾选了
            {//这里的规则要尝试一下
                //$(".div_choose3")[0].appendChild($("#div_choose .div_choose1 .str_check")[i].parentNode);
                $("#div_choose .div_choose3")[0].innerHTML += "<div style='width: 500px;float: left' class='div_option2'>"
                + $("#div_choose .div_choose1 .str_check")[i].parentNode.innerHTML
                + "<input class='str_thname' style='width: 180px;float: left;position: relative;margin-left: 10px;height: 16px'></div>";//凑一个标签，用来作为insertBefore的目标
                $("#div_choose .div_choose1 .str_check")[i].checked=false;
                //var str=$("#div_choose .div_choose1 .str_check")[i].parentNode.outerHTML;
                $("#div_choose .div_choose1 .str_check")[i].parentNode.style.display = "none";
            }
        }
        catch(e)
        {
            continue;
        }
    }
    if($("#div_choose .div_choose3 .str_check").length>0) {
        $("#div_choose .div_choose2 button").attr("disabled", false);//右边有了插入项之后使能其他所有的按钮
        $("#div_choose .div_choose4 button").attr("disabled", false);
    }
    if(len==$("#div_choose .div_choose3 .str_check").length)//左边的内容已经都加到了右边
    {
        $("#div_choose .div_choose2 button")[0].disabled=true;
    }
}
function divdelete()//删除
{
    //var len =$("#div_choose .div_choose3 .str_check").length;//这个length也是在变化的！！
    for(var i=0;i<$("#div_choose .div_choose3 .str_check").length;i++)
    {
        try {
            if ($("#div_choose .div_choose3 .str_check")[i].checked)//如果这一项被勾选了
            {
                var len2 = $("#div_choose .div_choose1 nobr").length;//左侧重新显示
                for (var j = 0; j < len2; j++) {
                    if ($("#div_choose .div_choose1 nobr")[j].innerHTML == $("#div_choose .div_choose3 nobr")[i].innerHTML) {
                        $("#div_choose .div_choose1 nobr")[j].parentNode.style.display = "block";
                        break;
                    }
                }
                $("#div_choose .div_choose3")[0].removeChild($("#div_choose .div_choose3 .str_check")[i].parentNode);//右侧删除
                i--;
            }
        }
        catch(e)
        {
            continue;
        }
    }
    if($("#div_choose .div_choose3 .str_check").length==0)
    {
        $("#div_choose .div_choose2 button").attr("disabled", true);//右边没有项目之后，禁止大多数按钮
        $("#div_choose .div_choose4 button").attr("disabled", true);
    }
    if($("#div_choose .div_choose1 .str_check").length>0) {
        $("#div_choose .div_choose2 button")[0].disabled = false;
    }
}
function divfirst()
{
    var num_checked=0;
    for(var i=0;i<$("#div_choose .div_choose3 .str_check").length;i++)
    {
        try {
            if ($("#div_choose .div_choose3 .str_check")[i].checked)//如果这一项被勾选了
            {//insertBefore第一个参数是要移动的列，第二个参数是移动到的参考位置
                $("#div_choose .div_choose3")[0].insertBefore($("#div_choose .div_choose3 .div_option2")[i],$("#div_choose .div_choose3 .div_option2")[0+num_checked]);
                num_checked++;
            }
        }
        catch(e)
        {
            continue;
        }
    }
}
function divup()
{
    var num_checked=0;
    for(var i=0;i<$("#div_choose .div_choose3 .str_check").length;i++)
    {
        try {
            if ($("#div_choose .div_choose3 .str_check")[i].checked)//如果这一项被勾选了
            {
                if(num_checked==0&&i==0)// 想要往上移动的第一个元素已经是列表里的第一个元素，此时禁止再向上移动
                {
                    break;
                }
                else
                {
                    $("#div_choose .div_choose3")[0].insertBefore($("#div_choose .div_choose3 .div_option2")[i],$("#div_choose .div_choose3 .div_option2")[i-1])
                    num_checked++;
                }
            }
        }
        catch(e)
        {
            continue;
        }
    }
}
function divdown()
{
    $("#div_choose .div_choose3")[0].appendChild(document.createElement("div"));
    var num_checked=0;
    for(var i=($("#div_choose .div_choose3 .str_check").length-1);i>=0;i--)
    {
        try {
            if ($("#div_choose .div_choose3 .str_check")[i].checked)//如果这一项被勾选了
            {
                if(num_checked==0&&i==($("#div_choose .div_choose3 .str_check").length-1))// 想要往下移动的第一个元素已经是列表里的最后一个元素，此时禁止再向下移动
                {
                    break;
                }
                else
                {
                    $("#div_choose .div_choose3")[0].insertBefore($("#div_choose .div_choose3 .div_option2")[i],$("#div_choose .div_choose3 .div_option2")[i+1].nextSibling)
                    num_checked++;
                }
            }
        }
        catch(e)
        {
            continue;
        }
    }
    $("#div_choose .div_choose3")[0].removeChild($("#div_choose .div_choose3")[0].lastChild);
}
function divlast()
{
    $("#div_choose .div_choose3")[0].appendChild(document.createElement("div"));
    var num_checked=0;
    for(var i=($("#div_choose .div_choose3 .str_check").length-1);i>=0;i--)
    {
        try {
            if ($("#div_choose .div_choose3 .str_check")[i].checked)//如果这一项被勾选了
            {//insertBefore第一个参数是要移动的列，第二个参数是移动到的参考位置
                $("#div_choose .div_choose3")[0].insertBefore($("#div_choose .div_choose3 .div_option2")[i],$("#div_choose .div_choose3 .div_option2")[($("#div_choose .div_choose3 .str_check").length-1)-num_checked].nextSibling);
                num_checked++;
            }
        }
        catch(e)
        {
            continue;
        }
    }
    $("#div_choose .div_choose3")[0].removeChild($("#div_choose .div_choose3")[0].lastChild);
}
function divchoose()//确定
{
    arr_col=[];
    var len=$("#div_choose .div_choose3 .div_option2").length
    for(var i=0;i<len;i++)
    {//将列配置情况保存在arr_col中，第一个是汉字注释名，第二个是用户输入的自定义列名
        arr_col.push([$("#div_choose .div_choose3 nobr")[i].innerHTML,$("#div_choose .div_choose3 .str_thname")[i].value]);
    }
    CookChoose();
    delete_div('div_choose');
    delete_div('div_mask');
}
//根据arr_col从arr_user中挑选生成arr_data，使用clone？
function CookChoose()
{
    var len=arr_user[1].length;//汉字列名j
    var len2=arr_col.length;//选择体i
    var len3=arr_user.length;//数据体k
    var obj_row=[];
    arr_data=[];
    for(var k=1;k<len3;k++)//对于每一行
    {
        obj_row=[];
        //按顺序寻找每一个选择的列
        for(var i=0;i<len2;i++)
        {
            for(var j=0;j<len;j++)
            {
                if(arr_user[1][j]==arr_col[i][0])//找到了被选中的列
                {
                    if(k==1&&arr_col[i][1]!="")//对于汉字表头行如果用户手动设置了列名
                    {
                        obj_row.push(arr_col[i][1]);
                    }
                    else if(k==3)//数字类型行不适用concat！！
                    {
                        obj_row.push(arr_user[k][j]);
                    }
                    else if(k==2)//目前看来只有这一行是复杂结构
                    {
                        //尝试各种数组克隆方法，js的克隆分为dom元素的克隆（nodeclone）和数组的克隆两种
                        obj_row.push(arr_user[k][j].concat());
                        //obj_row.push(arr_user[k][j].slice(0));
                        //obj_row.push($.extend(true,{},arr_user[k][j]))
                        //obj_row.push(arr_user[k][j].Clonenew())
                    }
                    else//其余数据行都是字符串类型！！
                    {
                        obj_row.push(arr_user[k][j]);
                    }
                    break;
                }
            }
        }
        arr_data.push(obj_row);
        //obj_row=[];
    }
    arr_data.unshift(dwmc+"动态表列查询结果");
    $('#t_page_span')[0].innerHTML=att5.ArrayToTable5("div_tab","tab_data",0,0,arr_data,30,pages);
    $('#c_page_span')[0].innerHTML=pages+1;
    AdjustColor();
}
function AdjustColor()
{

}
//导出小表的Excel
function ExportTab()
{
    if(arr_data.length<5)
    {
        alert("无数据无法导出！");
    }
    MakeExcel2(MakeDateStr2()+dwmc+"动态表列查询结果",arr_data[1],0,0,arr_data,4);
}
//导出表列配置的文本文件
function ExportCol()
{
    var str_data=JSON.stringify(arr_col);
    DownloadText(MakeDateStr()+dwmc+"动态表列设置",str_data);
}
//弹出一个用来输入文件名的对话框
function ImportCol()
{
    delete_div('div_ImportCol');
    Open_div("div_ssbup", "div_ImportCol", 640, 120, 80, 80, "", "", 0);
    $("#div_ImportCol")[0].innerHTML = $("#div_mod3")[0].innerHTML;
}
//导入文本文件
function ImportCol2()
{
    var evt=evt||window.event;
    cancelPropagation(evt);
    var obj=evt.currentTarget?evt.currentTarget:evt.srcElement;
    UploadText(obj.value,evt,"ImportCol3(s)");
}
function ImportCol3(str_json)
{
    arr_col=JSON.parse(str_json);
    CookChoose();
    delete_div('div_ImportCol');
}
//导出全部数据的Excel
function ExportAll()
{
    if(arr_user.length<5)
    {
        alert("无数据无法导出！");
    }
    MakeExcel2(MakeDateStr2()+dwmc+"全表列查询",arr_user[1],0,0,arr_user,4);
}
//点击单元格时，打开一个弹出框
function Openbz()
{
    var evt=evt||window.event;
    cancelPropagation(evt);
    var obj=evt.currentTarget?evt.currentTarget:evt.srcElement;
    delete_div("div_bz");
    if(obj.innerHTML=="有"||obj.innerHTML=="无")
    {
        Open_div("", "div_bz", 240, 120, 0, 0, obj, "div_tab");//这个弹出框放在div_tab标签里，所以它会随着表格的滚动一起移动！！
        current_obj=obj;//用全局变量保存当前操作的单元格
        $("#div_bz")[0].innerHTML = $("#div_mod1")[0].innerHTML;//向弹出项里写入结构
        $("#div_bz .div_inmod1_content")[0].innerHTML = obj.getAttribute("title");//为了兼容性不使用自定义标签属性，使用浏览器支持的title属性
    }
}
//根据data修改open型单元格显示的字符
function Cooktd(str)
{
    if(str!=""&&str!=null&&str!="undefined"&&str!="null")
    {
        return "有";
    }
    else
    {
        return "无";
    }
}
//在关闭单元格时，根据用户在弹出框里的操作修改单元格
function ChangeBZ() {
    var str = $("#div_bz .div_inmod1_content")[0].innerHTML;
    current_obj.setAttribute("data", str);//修改dom元素的属性
    if (str == "")//修改dom元素的显示
    {
        current_obj.innerHTML = "无";
    }
    else {
        current_obj.innerHTML = "有";
    }
    //事实上这里还应该对数据集进行修改以支持翻页和数据集提交，但动态表格的数据绑定是一件很麻烦的事情，这里就不深究了
}
//选择是否隐藏条件选择区域
function HiddeHead()
{
    var evt=evt||window.event;
    cancelPropagation(evt);
    var obj=evt.currentTarget?evt.currentTarget:evt.srcElement;
    if(obj.innerHTML=="隐藏条件")
    {
        obj.innerHTML="显示条件";
        $("#div_ssbup ul")[0].style.display="none";
        //$("#div_ssbup ul")[1].style.display="none";
        $("#div_ssbup .div_xline")[0].style.display="none";
        $("#div_ssbup")[0].style.height="40px";
        int_height=60;
        Resize_Pllsselect();
    }
    else
    {
        obj.innerHTML="隐藏条件";
        $("#div_ssbup ul")[0].style.display="block";
        //$("#div_ssbup ul")[1].style.display="block";
        $("#div_ssbup .div_xline")[0].style.display="block";
        $("#div_ssbup")[0].style.height="140px";
        int_height=160;
        Resize_Pllsselect();
    }
}
//为单元格里的按钮设置一个响应方法
function findrow()
{
    var evt=evt||window.event;
    cancelPropagation(evt);
    var obj=evt.currentTarget?evt.currentTarget:evt.srcElement;
    var tds=obj.parentNode.parentNode.parentNode.getElementsByTagName("td");//取得按钮所在表格行的所有单元格
    var num_index=parseInt(tds[0].innerHTML);//当前点击的表行的行号，可借此关联数据集！！！！
    alert("我在第"+num_index+"行");
}