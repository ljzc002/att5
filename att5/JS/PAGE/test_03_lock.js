/**
 * Created by Administrator on 2016/5/24.
 */
function GetData()
{
    var count_row=200;//两百行数据
    var count_col=20;//每行数据有二十列
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
    for(var i=0;i<count_col;i++)
    {
        arr_th.push("第"+(i+1)+"列表头");
    }
    DrawTable();
}
function DrawTable()
{
    arr_user.unshift([100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100]);//20列
    var arr_DOM = [];
    var arr_open1 = [];//在单元格里加入一个弹出项
    arr_open1.push("open");
    arr_open1.push("class_open1");
    arr_open1.push("Cooktd");//传入函数名
    arr_open1.push(["onclick", "Openbz()"]);//超链接的事件！！
    arr_DOM.push(arr_open1);
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

    arr_user.unshift(dwmc+"锁定报表");
    //锁定表头，并锁定10个表列
    $('#t_page_span')[0].innerHTML=att5.ArrayToTable5("div_tab","tab_data",0,0,arr_user,60,pages,1,1,10);
    $('#c_page_span')[0].innerHTML=pages+1;
    requestAnimFrame(function(){att5.AdjustWidth()});
}
function AdjustColor()
{

}
//当拖动水平滚动条时，锁定的表列和基于锁定表列的弹出窗口都锁定不动
function TestLock()
{
    var mask2left=0;
    var scrollleft=$("#all_base")[0].scrollLeft;//scrollLeft指滑动条向右滑动的距离
    var leng=arr_lock.length;
    for(var i=0;i<leng;i++)
    {
        if(arr_lock[i][1]==1)
        {
            $("#"+arr_lock[i][0]).css("left",mask2left+scrollleft+arr_lock[i][2]+"px");
        }
    }
}
//点击单元格时，打开一个弹出框
function Openbz()
{
    var evt=evt||window.event;
    cancelPropagation(evt);
    var obj=evt.currentTarget?evt.currentTarget:evt.srcElement;
    delete_div("div_bz");
    Open_div("", "div_bz", 240, 120, 0, 0, obj, "div_tab");//这个弹出框放在div_tab标签里，所以它会随着表格的滚动一起移动！！
    current_obj=obj;//用全局变量保存当前操作的单元格
    $("#div_bz")[0].innerHTML = $("#div_mod1")[0].innerHTML;//向弹出项里写入结构
    $("#div_bz .div_inmod1_content")[0].innerHTML = obj.getAttribute("title");
    arr_lock[1][1]=1;//声明弹出框要和列一起水平锁定
    arr_lock[1][2]=compPos2(obj).left;//设定水平锁定的位置为元素当前位置
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
    if (str == ""||str==null||str=="undefined"||str=="null")//修改dom元素的显示
    {
        current_obj.innerHTML = "无";
    }
    else {
        current_obj.innerHTML = "有";
    }
    arr_user[3+parseInt(current_obj.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML)][0]=str;//同步修改前台数据集
}