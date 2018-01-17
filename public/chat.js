// Make connection

var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//Emit event

btn.addEventListener('click',function(){
  socket.emit("chat",{
  message: message.value,
  handle: handle.value
  });
});

message.addEventListener('keypress',function(){
  socket.emit('typing', handle.value);
});

//Listen for events
socket.on('chat',function(data){
  feedback.innerHTML = "";
  message.value = "";
  var str = '<p><span class="mdl-chip mdl-chip--contact"><span class="mdl-chip__contact mdl-color--teal mdl-color-text--white">' + data.handle.substring(0,2) + '</span><span class="mdl-chip__text">' + data.message +'</span></span></p>';
  output.innerHTML += str;
//output.innerHTML += '<p><strong>' + data.handle + ' : </strong>' + data.message + '</p>';
});

socket.on('typing',function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
