module.exports =  function(app) {
    //var muro = require('../models/chat')(db);

    app.get('/', function(req, res){
        res.render('index', { title: 'Lista de comentarios'});
    });

};