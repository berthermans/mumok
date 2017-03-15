const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

let playerList = {};
let avatarData = {
	name: 'avatar'
};
let artData = {};

app.use(express.static('public'));

io.on('connection', (socket) => {

  console.log('a user connected');

	var clientID = socket.client.id;

  broadcastPlayerList();
  broadcastAvatar();
  broadcastArt();

  socket.on('avatarInit', (positionData) => {
  	console.log('avatar connected!');
  	console.log(positionData);

  	avatarData.coordinates = positionData;

  	broadcastAvatar();
  });

  socket.on('artInit', (positionData) => {
  	console.log('art piece connected!');
  	console.log(positionData);

  	var name = 'art' + Math.random() * 100;

  	artData[name] = {
  		name: name,
  		coordinates: positionData
  	}

  	broadcastArt();
  });

  socket.on('move', (direction) => {
  	
  	console.log(direction);
  	io.emit('avatarMove', {direction: direction});
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');

    // Remove player from list on disconnect
    if(playerList.hasOwnProperty(clientID)){
    	delete playerList[clientID];

    	broadcastPlayerList();
    }
  });


  socket.on('position', (positionData) => {
  	// console.log(positionData);
  	// 
  	avatarData.coordinates = positionData;
  	broadcastAvatar();
  });

  socket.on('signup', (signupData) => {
  	
  	playerList[clientID] = signupData;

  	broadcastPlayerList();
  });
});

let broadcastAvatar = () => {
	console.log('Sending coordinates of avatar');
	io.emit('avatar', avatarData);
}

let broadcastArt = () => {
	console.log('Sending coordinates of art');
	io.emit('art', artData);
}

let broadcastPlayerList = () => {
	console.log('sending player list');
	io.emit('playerList', playerList);
}

http.listen(PORT, () => {
	console.log(`listening on *:${PORT}`);
});