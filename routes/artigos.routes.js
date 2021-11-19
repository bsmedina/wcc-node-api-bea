module.exports = (app) => {
    const artigosController = require("../controllers/artigos.controller");
    let router = require("express").Router();

    router.get("/", artigosController.findAll);
    router.get("/:id", artigosController.findOne);
    router.post("/", artigosController.create);

    app.use("/artigos", router);
}