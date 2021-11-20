module.exports = (app) => {
    const artigosController = require("../controllers/artigos.controller");
    let router = require("express").Router();

    router.get("/", artigosController.findAll);
    router.get("/buscar/:id", artigosController.findById);
    router.get("/buscar", artigosController.findOne);
    router.get("/artigosPublicados", artigosController.publishedArticles);
    router.put("/atualizar/:id", artigosController.update);
    router.post("/", artigosController.create);
    router.delete("/", artigosController.deleteAll);
    router.delete("/:id", artigosController.delete);

    app.use("/artigos", router);
}