window.onload=function()
{
    var cartList=[];
    var cookies=document.cookie.split('; ');
    for(var i=0;i<cookies.length;i++)
    {
        var arr=cookies[i].split('=');
        if(arr[0]==='cartlist')
        {
            cartList=JSON.parse(arr[1]);
        }
    }

    var goods=document.querySelector('.goods');
    goods.addEventListener('click',clickEvent);

function clickEvent(){
   var e=window.event;
   var target=e.target;
   if(target.tagName.toLowerCase() === 'button')
   {
       var currentLi=target.parentElement.parentElement;
       var currentElem=currentLi.children;
       var currentName=currentLi.getAttribute('data-guid');
       console.log(currentName);
       var good={};
       good.guid=currentName;
       good.qty = 1;
       good.name = currentElem[1].innerHTML;
       good.price = currentElem[2].innerHTML;
       good.imgUrl = currentElem[0].src;
        for(var i=0;i<cartList.length;i++)
        {
            if(cartList[i].guid==good.guid)
            {
                cartList[i].qty++;
                break;
            }
        }
        if(i==cartList.length)
          cartList.push(good)
       document.cookie='cartlist='+JSON.stringify(cartList);
       console.log(document.cookie);
   }
}
}
function Favor(ths){
    // ths => this => 当前触发事件的标签
    console.log(ths);
    var top = -49;
    var left = 71;
    var op = 1;
    var fontSize = 18;
    var tag = document.createElement('span');
    tag.innerText = '+1';
    tag.style.position = 'absolute';
    tag.style.top = top + "px";
    tag.style.left = left + "px";
    tag.style.opacity = op;
    tag.style.fontSize = fontSize + 'px';
    ths.parentElement.appendChild(tag);
    var interval = setInterval(function(){
        top -= 10;
        left += 10;
        fontSize += 5;
        op -= 0.1;
        tag.style.top = top + "px";
        tag.style.left = left + "px";
        tag.style.opacity = op;
        tag.style.fontSize = fontSize + 'px';
        if(op <= 0.2){
            clearInterval(interval);
            ths.parentElement.removeChild(tag);
        }
    }, 50);
}
