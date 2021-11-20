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

exports.publishedArticles = (req, res) => {

    tabelaArtigos.findAll({
        where: { publicado: true }
    })
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({
        message:
            "Não foi possível encontrar os artigos publicados"
        })
    );
};

exports.update = (req, res) => {
    const updates = req.body;

    const { id } = req.params;

    const query = {
        where: { id },
        returning: true
    };

    tabelaArtigos.update(updates, query)
        .then((data) => {
            const linhasAtualizadas = data[0];
            const artigoAtualizado = data[1];

            if (linhasAtualizadas === 0) {
                res.status(404).send("Não foi encontrado nenhum registro para ser atualizado");
            } 
            
            return res.send(artigoAtualizado);
        })
        .catch(() => res.status(500).send("Ocorreu um erro ao atualizar o artigo, tente novamente!"))
}

exports.deleteAll = (req, res) => {

    tabelaArtigos.destroy({ where: {}, truncate: false }) // Truncate só limpa as linhas sem deletar a estrutura de colunas da tabela
        .then((itensDeletados) => {
            return res.send("Foram deletados " + itensDeletados + " artigos")
        })
        .catch(() => res.status(500).send("Ocorreu um erro ao deletar os artigos"))
}

exports.delete = (req, res) => {
    const {id} = req.params;

    tabelaArtigos.destroy({where: {id}, truncate: false})
        .then((itemDeletado) => {
            return res.send("O artigo de id: " + id + " foi deletado com sucesso!")
        })
        .catch(() => res.status(500).send("Ocorreu um erro ao deletar o artigo"))
}

/* const desestruturaObj = () => {
    const objExemplo = { id: 1};

    //renomear por desestruturaçao
    const { id: idObj} = objExemplo;

    //atribuir valor por desestruturaçao
    const { name = "N/A"} = objExemplo;
} */