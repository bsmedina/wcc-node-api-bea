const database = require("../models");
const tabelaArtigos = database.artigos;

//Cria novo artigo
exports.create = (req, res) => {

    const artigo = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        publicado: req.body.publicado
    };

    tabelaArtigos.create(artigo)
    .then(() => res.send("Artigo criado com sucesso"))
    .catch(() => res.status(500).send("Ocorreu um erro ao salvar o artigo!"))
};

exports.findAll = (req, res) => {

    const buscarArtigos = tabelaArtigos.findAll()
    .then((data) => res.send(data))
    .catch(() => res.status(500).send("Ocorreu um erro ao obter os artigos!"))
};