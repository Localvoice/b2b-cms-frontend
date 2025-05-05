<template>
  <div class="d-flex align-center">
    <img :src="avatarUrl" class="mr-3" alt="avatar" width="40" height="40" />
    <div class="me-3">
      <p class="name-text">{{ name }}</p>
      <p class="email-text">{{ email }}</p>
    </div>
    <v-btn density="compact" icon="mdi-chevron-down"></v-btn>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  avatarUrl: string;
  name: string;
  email: string;
}>();
</script>

<style lang="scss">
.name-text {
  color: #161d40;
  font-size: 14px;
  font-weight: 600;
}
.email-text {
  font-weight: 600;
  font-size: 12px;
  color: #6b708a;
}
</style>
