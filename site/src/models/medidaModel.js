var database = require("../database/config");

function buscarUltimasMedidas() {

    instrucaoSql = `select mes, totalClientes from unidadeServicos;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirClientela(mes, totalClientes){
    console.log("tamo na model", mes);
    instrucaoSql = `
        insert into unidadeServicos(fkUnidades, fkServicos, mes, totalClientes) 
        VALUES(1, 1, '${mes}', '${totalClientes}')
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    inserirClientela
}
