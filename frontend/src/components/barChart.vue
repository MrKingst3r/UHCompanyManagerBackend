<template>
  <div>
    <canvas class="p-10" ref="attendanceChart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Chart, registerables, Colors } from 'chart.js';

export default {
  props: {
    label: {
      type: Array
    },
    chartData: {
      type: Array
    }
  },
  setup(props, context) {
    const attendanceChart = ref(null);

    onMounted(async () => {
      const chartInstance = await new Chart(attendanceChart.value, {
        type: 'bar',
        data: {
          labels: props.label,
          datasets: [
            {
              borderWidth: 1,
              data: props.chartData
            }
          ]
        },
        options: {
          scales: {
            y: {
              ticks: {
                stepSize: 1
              }
            },
            x: {
              gridLines: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Attendance Chart'
            }
          },
          responsive: true,
          maintainAspectRatio: true
        }
      });
      context.emit('chartInstance', chartInstance);
    });

    return {
      attendanceChart
    };
  }
};
</script>
