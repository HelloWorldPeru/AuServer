module.exports =  function(app, db) {
    var muro = require('../models/chat')(db);

    app.get('/', function(req, res){
        muro.list('', function(e, coments){
            res.render('index', { title: 'Lista de comentarios', comentarios: coments});
        });
    });

    app.post('/', function(req, res) {
        muro.new({name: req.param('name'), comentario:req.param('comentario')}, function(e){
            muro.list(function(e, coments){
                res.render('index', { title: 'Lista de comentarios', comentarios: coments });
            });
        });
    });

    app.post('/comentario', function(req, res) {
        console.log('consulta del curso: '+ req.param('curso'));
        muro.list(req.param('curso'), function(e, coments) {
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.write(JSON.stringify({ mensajes: coments }));
            res.end();
        });
    });


};