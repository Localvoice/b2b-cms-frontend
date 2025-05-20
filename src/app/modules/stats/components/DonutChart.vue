<template>
  <apexchart type="donut" :options="chartOptions" :series="series" :width="width" :height="height" />
</template>

<script setup lang="ts">
import ApexCharts from 'vue3-apexcharts';

const props = defineProps<{
  series: number[];
  labels: string[];
  width: number;
  height: number;
}>();

const chartOptions = {
  chart: {
    type: 'donut'
  },
  labels: props.labels,
  legend: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: true
  },
  stroke: {
    show: false
  },
  colors: ['#2A61D9', '#05C22D']
};
</script>

<style lang="scss"></style>
