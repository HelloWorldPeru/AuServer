module.exports = function(io, db){
	/* Eventos */
	io.sockets.on('connection', function(socket){
        var muro = require('../models/chat')(db);
		console.log("Client connected");

		socket.on('message', function(curso, nick, msg) {
			sendMessage(curso, nick, msg);
		});

		var sendMessage =  function(curso, nickname, msg) {
            muro.new({curso:curso, name: nickname, comentario:msg}, function(e){
            muro.list(curso, function(e, coments){
			    io.sockets.emit('message', nickname, coments);
                });
            });
			//io.sockets.emit('message', nickname, msg);
		}
	});
}