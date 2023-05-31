var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.post("/inserirClientela", function (req, res){
    medidaController.inserirClientela(req, res)
});

module.exports = router;