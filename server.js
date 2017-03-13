const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;
let playerList = [];

app.use(express.static('public'));

io.on('connection', (socket) => 	{


	let currentPlayer = {
		name: 'unknown'
	};

  console.log('a user connected');
  
  // broadcastPlayerList();

  socket.on('disconnect', () => {
    console.log('user disconnected');

    socket.emit('pingBack');
  });


  socket.on('position', (data) => {

  	console.log('update position', data);
  });

  socket.on('signup', (data) => {
  	
  	playerList.push(data);

  	broadcastPlayerList();
  });
});

let broadcastPlayerList = () => {
	console.log('sending player list');
	io.emit('playerList', playerList);
}

http.listen(PORT, () => {
	console.log(`listening on *:${PORT}`);
});