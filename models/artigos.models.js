module.exports = (sequelizeDatabase, Sequelize) => {
    
    const Artigo = sequelizeDatabase.define("artigos", {
        titulo: {
            type: Sequelize.STRING
        },
        descricao: {
            type: Sequelize.STRING
        },
        publicado: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return Artigo;
};