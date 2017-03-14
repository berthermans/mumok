var socket = io();

var $playerList = $('#playerList');
var $playerNameInput = $('#playerNameInput');
var $playerNameSubmit = $('#playerNameSubmit');
var $pieces = $("#pieces");

var scaler = 5;

$playerNameSubmit.on('click', function(){

	var data = {
		name: $playerNameInput.val()
	}

	socket.emit('signup', data);
});

socket.on('playerList', function(data){
  
  var list = "";

  $playerList.empty();
  Object.keys(data).forEach(function(key, index){

  	list += data[key].name;
  });

  $playerList.html(list);
});

socket.on('coordinates', function(data){

	var $piece = $(document.createElement('div'));
	var x = data.coordinates.position[0] * scaler;
	var y = data.coordinates.position[1] * scaler * -1;

	$piece.addClass('piece');
	$piece.addClass(data.name);

	$piece.css({
		transform: 'translate(' + x + 'px,' + y + 'px)'
	});

	$pieces.append($piece);
	console.log(data);

});