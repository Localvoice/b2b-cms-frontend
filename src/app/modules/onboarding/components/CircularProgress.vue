<template>
  <svg class="progress-ring" :width="size" :height="size">
    <circle class="background" :r="radius" :cx="size / 2" :cy="size / 2" :stroke-width="stroke" />
    <circle
      class="circle"
      :r="radius"
      :cx="size / 2"
      :cy="size / 2"
      :stroke-width="stroke"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="dashOffset"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  progress: number;
  size: number;
  stroke: number;
}>();

const radius = computed(() => (props.size - props.stroke) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);
const dashOffset = computed(() => circumference.value - (props.progress / 100) * circumference.value);
</script>

<style scoped lang="scss">
.progress-ring {
  transform: rotate(-90deg);
}

.background {
  fill: none;
  stroke: #cdeeda;
}

.circle {
  fill: none;
  stroke: #28c76f;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s ease;
  transform-origin: center;
}
</style>
