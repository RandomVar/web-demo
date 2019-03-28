$(function(){
  var socket=io('ws://localhost:8081');
  var uname=null;
  $('.login-btn').click(function(){
    uname=$.trim($('#loginName').val());
    if(uname){
      socket.emit('login',{username:uname})
    }
    else{
      alert('请输入昵称')
    }
  })
  socket.on('loginSuccess',function(data){
    checkin(data);
  })
  socket.on('add',function(data){
    var html = '<p>系统消息:'+data.username+'已加入群聊</p>';
        $('.chat-con').append(html);
  })
  socket.on('leave',function(name)
  {
    if(name != null){
      var html = '<p>FBI warning:'+name+'已退出群聊</p>';
      $('.chat-con').append(html);
  }
  })
  function checkin(data){
    $('.login-wrap').hide('slow');
    $('.chat-wrap').show('slow');
}
$('.sendBtn').click(function(){
  sendMessage()
});
$(document).keydown(function(event)
{
  if(event.keyCode==13){
    sendMessage()
  }
})
function sendMessage(){
  var txt=$('#sendtxt').val()
  $('#sendtxt').val('')
  if(txt){
    socket.emit('sentMessage',{username:uname,message:txt})
  }
}
socket.on('receiveMessage',function(data){
  showMessage(data)
})
function showMessage(data){
  var html
  if(data.username === uname){
    html = '<div class="chat-item item-right clearfix"><span class="img fr"></span><span class="message fr">'+data.message+'</span></div>'
}else{
    html='<div class="chat-item item-left clearfix rela"><span class="abs uname">'+data.username+'</span><span class="img fl"></span><span class="fl message">'+data.message+'</span></div>'
}
$('.chat-con').append(html);
} 
})