// Select the canvas element
const ctx = document.getElementById('transportChart').getContext('2d');

// Create the chart
const transportChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Plane', 'Helicopter', 'Boat', 'Train', 'Subway', 'Bus', 'Car', 'Moto', 'Bicycle', 'Horse', 'Skateboard', 'Others'],
    datasets: [
      {
        label: 'Amazon',
        data: [400, 95, 600, 800, 500, 700, 900, 450, 500, 600, 350, 800],
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.2)',
        tension: 0 // Makes the line linear
      },
      {
        label: 'Flipkart',
        data: [300, 400, 500, 200, 600, 800, 400, 300, 700, 900, 450, 700],
        borderColor: '#facc15',
        backgroundColor: 'rgba(250, 204, 21, 0.2)',
        tension: 0 // Makes the line linear
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: '#374151' }
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: '#374151' }
      }
    }
  }
});
