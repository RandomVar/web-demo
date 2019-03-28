var app=require('http').createServer();
var io=require('socket.io')(app);
var PORT=8081;
app.listen(PORT);
io.on('connection',function(socket){
  var username = null;
  socket.on('login',function(data){
    console.log(data)
    username = data.username
    socket.emit('loginSuccess',data)
    io.sockets.emit('add',data)
  })
  socket.on('disconnect',function(){
    io.sockets.emit('leave',username)
  })
  socket.on('sentMessage',function(data){
    io.sockets.emit('receiveMessage',data)
  })
})
console.log('app listen at'+PORT);