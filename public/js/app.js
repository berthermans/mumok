var socket = io();

var $playerList = $('#playerList');
var $playerNameInput = $('#playerNameInput');
var $playerNameSubmit = $('#playerNameSubmit');
var $pieces = $("#pieces");
var $avatar = $("#avatar");

var artNames = {};

var scaler = 7;

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

socket.on('avatar', function(data){

	console.log(data);

	var avatarX = data.coordinates.position[0] * scaler;
	var avatarY = data.coordinates.position[1] * scaler * -1;

	setPosition($avatar, avatarX, avatarY);

	/*var $piece = $(document.createElement('div'));
	$piece.addClass('piece');
	$piece.addClass(data.name);



	$pieces.append($piece);
	console.log(data);*/

});

socket.on('art', function(data){

	Object.keys(data).forEach(function(key, index){

		var artX = data[key].coordinates.position[0] * scaler;
		var artY = data[key].coordinates.position[1] * scaler * -1;

		$art = $(document.createElement('div'));
		$art.addClass('piece');
		$art.addClass('art');
		$pieces.append($art);

		setPosition($art, artX, artY);

	});



	/*var $piece = $(document.createElement('div'));
	$piece.addClass('piece');
	$piece.addClass(data.name);



	$pieces.append($piece);
	console.log(data);*/

});

$('.moveBtn').each(function(btn){

	var $btn = $(this);
	var direction = $btn.data('direction');

	$btn.on('click', function(){

		socket.emit('move', direction);
		console.log(direction);
	});

});

function setPosition($elem, x, y){
	$elem.css({
		transform: 'translate(' + x + 'px,' + y + 'px)'
	});
}

document.documentElement.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, false);

var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function (event) {
  var now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

document.documentElement.addEventListener('touchmove', function (event) {
    event.preventDefault();      
}, false);