<template>
  <div><canvas ref="chartCanvas"></canvas></div>
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
    const chartCanvas = ref(null);

    onMounted(async () => {
      await new Chart(chartCanvas.value, {
        type: 'pie',
        data: {
          labels: props.label,
          datasets: [
            {
              label: 'Clients',
              data: props.chartData,
              borderWidth: 1
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Clients by Zip Code In A Pie Chart'
            }
          },
          responsive: true,
          maintainAspectRatio: true
        }
      });
    });

    return {
      chartCanvas
    };
  }
};
</script>

<style scoped>
canvas {
  max-width: 400px;
  margin: auto;
}
</style>
