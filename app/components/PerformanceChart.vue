<script setup lang="ts">
import type { ChartData } from 'chart.js'
import { Line } from 'vue-chartjs'

const data = ref<ChartData<'line'>>({
  labels: ['25/06', '26/06', '27/06', '28/06', '29/06', '30/06', '01/07'],
  datasets: [
    {
      label: 'Chute de Pommes',
      borderColor: '#2b7fff',
      backgroundColor: '#2b7fff',
      tension: 0.4,
      data: [68, 75, 70, 73, 71, 74, 73]
    },
    {
      label: 'Petit Chef',
      borderColor: '#ff6900',
      backgroundColor: '#ff6900',
      tension: 0.4,
      data: [60, 77, 71, 69, 76, 75, 76]
    }
  ]
})
</script>

<template>
  <div class="flex-1">
    <Line
      :data="data"
      :options="{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }"
    />
  </div>
</template>
