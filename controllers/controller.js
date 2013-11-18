module.exports = function(io){
	/* Eventos */
	io.sockets.on('connection', function(socket){
		console.log("Client connected");

		socket.on('message', function(nick, msg) {
			sendMessage(nick, msg);
		});

		var sendMessage =  function(nickname, msg) {
            //graba en mongo
            //obtiene lista del curso
            //retorna
			console.log('Recepcionando mensaje: '+msg);
			io.sockets.emit('message', nickname, msg);
		}
	});
}