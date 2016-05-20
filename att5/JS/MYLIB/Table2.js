/**
 * Created by Administrator on 2015/5/11.
 */
//动态画表类，尝试使用自包含结构
var pages=0;
var att5=
{

    /**
     * 向一个表行中添加字符型表头元素
     * @param tr 表行ID
     * @param str 添加字符
     * @param wid 列宽（字符型px）
     * @constructor
     */
    InsertaTHStr:function(tr,str,wid)
    {
        var th=document.createElement("th");
        th.style.width=wid;
        if(str==null)
        {
            str="";
        }
        th.appendChild(document.createTextNode(str));
        tr.appendChild(th);
    },
    /*InsertaTHStr:function(tr,str)
    {
        var th=document.createElement("th");
        if(str==null)
        {
            str="";
        }
        th.appendChild(document.createTextNode(str));
        tr.appendChild(th);
    },*/
    /**
     * 向一个表行中添加字符型单元格元素
     * @param tr 表行ID
     * @param str 添加字符
     * @param wid 列宽
     * @constructor
     */
    InsertaTDStr:function(tr,str,wid)
    {
        var td=document.createElement("td");
        td.style.width=wid;
        if(str==null)
        {
            str="";
        }
        td.appendChild(document.createTextNode(str));
        tr.appendChild(td);
    },
    /*InsertaTDStr:function (tr,str)
    {
        var td=document.createElement("td");
        if(str==null)
        {
            str="";
        }
        td.innerHTML=str;
        //td.appendChild(document.createTextNode(str));
        tr.appendChild(td);
    },*/
    InsertaTDPick:function (tr,str)//一个可以被选中的表行
    {
        var td=document.createElement("td");
        td.appendChild(document.createTextNode(str));
        td.style.cursor="crosshair";
        td.onclick=function()
        {//526DA5
            if(td.parentNode.style.backgroundColor!="#97ceef"&&td.parentNode.style.backgroundColor!="#97CEEF"&&td.parentNode.style.backgroundColor!="rgb(151, 206, 239)")
            {
                td.parentNode.style.backgroundColor="#97ceef";
            }
            else
            {
                if(parseInt(td.innerHTML)%2==0)
                {
                    td.parentNode.style.backgroundColor = "#ffffff";
                }
                else
                {
                    td.parentNode.style.backgroundColor = "#eeeeee";
                }
            }
        };
        tr.appendChild(td);
    },
    InsertaTDPick2:function (tr,str,id)//这个给遮罩层用,id是表实体的id
    {
        var td=document.createElement("td");
        td.appendChild(document.createTextNode(str));
        td.style.cursor="crosshair";
        td.style.width="50px";
        td.onclick=function()
        {//526DA5
            if(td.parentNode.style.backgroundColor!="#97ceef"&&td.parentNode.style.backgroundColor!="#97CEEF"&&td.parentNode.style.backgroundColor!="rgb(151, 206, 239)")
            {
                td.parentNode.style.backgroundColor="#97ceef";//修改遮罩层
                ChangeTable(td,"#97ceef");
            }
            else
            {
                if(parseInt(td.innerHTML)%2==0)
                {
                    td.parentNode.style.backgroundColor = "#ffffff";
                    ChangeTable(td,"#ffffff");
                }
                else
                {
                    td.parentNode.style.backgroundColor = "#eeeeee";
                    ChangeTable(td,"#eeeeee");
                }
            }
        };
        function ChangeTable(obj,color)
        {
            var trs=document.getElementById(id).getElementsByTagName("tr")//找实体表然后去修改
            var leng=trs.length;
            for(var i=1;i<leng;i++)
            {
                if(obj.innerHTML==trs[i].getElementsByTagName("td")[0].innerHTML)
                {
                    trs[i].getElementsByTagName("td")[0].parentNode.style.backgroundColor=color;
                }
            }
        }
        tr.appendChild(td);
    },
    PickColor:function()//使用很少，考虑去掉
    {
        var evt=evt||window.event;
        cancelPropagation(evt);
        var tr=evt.currentTarget?evt.currentTarget:evt.srcElement;
        if(tr.style.backgroundColor!="#97ceef"&&tr.style.backgroundColor!="#97CEEF"&&tr.style.backgroundColor!="rgb(151, 206, 239)")
        {
            tr.style.backgroundColor="#97ceef";
        }
        else
        {
            if(parseInt(tr.childNodes[0].innerHTML)%2==0)
            {
                tr.style.backgroundColor = "#ffffff";
            }
            else
            {
                tr.style.backgroundColor = "#eeeeee";
            }
        }
    },
    /**
     * 在指定元素内的指定位置建立表格，如果已经存在相同ID的表格，则删除原表重绘新表，规定这样的表具有全局性，不能局部构建！！
     * 这个表是部分动态的，表头行是不能锁定的，表列根据不同的参数决定使用不同的元素
     * 在处理button这种没有数据源的列时，要在数据源中给它一个列或者在循环时做移位处理
     * 下面要在表格中加入控制行，控制行中有翻页类图标，数据控制类图标，调试类图标，后来发现集成度还达不到这么高，故而还是分开做
     * @param obj 在哪个元素之内
     * @param id 表格id
     * @param left
     * @param top
     * @param data 表格元素的数组，规定第一行为表名(在表名行里加上key？)，第二行为列名，第三行为列类型数组，第四行为列宽，第五行开始为数据
     * @param rows 表示每页显示多少行数据，<=0表示在本页显示全部
     * @param pages 表示要显示第几页，配合外部记录页数的变量完成翻页动作,这里要注意到page和pages的区别，参数变量会覆盖掉全局变量！！
     * @param color 是否使用间隔色，1表示使用
     * 20160504修改：
     * thlock表头是否锁定，1表示锁定，默认0
     * collock从左边开始锁定几个表列，默认0表示不锁定也不绘制序号列
     * @constructor
     */
    ArrayToTable5:function(obj,id,left,top,data,rows,page,color,thlock,collock)
    {
        pages=page;
        var totalpages=0;//记录下一共有多少页
        totalpages=Math.ceil((data.length-4)/rows);
        if(totalpages==0)
        {
            totalpages=1;
        }
        /*totalpages=((data.length-4)/rows).toFixed(0);
        if(((data.length-4)%rows)<(rows/2))
        {
            totalpages++;
        }*/
        if(pages<0)
        {
            alert("到达数据首页！");
            pages=0;
        }
        else if(pages>=totalpages)//((pages+1)*rows-(data.length-4)>=rows)
        {
            alert("到达数据末尾");
            //page--;
            pages=totalpages-1;
            /*pages=((data.length-4)/rows).toFixed(0)-1;
            if(((data.length-4)%rows)<150)
            {
                pages++;
            }*/
        }
        //else
        //{
            var data_table;
            var tab_colmask;
            if (document.getElementById(id))//如果已有该表
            {
                data_table = document.getElementById(id);
                var parent = data_table.parentNode;
                parent.removeChild(data_table);
                if(document.getElementById("div_thmask"))//删除锁定表头的遮罩层
                {
                    var div =document.getElementById("div_thmask");
                    div.parentNode.removeChild(div);
                }
                if(document.getElementById("tab_mask2"))//删除锁定表列的遮罩层
                {
                    var tab =document.getElementById("tab_mask2");
                    tab.parentNode.removeChild(tab);
                }
                if(document.getElementById("div_thmask3"))//
                {
                    var tab =document.getElementById("div_thmask3");
                    tab.parentNode.removeChild(tab);
                }
            }
            data_table = document.createElement("table");
            data_table.id = id;
            //data_table.style.border="1";
            data_table.cellPadding = "0";
            data_table.cellSpacing = "0";
            data_table.style.position = "absolute";
            data_table.style.top = top + "px";
            data_table.style.left = left + "px";
            //data_table.eval("style.left")="100px";
            var div_table = document.getElementById(obj);
            div_table.innerHTML="";
            div_table.appendChild(data_table);
            data_table = document.getElementById(id);

            var tr1 = document.createElement("tr");//填写表头
            att5.InsertaTHStr(tr1, "第"+(pages+1) + "页","50px");//IE8中缺少参数会报错
            for (var k = 0; k < data[1].length; k++)
            {
                att5.InsertaTHStr(tr1, data[1][k],(data[3][k]+"px"));
            }
            data_table.appendChild(tr1);
            if(thlock!=null&&thlock==1)//绘制锁定表头的遮罩层
            {
                var div_thmask=document.createElement("div");
                div_thmask.className="div_mask2";
                div_thmask.id="div_thmask";
                div_thmask.style.zIndex="200";
                var div_parent=document.getElementById(obj).parentNode;
                div_thmask.style.top=(compPos2(div_table).top-parseInt(div_table.style.height.split("p")))+"px";//定位添加的遮罩层
                div_thmask.style.left=compPos2(div_table).left+"px";
                div_thmask.style.width="6000px";
                div_thmask.style.height="42px";
                div_thmask.style.backgroundColor="#ffffff";

                var tab_thmask= document.createElement("table");
                var tr_thmask=document.createElement("tr");
                att5.InsertaTHStr(tr_thmask, "第"+(pages+1) + "页","50px");//IE8中缺少参数会报错
                for (var k = 0; k < data[1].length; k++)
                {
                    att5.InsertaTHStr(tr_thmask, data[1][k],(data[3][k]+"px"));
                }
                tab_thmask.appendChild(tr_thmask);
                div_thmask.appendChild(tab_thmask);
                div_parent.appendChild(div_thmask);
            }
            if(collock!=null&&collock>0)//绘制锁定表列的遮罩层，估计不需要外包装的div，可以和data_table共享div_table（考虑到层数决定这样做）
            {
                arr_lock.push(["tab_mask2",1,0]);//第一个参数是要锁定的标签的id，第二个是是否锁定，第三个是标签的初始水平偏移量
                arr_lock.push(["div_bz",0,0]);
                tab_colmask= document.createElement("table");
                tab_colmask.cellPadding = "0";
                tab_colmask.cellSpacing = "0";
                tab_colmask.style.position = "absolute";
                tab_colmask.className="div_mask2";
                tab_colmask.id="tab_mask2";
                tab_colmask.style.zIndex="150";
                tab_colmask.style.top="0px";
                tab_colmask.style.backgroundColor="#ffffff";
                var tr_mask= document.createElement("tr");//创造一个占位用的表头行
                att5.InsertaTHStr(tr_mask, "第"+(pages+1) + "页","50px");
                for (var k = 0; k < collock-1; k++)
                {
                    att5.InsertaTHStr(tr_mask, data[1][k],(data[3][k]+"px"));
                }
                tab_colmask.appendChild(tr_mask);
            }
            //如果同时锁定了表头和左侧的表列
            if((thlock!=null&&thlock==1)&&(collock!=null&&collock>0))
            {
                arr_lock.push(["div_thmask3",1,0]);
                var div_thmask=document.createElement("div");
                div_thmask.className="div_mask2";
                div_thmask.id="div_thmask3";
                div_thmask.style.zIndex="250";
                var div_parent=document.getElementById(obj).parentNode;
                div_thmask.style.top=(compPos2(div_table).top-parseInt(div_table.style.height.split("p")))+"px";//定位添加的遮罩层
                div_thmask.style.left=compPos2(div_table).left+"px";
                div_thmask.style.width="4000px";
                div_thmask.style.height="42px";


                var tab_thmask= document.createElement("table");
                tab_thmask.style.backgroundColor="#ffffff";
                var tr_thmask=document.createElement("tr");
                att5.InsertaTHStr(tr_thmask, "第"+(pages+1) + "页","50px");//IE8中缺少参数会报错
                for (var k = 0; k < (collock-1); k++)
                {
                    att5.InsertaTHStr(tr_thmask, data[1][k],(data[3][k]+"px"));
                }
                tab_thmask.appendChild(tr_thmask);
                div_thmask.appendChild(tab_thmask);
                div_parent.appendChild(div_thmask);
            }
            if(color==null)//默认使用间隔色
            {
                color=1;
            }
            //如果这是一个单窗口多页面表格系统则还需要一个全局变量保存每个页面中的翻页情况，如果是单窗口单页面表格则不需要了
            //dataObj3[tab_no_now] = pages;//表示第几个表翻到第几页
            if (rows > 0)//默认必须要分页
            {
                var count=0;//标记经过了几个没有数据源的列，存在按钮等不填写源数据的列时，data[2]会比data[l]长，为了让后面的类型和数据对应上，应该用m减去count！
                for (var l = 4 + pages * rows; l < data.length && (l - pages * rows) < rows + 4; l++)
                {
                    //dataObj2.push(data[l]);
                    count=0;//绘制每一行时都把标记数设为0，其后每检测到一个标记就+1，data[l][m+count]从数据源取数
                    var tr2 = document.createElement("tr");//填写一个表行
                    var tr_mask = document.createElement("tr");//准备给遮罩层用
                    if (l % 2 == 0&&color==1)//偶数的数据行显示为浅灰色
                    {
                        tr2.style.backgroundColor = "#eeeeee";
                        tr_mask.style.backgroundColor = "#eeeeee";
                    }
                    att5.InsertaTDPick(tr2, l - 3 + "");//这个是序号
                    att5.InsertaTDPick2(tr_mask, l - 3 + "",id);//遮罩层的序号

                    for (var m = 0; m < data[2].length; m++)//一行中的一个单元格，这里可能有多种变化
                    {//根据数据源的第三个元素中存储的DOM信息，为数据的每一列设置不同的控件类型！！！！
                        try
                        {
                            if (data[2][m] == "str") //简单的字符类型，要限制下宽度！
                            {
                                att5.InsertaTDStr(tr2, data[l][m - count],(data[3][m]+"px"));
                                if(collock!=null&&collock>0&&(m+1)<collock)
                                {
                                    att5.InsertaTDStr(tr_mask, data[l][m - count],(data[3][m]+"px"));
                                }
                            }
                            else if (data[2][m] == "none")//不显示的字符类型
                            {
                                var td = document.createElement("td");
                                td.appendChild(document.createTextNode(data[l][m - count]));
                                td.style.display = "none";
                                tr2.appendChild(td);
                                if(collock!=null&&collock>0&&(m+1)<collock)
                                {
                                    tr_mask.appendChild(td.cloneNode(true));
                                }
                            }
                            else if(data[2][m][0] == "switch")//不同的数据对应不同的显示值，如“1”对应“生效”
                            {
                                for (var i = 1; i < data[2][m].length; i++)
                                {
                                    if (data[2][m][i][0] == data[l][m - count])
                                    {
                                        att5.InsertaTDStr(tr2, data[2][m][i][1],(data[3][m]+"px"));
                                        if(collock!=null&&collock>0&&(m+1)<collock)
                                        {
                                            att5.InsertaTDStr(tr_mask, data[2][m][i][1],(data[3][m]+"px"));
                                        }
                                        break;
                                    }
                                    else if (i == data[2][m].length - 1) //如果没有显示值则显示原值
                                    {
                                        att5.InsertaTDStr(tr2, data[l][m - count],(data[3][m]+"px"));
                                        if(collock!=null&&collock>0&&(m+1)<collock)
                                        {
                                            att5.InsertaTDStr(tr_mask, data[l][m - count],(data[3][m]+"px"));
                                        }
                                    }
                                }
                            }
                            else if (data[2][m][0] == "input")//这个单元格可以被编辑
                            {
                                var td1 = document.createElement("td");
                                //td1.style.width = data[2][m][2];
                                td1.style.width =(data[3][m]+"px");
                                var input1 = document.createElement("input");
                                input1.type="text";
                                input1.className = data[2][m][1];//类名
                                input1.style.border = 0;
                                input1.style.width = data[2][m][2];//控件宽度
                                input1.style.textAlign = "center";
                                input1.style.backgroundColor="transparent";
                                input1.value = data[l][m - count];//显示原来未修改之前的值
                                /*input1.onchange = function ()//1.把修改写入暂存数组，2.把修改写入日志数组，3.单元格的样式变化
                                {
                                    var evt = evt || window.event;
                                    cancelPropagation(evt);//发现如果不阻断事件，会引发button1的click相应！！？？
                                    var obj=evt.currentTarget?evt.currentTarget:evt.srcElement;//被点击的obj
                                    PushLog(obj,"update");//将这一个obj的变化存入log
                                    //dataObj2[parseInt(this.parentNode.parentNode.firstChild.innerHTML)%150-1][parseInt(this.className.split("*")[1])]=this.value;
                                    //this.style.color = "#ff0000";//被修改的单元格设为红色
                                };*/
                                for (var i = 3; i < data[2][m].length; i++) {
                                    input1.setAttribute(data[2][m][i][0], data[2][m][i][1]);
                                }
                                td1.appendChild(input1);
                                tr2.appendChild(td1);
                                if(collock!=null&&collock>0&&(m+1)<collock)
                                {
                                    tr_mask.appendChild(td1.cloneNode(true));
                                }
                            }
                            else if (data[2][m][0] == "select")//单元格是一个下拉框
                            {
                                var td2 = document.createElement("td");
                                //td2.style.width = "100px";
                                td2.style.width=(data[3][m]+"px");
                                var select = document.createElement("select");
                                select.className = data[2][m][1];
                                select.style.width = "100px";
                                select.selectedIndex=0;
                                for (var i = 0; i < data[2][m][2].length; i++)
                                {
                                    var option = document.createElement("option");
                                    option.innerHTML = data[2][m][2][i][0];
                                    if(data[2][m][2][i][1]) {//如果有的话也不介意设置一个value
                                        option.value = data[2][m][2][i][1];
                                    }
                                    select.appendChild(option);
                                    if(data[2][m][2][i][1]==data[l][m - count])
                                    {
                                        option.selected="selected";
                                    }
                                }
                                listenEvent(select,"change",select_onchange);
                                select.datachange=data[2][m][3];
                                function select_onchange()
                                {
                                    var evt = evt || window.event;
                                    cancelPropagation(evt);//发现如果不阻断事件，会引发button1的click相应！！？？
                                    var obj=evt.currentTarget?evt.currentTarget:evt.srcElement;
                                    //dataObj2[parseInt(this.parentNode.parentNode.firstChild.innerHTML)%150-1][parseInt(this.className.split("*")[1])]=this.value;
                                    eval(obj.getAttribute("datachange"));
                                }
                                /*select.onchange=function()
                                {
                                    var evt = evt || window.event;
                                    cancelPropagation(evt);//发现如果不阻断事件，会引发button1的click相应！！？？
                                    //dataObj2[parseInt(this.parentNode.parentNode.firstChild.innerHTML)%150-1][parseInt(this.className.split("*")[1])]=this.value;
                                    eval(data[2][m][3]);
                                }*/
                                td2.appendChild(select);
                                tr2.appendChild(td2);
                                if(collock!=null&&collock>0&&(m+1)<collock)
                                {
                                    tr_mask.appendChild(td2.cloneNode(true));
                                }
                            }
                            else if (data[2][m][0] == "check")//单元格是一个单选框
                            {
                                var td3 = document.createElement("td");
                                td3.style.width=(data[3][m]+"px");
                                var check = document.createElement("input");
                                check.setAttribute("type", "checkbox");
                                check.className = data[2][m][1];
                                check.style.height="15px";
                                check.style.width="15px";
                                if (data[2][m][2] == "0")//这里设置了两种默认情况
                                {
                                    check.checked = false;
                                }
                                else {
                                    check.checked = true;
                                }
                                if (data[l][m - count] == "1")//实际情况
                                {
                                    check.checked = true;
                                }
                                td3.appendChild(check);
                                tr2.appendChild(td3);
                                if(collock!=null&&collock>0&&(m+1)<collock)
                                {
                                    tr_mask.appendChild(td3.cloneNode(true));
                                }
                            }
                            else if (data[2][m][0] == "button")//单元格是一个按钮
                            {
                                var td4 = document.createElement("td");
                                td4.style.width = (data[3][m]+"px");
                                var button = document.createElement("button");
                                button.className = data[2][m][1];
                                button.innerHTML = data[2][m][2];
                                button.style.width = data[2][m][3];
                                button.style.position = "static";//这里如果是absolute反而会坏事！
                                //button.style.top="0px";
                                //button.style.left="0px";
                                for (var i = 4; i < data[2][m].length; i++) {
                                    button.setAttribute(data[2][m][i][0], data[2][m][i][1]);
                                }
                                td4.appendChild(button);
                                tr2.appendChild(td4);
                                count++;
                                if(collock!=null&&collock>0&&(m+1)<collock)
                                {
                                    tr_mask.appendChild(td4.cloneNode(true));
                                }
                            }
                            else if (data[2][m][0] == "a")//单元格是一个超链接
                            {
                                var td5 = document.createElement("td");
                                td5.style.width = (data[3][m]+"px");
                                var a = document.createElement("a");
                                a.innerHTML = data[l][m - count];
                                a.className = data[2][m][1];//超链接的类名
                                a.style.position = "static";//这里如果是absolute反而会坏事！
                                for (var i = 2; i < data[2][m].length; i++) {//通过循环可以给这个链接添加不定个数的属性，包括href和事件属性
                                    a.setAttribute(data[2][m][i][0], data[2][m][i][1]);
                                }
                                td5.appendChild(a);
                                tr2.appendChild(td5);
                                if(collock!=null&&collock>0&&(m+1)<collock)
                                {
                                    tr_mask.appendChild(td5.cloneNode(true));
                                }
                            }
                            else if (data[2][m][0] == "open")//单元格是一个锚点链接，点击之后在DOM中打开一个mod，单元格内的内容由自定义的函数返回值决定！！！！
                            {
                                var td5 = document.createElement("td");
                                td5.style.width = (data[3][m]+"px");
                                var a = document.createElement("a");
                                a.innerHTML = eval((data[2][m][2]+"('"+data[l][m - count]+"')"));//data[l][m - count];
                                a.data=data[l][m - count];//把原始信息也保留下来
                                a.title=data[l][m - count];
                                a.className = data[2][m][1];//超链接的类名
                                a.style.position = "static";//这里如果是absolute反而会坏事！
                                for (var i = 3; i < data[2][m].length; i++) {//通过循环可以给这个链接添加不定个数的属性，包括href和事件属性
                                    a.setAttribute(data[2][m][i][0], data[2][m][i][1]);
                                }
                                td5.appendChild(a);
                                tr2.appendChild(td5);
                                if(collock!=null&&collock>0&&(m+1)<collock)
                                {
                                    tr_mask.appendChild(td5.cloneNode(true));
                                }
                            }
                            else if (data[2][m][0] == "mod")//单元格是一个小模块
                            {
                                var td5 = document.createElement("td");
                                td5.innerHTML=document.getElementById(data[2][m][1]).innerHTML;
                                //td5.innerHTML=$("#"+data[2][m][1])[0].innerHTML;//这个库尽量保持原生
                                tr2.appendChild(td5);
                                count++;
                                if(collock!=null&&collock>0&&(m+1)<collock)
                                {
                                    tr_mask.appendChild(td5.cloneNode(true));
                                }
                            }
                        }
                        catch(e)
                        {
                            att5.InsertaTDStr(tr2,"ERROR!",(data[3][m]+"px"));
                            if(collock!=null&&collock>0&&(m+1)<collock)
                            {
                                att5.InsertaTDStr(tr_mask,"ERROR!",(data[3][m]+"px"));
                            }
                            continue;//如果这个单元格出了问题
                        }
                    }
                    data_table.appendChild(tr2);
                    if(collock!=null&&collock>0)
                    {
                        tab_colmask.appendChild(tr_mask);
                    }
                }
                if(collock!=null&&collock>0) {
                    div_table.appendChild(tab_colmask);
                }
            }
        return totalpages;
    },
    AdjustWidth:function()
    {
        if(document.getElementById("div_thmask"))
        {
            var ths_mask = document.getElementById("div_thmask").getElementsByTagName("th");
            var ths = document.getElementById("tab_data").getElementsByTagName("th");
            if (ths[0].offsetWidth) {
                var leng = ths.length;
                for (var i = 0; i < leng; i++) {
                    try {
                        ths_mask[i].style.width = (ths[i].offsetWidth - 3) + "px";
                    }
                    catch (e) {
                        //i--;
                        continue;
                    }
                }
                if (document.getElementById("div_thmask3")) {
                    var div_thmask3 = document.getElementById("div_thmask3").getElementsByTagName("th");
                    var leng2 = div_thmask3.length;
                    for (var i = 0; i < leng2; i++) {
                        div_thmask3[i].style.width = (ths[i].offsetWidth - 3) + "px";
                    }
                }
                if (document.getElementById("tab_mask2"))
                {
                    var trs_mask = document.getElementById("tab_mask2").getElementsByTagName("tr");
                    var trs = document.getElementById("tab_data").getElementsByTagName("tr");
                    var leng3 = trs.length;
                    for (var i = 1; i < leng3; i++)
                    {
                        trs_mask[i].style.height =(trs[i].offsetHeight)+"px";
                    }
                }
            }
            else {
                requestAnimFrame(function () {
                    att5.AdjustWidth()
                });
            }
        }
    },
    ChangePage:function(flag,obj,id,left,top,data,rows,color,thlock,collock)
    {
        document.body.style.cursor='wait';
        switch(flag)//不同的翻页动作对应不同的页号处理
        {
            case "0":
            {
                pages=-1;
                break;
            }
            case "+":
            {
                pages++;
                break;
            }
            case "-":
            {
                pages--;
                break;
            }
            case "9999":
            {
                pages=9999;
                break;
            }
        }
        document.getElementById('t_page_span').innerHTML=att5.ArrayToTable5(obj,id,left,top,data,rows,pages,color,thlock,collock);
        AdjustColor();
        document.getElementById('c_page_span').innerHTML=pages+1;
        document.body.style.cursor='default';
        requestAnimFrame(function(){att5.AdjustWidth()});
    }

};



