const express = require("express");
const app= express();
const port = 8080;

app.use(express.json());

app.get("/", function(req,res) {
    res.send("Minha primeira requisição")
});

app.get("/segunda-req", function(req,res) {
    res.send("Minha segunda requisição")
});

app.get("/com-parametros", function(req,res) {
    if (req.query.nome === "Beatriz") {
        res.send("Beatriz chamou requisição")
    }

    res.send("Com parametros funciona! Sabadou " + req.query.nome + " " + req.query.sobrenome);
});

app.post("/meu-primeiro-post", (req, res) => {
    console.log(req.body);
    res.send("Meu primeiro post")
});

app.put("/meu-primeiro-put/:id", (req, res) => {
    console.log(req.body, req.params.id);

    res.send("Meu put funciona");
});

app.delete("/meu-primeiro-delete/:id", (req, res) => {
    console.log(req.params.id);
    res.send("Meu delete funciona " + req.params.id);
});

app.listen(port, function() {
    console.log("Ouvindo a porta: ", port);
})