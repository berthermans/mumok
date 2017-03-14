const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;
let playerList = {};

app.use(express.static('public'));

io.on('connection', (socket) => {

  console.log('a user connected');

	var clientID = socket.client.id;

  broadcastPlayerList();


  socket.on('avatarInit', (positionData) => {
  	console.log('avatar connected!');
  	console.log(positionData);

  	broadcastCoordinates('avatar', positionData);
  });

  socket.on('artInit', (positionData) => {
  	console.log('art piece connected!');
  	console.log(positionData);

  	broadcastCoordinates('art', positionData);
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
  	console.log(positionData);
  });

  socket.on('signup', (signupData) => {
  	
  	playerList[clientID] = signupData;

  	broadcastPlayerList();
  });
});

let broadcastCoordinates = (name, coordinatesData) => {
	console.log('Sending coordinates of pieces');
	io.emit('coordinates', {
		name: name,
		coordinates: coordinatesData
	});
}

let broadcastPlayerList = () => {
	console.log('sending player list');
	io.emit('playerList', playerList);
}

http.listen(PORT, () => {
	console.log(`listening on *:${PORT}`);
});