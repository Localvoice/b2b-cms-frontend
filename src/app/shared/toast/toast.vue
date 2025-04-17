<template>
  <div class="myClass">
    <v-snackbar v-model="toast" :color="color" :timeout="timeout">
      {{ message }}
      <template #actions="{ props }">
        <v-btn color="blue" variant="text" v-bind="props" @click="toast = false"> Zamknij </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  message: string;
  color: string;
}>();

const toast = ref(true);
const timeout = 10000;
</script>

<style scoped>
.myClass {
  z-index: 1000000000;
}
</style>
