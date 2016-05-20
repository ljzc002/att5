/**
 * Created by Administrator on 2016/5/6.
 */
//生成测试数据
function CreateTestData()
{
    var count_row=200;//两百行数据
    var count_col=10;//每行数据有十列
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
    DrawTable();
}
//在前台生成数据集并按数据集绘制表格
function DrawTable()
{
    arr_user.unshift([100,100,100,100,100,100,100,100,100,100]);//10列，规定表列的最小宽度
    var arr_DOM = [];
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
    arr_user.unshift(arr_DOM);//向数据集中压入每一列的数据结构，这里全是简单字符类型
    arr_user.unshift(["表头","表头","表头","表头","表头","表头","表头","表头","表头",
        "表头"]);//压入表头
    arr_user.unshift(dwmc+"最小功能测试表");//压入表名
    //绘制表格并返回表格总页数
    $('#t_page_span')[0].innerHTML=att5.ArrayToTable5("div_tab","tab_data",0,0,arr_user,30,pages);
    $('#c_page_span')[0].innerHTML=pages+1;//当前所在页数
    AdjustColor();//表格绘制完毕后根据需求对部分单元格样式进行微调
}
function AdjustColor()
{

}

//用文本方式把数据集导出，兼容ie8-ie11，兼容chrome
function TextExport()
{
    var str_data=JSON.stringify(arr_user);//为保持数据结构，压成json格式
    DownloadText(MakeDateStr()+"数据集",str_data);
}

//导入数据集，弹出一个用来选择文件的对话框
function ImportCol()
{
    delete_div('div_ImportCol');//删除可能已经存在的对话框
    Open_div("div_ssbup", "div_ImportCol", 640, 120, 80, 80, "", "", 0);//在指定位置打开一个div
    $("#div_ImportCol")[0].innerHTML = $("#div_mod1")[0].innerHTML;//设置div的内容

    //使得弹出框可以被拖拽
    var div_ImportCol=$("#div_ImportCol")[0];
    drag(div_ImportCol);
    //把对弹出框内元素的操作与弹出框拖拽分离
    var div_inmod_content=$("#div_ImportCol #btn_ImportCol")[0];
    div_inmod_content.onmousedown=function()
    {
        var evt=evt||window.event;
        cancelPropagation(evt);//阻断事件传播
    }
    var btn_close=$("#div_ImportCol .div_inmod_head button")[0];
    btn_close.onmousedown=function()
    {
        var evt=evt||window.event;
        cancelPropagation(evt);
    }
}
//导入文本文件
function ImportCol2()
{
    var evt=evt||window.event;
    cancelPropagation(evt);
    var obj=evt.currentTarget?evt.currentTarget:evt.srcElement;
    UploadText(obj.value,evt,"ImportCol3(s)");
}
//根据导入的数据集绘制表格
function ImportCol3(str_json)
{
    arr_user=JSON.parse(str_json);
    delete_div('div_ImportCol');
    $('#t_page_span')[0].innerHTML=att5.ArrayToTable5("div_tab","tab_data",0,0,arr_user,30,pages);
    $('#c_page_span')[0].innerHTML=pages+1;
}
