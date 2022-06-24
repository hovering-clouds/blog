const imglist = document.querySelectorAll("img");
for(var ind=0;ind<imglist.length;ind++){
    let img = imglist[ind];
    img.setAttribute("retry",0);
    img.onerror=(e)=>{reloadimg(img);};
}

function reloadimg(img) {
  let retry = parseInt(img.getAttribute("retry"));
  // 开启一个定时器,这里每1500ms执行一次
  let timer = setTimeout(() => {
    // 如果重试次数大于3
    if (retry > 0) {
      console.log("连接失败");
      // 图片使用占位图片url
      img.src =
        "https://oktools.net/ph/800x400?t=图片太帅，无法显示"; // 存在的图片地址
      // 清除定时器
      clearTimeout(timer);
    } else {
      // 重试次数在规定内
      console.log("重试次数", retry+1);
      // 计数器+1
      retry += 1;
      img.setAttribute("retry", retry);
      img.setAttribute("src",img.src); //重新加载
    }
  }, 1500);
}
