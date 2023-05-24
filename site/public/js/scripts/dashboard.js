const ctx = document.getElementById('dashboard');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [{
      label: 'Clientela',
      data: [1200, 900, 800, 990, 1000, 1500, 1600, 1300, 1200, 1280, 1310, 1500],
      borderWidth: 3,
      fill: false,
      borderColor: '#9a9a9a',
      tension: 0.1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});