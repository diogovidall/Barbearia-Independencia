
function obterDadosGraficos() {
  obterDadosGrafico();
  // plotarGraficoClassificacoes();
}

setTimeout(() => {
  obterDadosGrafico();
}, 1000);


function obterDadosGrafico() {
// Fazendo conexão do back-end com o front-end
  fetch(`/medidas/ultimas`).then(function (response) {

    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        plotarGrafico(resposta);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })

  // Bloco de teste para caso não seja obtido nenhum dado
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGrafico(resposta) {

  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [{
      label: 'Clientela',
      data: [],
      borderWidth: 3,
      fill: false,
      borderColor: '#9a9a9a',
      tension: 0.1
    }],
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }

  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    labels.push(registro.mes);
    dados.datasets[0].data.push(registro.totalClientes);
  }

  // Criando estrutura para plotar gráfico - config
  const config = {
    type: 'line',
    data: dados,
  };

  // Adicionando gráfico criado em div na tela
  let myChart = new Chart(
    document.getElementById('dashboard'),
    config
  );

};


function inserirNovaClientela() {

  var mesVar = document.getElementById("escolhaMes").value;
  var qtdClientesVar = document.getElementById("input_clientela").value;

  verClientela()

  fetch("/medidas/inserirClientela", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          mesServer: mesVar,
          qtdClientesServer: qtdClientesVar,
      })
  }).then(function (resposta) {
      if (resposta.ok) {
          console.log(resposta);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Valores Inseridos com Sucesso!',
            background: '#181818',
            color: 'white',
            showConfirmButton: false,
            timer: 1500
          })

          
      } else {
          throw new Error("Houve um erro ao inserir os dados!");
      }
  }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
  });

  return false;
}
