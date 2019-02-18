/*
此文档为==>>核心功能分析 */

// 游戏初始化开始

// 构建一个创建div的函数,参数className 是div类名.
 function creatediv(className){
     var div = document.createElement("div");
     div.className = className;
     return div;
 }

//  创造一个<div class="row">并且有四个子节点<div class="cell">.
function createrow(){
    var con = $('con')
    var row = creatediv('row'); //用函数创建className=row 的div.
    var arr = crearecell(); // 定义div cell的类名，其中一个为cell black.

    con.appendChild(row); // 添加row 为con的子节点。
    
    for(var i = 0; i < 4; i++){
        row.appendChild(creatediv(arr[i])); //添加cell为row的子节点，cell的类名为(arr[i]).

        if(con.firstChild === null){
            con.appendChild(row); //如果con不存在子节点则插入row为其子节点。
        }else{
            con.insertBefore(row, con.firstChild); //否则将row插入为con的第一个子节点。
        }
    }

    //删除div#con 的子节点中最后的那个<div class="row">.
    function delrow(){
        var con = $('con');
        if (con.childNode.length === 6){
            con.removeChild(con.lastChild);
        }
    }
    //创建一个类名的数组，其中一个为cell black,其余为cell.
    function createcell(){
        var temp = ['cell', 'cell', 'cell','cell'];
        var i = Math.floor(Math.random()*4); // 随机生成黑块的位置。
        temp[i] = 'cell black';
        return temp;
    }
}
//  初始化 结束

//运动控制 开始
//使黑块向下移动
function move(){
    var con = $('con');
    var top = parseInt(window.getComputedStyle(con,null)['top']);

    if(speed + top > 0){
        top = 0;
    }else{
        top += speed;
    }
    con.style.top = top + 'px';

    if(top===0){
        createrow();
        con.style.top = '-1000'
        delrow();
    }else if(top === (-100 + speed)){
        var rows = con.childNode;
        if ((rows.length === 5) && (rows[rows.length-1].pass !== 1)){
            fail();
        }

    }
}
function fail(){
    clearInterval(clock);
    confirm('你最终得分为' + parseInt($('score').innerHTML));

}

// 运动控制 结束

// 点击黑块事件 开始
//判断玩家是否点击到了黑块
function judge(ev){
    if(ev.target.className.indexOf('black') != -1){
        ev.target.className = 'cell';
        ev.target.parentNode.pass = 1; //定义属性pass,表明此行row的黑块已被点击。
    }

}
//  点击黑块事件 结束