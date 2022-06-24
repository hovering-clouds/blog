// https://zeit.co/blog/async-and-await
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
/*#################*/
/* constant value  */
/*#################*/
const cvs = document.querySelector("#live2d");
const box = document.querySelector("#textbox");
const text = document.querySelector("#saytext span");
const textbar = document.querySelector("#saytext");
const url = "/blog/js/saying.json";
let articles = null;
let timer = null;//用于取消延迟任务的ID值
let hover = false;

function say_init(){
    cvs.style.cursor = 'grab';
    cvs.addEventListener("click",handler_say);
    textbar.addEventListener("mouseenter",handler_mouseenter);
    textbar.addEventListener("mouseleave",handler_mouseleave);
    // 载入json
    var request = new XMLHttpRequest();
    // 设置请求方法与路径
    request.open("get", url);
    // 不发送数据到服务器
    request.send(null);
    //XHR对象获取到返回信息后执行
    request.onload = function(){
        // 返回状态为200，即为数据获取成功
        if(request.status == 200){
            articles = JSON.parse(request.responseText);
        }
        else{
            console.log("error:"+request.status+this.responseText);
        }
    }
}

say_init();

/*################*/
/*   helper func  */
/*################*/

function change_content(group) {
    if(articles==null){return;}
    while(text.lastElementChild!=null){
        text.removeChild(text.lastElementChild);
    }
    //更新span元素内容
    let anchor = document.createElement("a");
    text.textContent = randomChoose(articles[group].text);
    if(group==0){ //选择一篇文章并且生成推荐文字
        let item = randomChoose(articles[group].list);
        anchor.setAttribute("href",item.link);
        anchor.style.color = "#FF88C2";
        anchor.textContent = item.title;
        text.appendChild(anchor);
    }

}

function handler_say(event) {
    clearTimeout(timer);
    change_content(randomNum(0,1));
    box.style.opacity=0.9;
    timer = setTimeout(()=>{
        if(!hover){
            box.style.opacity=0;
        }
    },2000);
    //sleep(2000).then(()=>{
    //    if(!hover){
    //        box.style.opacity=0;
    //    }
    //});
}
function handler_mouseenter(event){
    hover = true;
}
function handler_mouseleave(event){
    hover = false;
    box.style.opacity=0;
}
/** 随机选取数组中的元素 */
function randomChoose(array) {
    let len = array.length;
    return array[randomNum(len-1)];
}
/** 生成从minNum到maxNum的随机数
 * 只输入第一个参数，表示[0,minNum]之间的随机数
 * 输入两个参数，表示[minNum,maxNum]之间的随机数
 * @param minNum
 * @param maxNum
 */
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return Math.floor(Math.random()*(minNum+1)); 
        break; 
        case 2: 
            return Math.floor(Math.random()*(maxNum-minNum+1)+minNum); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}
function randomBoolean(){
    return Math.random()>0.5;
}