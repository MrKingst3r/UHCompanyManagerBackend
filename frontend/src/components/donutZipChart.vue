<template>
  <div class="align-center">
    <canvas ref="zipChart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  props: {
    label: {
      type: Array
    },
    chartData: {
      type: Array
    }
  },
  setup(props) {
    const zipChart = ref(null);

    onMounted(async () => {
      await new Chart(zipChart.value, {
        type: 'doughnut',
        data: {
          labels: props.label,
          datasets: [
            {
              label: 'Clients',
              borderWidth: 1,
              data: props.chartData
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Clients by Zip Code In A Doughnut Chart'
            }
          },
          responsive: true,
          maintainAspectRatio: true
        }
      });
    });

    return {
      zipChart
    };
  }
};
</script>
