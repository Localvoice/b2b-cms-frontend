<template>
  <apexchart type="bar" :options="chartOptions" :series="series" height="400" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  series: {
    name: string;
    data: number[];
  };
}>();

const generateAlternatingColors = () => {
  const colors = [];
  for (let i = 0; i < 12; i++) {
    colors.push(i % 2 === 0 ? '#FE5B14' : '#7B62FE');
  }
  return colors;
};

const chartOptions = {
  chart: {
    type: 'bar',
    height: 350,
    stacked: false,
    toolbar: { show: false }
  },
  colors: generateAlternatingColors(),
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '30%',
      endingShape: 'rounded',
      borderRadius: 8,
      borderRadiusApplication: 'end',
      distributed: true
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru']
  },
  yaxis: {
    labels: {
      formatter: (val: number) => `${val.toLocaleString()}`
    }
  },
  legend: {
    show: false
  }
};
</script>
