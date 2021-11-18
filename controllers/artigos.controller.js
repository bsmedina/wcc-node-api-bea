const { response } = require("express");
const database = require("../models");
const tabelaArtigo = database.artigos;

//Cria novo artigo
exports.create = (req, res) => {

    const artigo = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        publicado: req.body.publicado
    };

    tabelaArtigo.create(artigo)
    .then(() => response.send("Artigo criado com sucesso"))
    .catch(() => response.status(500).send("Ocorreu um erro ao salvar o artigo!"))
};