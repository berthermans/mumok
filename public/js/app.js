var socket = io();

var $playerList = $('#playerList');
var $playerNameInput = $('#playerNameInput');
var $playerNameSubmit = $('#playerNameSubmit');

$playerNameSubmit.on('click', function(){

	var data = {
		name: $playerNameInput.val()
	}

	socket.emit('signup', data);
});

socket.on('playerList', function(data){
  $playerList.html(data.map(function(player, index){
  	return player.name
  }).join('<br/>'));
});