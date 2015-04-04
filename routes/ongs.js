var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ongs/ongs', { title: 'ONG\'s'});
});

/* GET OngList page. */
router.get('/onglist', function(req, res) {
    var db = req.db;
    var collection = db.get('ongcollection');
    collection.find({},{},function(e,docs){
        res.render('ongs/onglist', {
            "onglist" : docs, title: 'ONG\'s Cadastradas'
        });
    });
});


/* GET NovaOng page. */
router.get('/novaong', function(req, res) {
    res.render('ongs/novaong', { title: 'Cadastrar ONG' });
});

/* POST to Add User Service */
router.post('/addong', function(req, res) {

    // Set variavel interna do DB
    var db = req.db;

    // Get valores do formulário
    var ongNome = req.body.nome;
    var ongEmail = req.body.email;
    var ongTelefone = req.body.telefone;
    var ongArea = req.body.area;

    // Setar a coleção
    var collection = db.get('ongcollection');

    // Enviar para o DB
    collection.insert({
        "nome" : ongNome,
        "email" : ongEmail,
        "telefone" : ongTelefone,
        "area" : ongArea
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // Se funcionar, não aparecerá o local /addong na barra do navegador
            res.location("/ongs/onglist");
            // E irá redirecionar para a página a seguir
            res.redirect("/ongs/onglist");
        }
    });
});

module.exports = router;
