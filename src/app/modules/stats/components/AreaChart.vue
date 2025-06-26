<template>
  <apexchart type="area" :options="chartOptions" :series="series" height="350" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  series: {
    name: string;
    data: number[];
  }[];
}>();

const chartOptions = ref({
  chart: {
    type: 'area',
    toolbar: {
      show: false
    }
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.1,
      stops: [0, 90, 100]
    }
  },
  markers: {
    size: 4,
    colors: ['#fff'],
    strokeColor: '#7B62FE',
    strokeWidth: 2
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: Array.from({ length: 30 }, (_, i) => i + 1),
    labels: {
      show: true
    }
  },
  yaxis: {
    min: 0,
    max: 100,
    tickAmount: 5
  },
  tooltip: {
    enabled: true
  },
  grid: {
    borderColor: '#f1f1f1'
  },
  colors: ['#7B62FE']
});
</script>
