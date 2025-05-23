<template>
  <v-card
    class="pa-8 ml-auto mr-auto"
    :color="layoutState.layoutMode"
    :dark="layoutState.isDarkMode"
    max-width="1800px"
    rounded="lg"
  >
    <v-skeleton-loader height="100%" width="100%" type="card" :loading="loading">
      <slot />
    </v-skeleton-loader>
  </v-card>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const loading = ref(false);

const store = useStore();
const layoutState = computed(() => store.getters['layout/getState']);
</script>
