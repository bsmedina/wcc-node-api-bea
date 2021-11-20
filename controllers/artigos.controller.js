const database = require("../models");
const tabelaArtigos = database.artigos;

//Cria novo artigo
exports.create = (req, res) => {
    const { titulo, descricao, publicado } = req.body;
    const artigo = {
        titulo,
        descricao,
        publicado
    };

    if(!artigo.titulo) {
        return res
            .status(400)
            .send("O artigo precisa conter ao menos o título definido")
    }

    tabelaArtigos.create(artigo)
    .then(() => res.send("Artigo criado com sucesso"))
    .catch(() => res.status(500).send("Ocorreu um erro ao salvar o artigo!"))
};

exports.findAll = (req, res) => {

    const buscarArtigos = tabelaArtigos.findAll()
    .then((data) => res.send(data))
    .catch(() => res.status(500).send("Ocorreu um erro ao obter os artigos!"))

};

exports.findById = (req, res) => {
    const { id } = req.params;

    if(!id) {
        return res
            .status(400)
            .send({ message: "Não foi possível buscar o artigo, pois o id não foi informado"})
    }

    tabelaArtigos.findByPk(id)
    .then((id) => {
        if(id) {
            res.send(id);
        }else {
            res.status(404).send({
                message: `Não foi possível encontrar um artigo com o id= ${id}.`
            })
        }
    })
    .catch(() => res.status(500).send("Erro obtendo artigo com id=" + id))
};

exports.findOne = (req, res) => {
    const { titulo } = req.query;

    if(!titulo) {
        return res
            .status(400)
            .send({ message: "Não foi possível buscar o artigo, pois o titulo não foi informado"})
    }

    tabelaArtigos.findOne({
        where: {
            titulo
        }
    })
    .then((titulo) => {
        if(titulo) {
            res.send(titulo);
        }else {
            res.status(404).send({
                message: `Não foi possível encontrar este artigo.`
            })
        }
    })
    .catch(() => res.status(500).send("Erro obtendo artigo"))
}

const desestruturaObj = () => {
    const objExemplo = { id: 1};

    //renomear por desestruturaçao
    const { id: idObj} = objExemplo;

    //atribuir valor por desestruturaçao
    const { name = "N/A"} = objExemplo;
}