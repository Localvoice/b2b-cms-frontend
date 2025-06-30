<template>
  <v-card class="no-shadow pa-4" elevation="0" border rounded="lg">
    <p class="stat-header mb-4">{{ heading }}</p>
    <div class="d-flex align-center justify-space-between w-full">
      <div>
        <h4 :class="['mb-3', type === 'primary' ? 'text-success' : 'text-purple']">{{ text }}</h4>
        <div class="d-flex">
          <v-icon icon="mdi-arrow-up" class="arrow-up"></v-icon>
          <p class="percent-text me-2">{{ percentageDifference }}%</p>
          <p class="info-text">vs zeszły miesiąc</p>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  heading: string;
  text: string;
  percentageDifference: number;
  type: 'primary' | 'secondary';
}>();
</script>

<style lang="scss">
.stat-header {
  color: #232843;
  font-size: 16px;
  font-weight: 600;
}
.arrow-up {
  color: #05c22d;
  font-size: 18px;
}
.percent-text {
  color: #3b4471;
  font-weight: 600;
  font-size: 13px;
}
.info-text {
  color: #6b708a;
  font-weight: 600;
  font-size: 13px;
}
.text-purple {
  color: #7b62fe !important;
}
</style>
