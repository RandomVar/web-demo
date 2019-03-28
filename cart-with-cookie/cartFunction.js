window.onload=function()
{
  var cookies=document.cookie.split('; ');
  var cartList=[];
  console.log(cookies);
  for(var i=0;i<cookies.length;i++)
  {
      var arr=cookies[i].split('=');
      if(arr[0]==='cartlist')
      {
          cartList=JSON.parse(arr[1]);
      }
  }
  console.log(cartList);
  var subPrice = 0;
  var oCartList = document.getElementById('carList');
  var table=document.querySelector('#mytable').querySelector('tbody');
  if(cartList)
  {
    
    console.log(table);
    for(var i=0;i<cartList.length;i++)
    {
      var newRow=table.insertRow(1);
      newRow.setAttribute('data-guid',cartList[i].guid)
      var cell=[]; 
      for(var j=0;j<5;j++)
       {
         cell.push(newRow.insertCell(j));
       }
        var title = document.createTextNode(cartList[i].name);
        cell[0].appendChild(title);
        var price = document.createTextNode(cartList[i].price);
        cell[1].appendChild(price);
        var number=document.createTextNode(cartList[i].qty);
        cell[2].appendChild(number)
        var img = document.createElement('img');
        img.src = cartList[i].imgUrl;
        cell[3].appendChild(img)
        var btnClose = document.createElement('span');
        btnClose.innerHTML = '删除';
        btnClose.className = 'btn-close';
        cell[4].appendChild(btnClose);
        subPrice += cartList[i].price*cartList[i].qty;
   }
   var oSubPrice = oCartList.nextElementSibling;//返回指定元素之后的下一个兄弟元素
   oSubPrice.innerHTML = '<span class="price">' + subPrice.toFixed(2) + '</span>';
  
  }
  oCartList.addEventListener('click',deleteItem);
  function deleteItem()
  {
    var target=window.event.target;
    if(target.className === 'btn-close'){
      var currentLi=target.parentElement.parentElement;
      var currentGuid=currentLi.getAttribute('data-guid');
      for(var i=0;i<cartList.length;i++)
      {
        if(cartList[i].guid==currentGuid)
        {
          cartList.splice(i,1);
          break;
        }
      }
      document.cookie='cartlist='+JSON.stringify(cartList);
      currentLi.parentElement.removeChild(currentLi);
    }
  }
  var btnClear=document.querySelector('#btnClear');
  btnClear.onclick=function(){
    console.log(table);
    var de=table.querySelectorAll('[data-guid]');
    // var delete=table.querySelectorAll('')
    de.innerHTML = '';
    oSubPrice.innerHTML = '';
    var now=new Date();
    now.setDate(now.getDate()-7);
    document.cookie='cartlist=xx;expires=' + now;
    console.log('cookie'+document.cookie);
    location.reload();
  }
 
}