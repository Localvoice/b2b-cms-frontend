<template>
  <div class="d-flex align-center">
    <div :class="['mr-2 status-dot', status === 'ACTIVE' ? 'active' : 'inactive']"></div>
    <p class="table-text">{{ statusMatcher[status].label }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  status: string;
}>();

const statusMatcher = {
  ACTIVE: { label: 'Opublikowane' },
  INACTIVE: { label: 'Wersja robocza' }
};
</script>

<style lang="scss" scoped>
.status-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  &.active {
    background-color: #05c22d;
    border: 4px solid #f0fbf3;
  }
  &.inactive {
    background-color: #d27306;
    border: 4px solid #fef7ed;
  }
}
.table-text {
  color: #3b4471;
  font-weight: 600;
  font-size: 13px;
}
</style>
