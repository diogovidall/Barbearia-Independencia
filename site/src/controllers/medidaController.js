var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {
    medidaModel.buscarUltimasMedidas().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function inserirClientela(req, res) {

    var mes = req.body.mesServer;
    var qtdClientes = req.body.qtdClientesServer;

    // Faça as validações dos valores
    if (mes == undefined) {
        res.status(400).send("Seu mes está undefined!");
    } else if (qtdClientes == undefined) {
        res.status(400).send("Seu qtdClientes está undefined!");
    } else {
        medidaModel.inserirClientela(mes, qtdClientes)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro em inserir um nova clientela! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


// Exportando a função para ser utilizada em outros códigos
module.exports = {
    buscarUltimasMedidas,
    inserirClientela
}